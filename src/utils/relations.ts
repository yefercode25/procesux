import type {
  FunctionItem,
  FunctionProfile,
  FunctionProcessRelation,
  ProcedureItem,
  StrictFunctionRelationRule,
} from '../types/manual';
import { allFunctionProfiles } from '../data/functionsManualData';

export interface ProcedureRelationship {
  profile: FunctionProfile;
  functions: FunctionItem[];
  confidence: 'directa' | 'probable';
  reason: string;
  recommendation: string;
  criticality: 'critico' | 'alto' | 'medio' | 'bajo';
  legalFit: 'compatible' | 'requiere_validacion' | 'no_recomendado';
  legalReview: string;
  rule: StrictFunctionRelationRule;
}

export interface ManualUpdateFinding {
  id: string;
  title: string;
  scope: string;
  severity: 'critico' | 'alto' | 'medio' | 'bajo';
  affectedProfileIds: string[];
  summary: string;
  recommendation: string;
}

export type FunctionUpdateActionType = 'mantener' | 'modificar' | 'agregar' | 'quitar' | 'fusionar' | 'trasladar';

export interface ProfileFunctionUpdateAction {
  id: string;
  action: FunctionUpdateActionType;
  title: string;
  functionNumbers?: number[];
  currentText?: string;
  proposedText: string;
  why: string;
  normativeBasis: string;
  impact: string;
}

const ids = (codes: string[]) => codes.map((code) => code.toLowerCase());

const all = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, index) => start + index);

const planeacionPlan = ids([
  'PE-PE-EPD-01',
  'PE-PE-POAI-02',
  'PE-PE-APA-03',
  'PE-PE-BP-04',
  'PE-PE-RBP-05',
  'PE-PE-ANC-06',
  'PE-PE-RR-17',
  'PE-PE-PAAC-18',
  'PE-SG-SIG-01',
]);

const urbanismo = ids([
  'PE-PE-LC-07',
  'PE-PE-LS-08',
  'PE-PE-CE-09',
  'PE-PE-CN-10',
  'PE-PE-CUS-11',
  'PE-PE-DN-12',
  'PE-PE-ECR-13',
  'PE-PE-SOIS-14',
]);

const infraestructura = ids(['PE-PE-EPF-15', 'PE-PE-SO-16', 'PM-GI-OI-05']);

const serviciosPublicosTecnicos = ids([
  'PM-GPSP-MP-01',
  'PM-GPSP-MFS-02',
  'PM-GPSP-LF-03',
  'PM-GPSP-UN-04',
  'PM-GPSP-ICD-05',
]);

const serviciosPublicosFinancieros = ids([
  'PM-GPSP-FSP-06',
  'PM-GPSP-MF-07',
  'PM-GPSP-RSP-08',
  'PM-GPSP-RSSP-09',
  'PM-GPSP-AP-10',
]);

const policia = ids(['PM-GJC-PBI-05', 'PM-GJC-SIP-06', 'PM-GJC-CCC-07', 'PM-GJC-CAR-08']);
const comisaria = ids(['PM-GJC-PVI-09', 'PM-GJC-PRD-10', 'PA-GJ-CARV-01', 'PA-GJ-MP-02', 'PA-GJ-RDD-03']);
const atencionCiudadana = ids(['PA-AC-PQR-01', 'PA-AC-AP-02', 'PA-AC-RAP-03', 'PA-AC-VUC-04']);
const talentoHumano = ids([
  'PA-GTH-CS-01',
  'PA-GTH-CS-02',
  'PA-GTH-CV-03',
  'PA-GTH-EPIC-04',
  'PA-GTH-ED-05',
  'PA-GTH-LME-06',
  'PA-GTH-LFD-07',
  'PA-GTH-NO-08',
  'PA-GTH-RE-09',
  'PA-GTH-RT-10',
  'PA-GTH-RSE-11',
  'PA-GTH-PE-12',
  'PA-GTH-MSA-13',
  'PA-GTH-RC-14',
  'PA-GTH-IR-15',
]);
const juridicaGeneral = ids(['PA-GJ-EAA-04', 'PA-GJ-EVCJ-05', 'PA-GJ-AD-06', 'PA-GJ-AL-07']);
const juridicaPoliciva = ids(['PA-GJ-EGMG-08', 'PA-GJ-RBUP-09']);
const contractual = ids([
  'PA-GC-LP-01',
  'PA-GC-CD-02',
  'PA-GC-CM-03',
  'PA-GC-SA-04',
  'PA-GC-MC-05',
  'PA-GC-PA-06',
  'PA-GC-RCC-07',
  'PA-GC-EP-08',
  'PA-GC-SI-09',
  'PA-GC-PCC-10',
]);
const documentalGestion = ids(['PA-GD-OAG-01', 'PA-GD-OAC-02', 'PA-GD-CPD-03', 'PA-GD-TD-04']);
const documentalTecnico = ids(['PA-GD-ED-05', 'PA-GD-TRD-06']);
const socialGeneral = ids([
  'PM-GDS-CJT-01',
  'PM-GDS-PP-02',
  'PM-GDS-SAA-03',
  'PM-GDS-AF-04',
  'PM-GDS-AHI-05',
  'PM-GDS-AOP-06',
  'PM-GDS-CE-07',
  'PM-GDS-RP-08',
  'PM-GDS-CP-09',
  'PM-GDS-AC-10',
  'PM-GDS-SPP-12',
  'PM-GDS-VJ-13',
  'PM-GDS-SIFA-17',
  'PM-GDS-RPF-18',
  'PM-GDS-BCF-19',
  'PM-GDS-RCC-20',
  'PM-GDS-RAR-21',
  'PM-GDS-AU-22',
]);
const cultura = ids(['PM-GDS-EC-11', 'PM-GDS-FCS-14', 'PM-GDS-DEJ-15', 'PM-GDS-ICP-16']);
const desarrolloEconomico = ids(['PM-GDE-ATA-01', 'PM-GDE-EA-02', 'PM-GDE-PIE-03', 'PM-GDE-PIE-04']);
const financiero = ids([
  'PA-GF-CPC-01',
  'PA-GF-IEP-02',
  'PA-GF-GCB-03',
  'PA-GF-RI-04',
  'PA-GF-IDC-05',
  'PA-GF-CDP-06',
  'PA-GF-PT-07',
  'PA-GF-CB-08',
  'PA-GF-GLA-09',
  'PA-GF-RGN-10',
  'PA-GF-OPD-11',
  'PA-GF-COP-12',
  'PA-GF-ACIP-13',
  'PA-GF-IRDI-14',
]);
const controlInterno = ids([
  'PEC-CVE-SMR-01',
  'PEC-CVE-ESG-02',
  'PEC-CVE-PI-03',
  'PEC-CVE-ESP-04',
  'PEC-CVE-SPMI-05',
  'PEC-CVE-PAA-06',
  'PEC-CVE-CT-07',
]);
const controlDisciplinario = ids(['PEC-CVE-OPI-08']);
const administrativa = ids(['PA-GA-GV-01', 'PA-GA-PA-02', 'PA-GA-RD-03', 'PA-GA-AA-04']);
const eventosInstitucionales = ids(['PM-GDS-EC-11', 'PM-GDS-FCS-14', 'PM-GDS-DEJ-15', 'PM-GDS-ICP-16']);

