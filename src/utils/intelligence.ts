import { allProcedures } from '../data/manualData';
import { allFunctionProfiles } from '../data/functionsManualData';
import type { FunctionProfile, ProcedureItem } from '../types/manual';
import {
  countLinkedFunctions,
  getMissingProcedureRecommendations,
  getProcedureRelationships,
  getProcedureUpdateActions,
  getProfileFunctionUpdateActions,
  getProfileUpdateFindings,
} from './relations';

export type CoverageStatus = 'cubierto' | 'parcial' | 'no_cubierto';
export type IntelligenceRisk = 'critico' | 'alto' | 'medio' | 'bajo';
export type DecisionStatus = 'pendiente' | 'revisado' | 'aprobado' | 'rechazado' | 'mesa_tecnica' | 'en_actualizacion';

export interface ProcedureIntelligenceRow {
  procedure: ProcedureItem;
  macroName: string;
  macroType: string;
  processName: string;
  coverage: CoverageStatus;
  risk: IntelligenceRisk;
  decision: string;
  riskReasons: string[];
  relationshipCount: number;
  functionCount: number;
  profileCount: number;
  responsible: string;
  normativeAlerts: string[];
}

export interface ProfileLoadRow {
  profile: FunctionProfile;
  procedureCount: number;
  functionCount: number;
  linkedFunctionCount: number;
  coveragePressure: IntelligenceRisk;
  alerts: string[];
}

export interface DependencyHeatRow {
  dependency: string;
  profileCount: number;
  procedureCount: number;
  covered: number;
  partial: number;
  uncovered: number;
  highRisk: number;
  functions: number;
  score: number;
}

const riskWeight: Record<IntelligenceRisk, number> = {
  bajo: 1,
  medio: 2,
  alto: 3,
  critico: 4,
};

export const coverageLabel: Record<CoverageStatus, string> = {
  cubierto: 'Cubierto',
  parcial: 'Parcial',
  no_cubierto: 'No cubierto',
};

export const riskLabel: Record<IntelligenceRisk, string> = {
  bajo: 'Bajo',
  medio: 'Medio',
  alto: 'Alto',
  critico: 'Crítico',
};

export function getProcedureCoverage(procedure: ProcedureItem): CoverageStatus {
  const relationships = getProcedureRelationships(procedure);
  if (relationships.length === 0) return 'no_cubierto';
  if (relationships.some((relationship) => relationship.confidence === 'directa' && relationship.legalFit === 'compatible')) return 'cubierto';
  return 'parcial';
}

export function inferProcedureRisk(procedure: ProcedureItem): { risk: IntelligenceRisk; reasons: string[] } {
  const coverage = getProcedureCoverage(procedure);
  const relationships = getProcedureRelationships(procedure);
  const actions = getProcedureUpdateActions(procedure);
  const reasons: string[] = [];
  let score = 0;

  if (coverage === 'no_cubierto') {
    score += 3;
    reasons.push('No tiene función específica asociada con criterio estricto.');
  }
  if (coverage === 'parcial') {
    score += 2;
    reasons.push('La relación funcional existe, pero requiere validación o no es literal.');
  }
  if (relationships.some((relationship) => relationship.legalFit !== 'compatible')) {
    score += 2;
    reasons.push('Existe alerta de ajuste funcional/legal en alguna relación.');
  }
  if (actions.some((action) => action.severity === 'critico')) {
    score += 3;
    reasons.push('Tiene propuesta normativa crítica.');
  } else if (actions.some((action) => action.severity === 'alto')) {
    score += 2;
    reasons.push('Tiene propuesta normativa de prioridad alta.');
  }
  if (procedure.source.validationMode !== 'visual_validated') {
    score += 1;
    reasons.push('El procedimiento requiere validación visual o documental adicional.');
  }

  const code = procedure.code.toUpperCase();
  if (/PA-GC|PA-GF|PA-GJ|PM-GJC|PEC-CVE|GPSP/.test(code)) {
    score += 1;
    reasons.push('Tiene impacto jurídico, financiero, contractual, disciplinario, policivo o de servicios públicos.');
  }

  if (score >= 6) return { risk: 'critico', reasons };
  if (score >= 4) return { risk: 'alto', reasons };
  if (score >= 2) return { risk: 'medio', reasons };
  return { risk: 'bajo', reasons: reasons.length ? reasons : ['No presenta alertas relevantes en la matriz actual.'] };
}

export function getSuggestedDecision(procedure: ProcedureItem): string {
  const actions = getProcedureUpdateActions(procedure);
  const coverage = getProcedureCoverage(procedure);
  const critical = actions.find((action) => action.severity === 'critico');
  const high = actions.find((action) => action.severity === 'alto');
  const main = critical ?? high ?? actions[0];

  if (main?.action === 'quitar') return 'Eliminar o retirar';
  if (main?.action === 'fusionar') return 'Fusionar';
  if (main?.action === 'trasladar') return 'Trasladar responsable';
  if (main?.action === 'agregar') return 'Agregar procedimiento';
  if (coverage === 'no_cubierto') return 'Actualizar manual y procedimiento';
  if (coverage === 'parcial') return 'Revisar competencia';
  if (main?.action === 'modificar') return 'Actualizar';
  return 'Mantener con control de cambios';
}

