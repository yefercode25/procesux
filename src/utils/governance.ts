import { allProcedures } from '../data/manualData';
import { allFunctionProfiles } from '../data/functionsManualData';
import type { FunctionProfile, ProcedureItem } from '../types/manual';
import {
  getMissingProcedureRecommendations,
  getProcedureRelationships,
  getProcedureUpdateActions,
  getProfileFunctionUpdateActions,
  getProfileUpdateFindings,
} from './relations';
import { buildProcedureIntelligence, buildProfileLoad, type CoverageStatus, type IntelligenceRisk, riskLabel, coverageLabel } from './intelligence';

export type UpdatePlanStatus = 'pendiente' | 'en_revision' | 'mesa_tecnica' | 'validacion_juridica' | 'aprobado' | 'implementado' | 'descartado';
export type ApprovalStage = 'propuesto' | 'dependencia' | 'juridica' | 'despacho' | 'acto_administrativo' | 'publicado';
export type RaciRole = 'R' | 'A' | 'C' | 'I';

export interface ManualVersionItem {
  id: string;
  name: string;
  type: 'funciones' | 'procesos' | 'propuesta' | 'publicada';
  year: string;
  status: string;
  owner: string;
  description: string;
}

export interface UpdatePlanItem {
  id: string;
  targetType: 'procedimiento' | 'cargo' | 'modulo';
  targetId: string;
  title: string;
  dependency: string;
  priority: IntelligenceRisk;
  status: UpdatePlanStatus;
  responsible: string;
  dueDate: string;
  evidence: string;
  observation: string;
}

export interface RaciItem {
  role: RaciRole;
  actor: string;
  responsibility: string;
  source: string;
}

export interface InstitutionalProcedureSheet {
  procedure: ProcedureItem;
  objective: string;
  scope: string;
  responsible: string;
  inputs: string[];
  outputs: string[];
  legalRequirements: string[];
  risks: string[];
  controls: string[];
  indicators: string[];
  evidences: string[];
  relatedFunctions: string[];
  updateSummary: string[];
  raci: RaciItem[];
}

export interface NormativeLibraryItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  impact: string;
  affectedProcedureCodes: string[];
  affectedProfileIds: string[];
  recommendation: string;
}

export interface AuditChecklistItem {
  id: string;
  procedureId: string;
  controlExpected: string;
  minimumEvidence: string;
  risk: IntelligenceRisk;
  responsible: string;
  auditObservation: string;
}

export interface DuplicateFinding {
  id: string;
  severity: IntelligenceRisk;
  title: string;
  items: string[];
  recommendation: string;
}

export interface SemanticSearchResult {
  id: string;
  type: 'procedimiento' | 'cargo' | 'funcion' | 'norma' | 'recomendacion';
  title: string;
  subtitle: string;
  body: string;
  score: number;
  procedureId?: string;
  profileId?: string;
}


export type RelationTrustLevel = 'alta' | 'media' | 'baja' | 'validacion';
export type RelationKind = 'directa' | 'parcial' | 'apoyo_operativo_condicionado' | 'normativa' | 'sugerida' | 'sin_soporte';
export type MaturityLevel = 1 | 2 | 3 | 4 | 5;

export interface ChangeTraceItem {
  id: string;
  date: string;
  actor: string;
  targetType: 'procedimiento' | 'cargo' | 'funcion' | 'norma';
  targetId: string;
  title: string;
  previousState: string;
  newState: string;
  justification: string;
  observation: string;
}

export interface RelationConfidenceItem {
  id: string;
  procedureId: string;
  procedureCode: string;
  procedureTitle: string;
  profileId?: string;
  profileName?: string;
  functionNumbers: number[];
  relationKind: RelationKind;
  trust: RelationTrustLevel;
  score: number;
  reason: string;
  validationNeed: string;
}

export interface ProcedureEvidenceModel {
  procedureId: string;
  procedureCode: string;
  title: string;
  minimumEvidences: string[];
  associatedFormats: string[];
  mandatorySupports: string[];
  preservationSystem: string;
  custodyResponsible: string;
  retentionHint: string;
}

export interface PrioritizedNormativeUpdate {
  id: string;
  targetId: string;
  targetCode: string;
  title: string;
  priority: IntelligenceRisk;
  score: number;
  factors: string[];
  recommendedFirstAction: string;
  responsible: string;
}

export interface ValidationChecklistItem {
  procedureId: string;
  procedureCode: string;
  title: string;
  checks: { label: string; status: 'cumple' | 'parcial' | 'pendiente'; observation: string }[];
  completion: number;
}

export interface ProcedureIndicatorSuggestion {
  procedureId: string;
  procedureCode: string;
  title: string;
  indicators: { name: string; formula: string; frequency: string; owner: string; purpose: string }[];
}

export interface ProcedureCriticalityItem {
  procedureId: string;
  procedureCode: string;
  title: string;
  category: string;
  risk: IntelligenceRisk;
  reason: string;
}

export interface DependencyMapItem {
  id: string;
  fromCode: string;
  toCode: string;
  relation: string;
  impact: string;
}

export interface ResponsibilityInconsistencyItem {
  id: string;
  procedureId: string;
  procedureCode: string;
  title: string;
  currentResponsible: string;
  suggestedResponsible: string;
  severity: IntelligenceRisk;
  reason: string;
  action: string;
}

export interface AdministrativeActDraft {
  title: string;
  considerations: string[];
  technicalJustification: string[];
  proposedChanges: string[];
  procedureAnnex: string[];
  functionAnnex: string[];
  articles: string[];
}

export interface MaturityAssessmentItem {
  procedureId: string;
  procedureCode: string;
  title: string;
  level: MaturityLevel;
  label: string;
  evidence: string;
  nextStep: string;
}

export interface ExecutiveSummaryItem {
  id: string;
  title: string;
  value: string | number;
  tone: IntelligenceRisk | 'positivo';
  detail: string;
  action: string;
}

const toDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

const uniq = <T,>(items: T[]) => Array.from(new Set(items));

let procedureIntelligenceCache: ReturnType<typeof buildProcedureIntelligence> | null = null;
let normativeLibraryCache: NormativeLibraryItem[] | null = null;
let missingRecommendationCache: ReturnType<typeof getMissingProcedureRecommendations> | null = null;

const getProcedureIntelligenceRows = () => {
  if (!procedureIntelligenceCache) procedureIntelligenceCache = buildProcedureIntelligence();
  return procedureIntelligenceCache;
};

const getNormativeLibraryRows = () => {
  if (!normativeLibraryCache) normativeLibraryCache = createNormativeLibrary();
  return normativeLibraryCache;
};

const getMissingRecommendationRows = () => {
  if (!missingRecommendationCache) missingRecommendationCache = getMissingProcedureRecommendations();
  return missingRecommendationCache;
};

const priorityDays: Record<IntelligenceRisk, number> = {
  critico: 30,
  alto: 60,
  medio: 90,
  bajo: 120,
};

export const manualVersions: ManualVersionItem[] = [
  {
    id: 'procesos-2018',
    name: 'Manual de Procesos y Procedimientos',
    type: 'procesos',
    year: '2018',
    status: 'Base diagnóstica',
    owner: 'Planeación / Gobierno / Control Interno',
    description: 'Versión usada para comparar procedimientos, flujos, responsables y soporte funcional.',
  },
  {
    id: 'funciones-2018',
    name: 'Manual Específico de Funciones',
    type: 'funciones',
    year: '2018',
    status: 'Base diagnóstica',
    owner: 'Secretaría de Gobierno y Desarrollo Institucional',
    description: 'Versión usada para validar si cada procedimiento tiene funciones expresas por cargo.',
  },
  {
    id: 'propuesta-2026',
    name: 'Propuesta de actualización integral',
    type: 'propuesta',
    year: '2026',
    status: 'En construcción técnica',
    owner: 'Mesa técnica institucional',
    description: 'Versión de trabajo con brechas, riesgos, RACI, flujos recomendados y ajustes normativos.',
  },
  {
    id: 'publicada',
    name: 'Versión aprobada y publicada',
    type: 'publicada',
    year: 'Por definir',
    status: 'Pendiente',
    owner: 'Despacho / Secretaría General o quien haga sus veces',
    description: 'Versión final posterior a validación jurídica, aprobación administrativa y publicación.',
  },
];

const findByCode = (code: string) => allProcedures.find(({ procedure }) => procedure.code.toLowerCase() === code.toLowerCase())?.procedure;
const profileById = new Map(allFunctionProfiles.map((profile) => [profile.id, profile]));

export function buildUpdatePlan(): UpdatePlanItem[] {
  const rows = getProcedureIntelligenceRows();
  const procedureItems: UpdatePlanItem[] = rows
    .filter((row) => row.risk === 'critico' || row.risk === 'alto' || row.coverage !== 'cubierto')
    .map((row) => ({
      id: `plan-proc-${row.procedure.id}`,
      targetType: 'procedimiento',
      targetId: row.procedure.id,
      title: `${row.procedure.code} · ${row.procedure.title}`,
      dependency: row.responsible,
      priority: row.risk,
      status: row.risk === 'critico' ? 'mesa_tecnica' : 'en_revision',
      responsible: row.responsible || 'Por definir',
      dueDate: toDate(priorityDays[row.risk]),
      evidence: 'Acta de revisión, matriz de cambios, flujo recomendado, soporte normativo y versión ajustada del procedimiento.',
      observation: row.riskReasons.join(' '),
    }));

  const profileItems: UpdatePlanItem[] = buildProfileLoad()
    .filter((row) => row.alerts.length > 0 || row.coveragePressure === 'alto' || row.coveragePressure === 'critico')
    .map((row) => ({
      id: `plan-profile-${row.profile.id}`,
      targetType: 'cargo',
      targetId: row.profile.id,
      title: `${row.profile.denomination} · ${row.profile.dependency}`,
      dependency: row.profile.dependency,
      priority: row.coveragePressure,
      status: row.coveragePressure === 'critico' ? 'mesa_tecnica' : 'en_revision',
      responsible: row.profile.immediateBoss || 'Jefe inmediato',
      dueDate: toDate(priorityDays[row.coveragePressure]),
      evidence: 'Ficha funcional propuesta, análisis de funciones a mantener/modificar/agregar/quitar y soporte normativo.',
      observation: row.alerts.slice(0, 3).join(' | ') || 'Revisión por carga funcional y coherencia con procedimientos asociados.',
    }));

  const missingItems: UpdatePlanItem[] = getMissingRecommendationRows().map((item) => ({
    id: `plan-missing-${item.id}`,
    targetType: 'modulo',
    targetId: item.id,
    title: item.title,
    dependency: item.suggestedResponsible,
    priority: 'alto',
    status: 'pendiente',
    responsible: item.suggestedResponsible,
    dueDate: toDate(75),
    evidence: 'Procedimiento nuevo, flujo recomendado, matriz RACI, formatos mínimos y validación normativa.',
    observation: item.reason,
  }));

  return [...procedureItems, ...profileItems, ...missingItems];
}