export const strictRelationRules: StrictFunctionRelationRule[] = [
  {
    procedureIds: planeacionPlan,
    profileId: 'secretario-planeacion-020-04',
    functionNumbers: [1, 2, 3, 4, 7, 8, 9, 20, 21, 22, 23],
    confidence: 'directa',
    criticality: 'critico',
    legalFit: 'compatible',
    reason: 'El procedimiento pertenece a planeación institucional, plan de desarrollo, POAI, banco de programas y proyectos, PAAC, indicadores o seguimiento de inversión; esas materias están asignadas expresamente al Secretario de Planeación.',
    recommendation: 'Usar como responsable directivo del procedimiento y relacionar solo las funciones citadas, no todo el perfil.',
    legalReview: 'Compatible con el rol directivo de planeación; verificar delegaciones internas para firma o aprobación cuando el procedimiento exija acto administrativo.',
  },
  {
    procedureIds: planeacionPlan,
    profileId: 'profesional-planeacion-219-03',
    functionNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 20],
    confidence: 'directa',
    criticality: 'alto',
    legalFit: 'compatible',
    reason: 'El Profesional de Planeación tiene funciones directas sobre Banco de Proyectos, POAI, presupuesto de inversión, planes indicativos, indicadores y seguimiento/evaluación.',
    recommendation: 'Relacionarlo como apoyo técnico/profesional, sin reemplazar la decisión directiva del Secretario cuando el procedimiento la exija.',
    legalReview: 'Compatible para formulación, registro, seguimiento e informes técnicos.',
  },
  {
    procedureIds: planeacionPlan,
    profileId: 'alcalde-005-06',
    functionNumbers: [5, 9, 11, 12, 13, 34, 50, 51, 52, 53],
    confidence: 'probable',
    criticality: 'critico',
    legalFit: 'compatible',
    reason: 'El Alcalde interviene como autoridad superior en planes, presupuesto, ordenación del gasto, participación ciudadana e incorporación de recursos.',
    recommendation: 'Relacionarlo solo en etapas de presentación, sanción, adopción, ordenación del gasto o decisión superior.',
    legalReview: 'Compatible como autoridad municipal; no debe confundirse con actividades técnicas del proceso.',
  },
  {
    procedureIds: urbanismo,
    profileId: 'secretario-planeacion-020-04',
    functionNumbers: [10, 11, 12, 15, 23, 24],
    confidence: 'directa',
    criticality: 'alto',
    legalFit: 'compatible',
    reason: 'Licencias, certificados urbanísticos, demarcación, uso del suelo y suspensión de obra se desprenden de la función expresa de expedir permisos/licencias, revisar estudios y emitir conceptos.',
    recommendation: 'Usar como responsable de revisión y decisión urbanística, con soporte técnico cuando aplique.',
    legalReview: 'Compatible, sujeto al POT/EOT, normas urbanísticas y delegaciones vigentes.',
  },
  {
    procedureIds: urbanismo,
    profileId: 'profesional-planeacion-219-03',
    functionNumbers: [14, 15, 16, 17, 18, 19, 20],
    confidence: 'probable',
    criticality: 'medio',
    legalFit: 'compatible',
    reason: 'El profesional realiza inspecciones, estudios, cálculos, interventorías y apoyo técnico en obras e infraestructura.',
    recommendation: 'Relacionar como apoyo técnico; no como autoridad de expedición si el acto requiere firma del Secretario o del Alcalde.',
    legalReview: 'Compatible para apoyo técnico y verificación en campo.',
  },
  {
    procedureIds: infraestructura,
    profileId: 'secretario-planeacion-020-04',
    functionNumbers: [10, 12, 13, 14, 15, 16, 17, 18, 19, 23],
    confidence: 'directa',
    criticality: 'alto',
    legalFit: 'compatible',
    reason: 'Las obras de infraestructura, estudios, supervisión, interventoría y red vial están descritas directamente en la ficha de Planeación.',
    recommendation: 'Relacionar como liderazgo técnico/directivo de obras e infraestructura.',
    legalReview: 'Compatible; validar separación entre supervisión contractual y apoyo técnico si hay contrato de interventoría.',
  },
  {
    procedureIds: infraestructura,
    profileId: 'profesional-planeacion-219-03',
    functionNumbers: [14, 15, 16, 17, 18, 19, 20],
    confidence: 'directa',
    criticality: 'medio',
    legalFit: 'compatible',
    reason: 'El perfil profesional de Planeación ejecuta actividades técnicas de supervisión, interventoría, actas e inspección de obras.',
    recommendation: 'Relacionar como apoyo técnico de campo, seguimiento y soporte documental de obra.',
    legalReview: 'Compatible como apoyo profesional; revisar delegación formal de supervisión en cada contrato.',
  },
  {
    procedureIds: serviciosPublicosTecnicos,
    profileId: 'secretario-planeacion-020-04',
    functionNumbers: [10, 16, 17, 23],
    confidence: 'probable',
    criticality: 'alto',
    legalFit: 'requiere_validacion',
    reason: 'El manual asigna a Planeación necesidades de acueducto, saneamiento básico e infraestructura; sin embargo, los procedimientos operativos de planta pueden depender de la estructura vigente de servicios públicos.',
    recommendation: 'Relacionar para dirección/seguimiento de infraestructura de servicios públicos, no para operación manual de planta si no está en la función literal.',
    legalReview: 'Requiere validar quién opera actualmente acueducto y planta; no se asigna al Operario porque su ficha habla de aseo, ornato, jardinería y reparaciones menores, no de tratamiento de agua.',
  },
  {
    procedureIds: serviciosPublicosFinancieros,
    profileId: 'secretario-hacienda-020-04',
    functionNumbers: [1, 2, 3, 7, 8, 10, 18, 21, 22],
    confidence: 'probable',
    criticality: 'alto',
    legalFit: 'requiere_validacion',
    reason: 'Facturación, recaudo, modificaciones a facturación, subsidios y acuerdos de pago tienen componente financiero y de recaudo, pero puede existir área especializada de servicios públicos.',
    recommendation: 'Relacionar con Hacienda en recaudo, control presupuestal e informes financieros; validar responsable operativo del servicio público.',
    legalReview: 'Requiere validar acto de asignación, regulación de servicios públicos y segregación entre facturación, recaudo y cartera.',
  },
  {
    procedureIds: serviciosPublicosFinancieros,
    profileId: 'tecnico-hacienda-367-06',
    functionNumbers: [2, 3, 5, 6, 12, 15, 18, 19, 20],
    confidence: 'probable',
    criticality: 'medio',
    legalFit: 'requiere_validacion',
    reason: 'El Técnico de Hacienda soporta cuentas, información presupuestal, ejecución y reportes; puede apoyar actividades financieras asociadas a servicios públicos.',
    recommendation: 'Usar como apoyo de registro o revisión documental, no como responsable de decisión tarifaria ni técnica.',
    legalReview: 'Requiere validar si el cargo está asignado al procedimiento específico y si existe delegación.',
  },
  {
    procedureIds: policia,
    profileId: 'inspector-policia-303-03',
    functionNumbers: [4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 21, 22, 23],
    confidence: 'directa',
    criticality: 'alto',
    legalFit: 'compatible',
    reason: 'Los procesos policivos, de convivencia, bienes inmuebles, rifas, espectáculos y medidas de policía corresponden directamente a la Inspección de Policía.',
    recommendation: 'Relacionar como autoridad o ejecutor del trámite según competencia de policía.',
    legalReview: 'Compatible, sujeto al Código Nacional de Seguridad y Convivencia Ciudadana y normas especiales del trámite.',
  },
  {
    procedureIds: policia,
    profileId: 'secretario-gobierno-020-04',
    functionNumbers: [1, 2, 7, 8, 9, 10, 12, 29, 30],
    confidence: 'probable',
    criticality: 'alto',
    legalFit: 'compatible',
    reason: 'Gobierno dirige políticas de seguridad, convivencia, orden público y acompaña la gestión de la Inspección de Policía.',
    recommendation: 'Relacionarlo como dirección, coordinación o enlace institucional, sin desplazar la competencia decisoria del Inspector cuando corresponda.',
    legalReview: 'Compatible para coordinación y dirección administrativa.',
  },
  {
    procedureIds: comisaria,
    profileId: 'comisario-familia-202-04',
    functionNumbers: all(1, 22),
    confidence: 'directa',
    criticality: 'critico',
    legalFit: 'requiere_validacion',
    reason: 'Violencia intrafamiliar, restablecimiento de derechos, custodia, alimentos, visitas, medidas de protección y conflictos familiares son núcleo funcional del Comisario de Familia.',
    recommendation: 'Relacionar como autoridad principal del trámite; actualizar la revisión normativa frente a Ley 2126 de 2021 y lineamientos del sector justicia.',
    legalReview: 'Requiere actualización normativa: la Ley 2126 de 2021 reorganizó funciones, competencias y operación de Comisarías de Familia, incluyendo precisiones frente a violencia en contexto familiar y articulación con defensorías.',
  },
  {
    procedureIds: comisaria,
    profileId: 'profesional-comisaria-219-03',
    functionNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17],
    confidence: 'directa',
    criticality: 'medio',
    legalFit: 'compatible',
    reason: 'El profesional de Comisaría desarrolla valoración, estudios psicológicos, conceptos, apoyo psicosocial, prevención e informes.',
    recommendation: 'Relacionarlo como apoyo profesional/interdisciplinario, no como autoridad decisoria.',
    legalReview: 'Compatible como apoyo técnico y psicosocial; revisar conformación mínima del equipo interdisciplinario vigente.',
  },
  {
    procedureIds: atencionCiudadana,
    profileId: 'secretario-gobierno-020-04',
    functionNumbers: [23, 24, 25, 26, 29, 30],
    confidence: 'probable',
    criticality: 'medio',
    legalFit: 'requiere_validacion',
    reason: 'Gobierno tiene funciones sobre sistema de quejas y reclamos, archivo, asesoría jurídica y reportes, pero la operación de ventanilla puede depender de gestión documental o atención al ciudadano.',
    recommendation: 'Relacionar como dirección/coordinación institucional; validar responsable operativo de PQRSD y ventanilla única.',
    legalReview: 'Requiere validar estructura actual, canales de atención y responsable del sistema PQRSD.',
  },
  {
    procedureIds: atencionCiudadana,
    profileId: 'profesional-gobierno-219-03',
    functionNumbers: [1, 2, 15, 16, 17, 18, 27, 28, 30, 32],
    confidence: 'probable',
    criticality: 'medio',
    legalFit: 'compatible',
    reason: 'El profesional de Gobierno tiene funciones jurídicas de peticiones, tutelas, conceptos, representación y archivo contractual/documental.',
    recommendation: 'Usar para respuestas jurídicas o acciones constitucionales; no para operación general de ventanilla si existe responsable documental.',
    legalReview: 'Compatible para componente jurídico y respuesta especializada.',
  },
  {
    procedureIds: atencionCiudadana,
    profileId: 'secretario-ejecutivo-425-05',
    functionNumbers: [2, 3, 4, 5, 7, 8, 11, 14, 16, 18, 20],
    confidence: 'directa',
    criticality: 'medio',
    legalFit: 'compatible',
    reason: 'Secretaría ejecutiva atiende público, correspondencia, agenda, comunicaciones, requerimientos e información al usuario.',
    recommendation: 'Relacionar como apoyo secretarial y operativo en atención/correspondencia.',
    legalReview: 'Compatible como apoyo asistencial, sujeto a autorizaciones del jefe inmediato.',
  },
  {
    procedureIds: atencionCiudadana,
    profileId: 'auxiliar-administrativo-407-04',
    functionNumbers: [1, 2, 3, 4, 5, 6, 7, 14, 27],
    confidence: 'directa',
    criticality: 'medio',
    legalFit: 'compatible',
    reason: 'El auxiliar administrativo ejecuta atención, orientación, recepción, clasificación, registro, trámite documental y apoyo en reportes.',
    recommendation: 'Relacionar como apoyo operativo de atención y radicación; no como responsable de decisión o respuesta de fondo.',
    legalReview: 'Compatible para actividades asistenciales y de soporte.',
  },
  {
    procedureIds: talentoHumano,
    profileId: 'secretario-gobierno-020-04',
    functionNumbers: [14, 15, 16, 17, 18, 19, 29, 30],
    confidence: 'directa',
    criticality: 'alto',
    legalFit: 'compatible',
    reason: 'La ficha de Gobierno contiene administración de personal, planta, situaciones administrativas, PIC, bienestar, empleos vacantes y reportes a CNSC/DAFP.',
    recommendation: 'Relacionar como responsable directivo de Talento Humano si la estructura vigente mantiene esa competencia en Gobierno.',
    legalReview: 'Compatible; validar estructura orgánica actual y delegaciones para actos de personal.',
  },
  {
    procedureIds: talentoHumano,
    profileId: 'profesional-gobierno-219-03',
    functionNumbers: [6, 7, 8, 9, 10, 11, 20, 21, 31, 32],
    confidence: 'directa',
    criticality: 'medio',
    legalFit: 'compatible',
    reason: 'El profesional de Gobierno formula políticas de personal, proyecta actos administrativos, apoya evaluación del desempeño, régimen disciplinario y SIGEP.',
    recommendation: 'Relacionar como apoyo profesional jurídico-administrativo de talento humano.',
    legalReview: 'Compatible para apoyo técnico/jurídico, sin sustituir firma de autoridad competente.',
  },
  {
    procedureIds: talentoHumano,
    profileId: 'tecnico-transversal-367-06',
    functionNumbers: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
    confidence: 'directa',
    criticality: 'medio',
    legalFit: 'compatible',
    reason: 'El bloque de Talento Humano del Técnico Transversal incluye nómina, planta, evaluación, situaciones administrativas, historias laborales y pensiones.',
    recommendation: 'Relacionar solo cuando el cargo esté ubicado efectivamente en Talento Humano.',
    legalReview: 'Compatible como apoyo técnico; validar ubicación real del cargo por planta global.',
  },
  {
    procedureIds: juridicaGeneral,
    profileId: 'secretario-gobierno-020-04',
    functionNumbers: [25, 26, 27, 28, 29, 30],
    confidence: 'directa',
    criticality: 'alto',
    legalFit: 'compatible',
    reason: 'La Secretaría de Gobierno coordina asesoría jurídica, representación, procesos judiciales, conciliación y seguimiento de abogados externos.',
    recommendation: 'Relacionar como dirección jurídica cuando el acto o concepto dependa de Gobierno.',
    legalReview: 'Compatible; validar representación judicial y poderes cuando aplique.',
  },
  {
    procedureIds: juridicaGeneral,
    profileId: 'profesional-gobierno-219-03',
    functionNumbers: [1, 2, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 27, 28, 29, 30, 32],
    confidence: 'directa',
    criticality: 'alto',
    legalFit: 'compatible',
    reason: 'El Profesional de Gobierno tiene funciones explícitas de peticiones, tutelas, conceptos, actos administrativos, conciliación, representación y estudios jurídicos.',
    recommendation: 'Relacionar como ejecutor técnico-jurídico del procedimiento.',
    legalReview: 'Compatible para apoyo y gestión jurídica, sujeto a firma, poder o delegación según el caso.',
  },
  {
    procedureIds: juridicaPoliciva,
    profileId: 'inspector-policia-303-03',
    functionNumbers: [4, 8, 11, 14, 15, 21, 22, 23],
    confidence: 'directa',
    criticality: 'medio',
    legalFit: 'compatible',
    reason: 'Guías de movilización de ganado, restitución de bien de uso público e inspecciones se relacionan con funciones expresas de la Inspección de Policía.',
    recommendation: 'Relacionar como autoridad administrativa competente cuando el trámite sea policivo.',
    legalReview: 'Compatible; la función 15 debe revisarse porque el manual dice “Finalizar inspecciones” y podría tratarse de error de redacción.',
  },
  {
    procedureIds: contractual,
    profileId: 'secretario-gobierno-020-04',
    functionNumbers: [20, 28, 29, 30],
    confidence: 'probable',
    criticality: 'alto',
    legalFit: 'requiere_validacion',
    reason: 'La ficha de Gobierno incluye Plan Anual de Adquisiciones y coordinación de procedimientos contractuales, pero debe verificarse el esquema contractual actual de la entidad.',
    recommendation: 'Relacionar para coordinación institucional de contratación, validando si existe dependencia contractual específica.',
    legalReview: 'Requiere validar manual de contratación vigente, delegación contractual y ordenador del gasto.',
  },
  {
    procedureIds: contractual,
    profileId: 'profesional-gobierno-219-03',
    functionNumbers: [12, 13, 19, 22, 23, 24, 25, 27, 28, 29, 30, 32],
    confidence: 'directa',
    criticality: 'alto',
    legalFit: 'compatible',
    reason: 'El Profesional de Gobierno tiene funciones expresas de minutas, revisión contractual, garantías, SECOP, ejecución, adicionales, informes y archivo contractual.',
    recommendation: 'Relacionar como apoyo jurídico/contractual del ciclo precontractual, contractual y postcontractual.',
    legalReview: 'Compatible como apoyo; decisiones y aprobación final deben respetar delegaciones y manual de contratación.',
  },
  {
    procedureIds: contractual,
    profileId: 'tecnico-transversal-367-06',
    functionNumbers: [18, 19, 20, 21, 22, 23],
    confidence: 'directa',
    criticality: 'medio',
    legalFit: 'compatible',
    reason: 'Cuando se ubique en contratación, este perfil publica documentos, organiza expedientes, consolida reportes y proyecta comunicaciones o requerimientos.',
    recommendation: 'Relacionar solo si el cargo está ubicado en el área de contratación.',
    legalReview: 'Compatible como apoyo técnico; no debe asumir evaluación jurídica ni decisión contractual.',
  },
  {
    procedureIds: documentalGestion,
    profileId: 'secretario-gobierno-020-04',
    functionNumbers: [19, 24, 29, 30],
    confidence: 'probable',
    criticality: 'medio',
    legalFit: 'compatible',
    reason: 'Gobierno coordina manuales, procesos y sistema de administración documental.',
    recommendation: 'Relacionar como dirección de gestión documental si el manual mantiene esa competencia.',
    legalReview: 'Compatible; eliminación documental y TRD requieren responsable archivístico y comité/instancia aplicable.',
  },
  {
    procedureIds: documentalGestion,
    profileId: 'secretario-ejecutivo-425-05',
    functionNumbers: [2, 3, 4, 7, 11, 13, 14, 16, 18, 20],
    confidence: 'directa',
    criticality: 'medio',
    legalFit: 'compatible',
    reason: 'Secretaría Ejecutiva maneja correspondencia, documentos, archivos, comunicaciones y requerimientos.',
    recommendation: 'Relacionar como apoyo secretarial/documental en archivo de gestión y correspondencia.',
    legalReview: 'Compatible como apoyo operativo.',
  },
  {
    procedureIds: documentalGestion,
    profileId: 'auxiliar-administrativo-407-04',
    functionNumbers: [1, 2, 3, 4, 5, 6, 14, 27],
    confidence: 'directa',
    criticality: 'medio',
    legalFit: 'compatible',
    reason: 'El Auxiliar Administrativo realiza recepción, clasificación, registro, trámite documental y archivo.',
    recommendation: 'Relacionar como apoyo asistencial de gestión documental.',
    legalReview: 'Compatible para apoyo operativo; no para decisiones archivísticas especializadas.',
  },
  {
    procedureIds: documentalTecnico,
    profileId: 'secretario-gobierno-020-04',
    functionNumbers: [19, 24, 29, 30],
    confidence: 'probable',
    criticality: 'alto',
    legalFit: 'requiere_validacion',
    reason: 'Eliminación documental y actualización de TRD se conectan con la función de administración documental, pero requieren revisión archivística especializada.',
    recommendation: 'Relacionar para coordinación, con alerta de validación por normatividad archivística y aprobación de instancias competentes.',
    legalReview: 'Requiere validar TRD, tablas vigentes, comité institucional y lineamientos del Archivo General de la Nación.',
  },
  {
    procedureIds: cultura,
    profileId: 'tecnico-cultura-367-03',
    functionNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 10, 13, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29],
    confidence: 'directa',
    criticality: 'medio',
    legalFit: 'compatible',
    reason: 'Gestión Cultural tiene funciones expresas sobre eventos culturales, Casa de la Cultura, biblioteca, promoción de lectura, patrimonio, formación, turismo cultural y página web.',
    recommendation: 'Relacionar como apoyo técnico cultural y operativo; la dirección sectorial corresponde a Secretaría de Desarrollo Social o la dependencia vigente.',
    legalReview: 'Compatible, sujeto a estructura vigente de cultura/turismo.',
  },
  {
    procedureIds: cultura,
    profileId: 'secretario-desarrollo-social-020-04',
    functionNumbers: [1, 2, 6, 7, 8, 9, 10, 11, 12, 13],
    confidence: 'directa',
    criticality: 'alto',
    legalFit: 'compatible',
    reason: 'El Secretario de Desarrollo Social dirige cultura, recreación, deporte, extensión y promoción cultural.',
    recommendation: 'Relacionar como líder directivo de las actividades culturales y comunitarias del sector.',
    legalReview: 'Compatible con la ficha; validar si turismo fue reasignado a Desarrollo Económico.',
  },
  {
    procedureIds: socialGeneral,
    profileId: 'secretario-desarrollo-social-020-04',
    functionNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 12, 13],
    confidence: 'directa',
    criticality: 'alto',
    legalFit: 'compatible',
    reason: 'Los procedimientos sociales, de comunidad, juventud, salud, educación, cultura y recreación se relacionan con la dirección sectorial de Desarrollo Social.',
    recommendation: 'Relacionar como responsable directivo del sector social cuando el procedimiento no sea de competencia exclusiva de otra autoridad.',
    legalReview: 'Compatible; validar en víctimas y familias en acción si existe enlace designado o normatividad especial.',
  },
  {
    procedureIds: socialGeneral,
    profileId: 'profesional-desarrollo-social-219-03',
    functionNumbers: [1, 3, 4, 5, 6, 7, 14, 15, 16, 17, 18, 19, 20, 21, 22],
    confidence: 'probable',
    criticality: 'medio',
    legalFit: 'requiere_validacion',
    reason: 'El perfil profesional transcrito para Desarrollo Social contiene funciones agroambientales duplicadas o arrastradas, pero también conserva planeación sectorial, atención comunitaria, cursos e informes.',
    recommendation: 'Usar con cautela y marcar actualización del manual; validar si realmente corresponde a Desarrollo Social o Desarrollo Económico.',
    legalReview: 'Requiere revisión de duplicidad entre perfiles de Desarrollo Social y Desarrollo Económico antes de asignar responsabilidad final.',
  },
  {
    procedureIds: socialGeneral,
    profileId: 'tecnico-transversal-367-06',
    functionNumbers: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
    confidence: 'directa',
    criticality: 'medio',
    legalFit: 'compatible',
    reason: 'Cuando se ubique en Desarrollo Social o Planeación, el Técnico Transversal opera SISBEN, programas sociales, Familias en Acción, salud y bases de datos.',
    recommendation: 'Relacionar solo si el cargo está ubicado en el área social o de planeación correspondiente.',
    legalReview: 'Compatible como apoyo técnico-operativo, sujeto a designación formal.',
  },
  {
    procedureIds: desarrolloEconomico,
    profileId: 'secretario-desarrollo-economico-020-04',
    functionNumbers: [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 16, 18, 19, 20, 21, 22, 23, 24, 26, 27, 28, 31, 32, 36, 37, 38, 39, 40, 41, 42, 44, 45, 48, 49, 50, 51, 52, 53, 54, 55],
    confidence: 'directa',
    criticality: 'alto',
    legalFit: 'compatible',
    reason: 'Asistencia técnica agropecuaria, estadísticas, predios estratégicos, ambiente, turismo y proyectos productivos son materias expresas de Desarrollo Económico Sostenible y Turismo.',
    recommendation: 'Relacionar como líder misional del sector económico, agropecuario, ambiental y turístico.',
    legalReview: 'Compatible; el manual debe corregir la inconsistencia del área funcional cuando aparece como Desarrollo Social.',
  },
  {
    procedureIds: desarrolloEconomico,
    profileId: 'profesional-desarrollo-economico-219-03',
    functionNumbers: all(1, 22),
    confidence: 'directa',
    criticality: 'medio',
    legalFit: 'requiere_validacion',
    reason: 'El profesional tiene funciones de desarrollo rural, gestión ambiental, prevención de desastres, ecosistemas, cuencas, asistencia técnica agropecuaria y CMDR.',
    recommendation: 'Relacionar como apoyo profesional del sector, pero marcar la duplicidad con el perfil de Desarrollo Social para depuración del manual.',
    legalReview: 'Requiere revisión de consistencia del manual porque el área funcional aparece como Desarrollo Social en una ficha de Desarrollo Económico.',
  },
  {
    procedureIds: financiero,
    profileId: 'secretario-hacienda-020-04',
    functionNumbers: all(1, 22),
    confidence: 'directa',
    criticality: 'critico',
    legalFit: 'compatible',
    reason: 'Los procedimientos presupuestales, contables, de tesorería, recaudo, cartera, bancos, pagos e informes corresponden al núcleo funcional de Hacienda.',
    recommendation: 'Mantener Secretaría de Hacienda como responsable principal y separar claramente roles de apoyo técnico, tesorería, contabilidad y ordenador del gasto.',
    legalReview: 'Compatible; verificar segregación de funciones y delegaciones para certificaciones, pagos, recaudos y actos de cobro.',
  },
  {
    procedureIds: financiero,
    profileId: 'tecnico-hacienda-367-06',
    functionNumbers: all(1, 20),
    confidence: 'directa',
    criticality: 'medio',
    legalFit: 'compatible',
    reason: 'El Técnico de Hacienda elabora certificados, informes, cuentas de cobro, proyectos presupuestales, registros, CDP/RP, reservas y seguimiento presupuestal.',
    recommendation: 'Relacionar como apoyo técnico financiero; no como responsable final de aprobación si no existe delegación.',
    legalReview: 'Compatible para actividades técnicas, registro, elaboración y soporte documental.',
  },
  {
    procedureIds: financiero,
    profileId: 'tecnico-apoyo-hacienda-367-03',
    functionNumbers: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    confidence: 'directa',
    criticality: 'medio',
    legalFit: 'compatible',
    reason: 'El bloque específico de Hacienda de este Técnico incluye recaudo, industria y comercio, predial, información contable, estados financieros, deuda, plan financiero e ingresos.',
    recommendation: 'Relacionar solo cuando el cargo esté efectivamente ubicado en Hacienda.',
    legalReview: 'Compatible como apoyo técnico; validar ubicación real del empleo.',
  },
  {
    procedureIds: financiero,
    profileId: 'auxiliar-administrativo-407-04',
    functionNumbers: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
    confidence: 'probable',
    criticality: 'medio',
    legalFit: 'requiere_validacion',
    reason: 'El Auxiliar Administrativo tiene un bloque específico de Hacienda relacionado con recaudos, cheques, caja, deudores y depósitos.',
    recommendation: 'Relacionar solo si está ubicado en Hacienda y bajo orden del jefe inmediato; no como decisor financiero.',
    legalReview: 'Requiere validar ubicación del cargo y controles de tesorería/caja.',
  },
  {
    procedureIds: administrativa,
    profileId: 'tecnico-gobierno-almacen-367-03',
    functionNumbers: all(1, 24),
    confidence: 'directa',
    criticality: 'medio',
    legalFit: 'compatible',
    reason: 'Almacén e inventarios se relacionan directamente con entradas, salidas, altas, bajas, inventarios, suministro, bienes devolutivos y de consumo.',
    recommendation: 'Relacionar con Almacén e Inventario como responsable técnico del inventario institucional.',
    legalReview: 'Compatible para gestión de bienes; validar segregación con compras/contratación.',
  },
  {
    procedureIds: ids(['PM-GDE-PIE-04']),
    profileId: 'operario-487-03',
    functionNumbers: [1, 2, 3, 4, 5, 6, 8, 9, 10, 11],
    confidence: 'probable',
    criticality: 'medio',
    legalFit: 'compatible',
    reason: 'El mantenimiento de predios de importancia estratégica puede requerir limpieza, retiro de residuos, ornato, conservación de zonas verdes, cuidado de elementos y forestación cuando el predio sea municipal o esté asignado al municipio.',
    recommendation: 'Relacionar al Operario únicamente como apoyo operativo condicionado. No asignarle decisiones ambientales, prediales, contractuales, presupuestales ni técnicas especializadas.',
    legalReview: 'Compatible si la actividad es material u operativa y existe asignación del jefe inmediato; requiere validación cuando el mantenimiento implique intervención ambiental especializada o contratación.',
  },
  {
    procedureIds: ids(['PM-GI-OI-05']),
    profileId: 'operario-487-03',
    functionNumbers: [4, 7, 9, 11],
    confidence: 'probable',
    criticality: 'bajo',
    legalFit: 'compatible',
    reason: 'El procedimiento de obras de infraestructura puede requerir apoyo material en reparaciones menores de jardinería, cerrajería, electricidad, carpintería o mampostería en inmuebles municipales, así como cuidado de elementos asignados.',
    recommendation: 'Relacionar solo como apoyo operativo menor. La formulación, supervisión, interventoría, actas, estudios, diseños y decisiones de obra continúan en Planeación y/o supervisor designado.',
    legalReview: 'Compatible para reparaciones menores y apoyo físico; no recomendado para funciones técnicas de obra pública, interventoría o aprobación.',
  },
  {
    procedureIds: ids(['PA-GA-AA-04']),
    profileId: 'operario-487-03',
    functionNumbers: [4, 9, 11],
    confidence: 'probable',
    criticality: 'bajo',
    legalFit: 'compatible',
    reason: 'El Operario responde por los elementos y equipos asignados y debe mantener aseados sus útiles de trabajo, lo cual se relaciona de forma limitada con control de bienes a cargo.',
    recommendation: 'Relacionar solo para custodia, uso adecuado y devolución de elementos asignados. No relacionar con administración de inventarios, altas, bajas o almacén.',
    legalReview: 'Compatible como usuario responsable de bienes asignados; la administración del inventario corresponde al Técnico de Almacén.',
  },
  {
    procedureIds: eventosInstitucionales,
    profileId: 'operario-487-03',
    functionNumbers: [1, 3, 4, 8, 9, 11],
    confidence: 'probable',
    criticality: 'bajo',
    legalFit: 'compatible',
    reason: 'Los eventos comunitarios, foros, encuentros o cursos pueden requerir adecuación básica, limpieza, ornato y apoyo físico en espacios públicos o inmuebles municipales.',
    recommendation: 'Relacionar únicamente como apoyo logístico-operativo de espacios. No asignar programación, coordinación, convocatoria, contratación ni responsabilidad del evento.',
    legalReview: 'Compatible si la actividad es de aseo, adecuación material u ornato previamente asignado por el jefe inmediato.',
  },
  {
    procedureIds: eventosInstitucionales,
    profileId: 'auxiliar-servicios-generales-470-02',
    functionNumbers: [1, 2, 3, 4, 5],
    confidence: 'probable',
    criticality: 'bajo',
    legalFit: 'compatible',
    reason: 'Los eventos institucionales pueden requerir limpieza de áreas, servicio de cafetería, uso de utensilios, solicitud de suministros y apoyo básico de servicios generales.',
    recommendation: 'Relacionar como apoyo de servicios generales cuando el evento lo requiera. No asignar decisiones de planeación, contratación, coordinación programática o manejo presupuestal.',
    legalReview: 'Compatible como apoyo asistencial bajo instrucciones del jefe inmediato.',
  },
  {
    procedureIds: ids(['PA-GA-AA-04']),
    profileId: 'auxiliar-servicios-generales-470-02',
    functionNumbers: [3, 4, 5],
    confidence: 'probable',
    criticality: 'bajo',
    legalFit: 'compatible',
    reason: 'El Auxiliar de Servicios Generales utiliza equipos y utensilios suministrados por la administración y solicita elementos de consumo para sus funciones.',
    recommendation: 'Relacionar solo para uso, cuidado y solicitud de elementos de servicios generales; no para inventario institucional, altas, bajas o administración de almacén.',
    legalReview: 'Compatible como usuario de elementos asignados; la administración del inventario corresponde al Almacén.',
  },
  {
    procedureIds: ids(['PA-GA-AA-04']),
    profileId: 'conductor-480-06',
    functionNumbers: [3, 4, 5, 6, 7, 8, 9],
    confidence: 'probable',
    criticality: 'bajo',
    legalFit: 'compatible',
    reason: 'El Conductor mantiene el vehículo asignado, reporta fallas, controla su ubicación y porta documentos del automotor, lo cual se relaciona con bienes, uso y control del vehículo oficial.',
    recommendation: 'Relacionar como responsable operativo del vehículo asignado. No asignar administración de inventario, altas, bajas ni aseguramiento institucional de bienes.',
    legalReview: 'Compatible como custodia operativa del vehículo; el control patrimonial corresponde a Almacén o dependencia competente.',
  },
  {
    procedureIds: eventosInstitucionales,
    profileId: 'conductor-480-06',
    functionNumbers: [1, 2, 3, 5, 7, 8, 9],
    confidence: 'probable',
    criticality: 'bajo',
    legalFit: 'compatible',
    reason: 'Cuando los eventos, foros, encuentros o programas requieran desplazamiento institucional autorizado, el Conductor puede apoyar con el vehículo oficial.',
    recommendation: 'Relacionar solo como apoyo de transporte previa autorización del jefe inmediato; no como responsable del evento ni de su ejecución misional.',
    legalReview: 'Compatible como apoyo operativo de conducción y transporte institucional.',
  },
  {
    procedureIds: ids(['PA-GA-GV-01']),
    profileId: 'conductor-480-06',
    functionNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    confidence: 'probable',
    criticality: 'bajo',
    legalFit: 'compatible',
    reason: 'Gestión de viáticos puede involucrar desplazamientos institucionales y vehículo oficial, aunque el Conductor no gestiona el trámite financiero.',
    recommendation: 'Relacionar solo como apoyo de transporte institucional cuando el procedimiento incluya desplazamiento o vehículo.',
    legalReview: 'Compatible como apoyo operativo de conducción.',
  },
  {
    procedureIds: ids(['PA-GA-PA-02', 'PA-GA-RD-03']),
    profileId: 'secretario-ejecutivo-425-05',
    functionNumbers: [1, 2, 3, 4, 7, 11, 13, 14, 16, 18, 20],
    confidence: 'directa',
    criticality: 'bajo',
    legalFit: 'compatible',
    reason: 'Proyección y revisión de documentos se soporta en funciones secretariales de elaboración, registro, control, archivo y comunicaciones.',
    recommendation: 'Relacionar como apoyo secretarial/documental, no como aprobador del contenido técnico o jurídico.',
    legalReview: 'Compatible como apoyo asistencial.',
  },
  {
    procedureIds: ids(['PA-GA-PA-02', 'PA-GA-RD-03']),
    profileId: 'auxiliar-administrativo-407-04',
    functionNumbers: [1, 2, 3, 4, 5, 6, 14, 27],
    confidence: 'directa',
    criticality: 'bajo',
    legalFit: 'compatible',
    reason: 'El Auxiliar Administrativo soporta redacción, archivo, trámite, organización y revisión básica documental.',
    recommendation: 'Relacionar como apoyo operativo en documentos y archivo.',
    legalReview: 'Compatible como apoyo asistencial.',
  },
  {
    procedureIds: controlInterno,
    profileId: 'jefe-control-interno-006-04',
    functionNumbers: all(1, 15),
    confidence: 'directa',
    criticality: 'critico',
    legalFit: 'compatible',
    reason: 'Auditoría, seguimiento a mapa de riesgos, planes de mejoramiento, informes y comités corresponden al Sistema de Control Interno.',
    recommendation: 'Mantener como evaluación independiente; no asignar al Jefe de Control Interno la ejecución del proceso auditado.',
    legalReview: 'Compatible si se preserva independencia y enfoque de evaluación/asesoría.',
  },
  {
    procedureIds: controlDisciplinario,
    profileId: 'secretario-gobierno-020-04',
    functionNumbers: [13, 29, 30],
    confidence: 'directa',
    criticality: 'alto',
    legalFit: 'requiere_validacion',
    reason: 'La ficha de Gobierno atribuye titularidad de potestad disciplinaria municipal y aplicación del Código Disciplinario Único.',
    recommendation: 'Relacionar con alerta de revisión normativa por cambios del régimen disciplinario y estructura de instrucción/juzgamiento.',
    legalReview: 'Requiere validar Ley 1952 de 2019 y reformas posteriores, además del acto interno que defina competencias disciplinarias.',
  },
  {
    procedureIds: controlDisciplinario,
    profileId: 'profesional-gobierno-219-03',
    functionNumbers: [10, 11, 20, 21, 32],
    confidence: 'directa',
    criticality: 'medio',
    legalFit: 'requiere_validacion',
    reason: 'El Profesional de Gobierno adelanta o apoya investigaciones preliminares y disciplinarias, archivos, consultas y proyectos de fallo.',
    recommendation: 'Relacionar como apoyo jurídico-disciplinario con revisión de competencia actual.',
    legalReview: 'Requiere validar régimen disciplinario vigente, separación funcional y actos de delegación.',
  },
];