export function buildProcedureIntelligence(): ProcedureIntelligenceRow[] {
  return allProcedures.map(({ macro, process, procedure }) => {
    const relationships = getProcedureRelationships(procedure);
    const coverage = getProcedureCoverage(procedure);
    const { risk, reasons } = inferProcedureRisk(procedure);
    const actions = getProcedureUpdateActions(procedure);
    const normativeAlerts = actions
      .filter((action) => action.severity === 'critico' || action.severity === 'alto')
      .map((action) => action.title);

    return {
      procedure,
      macroName: macro.name,
      macroType: macro.type,
      processName: process.name,
      coverage,
      risk,
      decision: getSuggestedDecision(procedure),
      riskReasons: reasons,
      relationshipCount: relationships.length,
      functionCount: relationships.reduce((acc, relationship) => acc + relationship.functions.length, 0),
      profileCount: new Set(relationships.map((relationship) => relationship.profile.id)).size,
      responsible: procedure.responsibleArea || 'Sin responsable explícito',
      normativeAlerts,
    };
  });
}

export function buildProfileLoad(rows = buildProcedureIntelligence()): ProfileLoadRow[] {
  const procedureByProfile = new Map<string, Set<string>>();
  const alertsByProfile = new Map<string, string[]>();

  allProcedures.forEach(({ procedure }) => {
    getProcedureRelationships(procedure).forEach((relationship) => {
      const bucket = procedureByProfile.get(relationship.profile.id) ?? new Set<string>();
      bucket.add(procedure.id);
      procedureByProfile.set(relationship.profile.id, bucket);
    });
  });

  allFunctionProfiles.forEach((profile) => {
    const alerts = [
      ...getProfileUpdateFindings(profile.id).map((finding) => finding.title),
      ...getProfileFunctionUpdateActions(profile.id).filter((action) => action.action !== 'mantener').map((action) => action.title),
    ];
    alertsByProfile.set(profile.id, alerts);
  });

  return allFunctionProfiles.map((profile) => {
    const procedureCount = procedureByProfile.get(profile.id)?.size ?? 0;
    const linkedFunctionCount = countLinkedFunctions(profile);
    let coveragePressure: IntelligenceRisk = 'bajo';
    if (procedureCount >= 30 || alertsByProfile.get(profile.id)?.some((alert) => /disciplinaria|comisar/i.test(alert))) coveragePressure = 'critico';
    else if (procedureCount >= 18) coveragePressure = 'alto';
    else if (procedureCount >= 8) coveragePressure = 'medio';

    return {
      profile,
      procedureCount,
      functionCount: profile.functions.length,
      linkedFunctionCount,
      coveragePressure,
      alerts: alertsByProfile.get(profile.id) ?? [],
    };
  }).sort((a, b) => b.procedureCount - a.procedureCount || b.linkedFunctionCount - a.linkedFunctionCount);
}

export function buildDependencyHeatmap(rows = buildProcedureIntelligence()): DependencyHeatRow[] {
  const map = new Map<string, DependencyHeatRow>();

  const ensure = (dependency: string): DependencyHeatRow => {
    const key = dependency || 'Sin dependencia';
    const current = map.get(key);
    if (current) return current;
    const created: DependencyHeatRow = {
      dependency: key,
      profileCount: 0,
      procedureCount: 0,
      covered: 0,
      partial: 0,
      uncovered: 0,
      highRisk: 0,
      functions: 0,
      score: 0,
    };
    map.set(key, created);
    return created;
  };

  allFunctionProfiles.forEach((profile) => {
    const row = ensure(profile.dependency);
    row.profileCount += 1;
    row.functions += profile.functions.length;
  });

  rows.forEach((row) => {
    const target = ensure(row.responsible);
    target.procedureCount += 1;
    if (row.coverage === 'cubierto') target.covered += 1;
    if (row.coverage === 'parcial') target.partial += 1;
    if (row.coverage === 'no_cubierto') target.uncovered += 1;
    if (row.risk === 'alto' || row.risk === 'critico') target.highRisk += 1;
    target.score += riskWeight[row.risk];
  });

  return Array.from(map.values()).sort((a, b) => b.score - a.score || b.procedureCount - a.procedureCount);
}