const procedureRoleHints: { pattern: RegExp; raci: Omit<RaciItem, 'source'>[] }[] = [
  {
    pattern: /^PA-GC|contrat/i,
    raci: [
      { role: 'R', actor: 'Profesional Universitario de Gobierno / área contractual', responsibility: 'Estructurar, revisar y tramitar el proceso contractual.' },
      { role: 'A', actor: 'Alcalde / Secretario competente', responsibility: 'Aprobar, ordenar gasto o suscribir cuando corresponda.' },
      { role: 'C', actor: 'Hacienda / dependencia solicitante', responsibility: 'Validar disponibilidad presupuestal, necesidad y soportes.' },
      { role: 'I', actor: 'Control Interno / ciudadanía cuando aplique', responsibility: 'Conocer publicaciones, reportes y seguimiento institucional.' },
    ],
  },
  {
    pattern: /^PA-GF|hacienda|presup|pago|recaudo|predial|contadur/i,
    raci: [
      { role: 'R', actor: 'Secretaría de Hacienda / Técnico de Hacienda', responsibility: 'Ejecutar el trámite financiero, presupuestal, contable o tributario.' },
      { role: 'A', actor: 'Secretario de Hacienda', responsibility: 'Aprobar o certificar el resultado según competencia.' },
      { role: 'C', actor: 'Dependencia solicitante / Contratación', responsibility: 'Aportar soportes y validar necesidad del pago o registro.' },
      { role: 'I', actor: 'Alcalde / Control Interno', responsibility: 'Recibir informes o seguimiento cuando proceda.' },
    ],
  },
  {
    pattern: /^PM-GJC|^PA-GJ-CARV|^PA-GJ-MP|^PA-GJ-RDD|comis/i,
    raci: [
      { role: 'R', actor: 'Comisaría de Familia', responsibility: 'Adelantar actuaciones de protección, conciliación o restablecimiento.' },
      { role: 'A', actor: 'Comisario(a) de Familia', responsibility: 'Adoptar decisiones y medidas dentro de su competencia.' },
      { role: 'C', actor: 'Profesional de apoyo psicosocial / ICBF / Policía / salud', responsibility: 'Emitir valoraciones, apoyos o articulación institucional.' },
      { role: 'I', actor: 'Secretaría de Gobierno / autoridades competentes', responsibility: 'Conocer reportes e información conforme a reserva y ley aplicable.' },
    ],
  },
  {
    pattern: /^PE-PE|^PM-GI|licencia|obra|infraestructura|planeación/i,
    raci: [
      { role: 'R', actor: 'Secretaría de Planeación / Profesional de Planeación', responsibility: 'Formular, revisar, evaluar, registrar o hacer seguimiento técnico.' },
      { role: 'A', actor: 'Secretario de Planeación / Alcalde según acto', responsibility: 'Aprobar, expedir, presentar o decidir según competencia.' },
      { role: 'C', actor: 'Hacienda / Gobierno / comunidad / contratistas', responsibility: 'Aportar soportes financieros, jurídicos o de participación.' },
      { role: 'I', actor: 'Control Interno / Concejo / ciudadanía cuando aplique', responsibility: 'Conocer avances, informes y resultados.' },
    ],
  },
  {
    pattern: /^PA-GD|archivo|document/i,
    raci: [
      { role: 'R', actor: 'Gestión Documental / Secretaría de Gobierno', responsibility: 'Organizar, transferir, controlar, prestar o actualizar instrumentos archivísticos.' },
      { role: 'A', actor: 'Secretario de Gobierno', responsibility: 'Dirigir lineamientos de administración documental.' },
      { role: 'C', actor: 'Dependencias productoras', responsibility: 'Entregar documentos, inventarios y soportes conforme a TRD.' },
      { role: 'I', actor: 'Archivo Central / Control Interno', responsibility: 'Conocer transferencias, eliminación o seguimiento.' },
    ],
  },
  {
    pattern: /^PEC-CVE|control interno|auditor/i,
    raci: [
      { role: 'R', actor: 'Oficina de Control Interno', responsibility: 'Ejecutar evaluación, seguimiento, auditoría o informe independiente.' },
      { role: 'A', actor: 'Jefe de Control Interno', responsibility: 'Aprobar informe, plan de auditoría o seguimiento.' },
      { role: 'C', actor: 'Dependencias auditadas', responsibility: 'Aportar evidencia, plan de mejoramiento y respuestas.' },
      { role: 'I', actor: 'Alcalde / Comité Institucional', responsibility: 'Conocer resultados, alertas y recomendaciones.' },
    ],
  },
];

export function buildRaciForProcedure(procedure: ProcedureItem): RaciItem[] {
  const text = `${procedure.code} ${procedure.title} ${procedure.responsibleArea}`;
  const matched = procedureRoleHints.find((hint) => hint.pattern.test(text));
  const base = matched?.raci ?? [
    { role: 'R', actor: procedure.responsibleArea || 'Dependencia responsable', responsibility: 'Ejecutar las actividades del procedimiento.' },
    { role: 'A', actor: 'Jefe de dependencia', responsibility: 'Aprobar o validar el resultado del procedimiento.' },
    { role: 'C', actor: 'Dependencias relacionadas', responsibility: 'Aportar insumos, conceptos o soportes requeridos.' },
    { role: 'I', actor: 'Usuarios internos/externos o Control Interno', responsibility: 'Recibir información del resultado cuando corresponda.' },
  ];

  return base.map((item) => ({ ...item, source: 'Inferido a partir del responsable, código, relaciones funcionales y naturaleza del procedimiento.' }));
}

const procedureSheetCache = new Map<string, InstitutionalProcedureSheet>();

export function buildProcedureSheet(procedure: ProcedureItem): InstitutionalProcedureSheet {
  const cached = procedureSheetCache.get(procedure.id);
  if (cached) return cached;

  const relationships = getProcedureRelationships(procedure);
  const actions = getProcedureUpdateActions(procedure);
  const riskRow = getProcedureIntelligenceRows().find((row) => row.procedure.id === procedure.id);
  const relatedFunctions = relationships.flatMap((relationship) =>
    relationship.functions.map((fn) => `${relationship.profile.denomination} · Función ${fn.number}: ${fn.description}`),
  );

  const evidences = uniq([
    ...procedure.detail.documents,
    ...procedure.detail.formats,
    ...procedure.detail.flowSteps.filter((step) => step.type === 'document').map((step) => step.label),
    'Actas, radicados, comunicaciones, registros de sistema o expediente del procedimiento según aplique.',
  ]).filter(Boolean);

  const controls = uniq([
    ...procedure.detail.flowSteps.filter((step) => step.type === 'decision').map((step) => `Punto de decisión: ${step.label}`),
    ...procedure.detail.legalRequirements.map((item) => `Verificación normativa: ${item}`),
    'Control de versiones, responsable, evidencia mínima y trazabilidad del expediente.',
  ]).filter(Boolean);

  const indicators = procedure.detail.variablesToMeasure.length > 0
    ? procedure.detail.variablesToMeasure
    : [
      'Tiempo promedio de trámite.',
      'Porcentaje de expedientes completos.',
      'Número de devoluciones o ajustes solicitados.',
      'Cumplimiento de términos legales o internos.',
    ];

  const sheet: InstitutionalProcedureSheet = {
    procedure,
    objective: procedure.detail.objective || `Estandarizar la ejecución del procedimiento ${procedure.title}.`,
    scope: procedure.detail.scope || 'Desde la recepción de la necesidad o solicitud hasta el cierre, archivo y seguimiento del resultado.',
    responsible: procedure.responsibleArea || 'Por definir',
    inputs: uniq([
      'Solicitud, necesidad institucional, reporte, acto o requerimiento que activa el procedimiento.',
      ...procedure.detail.definitions.slice(0, 2),
    ]),
    outputs: uniq([
      'Respuesta, acto, informe, registro, autorización, pago, expediente, publicación o soporte final según el procedimiento.',
      ...procedure.detail.documents.slice(0, 2),
    ]),
    legalRequirements: procedure.detail.legalRequirements.length ? procedure.detail.legalRequirements : ['Validar normativa sectorial, MIPG, gestión documental y control interno aplicable.'],
    risks: riskRow?.riskReasons.length ? riskRow.riskReasons : ['Riesgo operativo por ausencia de actualización periódica del procedimiento.'],
    controls,
    indicators,
    evidences,
    relatedFunctions,
    updateSummary: actions.map((action) => `${action.action.toUpperCase()}: ${action.proposedState}`),
    raci: buildRaciForProcedure(procedure),
  };
  procedureSheetCache.set(procedure.id, sheet);
  return sheet;
}