export const manualUpdateFindings: ManualUpdateFinding[] = [
  {
    id: 'ley-2126-comisaria',
    title: 'Actualizar bloque de Comisaría de Familia a Ley 2126 de 2021',
    scope: 'Comisario de Familia y equipo interdisciplinario',
    severity: 'critico',
    affectedProfileIds: ['comisario-familia-202-04', 'profesional-comisaria-219-03'],
    summary: 'El manual base cita Ley 1098 de 2006 y conserva funciones antiguas. La Ley 2126 de 2021 redefinió organización, funciones y competencias de Comisarías de Familia.',
    recommendation: 'Actualizar funciones, competencias, equipo interdisciplinario, rutas de atención y límites frente a Defensoría de Familia.',
  },
  {
    id: 'competencias-decreto-815',
    title: 'Actualizar competencias laborales comunes y comportamentales',
    scope: 'Todos los perfiles',
    severity: 'alto',
    affectedProfileIds: allFunctionProfiles.map((profile) => profile.id),
    summary: 'El Decreto 815 de 2018 sustituyó el Título 4 del Decreto 1083 de 2015 y exige incluir competencias comunes, comportamentales, funcionales y requisitos actualizados.',
    recommendation: 'Revisar cada ficha para incorporar competencias y requisitos acordes al nivel jerárquico y al Decreto 785/2005 para entidades territoriales.',
  },
  {
    id: 'duplicidad-desarrollo-social-economico',
    title: 'Depurar duplicidad entre Desarrollo Social y Desarrollo Económico',
    scope: 'Profesional Desarrollo Social / Profesional Desarrollo Económico',
    severity: 'alto',
    affectedProfileIds: ['profesional-desarrollo-social-219-03', 'profesional-desarrollo-economico-219-03'],
    summary: 'Los bloques funcionales son casi idénticos y contienen funciones agroambientales en una ficha de Desarrollo Social.',
    recommendation: 'Definir si el perfil pertenece al sector social o económico/agroambiental y ajustar dependencia, área funcional y funciones reales.',
  },
  {
    id: 'funciones-sobredimensionadas-tecnicos-asistenciales',
    title: 'Revisar funciones potencialmente sobredimensionadas en niveles técnico/asistencial',
    scope: 'Técnicos y auxiliares transversales',
    severity: 'medio',
    affectedProfileIds: ['tecnico-transversal-367-06', 'tecnico-apoyo-hacienda-367-03', 'auxiliar-administrativo-407-04'],
    summary: 'Algunas funciones de niveles técnico/asistencial mezclan diseño, administración de sistemas, control financiero o decisiones que podrían requerir perfil profesional o directivo.',
    recommendation: 'Separar funciones de apoyo operativo de funciones de decisión, aprobación, dirección o responsabilidad especializada.',
  },
  {
    id: 'procedimiento-operativo-servicios-generales-faltante',
    title: 'Crear o formalizar procedimiento de mantenimiento, aseo, ornato y servicios generales',
    scope: 'Operario, Auxiliar de Servicios Generales, Conductor y Almacén',
    severity: 'medio',
    affectedProfileIds: ['operario-487-03', 'auxiliar-servicios-generales-470-02', 'conductor-480-06', 'tecnico-gobierno-almacen-367-03'],
    summary: 'El manual de funciones contiene cargos operativos con funciones reales de aseo, ornato, mantenimiento menor, cafetería, suministros, vehículo y elementos asignados, pero el manual de procesos no tiene un procedimiento específico que concentre esa operación.',
    recommendation: 'Crear o formalizar un procedimiento tipo PA-GA-MEL-05 para mantenimiento, embellecimiento, limpieza, apoyo logístico, cafetería y control operativo de elementos/vehículos asignados, sin mezclarlo con facturación, servicios públicos técnicos o contratación.',
  },
  {
    id: 'errores-textuales-manual',
    title: 'Corregir errores textuales y de área funcional detectados',
    scope: 'Perfiles con errores OCR o inconsistencias internas',
    severity: 'medio',
    affectedProfileIds: ['inspector-policia-303-03', 'secretario-desarrollo-economico-020-04', 'profesional-planeacion-219-03'],
    summary: 'Se detectaron expresiones como “Finalizar inspecciones”, “coberturas de obras” y área funcional de Desarrollo Social en fichas de Desarrollo Económico.',
    recommendation: 'Marcar como hallazgos de actualización y corregir mediante acto administrativo de modificación del manual.',
  },
];


