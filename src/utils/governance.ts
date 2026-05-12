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