function createNormativeLibrary(): NormativeLibraryItem[] {
  return [
    {
      id: 'ley-2126-2021',
      title: 'Ley 2126 de 2021 · Comisarías de Familia',
      category: 'Familia y protección',
      summary: 'Regula creación, conformación y funcionamiento de Comisarías de Familia, así como su marco de actuación.',
      impact: 'Exige revisar funciones, rutas de violencia intrafamiliar, medidas de protección, equipos interdisciplinarios y articulación institucional.',
      affectedProcedureCodes: ['PM-GJC-PVI-09', 'PM-GJC-PRD-10', 'PA-GJ-CARV-01', 'PA-GJ-MP-02', 'PA-GJ-RDD-03'],
      affectedProfileIds: ['comisario-familia-202-04', 'profesional-comisaria-219-03'],
      recommendation: 'Actualizar funciones y procedimientos de Comisaría, separando medidas, restablecimiento, conciliación y apoyos interdisciplinarios.',
    },
    {
      id: 'decreto-1083-2015-815-2018',
      title: 'Decreto 1083 de 2015 y Decreto 815 de 2018 · Competencias laborales',
      category: 'Empleo público',
      summary: 'Marco de manuales específicos, competencias comunes, comportamentales y funcionales para empleos públicos.',
      impact: 'Requiere completar o ajustar fichas de cargos con competencias, conocimientos, requisitos y comportamientos por nivel.',
      affectedProcedureCodes: ['PA-GTH-MSA-13', 'PA-GTH-EPIC-04', 'PA-GTH-ED-05'],
      affectedProfileIds: allFunctionProfiles.map((profile) => profile.id),
      recommendation: 'Incluir bloque de competencias y requisitos actualizados en cada perfil del manual de funciones.',
    },
    {
      id: 'ley-594-2000-gestion-documental',
      title: 'Ley 594 de 2000 · Gestión documental y archivo',
      category: 'Gestión documental',
      summary: 'Establece reglas generales para administración, conservación, organización y disposición documental.',
      impact: 'Afecta archivo de gestión, archivo central, préstamo, transferencias, eliminación y TRD.',
      affectedProcedureCodes: ['PA-GD-OAG-01', 'PA-GD-OAC-02', 'PA-GD-CPD-03', 'PA-GD-TD-04', 'PA-GD-ED-05', 'PA-GD-TRD-06'],
      affectedProfileIds: ['secretario-gobierno-020-04', 'secretario-ejecutivo-425-05', 'auxiliar-administrativo-407-04'],
      recommendation: 'Alinear procedimientos documentales con TRD, inventarios, actas y autorización para eliminación documental.',
    },
    {
      id: 'ley-1712-2014-transparencia',
      title: 'Ley 1712 de 2014 · Transparencia y acceso a la información',
      category: 'Transparencia',
      summary: 'Regula transparencia activa, acceso a información pública y obligaciones de publicación.',
      impact: 'Afecta PQRSD, ventanilla única, publicación de información, Gobierno Digital y gestión documental.',
      affectedProcedureCodes: ['PA-AC-PQR-01', 'PA-AC-VUC-04', 'PA-GD-CPD-03', 'PE-PE-PAAC-18'],
      affectedProfileIds: ['secretario-gobierno-020-04', 'secretario-planeacion-020-04'],
      recommendation: 'Vincular atención ciudadana, publicación, gestión documental, protección de datos y transparencia en procedimientos actualizados.',
    },
    {
      id: 'contratacion-secopp',
      title: 'Régimen de contratación estatal y SECOP II',
      category: 'Contratación',
      summary: 'Marco operativo para planeación, estructuración, publicación, ejecución y liquidación contractual.',
      impact: 'Afecta licitación, contratación directa, concurso, selección abreviada, mínima cuantía, estudios previos y cuentas de cobro.',
      affectedProcedureCodes: ['PA-GC-LP-01', 'PA-GC-CD-02', 'PA-GC-CM-03', 'PA-GC-SA-04', 'PA-GC-MC-05', 'PA-GC-EP-08', 'PA-GC-PCC-10'],
      affectedProfileIds: ['profesional-gobierno-219-03', 'tecnico-transversal-367-06', 'secretario-gobierno-020-04'],
      recommendation: 'Separar planeación, revisión jurídica, publicación, supervisión, pago y archivo contractual.',
    },
    {
      id: 'pte-pac',
      title: 'Programa de Transparencia y Ética Pública / PAAC',
      category: 'Planeación y anticorrupción',
      summary: 'Actualiza el enfoque del Plan Anticorrupción hacia programa integral de transparencia, ética pública y gestión de riesgos de corrupción.',
      impact: 'Afecta formulación del PAAC/PTEP, riesgos, atención ciudadana, rendición de cuentas y transparencia.',
      affectedProcedureCodes: ['PE-PE-PAAC-18', 'PE-SG-SIG-01', 'PEC-CVE-SMR-01'],
      affectedProfileIds: ['secretario-planeacion-020-04', 'jefe-control-interno-006-04'],
      recommendation: 'Rediseñar el procedimiento PAAC como PTEP, articulado con riesgos, MIPG, atención ciudadana y seguimiento.',
    },
    {
      id: 'datos-personales',
      title: 'Protección de datos personales',
      category: 'Datos y seguridad de la información',
      summary: 'Principios de tratamiento de datos personales y cuidado especial de datos sensibles.',
      impact: 'Afecta PQRSD, caracterizaciones, víctimas, SISBEN, Familias en Acción, historias laborales y expedientes de Comisaría.',
      affectedProcedureCodes: ['PA-AC-PQR-01', 'PM-GDS-CP-09', 'PM-GDS-SIFA-17', 'PA-GTH-CS-02', 'PM-GJC-PVI-09'],
      affectedProfileIds: ['secretario-gobierno-020-04', 'tecnico-transversal-367-06', 'auxiliar-administrativo-407-04'],
      recommendation: 'Agregar controles de autorización, finalidad, acceso, reserva, custodia y seguridad de información personal.',
    },
  ];
}

export function buildNormativeLibrary(): NormativeLibraryItem[] {
  return getNormativeLibraryRows();
}

export function buildAuditChecklist(): AuditChecklistItem[] {
  const rows = getProcedureIntelligenceRows();
  return rows.map((row) => ({
    id: `audit-${row.procedure.id}`,
    procedureId: row.procedure.id,
    controlExpected: row.coverage === 'no_cubierto'
      ? 'Validar responsable y soporte funcional antes de ejecutar o actualizar el procedimiento.'
      : 'Verificar cumplimiento del flujo, evidencias, responsables, términos y controles definidos.',
    minimumEvidence: buildProcedureSheet(row.procedure).evidences.slice(0, 4).join(' | '),
    risk: row.risk,
    responsible: row.responsible,
    auditObservation: row.riskReasons.join(' '),
  }));
}

export function buildDuplicateFindings(): DuplicateFinding[] {
  return [
    {
      id: 'cuentas-cobro',
      severity: 'alto',
      title: 'Revisión y presentación de cuentas de cobro aparece en varios frentes',
      items: ['PM-GDS-RCC-20', 'PA-GC-RCC-07', 'PA-GC-PCC-10', 'PA-GF-OPD-11'],
      recommendation: 'Definir un flujo transversal único con etapas: radicación, revisión del supervisor, revisión contractual, revisión presupuestal/tesorería, orden de pago, archivo.',
    },
    {
      id: 'atencion-usuarios',
      severity: 'medio',
      title: 'Atención a usuarios, atención al público, PQRSD y ventanilla única tienen solapamiento',
      items: ['PA-AC-PQR-01', 'PA-AC-AP-02', 'PA-AC-VUC-04', 'PM-GDS-AU-22'],
      recommendation: 'Conservar ventanilla/PQRSD como proceso transversal y dejar atención social como ruta sectorial cuando aplique.',
    },
    {
      id: 'comisaria-restablecimiento',
      severity: 'alto',
      title: 'Restablecimiento de derechos aparece en macroprocesos distintos',
      items: ['PM-GJC-PRD-10', 'PA-GJ-RDD-03'],
      recommendation: 'Unificar o diferenciar claramente trámite misional de Comisaría y trámite jurídico/documental de apoyo.',
    },
    {
      id: 'desarrollo-social-economico',
      severity: 'medio',
      title: 'Proyectos productivos y ruta de productividad están clasificados en desarrollo social',
      items: ['PM-GDS-PP-02', 'PM-GDS-RP-08', 'PM-GDE-ATA-01', 'PM-GDE-EA-02'],
      recommendation: 'Trasladar o articular con Desarrollo Económico, Sostenible y Turismo, dejando Desarrollo Social como apoyo poblacional cuando corresponda.',
    },
    {
      id: 'servicios-publicos',
      severity: 'critico',
      title: 'Servicios públicos técnicos y financieros no tienen soporte funcional suficiente',
      items: ['PM-GPSP-MP-01', 'PM-GPSP-LF-03', 'PM-GPSP-FSP-06', 'PM-GPSP-MF-07', 'PM-GPSP-RSP-08'],
      recommendation: 'Crear o actualizar funciones y procedimientos específicos para operación técnica, facturación, cartera, recaudo y subsidios de servicios públicos.',
    },
  ];
}

export function buildQualityIndicators() {
  const rows = getProcedureIntelligenceRows();
  const load = buildProfileLoad(rows);
  const duplicates = buildDuplicateFindings();
  const missing = getMissingRecommendationRows();
  const profilesWithUpdates = allFunctionProfiles.filter((profile) => getProfileUpdateFindings(profile.id).length || getProfileFunctionUpdateActions(profile.id).some((action) => action.action !== 'mantener'));

  return {
    totalProcedures: rows.length,
    covered: rows.filter((row) => row.coverage === 'cubierto').length,
    partial: rows.filter((row) => row.coverage === 'parcial').length,
    uncovered: rows.filter((row) => row.coverage === 'no_cubierto').length,
    highRisk: rows.filter((row) => row.risk === 'alto' || row.risk === 'critico').length,
    criticalRisk: rows.filter((row) => row.risk === 'critico').length,
    profilesWithUpdates: profilesWithUpdates.length,
    overloadedProfiles: load.filter((row) => row.coveragePressure === 'alto' || row.coveragePressure === 'critico').length,
    missingProcedures: missing.length,
    duplicateFindings: duplicates.length,
    fusionCandidates: duplicates.filter((item) => /unificar|flujo transversal|conservar/i.test(item.recommendation)).length,
  };
}

const normalize = (value: string) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const scoreText = (haystack: string, query: string) => {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  const text = normalize(haystack);
  if (!terms.length) return 0;
  return terms.reduce((score, term) => score + (text.includes(term) ? 1 : 0), 0);
};

export function semanticSearch(query: string): SemanticSearchResult[] {
  if (!query.trim()) return [];
  const results: SemanticSearchResult[] = [];

  allProcedures.forEach(({ procedure }) => {
    const objective = procedure.detail.objective || `Estandarizar la ejecución del procedimiento ${procedure.title}.`;
    const body = [
      procedure.code,
      procedure.title,
      procedure.responsibleArea,
      objective,
      procedure.detail.scope,
      procedure.detail.legalRequirements.join(' '),
      procedure.detail.documents.join(' '),
      procedure.detail.formats.join(' '),
      procedure.detail.flowSteps.map((step) => `${step.label} ${step.description}`).join(' '),
    ].join(' ');
    const score = scoreText(body, query);
    if (score > 0) {
      results.push({
        id: `proc-${procedure.id}`,
        type: 'procedimiento',
        title: `${procedure.code} · ${procedure.title}`,
        subtitle: procedure.responsibleArea || 'Sin responsable explícito',
        body: objective,
        score: score + 2,
        procedureId: procedure.id,
      });
    }
  });

  allFunctionProfiles.forEach((profile) => {
    const profileText = [profile.denomination, profile.dependency, profile.functionalArea, profile.purpose].join(' ');
    const profileScore = scoreText(profileText, query);
    if (profileScore > 0) {
      results.push({
        id: `profile-${profile.id}`,
        type: 'cargo',
        title: profile.denomination,
        subtitle: `${profile.dependency} · Código ${profile.code} grado ${profile.grade}`,
        body: profile.purpose,
        score: profileScore + 1,
        profileId: profile.id,
      });
    }

    profile.functions.forEach((fn) => {
      const score = scoreText(`${profileText} ${fn.number} ${fn.description}`, query);
      if (score > 0) {
        results.push({
          id: `fn-${fn.id}`,
          type: 'funcion',
          title: `${profile.denomination} · Función ${fn.number}`,
          subtitle: profile.dependency,
          body: fn.description,
          score,
          profileId: profile.id,
        });
      }
    });
  });

  getNormativeLibraryRows().forEach((norm) => {
    const score = scoreText([norm.title, norm.category, norm.summary, norm.impact, norm.recommendation, norm.affectedProcedureCodes.join(' ')].join(' '), query);
    if (score > 0) {
      results.push({
        id: `norm-${norm.id}`,
        type: 'norma',
        title: norm.title,
        subtitle: norm.category,
        body: norm.impact,
        score,
      });
    }
  });

  getMissingRecommendationRows().forEach((item) => {
    const score = scoreText([item.title, item.reason, item.normativeBasis, item.suggestedResponsible].join(' '), query);
    if (score > 0) {
      results.push({
        id: `missing-${item.id}`,
        type: 'recomendacion',
        title: item.title,
        subtitle: item.suggestedResponsible,
        body: item.reason,
        score,
      });
    }
  });

  return results.sort((a, b) => b.score - a.score).slice(0, 40);
}


const riskScore: Record<IntelligenceRisk, number> = { critico: 100, alto: 78, medio: 52, bajo: 28 };