export const profileFunctionUpdateActions: Record<string, ProfileFunctionUpdateAction[]> = {
  'comisario-familia-202-04': [
    {
      id: 'comisaria-mod-competencia-ley-2126',
      action: 'modificar',
      title: 'Ajustar el núcleo de competencia del Comisario a la Ley 2126 de 2021',
      functionNumbers: [1, 2, 4, 5, 7, 8, 9, 18],
      proposedText: 'Prevenir, garantizar, proteger, restablecer y reparar los derechos de las personas en el contexto de violencia familiar, especialmente niños, niñas, adolescentes, mujeres, personas mayores y demás integrantes del grupo familiar, adoptando las medidas de protección, atención y seguimiento que correspondan conforme a la ley vigente.',
      why: 'El manual actual parte de Ley 1098 de 2006. Debe conservar el enfoque de protección familiar, pero actualizar la redacción para no limitar el cargo a un listado anterior ni confundir competencias con Defensoría de Familia.',
      normativeBasis: 'Ley 2126 de 2021, especialmente funciones de Comisarías de Familia y reglas sobre modificación de competencias; Ley 1098 de 2006 en lo aplicable.',
      impact: 'Mantiene la función, pero la actualiza y mejora su alcance legal. Se recomienda revisar procedimientos PM-GJC-PVI-09, PM-GJC-PRD-10, PA-GJ-CARV-01, PA-GJ-MP-02 y PA-GJ-RDD-03.',
    },
    {
      id: 'comisaria-remove-delitos-nna',
      action: 'modificar',
      title: 'Precisar recepción de denuncias y remisión a autoridad competente',
      functionNumbers: [3, 14, 15],
      proposedText: 'Recibir información, orientar, activar rutas, adoptar medidas de protección o restablecimiento dentro de su competencia y remitir de manera inmediata a la autoridad competente los hechos que puedan constituir delito o que correspondan a Defensoría de Familia, Fiscalía, Policía Judicial, ICBF u otra autoridad.',
      why: 'La redacción actual puede interpretarse como competencia amplia sobre delitos contra niños, niñas y adolescentes. Conviene evitar que el procedimiento cargue al Comisario competencias penales o de defensoría que no le correspondan.',
      normativeBasis: 'Ley 2126 de 2021; Ley 1098 de 2006; reglas de competencia de autoridades administrativas y penales.',
      impact: 'No se elimina la atención; se limita y se redirecciona correctamente. Reduce riesgo de nulidad, revictimización o actuaciones por fuera de competencia.',
    },
    {
      id: 'comisaria-add-seguimiento-medidas',
      action: 'agregar',
      title: 'Agregar seguimiento y verificación de medidas de protección',
      proposedText: 'Realizar seguimiento a las medidas de protección, atención y restablecimiento adoptadas, coordinando con las autoridades e instituciones competentes y dejando evidencia de las actuaciones, remisiones, comunicaciones y verificaciones realizadas.',
      why: 'Los procedimientos de violencia intrafamiliar, medidas de protección y restablecimiento requieren trazabilidad posterior a la decisión inicial.',
      normativeBasis: 'Ley 2126 de 2021 y enfoque de debida diligencia en protección familiar.',
      impact: 'Agrega control de ejecución y fortalece los procedimientos existentes.',
    },
    {
      id: 'comisaria-keep-informes-comites',
      action: 'mantener',
      title: 'Mantener informes y participación en comités, pero sin duplicidad',
      functionNumbers: [19, 20, 21, 22],
      proposedText: 'Presentar informes de competencia de la Comisaría de Familia y participar en los comités institucionales relacionados con su misionalidad, evitando duplicidad textual y funciones ajenas al objeto de la dependencia.',
      why: 'Las funciones 19 y 21 son prácticamente iguales. Se debe conservar la obligación de informar, pero fusionarla para depurar el manual.',
      normativeBasis: 'Decreto 1083 de 2015 y Decreto 815 de 2018 sobre contenido funcional claro y competencias laborales.',
      impact: 'Fusiona duplicidad, mejora claridad y mantiene soporte de reporte a entes de control.',
    },
  ],
  'profesional-comisaria-219-03': [
    {
      id: 'psicologia-keep-core',
      action: 'mantener',
      title: 'Mantener valoración, diagnóstico, intervención e informes psicológicos',
      functionNumbers: [2, 3, 4, 5, 6, 7, 11, 12, 13, 14, 15, 16],
      proposedText: 'Realizar valoración, orientación, intervención, conceptos e informes psicológicos dentro de los procesos de la Comisaría de Familia, a solicitud del Comisario y conforme a los procedimientos internos, garantizando reserva, enfoque diferencial y protección de derechos.',
      why: 'Estas funciones sí corresponden al apoyo profesional interdisciplinario de Comisaría y soportan los procedimientos de violencia intrafamiliar y restablecimiento.',
      normativeBasis: 'Ley 2126 de 2021; Ley 1098 de 2006; Decreto 1083 de 2015 y Decreto 815 de 2018.',
      impact: 'Se mantienen, pero con redacción más precisa y articulada al equipo interdisciplinario.',
    },
    {
      id: 'psicologia-remove-cualquier-dependencia',
      action: 'quitar',
      title: 'Retirar asignación abierta a cualquier dependencia del Municipio',
      functionNumbers: [17],
      proposedText: 'No conservar una cláusula que permita asignar funciones en cualquier dependencia cuando desnaturalice el apoyo profesional de Comisaría de Familia. Reemplazar por una función residual limitada a la naturaleza del empleo y del área funcional.',
      why: 'Una función abierta puede permitir asignaciones fuera de la Comisaría y afectar la disponibilidad del equipo interdisciplinario.',
      normativeBasis: 'Ley 2126 de 2021 sobre conformación y funcionamiento de Comisarías de Familia; Decreto 1083 de 2015 sobre manual específico.',
      impact: 'Reduce riesgo de desviación funcional y mejora disponibilidad del servicio de Comisaría.',
    },
    {
      id: 'psicologia-add-seguimiento-equipo',
      action: 'agregar',
      title: 'Agregar coordinación técnica con equipo interdisciplinario y rutas externas',
      proposedText: 'Apoyar, desde el componente psicológico, la activación de rutas, seguimiento de casos, articulación interinstitucional y elaboración de informes técnicos requeridos por el Comisario de Familia.',
      why: 'La Ley 2126 refuerza la necesidad de equipos interdisciplinarios y coordinación efectiva.',
      normativeBasis: 'Ley 2126 de 2021 y lineamientos de atención integral de Comisarías de Familia.',
      impact: 'Mejora la relación entre función y procedimiento; soporta medidas, seguimientos y remisiones.',
    },
  ],
  'profesional-desarrollo-social-219-03': [
    {
      id: 'social-trasladar-agroambiental',
      action: 'trasladar',
      title: 'Trasladar funciones agroambientales a Desarrollo Económico',
      functionNumbers: [2, 5, 6, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20],
      proposedText: 'Estas funciones deben quedar en el perfil profesional de Desarrollo Económico, Sostenible y Turismo, no en Desarrollo Social, salvo que la planta o acto administrativo demuestre una asignación sectorial distinta.',
      why: 'El bloque transcrito es casi igual al de Desarrollo Económico y contiene desarrollo rural, gestión ambiental, asistencia técnica agropecuaria, cuencas y CMDR.',
      normativeBasis: 'Decreto 1083 de 2015 y Decreto 815 de 2018: contenido funcional debe guardar relación con propósito, dependencia y área funcional del empleo.',
      impact: 'Evita duplicidad, mejora responsabilidades y corrige relaciones con procesos PM-GDE.',
    },
    {
      id: 'social-add-core-social',
      action: 'agregar',
      title: 'Agregar funciones propias del sector social',
      proposedText: 'Apoyar la formulación, ejecución, seguimiento y reporte de programas sociales, juventud, familia, población vulnerable, víctimas, Familias en Acción o programas que los sustituyan, atención comunitaria y articulación institucional del sector social.',
      why: 'El perfil de Desarrollo Social debe soportar los procedimientos PM-GDS, no funciones agroambientales que pertenecen a otro sector.',
      normativeBasis: 'Decreto 1083 de 2015 y Decreto 815 de 2018; correspondencia entre propósito del empleo, dependencia y procesos asignados.',
      impact: 'Permite relacionar con procedimientos sociales de forma más precisa y reduce relaciones probables o forzadas.',
    },
    {
      id: 'social-keep-general-planning',
      action: 'mantener',
      title: 'Mantener planeación sectorial e informes',
      functionNumbers: [1, 3, 21, 22],
      proposedText: 'Mantener funciones generales de evaluación de necesidades, planeación, articulación sectorial, informes y demás funciones acordes con la dependencia.',
      why: 'Son funciones compatibles con un profesional universitario del sector social.',
      normativeBasis: 'Decreto 1083 de 2015 y Decreto 815 de 2018.',
      impact: 'Sirven como base para seguimiento de programas sociales y atención comunitaria.',
    },
  ],
  'profesional-desarrollo-economico-219-03': [
    {
      id: 'econ-keep-agroambiental',
      action: 'mantener',
      title: 'Mantener funciones agroambientales y de desarrollo rural',
      functionNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22],
      proposedText: 'Conservar las funciones de desarrollo rural, gestión ambiental, prevención de riesgos del sector agropecuario, ecosistemas, cuencas, asistencia técnica, transferencia de tecnología, emprendimiento rural e informes.',
      why: 'Estas funciones sí corresponden a Desarrollo Económico, Sostenible y Turismo y soportan PM-GDE-ATA-01, PM-GDE-EA-02, PM-GDE-PIE-03 y PM-GDE-PIE-04.',
      normativeBasis: 'Decreto 1083 de 2015 y Decreto 815 de 2018; coherencia entre área funcional y contenido funcional.',
      impact: 'Mantiene relaciones directas con procedimientos de desarrollo económico y agroambiental.',
    },
    {
      id: 'econ-remove-office-tail',
      action: 'quitar',
      title: 'Quitar fragmento auxiliar de oficina dentro de función CMDR',
      functionNumbers: [19],
      proposedText: 'Conservar solo el acompañamiento a asociaciones y Consejos Municipales de Desarrollo Rural. Retirar la frase sobre labores auxiliares de oficina o trasladarla a un cargo asistencial si aplica.',
      why: 'La función mezcla actividades profesionales de desarrollo rural con labores auxiliares de recepción y trámite documental.',
      normativeBasis: 'Decreto 815 de 2018: funciones y competencias deben ser claras, funcionales y acordes al nivel del empleo.',
      impact: 'Depura el perfil y evita asignar labores asistenciales como núcleo de un profesional.',
    },
  ],
  'secretario-desarrollo-economico-020-04': [
    {
      id: 'sec-econ-area',
      action: 'modificar',
      title: 'Corregir área funcional del perfil',
      proposedText: 'Área funcional: Secretaría de Desarrollo Económico, Sostenible y de Turismo.',
      why: 'En el documento aparece Desarrollo Social en una ficha de Desarrollo Económico. Es una inconsistencia interna del manual.',
      normativeBasis: 'Decreto 1083 de 2015: identificación y ubicación del empleo deben ser claras en el manual específico.',
      impact: 'Corrige organigrama, relaciones por dependencia y matriz de procesos.',
    },
    {
      id: 'sec-econ-fusion-duplicadas',
      action: 'fusionar',
      title: 'Fusionar funciones repetidas de empleabilidad e información',
      functionNumbers: [14, 15, 16, 17],
      proposedText: 'Planear, promover, coordinar, ejecutar y evaluar programas, proyectos y sistemas de información de empleabilidad, de forma directa o mediante convenios, incluyendo estadística y base de datos municipal.',
      why: 'Las funciones 14/15 y 16/17 duplican contenido con verbos similares.',
      normativeBasis: 'Decreto 815 de 2018: claridad y no duplicidad en contenido funcional.',
      impact: 'Reduce repetición sin quitar responsabilidad funcional.',
    },
    {
      id: 'sec-econ-keep-core',
      action: 'mantener',
      title: 'Mantener funciones de desarrollo económico, turismo, ambiente y agropecuario',
      functionNumbers: [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 20, 21, 22, 26, 27, 28, 31, 32, 36, 37, 38, 39, 40, 41, 42, 45, 48, 49, 50, 51, 52, 53, 54, 55],
      proposedText: 'Conservar el bloque misional de desarrollo económico, emprendimiento, turismo, agropecuario, ambiental, información sectorial, proyectos productivos, asistencia técnica e informes.',
      why: 'El contenido soporta los procedimientos PM-GDE y la dirección sectorial.',
      normativeBasis: 'Decreto 1083 de 2015 y Decreto 815 de 2018.',
      impact: 'Mantiene liderazgo directivo y mejora trazabilidad de responsabilidades.',
    },
  ],
  'tecnico-transversal-367-06': [
    {
      id: 'tec-transversal-limit-by-location',
      action: 'modificar',
      title: 'Condicionar funciones por ubicación real del empleo',
      functionNumbers: [18, 19, 20, 21, 22, 23, 26, 27, 28, 29, 30, 31, 32, 33, 34, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
      proposedText: 'Ejercer únicamente el bloque funcional que corresponda al área donde esté formalmente ubicado el cargo: contratación, desarrollo social/planeación o talento humano, según acto interno o distribución de planta.',
      why: 'El perfil mezcla varias ubicaciones. Para relacionar con procesos no basta el cargo genérico; debe existir ubicación real.',
      normativeBasis: 'Decreto 1083 de 2015 y Decreto 815 de 2018 sobre identificación, ubicación y contenido funcional del empleo.',
      impact: 'Evita relacionar automáticamente el técnico con todos los procesos de la entidad.',
    },
    {
      id: 'tec-transversal-support-not-decide',
      action: 'modificar',
      title: 'Reformular funciones de decisión como apoyo técnico',
      functionNumbers: [7, 11, 18, 19, 21, 22, 23, 37, 38, 44, 45, 46, 48],
      proposedText: 'Apoyar, preparar, registrar, consolidar y proyectar información bajo supervisión del superior inmediato, sin asumir decisiones directivas, aprobación final ni responsabilidad jurídica exclusiva.',
      why: 'Algunas funciones usan verbos amplios que pueden exceder el nivel técnico si implican decisión o aprobación.',
      normativeBasis: 'Decreto 815 de 2018 sobre competencias comportamentales y funcionales por nivel jerárquico.',
      impact: 'Reduce riesgo de sobredimensionamiento y clarifica el rol técnico.',
    },
  ],
  'tecnico-apoyo-hacienda-367-03': [
    {
      id: 'tec-hac-support',
      action: 'modificar',
      title: 'Precisar apoyo técnico hacendario sin dirección financiera',
      functionNumbers: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      proposedText: 'Apoyar, registrar, revisar, proyectar y consolidar información tributaria, presupuestal y contable de Hacienda bajo lineamientos del Secretario, Tesorero o Contador, sin asumir certificación o aprobación final cuando no exista delegación expresa.',
      why: 'El cargo puede apoyar recaudo, predial, informes y estados financieros, pero no debe desplazar responsabilidades directivas o profesionales.',
      normativeBasis: 'Decreto 1083 de 2015 y Decreto 815 de 2018.',
      impact: 'Mantiene relación con PA-GF, pero con control de rol y jerarquía.',
    },
  ],
  'auxiliar-administrativo-407-04': [
    {
      id: 'aux-admin-remove-design',
      action: 'modificar',
      title: 'Ajustar funciones tecnológicas sobredimensionadas al nivel asistencial',
      functionNumbers: [7, 8, 9, 10, 11, 12, 13],
      proposedText: 'Apoyar el registro, actualización, organización y consulta de información y bases de datos asignadas, bajo instrucciones del jefe inmediato y con aplicación de controles definidos por la entidad.',
      why: 'Diagnosticar, diseñar, administrar y controlar sistemas puede exceder el nivel asistencial si implica decisión técnica especializada.',
      normativeBasis: 'Decreto 815 de 2018: las competencias funcionales deben corresponder al nivel y propósito del empleo.',
      impact: 'Conserva apoyo documental y de sistemas, pero elimina sobredimensionamiento.',
    },
    {
      id: 'aux-admin-hacienda-condition',
      action: 'mantener',
      title: 'Mantener bloque de Hacienda solo cuando esté ubicado allí',
      functionNumbers: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
      proposedText: 'Mantener funciones de caja, recaudo, cheques, registros y depósitos solo si el empleo está formalmente asignado a Hacienda y bajo control del jefe inmediato.',
      why: 'El bloque es específico y no aplica a todos los auxiliares administrativos de la planta global.',
      normativeBasis: 'Decreto 1083 de 2015: identificación y ubicación funcional del empleo.',
      impact: 'Evita relaciones indebidas con procesos financieros cuando el auxiliar esté en otra dependencia.',
    },
  ],
  'inspector-policia-303-03': [
    {
      id: 'inspector-finalizar-inspecciones',
      action: 'modificar',
      title: 'Corregir error textual “Finalizar inspecciones”',
      functionNumbers: [15],
      proposedText: 'Practicar o realizar inspecciones judiciales y oculares en predios rurales y urbanos, cuando sean de su competencia o le sean comisionadas por autoridad competente.',
      why: 'La expresión “Finalizar inspecciones” no describe adecuadamente la actuación administrativa y parece error de conversión del manual.',
      normativeBasis: 'Decreto 1083 de 2015: el contenido funcional debe ser claro y verificable.',
      impact: 'Mejora la relación con procedimientos policivos y de espacio público.',
    },
  ],
  'profesional-planeacion-219-03': [
    {
      id: 'planeacion-coberturas-obras',
      action: 'modificar',
      title: 'Corregir “coberturas de las obras”',
      functionNumbers: [16],
      proposedText: 'Realizar estudios, cálculos, presupuestos, cantidades de obra y demás soportes técnicos requeridos para la ejecución de obras de infraestructura.',
      why: '“Coberturas” no es expresión técnica clara para este contexto y puede afectar la interpretación de la función.',
      normativeBasis: 'Decreto 1083 de 2015 y Decreto 815 de 2018: claridad del contenido funcional.',
      impact: 'Mejora soporte para procedimientos de obras, supervisión e infraestructura.',
    },
  ],
  'jefe-control-interno-006-04': [
    {
      id: 'control-not-disciplinary-instance',
      action: 'modificar',
      title: 'Separar evaluación independiente de la primera instancia disciplinaria',
      proposedText: 'Mantener al Jefe de Control Interno en evaluación independiente, seguimiento, auditoría, controles, mapa de riesgos e informes; no asignarle primera instancia disciplinaria salvo soporte normativo y estructura formal vigente.',
      why: 'El procedimiento PEC-CVE-OPI-08 aparece como Control Interno Disciplinario, pero las funciones disciplinarias están principalmente en Alcalde/Gobierno/Profesional Jurídico.',
      normativeBasis: 'Ley 87 de 1993, Ley 1474 de 2011 y Decreto 1083 de 2015; principio de independencia del control interno.',
      impact: 'Evita incompatibilidad funcional y conserva independencia evaluadora.',
    },
  ],
};


