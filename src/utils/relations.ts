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
    id: 'errores-textuales-manual',
    title: 'Corregir errores textuales y de área funcional detectados',
    scope: 'Perfiles con errores OCR o inconsistencias internas',
    severity: 'medio',
    affectedProfileIds: ['inspector-policia-303-03', 'secretario-desarrollo-economico-020-04', 'profesional-planeacion-219-03'],
    summary: 'Se detectaron expresiones como “Finalizar inspecciones”, “coberturas de obras” y área funcional de Desarrollo Social en fichas de Desarrollo Económico.',
    recommendation: 'Marcar como hallazgos de actualización y corregir mediante acto administrativo de modificación del manual.',
  },
];

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

export function countLinkedFunctions(profile: FunctionProfile) {
  const linkedNumbers = new Set(
    strictRelationRules
      .filter((rule) => rule.profileId === profile.id)
      .flatMap((rule) => rule.functionNumbers),
  );
  return profile.functions.filter((fn) => linkedNumbers.has(fn.number)).length;
}