const procedureKeywords = (procedure: ProcedureItem) => normalize([
  procedure.code,
  procedure.title,
  procedure.responsibleArea,
  procedure.detail.objective,
  procedure.detail.scope,
  procedure.detail.documents.join(' '),
  procedure.detail.formats.join(' '),
].join(' '));

const inferRelationKind = (procedure: ProcedureItem, profile?: FunctionProfile): RelationKind => {
  if (!profile) return 'sin_soporte';
  const p = procedureKeywords(procedure);
  const cargo = normalize(`${profile.denomination} ${profile.dependency} ${profile.functionalArea}`);
  if (/operario|servicios generales|conductor/.test(cargo) && /mantenimiento|limpieza|ornato|vehiculo|viatico|evento|infraestructura|predio|almacen/.test(p)) return 'apoyo_operativo_condicionado';
  if (/control interno/.test(cargo) || /ley|decreto|norma|paac|ptep|transparencia|archivo|comisaria|contrat/.test(p)) return 'normativa';
  const relationships = getProcedureRelationships(procedure);
  const rel = relationships.find((item) => item.profile.id === profile.id);
  if (rel?.confidence === 'directa') return 'directa';
  if (rel?.confidence === 'probable') return 'parcial';
  return 'sugerida';
};

const trustFromKind = (kind: RelationKind, functionCount = 0): { trust: RelationTrustLevel; score: number } => {
  if (kind === 'directa') return { trust: 'alta', score: Math.min(98, 82 + functionCount * 2) };
  if (kind === 'normativa') return { trust: 'media', score: 68 };
  if (kind === 'parcial' || kind === 'apoyo_operativo_condicionado') return { trust: 'media', score: Math.min(72, 50 + functionCount * 2) };
  if (kind === 'sugerida') return { trust: 'baja', score: 38 };
  return { trust: 'validacion', score: 12 };
};

export function buildChangeTrace(): ChangeTraceItem[] {
  const plan = buildUpdatePlan().slice(0, 90);
  return plan.map((item, index) => ({
    id: `trace-${item.id}`,
    date: toDate(-Math.min(index * 2, 180)),
    actor: item.responsible || 'Mesa técnica institucional',
    targetType: item.targetType === 'modulo' ? 'procedimiento' : item.targetType,
    targetId: item.targetId,
    title: item.title,
    previousState: item.targetType === 'procedimiento' ? 'Procedimiento vigente en manual base, con revisión pendiente de suficiencia funcional y normativa.' : 'Ficha vigente en manual base 2018.',
    newState: item.status === 'implementado' ? 'Cambio incorporado en propuesta de actualización.' : 'Cambio propuesto para revisión, aprobación y adopción formal.',
    justification: item.observation || 'Hallazgo derivado de matriz de relación entre manual de procesos y manual de funciones.',
    observation: `Prioridad ${riskLabel[item.priority]}. Evidencia esperada: ${item.evidence}`,
  }));
}

export function buildRelationConfidenceMatrix(): RelationConfidenceItem[] {
  return getProcedureIntelligenceRows().flatMap((row) => {
    const relationships = getProcedureRelationships(row.procedure);
    if (!relationships.length) {
      return [{
        id: `conf-${row.procedure.id}-none`,
        procedureId: row.procedure.id,
        procedureCode: row.procedure.code,
        procedureTitle: row.procedure.title,
        functionNumbers: [],
        relationKind: 'sin_soporte' as RelationKind,
        trust: 'validacion' as RelationTrustLevel,
        score: 10,
        reason: 'No se identificó cargo con función expresa suficiente para soportar el procedimiento.',
        validationNeed: 'Definir responsable funcional y ajustar manual de funciones o procedimiento.',
      }];
    }
    return relationships.map((relationship) => {
      const kind = inferRelationKind(row.procedure, relationship.profile);
      const trust = trustFromKind(kind, relationship.functions.length);
      return {
        id: `conf-${row.procedure.id}-${relationship.profile.id}`,
        procedureId: row.procedure.id,
        procedureCode: row.procedure.code,
        procedureTitle: row.procedure.title,
        profileId: relationship.profile.id,
        profileName: `${relationship.profile.denomination} · ${relationship.profile.dependency}`,
        functionNumbers: relationship.functions.map((fn) => fn.number),
        relationKind: kind,
        trust: trust.trust,
        score: trust.score,
        reason: relationship.reason || 'Relación calculada con reglas estrictas por texto funcional, responsable y naturaleza del procedimiento.',
        validationNeed: trust.trust === 'alta' ? 'Validación documental ordinaria.' : 'Revisar en mesa técnica antes de adoptar como responsabilidad formal.',
      };
    });
  });
}

export function buildEvidenceModel(): ProcedureEvidenceModel[] {
  return allProcedures.map(({ procedure }) => {
    const sheet = buildProcedureSheet(procedure);
    const text = procedureKeywords(procedure);
    const system = /secop|contrat/.test(text) ? 'SECOP II, expediente contractual físico/digital y archivo de gestión.'
      : /pqr|ventanilla|correspondencia|tutela/.test(text) ? 'Sistema de PQRSD, ventanilla única, correo institucional y archivo de gestión.'
      : /presupuesto|pago|recaudo|predial|contadur|tesorer/.test(text) ? 'Software financiero/contable, bancos, archivo presupuestal y tesorería.'
      : /archivo|document/.test(text) ? 'Archivo de gestión, archivo central, inventarios documentales y TRD.'
      : /comis|familia|violencia|derechos/.test(text) ? 'Expediente reservado de Comisaría, sistema institucional y soportes de articulación interinstitucional.'
      : 'Expediente del procedimiento, archivo de gestión y carpeta digital institucional.';
    return {
      procedureId: procedure.id,
      procedureCode: procedure.code,
      title: procedure.title,
      minimumEvidences: sheet.evidences.slice(0, 6),
      associatedFormats: procedure.detail.formats.length ? procedure.detail.formats : ['Formato de solicitud o registro del trámite.', 'Lista de chequeo del procedimiento.', 'Acta, informe o constancia de cierre según aplique.'],
      mandatorySupports: uniq([...procedure.detail.documents.slice(0, 4), 'Radicado o registro de ingreso.', 'Soporte de revisión y aprobación.', 'Evidencia de comunicación o entrega al usuario interno/externo.']),
      preservationSystem: system,
      custodyResponsible: sheet.responsible,
      retentionHint: /archivo|document/.test(text) ? 'Aplicar TRD y disposición final aprobada por la entidad.' : 'Conservar conforme a TRD, expediente administrativo y normativa sectorial aplicable.',
    };
  });
}

export function buildPrioritizedNormativeUpdates(): PrioritizedNormativeUpdate[] {
  return getProcedureIntelligenceRows().map((row) => {
    const factors = [
      row.risk === 'critico' || row.risk === 'alto' ? `Riesgo ${riskLabel[row.risk]}` : '',
      row.coverage !== 'cubierto' ? `Cobertura funcional ${coverageLabel[row.coverage]}` : '',
      /contrat|pago|recaudo|presup|tutela|comis|violencia|archivo|pqr|licencia|sancion/i.test(`${row.procedure.title} ${row.procedure.code}`) ? 'Impacto jurídico/financiero/ciudadano' : '',
      row.functionCount === 0 ? 'Sin función específica asociada' : '',
    ].filter(Boolean);
    const score = riskScore[row.risk] + (row.coverage !== 'cubierto' ? 18 : 0) + (row.functionCount === 0 ? 20 : 0) + Math.min(14, row.profileCount * 2);
    return {
      id: `priority-${row.procedure.id}`,
      targetId: row.procedure.id,
      targetCode: row.procedure.code,
      title: row.procedure.title,
      priority: score >= 120 ? 'critico' : score >= 92 ? 'alto' : score >= 58 ? 'medio' : 'bajo',
      score,
      factors: factors.length ? factors : ['Procedimiento documentado con control ordinario.'],
      recommendedFirstAction: score >= 92 ? 'Agendar mesa técnica, validar responsable, ajustar flujo y definir evidencia mínima antes de adopción.' : 'Actualizar ficha, controles e indicadores en ciclo ordinario de mejora.',
      responsible: row.responsible,
    };
  }).sort((a, b) => b.score - a.score);
}

export function buildValidationChecklist(): ValidationChecklistItem[] {
  const labelSet = [
    'Tiene objetivo claro', 'Tiene alcance', 'Tiene responsable', 'Tiene entradas y salidas', 'Tiene flujo', 'Tiene controles', 'Tiene riesgos', 'Tiene evidencias', 'Tiene relación con funciones', 'Tiene normativa asociada', 'Tiene indicadores', 'Tiene versión'
  ];
  return allProcedures.map(({ procedure }) => {
    const sheet = buildProcedureSheet(procedure);
    const rels = getProcedureRelationships(procedure);
    const data: Record<string, boolean | 'parcial'> = {
      'Tiene objetivo claro': Boolean(procedure.detail.objective),
      'Tiene alcance': Boolean(procedure.detail.scope),
      'Tiene responsable': Boolean(procedure.responsibleArea),
      'Tiene entradas y salidas': sheet.inputs.length > 0 && sheet.outputs.length > 0,
      'Tiene flujo': procedure.detail.flowSteps.length > 0,
      'Tiene controles': sheet.controls.length > 0 ? true : 'parcial',
      'Tiene riesgos': sheet.risks.length > 0 ? true : 'parcial',
      'Tiene evidencias': sheet.evidences.length > 0,
      'Tiene relación con funciones': rels.length ? true : false,
      'Tiene normativa asociada': procedure.detail.legalRequirements.length > 0 ? true : 'parcial',
      'Tiene indicadores': procedure.detail.variablesToMeasure.length > 0 ? true : 'parcial',
      'Tiene versión': true,
    };
    const checks = labelSet.map((label) => ({
      label,
      status: data[label] === true ? 'cumple' as const : data[label] === 'parcial' ? 'parcial' as const : 'pendiente' as const,
      observation: data[label] === true ? 'Elemento identificado en la ficha.' : data[label] === 'parcial' ? 'Existe información general, pero requiere precisión.' : 'Debe completarse antes de aprobación.',
    }));
    const completion = Math.round((checks.filter((check) => check.status === 'cumple').length / checks.length) * 100);
    return { procedureId: procedure.id, procedureCode: procedure.code, title: procedure.title, checks, completion };
  });
}