profileFunctionUpdateActions['operario-487-03'] = [
  {
    id: 'operario-apoyo-operativo-condicionado',
    action: 'mantener',
    title: 'Mantener funciones de aseo, ornato, zonas verdes y reparaciones menores',
    functionNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    proposedText: 'Mantener el cargo Operario para actividades materiales de mantenimiento, limpieza, ornato, recolección de residuos/escombros, conservación de áreas verdes y reparaciones menores en espacios e inmuebles municipales asignados por el jefe inmediato.',
    why: 'Sus funciones sí tienen relación operativa con algunos procedimientos, pero solo como apoyo material condicionado, no como responsable administrativo, técnico especializado o decisorio.',
    normativeBasis: 'Decreto 1083 de 2015 y Decreto 815 de 2018: las funciones deben corresponder al nivel asistencial y al propósito del empleo.',
    impact: 'Permite relacionarlo con mantenimiento de predios, apoyo físico a infraestructura, eventos institucionales y control de elementos asignados, evitando relaciones indebidas con facturación, recaudo, planta de tratamiento o actos administrativos.',
  },
  {
    id: 'operario-crear-procedimiento-propio',
    action: 'agregar',
    title: 'Crear procedimiento propio para mantenimiento, embellecimiento y limpieza',
    proposedText: 'Crear procedimiento PA-GA-MEL-05 · Mantenimiento, embellecimiento y limpieza de espacios públicos e inmuebles municipales, con actividades de solicitud, programación, ejecución, registro fotográfico, entrega y control de elementos.',
    why: 'El cargo tiene funciones claras, pero actualmente no existe un procedimiento específico que recoja su operación de manera ordenada.',
    normativeBasis: 'MIPG, gestión administrativa, control interno y gestión documental de evidencias operativas.',
    impact: 'Reduce brechas entre manual de funciones y manual de procesos y evita forzar relaciones con procedimientos que no corresponden.',
  },
];

profileFunctionUpdateActions['auxiliar-servicios-generales-470-02'] = [
  {
    id: 'servicios-generales-apoyo-logistico',
    action: 'mantener',
    title: 'Mantener relación como apoyo de servicios generales y logística básica',
    functionNumbers: [1, 2, 3, 4, 5],
    proposedText: 'Mantener funciones de limpieza, cafetería, uso adecuado de equipos/utensilios y solicitud de suministros, asociándolas a eventos o actividades institucionales solo cuando exista requerimiento de apoyo logístico básico.',
    why: 'El perfil no administra procesos ni toma decisiones, pero sí soporta materialmente actividades institucionales y uso de elementos de consumo.',
    normativeBasis: 'Decreto 1083 de 2015 y Decreto 815 de 2018: correspondencia entre funciones y nivel asistencial.',
    impact: 'Aclara su relación con eventos institucionales, servicios generales y control de suministros, sin asignarle competencias administrativas o contractuales.',
  },
];

profileFunctionUpdateActions['conductor-480-06'] = [
  {
    id: 'conductor-transporte-y-vehiculo',
    action: 'mantener',
    title: 'Mantener relación como apoyo de transporte y custodia operativa del vehículo',
    functionNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    proposedText: 'Mantener al Conductor como apoyo operativo de desplazamientos institucionales autorizados, cuidado básico, reporte de fallas, ubicación y documentación del vehículo oficial asignado.',
    why: 'Sus funciones se relacionan con transporte institucional y control operativo del automotor, pero no con gestión financiera, inventario patrimonial o decisiones del procedimiento.',
    normativeBasis: 'Decreto 1083 de 2015 y Decreto 815 de 2018: funciones acordes al nivel asistencial.',
    impact: 'Permite relacionarlo con viáticos, eventos con desplazamiento y control operativo de vehículo asignado, sin sobredimensionar su rol.',
  },
];

export const globalFunctionUpdateActions: ProfileFunctionUpdateAction[] = [
  {
    id: 'global-competencias-decreto-815',
    action: 'agregar',
    title: 'Agregar bloque de competencias laborales en cada ficha',
    proposedText: 'Incluir, por cada empleo, competencias comunes, competencias comportamentales por nivel jerárquico, competencias funcionales, conocimientos básicos o esenciales y requisitos de estudio y experiencia actualizados.',
    why: 'El manual de 2018 debe verificarse frente a la estructura exigida por el Decreto 815 de 2018 y el Decreto 1083 de 2015.',
    normativeBasis: 'Decreto 815 de 2018, compilado en el Decreto 1083 de 2015; Decreto Ley 785 de 2005 para entidades territoriales.',
    impact: 'No elimina funciones existentes, pero exige completar fichas y ajustar competencias por nivel.',
  },
];



export type ProcedureUpdateActionType = 'mantener' | 'modificar' | 'agregar' | 'quitar' | 'fusionar' | 'trasladar';

export interface ProcedureUpdateAction {
  id: string;
  procedureIds: string[];
  action: ProcedureUpdateActionType;
  severity: 'critico' | 'alto' | 'medio' | 'bajo';
  title: string;
  currentState: string;
  proposedState: string;
  why: string;
  normativeBasis: string;
  impact: string;
  suggestedFlow: string[];
}

export interface MissingProcedureRecommendation {
  id: string;
  title: string;
  suggestedResponsible: string;
  reason: string;
  normativeBasis: string;
  relatedProcedureIds: string[];
}

export interface ProcedureRecommendedFlowStep {
  id: string;
  phase: 'P' | 'H' | 'V' | 'A';
  title: string;
  description: string;
  responsible: string;
  evidence: string;
  decision?: string;
}

const updateFlowBase = [
  'Confirmar responsable vigente contra manual de funciones, organigrama y acto administrativo.',
  'Actualizar objetivo, alcance, normativa, requisitos, formatos, registros e indicadores.',
  'Rediseñar flujo PHVA con decisiones claras, evidencias mínimas y control de cambios.',
  'Validar jurídicamente, socializar con la dependencia y adoptar la versión actualizada.',
];