export function buildInstitutionalInconsistencies(rows = buildProcedureIntelligence()) {
  const inconsistencies: { id: string; severity: IntelligenceRisk; title: string; description: string; target: string }[] = [];

  rows.filter((row) => row.coverage === 'no_cubierto').forEach((row) => {
    inconsistencies.push({
      id: `no-coverage-${row.procedure.id}`,
      severity: row.risk,
      title: 'Procedimiento sin soporte funcional estricto',
      description: 'No se encontró función literal del manual que soporte la ejecución del procedimiento.',
      target: `${row.procedure.code} · ${row.procedure.title}`,
    });
  });

  rows.filter((row) => row.responsible.toLowerCase().includes('control interno') && row.procedure.title.toLowerCase().includes('disciplinario')).forEach((row) => {
    inconsistencies.push({
      id: `control-disciplinary-${row.procedure.id}`,
      severity: 'alto',
      title: 'Posible incompatibilidad entre control interno y control disciplinario',
      description: 'Debe revisarse si la primera instancia disciplinaria corresponde a Control Interno o a la dependencia competente según estructura vigente.',
      target: `${row.procedure.code} · ${row.procedure.title}`,
    });
  });

  buildProfileLoad(rows).filter((item) => item.coveragePressure === 'alto' || item.coveragePressure === 'critico').forEach((item) => {
    inconsistencies.push({
      id: `overload-${item.profile.id}`,
      severity: item.coveragePressure,
      title: 'Cargo con carga relacional alta',
      description: `El perfil se relaciona con ${item.procedureCount} procedimiento(s). Debe revisarse si hay concentración excesiva o delegaciones no documentadas.`,
      target: `${item.profile.denomination} · ${item.profile.dependency}`,
    });
  });

  getMissingProcedureRecommendations().forEach((recommendation) => {
    inconsistencies.push({
      id: `missing-${recommendation.id}`,
      severity: 'alto',
      title: 'Procedimiento recomendado no incorporado o por formalizar',
      description: recommendation.reason,
      target: recommendation.title,
    });
  });

  return inconsistencies.sort((a, b) => riskWeight[b.severity] - riskWeight[a.severity]);
}

export function generateExecutiveReport(rows = buildProcedureIntelligence()) {
  const total = rows.length;
  const covered = rows.filter((row) => row.coverage === 'cubierto').length;
  const partial = rows.filter((row) => row.coverage === 'parcial').length;
  const uncovered = rows.filter((row) => row.coverage === 'no_cubierto').length;
  const highRisk = rows.filter((row) => row.risk === 'alto' || row.risk === 'critico').length;
  const topRisks = rows.filter((row) => row.risk === 'critico' || row.risk === 'alto').slice(0, 12);
  const ownerless = rows.filter((row) => row.coverage === 'no_cubierto').slice(0, 12);
  const overloaded = buildProfileLoad(rows).slice(0, 8);
  const missing = getMissingProcedureRecommendations();

  return [
    'INFORME EJECUTIVO DE BRECHAS ENTRE MANUAL DE PROCESOS Y MANUAL DE FUNCIONES',
    '',
    `Total de procedimientos analizados: ${total}.`,
    `Con soporte funcional claro: ${covered}.`,
    `Con soporte parcial o sujeto a validación: ${partial}.`,
    `Sin soporte funcional estricto: ${uncovered}.`,
    `Procedimientos con riesgo alto o crítico: ${highRisk}.`,
    '',
    '1. Hallazgos principales',
    `- El ${Math.round(((partial + uncovered) / Math.max(total, 1)) * 100)}% de los procedimientos requiere alguna revisión funcional, normativa o documental.`,
    '- Se identifican riesgos relevantes en contratación, hacienda, servicios públicos, comisaría, gestión documental, atención ciudadana y control interno disciplinario.',
    '- La matriz debe usarse como insumo de mesa técnica; no reemplaza el acto administrativo de actualización.',
    '',
    '2. Procedimientos priorizados por riesgo',
    ...topRisks.map((row) => `- ${row.procedure.code} · ${row.procedure.title}: ${riskLabel[row.risk]} · ${row.decision}.`),
    '',
    '3. Procedimientos sin dueño funcional estricto',
    ...(ownerless.length ? ownerless.map((row) => `- ${row.procedure.code} · ${row.procedure.title}: revisar competencia y actualizar manual/procedimiento.`) : ['- No se detectan procedimientos sin soporte funcional estricto.']),
    '',
    '4. Cargos con mayor concentración de relaciones',
    ...overloaded.map((item) => `- ${item.profile.denomination} (${item.profile.dependency}): ${item.procedureCount} procedimientos asociados; ${item.linkedFunctionCount}/${item.functionCount} funciones relacionadas.`),
    '',
    '5. Procedimientos nuevos o módulos recomendados',
    ...missing.map((item) => `- ${item.title}. Responsable sugerido: ${item.suggestedResponsible}. Fundamento: ${item.normativeBasis}.`),
    '',
    '6. Recomendación de implementación',
    '- Realizar mesa técnica por dependencia.',
    '- Validar responsable real y soporte funcional por cada procedimiento.',
    '- Actualizar flujos PHVA con evidencias mínimas, decisiones, controles, indicadores y responsables.',
    '- Ajustar manual de funciones cuando el procedimiento no tenga función expresa o exista desactualización normativa.',
    '- Adoptar formalmente los cambios mediante el mecanismo administrativo que corresponda.',
  ].join('\n');
}

export function textMatchesRow(row: ProcedureIntelligenceRow, query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;
  return [
    row.procedure.code,
    row.procedure.title,
    row.responsible,
    row.processName,
    row.macroName,
    row.decision,
    coverageLabel[row.coverage],
    riskLabel[row.risk],
    ...row.riskReasons,
    ...row.normativeAlerts,
  ].join(' ').toLowerCase().includes(normalized);
}