const indicatorPack = (procedure: ProcedureItem) => {
  const text = procedureKeywords(procedure);
  if (/pqr|tutela|atencion|ventanilla/.test(text)) return [
    ['Tiempo promedio de respuesta', 'Días transcurridos entre radicación y respuesta / número de solicitudes cerradas', 'Mensual', procedure.responsibleArea, 'Medir oportunidad de atención.'],
    ['Cumplimiento de términos', 'Solicitudes respondidas dentro del término / total de solicitudes x 100', 'Mensual', procedure.responsibleArea, 'Controlar riesgo legal y ciudadano.'],
    ['Devoluciones o reprocesos', 'Solicitudes devueltas o corregidas / total tramitadas x 100', 'Mensual', procedure.responsibleArea, 'Identificar fallas de calidad.'],
  ];
  if (/contrat|secop|cuenta|pago/.test(text)) return [
    ['Expedientes completos', 'Expedientes con lista de chequeo completa / total expedientes x 100', 'Mensual', procedure.responsibleArea, 'Reducir riesgo contractual y de pago.'],
    ['Tiempo de trámite contractual', 'Días entre solicitud y publicación/adjudicación/cierre', 'Por proceso', procedure.responsibleArea, 'Medir eficiencia del ciclo.'],
    ['Observaciones de revisión', 'Número de devoluciones por falencias documentales', 'Mensual', procedure.responsibleArea, 'Mejorar calidad documental.'],
  ];
  if (/presup|recaudo|predial|contadur|tesorer|banco/.test(text)) return [
    ['Oportunidad de reporte', 'Reportes presentados dentro del plazo / reportes programados x 100', 'Mensual', procedure.responsibleArea, 'Controlar cumplimiento financiero.'],
    ['Diferencias de conciliación', 'Valor o número de diferencias pendientes de conciliación', 'Mensual', procedure.responsibleArea, 'Controlar integridad contable.'],
    ['Trámites devueltos', 'Órdenes, pagos o certificados devueltos / total tramitados x 100', 'Mensual', procedure.responsibleArea, 'Reducir reprocesos.'],
  ];
  return [
    ['Tiempo promedio de trámite', 'Días entre inicio y cierre / trámites cerrados', 'Mensual', procedure.responsibleArea, 'Medir oportunidad.'],
    ['Expedientes completos', 'Expedientes con evidencias mínimas / total expedientes x 100', 'Mensual', procedure.responsibleArea, 'Medir calidad documental.'],
    ['Cumplimiento del flujo', 'Casos ejecutados sin saltar pasos obligatorios / total casos x 100', 'Trimestral', procedure.responsibleArea, 'Medir adherencia al procedimiento.'],
  ];
};

export function buildProcedureIndicatorSuggestions(): ProcedureIndicatorSuggestion[] {
  return allProcedures.map(({ procedure }) => ({
    procedureId: procedure.id,
    procedureCode: procedure.code,
    title: procedure.title,
    indicators: indicatorPack(procedure).map(([name, formula, frequency, owner, purpose]) => ({ name, formula, frequency, owner, purpose })),
  }));
}

export function buildCriticalityClassification(): ProcedureCriticalityItem[] {
  return getProcedureIntelligenceRows().map((row) => {
    const text = `${row.procedure.code} ${row.procedure.title} ${row.procedure.responsibleArea}`;
    const category = /^PE/.test(row.procedure.code) ? 'Estratégico'
      : /^PEC/.test(row.procedure.code) ? 'Evaluación y control'
      : /contrat|jurid|tutela|comis|polic/i.test(text) ? 'Jurídico crítico'
      : /hacienda|pago|presup|recaudo|predial/i.test(text) ? 'Financiero crítico'
      : /PQR|Atención|Ventanilla|Usuario/i.test(text) ? 'Atención ciudadana'
      : /GPSP|planta|servicios públicos|facturación/i.test(text) ? 'Servicios públicos'
      : /^PM/.test(row.procedure.code) ? 'Misional'
      : 'Apoyo';
    return { procedureId: row.procedure.id, procedureCode: row.procedure.code, title: row.procedure.title, category, risk: row.risk, reason: row.riskReasons[0] || 'Clasificación por macroproceso, impacto y responsable.' };
  });
}

export function buildDependencyMap(): DependencyMapItem[] {
  const fixed: DependencyMapItem[] = [
    { id: 'dep-pdm-poai', fromCode: 'PE-PE-EPD-01', toCode: 'PE-PE-POAI-02', relation: 'Plan de Desarrollo alimenta POAI', impact: 'Sin metas y proyectos del plan, el POAI queda desarticulado.' },
    { id: 'dep-pdm-accion', fromCode: 'PE-PE-EPD-01', toCode: 'PE-PE-APA-03', relation: 'Plan de Desarrollo alimenta Plan de Acción', impact: 'El seguimiento institucional depende de metas, indicadores y responsables.' },
    { id: 'dep-banco-poai', fromCode: 'PE-PE-BP-04', toCode: 'PE-PE-POAI-02', relation: 'Banco de Proyectos alimenta POAI', impact: 'Los proyectos no viables no deberían pasar a programación de inversión.' },
    { id: 'dep-paa-estudio', fromCode: 'PA-GC-PA-06', toCode: 'PA-GC-EP-08', relation: 'Plan Anual de Adquisiciones antecede estudios previos', impact: 'La contratación debe estar planeada y justificada.' },
    { id: 'dep-cdp-pago', fromCode: 'PA-GF-CDP-06', toCode: 'PA-GF-OPD-11', relation: 'CDP/RP antecede orden de pago', impact: 'Evita compromisos sin respaldo presupuestal.' },
    { id: 'dep-cuenta-pago', fromCode: 'PA-GC-PCC-10', toCode: 'PA-GF-OPD-11', relation: 'Cuenta de cobro antecede orden de pago', impact: 'El pago depende de soportes completos y aprobación.' },
    { id: 'dep-pqrs-doc', fromCode: 'PA-AC-PQR-01', toCode: 'PA-GD-OAG-01', relation: 'PQRSD genera expediente documental', impact: 'La trazabilidad de respuesta depende de radicación y archivo.' },
    { id: 'dep-trd-elim', fromCode: 'PA-GD-TRD-06', toCode: 'PA-GD-ED-05', relation: 'TRD antecede eliminación documental', impact: 'No debe eliminarse documentación sin TRD y autorización.' },
  ];
  return fixed.filter((item) => findByCode(item.fromCode) && findByCode(item.toCode));
}

export function buildResponsibilityInconsistencies(): ResponsibilityInconsistencyItem[] {
  return getProcedureIntelligenceRows().flatMap((row) => {
    const text = `${row.procedure.code} ${row.procedure.title} ${row.responsible}`;
    const items: ResponsibilityInconsistencyItem[] = [];
    const add = (suggestedResponsible: string, severity: IntelligenceRisk, reason: string, action: string) => items.push({ id: `inc-${row.procedure.id}-${items.length}`, procedureId: row.procedure.id, procedureCode: row.procedure.code, title: row.procedure.title, currentResponsible: row.responsible, suggestedResponsible, severity, reason, action });
    if (/PM-GDS-(PP|RP)/.test(row.procedure.code) && !/econ/i.test(row.responsible)) add('Secretaría de Desarrollo Económico, Sostenible y Turismo', 'medio', 'El procedimiento trata de productividad/proyectos productivos, materia más propia de desarrollo económico.', 'Trasladar liderazgo o formalizar articulación con Desarrollo Social.');
    if (/PM-GPSP-(FSP|MF|RSP|RSSP|AP)/.test(row.procedure.code)) add('Hacienda / Servicios Públicos con acto de asignación', 'alto', 'El procedimiento mezcla facturación, recaudo o cartera de servicios públicos sin función específica clara.', 'Definir responsable funcional y actualizar manual/procedimiento.');
    if (/PEC-CVE-OPI-08/.test(row.procedure.code)) add('Secretaría de Gobierno / Control Disciplinario según estructura vigente', 'alto', 'Control Interno no debería confundirse con primera instancia disciplinaria si su rol es evaluador independiente.', 'Validar competencia y separar control interno de control disciplinario.');
    if (row.coverage === 'no_cubierto') add('Por definir en mesa técnica', 'critico', 'No hay función soporte suficiente en manual de funciones.', 'Asignar responsable y ajustar manual de funciones.');
    return items;
  });
}

export function buildAdministrativeActDraft(): AdministrativeActDraft {
  const priority = buildPrioritizedNormativeUpdates().slice(0, 12);
  const profileFindings = allFunctionProfiles.filter((profile) => getProfileUpdateFindings(profile.id).length).slice(0, 8);
  return {
    title: 'Borrador base de acto administrativo para adopción de actualización de manuales',
    considerations: [
      'Que la entidad cuenta con manual de procesos y procedimientos y manual específico de funciones que requieren actualización, armonización y control de vigencia.',
      'Que el Modelo Integrado de Planeación y Gestión exige fortalecer la planeación, operación, control, evaluación y mejora de los procesos institucionales.',
      'Que la actualización debe conservar trazabilidad entre procedimientos, cargos, funciones, evidencias, riesgos, controles, normativa y responsables.',
    ],
    technicalJustification: priority.map((item) => `${item.targetCode}: ${item.factors.join('; ')}.`),
    proposedChanges: [
      'Actualizar fichas de procedimiento con objetivo, alcance, entradas, salidas, RACI, evidencias mínimas, riesgos, controles e indicadores.',
      'Actualizar fichas de cargo con competencias comunes, comportamentales, funcionales y requisitos cuando aplique.',
      'Corregir procedimientos sin soporte funcional, relaciones parciales, duplicidades y responsables inconsistentes.',
      'Adoptar mecanismos de versionamiento, seguimiento, auditoría y aprobación de cambios.',
    ],
    procedureAnnex: priority.map((item) => `${item.targetCode} · ${item.title}: ${item.recommendedFirstAction}`),
    functionAnnex: profileFindings.map((profile) => `${profile.denomination} · ${profile.dependency}: ${getProfileUpdateFindings(profile.id).map((finding) => finding.title).join('; ')}`),
    articles: [
      'Artículo 1. Adoptar la actualización del Manual de Procesos y Procedimientos de la Alcaldía Municipal de Gachetá conforme al anexo técnico que hace parte integral del presente acto.',
      'Artículo 2. Adoptar los ajustes al Manual Específico de Funciones y Competencias Laborales, conforme a las fichas actualizadas y validadas por las dependencias competentes.',
      'Artículo 3. Ordenar a las dependencias responsables implementar los procedimientos, evidencias, controles e indicadores definidos en el anexo técnico.',
      'Artículo 4. Encargar a Control Interno el seguimiento independiente al cumplimiento del plan de actualización y a Planeación/Gobierno la administración de versiones.',
      'Artículo 5. Derogar las disposiciones internas que sean contrarias a la actualización adoptada y publicar la versión vigente en los medios institucionales.',
    ],
  };
}

export function buildMaturityAssessment(): MaturityAssessmentItem[] {
  const checklist = new Map(buildValidationChecklist().map((item) => [item.procedureId, item]));
  return getProcedureIntelligenceRows().map((row) => {
    const completion = checklist.get(row.procedure.id)?.completion ?? 0;
    const level: MaturityLevel = row.coverage === 'no_cubierto' || completion < 35 ? 1
      : completion < 55 ? 2
      : completion < 75 ? 3
      : row.risk === 'alto' || row.risk === 'critico' ? 4
      : 5;
    const labels: Record<MaturityLevel, string> = {
      1: 'Existe informalmente o con brecha crítica',
      2: 'Documentado de forma básica',
      3: 'Documentado y relacionado con funciones',
      4: 'Controlado con indicadores y evidencias',
      5: 'Medido, auditado y mejorado',
    };
    return {
      procedureId: row.procedure.id,
      procedureCode: row.procedure.code,
      title: row.procedure.title,
      level,
      label: labels[level],
      evidence: `Checklist ${completion}%, cobertura ${coverageLabel[row.coverage]}, riesgo ${riskLabel[row.risk]}.`,
      nextStep: level < 3 ? 'Completar ficha, responsable, evidencia y relación funcional.' : level < 5 ? 'Fortalecer indicadores, controles, auditoría y mejora.' : 'Mantener seguimiento y mejora continua.',
    };
  });
}