export const procedureUpdateActions: ProcedureUpdateAction[] = [
  {
    id: 'pte-transparencia-paac',
    procedureIds: ids(['PE-PE-PAAC-18']),
    action: 'modificar',
    severity: 'critico',
    title: 'Actualizar PAAC a Programa de Transparencia y Ética Pública',
    currentState: 'El procedimiento conserva la lógica de Plan Anticorrupción y Atención al Ciudadano.',
    proposedState: 'Procedimiento de formulación, implementación, monitoreo y actualización del Programa de Transparencia y Ética Pública —PTEP—, articulado con riesgos de corrupción, integridad, canales de denuncia, conflicto de intereses, transparencia activa y seguimiento.',
    why: 'El PAAC fue reemplazado/transformado por el marco de Programas de Transparencia y Ética Pública, por lo que mantener el procedimiento como PAAC genera riesgo de obsolescencia normativa.',
    normativeBasis: 'Ley 2195 de 2022 y Decreto 1122 de 2024, que reglamenta los Programas de Transparencia y Ética Pública.',
    impact: 'Afecta planeación, control interno, atención al ciudadano, transparencia, riesgos y rendición de cuentas.',
    suggestedFlow: ['Diagnóstico de riesgos e integridad', 'Formulación PTEP', 'Publicación y socialización', 'Seguimiento periódico', 'Informe de cumplimiento y mejora'],
  },
  {
    id: 'familias-renta-ciudadana',
    procedureIds: ids(['PM-GDS-SIFA-17', 'PM-GDS-RPF-18', 'PM-GDS-BCF-19']),
    action: 'modificar',
    severity: 'alto',
    title: 'Actualizar Familias en Acción / SIFA a Renta Ciudadana y transferencias vigentes',
    currentState: 'Los procedimientos mantienen denominaciones y operación asociadas a Familias en Acción y SIFA.',
    proposedState: 'Procedimientos de orientación, novedades, focalización, acompañamiento y trazabilidad de transferencias monetarias vigentes, especialmente Renta Ciudadana y su articulación con Devolución de IVA cuando aplique.',
    why: 'La operación nacional de transferencias migró hacia Renta Ciudadana y esquemas coordinados, por lo que las referencias a SIFA/Familias en Acción deben revisarse.',
    normativeBasis: 'Lineamientos oficiales de Prosperidad Social sobre Renta Ciudadana y transición desde Familias en Acción.',
    impact: 'Afecta atención social, bases de datos, novedades, retiros, remisiones y evidencias de atención.',
    suggestedFlow: ['Recepción u orientación del hogar', 'Verificación en plataforma vigente', 'Registro de novedad o remisión', 'Seguimiento de respuesta', 'Archivo de soporte y reporte'],
  },
  {
    id: 'comisaria-ley-2126',
    procedureIds: ids(['PM-GJC-PVI-09', 'PM-GJC-PRD-10', 'PA-GJ-CARV-01', 'PA-GJ-MP-02', 'PA-GJ-RDD-03']),
    action: 'modificar',
    severity: 'critico',
    title: 'Actualizar procedimientos de Comisaría de Familia',
    currentState: 'Los procedimientos se soportan en el marco tradicional de infancia, adolescencia, violencia intrafamiliar y medidas de protección.',
    proposedState: 'Rutas actualizadas de atención en contexto de violencia familiar, medidas de protección, restablecimiento de derechos, conciliación, equipo interdisciplinario, reserva, enfoque diferencial, notificación y articulación con Policía, Fiscalía, ICBF y salud.',
    why: 'La Ley 2126 de 2021 regula creación, conformación y funcionamiento de Comisarías de Familia y precisa competencias frente a violencia en contexto familiar.',
    normativeBasis: 'Ley 2126 de 2021 y lineamientos técnico-operativos aplicables a Comisarías de Familia.',
    impact: 'Afecta comisaría, atención ciudadana, archivo reservado, gestión jurídica y articulación interinstitucional.',
    suggestedFlow: ['Recepción y valoración inicial', 'Medida urgente o remisión competente', 'Audiencia o actuación administrativa', 'Seguimiento interdisciplinario', 'Cierre, archivo reservado y reporte'],
  },
  {
    id: 'contratacion-secop-ii',
    procedureIds: contractual,
    action: 'modificar',
    severity: 'alto',
    title: 'Actualizar contratación pública a operación SECOP II y documentos del proceso',
    currentState: 'Los procedimientos contractuales están separados por modalidad, pero requieren mayor precisión en plataforma, documentos, riesgos, publicación y ejecución contractual.',
    proposedState: 'Procedimientos por modalidad con etapas de planeación, estudios previos, análisis del sector, matriz de riesgos, publicación en SECOP II, evaluación, adjudicación, perfeccionamiento, ejecución, supervisión, modificaciones y liquidación.',
    why: 'SECOP II es plataforma transaccional para gestionar en línea procesos de contratación, y los procedimientos deben reflejar la operación real y evidencias electrónicas.',
    normativeBasis: 'Colombia Compra Eficiente: SECOP II y documentos del proceso; normativa contractual vigente y documentos tipo cuando apliquen.',
    impact: 'Afecta contratación, supervisión, Hacienda, archivo contractual y transparencia.',
    suggestedFlow: ['Identificación de necesidad', 'Estudios previos y análisis del sector', 'Publicación y observaciones SECOP II', 'Evaluación y adjudicación', 'Ejecución, supervisión, pagos y cierre'],
  },
  {
    id: 'gestion-documental-agn',
    procedureIds: [...documentalGestion, ...documentalTecnico],
    action: 'modificar',
    severity: 'alto',
    title: 'Actualizar gestión documental a instrumentos archivísticos y expediente electrónico',
    currentState: 'Los procedimientos de archivo, préstamo, transferencias, eliminación y TRD son aprovechables, pero deben reforzar instrumentos, inventarios y expediente físico/electrónico.',
    proposedState: 'Procedimientos con TRD/TVD vigentes, inventario documental, formatos únicos, reglas de préstamo, transferencias documentales, eliminación con acta, expediente electrónico, preservación y control de acceso.',
    why: 'La gestión documental requiere trazabilidad de documentos físicos y electrónicos, así como instrumentos archivísticos actualizados.',
    normativeBasis: 'Lineamientos del Archivo General de la Nación sobre TRD, transferencias, eliminación documental e instrumentos de gestión documental.',
    impact: 'Afecta todas las dependencias, archivo de gestión, archivo central, transparencia y conservación probatoria.',
    suggestedFlow: ['Clasificación según TRD', 'Registro en inventario documental', 'Trámite, préstamo o transferencia', 'Control de conservación/acceso', 'Eliminación o conservación según disposición final'],
  },
  {
    id: 'pqrsd-atencion-ciudadana',
    procedureIds: atencionCiudadana,
    action: 'modificar',
    severity: 'alto',
    title: 'Actualizar atención ciudadana a PQRSD multicanal',
    currentState: 'El manual conserva denominaciones generales de PQR, atención al público, acciones constitucionales y ventanilla única.',
    proposedState: 'Procedimientos PQRSD con radicación multicanal, clasificación, términos legales, lenguaje claro, accesibilidad, trazabilidad, notificación, cierre y medición de satisfacción.',
    why: 'El trámite de peticiones y atención ciudadana exige términos, canales, trazabilidad y control de respuesta; además debe articularse con sede electrónica.',
    normativeBasis: 'Ley 1755 de 2015 sobre derecho de petición, lineamientos MIPG de servicio al ciudadano y Gobierno Digital.',
    impact: 'Afecta atención al ciudadano, gestión documental, jurídica, transparencia y todas las dependencias que responden solicitudes.',
    suggestedFlow: ['Radicar solicitud', 'Clasificar tipo y término', 'Asignar responsable', 'Proyectar y validar respuesta', 'Notificar, cerrar y medir satisfacción'],
  },
  {
    id: 'control-disciplinario-cgd',
    procedureIds: controlDisciplinario,
    action: 'modificar',
    severity: 'critico',
    title: 'Revisar Control Interno Disciplinario frente al Código General Disciplinario',
    currentState: 'El procedimiento aparece dentro de Control Interno, aunque el manual de funciones asigna potestad disciplinaria principalmente a Alcalde/Gobierno y apoyo jurídico.',
    proposedState: 'Procedimiento disciplinario con identificación de autoridad competente, separación funcional cuando aplique, etapas de instrucción y juzgamiento, términos, notificaciones, recursos y archivo.',
    why: 'Existe riesgo de incompatibilidad si se mezcla control interno evaluador con primera instancia disciplinaria sin soporte orgánico y normativo.',
    normativeBasis: 'Código General Disciplinario y reglas vigentes de competencia disciplinaria; principio de independencia del control interno.',
    impact: 'Afecta control interno, Gobierno, Talento Humano, Jurídica y Alcaldía.',
    suggestedFlow: ['Recepción de queja/informe', 'Reparto a autoridad competente', 'Indagación o investigación', 'Decisión disciplinaria', 'Notificación, recurso y archivo'],
  },
  {
    id: 'control-interno-informes',
    procedureIds: ids(['PEC-CVE-PI-03', 'PEC-CVE-PAA-06', 'PEC-CVE-SMR-01', 'PEC-CVE-ESP-04', 'PEC-CVE-SPMI-05']),
    action: 'modificar',
    severity: 'medio',
    title: 'Separar informes y seguimientos de Control Interno por tipología',
    currentState: 'Algunos procedimientos concentran múltiples informes, seguimientos y planes en un solo flujo operativo.',
    proposedState: 'Subprocedimientos o rutas diferenciadas para informes legales, auditoría interna, seguimiento a riesgos, planes de mejoramiento, control interno contable y evaluación institucional.',
    why: 'La mezcla de informes dificulta controlar periodicidad, destinatario, evidencia, responsable y oportunidad.',
    normativeBasis: 'Ley 87 de 1993, MIPG y lineamientos de control interno.',
    impact: 'Mejora trazabilidad de informes, auditorías, planes de mejoramiento y seguimiento institucional.',
    suggestedFlow: ['Programar actividad de control', 'Recopilar evidencias', 'Emitir informe o seguimiento', 'Comunicar hallazgos', 'Verificar acciones de mejora'],
  },
  {
    id: 'urbanismo-control-urbano',
    procedureIds: urbanismo,
    action: 'modificar',
    severity: 'alto',
    title: 'Actualizar licencias, certificados y control urbano',
    currentState: 'Hay procedimientos de licencias, certificados, demarcación y suspensión de obra con posibles textos heredados o responsabilidades no uniformes.',
    proposedState: 'Procedimientos urbanísticos con requisitos actualizados, verificación documental, análisis técnico/cartográfico, decisión motivada, notificación, archivo y control urbano cuando aplique.',
    why: 'El informe identifica reutilización de textos, errores entre certificados y flujos sancionatorios que no corresponden con su objeto.',
    normativeBasis: 'Régimen vigente de licencias urbanísticas, normas de ordenamiento territorial, procedimiento administrativo y control urbano.',
    impact: 'Afecta Planeación, atención ciudadana, archivo, inspección de policía y gestión jurídica.',
    suggestedFlow: ['Recepción y verificación de requisitos', 'Análisis técnico y normativo', 'Visita o concepto cuando aplique', 'Expedición o negación motivada', 'Notificación y archivo'],
  },
  {
    id: 'servicios-publicos-responsable',
    procedureIds: [...serviciosPublicosTecnicos, ...serviciosPublicosFinancieros],
    action: 'modificar',
    severity: 'critico',
    title: 'Definir responsable formal de servicios públicos domiciliarios',
    currentState: 'Los procedimientos de planta, filtros, usuarios, facturación, recaudo, subsidios y acuerdos de pago aparecen asociados a dependencias diversas y no siempre tienen soporte funcional específico.',
    proposedState: 'Bloque de Servicios Públicos con responsable formal, roles técnicos, facturación, recaudo, cartera, operación de planta, calidad, mantenimiento, subsidios y atención de usuarios claramente separados.',
    why: 'No debe asignarse operación de planta o facturación a cargos genéricos sin función literal. La matriz de funciones evidencia vacíos en operación técnica y financiera de servicios públicos.',
    normativeBasis: 'Régimen de servicios públicos domiciliarios, manual de funciones vigente y necesidad de segregación de funciones operativas, financieras y de control.',
    impact: 'Afecta Planeación, Hacienda, Desarrollo Económico, atención al ciudadano, recaudo y operación técnica.',
    suggestedFlow: ['Solicitud o evento operativo', 'Verificación técnica/financiera', 'Ejecución por rol competente', 'Registro en sistema/bitácora', 'Control, reporte y archivo'],
  },
  {
    id: 'planeacion-banco-proyectos',
    procedureIds: ids(['PE-PE-EPD-01', 'PE-PE-POAI-02', 'PE-PE-APA-03', 'PE-PE-BP-04', 'PE-PE-RBP-05', 'PE-PE-RR-17']),
    action: 'mantener',
    severity: 'medio',
    title: 'Mantener bloque de planeación con rediseño documental y trazabilidad',
    currentState: 'Los procedimientos estratégicos existen, pero requieren mejor articulación entre plan, inversión, banco de proyectos, indicadores y reportes.',
    proposedState: 'Bloque integrado de planeación con PDM, Plan Indicativo, POAI, Plan de Acción, Banco de Proyectos, seguimiento de inversión, regalías e informes.',
    why: 'El bloque es necesario para la gestión municipal, pero debe ordenar documentos, responsables, indicadores y control de cambios.',
    normativeBasis: 'MIPG, ciclo de planeación institucional, presupuesto público y gestión de proyectos de inversión.',
    impact: 'Afecta todas las dependencias, presupuesto, inversión pública, seguimiento y rendición de cuentas.',
    suggestedFlow: updateFlowBase,
  },
  {
    id: 'financiera-depurar-roles',
    procedureIds: financiero,
    action: 'mantener',
    severity: 'medio',
    title: 'Mantener gestión financiera depurando roles de presupuesto, tesorería y contabilidad',
    currentState: 'Los procedimientos financieros cubren cartera, presupuesto, recaudo, caja, CDP/RP, pagos, conciliaciones, libros e informes.',
    proposedState: 'Mantener procedimientos financieros, pero separar claramente responsables de presupuesto, tesorería, contabilidad, recaudo y cobro coactivo.',
    why: 'La mezcla de operación presupuestal, contable y tributaria puede generar errores, duplicidad o falta de segregación de funciones.',
    normativeBasis: 'Régimen presupuestal, contabilidad pública, Estatuto de Rentas y control fiscal.',
    impact: 'Mejora control del gasto, registro financiero, caja, recaudo y reportes externos.',
    suggestedFlow: updateFlowBase,
  },
  {
    id: 'desarrollo-economico-ambiental',
    procedureIds: desarrolloEconomico,
    action: 'mantener',
    severity: 'medio',
    title: 'Mantener desarrollo económico y ambiental con separación de líneas',
    currentState: 'Los procedimientos reúnen asistencia técnica agropecuaria, estadísticas, predios estratégicos y mantenimiento de predios.',
    proposedState: 'Separar rutas de asistencia técnica, información agropecuaria, proyectos productivos, gestión ambiental, predios estratégicos y turismo cuando aplique.',
    why: 'El manual de funciones evidencia funciones agropecuarias, ambientales, económicas y turísticas amplias; conviene evitar que un solo flujo mezcle objetivos distintos.',
    normativeBasis: 'MIPG, planeación territorial, gestión ambiental y competencias municipales de desarrollo económico.',
    impact: 'Afecta pequeños productores, gestión ambiental, banco de proyectos, contratación y seguimiento sectorial.',
    suggestedFlow: updateFlowBase,
  },
];

export const missingProcedureRecommendations: MissingProcedureRecommendation[] = [
  {
    id: 'nuevo-ptep',
    title: 'Programa de Transparencia y Ética Pública —PTEP—',
    suggestedResponsible: 'Secretaría de Planeación con Control Interno, Gobierno y Despacho del Alcalde',
    reason: 'El manual debe sustituir o actualizar el enfoque PAAC y crear una ruta integral para formulación, publicación, monitoreo y mejora del PTEP.',
    normativeBasis: 'Ley 2195 de 2022 y Decreto 1122 de 2024.',
    relatedProcedureIds: ids(['PE-PE-PAAC-18', 'PE-SG-SIG-01', 'PEC-CVE-SMR-01']),
  },
  {
    id: 'nuevo-gobierno-digital',
    title: 'Gobierno Digital, sede electrónica y seguridad digital',
    suggestedResponsible: 'Secretaría de Gobierno y Desarrollo Institucional / responsable TIC, con Planeación',
    reason: 'El manual contiene soporte informático y transparencia, pero no un procedimiento integral de Gobierno Digital, sede electrónica, accesibilidad, publicación, interoperabilidad y seguridad digital.',
    normativeBasis: 'Política de Gobierno Digital, MIPG y lineamientos MinTIC aplicables a entidades territoriales.',
    relatedProcedureIds: ids(['PA-AC-PQR-01', 'PA-AC-VUC-04', 'PE-SG-SIG-01']),
  },
  {
    id: 'nuevo-proteccion-datos',
    title: 'Protección de datos personales y gestión de bases de datos',
    suggestedResponsible: 'Secretaría de Gobierno y Desarrollo Institucional con apoyo jurídico y TIC',
    reason: 'Varios procedimientos manejan datos sensibles o personales: víctimas, comisaría, PQRSD, Sisbén/Familias, talento humano y Hacienda.',
    normativeBasis: 'Ley 1581 de 2012, régimen de habeas data y lineamientos de seguridad de la información.',
    relatedProcedureIds: ids(['PA-AC-PQR-01', 'PM-GDS-SIFA-17', 'PA-GTH-CS-02', 'PA-GF-ACIP-13']),
  },
  {
    id: 'nuevo-supervision-contractual',
    title: 'Supervisión e interventoría contractual',
    suggestedResponsible: 'Secretaría de Gobierno y Desarrollo Institucional con cada supervisor designado y Hacienda',
    reason: 'Existen procedimientos de contratación y cuentas de cobro, pero conviene un flujo específico de seguimiento, informes, recibo a satisfacción, novedades, modificaciones y liquidación.',
    normativeBasis: 'Régimen de contratación estatal, SECOP II, manual de contratación y principios de supervisión contractual.',
    relatedProcedureIds: ids(['PA-GC-RCC-07', 'PA-GC-PCC-10', 'PA-GC-EP-08', 'PE-PE-SO-16']),
  },
  {
    id: 'nuevo-gestion-riesgos',
    title: 'Gestión integral del riesgo institucional',
    suggestedResponsible: 'Secretaría de Planeación con Control Interno y líderes de proceso',
    reason: 'Existe seguimiento a mapa de riesgos, pero se recomienda un procedimiento transversal para identificación, valoración, controles, seguimiento y materialización de riesgos.',
    normativeBasis: 'MIPG y guías de Función Pública sobre gestión integral del riesgo.',
    relatedProcedureIds: ids(['PEC-CVE-SMR-01', 'PE-SG-SIG-01', 'PE-PE-PAAC-18']),
  },
];


const step = (
  id: string,
  phase: ProcedureRecommendedFlowStep['phase'],
  title: string,
  description: string,
  responsible: string,
  evidence: string,
  decision?: string,
): ProcedureRecommendedFlowStep => ({ id, phase, title, description, responsible, evidence, decision });

const isIn = (procedure: ProcedureItem, list: string[]) => list.includes(procedure.id);

const genericRecommendedFlow = (procedure: ProcedureItem): ProcedureRecommendedFlowStep[] => [
  step('recepcion', 'P', 'Recepción o evento inicial', `Recibir la solicitud, necesidad, alerta o insumo que activa el procedimiento ${procedure.code}.`, procedure.responsibleArea || 'Dependencia responsable', 'Radicado, solicitud, acta, correo, requerimiento o soporte inicial.'),
  step('verificacion', 'P', 'Verificación de competencia y requisitos', 'Confirmar responsable, competencia, requisitos mínimos, documentos, plazos, normativa aplicable y canal de atención.', 'Líder del procedimiento / apoyo técnico o administrativo', 'Lista de chequeo, matriz de requisitos y constancia de revisión.'),
  step('analisis', 'H', 'Análisis y trámite de fondo', 'Ejecutar las actividades técnicas, jurídicas, administrativas o financieras propias del procedimiento, dejando trazabilidad por actividad.', 'Funcionario o rol competente según manual de funciones', 'Concepto, informe, cálculo, revisión, visita, estudio, registro de sistema o expediente.'),
  step('decision', 'V', 'Decisión o validación', 'Validar si la actuación cumple requisitos, si procede aprobar, negar, devolver, corregir, remitir o escalar.', 'Responsable decisor o superior competente', 'Acto, visto bueno, aprobación, devolución motivada, acta o registro de decisión.', '¿Cumple requisitos y competencia?'),
  step('salida', 'H', 'Emisión del producto o respuesta', 'Generar el producto del procedimiento: certificado, informe, acto, registro, autorización, pago, reporte, remisión o cierre operativo.', 'Dependencia responsable', 'Producto final, comunicación, publicación, reporte o registro emitido.'),
  step('notificacion', 'H', 'Comunicación, publicación o notificación', 'Comunicar el resultado al usuario, dependencia, plataforma, ente de control o archivo correspondiente, según aplique.', 'Responsable del trámite / gestión documental', 'Constancia de notificación, publicación, envío, recibido o registro en plataforma.'),
  step('archivo', 'V', 'Archivo y control documental', 'Incorporar documentos, evidencias y producto final al expediente físico o electrónico, con serie documental y responsable de custodia.', 'Gestión documental / dependencia productora', 'Expediente, inventario documental, TRD, índice electrónico o soporte archivado.'),
  step('mejora', 'A', 'Seguimiento y mejora', 'Medir oportunidad, completitud, cumplimiento normativo y satisfacción cuando aplique; registrar acciones de mejora y control de cambios.', 'Líder del proceso / Control Interno si aplica', 'Indicador, informe de seguimiento, acción correctiva o control de cambios.'),
];

export function getProcedureRecommendedFlow(procedure: ProcedureItem): ProcedureRecommendedFlowStep[] {
  if (isIn(procedure, ids(['PE-PE-PAAC-18']))) {
    return [
      step('diagnostico', 'P', 'Diagnóstico de integridad y riesgos', 'Identificar riesgos de corrupción, integridad, conflicto de intereses, canales de denuncia, transparencia activa y resultados previos.', 'Secretaría de Planeación con Gobierno y Control Interno', 'Matriz de riesgos, diagnóstico PTEP, informe de seguimiento y soportes de participación.'),
      step('formulacion', 'P', 'Formulación del PTEP', 'Estructurar componentes, responsables, actividades, metas, indicadores, cronograma, evidencias y responsables de reporte.', 'Secretaría de Planeación', 'Documento PTEP, matriz de actividades, cronograma e indicadores.'),
      step('validacion', 'V', 'Validación y aprobación interna', 'Revisar coherencia normativa, viabilidad de actividades, responsables y articulación con MIPG, riesgos y atención al ciudadano.', 'Comité institucional o instancia competente', 'Acta, aprobación, observaciones y versión final.'),
      step('publicacion', 'H', 'Publicación y socialización', 'Publicar en sede electrónica y socializar con dependencias, ciudadanía y grupos de valor.', 'Gobierno / TIC / Comunicaciones', 'Enlace publicado, piezas de socialización y registro de divulgación.'),
      step('monitoreo', 'V', 'Monitoreo periódico', 'Recolectar evidencias, medir avance, identificar rezagos y reportar cumplimiento.', 'Líderes de actividad y Control Interno', 'Matriz de seguimiento, evidencias y alertas de avance.'),
      step('mejora', 'A', 'Ajuste y control de cambios', 'Actualizar el programa, dejar trazabilidad de cambios y preparar la siguiente vigencia.', 'Secretaría de Planeación', 'Control de cambios, informe final y plan de mejora.'),
    ];
  }

  if (isIn(procedure, contractual)) {
    return [
      step('necesidad', 'P', 'Identificación de necesidad', 'Definir necesidad pública, objeto, alcance, valor estimado, fuente de financiación, modalidad probable y responsable.', 'Dependencia solicitante / ordenador del gasto', 'Solicitud de contratación, análisis de necesidad y soportes.'),
      step('estudios', 'P', 'Estudios y documentos previos', 'Elaborar estudios previos, análisis del sector, matriz de riesgos, anexo técnico, requisitos y criterios de evaluación.', 'Dependencia solicitante con apoyo contractual', 'Estudios previos, análisis sectorial, matriz de riesgos, anexo técnico y proyecto de pliego/invitación.'),
      step('publicacion', 'H', 'Publicación en SECOP II', 'Crear proceso, publicar documentos, recibir observaciones, responderlas y ajustar documentos cuando proceda.', 'Gestión Contractual', 'Expediente SECOP II, observaciones, respuestas y adendas.'),
      step('evaluacion', 'V', 'Evaluación y selección', 'Verificar requisitos, evaluar ofertas, publicar informe, resolver observaciones y recomendar adjudicación o declaratoria desierta.', 'Comité evaluador / Gestión Contractual', 'Informe de evaluación, subsanaciones, observaciones y acto de adjudicación o declaratoria.'),
      step('perfeccionamiento', 'H', 'Perfeccionamiento y ejecución', 'Suscribir contrato, aprobar garantías, verificar requisitos de ejecución, designar supervisión y registrar inicio.', 'Ordenador del gasto / Jurídica / Supervisor', 'Contrato, garantías aprobadas, RP, acta de inicio y designación de supervisor.'),
      step('seguimiento', 'V', 'Supervisión, pagos y novedades', 'Controlar informes, productos, seguridad social, pagos, modificaciones, suspensión, reinicio, incumplimientos y liquidación.', 'Supervisor / Hacienda / Contratación', 'Informes de supervisión, cuentas, órdenes de pago, actas y liquidación.'),
      step('archivo', 'A', 'Cierre y expediente contractual', 'Cerrar expediente físico/electrónico, verificar completitud documental, publicar documentos finales y conservar soportes.', 'Gestión Contractual / Gestión Documental', 'Expediente contractual completo, índice y constancia de cierre.'),
    ];
  }

  if (isIn(procedure, comisaria)) {
    return [
      step('recepcion', 'P', 'Recepción y valoración inicial', 'Recibir denuncia, solicitud o remisión; valorar urgencia, riesgo, competencia, reserva y enfoque diferencial.', 'Comisaría de Familia / equipo interdisciplinario', 'Formato de recepción, valoración inicial, consentimiento o constancia de atención.'),
      step('proteccion', 'H', 'Medidas urgentes o remisión', 'Adoptar medidas de protección o restablecimiento urgentes cuando proceda, o remitir a autoridad competente.', 'Comisario de Familia', 'Auto, medida de protección, remisión, oficio a Policía, Fiscalía, ICBF o salud.'),
      step('actuacion', 'H', 'Actuación administrativa o audiencia', 'Practicar audiencia, conciliación, entrevistas, valoración psicosocial, pruebas, notificaciones y actuaciones de trámite.', 'Comisaría de Familia / equipo interdisciplinario', 'Actas, informes psicosociales, constancias de notificación y expediente reservado.'),
      step('decision', 'V', 'Decisión y plan de seguimiento', 'Definir custodia, alimentos, visitas, medidas de protección, restablecimiento o cierre, según competencia.', 'Comisario de Familia', 'Resolución, acta de conciliación, medida, plan de seguimiento o decisión motivada.', '¿Procede medida, acuerdo, remisión o cierre?'),
      step('seguimiento', 'V', 'Seguimiento interdisciplinario', 'Verificar cumplimiento de medidas, activar rutas interinstitucionales y registrar novedades.', 'Equipo interdisciplinario / Comisaría', 'Informe de seguimiento, visitas, llamadas, remisiones y alertas.'),
      step('cierre', 'A', 'Cierre, archivo reservado y reporte', 'Cerrar actuación cuando proceda, archivar bajo reserva y remitir reportes institucionales requeridos.', 'Comisaría de Familia', 'Acta de cierre, expediente reservado, reporte y control de términos.'),
    ];
  }

  if (isIn(procedure, atencionCiudadana)) {
    return [
      step('radicacion', 'P', 'Radicación multicanal', 'Recibir solicitud por ventanilla, sede electrónica, correo, presencial, telefónico o canal habilitado y entregar constancia.', 'Atención al Ciudadano / Ventanilla Única', 'Número de radicado, acuse de recibo y canal de entrada.'),
      step('clasificacion', 'P', 'Clasificación y términos', 'Clasificar PQRSD, tutela, acción constitucional, solicitud de información o trámite; definir término legal y dependencia competente.', 'Atención al Ciudadano / Jurídica si aplica', 'Tipificación, término de respuesta y asignación.'),
      step('traslado', 'H', 'Asignación o traslado', 'Remitir a dependencia competente o trasladar a entidad externa si no es competencia municipal, informando al solicitante.', 'Ventanilla Única / dependencia líder', 'Constancia de traslado, reparto o asignación.'),
      step('respuesta', 'H', 'Proyección de respuesta', 'Analizar solicitud, recopilar información, aplicar lenguaje claro y proyectar respuesta completa, de fondo y oportuna.', 'Dependencia competente', 'Proyecto de respuesta, soportes técnicos/jurídicos y revisión.'),
      step('validacion', 'V', 'Revisión de calidad y término', 'Verificar competencia, claridad, integridad, anexos y cumplimiento del término legal.', 'Jefe de dependencia / Jurídica cuando aplique', 'Visto bueno, control de término y ajustes.'),
      step('notificacion', 'H', 'Envío y cierre', 'Enviar respuesta por el canal autorizado, registrar salida y cerrar radicado.', 'Atención al Ciudadano / Gestión Documental', 'Constancia de envío, notificación, recibido y cierre.'),
      step('medicion', 'A', 'Medición y mejora', 'Medir oportunidad, vencimientos, temas recurrentes, satisfacción y acciones de mejora.', 'Líder de Atención al Ciudadano', 'Indicadores PQRSD, informe periódico y plan de mejora.'),
    ];
  }

  if (isIn(procedure, [...documentalGestion, ...documentalTecnico])) {
    return [
      step('produccion', 'P', 'Identificación documental', 'Identificar serie, subserie, tipo documental, productor, soporte físico/electrónico y TRD aplicable.', 'Dependencia productora / Gestión Documental', 'TRD, inventario documental, rótulo o índice de expediente.'),
      step('organizacion', 'H', 'Organización y foliación', 'Clasificar, ordenar, foliar o indexar expedientes, aplicar controles de acceso y conservar integridad documental.', 'Dependencia productora', 'Expediente organizado, hoja de control, índice o inventario.'),
      step('tramite', 'H', 'Consulta, préstamo o transferencia', 'Gestionar consulta, préstamo, transferencia primaria/secundaria o retención según ciclo vital documental.', 'Gestión Documental / Archivo Central', 'Formato de préstamo, inventario FUID, acta de transferencia.'),
      step('validacion', 'V', 'Validación archivística', 'Verificar completitud, TRD, tiempos de retención, disposición final y autorización de comité cuando aplique.', 'Gestión Documental / Comité competente', 'Acta, concepto técnico o control de calidad.'),
      step('disposicion', 'A', 'Conservación, eliminación o preservación', 'Aplicar disposición final, eliminación autorizada o preservación física/electrónica, dejando trazabilidad.', 'Gestión Documental', 'Acta de eliminación, inventario actualizado, transferencia o repositorio.'),
      step('mejora', 'A', 'Actualización de instrumentos', 'Actualizar TRD, procedimientos, formatos y control de cambios cuando existan cambios orgánicos o funcionales.', 'Gestión Documental con líderes de proceso', 'TRD actualizada, control de cambios y socialización.'),
    ];
  }

  if (isIn(procedure, financiero)) {
    return [
      step('evento', 'P', 'Hecho económico o solicitud financiera', 'Recibir solicitud, obligación, recaudo, cuenta, reporte o evento financiero que activa el procedimiento.', 'Secretaría de Hacienda / Tesorería / Presupuesto / Contabilidad', 'Solicitud, factura, cuenta, extracto, recibo, acto o soporte.'),
      step('requisitos', 'P', 'Verificación presupuestal y documental', 'Verificar competencia, disponibilidad, registro, soportes, tercero, descuentos, impuestos y requisitos del trámite.', 'Hacienda / Técnico responsable', 'Lista de chequeo, CDP/RP, soportes y validación documental.'),
      step('registro', 'H', 'Registro en sistema', 'Realizar registro presupuestal, contable, tesoral o tributario según corresponda.', 'Presupuesto / Contabilidad / Tesorería', 'Comprobante, registro, libro auxiliar, recibo o movimiento bancario.'),
      step('validacion', 'V', 'Validación y control financiero', 'Revisar consistencia, saldos, conciliación, autorizaciones, obligaciones y cumplimiento normativo.', 'Secretario de Hacienda / Contador / Tesorero', 'Visto bueno, conciliación, informe, validación o control.'),
      step('salida', 'H', 'Pago, recaudo, certificado o reporte', 'Emitir producto financiero: pago, certificado, informe, reporte, recibo, orden o actualización de cartera.', 'Hacienda / Tesorería', 'Orden de pago, comprobante, reporte, certificado o constancia.'),
      step('archivo', 'A', 'Archivo y reporte externo', 'Archivar soporte y reportar a entes de control, CGN, Contraloría o plataforma cuando aplique.', 'Hacienda / Gestión Documental', 'Expediente financiero, reporte cargado, informe y control de cambios.'),
    ];
  }

  if (isIn(procedure, urbanismo)) {
    return [
      step('solicitud', 'P', 'Solicitud urbanística', 'Recibir solicitud de licencia, certificado, demarcación, residencia o control de obra y verificar radicación.', 'Ventanilla / Secretaría de Planeación', 'Formulario, radicado y documentos anexos.'),
      step('requisitos', 'P', 'Revisión de requisitos e insumos', 'Validar documentos, pago, identificación predial, norma urbana, cartografía, antecedentes y competencia.', 'Secretaría de Planeación', 'Lista de chequeo, recibos, planos, certificado catastral o soporte predial.'),
      step('analisis', 'H', 'Análisis técnico y visita', 'Realizar estudio técnico, consulta normativa, visita de campo, revisión cartográfica o concepto urbanístico según el trámite.', 'Planeación / apoyo técnico', 'Informe técnico, acta de visita, concepto, fotografías o plano.'),
      step('decision', 'V', 'Decisión técnica o jurídica', 'Determinar si procede aprobar, negar, suspender, sancionar, devolver o requerir información adicional.', 'Secretario de Planeación / autoridad competente', 'Acto, certificado, requerimiento, suspensión o decisión motivada.', '¿Cumple requisitos urbanísticos y técnicos?'),
      step('expedicion', 'H', 'Expedición y notificación', 'Expedir certificado, licencia, concepto, demarcación, requerimiento o acto sancionatorio y notificar al interesado.', 'Secretaría de Planeación', 'Documento expedido, constancia de notificación o publicación.'),
      step('control', 'V', 'Control y seguimiento', 'Registrar salida, hacer seguimiento a vencimientos, control urbano o cumplimiento de obligaciones cuando aplique.', 'Planeación / Inspección si corresponde', 'Registro, expediente, reporte de seguimiento y archivo.'),
    ];
  }

  if (isIn(procedure, infraestructura)) {
    return [
      step('necesidad', 'P', 'Identificación de necesidad de obra', 'Recibir solicitud comunitaria, plan, proyecto o diagnóstico de infraestructura y verificar prioridad.', 'Secretaría de Planeación', 'Solicitud, diagnóstico, visita, banco de proyectos o plan de inversión.'),
      step('estudios', 'P', 'Estudios, diseños y factibilidad', 'Elaborar o revisar estudios, diseños, presupuesto, permisos, riesgos, fuente de financiación y viabilidad.', 'Planeación / Profesional técnico', 'Estudios, diseños, presupuesto, concepto de viabilidad y registro en banco de proyectos.'),
      step('contratacion', 'H', 'Gestión contractual o ejecución directa', 'Articular contratación, interventoría, supervisión, acta de inicio y plan de trabajo.', 'Planeación / Contratación / Supervisor', 'Contrato, acta de inicio, cronograma, plan de calidad e interventoría.'),
      step('seguimiento', 'V', 'Seguimiento técnico y financiero', 'Verificar avance, calidad, cantidades, actas parciales, suspensión/reinicio y cumplimiento de especificaciones.', 'Supervisor / Interventor', 'Informes, actas, bitácora, registros fotográficos y soportes de pago.'),
      step('recibo', 'H', 'Recibo y liquidación', 'Realizar recibo a satisfacción, acta final, liquidación, cierre presupuestal y entrega a la comunidad o dependencia.', 'Supervisor / Ordenador / Contratación', 'Acta final, liquidación, garantías actualizadas y entrega.'),
      step('mejora', 'A', 'Lecciones aprendidas y mantenimiento', 'Registrar mejoras, necesidades de mantenimiento y actualización de inventario de infraestructura.', 'Planeación / dependencia usuaria', 'Informe de cierre, acciones de mejora y control de cambios.'),
    ];
  }

  if (isIn(procedure, [...serviciosPublicosTecnicos, ...serviciosPublicosFinancieros])) {
    return [
      step('evento', 'P', 'Solicitud o evento de servicios públicos', 'Recibir solicitud de usuario, novedad operativa, daño, mantenimiento, facturación, recaudo o subsidio.', 'Área formal de Servicios Públicos / Atención al Usuario', 'Radicado, reporte, lectura, orden de trabajo, factura o solicitud.'),
      step('clasificacion', 'P', 'Clasificación técnica o financiera', 'Determinar si corresponde a operación de planta, mantenimiento, conexión, facturación, recaudo, subsidio, acuerdo de pago o reclamación.', 'Responsable de Servicios Públicos', 'Registro de clasificación, asignación y responsable.'),
      step('ejecucion', 'H', 'Ejecución por rol competente', 'Realizar actividad técnica, administrativa o financiera según corresponda, evitando asignaciones genéricas sin función expresa.', 'Operador técnico / Hacienda / responsable designado', 'Bitácora, orden de trabajo, registro de sistema, factura, recibo o acuerdo.'),
      step('control', 'V', 'Control de calidad, cartera o cumplimiento', 'Verificar calidad del servicio, medición, recaudo, cartera, subsidios, soporte técnico o cumplimiento del acuerdo.', 'Responsable de control / Hacienda / supervisor', 'Reporte de calidad, conciliación, estado de cartera, acta o informe.'),
      step('respuesta', 'H', 'Respuesta al usuario o reporte', 'Informar resultado al usuario, actualizar sistema y remitir reportes a la autoridad o dependencia competente.', 'Servicios Públicos / Atención al Usuario', 'Respuesta, actualización de sistema, reporte y soporte.'),
      step('mejora', 'A', 'Mejora y actualización del manual', 'Identificar vacíos de cargo, riesgos operativos y ajustes requeridos al manual de funciones o procedimiento.', 'Líder del proceso / Planeación / Gobierno', 'Acción de mejora, propuesta de actualización y control de cambios.'),
    ];
  }

  if (isIn(procedure, policia) || isIn(procedure, juridicaPoliciva)) {
    return [
      step('recepcion', 'P', 'Recepción de querella, denuncia o solicitud policiva', 'Recibir actuación, verificar competencia, identidad, hechos, pruebas iniciales y términos.', 'Inspección de Policía', 'Radicado, querella, solicitud, denuncia o soporte inicial.'),
      step('admision', 'P', 'Admisión, rechazo o remisión', 'Definir si admite trámite, requiere subsanación, rechaza o remite a autoridad competente.', 'Inspector de Policía', 'Auto, constancia de subsanación, remisión o decisión inicial.', '¿Es competencia de la Inspección?'),
      step('actuacion', 'H', 'Trámite policivo', 'Practicar citaciones, audiencia, pruebas, visita, descargos o trámite verbal conforme a la norma aplicable.', 'Inspector de Policía / apoyo administrativo', 'Actas, citaciones, pruebas, registros fotográficos y expediente.'),
      step('decision', 'V', 'Decisión, medida o recurso', 'Emitir decisión, medida correctiva, autorización, guía, sanción o trámite de recurso cuando proceda.', 'Inspector de Policía', 'Decisión motivada, guía, autorización, recurso o medida.'),
      step('seguimiento', 'V', 'Seguimiento y cumplimiento', 'Verificar cumplimiento de la decisión, pago, medida, remisión o actuación ordenada.', 'Inspección de Policía', 'Constancias, recibos, informe de cumplimiento y comunicaciones.'),
      step('archivo', 'A', 'Archivo y reporte', 'Cerrar expediente, archivar soportes y reportar cuando aplique a Gobierno u otra autoridad.', 'Inspección de Policía / Gestión Documental', 'Expediente completo, reporte y control de cambios.'),
    ];
  }

  if (isIn(procedure, talentoHumano)) {
    return [
      step('solicitud', 'P', 'Solicitud o novedad de personal', 'Recibir solicitud de comisión, certificación, vacaciones, licencia, nombramiento, encargo, traslado, retiro, estímulo, cesantías o inducción.', 'Talento Humano / Secretaría de Gobierno', 'Solicitud, soporte, historia laboral o requerimiento.'),
      step('validacion', 'P', 'Validación normativa y documental', 'Verificar requisitos, competencia, disponibilidad, historia laboral, acto requerido, soportes y términos.', 'Talento Humano / Profesional Jurídico si aplica', 'Lista de chequeo, concepto, historia laboral y documentos soporte.'),
      step('proyeccion', 'H', 'Proyección de acto o trámite', 'Elaborar acto administrativo, certificación, plan, registro, novedad de nómina o comunicación.', 'Talento Humano / apoyo administrativo', 'Proyecto de acto, certificación, plan, registro o novedad.'),
      step('aprobacion', 'V', 'Revisión y aprobación', 'Revisar legalidad, datos, competencia, firma, publicación o notificación según corresponda.', 'Secretario de Gobierno / Alcalde cuando aplique', 'Acto firmado, certificación expedida o aprobación.'),
      step('registro', 'H', 'Registro y comunicación', 'Registrar en historia laboral, nómina, plataforma o archivo; comunicar al servidor o dependencia.', 'Talento Humano', 'Registro, notificación, correo, constancia o reporte.'),
      step('seguimiento', 'A', 'Seguimiento y actualización', 'Actualizar controles, indicadores, plan anual o base de datos del personal.', 'Talento Humano', 'Indicador, base actualizada, informe y control de cambios.'),
    ];
  }

  if (isIn(procedure, desarrolloEconomico)) {
    return [
      step('diagnostico', 'P', 'Diagnóstico sectorial o ambiental', 'Identificar necesidad de productor, comunidad, predio estratégico, estadística, asistencia técnica o proyecto productivo.', 'Desarrollo Económico, Sostenible y Turismo', 'Solicitud, diagnóstico, visita, base agropecuaria o ficha de predio.'),
      step('priorizacion', 'P', 'Priorización y viabilidad', 'Verificar criterios técnicos, ambientales, sociales, presupuestales y de articulación con plan de desarrollo.', 'Secretaría / Profesional agroambiental', 'Matriz de priorización, concepto, viabilidad o registro.'),
      step('ejecucion', 'H', 'Asistencia, gestión o intervención', 'Ejecutar asistencia técnica, levantamiento de información, gestión de predios, mantenimiento, capacitación o acompañamiento.', 'Profesional / equipo técnico / contratista', 'Acta, visita, registro fotográfico, informe técnico o base de datos.'),
      step('articulacion', 'H', 'Articulación institucional', 'Gestionar apoyo con entidades sectoriales, ambientales, productores, asociaciones o banco de proyectos.', 'Secretaría de Desarrollo Económico', 'Oficios, convenios, actas, proyectos o reportes.'),
      step('seguimiento', 'V', 'Seguimiento técnico', 'Medir resultados, impactos, cumplimiento ambiental, asistencia realizada y necesidades de mejora.', 'Secretaría / Profesional responsable', 'Indicadores, informe, base actualizada y seguimiento.'),
      step('cierre', 'A', 'Cierre y mejora', 'Cerrar actividad, actualizar inventarios o bases y proponer mejoras al procedimiento.', 'Líder del proceso', 'Informe final, control de cambios y acciones de mejora.'),
    ];
  }

  if (isIn(procedure, [...socialGeneral, ...cultura])) {
    return [
      step('necesidad', 'P', 'Identificación de necesidad social o cultural', 'Recibir solicitud, convocatoria, programa, actividad comunitaria, evento, curso o caso social.', 'Desarrollo Social / Gobierno / Cultura según línea', 'Solicitud, convocatoria, caracterización, lista de inscritos o diagnóstico.'),
      step('focalizacion', 'P', 'Validación de población y requisitos', 'Verificar población objetivo, criterios de acceso, soportes, bases de datos, enfoque diferencial y disponibilidad.', 'Responsable del programa', 'Lista de chequeo, base de beneficiarios, soportes y autorización de tratamiento de datos.'),
      step('programacion', 'H', 'Programación de actividad o trámite', 'Definir cronograma, recursos, responsables, alianzas, logística y evidencias requeridas.', 'Líder del programa / apoyo administrativo', 'Plan de trabajo, acta, invitación, cronograma o ficha del programa.'),
      step('ejecucion', 'H', 'Ejecución y registro', 'Realizar atención, evento, orientación, formación, novedad, entrega o acompañamiento.', 'Equipo responsable', 'Asistencia, acta, registro fotográfico, novedad, informe o plataforma.'),
      step('verificacion', 'V', 'Verificación de resultados', 'Confirmar cumplimiento de requisitos, cobertura, satisfacción, soportes y resultados esperados.', 'Secretaría responsable', 'Informe, indicadores, encuesta, cierre de novedad o reporte.'),
      step('archivo', 'A', 'Archivo, reporte y mejora', 'Archivar evidencias, reportar a entidad competente y registrar mejoras para siguiente ciclo.', 'Secretaría responsable / Gestión Documental', 'Expediente, informe, reporte y control de cambios.'),
    ];
  }

  if (isIn(procedure, controlInterno) || isIn(procedure, controlDisciplinario)) {
    return [
      step('planeacion', 'P', 'Planeación de control o auditoría', 'Definir objetivo, alcance, criterios, riesgos, muestra, cronograma y responsable del seguimiento.', 'Oficina de Control Interno', 'Plan de auditoría, programa de seguimiento o matriz de riesgos.'),
      step('recoleccion', 'H', 'Solicitud y recolección de evidencias', 'Solicitar información, realizar entrevistas, revisar expedientes, sistemas, indicadores y soportes.', 'Control Interno / dependencia auditada', 'Requerimientos, papeles de trabajo, evidencias y actas.'),
      step('evaluacion', 'V', 'Evaluación y hallazgos', 'Analizar cumplimiento, controles, riesgos, eficacia de acciones y posibles hallazgos.', 'Control Interno', 'Informe preliminar, matriz de hallazgos y observaciones.'),
      step('contradiccion', 'V', 'Contradicción o respuesta del responsable', 'Permitir aclaraciones, soportes, plan de mejoramiento o respuesta del área evaluada.', 'Dependencia responsable', 'Respuesta, soportes, plan de mejoramiento.'),
      step('informe', 'H', 'Informe final y comunicación', 'Emitir informe final, recomendaciones y compromisos, comunicando a la instancia correspondiente.', 'Control Interno', 'Informe final, oficio de comunicación y publicación si aplica.'),
      step('seguimiento', 'A', 'Seguimiento a acciones de mejora', 'Verificar cumplimiento, eficacia y cierre de acciones correctivas o preventivas.', 'Control Interno', 'Matriz de seguimiento, evidencias de cierre y control de cambios.'),
    ];
  }

  if (isIn(procedure, juridicaGeneral) || isIn(procedure, administrativa)) {
    return [
      step('solicitud', 'P', 'Solicitud administrativa o jurídica', 'Recibir requerimiento, necesidad de acto, revisión documental, concepto, viático, inventario o trámite administrativo.', 'Secretaría de Gobierno / dependencia solicitante', 'Radicado, solicitud, soporte o minuta.'),
      step('requisitos', 'P', 'Verificación de requisitos y competencia', 'Validar competencia, soportes, normativa, disponibilidad, antecedente documental y responsable de firma.', 'Gobierno / Jurídica / Administrativo', 'Lista de chequeo, concepto previo o validación documental.'),
      step('proyeccion', 'H', 'Proyección o trámite', 'Preparar acto, documento, concepto, revisión, registro, inventario, autorización o gestión administrativa.', 'Profesional o técnico competente', 'Proyecto, concepto, registro, acta, inventario o documento revisado.'),
      step('revision', 'V', 'Revisión y aprobación', 'Revisar legalidad, coherencia, soporte, competencia, formato, control de cambios y firma.', 'Jefe inmediato / Alcalde cuando aplique', 'Visto bueno, firma, aprobación o devolución motivada.'),
      step('comunicacion', 'H', 'Comunicación, ejecución o publicación', 'Notificar, publicar, ejecutar, registrar o entregar el producto del trámite.', 'Dependencia responsable / Gestión Documental', 'Comunicación, acto publicado, registro, salida o constancia.'),
      step('archivo', 'A', 'Archivo y mejora', 'Archivar expediente, medir oportunidad, registrar observaciones y actualizar formatos.', 'Dependencia productora', 'Expediente, indicador, acción de mejora y control de cambios.'),
    ];
  }

  return genericRecommendedFlow(procedure);
}