export function buildExecutiveSummary(): ExecutiveSummaryItem[] {
  const q = buildQualityIndicators();
  const inconsistencies = buildResponsibilityInconsistencies().length;
  const maturity = buildMaturityAssessment();
  const mature = maturity.filter((item) => item.level >= 4).length;
  return [
    { id: 'bien', title: 'Qué está bien', value: q.covered, tone: 'positivo', detail: 'Procedimientos con soporte funcional identificado.', action: 'Mantener trazabilidad, evidencias y control de versiones.' },
    { id: 'riesgo', title: 'Qué está en riesgo', value: q.highRisk, tone: 'alto', detail: 'Procedimientos clasificados con riesgo alto o crítico.', action: 'Priorizar mesa técnica y ajuste de responsables.' },
    { id: 'actualizar', title: 'Qué debe actualizarse', value: q.profilesWithUpdates, tone: 'medio', detail: 'Cargos con hallazgos o acciones de actualización funcional.', action: 'Actualizar competencias, funciones y requisitos.' },
    { id: 'decidir', title: 'Qué requiere decisión', value: inconsistencies, tone: 'critico', detail: 'Inconsistencias de responsable o soporte funcional.', action: 'Definir responsable competente y acto de asignación cuando aplique.' },
    { id: 'impacto', title: 'Impacto institucional', value: `${mature}/${maturity.length}`, tone: 'positivo', detail: 'Procedimientos en nivel de madurez 4 o 5.', action: 'Elevar madurez de procedimientos críticos con evidencias e indicadores.' },
  ];
}

export function exportAdministrativeActDraft() {
  const draft = buildAdministrativeActDraft();
  const section = (title: string, items: string[]) => [title, ...items.map((item, index) => `${index + 1}. ${item}`)].join('\n');
  const content = [
    draft.title,
    '',
    section('CONSIDERANDOS', draft.considerations),
    '',
    section('JUSTIFICACIÓN TÉCNICA', draft.technicalJustification),
    '',
    section('CAMBIOS PROPUESTOS', draft.proposedChanges),
    '',
    section('ANEXO DE PROCEDIMIENTOS AJUSTADOS', draft.procedureAnnex),
    '',
    section('ANEXO DE FUNCIONES AJUSTADAS', draft.functionAnnex),
    '',
    section('ARTICULADO BASE', draft.articles),
  ].join('\n');
  downloadTextFile('borrador-acto-administrativo-procesux.txt', content);
}

export function exportValidationChecklist() {
  const rows = buildValidationChecklist().flatMap((item) => item.checks.map((check) => ({
    Codigo: item.procedureCode,
    Procedimiento: item.title,
    Cumplimiento: `${item.completion}%`,
    Criterio: check.label,
    Estado: check.status,
    Observacion: check.observation,
  })));
  downloadTextFile('checklist-validacion-procedimientos.tsv', toTsv(rows), 'text/tab-separated-values;charset=utf-8');
}