export function getProcedureUpdateActions(procedure: ProcedureItem) {
  const specific = procedureUpdateActions.filter((action) => action.procedureIds.includes(procedure.id));

  if (specific.length > 0) return specific;

  return [{
    id: `general-${procedure.id}`,
    procedureIds: [procedure.id],
    action: 'mantener' as const,
    severity: procedure.source.validationMode === 'visual_validated' ? 'bajo' as const : 'medio' as const,
    title: 'Mantener con depuración documental general',
    currentState: 'El procedimiento no tiene una alerta normativa específica dentro de la matriz priorizada.',
    proposedState: 'Mantener el procedimiento, pero actualizar control de cambios, responsable vigente, documentos, formatos, riesgos, indicadores y coherencia entre matriz y flujograma.',
    why: 'Todo procedimiento del manual debe tener trazabilidad, PHVA consistente, evidencias mínimas y responsable validado, incluso cuando no requiera cambio normativo mayor.',
    normativeBasis: 'MIPG, control interno, gestión documental y criterios técnicos mínimos de actualización de procedimientos.',
    impact: 'Mejora consulta, aplicación, seguimiento y auditoría del procedimiento.',
    suggestedFlow: updateFlowBase,
  }];
}

export function getMissingProcedureRecommendations(procedure?: ProcedureItem) {
  if (!procedure) return missingProcedureRecommendations;
  return missingProcedureRecommendations.filter((item) => item.relatedProcedureIds.includes(procedure.id));
}

const profileById = new Map(allFunctionProfiles.map((profile) => [profile.id, profile]));

const isExactFunction = (fn: FunctionItem) => !fn.description.toLowerCase().includes('pendiente de transcripción exacta');

const functionsFor = (profile: FunctionProfile, numbers: number[]) =>
  numbers
    .map((number) => profile.functions.find((fn) => fn.number === number))
    .filter((fn): fn is FunctionItem => Boolean(fn) && isExactFunction(fn));

export function getProcedureRelationships(procedure: ProcedureItem): ProcedureRelationship[] {
  return strictRelationRules
    .filter((rule) => rule.procedureIds.includes(procedure.id))
    .map((rule) => {
      const profile = profileById.get(rule.profileId);
      if (!profile) return null;
      const functions = functionsFor(profile, rule.functionNumbers);
      if (functions.length === 0) return null;
      return {
        profile,
        functions,
        confidence: rule.confidence,
        reason: rule.reason,
        recommendation: rule.recommendation,
        criticality: rule.criticality,
        legalFit: rule.legalFit,
        legalReview: rule.legalReview,
        rule,
      };
    })
    .filter(Boolean) as ProcedureRelationship[];
}

export function getFunctionRelations(functionItem: FunctionItem, profile: FunctionProfile): FunctionProcessRelation[] {
  if (!isExactFunction(functionItem)) {
    return [{
      procedureId: '',
      functionProfileId: profile.id,
      functionId: functionItem.id,
      confidence: 'sin_relacion',
      reason: 'La función aún no tiene transcripción exacta validada. Por criterio conservador no se relaciona con procedimientos para evitar asociaciones falsas.',
    }];
  }

  const linkedRules = strictRelationRules.filter((rule) => rule.profileId === profile.id && rule.functionNumbers.includes(functionItem.number));

  if (linkedRules.length === 0) {
    return [{
      procedureId: '',
      functionProfileId: profile.id,
      functionId: functionItem.id,
      confidence: 'sin_relacion',
      reason: 'La función no tiene procedimiento relacionado con criterio estricto en esta matriz. Puede ser una función transversal, directiva general o no documentada como procedimiento específico.',
    }];
  }

  return linkedRules.flatMap((rule) => rule.procedureIds.map((procedureId) => ({
    procedureId,
    functionProfileId: profile.id,
    functionId: functionItem.id,
    confidence: rule.confidence,
    reason: `${rule.reason} Recomendación: ${rule.recommendation}`,
  })));
}

export function getFunctionStrictRules(functionItem: FunctionItem, profile: FunctionProfile) {
  return strictRelationRules.filter((rule) => rule.profileId === profile.id && rule.functionNumbers.includes(functionItem.number));
}

export function getProcedureStrictRules(procedureId: string) {
  return strictRelationRules.filter((rule) => rule.procedureIds.includes(procedureId));
}

export function getProfileUpdateFindings(profileId: string) {
  return manualUpdateFindings.filter((finding) => finding.affectedProfileIds.includes(profileId));
}

export function getProfileFunctionUpdateActions(profileId: string) {
  return [
    ...globalFunctionUpdateActions,
    ...(profileFunctionUpdateActions[profileId] ?? []),
  ];
}

export function countLinkedFunctions(profile: FunctionProfile) {
  const linkedNumbers = new Set(
    strictRelationRules
      .filter((rule) => rule.profileId === profile.id)
      .flatMap((rule) => rule.functionNumbers),
  );
  return profile.functions.filter((fn) => linkedNumbers.has(fn.number)).length;
}