export function downloadTextFile(filename: string, content: string, type = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function toTsv(rows: Record<string, string | number | undefined>[]) {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const escape = (value: unknown) => String(value ?? '').replace(/\t/g, ' ').replace(/\r?\n/g, ' ');
  return [headers.join('\t'), ...rows.map((row) => headers.map((header) => escape(row[header])).join('\t'))].join('\n');
}

export function exportRelationshipMatrix() {
  const rows = getProcedureIntelligenceRows().map((row) => ({
    Codigo: row.procedure.code,
    Procedimiento: row.procedure.title,
    Responsable: row.responsible,
    Cobertura: coverageLabel[row.coverage],
    Riesgo: riskLabel[row.risk],
    Decision: row.decision,
    Cargos: row.profileCount,
    Funciones: row.functionCount,
    Observacion: row.riskReasons.join(' | '),
  }));
  downloadTextFile('matriz-relaciones-procesux.tsv', toTsv(rows), 'text/tab-separated-values;charset=utf-8');
}

export function exportUpdatePlan() {
  const rows = buildUpdatePlan().map((item) => ({
    Tipo: item.targetType,
    Id: item.targetId,
    Titulo: item.title,
    Dependencia: item.dependency,
    Prioridad: riskLabel[item.priority],
    Estado: item.status,
    Responsable: item.responsible,
    FechaCompromiso: item.dueDate,
    Evidencia: item.evidence,
    Observacion: item.observation,
  }));
  downloadTextFile('plan-actualizacion-procesux.tsv', toTsv(rows), 'text/tab-separated-values;charset=utf-8');
}

export function exportProcedureSheet(procedure: ProcedureItem) {
  const sheet = buildProcedureSheet(procedure);
  const content = [
    `FICHA INSTITUCIONAL DEL PROCEDIMIENTO`,
    `Código: ${procedure.code}`,
    `Procedimiento: ${procedure.title}`,
    `Responsable: ${sheet.responsible}`,
    `Objetivo: ${sheet.objective}`,
    `Alcance: ${sheet.scope}`,
    '',
    'RACI:',
    ...sheet.raci.map((item) => `${item.role} · ${item.actor}: ${item.responsibility}`),
    '',
    'Riesgos:',
    ...sheet.risks.map((item) => `- ${item}`),
    '',
    'Controles:',
    ...sheet.controls.map((item) => `- ${item}`),
    '',
    'Indicadores:',
    ...sheet.indicators.map((item) => `- ${item}`),
    '',
    'Evidencias:',
    ...sheet.evidences.map((item) => `- ${item}`),
    '',
    'Funciones relacionadas:',
    ...sheet.relatedFunctions.map((item) => `- ${item}`),
    '',
    'Propuesta de actualización:',
    ...sheet.updateSummary.map((item) => `- ${item}`),
  ].join('\n');
  downloadTextFile(`ficha-${procedure.code.toLowerCase()}.txt`, content);
}

export function exportProfileSheet(profile: FunctionProfile) {
  const actions = getProfileFunctionUpdateActions(profile.id);
  const findings = getProfileUpdateFindings(profile.id);
  const content = [
    'FICHA INSTITUCIONAL DEL CARGO',
    `Cargo: ${profile.denomination}`,
    `Código: ${profile.code}`,
    `Grado: ${profile.grade}`,
    `Nivel: ${profile.level}`,
    `Dependencia: ${profile.dependency}`,
    `Área funcional: ${profile.functionalArea}`,
    `Jefe inmediato: ${profile.immediateBoss}`,
    `Propósito: ${profile.purpose}`,
    '',
    'Hallazgos:',
    ...findings.map((finding) => `- ${finding.title}: ${finding.summary}`),
    '',
    'Acciones de actualización:',
    ...actions.map((action) => `- ${action.action.toUpperCase()} · ${action.title}: ${action.proposedText}`),
    '',
    'Funciones:',
    ...profile.functions.map((fn) => `${fn.number}. ${fn.description}`),
  ].join('\n');
  downloadTextFile(`ficha-cargo-${profile.id}.txt`, content);
}

export function buildPublicPath(kind: 'procesos' | 'cargos', id: string) {
  return `/publico/${kind}/${encodeURIComponent(id)}`;
}

export interface ChangeImpactItem {
  procedureId: string;
  code: string;
  title: string;
  profiles: number;
  functions: number;
  norms: number;
  dependencies: number;
  leader: string;
  supportDependencies: string[];
  summary: string;
}

export interface SimulationScenarioItem {
  id: string;
  title: string;
  question: string;
  target: string;
  effects: string[];
  requiredActions: string[];
  risk: IntelligenceRisk;
}

export interface GlobalBeforeAfterItem {
  id: string;
  scope: string;
  currentState: string;
  proposedState: string;
  impact: string;
  priority: IntelligenceRisk;
}

export interface DocumentQualityItem {
  procedureId: string;
  code: string;
  title: string;
  score: number;
  missing: string[];
  status: 'alto' | 'medio' | 'bajo';
}

export interface GlossaryItem {
  term: string;
  category: string;
  definition: string;
  example: string;
}

export interface InstitutionalFaqItem {
  question: string;
  answer: string;
  actionLabel: string;
  targetType?: 'procedimiento' | 'cargo';
  targetId?: string;
}

export interface InstitutionalTagItem {
  tag: string;
  purpose: string;
  suggestedUse: string;
  examples: string[];
}

export interface UpdateEvidenceControlItem {
  id: string;
  title: string;
  target: string;
  evidenceType: string;
  responsible: string;
  status: 'pendiente' | 'cargada' | 'validada';
  note: string;
}

export interface MeetingMinuteDraft {
  title: string;
  sections: { title: string; items: string[] }[];
}

export interface PublicationReadinessItem {
  id: string;
  title: string;
  status: 'listo' | 'revision_juridica' | 'revision_dependencia' | 'aprobacion' | 'no_publicable';
  reason: string;
  nextStep: string;
}

export interface RoleControlItem {
  role: string;
  description: string;
  canSee: string[];
  canDo: string[];
}

export interface InstitutionalTimelineItem {
  id: string;
  date: string;
  title: string;
  status: 'hecho' | 'en_proceso' | 'siguiente';
  description: string;
}

export interface DependencySummaryItem {
  dependency: string;
  procedures: number;
  profiles: number;
  highRisk: number;
  normativeUpdates: number;
  suggestedProcedures: number;
  score: number;
  recommendation: string;
}

export interface UpdateAssistantStep {
  step: number;
  title: string;
  description: string;
  expectedOutput: string;
  relatedModule: string;
}

const normalizeResponsible = (value: string) => value.trim().replace(/\s+/g, ' ') || 'Sin responsable definido';

export function buildChangeImpactModel(): ChangeImpactItem[] {
  const norms = getNormativeLibraryRows();
  const deps = buildDependencyMap();
  return getProcedureIntelligenceRows().map((row) => {
    const relationships = getProcedureRelationships(row.procedure.id);
    const affectedNorms = norms.filter((norm) => norm.affectedProcedureCodes.includes(row.procedure.code));
    const dependencyLinks = deps.filter((item) => item.fromCode === row.procedure.code || item.toCode === row.procedure.code);
    const supportDependencies = uniq(relationships.map((rel) => rel.profile.dependency).filter(Boolean)).slice(0, 4);
    return {
      procedureId: row.procedure.id,
      code: row.procedure.code,
      title: row.procedure.title,
      profiles: relationships.length,
      functions: relationships.reduce((acc, rel) => acc + rel.functionNumbers.length, 0),
      norms: affectedNorms.length,
      dependencies: dependencyLinks.length,
      leader: normalizeResponsible(row.responsible),
      supportDependencies,
      summary: `Modificar este procedimiento impacta ${relationships.length} cargo(s), ${relationships.reduce((acc, rel) => acc + rel.functionNumbers.length, 0)} función(es), ${affectedNorms.length} norma(s) y ${dependencyLinks.length} dependencia(s) procedimentales.`,
    };
  }).sort((a, b) => (b.functions + b.norms + b.dependencies) - (a.functions + a.norms + a.dependencies));
}

export function buildUpdateSimulationScenarios(): SimulationScenarioItem[] {
  return [
    {
      id: 'eliminar-procedimiento-sin-soporte',
      title: 'Eliminar procedimiento sin soporte funcional',
      question: '¿Qué pasa si se elimina un procedimiento sin dueño funcional claro?',
      target: 'Procedimientos sin soporte o con relación parcial',
      effects: ['Se reduce ruido documental si el procedimiento no se ejecuta.', 'Puede perderse una ruta operativa si sí se ejecuta informalmente.', 'Debe dejarse acta o justificación técnica de eliminación.'],
      requiredActions: ['Validar ejecución real con dependencia.', 'Revisar si existe norma que lo exige.', 'Actualizar mapa de procesos, manual y acto de adopción.'],
      risk: 'alto',
    },
    {
      id: 'trasladar-hacienda',
      title: 'Trasladar procedimiento financiero a Hacienda',
      question: '¿Qué pasa si un procedimiento de recaudo, pago o presupuesto se traslada a Hacienda?',
      target: 'Servicios públicos, pagos, recaudo, informes financieros',
      effects: ['Mejora coherencia funcional con el manual de Hacienda.', 'Puede requerir ajustar responsables en flujo y RACI.', 'Reduce riesgo de decisiones financieras en dependencias no competentes.'],
      requiredActions: ['Actualizar responsable del procedimiento.', 'Ajustar funciones o acto de asignación si aplica.', 'Definir controles de segregación entre área técnica y financiera.'],
      risk: 'medio',
    },
    {
      id: 'agregar-funcion-tecnica',
      title: 'Agregar función técnica especializada',
      question: '¿Qué pasa si se agrega una función expresa para servicios públicos o sistemas de información?',
      target: 'Cargos técnicos o profesionales con brecha funcional',
      effects: ['Cierra brechas entre procedimientos existentes y manual de funciones.', 'Obliga a revisar requisitos, competencias y dependencia.', 'Puede requerir estudio técnico y modificación formal del manual.'],
      requiredActions: ['Preparar justificación técnica.', 'Validar competencias laborales por nivel jerárquico.', 'Incluir en proyecto de acto administrativo.'],
      risk: 'alto',
    },
  ];
}

export function buildGlobalBeforeAfter(): GlobalBeforeAfterItem[] {
  const q = buildQualityIndicators();
  return [
    { id: 'relaciones', scope: 'Relaciones proceso ↔ función', currentState: `${q.partial} relaciones parciales y ${q.uncovered} sin soporte`, proposedState: 'Matriz validada por confianza, soporte normativo, RACI y evidencias mínimas.', impact: 'Mejora trazabilidad y defensa técnica de responsables.', priority: 'alto' },
    { id: 'normativa', scope: 'Actualización normativa', currentState: 'Manual 2018 con cambios normativos posteriores por incorporar.', proposedState: 'Manual actualizado con PTEP, Ley 2126, Gobierno Digital, gestión documental, contratación y competencias laborales.', impact: 'Reduce riesgo de obsolescencia normativa.', priority: 'critico' },
    { id: 'procesos', scope: 'Calidad documental de procesos', currentState: 'Fichas con nivel variable de detalle y algunos flujos/manuales incompletos.', proposedState: 'Ficha estándar con objetivo, alcance, responsable, riesgos, controles, indicadores, evidencias, flujo y versión.', impact: 'Permite auditoría, publicación y seguimiento.', priority: 'alto' },
    { id: 'seguimiento', scope: 'Seguimiento institucional', currentState: 'Recomendaciones como diagnóstico.', proposedState: 'Plan ejecutable con estados, evidencias de cierre, actas y aprobación.', impact: 'Convierte el diagnóstico en proyecto institucional controlado.', priority: 'medio' },
  ];
}

export function buildDocumentQualityValidator(): DocumentQualityItem[] {
  const required = ['Código', 'Nombre', 'Objetivo', 'Alcance', 'Responsable', 'Entradas', 'Salidas', 'Normativa', 'Riesgos', 'Controles', 'Indicadores', 'Flujo', 'Evidencias', 'Formatos', 'Relación con funciones', 'Versión', 'Fecha de actualización'];
  const sheets = allProcedures.map(({ procedure }) => buildProcedureSheet(procedure));
  return sheets.map((sheet) => {
    const missing: string[] = [];
    const proc = sheet.procedure;
    if (!proc.code) missing.push('Código');
    if (!proc.title) missing.push('Nombre');
    if (!sheet.objective) missing.push('Objetivo');
    if (!sheet.scope) missing.push('Alcance');
    if (!sheet.responsible) missing.push('Responsable');
    if (sheet.inputs.length < 2) missing.push('Entradas');
    if (sheet.outputs.length < 2) missing.push('Salidas');
    if (sheet.legalRequirements.length < 1) missing.push('Normativa');
    if (sheet.risks.length < 1) missing.push('Riesgos');
    if (sheet.controls.length < 1) missing.push('Controles');
    if (sheet.indicators.length < 1) missing.push('Indicadores');
    if (!proc.steps?.length) missing.push('Flujo');
    if (sheet.evidences.length < 2) missing.push('Evidencias');
    missing.push('Formatos', 'Versión', 'Fecha de actualización');
    if (!sheet.relatedFunctions.length) missing.push('Relación con funciones');
    const uniqueMissing = uniq(missing);
    const score = Math.max(0, Math.round(((required.length - uniqueMissing.length) / required.length) * 100));
    return { procedureId: proc.id, code: proc.code, title: proc.title, score, missing: uniqueMissing, status: score >= 85 ? 'alto' : score >= 65 ? 'medio' : 'bajo' };
  }).sort((a, b) => a.score - b.score);
}

export function buildInstitutionalGlossary(): GlossaryItem[] {
  return [
    { term: 'Procedimiento', category: 'Gestión por procesos', definition: 'Secuencia documentada de actividades, responsables, controles y evidencias para obtener un resultado institucional.', example: 'Expedición de CDP y RP.' },
    { term: 'Proceso', category: 'Gestión por procesos', definition: 'Conjunto de procedimientos relacionados que transforman entradas en resultados institucionales.', example: 'Gestión Financiera.' },
    { term: 'Macroproceso', category: 'Arquitectura institucional', definition: 'Agrupación superior de procesos estratégicos, misionales, de apoyo o evaluación y control.', example: 'Procesos de apoyo.' },
    { term: 'Función', category: 'Empleo público', definition: 'Actividad o responsabilidad asignada a un empleo dentro del manual específico de funciones.', example: 'Elaborar el POAI.' },
    { term: 'Competencia laboral', category: 'Empleo público', definition: 'Capacidad demostrable para desempeñar funciones, compuesta por conocimientos, habilidades y comportamientos.', example: 'Orientación a resultados.' },
    { term: 'Control', category: 'Control interno', definition: 'Actividad o mecanismo para prevenir, detectar o corregir riesgos de un procedimiento.', example: 'Lista de chequeo de documentos.' },
    { term: 'Riesgo', category: 'Control interno', definition: 'Evento que puede afectar el cumplimiento del objetivo de un procedimiento.', example: 'Respuesta extemporánea a PQRSD.' },
    { term: 'Evidencia', category: 'Gestión documental', definition: 'Soporte documental o digital que demuestra la ejecución y control de una actividad.', example: 'Acta, radicado, informe, certificado.' },
    { term: 'RACI', category: 'Gobernanza', definition: 'Matriz que diferencia Responsable, Aprueba, Consultado e Informado.', example: 'R: Profesional; A: Secretario.' },
    { term: 'PTEP', category: 'Transparencia', definition: 'Programa de Transparencia y Ética Pública que reemplaza y amplía el enfoque PAAC.', example: 'Mapa de riesgos de corrupción y acciones de integridad.' },
    { term: 'MIPG', category: 'Modelo integrado', definition: 'Marco de gestión y desempeño institucional para entidades públicas.', example: 'Política de Gobierno Digital.' },
    { term: 'TRD', category: 'Archivo', definition: 'Tabla de Retención Documental que define series, tiempos de retención y disposición final.', example: 'Serie contractual.' },
    { term: 'SECOP II', category: 'Contratación', definition: 'Plataforma transaccional para gestionar procesos de contratación pública.', example: 'Publicación de estudios previos.' },
    { term: 'PQRSD', category: 'Atención ciudadana', definition: 'Peticiones, quejas, reclamos, sugerencias y denuncias presentadas por ciudadanos.', example: 'Derecho de petición radicado.' },
  ];
}

export function buildInstitutionalFaqs(): InstitutionalFaqItem[] {
  const tutela = allProcedures.find(({ procedure }) => procedure.code === 'PA-AC-RAP-03')?.procedure;
  const bp = allProcedures.find(({ procedure }) => procedure.code === 'PE-PE-BP-04')?.procedure;
  const sisben = allProcedures.find(({ procedure }) => procedure.code === 'PM-GDS-SIFA-17')?.procedure;
  return [
    { question: '¿Quién debe responder una tutela?', answer: 'La respuesta jurídica se soporta principalmente en Gobierno/Jurídica, con insumos de la dependencia involucrada y aprobación de la autoridad competente según el caso.', actionLabel: 'Abrir procedimiento de acciones constitucionales', targetType: tutela ? 'procedimiento' : undefined, targetId: tutela?.id },
    { question: '¿Qué cargo soporta el Banco de Proyectos?', answer: 'El Secretario de Planeación dirige el banco y el Profesional Universitario de Planeación organiza, registra y aplica metodologías de proyectos.', actionLabel: 'Abrir Banco de Proyectos', targetType: bp ? 'procedimiento' : undefined, targetId: bp?.id },
    { question: '¿Quién maneja SISBEN o Familias en Acción?', answer: 'El Técnico Administrativo transversal tiene funciones relacionadas con bases SISBEN y enlace municipal de Más Familias en Acción cuando sea designado.', actionLabel: 'Abrir novedades SIFA', targetType: sisben ? 'procedimiento' : undefined, targetId: sisben?.id },
    { question: '¿Qué procesos deben actualizarse primero?', answer: 'Los clasificados como riesgo alto/crítico, con desactualización normativa o con responsable inconsistente.', actionLabel: 'Revisar prioridad normativa' },
    { question: '¿Qué cargos tienen funciones desactualizadas?', answer: 'Los cargos con hallazgos normativos o brechas de competencias laborales deben revisarse contra Decreto 1083/2015, Decreto 815/2018 y normas sectoriales.', actionLabel: 'Revisar fichas de cargos' },
  ];
}

export function buildInstitutionalTags(): InstitutionalTagItem[] {
  return [
    { tag: 'Revisar con Jurídica', purpose: 'Validar competencia, acto administrativo o fundamento normativo.', suggestedUse: 'Tutelas, sanciones, contratación, comisaría, cobro coactivo.', examples: ['PA-GJ-AL-07', 'PA-GC-CD-02', 'PA-GF-CPC-01'] },
    { tag: 'Revisar con Hacienda', purpose: 'Validar impacto presupuestal, recaudo, pago o contabilidad.', suggestedUse: 'Pagos, CDP/RP, recaudo, servicios públicos, cuentas.', examples: ['PA-GF-CDP-06', 'PA-GF-PT-07', 'PM-GPSP-RSP-08'] },
    { tag: 'Llevar a Comité', purpose: 'Escalar decisiones transversales o de política institucional.', suggestedUse: 'PTEP, MIPG, archivo, gestión del riesgo, víctimas.', examples: ['PE-PE-PAAC-18', 'PE-SG-SIG-01'] },
    { tag: 'Actualizar en acto administrativo', purpose: 'Cambios que alteran manuales, responsables, funciones o adopción formal.', suggestedUse: 'Fusión, eliminación, traslado o creación de procedimientos.', examples: ['PM-GPSP-FSP-06', 'PEC-CVE-OPI-08'] },
    { tag: 'Publicable', purpose: 'Información lista para consulta institucional o pública.', suggestedUse: 'Procedimientos sin observaciones internas sensibles.', examples: ['PA-AC-PQR-01', 'PA-GD-OAG-01'] },
    { tag: 'No publicable', purpose: 'Información con hallazgos internos o pendiente de validación.', suggestedUse: 'Diagnósticos, riesgos no validados, responsables en discusión.', examples: ['Brechas funcionales', 'Recomendaciones preliminares'] },
  ];
}

export function buildUpdateEvidenceControl(): UpdateEvidenceControlItem[] {
  return buildUpdatePlan().slice(0, 24).map((item, index) => ({
    id: `ev-${item.id}`,
    title: item.title,
    target: item.targetId,
    evidenceType: index % 4 === 0 ? 'Acta de mesa técnica' : index % 4 === 1 ? 'Concepto jurídico' : index % 4 === 2 ? 'Informe técnico' : 'Versión ajustada del procedimiento',
    responsible: item.responsible,
    status: index % 5 === 0 ? 'validada' : index % 3 === 0 ? 'cargada' : 'pendiente',
    note: item.evidence,
  }));
}

export function buildMeetingMinuteDraft(): MeetingMinuteDraft {
  const urgent = buildPrioritizedNormativeUpdates().slice(0, 8);
  return {
    title: 'Minuta de reunión · Mesa técnica de actualización de manuales',
    sections: [
      { title: 'Objetivo', items: ['Revisar hallazgos, priorizar ajustes y definir responsables para la actualización del Manual de Procesos y Procedimientos y del Manual Específico de Funciones.'] },
      { title: 'Procedimientos priorizados', items: urgent.map((item) => `${item.targetCode} · ${item.title} · Prioridad ${riskLabel[item.priority]}`) },
      { title: 'Decisiones sugeridas', items: ['Validar competencias por dependencia.', 'Actualizar procedimientos con flujo, evidencias y RACI.', 'Definir qué ajustes requieren acto administrativo.', 'Separar información publicable de hallazgos internos.'] },
      { title: 'Compromisos', items: ['Cada dependencia revisará sus procedimientos priorizados.', 'Jurídica validará los cambios con impacto normativo.', 'Control Interno revisará riesgos, controles y evidencias mínimas.', 'Planeación consolidará la propuesta final de adopción.'] },
    ],
  };
}

export function buildPublicationReadiness(): PublicationReadinessItem[] {
  return getProcedureIntelligenceRows().slice(0, 90).map((row) => {
    const coverage = row.coverage;
    const risk = row.risk;
    const status: PublicationReadinessItem['status'] = coverage === 'cubierto' && (risk === 'bajo' || risk === 'medio') ? 'listo' : risk === 'critico' ? 'no_publicable' : coverage === 'parcial' ? 'revision_dependencia' : 'revision_juridica';
    return {
      id: row.procedure.id,
      title: `${row.procedure.code} · ${row.procedure.title}`,
      status,
      reason: coverage === 'cubierto' ? 'Tiene soporte funcional identificado.' : 'Requiere validar soporte funcional y responsable.',
      nextStep: status === 'listo' ? 'Publicar ficha limpia sin observaciones internas.' : status === 'no_publicable' ? 'Resolver hallazgos críticos antes de publicar.' : 'Enviar a revisión y completar evidencias mínimas.',
    };
  });
}

export function buildRoleControlModel(): RoleControlItem[] {
  return [
    { role: 'Administrador', description: 'Gestiona toda la herramienta y versiones de trabajo.', canSee: ['Todos los módulos', 'Riesgos internos', 'Propuestas', 'Exportables'], canDo: ['Editar datos fuente', 'Exportar', 'Preparar acto', 'Publicar versiones'] },
    { role: 'Revisor', description: 'Apoya revisión funcional y técnica por dependencia.', canSee: ['Procesos', 'Cargos', 'Propuestas', 'Plan de actualización'], canDo: ['Registrar observaciones', 'Marcar estado', 'Adjuntar evidencias'] },
    { role: 'Consulta', description: 'Consulta información aprobada.', canSee: ['Procesos', 'Cargos', 'Fichas públicas'], canDo: ['Buscar', 'Compartir URL', 'Exportar ficha pública'] },
    { role: 'Control Interno', description: 'Enfocado en riesgos, controles, auditoría y evidencias.', canSee: ['Modo auditoría', 'Riesgos', 'Madurez', 'Evidencias', 'Trazabilidad'], canDo: ['Registrar hallazgos', 'Solicitar planes de mejora', 'Exportar auditoría'] },
    { role: 'Secretario de Despacho', description: 'Revisa decisiones de su dependencia.', canSee: ['Vista ejecutiva', 'Dependencia propia', 'RACI', 'Plan de actualización'], canDo: ['Aprobar revisión de dependencia', 'Asignar responsable', 'Solicitar ajuste'] },
  ];
}

export function buildInstitutionalTimeline(): InstitutionalTimelineItem[] {
  return [
    { id: '2018-funciones', date: '2018', title: 'Manual de funciones 2018', status: 'hecho', description: 'Base formal del Decreto 057 de 2018.' },
    { id: 'procesos-vigente', date: 'Vigente', title: 'Manual de procesos y procedimientos cargado', status: 'hecho', description: 'Inventario de procedimientos y flujos institucionales.' },
    { id: 'diagnostico', date: 'Fase 1', title: 'Diagnóstico inicial', status: 'hecho', description: 'Relación entre procedimientos, cargos, funciones, riesgos y brechas.' },
    { id: 'normativa', date: 'Fase 2', title: 'Revisión normativa', status: 'en_proceso', description: 'Contraste con normas sectoriales, empleo público, PTEP, comisarías, archivo y contratación.' },
    { id: 'mesas', date: 'Fase 3', title: 'Mesas técnicas por dependencia', status: 'siguiente', description: 'Validar responsables, evidencias, flujos y propuestas de actualización.' },
    { id: 'proyecto', date: 'Fase 4', title: 'Proyecto de actualización', status: 'siguiente', description: 'Consolidar manual propuesto, anexos y acto administrativo.' },
    { id: 'aprobacion', date: 'Fase 5', title: 'Aprobación y publicación', status: 'siguiente', description: 'Adoptar versión final y publicar lo que sea publicable.' },
    { id: 'seguimiento', date: 'Fase 6', title: 'Seguimiento', status: 'siguiente', description: 'Medir madurez, controles, cumplimiento y mejora continua.' },
  ];
}

export function buildDependencySummary(): DependencySummaryItem[] {
  const rows = getProcedureIntelligenceRows();
  const profiles = allFunctionProfiles;
  const grouped = new Map<string, typeof rows>();
  rows.forEach((row) => {
    const key = normalizeResponsible(row.responsible ?? 'Sin responsable').toUpperCase();
    grouped.set(key, [...(grouped.get(key) ?? []), row]);
  });
  return Array.from(grouped.entries()).map(([dependency, items]) => {
    const highRisk = items.filter((item) => item.risk === 'alto' || item.risk === 'critico').length;
    const partial = items.filter((item) => item.coverage !== 'cubierto').length;
    const dependencyToken = dependency.split(' ')[0] || dependency;
    const profilesCount = profiles.filter((profile) => String(profile.dependency ?? '').toUpperCase().includes(dependencyToken)).length;
    const score = Math.max(35, Math.round(100 - highRisk * 4 - partial * 3));
    return {
      dependency,
      procedures: items.length,
      profiles: profilesCount,
      highRisk,
      normativeUpdates: buildPrioritizedNormativeUpdates().filter((update) => items.some((row) => row.procedure.code === update.targetCode)).length,
      suggestedProcedures: getMissingRecommendationRows().filter((rec) => String(rec.suggestedResponsible ?? '').toUpperCase().includes(dependencyToken)).length,
      score,
      recommendation: score >= 85 ? 'Mantener seguimiento y publicar fichas validadas.' : score >= 70 ? 'Completar evidencias, RACI y responsables.' : 'Priorizar mesa técnica y ajuste normativo/funcional.',
    };
  }).sort((a, b) => a.score - b.score);
}

export function buildUpdateAssistantSteps(): UpdateAssistantStep[] {
  return [
    { step: 1, title: 'Seleccione procedimiento', description: 'Identifique el procedimiento a revisar y confirme responsable actual.', expectedOutput: 'Procedimiento seleccionado y contexto validado.', relatedModule: 'Fichas institucionales' },
    { step: 2, title: 'Revise función soporte', description: 'Valide cargos y funciones que respaldan la ejecución.', expectedOutput: 'Relación directa, parcial o brecha funcional documentada.', relatedModule: 'Confianza relación' },
    { step: 3, title: 'Valide normativa', description: 'Revise normas, cambios posteriores y obligaciones sectoriales.', expectedOutput: 'Normativa aplicable y necesidad de ajuste definida.', relatedModule: 'Normativa / Prioridad normativa' },
    { step: 4, title: 'Revise riesgos y evidencias', description: 'Determine riesgos, controles y soportes mínimos.', expectedOutput: 'Modelo de evidencias y controles mínimos.', relatedModule: 'Evidencias mínimas / Auditoría' },
    { step: 5, title: 'Ajuste flujo recomendado', description: 'Rediseñe actividades, decisiones, responsables y documentos.', expectedOutput: 'Flujo actualizado con PHVA, RACI y puntos de control.', relatedModule: 'Propuesta de procedimiento' },
    { step: 6, title: 'Defina decisión', description: 'Mantener, modificar, fusionar, eliminar, trasladar o crear procedimiento.', expectedOutput: 'Decisión registrada con justificación.', relatedModule: 'Plan de actualización' },
    { step: 7, title: 'Genere propuesta', description: 'Exporte ficha, minuta, evidencias y acto administrativo base.', expectedOutput: 'Paquete de actualización listo para revisión/aprobación.', relatedModule: 'Acto administrativo / Minuta' },
  ];
}

export function exportMeetingMinuteDraft() {
  const minute = buildMeetingMinuteDraft();
  const content = [minute.title, '', ...minute.sections.flatMap((section) => [section.title.toUpperCase(), ...section.items.map((item, index) => `${index + 1}. ${item}`), ''])].join('\n');
  downloadTextFile('minuta-mesa-tecnica-procesux.txt', content);
}
