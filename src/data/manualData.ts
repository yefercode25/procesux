import type { ManualData, ProcedureItem, FlowStep } from '../types/manual';

const emptyDetail = () => ({
  objective: '',
  scope: '',
  definitions: [],
  generalDispositions: [],
  documents: [],
  formats: [],
  legalRequirements: [],
  variablesToMeasure: [],
  flowSteps: [] as FlowStep[],
});

const procedure = (
  code: string,
  title: string,
  responsibleArea = 'Pendiente por validar',
  pageStart?: number,
  formats: string[] = [],
): ProcedureItem => ({
  id: code.toLowerCase(),
  code,
  title,
  responsibleArea,
  status: 'pendiente',
  source: {
    pageStart,
    pageEnd: pageStart,
    validationMode: 'pendiente',
  },
  detail: {
    ...emptyDetail(),
    formats,
  },
});

const proceduresWithoutFlowToAdd = [
  'PE-PE-RBP-05',
  'PE-PE-EPF-15',
  'PE-PE-SO-16',
  'PE-PE-RR-17',
  'PE-PE-PAAC-18',
  'PE-SG-SIG-01',
  'PM-GDS-AU-22',
  'PA-GTH-MSA-13',
  'PA-GJ-AD-06',
  'PA-GJ-AL-07',
  'PA-GJ-EGMG-08',
  'PA-GJ-RBUP-09',
  'PA-GC-PA-06',
  'PA-GF-IEP-02',
  'PA-GF-GCB-03',
  'PA-GF-RI-04',
  'PA-GF-IDC-05',
  'PA-GF-PT-07',
  'PA-GF-CB-08',
  'PA-GF-RGN-10',
];

const planDesarrolloSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'epd-01-1', number: 1, type: 'activity', label: 'Elaborar diagnósticos', cycle: 'P', activity: 'Elaborar diagnósticos para la formulación del Plan de Desarrollo.', responsible: 'Secretaría de Infraestructura y Planeación' },
  { id: 'epd-01-2', number: 2, type: 'activity', label: 'Conformar equipos de Trabajo', cycle: 'P', activity: 'Conformar equipo para coordinar la formulación del Plan de Desarrollo.', responsible: 'Secretaría de Infraestructura y Planeación' },
  { id: 'epd-01-3', number: 3, type: 'activity', label: 'Definir la metodología y el cronograma', cycle: 'P', activity: 'Definir la metodología y el cronograma según directrices del DNP.', responsible: 'Secretaría de Infraestructura y Planeación' },
  { id: 'epd-01-4', number: 4, type: 'activity', label: 'Analizar programa de Gobierno', cycle: 'P', activity: 'Analizar programa de Gobierno del Alcalde Electo.', responsible: 'Secretaría de Infraestructura y Planeación / Alcalde' },
  { id: 'epd-01-5', number: 5, type: 'activity', label: 'Asignar Responsabilidades', cycle: 'P', activity: 'Definir actores, equipos de trabajo y asignar responsabilidades.', responsible: 'Secretaría de Infraestructura y Planeación' },
  { id: 'epd-01-6', number: 6, type: 'activity', label: 'Priorizar Problemáticas', cycle: 'H', activity: 'Definir y priorizar los problemas a intervenir en el Plan de Desarrollo.', responsible: 'Secretaría de Infraestructura y Planeación' },
  { id: 'epd-01-7', number: 7, type: 'activity', label: 'Formular componentes estratégicos', cycle: 'H', activity: 'Formular el componente estratégico.', responsible: 'Secretaría de Infraestructura y Planeación / Equipo de Trabajo / Asesores' },
  { id: 'epd-01-8', number: 8, type: 'activity', label: 'Definir fuentes de financiación', cycle: 'H', activity: 'Definir fuentes de financiación.', responsible: 'Secretaría de Hacienda / Equipo de Trabajo' },
  { id: 'epd-01-9', number: 9, type: 'activity', label: 'Proyecto Plan de Desarrollo', cycle: 'H', activity: 'Consolidación del proyecto Plan de Desarrollo.', responsible: 'Secretaría de Infraestructura y Planeación / Equipo de Trabajo' },
  { id: 'epd-01-10', number: 10, type: 'activity', label: 'Aprobación del Proyecto del Plan de Desarrollo', cycle: 'H', activity: 'Aprobación del Proyecto del Plan de Desarrollo.', responsible: 'Consejo de Gobierno' },
  { id: 'epd-01-11', number: 11, type: 'activity', label: 'Presentación del Proyecto Plan de Desarrollo al Consejo Territorial de Planeación', cycle: 'V', activity: 'Presentación del Proyecto Plan de Desarrollo al Consejo Territorial de Planeación.', responsible: 'Alcalde / Secretaría de Infraestructura y Planeación' },
  { id: 'epd-01-12', number: 12, type: 'decision', label: 'Realizar ajustes al Proyecto Plan de Desarrollo', cycle: 'V', activity: 'Realizar ajustes al Proyecto Plan de Desarrollo.', responsible: 'Secretaría de Infraestructura y Planeación / Equipo', branches: [{ label: 'NO', targetStepId: 'epd-01-12' }, { label: 'SI', targetStepId: 'epd-01-13' }] },
  { id: 'epd-01-13', number: 13, type: 'activity', label: 'Presentar el Plan de Desarrollo', cycle: 'A', activity: 'Presentar el Plan de Desarrollo al Concejo Municipal.', responsible: 'Alcalde / Secretaría de Infraestructura y Planeación' },
  { id: 'epd-01-14', number: 14, type: 'activity', label: 'Divulgar el Plan de Desarrollo', cycle: 'A', activity: 'Divulgar el Plan de Desarrollo.', responsible: 'Alcalde / Secretaría de Infraestructura y Planeación / Comunicaciones' },
  { id: 'epd-01-15', number: 15, type: 'activity', label: 'Seguimiento al Plan de Desarrollo', cycle: 'A', activity: 'Seguimiento al Plan de Desarrollo.', responsible: 'Alcalde / Secretaría de Infraestructura y Planeación' },
  { id: 'fin', number: 16, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const poaiSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'poai-1', number: 1, type: 'activity', label: 'Remitir a la Secretaría de Infraestructura y Planeación el presupuesto de las inversiones a realizarse', cycle: 'P', activity: 'Remitir a la Secretaría de Infraestructura y Planeación el presupuesto de las inversiones a realizarse.', responsible: 'Jefe de Dependencia' },
  { id: 'poai-2', number: 2, type: 'activity', label: 'Incorporar la totalidad de los programas y subprogramas', cycle: 'P', activity: 'Incorporar la totalidad de los programas y subprogramas que ejecutará el Municipio en la respectiva vigencia fiscal.', responsible: 'Secretaría de Infraestructura y Planeación' },
  { id: 'poai-3', number: 3, type: 'activity', label: 'Recepcionar y verificar la información', cycle: 'H', activity: 'Recepcionar y verificar la información diligenciada en cada POAI.', responsible: 'Secretaría de Infraestructura y Planeación' },
  { id: 'poai-4', number: 4, type: 'activity', label: 'Definir y priorizar proyectos y fuentes de financiación', cycle: 'H', activity: 'Definir y priorizar proyectos y fuentes de financiación del POAI.', responsible: 'Secretaría de Infraestructura y Planeación' },
  { id: 'poai-5', number: 5, type: 'activity', label: 'Consolidar y estructurar el POAI', cycle: 'H', activity: 'Consolidar y estructurar el POAI.', responsible: 'Secretaría de Infraestructura y Planeación' },
  { id: 'poai-6', number: 6, type: 'activity', label: 'Convocar al Consejo de Gobierno', cycle: 'H', activity: 'Convocar al Consejo de Gobierno precedido por el Señor Alcalde para estudio del POAI.', responsible: 'Secretaría de Infraestructura y Planeación' },
  { id: 'poai-7', number: 7, type: 'decision', label: 'Revisión del Documento', cycle: 'V', activity: 'Revisión del documento por parte del Consejo de Gobierno, quien deberá aprobarlo y hacer las modificaciones correspondientes de conformidad con lo establecido en el Plan de Desarrollo Municipal.', responsible: 'Secretaría de Infraestructura y Planeación / Consejo de Gobierno', branches: [{ label: 'NO', targetStepId: 'poai-6', note: 'Regresa a convocatoria o ajustes para revisión.' }, { label: 'SI', targetStepId: 'poai-8' }] },
  { id: 'poai-8', number: 8, type: 'activity', label: 'Definir fuentes de financiación', cycle: 'A', activity: 'Expedir el respectivo Acto Administrativo oficializando el POAI.', responsible: 'Secretaría de Infraestructura y Planeación / Consejo de Gobierno' },
  { id: 'fin', number: 9, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const planAccionSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'apa-03-1',
    number: 1,
    type: 'activity',
    label: 'Emitir las directrices para la elaboración de Plan de Acción',
    cycle: 'P',
    activity: 'Emitir las directrices para la elaboración de Plan de Acción.',
    responsible: 'Jefes de Dependencia',
  },
  {
    id: 'apa-03-2',
    number: 2,
    type: 'activity',
    label: 'Registro del Plan de Acción por cada una de las Dependencias',
    cycle: 'H',
    activity: 'Registro del Plan de Acción por cada una de las Dependencias.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'apa-03-3',
    number: 3,
    type: 'activity',
    label: 'Consolidación y verificación de los planes de acción remitidos por las dependencias',
    cycle: 'V',
    activity: 'Consolidación y verificación de los planes de acción remitidos por las dependencias.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'apa-03-4',
    number: 4,
    type: 'decision',
    label: 'Presentación y aprobación del Plan de Acción',
    cycle: 'V',
    activity: 'Presentación y aprobación del Plan de Acción.',
    responsible: 'Secretaría de Infraestructura y Planeación / Alcalde',
    branches: [
      {
        label: 'NO',
        targetStepId: 'apa-03-3',
        note: 'Regresa a la consolidación y verificación de los planes de acción remitidos por las dependencias.',
      },
      {
        label: 'SI',
        targetStepId: 'apa-03-5',
        note: 'Continúa con la publicación del Plan de Acción en la página web de la Alcaldía.',
      },
    ],
  },
  {
    id: 'apa-03-5',
    number: 5,
    type: 'activity',
    label: 'Publicación Página Web',
    cycle: 'A',
    activity: 'Publicación del Plan de Acción en Página Web de la Alcaldía.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'fin',
    number: 6,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const atencionNecesidadesComunidadSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'anc-06-1',
    number: 1,
    type: 'activity',
    label: 'Generar lineamientos para la presentación de solicitudes verbal/escrita',
    cycle: 'P',
    activity:
      'Generar lineamientos para la presentación de solicitudes verbal/escrita.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'anc-06-2',
    number: 2,
    type: 'activity',
    label: 'Recibir la solicitud verbal/escrita',
    cycle: 'P',
    activity:
      'Recibir la solicitud verbal/escrita, por parte del usuario junto con los documentos requeridos para el trámite.',
    responsible: 'Usuario',
  },
  {
    id: 'anc-06-3',
    number: 3,
    type: 'activity',
    label: 'Radicar solicitud por parte del Usuario',
    cycle: 'H',
    activity: 'Radicar solicitud por parte del Usuario.',
    responsible: 'Usuario',
  },
  {
    id: 'anc-06-4',
    number: 4,
    type: 'activity',
    label: 'Analizar la viabilidad de la solicitud y la posible solución',
    cycle: 'V',
    activity: 'Analizar la viabilidad de la solicitud y la posible solución.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'anc-06-5',
    number: 5,
    type: 'activity',
    label: 'Programación de la solicitud según cronograma de actividades',
    cycle: 'V',
    activity:
      'Programación de la solicitud según cronograma de actividades.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'anc-06-6',
    number: 6,
    type: 'activity',
    label: 'Ejecutar el proceso según programación',
    cycle: 'A',
    activity: 'Ejecutar el proceso según programación.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'fin',
    number: 7,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const licenciaConstruccionSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'lc-07-1',
    number: 1,
    type: 'activity',
    label: 'Generar lineamientos para la presentación de solicitudes verbal/escrita',
    cycle: 'P',
    activity:
      'Generar lineamientos para la presentación de solicitudes verbal/escrita.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'lc-07-2',
    number: 2,
    type: 'activity',
    label: 'Solicitud verbal/escrita por parte de una persona natural/jurídica',
    cycle: 'H',
    activity:
      'Solicitud verbal/escrita por parte de una persona natural/jurídica propietaria del predio ante la Secretaría de Infraestructura y Planeación.',
    responsible: 'Usuario',
  },
  {
    id: 'lc-07-3',
    number: 3,
    type: 'activity',
    label: 'Recepción de solicitud y documento',
    cycle: 'H',
    activity:
      'Recepción de solicitud y documentos adjuntos para el proceso.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'lc-07-4',
    number: 4,
    type: 'decision',
    label: 'Verificar los documentos presentados',
    cycle: 'V',
    activity: 'Verificar los documentos presentados.',
    responsible: 'Secretaría de Infraestructura y Planeación',
    branches: [
      {
        label: 'NO',
        targetStepId: 'lc-07-3',
        note:
          'Regresa a la recepción de solicitud y documentos para completar o corregir la documentación presentada.',
      },
      {
        label: 'SI',
        targetStepId: 'lc-07-5',
        note:
          'Continúa con la liquidación de la Licencia de Construcción.',
      },
    ],
  },
  {
    id: 'lc-07-5',
    number: 5,
    type: 'activity',
    label: 'Liquidación de la Licencia de Construcción',
    cycle: 'V',
    activity: 'Liquidación de la Licencia de Construcción.',
    responsible: 'Secretaría de Hacienda',
  },
  {
    id: 'lc-07-6',
    number: 6,
    type: 'activity',
    label: 'Presentar comprobante de pago de la licencia',
    cycle: 'A',
    activity: 'Presentar comprobante de pago de la licencia.',
    responsible: 'Usuario',
  },
  {
    id: 'lc-07-7',
    number: 7,
    type: 'activity',
    label: 'Expedición de la Licencia de Construcción',
    cycle: 'A',
    activity: 'Expedición de la Licencia de Construcción.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'fin',
    number: 8,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const licenciaSubdivisionSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'ls-08-1',
    number: 1,
    type: 'activity',
    label: 'Generar lineamientos para la presentación de solicitudes verbal/escrita',
    cycle: 'P',
    activity:
      'Generar lineamientos para la presentación de solicitudes verbal/escrita.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'ls-08-2',
    number: 2,
    type: 'activity',
    label: 'Solicitud verbal/escrita por parte de una persona natural/jurídica',
    cycle: 'H',
    activity:
      'Solicitud verbal/escrita por parte de una persona natural/jurídica propietaria del predio ante la Secretaría de Infraestructura y Planeación.',
    responsible: 'Usuario',
  },
  {
    id: 'ls-08-3',
    number: 3,
    type: 'activity',
    label: 'Recepción de solicitud y documento',
    cycle: 'H',
    activity:
      'Recepción de solicitud y documentos adjuntos para el proceso.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'ls-08-4',
    number: 4,
    type: 'decision',
    label: 'Verificar los documentos presentados',
    cycle: 'V',
    activity: 'Verificar los documentos presentados.',
    responsible: 'Secretaría de Infraestructura y Planeación',
    branches: [
      {
        label: 'NO',
        targetStepId: 'ls-08-3',
        note:
          'Regresa a la recepción de solicitud y documentos para completar o corregir la documentación presentada.',
      },
      {
        label: 'SI',
        targetStepId: 'ls-08-5',
        note:
          'Continúa con la liquidación de la Licencia de Subdivisión.',
      },
    ],
  },
  {
    id: 'ls-08-5',
    number: 5,
    type: 'activity',
    label: 'Liquidación de la Licencia de Subdivisión',
    cycle: 'V',
    activity: 'Liquidación de la Licencia de Subdivisión.',
    responsible: 'Secretaría de Hacienda',
  },
  {
    id: 'ls-08-6',
    number: 6,
    type: 'activity',
    label: 'Presentar comprobante de pago de la licencia',
    cycle: 'A',
    activity: 'Presentar comprobante de pago de la licencia.',
    responsible: 'Usuario',
  },
  {
    id: 'ls-08-7',
    number: 7,
    type: 'activity',
    label: 'Expedición de la Licencia de Subdivisión',
    cycle: 'A',
    activity: 'Expedición de la Licencia de Subdivisión.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'fin',
    number: 8,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const certificadoEstratificacionSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'ce-09-1',
    number: 1,
    type: 'activity',
    label: 'Solicitud por escrito de certificado de estratificación',
    cycle: 'P',
    activity: 'Solicitud por escrito de certificado de estratificación.',
    responsible: 'Usuario',
  },
  {
    id: 'ce-09-2',
    number: 2,
    type: 'decision',
    label: 'Localización en la base de datos',
    cycle: 'V',
    activity:
      'Localización en la base de datos por número predial, cédula o identificación del predio.',
    responsible: 'Secretaría de Infraestructura y Planeación',
    branches: [
      {
        label: 'NO',
        targetStepId: 'ce-09-1',
        note:
          'No se localiza la información requerida; se debe revisar o complementar la solicitud.',
      },
      {
        label: 'SI',
        targetStepId: 'ce-09-3',
        note:
          'Se localiza la información y continúa el pago del valor estipulado para el trámite.',
      },
    ],
  },
  {
    id: 'ce-09-3',
    number: 3,
    type: 'activity',
    label: 'Pago en Secretaría de Hacienda el valor estipulado para este trámite',
    cycle: 'H',
    activity:
      'Pago en Secretaría de Hacienda el valor estipulado para este trámite.',
    responsible: 'Usuario',
  },
  {
    id: 'ce-09-4',
    number: 4,
    type: 'activity',
    label: 'Presentar comprobante de pago',
    cycle: 'A',
    activity:
      'Presentar comprobante de pago a la Secretaría de Infraestructura y Planeación.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'ce-09-5',
    number: 5,
    type: 'activity',
    label: 'Expedir la correspondiente certificación',
    cycle: 'A',
    activity: 'Expedir la correspondiente certificación.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'fin',
    number: 6,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const certificadoNomenclaturaSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'cn-10-1',
    number: 1,
    type: 'activity',
    label: 'Solicitud por escrito de certificado de nomenclatura',
    cycle: 'P',
    activity: 'Solicitud por escrito de certificado de nomenclatura.',
    responsible: 'Usuario',
  },
  {
    id: 'cn-10-2',
    number: 2,
    type: 'decision',
    label: 'Localización en la base de datos',
    cycle: 'H',
    activity:
      'Localización en la base de datos por número predial, cédula o identificación del predio.',
    responsible: 'Secretaría de Infraestructura y Planeación',
    branches: [
      {
        label: 'NO',
        targetStepId: 'cn-10-1',
        note:
          'No se localiza la información requerida; se debe revisar o complementar la solicitud.',
      },
      {
        label: 'SI',
        targetStepId: 'cn-10-3',
        note:
          'Se localiza la información y continúa el pago del valor estipulado para el trámite.',
      },
    ],
  },
  {
    id: 'cn-10-3',
    number: 3,
    type: 'activity',
    label: 'Pago en Secretaría de Hacienda el valor estipulado para este trámite',
    cycle: 'V',
    activity:
      'Pago en Secretaría de Hacienda el valor estipulado para este trámite.',
    responsible: 'Usuario',
  },
  {
    id: 'cn-10-4',
    number: 4,
    type: 'activity',
    label: 'Presentar comprobante de pago',
    cycle: 'A',
    activity:
      'Presentar comprobante de pago a la Secretaría de Infraestructura y Planeación.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'cn-10-5',
    number: 5,
    type: 'activity',
    label: 'Expedir la correspondiente certificación',
    cycle: 'A',
    activity: 'Expedir la correspondiente certificación.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'fin',
    number: 6,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const certificadoUsoSueloSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'cus-11-1',
    number: 1,
    type: 'activity',
    label: 'Solicitud por escrito de certificado de uso del suelo',
    cycle: 'P',
    activity:
      'Solicitud por escrito, adjuntando documentos requeridos para el procedimiento.',
    responsible: 'Usuario',
  },
  {
    id: 'cus-11-2',
    number: 2,
    type: 'activity',
    label: 'Pagar en Secretaría de Hacienda el valor estipulado',
    cycle: 'P',
    activity:
      'Pagar en Secretaría de Hacienda el valor estipulado para este trámite por cada certificado Uso de Suelo.',
    responsible: 'Usuario',
  },
  {
    id: 'cus-11-3',
    number: 3,
    type: 'decision',
    label: 'Análisis del predial del inmueble',
    cycle: 'H',
    activity: 'Análisis del predial del inmueble.',
    responsible: 'Secretaría de Infraestructura y Planeación',
    branches: [
      {
        label: 'NO',
        targetStepId: 'cus-11-2',
        note:
          'No cumple o no se valida la información predial; retorna al paso de pago/revisión previa según el flujo del manual.',
      },
      {
        label: 'SI',
        targetStepId: 'cus-11-4',
        note:
          'Continúa con el análisis cartográfico del predio.',
      },
    ],
  },
  {
    id: 'cus-11-4',
    number: 4,
    type: 'decision',
    label: 'Análisis cartográfico',
    cycle: 'H',
    activity:
      'Análisis cartográfico teniendo en cuenta la georreferenciación del predio en estudio.',
    responsible: 'Secretaría de Infraestructura y Planeación',
    branches: [
      {
        label: 'NO',
        targetStepId: 'cus-11-3',
        note:
          'No se valida el análisis cartográfico; retorna al análisis predial del inmueble.',
      },
      {
        label: 'SI',
        targetStepId: 'cus-11-5',
        note:
          'Continúa con la presentación del comprobante de pago y la verificación correspondiente.',
      },
    ],
  },
  {
    id: 'cus-11-5',
    number: 5,
    type: 'activity',
    label: 'Presentar comprobante de pago',
    cycle: 'V',
    activity:
      'Se realiza la verificación correspondiente de acuerdo al predio.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'cus-11-6',
    number: 6,
    type: 'activity',
    label: 'Expedir la correspondiente certificación',
    cycle: 'A',
    activity: 'Se expide la correspondiente certificación.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'fin',
    number: 7,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const demarcacionSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'dn-12-1',
    number: 1,
    type: 'activity',
    label: 'Solicitud por escrito de demarcación',
    cycle: 'P',
    activity:
      'Solicitud por escrito, adjuntando documentos requeridos para el procedimiento.',
    responsible: 'Usuario',
  },
  {
    id: 'dn-12-2',
    number: 2,
    type: 'activity',
    label: 'Brindar la información correcta',
    cycle: 'P',
    activity:
      'Brindar la información correcta y completa sobre los trámites y documentos que requiere la prestación el servicio.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'dn-12-3',
    number: 3,
    type: 'decision',
    label: 'Verificación de información y documentos',
    cycle: 'V',
    activity: 'Confrontación y verificación de información y documentos.',
    responsible: 'Secretaría de Infraestructura y Planeación',
    branches: [
      {
        label: 'NO',
        targetStepId: 'dn-12-2',
        note:
          'La información o los documentos no son correctos; retorna para brindar o completar la información requerida.',
      },
      {
        label: 'SI',
        targetStepId: 'dn-12-4',
        note:
          'La información y documentos son correctos; continúa la radicación de la solicitud.',
      },
    ],
  },
  {
    id: 'dn-12-4',
    number: 4,
    type: 'activity',
    label: 'Radicar la solicitud',
    cycle: 'V',
    activity: 'Radicación de la solicitud.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'dn-12-5',
    number: 5,
    type: 'activity',
    label: 'Programación de visita en el predio',
    cycle: 'H',
    activity: 'Programación de visita en el predio.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'dn-12-6',
    number: 6,
    type: 'activity',
    label: 'Inspección ocular',
    cycle: 'H',
    activity: 'Inspección ocular, verificando la información física.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'dn-12-7',
    number: 7,
    type: 'activity',
    label: 'Realizar acta de visita',
    cycle: 'H',
    activity:
      'Realizar acta de visita y se firma por los intervinientes. Se anexa registro fotográfico.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'dn-12-8',
    number: 8,
    type: 'activity',
    label: 'Expedir la correspondiente certificación',
    cycle: 'H',
    activity:
      'Elaborar el proyecto de concepto con base en la información levantada en la inspección ocular.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'dn-12-9',
    number: 9,
    type: 'activity',
    label: 'Entregar el documento al usuario',
    cycle: 'A',
    activity:
      'Entregar el documento al usuario de acuerdo a la solicitud realizada.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'dn-12-10',
    number: 10,
    type: 'activity',
    label: 'Archivar',
    cycle: 'A',
    activity: 'Archivar.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'fin',
    number: 11,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const certificadoResidenciaSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'ecr-13-1',
    number: 1,
    type: 'activity',
    label: 'Solicitud por escrito de certificado de residencia',
    cycle: 'P',
    activity: 'Solicitud por escrito de certificado de residencia.',
    responsible: 'Usuario',
  },
  {
    id: 'ecr-13-2',
    number: 2,
    type: 'activity',
    label: 'Entrega de documentos pertinentes',
    cycle: 'P',
    activity: 'Entrega de documentos pertinentes para la solicitud.',
    responsible: 'Usuario',
  },
  {
    id: 'ecr-13-3',
    number: 3,
    type: 'decision',
    label: 'Verificación de documentos',
    cycle: 'V',
    activity:
      'Verificación correspondiente a los documentos allegados.',
    responsible: 'Secretaría de Infraestructura y Planeación',
    branches: [
      {
        label: 'NO',
        targetStepId: 'ecr-13-2',
        note:
          'La documentación no cumple; retorna a la entrega de documentos pertinentes.',
      },
      {
        label: 'SI',
        targetStepId: 'ecr-13-4',
        note:
          'La documentación cumple; continúa con el pago en Secretaría de Hacienda.',
      },
    ],
  },
  {
    id: 'ecr-13-4',
    number: 4,
    type: 'activity',
    label: 'Pago en Secretaría de Hacienda el valor estipulado para este trámite',
    cycle: 'H',
    activity:
      'Pago en Secretaría de Hacienda del valor estipulado para este trámite.',
    responsible: 'Usuario',
  },
  {
    id: 'ecr-13-5',
    number: 5,
    type: 'activity',
    label: 'Presentar comprobante de pago',
    cycle: 'A',
    activity:
      'Presentar comprobante de pago a la Secretaría de Infraestructura y Planeación.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'ecr-13-6',
    number: 6,
    type: 'activity',
    label: 'Expedir la correspondiente certificación',
    cycle: 'A',
    activity: 'Expedir la correspondiente certificación.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'fin',
    number: 7,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const suspensionObraSancionesSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'sois-14-1',
    number: 1,
    type: 'activity',
    label: 'Solicitud por escrito de suspensión de obra e imposición de sanciones',
    cycle: 'P',
    activity:
      'Solicitud por escrito de suspensión de obra e imposición de sanciones.',
    responsible: 'Usuario',
  },
  {
    id: 'sois-14-2',
    number: 2,
    type: 'activity',
    label: 'Entrega de documentos pertinentes para la solicitud',
    cycle: 'P',
    activity: 'Entrega de documentos pertinentes para la solicitud.',
    responsible: 'Usuario',
  },
  {
    id: 'sois-14-3',
    number: 3,
    type: 'decision',
    label: 'Verificación de documentos',
    cycle: 'V',
    activity:
      'Verificación correspondiente a los documentos allegados.',
    responsible: 'Secretaría de Infraestructura y Planeación',
    branches: [
      {
        label: 'NO',
        targetStepId: 'fin',
        note:
          'La documentación no cumple o no procede; finaliza el flujo según la trayectoria visual del manual.',
      },
      {
        label: 'SI',
        targetStepId: 'sois-14-4',
        note:
          'La documentación cumple; continúa con el pago en Secretaría de Hacienda.',
      },
    ],
  },
  {
    id: 'sois-14-4',
    number: 4,
    type: 'activity',
    label: 'Pago en Secretaría de Hacienda el valor estipulado para este trámite',
    cycle: 'H',
    activity:
      'Pago en Secretaría de Hacienda del valor estipulado para este trámite.',
    responsible: 'Usuario',
  },
  {
    id: 'sois-14-5',
    number: 5,
    type: 'activity',
    label: 'Presentar comprobante de pago',
    cycle: 'A',
    activity:
      'Presentar comprobante de pago a la Secretaría de Infraestructura y Planeación.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'sois-14-6',
    number: 6,
    type: 'activity',
    label: 'Expedir la correspondiente certificación',
    cycle: 'A',
    activity: 'Expedir la correspondiente certificación.',
    responsible: 'Secretaría de Infraestructura y Planeación',
  },
  {
    id: 'fin',
    number: 7,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const comiteJusticiaTransicionalSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'cjt-01-1', number: 1, type: 'activity', label: 'Realizar invitación por parte del Comité Municipal Justicia Transicional y Subcomités', cycle: 'P', activity: 'Realizar invitación por parte del Comité Municipal Justicia Transicional y Subcomités.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'cjt-01-2', number: 2, type: 'activity', label: 'Ejecutar Comité Municipal Justicia Transicional y Subcomités', cycle: 'H', activity: 'Ejecutar Comité Municipal Justicia Transicional y Subcomités.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'cjt-01-3', number: 3, type: 'document', label: 'Elaborar Acta de Reunión Comité', cycle: 'V', activity: 'Elaborar Acta de Reunión Comité Municipal Justicia Transicional y Subcomités.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'fin', number: 4, type: 'end', label: 'FIN', cycle: 'A', activity: 'Fin del procedimiento', responsible: '' },
];

const proyectosProductivosSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'pp-02-1', number: 1, type: 'activity', label: 'Presentar y aprobar el plan de acción', cycle: 'P', activity: 'Presentar y aprobar el plan de acción.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'pp-02-2', number: 2, type: 'activity', label: 'Realizar Subcomité de Reparación Integral', cycle: 'H', activity: 'Realizar Subcomité de Reparación Integral.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'pp-02-3', number: 3, type: 'activity', label: 'Convocar e inscribir', cycle: 'V', activity: 'Convocar e inscribir.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'pp-02-4', number: 4, type: 'activity', label: 'Publicar seleccionados', cycle: 'A', activity: 'Publicar seleccionados.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'pp-02-5', number: 5, type: 'document', label: 'Entregar', cycle: 'A', activity: 'Entregar.', responsible: 'Operador' },
  { id: 'fin', number: 6, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const subsidioArrendamientoTemporalSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'saa-03-1', number: 1, type: 'activity', label: 'Radicar solicitud', cycle: 'P', activity: 'Radicar solicitud.', responsible: 'Usuario' },
  { id: 'saa-03-2', number: 2, type: 'activity', label: 'Verificar requisitos', cycle: 'P', activity: 'Verificar requisitos.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'saa-03-3', number: 3, type: 'activity', label: 'Realizar visita domiciliaria', cycle: 'H', activity: 'Realizar visita domiciliaria.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'saa-03-4', number: 4, type: 'document', label: 'Solicitar Acto Administrativo', cycle: 'H', activity: 'Solicitar Acto Administrativo.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'saa-03-5', number: 5, type: 'document', label: 'Numerar y publicar Acto Administrativo', cycle: 'H', activity: 'Numerar y publicar Acto Administrativo.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'saa-03-6', number: 6, type: 'activity', label: 'Solicitar RP', cycle: 'H', activity: 'Solicitar RP.', responsible: 'Secretaría de Hacienda' },
  { id: 'saa-03-7', number: 7, type: 'document', label: 'Pagar subsidio de auxilio de arrendamiento temporal', cycle: 'V', activity: 'Pagar subsidio de un auxilio de arrendamiento temporal por única vez.', responsible: 'Tesorería' },
  { id: 'fin', number: 8, type: 'end', label: 'FIN', cycle: 'A', activity: 'Fin del procedimiento', responsible: '' },
];

const asistenciaFunerariaSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'af-04-1', number: 1, type: 'activity', label: 'Radicar solicitud', cycle: 'P', activity: 'Radicar solicitud.', responsible: 'Solicitante' },
  { id: 'af-04-2', number: 2, type: 'activity', label: 'Verificar requisitos', cycle: 'P', activity: 'Verificar requisitos.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'af-04-3', number: 3, type: 'document', label: 'Elaborar Acto Administrativo', cycle: 'H', activity: 'Elaborar Acto Administrativo.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'af-04-4', number: 4, type: 'activity', label: 'Solicitud de RP', cycle: 'H', activity: 'Solicitud de RP.', responsible: 'Secretaría de Hacienda' },
  { id: 'af-04-5', number: 5, type: 'document', label: 'Pago de Asistencia Funeraria', cycle: 'V', activity: 'Pago de Asistencia Funeraria.', responsible: 'Secretaría de Hacienda' },
  { id: 'fin', number: 6, type: 'end', label: 'FIN', cycle: 'A', activity: 'Fin del procedimiento', responsible: '' },
];

const ayudaHumanitariaInmediataSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'ahi-05-1', number: 1, type: 'activity', label: 'Radicar la declaración', cycle: 'P', activity: 'Radicar la declaración que el tiempo no exceda el término de tres (3) meses.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'ahi-05-2', number: 2, type: 'activity', label: 'Verificar requisitos', cycle: 'P', activity: 'Verificar requisitos consultando en la herramienta del Ministerio del Interior y establecer comunicación con el declarante para conocer en detalle su situación.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'ahi-05-3', number: 3, type: 'activity', label: 'Solicitar información y ofrecer la oferta institucional', cycle: 'H', activity: 'Solicitar información y ofrecer la oferta institucional.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'ahi-05-4', number: 4, type: 'activity', label: 'Entregar Ayuda Humanitaria Inmediata', cycle: 'H', activity: 'Entregar Ayuda Humanitaria Inmediata.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'ahi-05-5', number: 5, type: 'document', label: 'Respuesta a la solicitud realizada por el Ministerio Público', cycle: 'V', activity: 'Respuesta a la solicitud realizada por el Ministerio Público.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'fin', number: 6, type: 'end', label: 'FIN', cycle: 'A', activity: 'Fin del procedimiento', responsible: '' },
];

const atencionOrientacionPoblacionVictimaSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'aop-06-1', number: 1, type: 'activity', label: 'Atención y orientación a la víctima', cycle: 'P', activity: 'Atención y orientación a la víctima.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'aop-06-2', number: 2, type: 'activity', label: 'Seguimiento a la respuesta', cycle: 'V', activity: 'Seguimiento a la respuesta.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'fin', number: 3, type: 'end', label: 'FIN', cycle: 'A', activity: 'Fin del procedimiento', responsible: '' },
];

const comiteEmpleoSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'ce-07-1', number: 1, type: 'activity', label: 'Convocar a los miembros del Comité', cycle: 'P', activity: 'Convocar a los miembros del Comité.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'ce-07-2', number: 2, type: 'activity', label: 'Socializar políticas, programas y acciones', cycle: 'H', activity: 'Socializar las políticas, programas y acciones de cada uno de los miembros.', responsible: 'Comité' },
  { id: 'ce-07-3', number: 3, type: 'activity', label: 'Atender compromisos y responsabilidades', cycle: 'H', activity: 'Atender los compromisos y/o responsabilidades de cada uno de los miembros del Comité.', responsible: 'Comité' },
  { id: 'ce-07-4', number: 4, type: 'activity', label: 'Realizar seguimiento a compromisos y actividades', cycle: 'V', activity: 'Realizar seguimiento a los compromisos y actividades plasmados en el Comité.', responsible: 'Comité' },
  { id: 'fin', number: 5, type: 'end', label: 'FIN', cycle: 'A', activity: 'Fin del procedimiento', responsible: '' },
];

const rutaProductividadSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'rp-08-1', number: 1, type: 'activity', label: 'Caracterizar el sector productivo del Municipio', cycle: 'P', activity: 'Caracterizar el sector productivo del Municipio: fortalecimiento y emprendimiento.', responsible: 'Secretaría de Desarrollo Económico' },
  { id: 'rp-08-2', number: 2, type: 'activity', label: 'Realizar jornadas de socialización', cycle: 'P', activity: 'Realizar jornadas de socialización de programas de fortalecimiento y/o emprendimiento en los barrios del Municipio, dando a conocer los requisitos de cada uno.', responsible: 'Secretaría de Desarrollo Económico' },
  { id: 'rp-08-3', number: 3, type: 'activity', label: 'Realizar inscripción y diligenciamiento de formatos', cycle: 'H', activity: 'Realizar la inscripción y/o diligenciamiento de formatos para acceder a los programas de fortalecimiento y/o emprendimiento.', responsible: 'Secretaría de Desarrollo Económico' },
  { id: 'rp-08-4', number: 4, type: 'activity', label: 'Visitar postulados', cycle: 'H', activity: 'Visitar a cada uno de los postulados para verificar la información suministrada en el formato de inscripción y conocer la necesidad real.', responsible: 'Secretaría de Desarrollo Económico' },
  { id: 'rp-08-5', number: 5, type: 'activity', label: 'Capacitar postulados', cycle: 'H', activity: 'Capacitar a los postulados en temas empresariales, fortalecimiento empresarial, elaboración de plan de negocios, atención al cliente, entre otros.', responsible: 'Secretaría de Desarrollo Económico' },
  { id: 'rp-08-6', number: 6, type: 'activity', label: 'Aprobar planes de negocio', cycle: 'H', activity: 'Aprobar los planes de negocio que cumplen con los requisitos establecidos y que presentan una necesidad real para recibir apoyo.', responsible: 'Secretaría de Desarrollo Económico' },
  { id: 'rp-08-7', number: 7, type: 'activity', label: 'Entregar maquinaria, insumos y/o créditos', cycle: 'V', activity: 'Entregar maquinaria, insumos y/o créditos al empresario y/o emprendedor.', responsible: 'Secretaría de Desarrollo Económico' },
  { id: 'rp-08-8', number: 8, type: 'document', label: 'Realizar seguimiento a las entregas', cycle: 'A', activity: 'Realizar seguimiento a las entregas realizadas para verificar el buen uso de las mismas.', responsible: 'Secretaría de Desarrollo Económico' },
  { id: 'fin', number: 9, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const caracterizacionPoblacionMinoritariaSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'cp-09-1', number: 1, type: 'activity', label: 'Realizar trabajo de campo', cycle: 'P', activity: 'Realizar trabajo de campo para identificar si pertenece a alguna minoría y establecer el formato a utilizar para la caracterización.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'cp-09-2', number: 2, type: 'activity', label: 'Tomar datos para formatos de caracterización', cycle: 'H', activity: 'Tomar datos para ser consignados en los formatos de caracterización de acuerdo con la minoría a la que pertenezca.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'cp-09-3', number: 3, type: 'software', label: 'Ingresar información en base de datos', cycle: 'V', activity: 'Ingresar en la respectiva base de datos la información contenida en los formatos de caracterización.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'fin', number: 4, type: 'end', label: 'FIN', cycle: 'A', activity: 'Fin del procedimiento', responsible: '' },
];

const atencionComunidadSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'ac-10-1', number: 1, type: 'activity', label: 'Atender necesidades y requerimientos', cycle: 'P', activity: 'Atender las necesidades y requerimientos de la ciudadanía que hacen parte de la población minoritaria.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'ac-10-2', number: 2, type: 'activity', label: 'Brindar respuesta o solución', cycle: 'H', activity: 'Brindar respuesta o solución a lo requerido por la persona y ofrecer solución conforme a la oferta institucional.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'ac-10-3', number: 3, type: 'activity', label: 'Realizar seguimiento a la respuesta o solución', cycle: 'V', activity: 'Realizar seguimiento a la respuesta o solución brindada a la ciudadanía, en caso de que así se requiera.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'fin', number: 4, type: 'end', label: 'FIN', cycle: 'A', activity: 'Fin del procedimiento', responsible: '' },
];

const eventosComunitariosSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'ec-11-1', number: 1, type: 'activity', label: 'Definir necesidades y programar eventos', cycle: 'P', activity: 'Definir las necesidades de las diferentes poblaciones y programar los eventos que se van a realizar con sus beneficiarios.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'ec-11-2', number: 2, type: 'activity', label: 'Realizar convocatoria de asistencia', cycle: 'H', activity: 'Realizar la convocatoria de asistencia a los eventos programados.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'ec-11-3', number: 3, type: 'activity', label: 'Realizar cronograma logístico', cycle: 'V', activity: 'Realizar el cronograma logístico de actividades, incluyendo conferencistas, animadores, artistas, sonido, mesas, tablones, sillas, lugar, música, recreación, premiación e incentivos.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'ec-11-4', number: 4, type: 'activity', label: 'Disponer refrigerios y/o almuerzos', cycle: 'V', activity: 'Disponer de refrigerios y/o almuerzos; elegir la persona que los elaborará y el menú ofrecido.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'ec-11-5', number: 5, type: 'activity', label: 'Realizar el evento conforme a lo planeado', cycle: 'A', activity: 'Realizar el evento conforme a lo planeado.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'fin', number: 6, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const seguimientoPoliticaPublicaJovenesSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'spp-12-1', number: 1, type: 'activity', label: 'Elaborar resolución para aprobación de la política pública', cycle: 'P', activity: 'Elaborar una resolución por la cual el señor Alcalde firma la solicitud al Honorable Concejo Municipal para aprobación de la política pública de juventudes.', responsible: 'Alcalde' },
  { id: 'spp-12-2', number: 2, type: 'activity', label: 'Comisión del Concejo Municipal', cycle: 'P', activity: 'Comisión por parte del Honorable Concejo Municipal para debate y plenaria de aprobación de la política pública de juventudes.', responsible: 'Concejo Municipal' },
  { id: 'spp-12-3', number: 3, type: 'activity', label: 'Convocatoria a medios de comunicación', cycle: 'H', activity: 'Convocatoria a medios de comunicación para difusión de la implementación de la Política Pública de Jóvenes.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'spp-12-4', number: 4, type: 'activity', label: 'Difundir la política pública juvenil', cycle: 'H', activity: 'Difundir en instituciones escolares, universidades, barrios, veredas, parques, canchas y demás lugares donde se aglomere la población juvenil.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'spp-12-5', number: 5, type: 'activity', label: 'Implementar la política en la población joven', cycle: 'H', activity: 'Implementar la política a la población joven en los diferentes ejes estratégicos establecidos dentro del proyecto de acuerdo.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'spp-12-6', number: 6, type: 'activity', label: 'Solicitar avances y cumplimiento', cycle: 'V', activity: 'Solicitar avance y cumplimiento de las actividades realizadas por cada dependencia administrativa que realice procesos con población joven.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'spp-12-7', number: 7, type: 'activity', label: 'Realizar análisis diagnóstico', cycle: 'A', activity: 'Realizar análisis diagnóstico de las estrategias implementadas de la política pública por los jóvenes de Gachetá, midiendo el impacto generado y los beneficios.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'fin', number: 8, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const voluntariadoJuvenilSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'vj-13-1', number: 1, type: 'activity', label: 'Buscar programas de voluntariado', cycle: 'P', activity: 'Buscar en documentos y páginas web programas de voluntariado desarrollados a nivel nacional e internacional, tomar iniciativas exitosas y replicarlas.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'vj-13-2', number: 2, type: 'activity', label: 'Crear proyecto de voluntariado juvenil', cycle: 'H', activity: 'Mediante un grupo interdisciplinar de la Dirección de Juventudes, crear el proyecto de voluntariado juvenil de Gachetá y las líneas de acción necesarias.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'vj-13-3', number: 3, type: 'activity', label: 'Realizar convocatoria abierta', cycle: 'H', activity: 'Realizar convocatoria abierta para jóvenes entre 18 y 35 años mediante medios físicos, de comunicación, redes sociales y plataformas digitales.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'vj-13-4', number: 4, type: 'activity', label: 'Apertura del voluntariado', cycle: 'H', activity: 'Realizar apertura del voluntariado mediante evento cerrado donde se muestra el proyecto, objetivos, niveles, lema y nombre.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'vj-13-5', number: 5, type: 'activity', label: 'Definir cronograma de trabajo', cycle: 'H', activity: 'Definir el cronograma de trabajo, compromisos y acuerdos para la estrategia.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'vj-13-6', number: 6, type: 'activity', label: 'Dividir voluntarios en grupos y formar', cycle: 'H', activity: 'Dividir los voluntarios en grupos según componentes y citarlos dos veces por semana durante dos meses para formación mediante talleres e iniciativas.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'vj-13-7', number: 7, type: 'activity', label: 'Ejecutar plan de acción con voluntarios', cycle: 'H', activity: 'Ejecutar el plan de acción planteado con los voluntarios.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'vj-13-8', number: 8, type: 'activity', label: 'Evaluar actividades del voluntariado', cycle: 'V', activity: 'Evaluar cada actividad que se desarrolle dentro del voluntariado y las finalidades de cada una.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'fin', number: 9, type: 'end', label: 'FIN', cycle: 'A', activity: 'Fin del procedimiento', responsible: '' },
];

const forosCongresosSeminariosSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'fcs-14-1', number: 1, type: 'activity', label: 'Definir tema, grupo interdisciplinar y ponentes', cycle: 'P', activity: 'Definir el tema a tratar seleccionando un grupo interdisciplinar, los ponentes y demás actividades que se vayan a presentar.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'fcs-14-2', number: 2, type: 'activity', label: 'Realizar convocatoria', cycle: 'H', activity: 'Realizar convocatoria de panelistas, invitados especiales e inscripciones por parte de la juventud.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'fcs-14-3', number: 3, type: 'activity', label: 'Organizar logística del evento', cycle: 'V', activity: 'Organizar cada evento: escenario, sonido, personal, logística de ingreso, horario de panelistas, orden de sala, limpieza y planes de contingencia.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'fcs-14-4', number: 4, type: 'activity', label: 'Presentar ponencias y resolver preguntas', cycle: 'V', activity: 'Presentar ponencias, discusión, preguntas y respuestas a los jóvenes inscritos dentro de la convocatoria.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'fcs-14-5', number: 5, type: 'activity', label: 'Desarrollar ponencias según agenda', cycle: 'A', activity: 'Con la llegada de los participantes, iniciar el evento y desarrollar cada ponencia con tiempos definidos y espacio para preguntas.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'fcs-14-6', number: 6, type: 'document', label: 'Realizar encuesta y retroalimentación', cycle: 'A', activity: 'Mediante encuesta virtual o física, preguntar a la comunidad sobre los temas tratados, presentadores y organización del evento para analizar oportunidades de mejora.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'fin', number: 7, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const encuentrosJuvenilesSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'dej-15-1', number: 1, type: 'activity', label: 'Realizar mesa de trabajo', cycle: 'P', activity: 'Realizar mesa de trabajo con líderes de la plataforma de juventudes para desarrollar cronograma, componentes y tema del encuentro.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'dej-15-2', number: 2, type: 'activity', label: 'Realizar proceso de convocatoria', cycle: 'H', activity: 'Realizar proceso de convocatoria, definir parámetros de participación, momentos de presentación y temáticas a abordar.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'dej-15-3', number: 3, type: 'activity', label: 'Desarrollar el evento', cycle: 'H', activity: 'Desarrollar el evento conforme al cronograma de ejecución del encuentro.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'dej-15-4', number: 4, type: 'activity', label: 'Entregar incentivos', cycle: 'H', activity: 'Entregar incentivos a los jóvenes que se destaquen dentro del desarrollo del encuentro.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'dej-15-5', number: 5, type: 'document', label: 'Realizar retroalimentación', cycle: 'V', activity: 'Realizar retroalimentación con los miembros de la plataforma y participantes del evento para analizar fortalezas y oportunidades de mejora.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'fin', number: 6, type: 'end', label: 'FIN', cycle: 'A', activity: 'Fin del procedimiento', responsible: '' },
];

const inscripcionCursosProgramasSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'icp-16-1', number: 1, type: 'activity', label: 'Solicitar oferta a entidades educativas', cycle: 'P', activity: 'Solicitar a las entidades educativas los cursos o programas a inscribir dentro del municipio y los docentes disponibles.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'icp-16-2', number: 2, type: 'activity', label: 'Publicar oferta de cursos', cycle: 'H', activity: 'Publicar en diferentes lugares la oferta SENA, tanto impresa como virtual, con fechas, lugar, docente y requisitos.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'icp-16-3', number: 3, type: 'activity', label: 'Convocatoria e inscripciones', cycle: 'H', activity: 'Realizar convocatoria e inscripciones de aspirantes a cursos complementarios conforme a la oferta divulgada.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'icp-16-6', number: 6, type: 'activity', label: 'Apertura del curso e inducción', cycle: 'V', activity: 'Realizar la apertura del curso en cada salón comunal previsto y la inducción por parte del docente.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'icp-16-7', number: 7, type: 'document', label: 'Retroalimentación del programa', cycle: 'A', activity: 'Al finalizar cada programa, realizar retroalimentación con docente y estudiantes para analizar pros, contras y nuevos cursos a ofertar.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'fin', number: 8, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const novedadesSifaSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'sifa-17-1', number: 1, type: 'activity', label: 'Recepcionar documento de identidad', cycle: 'P', activity: 'Recepcionar el documento de identidad en original para el inicio del trámite.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'sifa-17-2', number: 2, type: 'activity', label: 'Verificar requisitos en SIFA', cycle: 'H', activity: 'Realizar la verificación de los requisitos del usuario para acceder al programa con el número de identificación dentro de la plataforma SIFA.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'sifa-17-3', number: 3, type: 'software', label: 'Realizar novedad requerida', cycle: 'A', activity: 'Realizar la novedad requerida por el usuario en la plataforma SIFA con los soportes legibles.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'sifa-17-4', number: 4, type: 'software', label: 'Escanear y subir soportes', cycle: 'A', activity: 'Escanear los soportes allegados por el usuario, unirlos en una sola imagen y subirlos a la plataforma SIFA con peso menor a 512 kb.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'sifa-17-5', number: 5, type: 'activity', label: 'Aceptar actualización', cycle: 'A', activity: 'Aceptar la actualización; el usuario debe esperar un término de dos meses.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'sifa-17-6', number: 6, type: 'activity', label: 'Informar rechazo de actualización', cycle: 'A', activity: 'Informar sobre el rechazo de actualización.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'fin', number: 7, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const retiradosFamiliasAccionSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'rpf-18-1', number: 1, type: 'activity', label: 'Buscar población en proceso de retirados', cycle: 'P', activity: 'Se hace la búsqueda de la población al proceso de retirados para notificarlos.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'rpf-18-2', number: 2, type: 'activity', label: 'Notificar en cartelera lista de retirados', cycle: 'H', activity: 'Notificar en cartelera la lista de retirados.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'rpf-18-3', number: 3, type: 'activity', label: 'Realizar notificación personal y por aviso', cycle: 'H', activity: 'Realizar notificación personal y por aviso a través de los medios de comunicación.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'rpf-18-4', number: 4, type: 'activity', label: 'Determinar tiempo del proceso requerido por DPS', cycle: 'H', activity: 'Determinar el tiempo que se le da al proceso requerido por DPS.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'rpf-18-5', number: 5, type: 'software', label: 'Cargar información en Drive', cycle: 'H', activity: 'Cargar la información en el sistema Drive como lo solicite el DPS, subsanando las novedades.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'rpf-18-6', number: 6, type: 'activity', label: 'Proceder al retiro del sistema', cycle: 'V', activity: 'Proceder al retiro del sistema del usuario por no presentarse a subsanar las novedades, perdiendo el beneficio.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'fin', number: 7, type: 'end', label: 'FIN', cycle: 'A', activity: 'Fin del procedimiento', responsible: '' },
];

const bienestarComunitarioFamiliasAccionSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'bcf-19-1', number: 1, type: 'activity', label: 'Citar titulares del programa', cycle: 'P', activity: 'Citar a los titulares del programa en un lugar específico para llevar a cabo la reunión.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'bcf-19-2', number: 2, type: 'activity', label: 'Buscar entidad que brinda asesoría', cycle: 'H', activity: 'Buscar la entidad que brinda asesoría para atender la solicitud de la madre líder del sector.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'bcf-19-3', number: 3, type: 'activity', label: 'Orientar usuarios de Familias en Acción', cycle: 'V', activity: 'Orientar a los usuarios de Familias en Acción sobre los requerimientos del DPS y resolver inquietudes.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'bcf-19-4', number: 4, type: 'activity', label: 'Desarrollar dinámicas con usuarios', cycle: 'A', activity: 'Buscar dinámicas para desarrollarlas con usuarios, realizar actividad de integración, refrigerio y cierre.', responsible: 'Secretaría de Desarrollo Social' },
  { id: 'fin', number: 5, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const revisionCuentasContratistasSocialSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'rcc-20-1', number: 1, type: 'activity', label: 'Recepcionar documentos de contratistas', cycle: 'P', activity: 'Recepcionar documentos presentados por los contratistas que prestan sus servicios en la Alcaldía Municipal de Gachetá.', responsible: 'Secretaría de Hacienda' },
  { id: 'rcc-20-2', number: 2, type: 'activity', label: 'Revisar informes y documentos anexos', cycle: 'H', activity: 'Revisar que los informes de actividades y documentos anexos cumplan con los requisitos exigidos por la unidad asesora de proyectos para dar visto bueno al trámite de orden de pago.', responsible: 'Secretaría de Hacienda' },
  { id: 'rcc-20-3', number: 3, type: 'activity', label: 'Aprobar y firmar la cuenta de cobro', cycle: 'A', activity: 'Aprobar y firmar la cuenta de cobro.', responsible: 'Secretaría de Hacienda' },
  { id: 'fin', number: 4, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const revisionAprobacionRespuestaRequerimientosSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'rar-21-1',
    number: 1,
    type: 'activity',
    label: 'Recibir documentos para revisión, aprobación o respuesta',
    cycle: 'P',
    activity: 'Recibir documentos para revisión, aprobación o respuesta.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'rar-21-2',
    number: 2,
    type: 'activity',
    label: 'Entregar documentación para proyección y respuesta',
    cycle: 'H',
    activity:
      'Entregar documentación para proyección y respuesta a la solicitud radicada por solicitante.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'rar-21-3',
    number: 3,
    type: 'activity',
    label: 'Recopilar información necesaria para la contestación',
    cycle: 'H',
    activity:
      'Recopilar información necesaria para la contestación y, en caso de requerirse concepto técnico, acudir a la dependencia competente para brindar respuesta eficaz y oportuna a la solicitud.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'rar-21-4',
    number: 4,
    type: 'activity',
    label: 'Remitir a firma de responsable de dar respuesta',
    cycle: 'H',
    activity:
      'Remitir a firma de responsable de dar respuesta a la solicitud.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'rar-21-20',
    number: 20,
    type: 'activity',
    label: 'Realizar seguimiento a los recibidos de las respuestas',
    cycle: 'V',
    activity:
      'Realizar seguimiento a los recibidos de las respuestas de los peticionarios. En caso de devolución, se hace la respectiva publicación.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'fin',
    number: 21,
    type: 'end',
    label: 'FIN',
    cycle: 'A',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const asistenciaTecnicaAgropecuariaSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'ata-01-1',
    number: 1,
    type: 'activity',
    label: 'Identificar las necesidades de las fuentes',
    cycle: 'P',
    activity:
      'Identificar las necesidades de las fuentes con el fin de identificar necesidades de asesoría y asistencia técnica.',
    responsible: 'Gestión de Desarrollo Económico, Sostenible y de Turismo',
  },
  {
    id: 'ata-01-3',
    number: 3,
    type: 'activity',
    label: 'Revisar metas e indicadores',
    cycle: 'H',
    activity:
      'Revisar metas e indicadores de programas y subprogramas del sector agropecuario para diseñar el plan de trabajo y cumplimiento de metas.',
    responsible: 'Gestión de Desarrollo Económico, Sostenible y de Turismo',
  },
  {
    id: 'ata-01-4',
    number: 4,
    type: 'activity',
    label: 'Elaborar plan de trabajo',
    cycle: 'H',
    activity:
      'Elaborar plan de trabajo identificando zonas a impactar por parte del sector agropecuario con el fin de brindar asistencia técnica a los productores del municipio de Gachetá.',
    responsible: 'Gestión de Desarrollo Económico, Sostenible y de Turismo',
  },
  {
    id: 'ata-01-5',
    number: 5,
    type: 'activity',
    label: 'Realizar recorrido por corregimientos',
    cycle: 'V',
    activity:
      'Realizar el recorrido por corregimientos registrando a los usuarios del sector agropecuario para brindar la asistencia técnica ofertando los servicios del sector.',
    responsible: 'Gestión de Desarrollo Económico, Sostenible y de Turismo',
  },
  {
    id: 'ata-01-6',
    number: 6,
    type: 'activity',
    label: 'Prestar servicio de asesoría y/o asistencia técnica',
    cycle: 'V',
    activity:
      'Prestar servicio de asesoría y/o asistencia técnica; presentando a los asistentes los objetivos, metodología, tiempo y contenido, transfiriendo el contenido durante el tiempo programado.',
    responsible: 'Gestión de Desarrollo Económico, Sostenible y de Turismo',
  },
  {
    id: 'ata-01-7',
    number: 7,
    type: 'activity',
    label: 'Realizar seguimiento y evaluación al servicio',
    cycle: 'A',
    activity:
      'Realizar seguimiento y evaluación al servicio, teniendo en cuenta el cumplimiento de las actividades y a los requisitos, de acuerdo a los registros generados y los indicadores de gestión establecidos.',
    responsible: 'Gestión de Desarrollo Económico, Sostenible y de Turismo',
  },
  {
    id: 'fin',
    number: 8,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const estadisticasAgropecuariasSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'ea-02-1',
    number: 1,
    type: 'activity',
    label: 'Realizar capacitación',
    cycle: 'P',
    activity:
      'Realizar capacitación. Dar a conocer el diligenciamiento de los formatos, con su debida explicación.',
    responsible: 'Gestión de Desarrollo Económico, Sostenible y de Turismo',
  },
  {
    id: 'ea-02-3',
    number: 3,
    type: 'activity',
    label: 'Establecer el cronograma del proceso',
    cycle: 'H',
    activity:
      'Establecer el cronograma del proceso de recolección de información.',
    responsible: 'Gestión de Desarrollo Económico, Sostenible y de Turismo',
  },
  {
    id: 'ea-02-4',
    number: 4,
    type: 'activity',
    label: 'Registrar la información en los formatos',
    cycle: 'H',
    activity: 'Registrar la información en los formatos.',
    responsible: 'Gestión de Desarrollo Económico, Sostenible y de Turismo',
  },
  {
    id: 'ea-02-5',
    number: 5,
    type: 'activity',
    label: 'Revisar la información de las bases de datos',
    cycle: 'V',
    activity: 'Revisar la información de las bases de datos.',
    responsible: 'Gestión de Desarrollo Económico, Sostenible y de Turismo',
  },
  {
    id: 'ea-02-6',
    number: 6,
    type: 'activity',
    label: 'Enviar la información a la Unidad de Planificación Rural Agropecuaria',
    cycle: 'A',
    activity:
      'Enviar la información a la Unidad de Planificación Rural Agropecuaria.',
    responsible: 'Gestión de Desarrollo Económico, Sostenible y de Turismo',
  },
  {
    id: 'fin',
    number: 7,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const adquisicionPrediosImportanciaEstrategicaSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'pie-03-1',
    number: 1,
    type: 'activity',
    label: 'Realizar la formulación del proyecto',
    cycle: 'P',
    activity:
      'Realizar la formulación del proyecto para ser incluido en el Banco de Programas y Proyectos.',
    responsible: 'Gestión de Desarrollo Económico, Sostenible y de Turismo',
  },
  {
    id: 'pie-03-3',
    number: 3,
    type: 'activity',
    label: 'Asignar los recursos para la adquisición de predios',
    cycle: 'H',
    activity: 'Asignar los recursos para la adquisición de predios.',
    responsible: 'Gestión de Desarrollo Económico, Sostenible y de Turismo',
  },
  {
    id: 'pie-03-4',
    number: 4,
    type: 'activity',
    label: 'Ejecutar las actividades contractuales',
    cycle: 'V/A' as any,
    activity:
      'Ejecutar las actividades contractuales, de acuerdo a lo dispuesto en el proceso de gestión contractual.',
    responsible: 'Gestión de Desarrollo Económico, Sostenible y de Turismo',
  },
  {
    id: 'fin',
    number: 5,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const mantenimientoPrediosImportanciaEstrategicaSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'pie-04-1',
    number: 1,
    type: 'activity',
    label: 'Identificar los predios de propiedad del Municipio',
    cycle: 'P',
    activity:
      'Identificar los predios de propiedad del Municipio de Gachetá, adquiridos como estrategia de protección de fuentes hídricas que abastecen los acueductos.',
    responsible: 'Gestión de Desarrollo Económico, Sostenible y de Turismo',
  },
  {
    id: 'pie-04-3',
    number: 3,
    type: 'activity',
    label: 'Realizar visita de verificación',
    cycle: 'H',
    activity:
      'Realizar visita de verificación en la cual se determine si existe el área o longitud requerida para la ejecución de las actividades.',
    responsible: 'Gestión de Desarrollo Económico, Sostenible y de Turismo',
  },
  {
    id: 'pie-04-4',
    number: 4,
    type: 'activity',
    label: 'Ejecutar las actividades conforme al plan operativo',
    cycle: 'V/A' as any,
    activity:
      'Ejecutar las actividades de acuerdo a un plan operativo, previa elaboración de estudio y demás trámites, conforme a lo establecido en el proceso de Gestión Contractual.',
    responsible: 'Gestión de Desarrollo Económico, Sostenible y de Turismo',
  },
  {
    id: 'fin',
    number: 5,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const verbalAbreviadoProteccionBienesInmueblesSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'pbi-05-1',
    number: 1,
    type: 'activity',
    label: 'Recibir y analizar la solicitud',
    cycle: 'P',
    activity: 'Recibir y analizar la solicitud.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'pbi-05-2',
    number: 2,
    type: 'activity',
    label: 'Revisar la competencia y jurisdicción',
    cycle: 'P',
    activity: 'Revisar la competencia y jurisdicción.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'pbi-05-3',
    number: 3,
    type: 'activity',
    label: 'Revisar cumplimiento de requisitos',
    cycle: 'P',
    activity:
      'Revisar el cumplimiento de requisitos de forma y tiempo establecidos en los artículos 79 y 80 de la Ley 1801 de 2016.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'pbi-05-4',
    number: 4,
    type: 'decision',
    label: '¿Cumple?',
    cycle: 'P',
    activity: 'Cumplir con los requisitos.',
    responsible: 'Inspector de Policía',
    branches: [
      {
        label: 'NO',
        targetStepId: 'pbi-05-5',
        note:
          'Si no cumple, se archiva por inviabilidad jurídica mediante decisión motivada.',
      },
      {
        label: 'SÍ',
        targetStepId: 'pbi-05-6',
        note:
          'Si cumple, se proyecta auto de avóquese y se fija fecha y hora para audiencia pública.',
      },
    ],
  },
  {
    id: 'pbi-05-5',
    number: 5,
    type: 'document',
    label: 'Archivar por inviabilidad jurídica',
    cycle: 'P',
    activity:
      'Archivar por inviabilidad mediante decisión motivada de archivo por inviabilidad jurídica, susceptible de recursos.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'pbi-05-6',
    number: 6,
    type: 'document',
    label: 'Proyectar auto de avóquese',
    cycle: 'P',
    activity:
      'Proyectar auto de avóquese, señalando fecha y hora de citación para la audiencia pública, al presunto infractor dentro de los cinco (5) días siguientes de conocido el comportamiento contrario a la convivencia.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'pbi-05-7',
    number: 7,
    type: 'document',
    label: 'Remitir comunicaciones',
    cycle: 'H',
    activity:
      'Remitir comunicaciones a la oficina de Registro de Instrumentos Públicos y demás autoridades públicas, a efectos de que se informe sobre el último domicilio del propietario del bien objeto de la querella y se remita copia del certificado de tradición y libertad, si se requiere.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'pbi-05-8',
    number: 8,
    type: 'activity',
    label: 'Citar al querellante y al querellado',
    cycle: 'H',
    activity:
      'Citar al querellante y al querellado a una audiencia pública; en el despacho o en el lugar de los hechos, según el caso, solicitándoles que el día de la diligencia aporten los elementos probatorios que pretendan hacer valer dentro del proceso.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'pbi-05-9',
    number: 9,
    type: 'decision',
    label: '¿El infractor comparece?',
    cycle: 'H',
    activity:
      'Iniciar la celebración de la audiencia pública en la fecha y hora señalada en el auto de inicio.',
    responsible: 'Inspector de Policía',
    branches: [
      {
        label: 'NO',
        targetStepId: 'pbi-05-10',
        note:
          'Si no comparece, se suspende la audiencia pública conforme a la regla del procedimiento.',
      },
      {
        label: 'SÍ',
        targetStepId: 'pbi-05-11',
        note:
          'Si comparece, continúa la audiencia y se verifica la presentación del presunto infractor.',
      },
    ],
  },
  {
    id: 'pbi-05-10',
    number: 10,
    type: 'activity',
    label: 'Suspender la audiencia pública',
    cycle: 'H',
    activity:
      'Dar inicio a la audiencia y dejar constancia de la no comparecencia; por esta razón se suspende la audiencia para que el presunto infractor, dentro de los tres días siguientes, justifique la inasistencia, señalándose fecha para su continuación.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'pbi-05-11',
    number: 11,
    type: 'decision',
    label: '¿El presunto infractor presenta?',
    cycle: 'H',
    activity: '¿Se presenta el presunto infractor?',
    responsible: 'Inspector de Policía',
    branches: [
      {
        label: 'NO',
        targetStepId: 'pbi-05-14',
        note:
          'Si no se presenta, continúa el trámite para decretar pruebas o suspender la audiencia según corresponda.',
      },
      {
        label: 'SÍ',
        targetStepId: 'pbi-05-12',
        note:
          'Si se presenta, se desarrolla la audiencia.',
      },
    ],
  },
  {
    id: 'pbi-05-12',
    number: 12,
    type: 'activity',
    label: 'Desarrollar la audiencia',
    cycle: 'H',
    activity:
      'Escuchar los argumentos y pruebas del quejoso y del presunto infractor por el término máximo de veinte (20) minutos.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'pbi-05-13',
    number: 13,
    type: 'decision',
    label: '¿Las partes resuelven sus diferencias en conciliación?',
    cycle: 'H',
    activity: 'Invitar a conciliar.',
    responsible: 'Inspector de Policía',
    branches: [
      {
        label: 'NO',
        targetStepId: 'pbi-05-14',
        note:
          'Si no hay conciliación, se continúa con el desarrollo de la audiencia y decreto de pruebas.',
      },
      {
        label: 'SÍ',
        targetStepId: 'pbi-05-15',
        note:
          'Si hay acuerdo o se supera la controversia, se continúa con la emisión de decisión.',
      },
    ],
  },
  {
    id: 'pbi-05-14',
    number: 14,
    type: 'activity',
    label: 'Desarrollar la audiencia',
    cycle: 'V',
    activity:
      'Decretar las pruebas en un término máximo de cinco (5) días. Para ello se suspende la audiencia y se señalará fecha para su reanudación.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'pbi-05-15',
    number: 15,
    type: 'document',
    label: 'Emitir decisión',
    cycle: 'V',
    activity:
      'Emitir decisión. En caso de que no sea posible evacuar la práctica de pruebas dentro del término anterior, se dejará constancia en la audiencia y se señalará fecha y hora para su reanudación.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'pbi-05-16',
    number: 16,
    type: 'decision',
    label: '¿Interponen recursos?',
    cycle: 'A',
    activity: 'Interponer recursos.',
    responsible: 'Inspector de Policía',
    branches: [
      {
        label: 'NO',
        targetStepId: 'pbi-05-18',
        note:
          'Si no se interponen recursos, continúa el trámite hacia el cumplimiento de la decisión.',
      },
      {
        label: 'SÍ',
        targetStepId: 'pbi-05-17',
        note:
          'Si se interponen recursos, se tramitan conforme corresponda.',
      },
    ],
  },
  {
    id: 'pbi-05-17',
    number: 17,
    type: 'activity',
    label: 'Tramitar recursos',
    cycle: 'A',
    activity:
      'Tramitar recursos. Reposición: debe ser presentado y sustentado dentro de la audiencia y se resuelve inmediatamente. Reposición y en subsidio de apelación: en la audiencia se resuelve la reposición y se concede el recurso devolutivo. Apelación: se concede el recurso de apelación, se interpondrá y concederá en el efecto devolutivo dentro de la audiencia y se remitirá a la Secretaría de Gobierno y Gestión Ciudadana dentro de los dos (2) días siguientes.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'pbi-05-18',
    number: 18,
    type: 'activity',
    label: 'Recibir fallo de segunda instancia',
    cycle: 'A',
    activity: 'Recibir fallo de segunda instancia.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'pbi-05-19',
    number: 19,
    type: 'activity',
    label: 'Cumplir la decisión',
    cycle: 'A',
    activity:
      'Cumplir la decisión profiriendo un auto según lo dispuesto por la segunda instancia.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'pbi-05-20',
    number: 20,
    type: 'activity',
    label: 'Verificar el cumplimiento',
    cycle: 'A',
    activity:
      'Verificar el cumplimiento de la decisión interpuesta por el recurso.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'pbi-05-21',
    number: 21,
    type: 'decision',
    label: '¿El infractor cumple la medida correctiva?',
    cycle: 'A',
    activity: 'Cumplir con la medida correctiva.',
    responsible: 'Inspector de Policía',
    branches: [
      {
        label: 'NO',
        targetStepId: 'pbi-05-22',
        note:
          'Si no cumple la medida correctiva, se impone multa.',
      },
      {
        label: 'SÍ',
        targetStepId: 'pbi-05-25',
        note:
          'Si cumple la medida correctiva, se emite el auto y se ordena el archivo definitivo del expediente.',
      },
    ],
  },
  {
    id: 'pbi-05-22',
    number: 22,
    type: 'activity',
    label: 'Imponer multa',
    cycle: 'A',
    activity: 'Imponer multa.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'pbi-05-23',
    number: 23,
    type: 'decision',
    label: '¿Pagó la multa?',
    cycle: 'A',
    activity: 'Pagar multa.',
    responsible: 'Inspector de Policía',
    branches: [
      {
        label: 'NO',
        targetStepId: 'pbi-05-24',
        note:
          'Si no paga la multa, se registra o se mantiene la decisión en el aplicativo correspondiente.',
      },
      {
        label: 'SÍ',
        targetStepId: 'pbi-05-25',
        note:
          'Si paga la multa, se continúa con la emisión del auto de archivo.',
      },
    ],
  },
  {
    id: 'pbi-05-24',
    number: 24,
    type: 'activity',
    label: 'Registrar la decisión en el aplicativo correspondiente',
    cycle: 'A',
    activity: 'Registrar la decisión en el aplicativo correspondiente.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'pbi-05-25',
    number: 25,
    type: 'document',
    label: 'Emitir el auto',
    cycle: 'A',
    activity:
      'Emitir el auto ordenando el archivo definitivo del expediente.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'fin',
    number: 26,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const apelacionProcesoVerbalInmediatoSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'sip-06-1',
    number: 1,
    type: 'activity',
    label: 'Recibir documento de policía con la medida correctiva',
    cycle: 'H',
    activity:
      'Recibir documento de policía con la medida correctiva impuesta por el uniformado en primera instancia.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'sip-06-2',
    number: 2,
    type: 'activity',
    label: 'Decretar pruebas adicionales de oficio',
    cycle: 'P',
    activity:
      'En caso de requerir pruebas adicionales, se decretarán de oficio por medio de auto; estas deben ser valoradas para emitir la decisión en derecho.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'sip-06-3',
    number: 3,
    type: 'activity',
    label: 'Realizar audiencia pública para decidir la apelación',
    cycle: 'V',
    activity:
      'Se realiza audiencia pública para decidir sobre la apelación.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'sip-06-10',
    number: 10,
    type: 'document',
    label: 'Enviar expediente a primera instancia',
    cycle: 'A',
    activity:
      'Enviar el expediente a la primera instancia, Policía Nacional, para que se materialice la decisión.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'fin',
    number: 11,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const verbalAbreviadoConvivenciaCiudadanaSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'ccc-07-1',
    number: 1,
    type: 'activity',
    label: 'Recibir y analizar la solicitud, orden de comparendo o informe de policía',
    cycle: 'P',
    activity:
      'Recibe y analiza la solicitud, la orden de comparendo o el informe de policía, para determinar si la queja le compete, dando respuesta al quejoso y terminando el procedimiento.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'ccc-07-2',
    number: 2,
    type: 'decision',
    label: '¿La solicitud es de su competencia?',
    cycle: 'P',
    activity: 'Verificar si la solicitud es de su competencia.',
    responsible: 'Inspector de Policía',
    branches: [
      {
        label: 'NO',
        targetStepId: 'ccc-07-5',
        note:
          'Si la solicitud no es de competencia, se archiva por inviabilidad jurídica.',
      },
      {
        label: 'SÍ',
        targetStepId: 'ccc-07-3',
        note:
          'Si es de competencia, continúa la revisión de requisitos de forma y tiempo.',
      },
    ],
  },
  {
    id: 'ccc-07-3',
    number: 3,
    type: 'activity',
    label: 'Revisar cumplimiento de requisitos',
    cycle: 'P',
    activity:
      'Revisar cumplimiento de requisitos de forma y tiempo, establecidos en los artículos 79 y 80 de la Ley 1801 de 2016.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'ccc-07-4',
    number: 4,
    type: 'decision',
    label: '¿La solicitud cumple los requisitos?',
    cycle: 'P',
    activity: 'Verificar si la solicitud cumple con los requisitos.',
    responsible: 'Inspector de Policía',
    branches: [
      {
        label: 'NO',
        targetStepId: 'ccc-07-5',
        note:
          'Si no cumple los requisitos, se profiere decisión motivada de archivo por inviabilidad jurídica.',
      },
      {
        label: 'SÍ',
        targetStepId: 'ccc-07-6',
        note:
          'Si cumple los requisitos, se proyecta auto de avóquese.',
      },
    ],
  },
  {
    id: 'ccc-07-5',
    number: 5,
    type: 'document',
    label: 'Archivar por inviabilidad',
    cycle: 'P',
    activity:
      'Proferir decisión motivada de archivo por inviabilidad jurídica, susceptible de recursos.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'ccc-07-6',
    number: 6,
    type: 'document',
    label: 'Proyectar auto de avóquese',
    cycle: 'P',
    activity:
      'Emitir auto de avóquese, señalando fecha y hora de citación para la audiencia pública, al presunto infractor dentro de los cinco (5) días siguientes de conocido.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'ccc-07-7',
    number: 7,
    type: 'document',
    label: 'Enviar citación',
    cycle: 'H',
    activity:
      'Enviar citación al presunto infractor en la dirección que aparece en el comparendo. En caso de inexistencia de dirección en el comparendo, la citación debe ser fijada en cartelera destinada para tal fin, o citar a través de la página web de la entidad, dejando constancia de fijación y desfijación en el expediente.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'ccc-07-8',
    number: 8,
    type: 'decision',
    label: '¿El infractor comparece?',
    cycle: 'H',
    activity:
      'Iniciar la celebración de la audiencia pública en la fecha y hora señalada en el auto de inicio.',
    responsible: 'Inspector de Policía',
    branches: [
      {
        label: 'NO',
        targetStepId: 'ccc-07-9',
        note:
          'Si el infractor no comparece, se suspende la audiencia pública.',
      },
      {
        label: 'SÍ',
        targetStepId: 'ccc-07-11',
        note:
          'Si comparece, se desarrolla la audiencia.',
      },
    ],
  },
  {
    id: 'ccc-07-9',
    number: 9,
    type: 'activity',
    label: 'Suspender la audiencia pública',
    cycle: 'H',
    activity:
      'Suspender la audiencia en caso de no comparecencia, para que el presunto infractor, dentro de los tres (3) días siguientes, justifique la inasistencia, señalándose fecha para su continuación.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'ccc-07-10',
    number: 10,
    type: 'decision',
    label: '¿El infractor presenta excusa?',
    cycle: 'H',
    activity: 'Presentar excusa.',
    responsible: 'Inspector de Policía',
    branches: [
      {
        label: 'NO',
        targetStepId: 'ccc-07-11',
        note:
          'Si no presenta excusa, continúa el trámite con el desarrollo de la audiencia según corresponda.',
      },
      {
        label: 'SÍ',
        targetStepId: 'ccc-07-11',
        note:
          'Si presenta excusa, se continúa la audiencia en la fecha fijada.',
      },
    ],
  },
  {
    id: 'ccc-07-11',
    number: 11,
    type: 'activity',
    label: 'Desarrollar la audiencia',
    cycle: 'H',
    activity:
      'Desarrollar la audiencia, escuchando los argumentos y pruebas del quejoso y del presunto infractor por el término de veinte (20) minutos máximo.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'ccc-07-12',
    number: 12,
    type: 'decision',
    label: '¿Las partes resuelven sus diferencias?',
    cycle: 'H',
    activity: 'Invitar a conciliar.',
    responsible: 'Inspector de Policía',
    branches: [
      {
        label: 'NO',
        targetStepId: 'ccc-07-13',
        note:
          'Si las partes no resuelven sus diferencias, se continúa con el decreto de pruebas.',
      },
      {
        label: 'SÍ',
        targetStepId: 'ccc-07-14',
        note:
          'Si las partes resuelven sus diferencias, se continúa con la emisión de la decisión.',
      },
    ],
  },
  {
    id: 'ccc-07-13',
    number: 13,
    type: 'activity',
    label: 'Decretar pruebas',
    cycle: 'V',
    activity:
      'Decretar pruebas si se consideran necesarias y practicar pruebas de oficio del Inspector. Para tal efecto, se podrá suspender la audiencia y señalar fecha para su reanudación.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'ccc-07-14',
    number: 14,
    type: 'document',
    label: 'Emitir decisión',
    cycle: 'V',
    activity:
      'Emitir decisión a partir de las pruebas presentadas. En caso de que el querellado no haya asistido a la diligencia, dar lectura a los hechos y pasar a decidir de fondo.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'ccc-07-15',
    number: 15,
    type: 'decision',
    label: '¿Interponen recursos?',
    cycle: 'V',
    activity: 'Interponer recursos.',
    responsible: 'Inspector de Policía',
    branches: [
      {
        label: 'NO',
        targetStepId: 'ccc-07-17',
        note:
          'Si no se interponen recursos, se continúa con el cumplimiento de la decisión.',
      },
      {
        label: 'SÍ',
        targetStepId: 'ccc-07-16',
        note:
          'Si se interponen recursos, se tramitan conforme corresponda.',
      },
    ],
  },
  {
    id: 'ccc-07-16',
    number: 16,
    type: 'activity',
    label: 'Tramitar recursos',
    cycle: 'V',
    activity:
      'Tramitar los recursos interpuestos por el infractor según su tipología: reposición, reposición y en subsidio de apelación o apelación, conforme a los términos establecidos.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'ccc-07-17',
    number: 17,
    type: 'activity',
    label: 'Recibir fallo de segunda instancia',
    cycle: 'V',
    activity:
      'Cumplir la decisión profiriendo un auto según lo dispuesto por la segunda instancia.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'ccc-07-18',
    number: 18,
    type: 'activity',
    label: 'Cumplir la decisión',
    cycle: 'V',
    activity:
      'Verificar el cumplimiento de la decisión interpuesta por el recurso.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'ccc-07-19',
    number: 19,
    type: 'activity',
    label: 'Verificar el cumplimiento',
    cycle: 'V',
    activity: 'Cumplir con la medida correctiva.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'ccc-07-20',
    number: 20,
    type: 'decision',
    label: '¿El infractor cumple la medida correctiva?',
    cycle: 'A',
    activity: 'Imponer multa.',
    responsible: 'Inspector de Policía',
    branches: [
      {
        label: 'NO',
        targetStepId: 'ccc-07-21',
        note:
          'Si el infractor no cumple la medida correctiva, se continúa con el trámite de multa.',
      },
      {
        label: 'SÍ',
        targetStepId: 'ccc-07-23',
        note:
          'Si cumple la medida correctiva, se ordena el archivo definitivo.',
      },
    ],
  },
  {
    id: 'ccc-07-21',
    number: 21,
    type: 'decision',
    label: '¿Pagó la multa?',
    cycle: 'A',
    activity: 'Pagar multa.',
    responsible: 'Inspector de Policía',
    branches: [
      {
        label: 'NO',
        targetStepId: 'ccc-07-22',
        note:
          'Si no paga la multa, se registra la decisión en el aplicativo correspondiente.',
      },
      {
        label: 'SÍ',
        targetStepId: 'ccc-07-23',
        note:
          'Si paga la multa, se ordena el archivo definitivo.',
      },
    ],
  },
  {
    id: 'ccc-07-22',
    number: 22,
    type: 'software',
    label: 'Registrar la decisión',
    cycle: 'A',
    activity:
      'Registrar la decisión en el aplicativo correspondiente.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'ccc-07-23',
    number: 23,
    type: 'document',
    label: 'Ordenar archivo definitivo',
    cycle: 'A',
    activity:
      'Emitir el auto ordenando el archivo definitivo del expediente.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'fin',
    number: 24,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const controlAutorizacionRifasJuegosEspectaculosSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'car-08-1',
    number: 1,
    type: 'activity',
    label: 'Diligenciar la solicitud',
    cycle: 'P',
    activity:
      'Diligenciar la solicitud en la que se indica en el artículo 9 del Decreto 1660 de 1994.',
    responsible: 'Interesado, Persona Natural o Jurídica',
  },
  {
    id: 'car-08-2',
    number: 2,
    type: 'document',
    label: 'Constituir garantía de cumplimiento',
    cycle: 'H',
    activity:
      'Constituir la garantía de cumplimiento que será igual al valor total del plan de premios y su vigencia por un término no inferior a cuatro (4) meses contados a partir de la fecha de realización del sorteo.',
    responsible: 'Interesado, Persona Natural o Jurídica',
  },
  {
    id: 'car-08-3',
    number: 3,
    type: 'decision',
    label: '¿Cumple con los requisitos?',
    cycle: 'V',
    activity:
      'Verificar el cumplimiento de los requisitos previstos para otorgar la autorización de operación de la rifa.',
    responsible: 'Inspector de Policía',
    branches: [
      {
        label: 'NO',
        targetStepId: 'car-08-4',
        note:
          'Si no cumple con los requisitos, se niega la autorización de operación de la rifa.',
      },
      {
        label: 'SÍ',
        targetStepId: 'car-08-5',
        note:
          'Si cumple con los requisitos, se otorga la autorización de operación de la rifa.',
      },
    ],
  },
  {
    id: 'car-08-4',
    number: 4,
    type: 'activity',
    label: 'Negar la autorización',
    cycle: 'V',
    activity: 'Negar la autorización de operación de la rifa.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'car-08-5',
    number: 5,
    type: 'activity',
    label: 'Otorgar la autorización',
    cycle: 'V',
    activity: 'Otorgar la autorización de operación de la rifa.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'car-08-6',
    number: 6,
    type: 'activity',
    label: 'Realizar el sorteo',
    cycle: 'V',
    activity:
      'Presentar las boletas emitidas y no vendidas para la realización del juego.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'car-08-7',
    number: 7,
    type: 'document',
    label: 'Levantar acta correspondiente y anexar boletas',
    cycle: 'V',
    activity:
      'Levantar el acta correspondiente y anexar las boletas que no participan en el sorteo y las invalidadas.',
    responsible: 'Titular de la autorización',
  },
  {
    id: 'car-08-8',
    number: 8,
    type: 'document',
    label: 'Presentar declaración de persona favorecida con el premio',
    cycle: 'V',
    activity:
      'Presentar la declaración jurada ante notario por la persona favorecida con el premio o premios de la rifa realizada, en la cual conste que recibieron los mismos a entera satisfacción.',
    responsible: 'Titular de la autorización',
  },
  {
    id: 'car-08-9',
    number: 9,
    type: 'activity',
    label: 'Verificar la entrega del premio',
    cycle: 'V',
    activity: 'Verificar la entrega a satisfacción del premio.',
    responsible: 'Interesado, Persona Natural o Jurídica',
  },
  {
    id: 'car-08-10',
    number: 10,
    type: 'document',
    label: 'Solicitud por escrito',
    cycle: 'A',
    activity:
      'Indicar clase de espectáculo, evento, fechas, horarios de inicio y culminación, anexando la documentación requerida.',
    responsible: 'Interesado, Persona Natural o Jurídica',
  },
  {
    id: 'car-08-11',
    number: 11,
    type: 'document',
    label: 'Constituir póliza a favor del municipio',
    cycle: 'A',
    activity:
      'Constituir póliza que garantice la presentación del espectáculo y póliza que garantice el pago de impuestos a favor del municipio.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'car-08-12',
    number: 12,
    type: 'decision',
    label: '¿Cumple con los requisitos?',
    cycle: 'A',
    activity: 'Verificar los requisitos.',
    responsible: 'Interesado, Persona Natural o Jurídica',
    branches: [
      {
        label: 'NO',
        targetStepId: 'car-08-15',
        note:
          'Si no cumple con los requisitos, se niega la autorización del espectáculo público.',
      },
      {
        label: 'SÍ',
        targetStepId: 'car-08-13',
        note:
          'Si cumple con los requisitos, continúa con la subsanación o adjunte de documentos exigidos.',
      },
    ],
  },
  {
    id: 'car-08-13',
    number: 13,
    type: 'activity',
    label: 'Subsanar la solicitud',
    cycle: 'A',
    activity: 'Adjuntar cada uno de los documentos exigidos.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'car-08-14',
    number: 14,
    type: 'decision',
    label: '¿Cumple con los requisitos?',
    cycle: 'A',
    activity:
      'Verificar el cumplimiento de cada uno de los requisitos del artículo 128 del RCCDB y demás normas concordantes.',
    responsible: 'Inspector de Policía',
    branches: [
      {
        label: 'NO',
        targetStepId: 'car-08-15',
        note:
          'Si no cumple, se niega la autorización de la realización del espectáculo público.',
      },
      {
        label: 'SÍ',
        targetStepId: 'car-08-16',
        note:
          'Si cumple, se concede la autorización de la realización del espectáculo público.',
      },
    ],
  },
  {
    id: 'car-08-15',
    number: 15,
    type: 'activity',
    label: 'Negar autorización de espectáculo',
    cycle: 'A',
    activity:
      'Negar autorización de la realización del espectáculo público.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'car-08-16',
    number: 16,
    type: 'activity',
    label: 'Autorizar la realización de espectáculo público',
    cycle: 'A',
    activity:
      'Conceder la autorización de la realización del espectáculo público.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'car-08-17',
    number: 17,
    type: 'activity',
    label: 'Archivar',
    cycle: 'A',
    activity: 'Archivar el expediente.',
    responsible: 'Inspector de Policía',
  },
  {
    id: 'fin',
    number: 18,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const procesoViolenciaIntrafamiliarSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'pvi-09-1',
    number: 1,
    type: 'activity',
    label: 'Recepción de denuncia verbal o escrita y orientación',
    cycle: 'P',
    activity:
      'Orientar a las víctimas sobre procedimientos legales.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'pvi-09-2',
    number: 2,
    type: 'decision',
    label: '¿La solicitud es de su competencia?',
    cycle: 'P',
    activity:
      'Establecer la competencia y determinar el hecho. Si se evidencian indicios leves, pasar a la actividad 4. Si no se evidencian indicios leves, pasar a la actividad 3.',
    responsible: 'Comisario de Familia',
    branches: [
      {
        label: 'NO',
        targetStepId: 'pvi-09-3',
        note:
          'Si no es competencia o no se evidencian indicios leves, se remite a la Fiscalía General de la Nación.',
      },
      {
        label: 'SÍ',
        targetStepId: 'pvi-09-4',
        note:
          'Si es competencia, se ordenan las medidas provisionales previstas en la ley.',
      },
    ],
  },
  {
    id: 'pvi-09-3',
    number: 3,
    type: 'activity',
    label: 'Remitir a la Fiscalía General de la Nación',
    cycle: 'P',
    activity: 'Remitir a la Fiscalía General de la Nación.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'pvi-09-4',
    number: 4,
    type: 'activity',
    label: 'Ordenar las medidas provisionales',
    cycle: 'P',
    activity: 'Ordenar las medidas provisionales previstas en la ley.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'pvi-09-5',
    number: 5,
    type: 'activity',
    label: 'Decreto de pruebas',
    cycle: 'P',
    activity:
      'Decretar práctica de pruebas atendiendo el tipo de agresión.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'pvi-09-6',
    number: 6,
    type: 'activity',
    label: 'Solicitud de prueba pericial',
    cycle: 'H',
    activity:
      'Solicitar prueba pericial técnica o científica a través de peritos oficiales.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'pvi-09-7',
    number: 7,
    type: 'activity',
    label: 'Realizar visita domiciliaria',
    cycle: 'H',
    activity: 'Verificar las condiciones socio-habitacionales.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'pvi-09-8',
    number: 8,
    type: 'activity',
    label: 'Identificar factores de riesgo y protectores',
    cycle: 'H',
    activity: 'Identificar los factores de riesgo y factores protectores.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'pvi-09-9',
    number: 9,
    type: 'activity',
    label: 'Valoración psicológica',
    cycle: 'H',
    activity: 'Realizar valoración psicológica a la víctima.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'pvi-09-10',
    number: 10,
    type: 'activity',
    label: 'Notificar sobre citación a la audiencia',
    cycle: 'H',
    activity:
      'Notificar personalmente o por aviso fijado a la entrada de la residencia del agresor, de la citación a la audiencia.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'pvi-09-11',
    number: 11,
    type: 'activity',
    label: 'Comparecer en audiencia',
    cycle: 'H',
    activity:
      'Comparecer en una audiencia que tendrá lugar entre los cinco (5) y diez (10) días siguientes a la presentación de la petición. A esta audiencia debe acudir la víctima.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'pvi-09-12',
    number: 12,
    type: 'activity',
    label: 'Evaluar excusa',
    cycle: 'H',
    activity:
      'Evaluar la excusa de inasistencia con justa causa y por una sola vez.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'pvi-09-13',
    number: 13,
    type: 'activity',
    label: 'Fijar fecha para nueva audiencia',
    cycle: 'H',
    activity:
      'Fijar fecha para celebrar la nueva audiencia dentro de los cinco (5) días siguientes.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'pvi-09-14',
    number: 14,
    type: 'activity',
    label: 'Realizar audiencia de fallo',
    cycle: 'H',
    activity: 'Realizar audiencia de fallo.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'pvi-09-15',
    number: 15,
    type: 'activity',
    label: 'Notificación del fallo',
    cycle: 'H',
    activity:
      'Notificar en estrados a quienes asistieron a la audiencia y por aviso a quienes no asistieron.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'pvi-09-16',
    number: 16,
    type: 'decision',
    label: '¿Presenta recurso de apelación?',
    cycle: 'V',
    activity:
      'Presentar recurso de apelación dentro del término de ley. Si no se presenta recurso de apelación, proceder a la actividad 19.',
    responsible: 'Partes interesadas',
    branches: [
      {
        label: 'SÍ',
        targetStepId: 'pvi-09-17',
        note:
          'Si se presenta recurso de apelación, se remite el fallo y acervo probatorio para resolver el recurso.',
      },
      {
        label: 'NO',
        targetStepId: 'pvi-09-19',
        note:
          'Si no se presenta recurso de apelación, se continúa con la ejecución y cumplimiento de la medida definitiva de protección.',
      },
    ],
  },
  {
    id: 'pvi-09-17',
    number: 17,
    type: 'activity',
    label: 'Recibir fallo de segunda instancia',
    cycle: 'V',
    activity:
      'Remitir al Juez de Familia fallo y acervo probatorio para que se resuelva el recurso.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'pvi-09-18',
    number: 18,
    type: 'activity',
    label: 'Resolver el recurso de apelación',
    cycle: 'V',
    activity: 'Resolver el recurso de apelación.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'pvi-09-19',
    number: 19,
    type: 'activity',
    label: 'Ejecución y cumplimiento de la medida definitiva de protección',
    cycle: 'V',
    activity:
      'Ordenar al agresor abstenerse de realizar la conducta objeto de la queja e imponer medida correspondiente, indicando la forma o medio como se hará efectiva.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'pvi-09-20',
    number: 20,
    type: 'decision',
    label: '¿El infractor cumple la medida de protección?',
    cycle: 'V',
    activity: 'Verificar la medida de protección.',
    responsible: 'Comisario de Familia',
    branches: [
      {
        label: 'SÍ',
        targetStepId: 'pvi-09-22',
        note:
          'Si cumple la medida, se realiza audiencia de incumplimiento según el flujo de la ficha.',
      },
      {
        label: 'NO',
        targetStepId: 'pvi-09-21',
        note:
          'Si no cumple, se envía solicitud al juez para que expida orden de arresto.',
      },
    ],
  },
  {
    id: 'pvi-09-21',
    number: 21,
    type: 'activity',
    label: 'Enviar solicitud al Juez para que expida orden de arresto',
    cycle: 'V',
    activity:
      'Enviar solicitud al Juez para que expida orden de arresto.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'pvi-09-22',
    number: 22,
    type: 'activity',
    label: 'Realizar audiencia de incumplimiento',
    cycle: 'A',
    activity: 'Realizar audiencia de incumplimiento.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'pvi-09-23',
    number: 23,
    type: 'activity',
    label: 'Imponer medida de arresto',
    cycle: 'A',
    activity: 'Imponer medida de arresto.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'pvi-09-24',
    number: 24,
    type: 'document',
    label: 'Solicitud de terminación de medidas de protección',
    cycle: 'A',
    activity:
      'Allegar pruebas para demostrar solicitud de levantamiento de medida de protección.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'pvi-09-25',
    number: 25,
    type: 'decision',
    label: '¿Procede el levantamiento de la medida?',
    cycle: 'A',
    activity:
      'Decidir si procede o no el levantamiento de la medida de protección.',
    responsible: 'Comisario de Familia',
    branches: [
      {
        label: 'SÍ',
        targetStepId: 'pvi-09-26',
        note:
          'Si procede, se emite auto de apoyo a la solicitud de levantamiento de la medida de protección.',
      },
      {
        label: 'NO',
        targetStepId: 'pvi-09-27',
        note:
          'Si no procede, se cita a las partes para notificar personalmente.',
      },
    ],
  },
  {
    id: 'pvi-09-26',
    number: 26,
    type: 'document',
    label: 'Auto de apoyo solicitud de levantamiento de medida de protección',
    cycle: 'A',
    activity:
      'Estudiar el contenido de solicitud de levantamiento de medida de protección y verificar si se han superado circunstancias que dieron origen a la medida de protección.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'pvi-09-27',
    number: 27,
    type: 'activity',
    label: 'Citar a las partes para notificar',
    cycle: 'A',
    activity:
      'Citar a las partes para notificar personalmente la misma.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'pvi-09-28',
    number: 28,
    type: 'document',
    label: 'Ordenar el archivo del expediente',
    cycle: 'A',
    activity: 'Ordenar el archivo del expediente.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'fin',
    number: 29,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const restablecimientoDerechosSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'prd-10-1',
    number: 1,
    type: 'activity',
    label: 'Solicitud de restablecimiento de derechos',
    cycle: 'P',
    activity:
      'Presentar de forma verbal o escrita el restablecimiento de derechos.',
    responsible: 'Representante legal',
  },
  {
    id: 'prd-10-2',
    number: 2,
    type: 'document',
    label: 'Auto de apertura de la investigación',
    cycle: 'P',
    activity: 'Generar auto de apertura de la investigación.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'prd-10-3',
    number: 3,
    type: 'document',
    label: 'Citación para notificación',
    cycle: 'P',
    activity: 'Enviar citación para notificación.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'prd-10-4',
    number: 4,
    type: 'document',
    label: 'Notificación por emplazamiento',
    cycle: 'P',
    activity:
      'Publicar mediante página de internet del ICBF por tiempo no inferior a cinco (5) días o por transmisión en un medio masivo de comunicación, incluyendo fotografía del niño, si fuere posible.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'prd-10-5',
    number: 5,
    type: 'document',
    label: 'Notificación por aviso',
    cycle: 'P',
    activity:
      'Remitir por medio de servicio postal autorizado, acompañado de una copia de la providencia correspondiente.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'prd-10-6',
    number: 6,
    type: 'activity',
    label: 'Poner en conocimiento la providencia',
    cycle: 'P',
    activity: 'Poner en conocimiento la providencia.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'prd-10-7',
    number: 7,
    type: 'activity',
    label: 'Corre traslado para descargos',
    cycle: 'H',
    activity:
      'Correr traslado por el término que otorga a las reglas del procedimiento civil.',
    responsible: 'Presunto vulnerador',
  },
  {
    id: 'prd-10-8',
    number: 8,
    type: 'document',
    label: 'Notificación por aviso del auto que fija audiencia de pruebas',
    cycle: 'H',
    activity:
      'Surtir mediante aviso que se remitirá por medio de servicio postal autorizado, acompañado de una copia de la providencia correspondiente.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'prd-10-9',
    number: 9,
    type: 'activity',
    label: 'Verificación de derechos de los niños, niñas y/o adolescentes',
    cycle: 'H',
    activity:
      'Verificación de valoración física, psicológica, nutricional y alimentaria al niño, niña o adolescente.',
    responsible: 'IPS',
  },
  {
    id: 'prd-10-10',
    number: 10,
    type: 'activity',
    label: 'Audiencia práctica de pruebas y fallo',
    cycle: 'H',
    activity: 'Realizar audiencia de práctica de pruebas.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'prd-10-11',
    number: 11,
    type: 'document',
    label: 'Emitir fallo',
    cycle: 'H',
    activity:
      'Emitir fallo mediante resolución susceptible de recurso de reposición.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'prd-10-12',
    number: 12,
    type: 'document',
    label: 'Notificar el fallo en estrados',
    cycle: 'H',
    activity:
      'Notificar el fallo en estrados a quienes asistieron a la audiencia y por estado a quienes no asistieron a la audiencia.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'prd-10-13',
    number: 13,
    type: 'document',
    label: 'Presentación de recurso de reposición',
    cycle: 'H',
    activity: 'Presentar recurso de reposición.',
    responsible: 'Parte interesada',
  },
  {
    id: 'prd-10-14',
    number: 14,
    type: 'activity',
    label: 'Resolver el recurso de reposición',
    cycle: 'H',
    activity: 'Resolver recurso de reposición.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'prd-10-15',
    number: 15,
    type: 'decision',
    label: 'Remitir al juez de familia',
    cycle: 'H',
    activity: 'Remitir expediente al juez de familia para homologar el fallo.',
    responsible: 'Comisario de Familia',
    branches: [
      {
        label: 'CONTINÚA',
        targetStepId: 'prd-10-16',
        note:
          'Continúa con la audiencia de conciliación dentro del término previsto en la ley.',
      },
    ],
  },
  {
    id: 'prd-10-16',
    number: 16,
    type: 'document',
    label: 'Realizar audiencia de conciliación',
    cycle: 'V',
    activity:
      'Realizar audiencia de conciliación, dentro del término previsto en la ley.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'prd-10-17',
    number: 17,
    type: 'document',
    label: 'Expedir auto de aprobación',
    cycle: 'A',
    activity:
      'Entregar a las partes primera copia que prestará mérito ejecutivo.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'prd-10-18',
    number: 18,
    type: 'document',
    label: 'Resolución medidas de restablecimiento',
    cycle: 'A',
    activity:
      'Determinar si ordena o no medidas provisionales mediante resolución.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'prd-10-19',
    number: 19,
    type: 'activity',
    label: 'Correr traslado de la resolución',
    cycle: 'A',
    activity:
      'Correr traslado por el término que la ley otorgue, para que se pronuncie y se aporten pruebas.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'prd-10-20',
    number: 20,
    type: 'document',
    label: 'Auto decreta pruebas',
    cycle: 'A',
    activity:
      'Fijar fecha de audiencia para practicarlas con sujeción a las reglas del procedimiento civil.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'prd-10-21',
    number: 21,
    type: 'document',
    label: 'Notificación por aviso del auto que decreta pruebas',
    cycle: 'A',
    activity:
      'Surtir mediante aviso que se remitirá por medio de servicio postal autorizado, acompañado de una copia de la providencia correspondiente.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'prd-10-22',
    number: 22,
    type: 'activity',
    label: 'Realizar audiencia de práctica de prueba',
    cycle: 'A',
    activity: 'Realizar la audiencia de práctica de prueba.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'prd-10-23',
    number: 23,
    type: 'document',
    label: 'Emitir fallo mediante resolución',
    cycle: 'A',
    activity:
      'Emitir fallo mediante resolución susceptible de recurso de reposición.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'prd-10-24',
    number: 24,
    type: 'document',
    label: 'Presentación de recurso de reposición',
    cycle: 'A',
    activity:
      'Presentar verbalmente en audiencia y sustentar recurso de reposición.',
    responsible: 'Parte interesada',
  },
  {
    id: 'prd-10-25',
    number: 25,
    type: 'activity',
    label: 'Resolver recurso de reposición',
    cycle: 'A',
    activity:
      'Resolver recurso de reposición atendiendo a lo previsto en el artículo 340 del CPC o la normativa que derogue, adicione o modifique.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'prd-10-26',
    number: 26,
    type: 'activity',
    label: 'Remitir al juez de familia',
    cycle: 'A',
    activity:
      'Remitir expediente al juez de familia para homologar el fallo.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'prd-10-27',
    number: 27,
    type: 'document',
    label: 'Archivar el proceso',
    cycle: 'A',
    activity: 'Archivar el proceso.',
    responsible: 'Comisario de Familia',
  },
  {
    id: 'fin',
    number: 28,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const peticionesQuejasReclamosSugerenciasSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'pqr-01-1',
    number: 1,
    type: 'activity',
    label: 'Hacer reclamación verbal o escrita',
    cycle: 'P',
    activity:
      'Hacer la reclamación verbal o escrita, durante el tiempo de pago.',
    responsible: 'Usuario',
  },
  {
    id: 'pqr-01-3',
    number: 3,
    type: 'activity',
    label: 'Recibir la petición, queja o reclamo',
    cycle: 'H',
    activity: 'Recibir la petición, queja o reclamo.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'pqr-01-4',
    number: 4,
    type: 'decision',
    label: '¿Es viable?',
    cycle: 'H',
    activity:
      'Revisar dicha petición. Si es viable, se hace el trámite de inmediato; en caso contrario, se da respuesta de negación al usuario.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
    branches: [
      {
        label: 'SÍ',
        targetStepId: 'pqr-01-5',
        note:
          'Si es viable, se da solución o respuesta a la petición, queja o reclamo.',
      },
      {
        label: 'NO',
        targetStepId: 'pqr-01-6',
        note:
          'Si no es viable, se informa la negación al usuario y se archiva el trámite.',
      },
    ],
  },
  {
    id: 'pqr-01-5',
    number: 5,
    type: 'activity',
    label: 'Dar solución o respuesta',
    cycle: 'V',
    activity:
      'Dar solución o respuesta a la petición, queja o reclamo.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'pqr-01-6',
    number: 6,
    type: 'activity',
    label: 'Archivar',
    cycle: 'A',
    activity: 'Archivar.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'fin',
    number: 7,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const atencionPublicoSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'ap-02-1',
    number: 1,
    type: 'activity',
    label: 'Brindar atención a la ciudadanía',
    cycle: 'P/H/V/A' as any,
    activity:
      'Recepcionar las solicitudes que efectúe la comunidad en general ante la Secretaría de Gobierno, que impliquen únicamente información sobre oferta institucional o funciones de la Secretaría de Gobierno. Cuando se realicen peticiones verbales se agotará el trámite propio de las peticiones.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'fin',
    number: 2,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const respuestaAccionesTutelaPopularesCumplimientoGrupoSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'rap-03-1',
    number: 1,
    type: 'activity',
    label: 'Recibir el documento y remitirlo según competencia',
    cycle: 'P',
    activity:
      'Recibir el documento y remitirlo a la Secretaría de Gobierno, cuando considere que es de su competencia. Para esto, se observan las disposiciones del Decreto que reglamente lo pertinente del proceso de remisión de correspondencia.',
    responsible: 'Ventanilla Única',
  },
  {
    id: 'rap-03-2',
    number: 2,
    type: 'activity',
    label: 'Determinar el tipo de acción constitucional',
    cycle: 'H',
    activity:
      'Determinar el tipo de acción constitucional que ha sido remitida al despacho.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'rap-03-3',
    number: 3,
    type: 'activity',
    label: 'Establecer competencia para dar respuesta',
    cycle: 'V',
    activity:
      'Se establecerá la competencia para dar respuesta.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'rap-03-4',
    number: 4,
    type: 'activity',
    label: 'Remitir documento a la oficina competente',
    cycle: 'A',
    activity:
      'Remitir el documento a la oficina competente para dar respuesta, dependencia que será responsable a partir del momento de la remisión, de dar respuesta debida al documento.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'rap-03-5',
    number: 5,
    type: 'activity',
    label: 'Dar respuesta al despacho judicial',
    cycle: 'A',
    activity:
      'Dar respuesta al despacho judicial que conozca de la misma, de conformidad con las normas que regulen cada acción.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'fin',
    number: 6,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const ventanillaUnicaCorrespondenciaSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'vuc-04-1',
    number: 1,
    type: 'activity',
    label: 'Recepcionar la correspondencia diaria',
    cycle: 'P',
    activity:
      'Recepcionar la correspondencia diaria que llega a la ventanilla, utilizando sello de recibido, el cual contiene fecha, hora y firma del funcionario que recibe.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'vuc-04-2',
    number: 2,
    type: 'activity',
    label: 'Clasificar y radicar correspondencia',
    cycle: 'P',
    activity:
      'Clasificar y radicar en el formato de distribución de correspondencia todos los documentos, indicando fecha, hora, número de radicado, número de oficio, nombre de la persona que entrega o empresa o institución que remite, asunto del oficio, número de folios, anexos y destinatario de los documentos.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'vuc-04-3',
    number: 3,
    type: 'activity',
    label: 'Entregar documentos para distribución',
    cycle: 'H',
    activity:
      'Entregar los documentos para distribución, radicados en la planilla correspondiente.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'vuc-04-4',
    number: 4,
    type: 'activity',
    label: 'Entregar correspondencia en la dependencia',
    cycle: 'H',
    activity:
      'Entregar la correspondencia en la dependencia y hacer firmar la planilla como soporte de la entrega.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'vuc-04-5',
    number: 5,
    type: 'decision',
    label: '¿Está de conformidad?',
    cycle: 'V',
    activity:
      'Verificar los documentos relacionados en la planilla de correspondencia.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
    branches: [
      {
        label: 'NO',
        targetStepId: 'vuc-04-6',
        note:
          'Si no está conforme, rechaza y devuelve para la oficina de correspondencia sin recibido.',
      },
      {
        label: 'SÍ',
        targetStepId: 'vuc-04-7',
        note:
          'Si está conforme, continúa con la recolección de correspondencia de la dependencia.',
      },
    ],
  },
  {
    id: 'vuc-04-6',
    number: 6,
    type: 'activity',
    label: 'Rechazar y devolver correspondencia',
    cycle: 'V',
    activity:
      'Rechaza y devuelve para la oficina de correspondencia sin recibido.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'vuc-04-7',
    number: 7,
    type: 'activity',
    label: 'Recoger correspondencia de la dependencia',
    cycle: 'A',
    activity:
      'Recoger la correspondencia de la dependencia, junto con la planilla de recolección correspondiente.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'vuc-04-8',
    number: 8,
    type: 'activity',
    label: 'Entregar correspondencia recogida',
    cycle: 'A',
    activity:
      'Entregar la correspondencia recogida en cada una de las dependencias, junto con las planillas de recolección y distribución respectivamente.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'vuc-04-9',
    number: 9,
    type: 'activity',
    label: 'Clasificar correspondencia recibida',
    cycle: 'A',
    activity:
      'Clasificar la correspondencia recibida para su distribución. Si es comunicación interna, radica nuevamente en la planilla de distribución interna diaria recibida. Si es comunicación externa, el oficio deberá traer original y copia; así como el sobre debidamente elaborado con los datos del destinatario, el cual será radicado en la planilla de correspondencia externa.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'vuc-04-10',
    number: 10,
    type: 'document',
    label: 'Archivar planilla de entrega y recolección',
    cycle: 'A',
    activity:
      'Archivar la planilla de entrega y recolección de correspondencia según consecutivo y lineamientos de archivo.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'fin',
    number: 11,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const mantenimientoPlantaSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'mp-01-1',
    number: 1,
    type: 'activity',
    label: 'Realizar plan de mantenimiento a las redes',
    cycle: 'P',
    activity:
      'Realizar plan de mantenimiento a las redes de acueducto y alcantarillado del municipio.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'mp-01-2',
    number: 2,
    type: 'activity',
    label: 'Realizar mantenimiento de redes',
    cycle: 'H',
    activity:
      'Realizar mantenimiento de las redes de acueducto y alcantarillado.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'mp-01-3',
    number: 3,
    type: 'activity',
    label: 'Informar necesidad de personal e insumos',
    cycle: 'H',
    activity:
      'Informar al Alcalde la necesidad de personal y de insumos.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'mp-01-4',
    number: 4,
    type: 'activity',
    label: 'Entregar insumos para tratamiento del agua',
    cycle: 'H',
    activity:
      'Entregar los insumos para el tratamiento del agua.',
    responsible: 'Almacenista',
  },
  {
    id: 'mp-01-5',
    number: 5,
    type: 'activity',
    label: 'Realizar mantenimiento con químicos necesarios',
    cycle: 'H',
    activity:
      'Realizar mantenimiento con los químicos necesarios a la planta de tratamiento y a las áreas externas.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'mp-01-6',
    number: 6,
    type: 'activity',
    label: 'Revisar mantenimiento realizado',
    cycle: 'V',
    activity:
      'Revisar que el mantenimiento se haya realizado teniendo en cuenta los planteamientos técnicos.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'mp-01-7',
    number: 7,
    type: 'document',
    label: 'Elaborar informes de mantenimiento',
    cycle: 'A',
    activity:
      'Elaborar informes de mantenimientos realizados de la Unidad de Servicios Públicos.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'fin',
    number: 8,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const mantenimientoFloculadoresSedimentadoresSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'mfs-02-1',
    number: 1,
    type: 'activity',
    label: 'Programar proceso de mantenimiento',
    cycle: 'P',
    activity:
      'Programar el proceso de mantenimiento.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'mfs-02-2',
    number: 2,
    type: 'activity',
    label: 'Cerrar válvula de ingreso al primer filtro',
    cycle: 'H',
    activity:
      'Cerrar la válvula de ingreso al primer filtro.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'mfs-02-3',
    number: 3,
    type: 'activity',
    label: 'Abrir válvula de purga',
    cycle: 'H',
    activity:
      'Abrir la válvula de purga y el agua se dirige a la tubería de drenaje.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'mfs-02-4',
    number: 4,
    type: 'activity',
    label: 'Vaciar floculador o sedimentador',
    cycle: 'H',
    activity:
      'Vaciar el floculador o el sedimentador, lavar con escoba y cepillo las paredes y el fondo, limpiar las tuberías de distribución de flujo y de recolección; todo esto se realiza con la válvula de purga abierta.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'mfs-02-5',
    number: 5,
    type: 'activity',
    label: 'Comprobar limpieza realizada',
    cycle: 'V',
    activity:
      'Comprobar que la limpieza se haya realizado bajo los estándares correctos.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'mfs-02-6',
    number: 6,
    type: 'activity',
    label: 'Cerrar válvula de purga y abrir válvula de ingreso',
    cycle: 'A',
    activity:
      'Cerrar la válvula de purga y proceder a abrir paulatinamente la válvula de ingreso del agua.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'mfs-02-7',
    number: 7,
    type: 'document',
    label: 'Elaborar informes de mantenimiento',
    cycle: 'A',
    activity:
      'Elaborar informes sobre mantenimiento a floculadores y sedimentadores, incluyendo fecha, estado y responsables de limpieza.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'fin',
    number: 8,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const lavadoFiltrosSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'lf-03-1',
    number: 1,
    type: 'activity',
    label: 'Programar proceso de mantenimiento',
    cycle: 'P',
    activity:
      'Programar el proceso de mantenimiento.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'lf-03-2',
    number: 2,
    type: 'activity',
    label: 'Cerrar válvula afluente al filtro',
    cycle: 'P',
    activity:
      'Cerrar la válvula afluente al filtro que se va a lavar, de manera que se cierre la entrada de agua al filtro.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'lf-03-3',
    number: 3,
    type: 'activity',
    label: 'Abrir compuerta de lavado',
    cycle: 'H',
    activity:
      'Abrir la compuerta de lavado, dejar escurrir y con manguera a presión empezar el lavado.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'lf-03-4',
    number: 4,
    type: 'activity',
    label: 'Permitir lavado del filtro',
    cycle: 'H',
    activity:
      'Permitir el lavado del filtro durante un promedio de diez (10) minutos.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'lf-03-5',
    number: 5,
    type: 'activity',
    label: 'Cerrar compuerta de lavado y abrir afluente',
    cycle: 'H',
    activity:
      'Cerrar la compuerta de lavado y abrir la compuerta afluente, para iniciar nuevamente la operación normal del filtro.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'lf-03-6',
    number: 6,
    type: 'activity',
    label: 'Verificar que no escape material filtrante',
    cycle: 'V',
    activity:
      'Verificar que no se escape material filtrante por el canal de aguas de lavado.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'lf-03-7',
    number: 7,
    type: 'document',
    label: 'Registrar labores de operación y mantenimiento',
    cycle: 'A',
    activity:
      'Registrar en los formatos de control todas las labores de operación y mantenimiento que se realicen en esta estructura.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'fin',
    number: 8,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const nuevosUsuariosSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'un-04-1',
    number: 1,
    type: 'activity',
    label: 'Presentar solicitud verbal o escrita',
    cycle: 'P',
    activity:
      'Presentar solicitud verbal o escrita en la Secretaría de Medio Ambiente, de forma personal, correo o los demás medios que permitan conocer la voluntad de vincularse como usuario de los servicios.',
    responsible: 'Usuario',
  },
  {
    id: 'un-04-2',
    number: 2,
    type: 'document',
    label: 'Diligenciar formato de solicitud',
    cycle: 'P',
    activity:
      'Diligenciar el formato de solicitud, radicando ante la Secretaría de Medio Ambiente y Desarrollo Económico.',
    responsible: 'Usuario',
  },
  {
    id: 'un-04-3',
    number: 3,
    type: 'decision',
    label: '¿Se aprobó?',
    cycle: 'P',
    activity:
      'Tomar decisión dentro de los quince (15) días hábiles siguientes a la presentación de la solicitud: aprobar, negar o solicitar prueba, informe o documento adicional.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
    branches: [
      {
        label: 'NO',
        targetStepId: 'un-04-3-no',
        note:
          'Si no se aprueba, se niega la solicitud o se solicita información adicional.',
      },
      {
        label: 'SÍ',
        targetStepId: 'un-04-4',
        note:
          'Si se aprueba, continúa la aprobación del servicio según concepto técnico.',
      },
    ],
  },
  {
    id: 'un-04-3-no',
    number: 3,
    type: 'activity',
    label: 'Negar la solicitud',
    cycle: 'P',
    activity:
      'Negar la solicitud por razones técnicas, expresando los motivos y la fecha en que se resolverá o dará respuesta.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'un-04-4',
    number: 4,
    type: 'activity',
    label: 'Aprobar servicio según concepto técnico',
    cycle: 'H',
    activity:
      'Aprobar servicio según concepto técnico.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'un-04-5',
    number: 5,
    type: 'software',
    label: 'Registrar usuario en el software',
    cycle: 'H',
    activity:
      'Registrar el usuario en el software, con datos tales como nombre, identificación, dirección, NIT catastral del predio y estrato socioeconómico del predio.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'un-04-6',
    number: 6,
    type: 'activity',
    label: 'Autorizar al operario para realizar proceso',
    cycle: 'H',
    activity:
      'Autorizar al operario para realizar proceso.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'un-04-7',
    number: 7,
    type: 'activity',
    label: 'Elaborar presupuesto para conectar el inmueble',
    cycle: 'H',
    activity:
      'Elaborar el presupuesto para conectar el inmueble por primera vez.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'un-04-8',
    number: 8,
    type: 'document',
    label: 'Aceptar prestación del servicio',
    cycle: 'H',
    activity:
      'Aceptar la prestación del servicio, con firma del contrato de servicios públicos, con copia al usuario.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'un-04-9',
    number: 9,
    type: 'document',
    label: 'Expedir orden para acometida o conexión domiciliaria',
    cycle: 'H',
    activity:
      'Expedir la orden para la acometida o conexión domiciliaria.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'un-04-10',
    number: 10,
    type: 'document',
    label: 'Elaborar formato de prestación',
    cycle: 'V',
    activity:
      'Elaborar formato de prestación.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'fin',
    number: 11,
    type: 'end',
    label: 'FIN',
    cycle: 'A',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const instalacionConexionDomiciliariaSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'icd-05-1',
    number: 1,
    type: 'activity',
    label: 'Presentar solicitud verbal o escrita',
    cycle: 'P',
    activity:
      'Presentar solicitud verbal o escrita en la Secretaría de Medio Ambiente, de forma personal, correo o los demás medios que permitan conocer la voluntad de vincularse como usuario de los servicios.',
    responsible: 'Usuario',
  },
  {
    id: 'icd-05-2',
    number: 2,
    type: 'document',
    label: 'Diligenciar formato de solicitud',
    cycle: 'P',
    activity:
      'Diligenciar el formato de solicitud, radicando ante la Secretaría de Medio Ambiente y Desarrollo Económico.',
    responsible: 'Usuario',
  },
  {
    id: 'icd-05-3',
    number: 3,
    type: 'decision',
    label: '¿Se aprobó?',
    cycle: 'P',
    activity:
      'Tomar decisión dentro de los quince (15) días hábiles siguientes a la presentación de la solicitud: aprobar, negar o solicitar prueba, informe o documento adicional.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
    branches: [
      {
        label: 'NO',
        targetStepId: 'icd-05-3-no',
        note:
          'Si no se aprueba, se niega la solicitud o se solicita información adicional.',
      },
      {
        label: 'SÍ',
        targetStepId: 'icd-05-4',
        note:
          'Si se aprueba, continúa la aprobación del servicio según concepto técnico.',
      },
    ],
  },
  {
    id: 'icd-05-3-no',
    number: 3,
    type: 'activity',
    label: 'Negar la solicitud',
    cycle: 'P',
    activity:
      'Negar la solicitud por razones técnicas, expresando los motivos y la fecha en que se resolverá o dará respuesta.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'icd-05-4',
    number: 4,
    type: 'activity',
    label: 'Aprobar servicio según concepto técnico',
    cycle: 'H',
    activity:
      'Aprobar servicio según concepto técnico.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'icd-05-5',
    number: 5,
    type: 'software',
    label: 'Registrar usuario en el software',
    cycle: 'H',
    activity:
      'Registrar el usuario en el software, con datos tales como nombre, identificación, dirección, NIT catastral del predio y estrato socioeconómico del predio.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'icd-05-6',
    number: 6,
    type: 'activity',
    label: 'Autorizar al operario para realizar proceso',
    cycle: 'H',
    activity:
      'Autorizar al operario para realizar proceso.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'icd-05-7',
    number: 7,
    type: 'activity',
    label: 'Elaborar presupuesto para conectar el inmueble',
    cycle: 'H',
    activity:
      'Elaborar el presupuesto para conectar el inmueble por primera vez.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'icd-05-8',
    number: 8,
    type: 'document',
    label: 'Aceptar prestación del servicio',
    cycle: 'H',
    activity:
      'Aceptar la prestación del servicio, con firma del contrato de servicios públicos, con copia al usuario.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'icd-05-9',
    number: 9,
    type: 'document',
    label: 'Expedir orden para acometida o conexión domiciliaria',
    cycle: 'H',
    activity:
      'Expedir la orden para la acometida o conexión domiciliaria.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'icd-05-10',
    number: 10,
    type: 'document',
    label: 'Elaborar formato de prestación',
    cycle: 'V',
    activity:
      'Elaborar formato de prestación.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'fin',
    number: 11,
    type: 'end',
    label: 'FIN',
    cycle: 'A',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const facturacionServiciosPublicosSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'fsp-06-1',
    number: 1,
    type: 'activity',
    label: 'Ingresar al módulo de facturación del sistema',
    cycle: 'P',
    activity:
      'Ingresar al módulo de facturación del sistema. Seguir los pasos: Menú / informes / mantenimiento de datos / Backup (copia de seguridad).',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'fsp-06-2',
    number: 2,
    type: 'activity',
    label: 'Configurar el período',
    cycle: 'H',
    activity:
      'Configurar el período siguiendo la ruta: Menú / movimientos / actualización de período.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'fsp-06-3',
    number: 3,
    type: 'activity',
    label: 'Crear el período a facturar',
    cycle: 'H',
    activity:
      'Ingresar a períodos de facturación y crear el período a facturar, indicando primera fecha, segunda fecha y fechas de tomas de lectura. Se procede a guardar y salir.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'fsp-06-4',
    number: 4,
    type: 'activity',
    label: 'Copiar tarifas del período anterior',
    cycle: 'H',
    activity:
      'Ingresar al menú configuración / tarifas / traer tarifas del período anterior al nuevo (año / período destino) / copiar tarifas. Se procede a guardar y salir.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'fsp-06-5',
    number: 5,
    type: 'activity',
    label: 'Ingresar lecturas del período',
    cycle: 'H',
    activity:
      'Ingresar a lecturas de período y toma de lecturas. Existen los siguientes parámetros: ciclo, año, período, ruta inicial-final, aforador u operarios, lectura anterior, usuario y calcular. Se cierra el link de toma de lecturas.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'fsp-06-6',
    number: 6,
    type: 'activity',
    label: 'Ejecutar proceso de crítica',
    cycle: 'V',
    activity:
      'Proceso de crítica: ingresar al menú movimientos y dar clic en crítica de consumos para correr el proceso de crítica. Después de las revisiones de recaudo, se hace el cierre-análisis. En menú movimientos se hace el cierre de período, indicando año y período a cerrar (mes inmediatamente anterior), dando clic en siguiente; el sistema lo realiza automáticamente. Al finalizar se cierra el link y se regresa al menú.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'fsp-06-7',
    number: 7,
    type: 'activity',
    label: 'Calcular facturación',
    cycle: 'V',
    activity:
      'Ingresar al menú movimientos / facturación / calcular facturación, indicando ciclo, año, período y rutas, y ejecutar el cálculo (proceso que demora aproximadamente 2 minutos). Cerrar link.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'fsp-06-8',
    number: 8,
    type: 'activity',
    label: 'Consultar usuarios facturados',
    cycle: 'A',
    activity:
      'Ingresar al menú movimientos / consulta de facturación y revisar todos los usuarios facturados. Este último paso se puede realizar por pantalla o por listado de facturación impreso.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'fsp-06-9',
    number: 9,
    type: 'activity',
    label: 'Imprimir facturación',
    cycle: 'A',
    activity: 'Imprimir facturación.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'fsp-06-10',
    number: 10,
    type: 'activity',
    label: 'Elaborar boletín informativo',
    cycle: 'A',
    activity:
      'Elaborar boletín informativo sólo a deudores morosos o boletín de suspensión.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'fsp-06-11',
    number: 11,
    type: 'activity',
    label: 'Entregar facturas al operador',
    cycle: 'A',
    activity:
      'Entregar al operador las facturas a distribuir a los usuarios puerta a puerta.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'fin',
    number: 12,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const modificacionesFacturacionSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'mf-07-1',
    number: 1,
    type: 'activity',
    label: 'Reclamar de manera verbal o escrita',
    cycle: 'P',
    activity: 'Reclamar de manera verbal o escrita, durante el tiempo de pago.',
    responsible: 'Usuario',
  },
  {
    id: 'mf-07-2',
    number: 2,
    type: 'activity',
    label: 'Revisar si la petición es viable',
    cycle: 'H',
    activity:
      'Revisar si la petición es viable. Si es viable se hace el trámite de inmediato; en caso contrario se da la respuesta de negación al usuario.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'mf-07-3',
    number: 3,
    type: 'activity',
    label: 'Ingresar a consulta factura',
    cycle: 'H',
    activity: 'Ingresar a consulta factura, seleccionar usuario y corregir o modificar la factura/calcular.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'mf-07-4',
    number: 4,
    type: 'activity',
    label: 'Verificar registro diligenciado',
    cycle: 'V',
    activity: 'Verificar que el registro haya quedado diligenciado correctamente.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'mf-07-5',
    number: 5,
    type: 'activity',
    label: 'Imprimir y entregar factura corregida',
    cycle: 'A',
    activity: 'Finalmente se procede a imprimir y entregar la factura corregida al usuario.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'fin',
    number: 6,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const recaudoServiciosPublicosSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'rsp-08-1',
    number: 1,
    type: 'activity',
    label: 'Recibir factura expedida',
    cycle: 'P',
    activity: 'Recibir la factura expedida por la unidad de servicios públicos, con el dinero a pagar.',
    responsible: 'Secretaría de Hacienda',
  },
  {
    id: 'rsp-08-2',
    number: 2,
    type: 'activity',
    label: 'Ingresar al módulo de facturación',
    cycle: 'H',
    activity: 'Ingresar al módulo de facturación del sistema.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'rsp-08-3',
    number: 3,
    type: 'activity',
    label: 'Digitar usuario, clave y continuar',
    cycle: 'H',
    activity: 'Digitar el nombre del usuario, la clave y finalmente dar la opción de continuar.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'rsp-08-4',
    number: 4,
    type: 'activity',
    label: 'Seleccionar servicios públicos',
    cycle: 'H',
    activity: 'Seleccionar la opción servicios públicos / facturación de servicios públicos.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'rsp-08-5',
    number: 5,
    type: 'activity',
    label: 'Digitar año y mes facturado',
    cycle: 'H',
    activity: 'Digitar el año y mes facturado / ingreso por bancos.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'rsp-08-6',
    number: 6,
    type: 'activity',
    label: 'Ingresar factura según código',
    cycle: 'H',
    activity: 'Ingresar la factura según: 1. Código de ingreso, 2. Ruta, 3. No. de factura.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'rsp-08-7',
    number: 7,
    type: 'activity',
    label: 'Verificar valor total pagado',
    cycle: 'V',
    activity:
      'Verificar que el valor total pagado y el número de la factura se acumulen a los valores que se estén ingresando por cada paquete.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'rsp-08-8',
    number: 8,
    type: 'activity',
    label: 'Generar listado de recaudos',
    cycle: 'V',
    activity: 'Generar el listado de recaudos, es decir, el valor total del paquete por cada servicio.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'rsp-08-9',
    number: 9,
    type: 'activity',
    label: 'Dar interfaz contable',
    cycle: 'A',
    activity: 'Dar a interfaz contable / facturación de acueducto y alcantarillado.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'rsp-08-10',
    number: 10,
    type: 'activity',
    label: 'Enviar información a contabilidad y presupuesto',
    cycle: 'A',
    activity: 'El sistema envía información a contabilidad y presupuesto.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'fin',
    number: 11,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const reporteSubsidioServiciosPublicosSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'rssp-09-1',
    number: 1,
    type: 'activity',
    label: 'Seleccionar sistema de información financiero',
    cycle: 'P',
    activity:
      'Seleccionar en el equipo de cómputo de la Secretaría de Medio Ambiente el ícono del sistema de información financiero de la entidad.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'rssp-09-2',
    number: 2,
    type: 'activity',
    label: 'Ingresar al sistema',
    cycle: 'H',
    activity:
      'Ingresar al sistema teniendo en cuenta el nombre del usuario, la clave y finalmente dar la opción de continuar.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'rssp-09-3',
    number: 3,
    type: 'activity',
    label: 'Registrar proceso de pago de subsidios',
    cycle: 'H',
    activity:
      'Registrar en el sistema para el proceso de pagos en subsidios, seleccionando el ciclo, año, período y resumen.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'rssp-09-4',
    number: 4,
    type: 'activity',
    label: 'Revisar diligenciamiento',
    cycle: 'V',
    activity: 'Revisar el diligenciamiento en el sistema.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'rssp-09-5',
    number: 5,
    type: 'decision',
    label: 'Adoptar las recomendaciones',
    cycle: 'A',
    activity: 'Adoptar las recomendaciones que se hagan en la Secretaría de Hacienda.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
    branches: [
      { label: 'NO', targetStepId: 'rssp-09-4' },
      { label: 'SI', targetStepId: 'fin' },
    ],
  },
  {
    id: 'fin',
    number: 6,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const acuerdoPagoSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'ap-10-1',
    number: 1,
    type: 'activity',
    label: 'Clasificar usuarios por tiempo de mora',
    cycle: 'P',
    activity:
      'Clasificar a los usuarios por tiempo de mora, con el software, a fin de invitar mediante una circular, carta u oficio a los usuarios de mayor antigüedad, a establecer un convenio de pago con la entidad.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'ap-10-2',
    number: 2,
    type: 'activity',
    label: 'Comunicar al usuario',
    cycle: 'H',
    activity:
      'Comunicar por escrito o verbal en la Unidad de Servicios Públicos, bien de modo personal, por correo o por otros medios que permitan conocer la voluntad e iniciativa del usuario o suscriptor, identificando la razón del no pago de su factura.',
    responsible: 'Usuario',
  },
  {
    id: 'ap-10-3',
    number: 3,
    type: 'activity',
    label: 'Aprobar beneficios y acuerdo de pago',
    cycle: 'H',
    activity: 'Aprobar beneficios para ambas partes y aprobar el acuerdo de pago.',
    responsible: 'Alcalde',
  },
  {
    id: 'ap-10-4',
    number: 4,
    type: 'activity',
    label: 'Suscribir acuerdo de pago',
    cycle: 'H',
    activity: 'Suscribir el acuerdo por escrito en un documento o acta de compromiso firmado por las partes.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'ap-10-5',
    number: 5,
    type: 'activity',
    label: 'Suscribir acta de compromiso',
    cycle: 'H',
    activity: 'Suscribir el acuerdo por escrito en un documento o acta de compromiso firmado por las partes.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'ap-10-6',
    number: 6,
    type: 'activity',
    label: 'Pactar cuota y duración de financiación',
    cycle: 'H',
    activity: 'Pactar con el usuario la cuota y la duración de la financiación.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'ap-10-7',
    number: 7,
    type: 'activity',
    label: 'Registrar condiciones de pago',
    cycle: 'V',
    activity: 'Registrar las condiciones de pago en el respectivo acuerdo.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'ap-10-8',
    number: 8,
    type: 'activity',
    label: 'Suscribir acuerdo de pago',
    cycle: 'V',
    activity: 'Se suscribe el respectivo acuerdo de pago.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'ap-10-9',
    number: 9,
    type: 'activity',
    label: 'Registrar novedad de facturación',
    cycle: 'A',
    activity:
      'Elaborar la novedad a facturación para efectos del pago de las cuotas. Si se pactó una cuota inicial, dicha novedad procede a registrarse en el aplicativo.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'ap-10-10',
    number: 10,
    type: 'activity',
    label: 'Controlar aplicación de pagos',
    cycle: 'A',
    activity:
      'Controlar que se apliquen a la facturación los pagos aprobados en el convenio y que el suscriptor esté efectivamente cumpliendo con el acuerdo de pago.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'fin',
    number: 11,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const obrasInfraestructuraSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'oi-05-1',
    number: 1,
    type: 'activity',
    label: 'Asignar la supervisión de la obra',
    cycle: 'P',
    activity: 'Asignar la supervisión de la obra.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'oi-05-2',
    number: 2,
    type: 'activity',
    label: 'Suscribir el acta de inicio de los contratos',
    cycle: 'H',
    activity: 'Suscribir el acta de inicio de los contratos.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'oi-05-3',
    number: 3,
    type: 'activity',
    label: 'Actualizar las pólizas conforme al acta de inicio',
    cycle: 'H',
    activity: 'Actualizar las pólizas conforme al acta de inicio.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'oi-05-4',
    number: 4,
    type: 'activity',
    label: 'Revisar las garantías contractuales',
    cycle: 'H',
    activity: 'Revisar las garantías contractuales.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'oi-05-5',
    number: 5,
    type: 'activity',
    label: 'Realizar seguimiento a la ejecución del objeto contractual',
    cycle: 'H',
    activity: 'Realizar seguimiento a la ejecución del objeto contractual.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'oi-05-6',
    number: 6,
    type: 'activity',
    label: 'Realizar la ampliación de garantías contractuales',
    cycle: 'H',
    activity: 'Realizar la ampliación de garantías contractuales.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'oi-05-7',
    number: 7,
    type: 'activity',
    label: 'Atender y hacer seguimiento a quejas o reclamaciones',
    cycle: 'H',
    activity: 'Atender y hacer seguimiento a quejas o reclamaciones.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'oi-05-8',
    number: 8,
    type: 'activity',
    label: 'Revisar los cambios de actividades de obra adicional y actividades de obra extra',
    cycle: 'H',
    activity: 'Revisar los cambios de actividades de obra adicional y actividades de obra extra.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'oi-05-9',
    number: 9,
    type: 'activity',
    label: 'Autorizar mayores valores',
    cycle: 'H',
    activity: 'Autorizar mayores valores, que superen el valor total del contrato.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'oi-05-10',
    number: 10,
    type: 'activity',
    label: 'Justificar las modificaciones',
    cycle: 'H',
    activity: 'Justificar las modificaciones contractuales.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'oi-05-11',
    number: 11,
    type: 'activity',
    label: 'Informar causales de aplicación de multas y sanciones',
    cycle: 'V',
    activity: 'Informar causales de aplicación de multas y sanciones en caso de incumplimientos.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'oi-05-12',
    number: 12,
    type: 'activity',
    label: 'Suscribir el informe de interventoría y acta de pago',
    cycle: 'V',
    activity: 'Suscribir el informe de interventoría y acta de pago.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'oi-05-13',
    number: 13,
    type: 'activity',
    label: 'Suscribir la orden de pago',
    cycle: 'V',
    activity: 'Suscribir la orden de pago.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'oi-05-14',
    number: 14,
    type: 'activity',
    label: 'Recibir a entera satisfacción la ejecución del contrato',
    cycle: 'V',
    activity: 'Recibir a entera satisfacción la ejecución del contrato.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'oi-05-15',
    number: 15,
    type: 'activity',
    label: 'Entregar la obra pública al administrador del bien',
    cycle: 'A',
    activity: 'Entregar la obra pública al administrador del bien.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'oi-05-16',
    number: 16,
    type: 'activity',
    label: 'Realizar la liquidación del contrato',
    cycle: 'A',
    activity: 'Realizar la liquidación del contrato.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'oi-05-17',
    number: 17,
    type: 'activity',
    label: 'Realizar el informe final o de cierre',
    cycle: 'A',
    activity: 'Realizar el informe final o de cierre.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'oi-05-18',
    number: 18,
    type: 'activity',
    label: 'Realizar seguimiento a la ejecución del procedimiento',
    cycle: 'A',
    activity: 'Realizar seguimiento a la ejecución del procedimiento e identificar oportunidades de mejoramiento.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'oi-05-19',
    number: 19,
    type: 'activity',
    label: 'Aplicar las acciones de mejoramiento',
    cycle: 'A',
    activity: 'Aplicar las acciones de mejoramiento establecidas y realizar seguimiento a su eficacia.',
    responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura',
  },
  {
    id: 'fin',
    number: 20,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const comisionServiciosSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'cs-01-1',
    number: 1,
    type: 'activity',
    label: 'Solicitar la comisión al Señor Alcalde',
    cycle: 'P',
    activity:
      'Solicitar la comisión al Señor Alcalde de la necesidad de hacer presencia desarrollando funciones en lugar diferente al habitual de trabajo, en reunión o eventos de capacitación, desarrollo de proyectos, entre otros, por parte de uno o varios funcionarios del Municipio.',
    responsible: 'Interesado',
  },
  {
    id: 'cs-01-2',
    number: 2,
    type: 'activity',
    label: 'Analizar la solicitud',
    cycle: 'P',
    activity:
      'Analizar la solicitud, observar su concordancia con programas de capacitación u otros programas aprobados y determinar los costos en que incurrirá la entidad, tales como viáticos, gastos de viaje e inscripciones.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'cs-01-3',
    number: 3,
    type: 'activity',
    label: 'Decidir sobre la solicitud',
    cycle: 'P',
    activity: 'Decidir sobre la solicitud ordenando proyectar resolución de comisión.',
    responsible: 'Alcalde',
  },
  {
    id: 'cs-01-4',
    number: 4,
    type: 'activity',
    label: 'Verificar disponibilidad presupuestal',
    cycle: 'H',
    activity:
      'Verificar si hay disponibilidad presupuestal para presentar al Señor Alcalde la solicitud.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'cs-01-5',
    number: 5,
    type: 'activity',
    label: 'Imprimir y pasar para revisión',
    cycle: 'H',
    activity:
      'Imprimir y pasar para revisión y visto bueno de la Secretaría de Gobierno y remitir al Despacho del Alcalde.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'cs-01-6',
    number: 6,
    type: 'activity',
    label: 'Revisión y firma',
    cycle: 'H',
    activity: 'Revisión y firma.',
    responsible: 'Alcalde',
  },
  {
    id: 'cs-01-7',
    number: 7,
    type: 'activity',
    label: 'Desarrollar procedimiento de acto administrativo',
    cycle: 'H',
    activity:
      'Desarrollar procedimiento para elaboración de actos administrativos del Despacho del Alcalde y remitir a Secretaría de Gobierno, conforme al procedimiento predefinido para elaboración de actos administrativos.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'cs-01-8',
    number: 8,
    type: 'activity',
    label: 'Recibir resolución y comunicar',
    cycle: 'H',
    activity:
      'Recibir resolución, comunicar y disponer de copias para archivo. Informar las novedades para afectación de nómina, coordinación de apoyo logístico y pagos a que haya lugar, aplicando los procedimientos establecidos.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'cs-01-9',
    number: 9,
    type: 'activity',
    label: 'Comunicar al funcionario comisionado',
    cycle: 'V',
    activity:
      'Comunicar al funcionario comisionado entregando copia de la resolución de comisión y archivando el original en la hoja de vida.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'cs-01-10',
    number: 10,
    type: 'activity',
    label: 'Coordinar con el superior inmediato',
    cycle: 'V',
    activity:
      'Coordinar con el superior inmediato del funcionario comisionado la forma de sustituirlo temporalmente si es necesario y proyectar los actos administrativos respectivos en coordinación con el Alcalde.',
    responsible: 'Secretaría de Gobierno / Alcalde',
  },
  {
    id: 'cs-01-11',
    number: 11,
    type: 'activity',
    label: 'Verificar reintegro del comisionado',
    cycle: 'V',
    activity: 'Verificar que el comisionado se reintegre al finalizar el periodo de la comisión.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'cs-01-12',
    number: 12,
    type: 'activity',
    label: 'Presentar informes de las gestiones realizadas',
    cycle: 'A',
    activity: 'Presentar los informes respectivos de las gestiones realizadas.',
    responsible: 'Interesado',
  },
  {
    id: 'fin',
    number: 13,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const certificacionesLaboralesSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'cs-02-1',
    number: 1,
    type: 'activity',
    label: 'Recepcionar y radicar la solicitud con estampillas',
    cycle: 'P',
    activity:
      'Recibir, recepcionar y radicar la solicitud del interesado junto con las estampillas requeridas, expedidas en Tesorería y canceladas en el banco correspondiente.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'cs-02-2',
    number: 2,
    type: 'activity',
    label: 'Verificar información y elaborar certificado',
    cycle: 'H',
    activity:
      'Recibir la solicitud, verificar la información solicitada en la base de datos del archivo de nómina o en el archivo de las hojas de vida y elaborar la certificación.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'cs-02-3',
    number: 3,
    type: 'activity',
    label: 'Revisar y verificar',
    cycle: 'V',
    activity: 'Dar visto bueno si la información requerida es conforme a lo solicitado.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'cs-02-4',
    number: 4,
    type: 'activity',
    label: 'Revisar y firmar',
    cycle: 'V',
    activity: 'Enviar la certificación para la revisión y firma a la Secretaría de Gobierno.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'cs-02-5',
    number: 5,
    type: 'activity',
    label: 'Recepcionar, entregar y archivar',
    cycle: 'A',
    activity:
      'Radicar la certificación en el archivo central y realizar su posterior entrega al solicitante.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'fin',
    number: 6,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const concesionVacacionesSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'cv-03-1',
    number: 1,
    type: 'activity',
    label: 'Radicar la solicitud a más tardar el 20 de enero',
    cycle: 'P',
    activity: 'Radicar la solicitud a más tardar el 20 de enero de cada año.',
    responsible: 'Funcionario',
  },
  {
    id: 'cv-03-2',
    number: 2,
    type: 'activity',
    label: 'Radicar los listados en la Secretaría de Gobierno',
    cycle: 'P',
    activity: 'Radicar los listados en la Secretaría de Gobierno.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'cv-03-3',
    number: 3,
    type: 'activity',
    label: 'Elaborar el anteproyecto del Plan Anual de Vacaciones',
    cycle: 'P',
    activity:
      'Elaborar el anteproyecto del Plan Anual de Vacaciones teniendo en cuenta dar prioridad a quienes tienen vacaciones acumuladas.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'cv-03-4',
    number: 4,
    type: 'activity',
    label: 'Comunicar a todos los funcionarios',
    cycle: 'P',
    activity:
      'Comunicar a todos los funcionarios sobre el periodo asignado para tomar sus vacaciones, para que estos formulen inquietudes y observaciones respecto del mismo y se realicen los ajustes.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'cv-03-5',
    number: 5,
    type: 'activity',
    label: 'Concertar y viabilizar el anteproyecto',
    cycle: 'P',
    activity: 'Concertar y viabilizar el anteproyecto con los jefes de oficina.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'cv-03-6',
    number: 6,
    type: 'activity',
    label: 'Coordinar solicitudes de vacaciones',
    cycle: 'H',
    activity:
      'Coordinar con el jefe las solicitudes de vacaciones para iniciar trámite, quince días antes de causarse las vacaciones, si es necesario avisar al jefe inmediato de la persona para recordarle el disfrute a que tiene derecho el empleado.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'cv-03-7',
    number: 7,
    type: 'activity',
    label: 'Proyectar resolución de reconocimiento',
    cycle: 'H',
    activity:
      'Proyectar la resolución reconociendo el periodo vacacional y, si fuere necesario, en la misma designando su reemplazo.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'cv-03-8',
    number: 8,
    type: 'activity',
    label: 'Revisar y dar aval',
    cycle: 'V',
    activity: 'Revisar y dar aval.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'cv-03-9',
    number: 9,
    type: 'activity',
    label: 'Firmar la resolución',
    cycle: 'A',
    activity:
      'Firmar la resolución ocho días antes a la fecha de comienzo del disfrute de las vacaciones y pasar para novedades de nómina.',
    responsible: 'Alcalde',
  },
  {
    id: 'cv-03-10',
    number: 10,
    type: 'activity',
    label: 'Realizar la comunicación',
    cycle: 'A',
    activity:
      'Realizar la comunicación como mínimo con seis días de anticipación a la fecha de comienzo de disfrute de las vacaciones.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'cv-03-11',
    number: 11,
    type: 'activity',
    label: 'Notificar la resolución al funcionario',
    cycle: 'A',
    activity:
      'Notificar la resolución al funcionario, archivar original en la hoja de vida del funcionario y pasar a Secretaría de Hacienda a efectos de que se realice la orden de pago con cinco días de antelación a la fecha de iniciar el disfrute del periodo vacacional.',
    responsible: 'Secretaría de Hacienda',
  },
  {
    id: 'cv-03-12',
    number: 12,
    type: 'activity',
    label: 'Comunicar al funcionario asignado o encargado',
    cycle: 'A',
    activity:
      'Comunicar al funcionario asignado, nombrado o encargado para reemplazo, si se requiere remisión para la dependencia respectiva.',
    responsible: 'Alcalde',
  },
  {
    id: 'cv-03-13',
    number: 13,
    type: 'activity',
    label: 'Verificar desarrollo del periodo de vacaciones',
    cycle: 'A',
    activity:
      'Verificar que el periodo de vacaciones se desarrolle normalmente y que el reemplazo designado asuma las funciones de conformidad con el procedimiento respectivo.',
    responsible: 'Jefe de dependencia',
  },
  {
    id: 'cv-03-14',
    number: 14,
    type: 'activity',
    label: 'Expedir certificación de disfrute',
    cycle: 'A',
    activity: 'Expedir la certificación para el disfrute de las vacaciones del funcionario.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'cv-03-15',
    number: 15,
    type: 'activity',
    label: 'Gestionar suspensión de vacaciones si aplica',
    cycle: 'A',
    activity:
      'En caso de requerirse suspensión de vacaciones por motivo contemplado en las normas legales vigentes, el jefe inmediato del empleado oficiará con mínimo tres días de anticipación a la fecha de iniciarse el disfrute o de iniciarse la suspensión, señalando la fecha en la cual se inicia el periodo del disfrute o si por necesidad del servicio se requiere el pago, copia de lo actuado debe quedar en la hoja de vida del funcionario.',
    responsible: 'Jefe de dependencia',
  },
  {
    id: 'cv-03-16',
    number: 16,
    type: 'activity',
    label: 'Proyectar resolución de suspensión y pago',
    cycle: 'A',
    activity:
      'Proyectar resolución de suspensión y pago. En caso de suspensión de vacaciones se informa al funcionario respectivo la suspensión de vacaciones dependiendo de la necesidad del servicio y se ordena su reintegro mediante anotación en la hoja de vida de los días que quedan pendientes para disfrute o se deban pagar.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'cv-03-17',
    number: 17,
    type: 'activity',
    label: 'Verificar reintegro del funcionario',
    cycle: 'A',
    activity:
      'Verificar que el funcionario se reintegre debidamente al vencimiento del periodo vacacional o de la suspensión, o reportar inasistencia para proceder conforme a lo señalado en las normas vigentes sobre inasistencia laboral.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'fin',
    number: 18,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const planInstitucionalCapacitacionSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'epic-04-1',
    number: 1,
    type: 'activity',
    label: 'Establecer políticas para el desarrollo y actualización del personal',
    cycle: 'P',
    activity:
      'Establecer políticas para el desarrollo y actualización del personal y dar directrices para la realización del Plan Anual de Capacitación.',
    responsible: 'Alcalde / Secretaría de Gobierno',
  },
  {
    id: 'epic-04-2',
    number: 2,
    type: 'activity',
    label: 'Determinar necesidades de capacitación del personal',
    cycle: 'H',
    activity:
      'Determinar las necesidades de capacitación del personal por oficinas, tomando para ello las siguientes modalidades: cursos, experiencia, pasantías, visitas e intercambios institucionales. Para ello se realizarán encuestas, entrevistas y evaluaciones del desempeño o recomendaciones de superiores inmediatos, entre otras herramientas que permitan determinar las necesidades reales de los funcionarios para mejorar el desempeño. Consolidar la información y de conformidad con las directrices y los recursos existentes, realizar el Plan Anual de Capacitación, el cual comprende aspectos fundamentales como forma y fondo.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'epic-04-3',
    number: 3,
    type: 'activity',
    label: 'Analizar el Plan proyectado',
    cycle: 'V',
    activity:
      'Analizar el Plan proyectado, ordenar los ajustes necesarios y someterlo a consideración para aprobación.',
    responsible: 'Alcalde',
  },
  {
    id: 'epic-04-4',
    number: 4,
    type: 'activity',
    label: 'Adoptar el Plan anual de Capacitación',
    cycle: 'A',
    activity: 'Adoptar mediante resolución el Plan Anual de Capacitación.',
    responsible: 'Alcalde',
  },
  {
    id: 'epic-04-5',
    number: 5,
    type: 'activity',
    label: 'Coordinar difusión, ejecución y actualización del Plan',
    cycle: 'A',
    activity:
      'Coordinar la difusión, ejecución, evaluación y actualización del Plan Anual de Capacitación.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'fin',
    number: 6,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const evaluacionDesempenoSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'ed-05-1',
    number: 1,
    type: 'activity',
    label: 'Definir y/o revisar la herramienta de evaluación',
    cycle: 'P',
    activity:
      'Definir y/o revisar la herramienta de evaluación de desempeño laboral.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'ed-05-2',
    number: 2,
    type: 'activity',
    label: 'Identificar factores de evaluación',
    cycle: 'P',
    activity:
      'Identificar factores de evaluación a partir del Plan Estratégico y de Acción de la vigencia a concertar.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'ed-05-3',
    number: 3,
    type: 'activity',
    label: 'Realizar sensibilización y capacitación',
    cycle: 'P',
    activity: 'Realizar sensibilización y capacitación.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'ed-05-4',
    number: 4,
    type: 'activity',
    label: 'Solicitar compromisos laborales y competencias comportamentales',
    cycle: 'H',
    activity:
      'Solicitar los compromisos laborales y competencias comportamentales.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'ed-05-5',
    number: 5,
    type: 'activity',
    label: 'Concertar compromisos laborales y competencias comportamentales',
    cycle: 'H',
    activity:
      'Concertar compromisos laborales y competencias comportamentales en periodo anual u ordinario.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'ed-05-6',
    number: 6,
    type: 'activity',
    label: 'Remitir compromisos laborales y competencias comportamentales',
    cycle: 'V',
    activity:
      'Remitir los compromisos laborales y competencias comportamentales a la Secretaría de Gobierno y Desarrollo Institucional.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'ed-05-7',
    number: 7,
    type: 'activity',
    label: 'Consolidar información y emitir informe',
    cycle: 'V',
    activity:
      'Consolidar información y emitir informe a la Dirección General.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'ed-05-8',
    number: 8,
    type: 'activity',
    label: 'Realizar seguimiento al desempeño laboral',
    cycle: 'V',
    activity:
      'Realizar el seguimiento al desempeño laboral y al desarrollo de competencias comportamentales, con registro de evidencias.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'ed-05-9',
    number: 9,
    type: 'activity',
    label: 'Realizar primera evaluación parcial',
    cycle: 'V',
    activity:
      'Realizar la primera evaluación parcial o eventual o extraordinaria.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'ed-05-10',
    number: 10,
    type: 'activity',
    label: 'Realizar plan de mejoramiento individual',
    cycle: 'A',
    activity: 'Realizar plan de mejoramiento individual.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'ed-05-11',
    number: 11,
    type: 'activity',
    label: 'Notificar evaluación parcial, eventual o extraordinaria',
    cycle: 'A',
    activity:
      'Notificar la evaluación parcial, eventual o extraordinaria.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'ed-05-12',
    number: 12,
    type: 'activity',
    label: 'Remitir evaluación parcial, eventual o extraordinaria',
    cycle: 'A',
    activity:
      'Remitir la evaluación parcial, eventual o extraordinaria.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'ed-05-13',
    number: 13,
    type: 'activity',
    label: 'Realizar segunda evaluación parcial y consolidar calificación',
    cycle: 'A',
    activity:
      'Realizar la segunda evaluación parcial o eventual y consolidar la calificación definitiva.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'ed-05-14',
    number: 14,
    type: 'activity',
    label: 'Notificar',
    cycle: 'A',
    activity: 'Notificar.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'ed-05-15',
    number: 15,
    type: 'activity',
    label: 'Remitir evaluación definitiva anual u ordinaria',
    cycle: 'A',
    activity:
      'Remitir la evaluación definitiva anual u ordinaria.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'ed-05-16',
    number: 16,
    type: 'activity',
    label: 'Consolidar información y elaborar informe',
    cycle: 'A',
    activity:
      'Consolidar información y elaborar informe a la Secretaría de Gobierno y Desarrollo Institucional.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'ed-05-17',
    number: 17,
    type: 'activity',
    label: 'Actualizar historia laboral',
    cycle: 'A',
    activity: 'Actualizar historia laboral.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'ed-05-18',
    number: 18,
    type: 'activity',
    label: 'Articular resultados de la evaluación del desempeño',
    cycle: 'A',
    activity:
      'Articular los resultados de la evaluación del desempeño.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'fin',
    number: 19,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const licenciaMaternidadEnfermedadSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  {
    id: 'lme-06-1',
    number: 1,
    type: 'activity',
    label: 'Recepción del certificado de la EPS',
    cycle: 'P',
    activity:
      'Recepcionar dentro de las veinticuatro (24) horas siguientes a la expedición del certificado de la EPS a que se encuentra afiliado el funcionario, con el fin de que se dictamine el día de inicio de la licencia de maternidad o incapacidad médica según el caso.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'lme-06-2',
    number: 2,
    type: 'activity',
    label: 'Precisar tiempo requerido de incapacidad',
    cycle: 'P',
    activity:
      'Precisar el tiempo requerido de incapacidad, ya sea de oficio o a solicitud de parte, y comunicar al Alcalde la situación y las posibles formas de cubrir las vacantes en el término de radicación del documento o certificado y, en caso extremo, el conocimiento de la situación que pueda generar la incapacidad.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'lme-06-3',
    number: 3,
    type: 'activity',
    label: 'Determinar forma de cubrir la vacante',
    cycle: 'P',
    activity:
      'Determinar la forma de cubrir la vacante que se genera, así como la persona que se asigna.',
    responsible: 'Alcalde',
  },
  {
    id: 'lme-06-4',
    number: 4,
    type: 'activity',
    label: 'Informar sobre la incapacidad al jefe inmediato',
    cycle: 'H',
    activity:
      'Informar sobre la incapacidad al jefe inmediato del incapacitado y, si requiere encargo, indicar la persona que deba asumirlo.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'lme-06-5',
    number: 5,
    type: 'activity',
    label: 'Ordenar elaboración del acto administrativo',
    cycle: 'H',
    activity:
      'Ordenar la elaboración del acto administrativo de encargo y ejecutar el trámite para dichos actos.',
    responsible: 'Alcalde',
  },
  {
    id: 'lme-06-6',
    number: 6,
    type: 'activity',
    label: 'Verificar reintegro del funcionario',
    cycle: 'V',
    activity:
      'Verificar que el funcionario se reintegre al finalizar la licencia o incapacidad autorizada, o reportar inasistencia para proceder conforme a lo señalado en las normas vigentes sobre inasistencia laboral.',
    responsible: 'Superior inmediato',
  },
  {
    id: 'lme-06-7',
    number: 7,
    type: 'activity',
    label: 'Iniciar trámites legales de invalidez',
    cycle: 'A',
    activity:
      'Iniciar los trámites legales para declarar la invalidez del funcionario en los casos que transcurran ciento ochenta (180) días continuos de licencia por enfermedad general o prórroga de ciento ochenta (180) días más por enfermedad profesional, incapacidad permanente parcial o incapacidad persistente, de conformidad con los dictámenes de los médicos de la EPS respectiva.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  { id: 'fin', number: 8, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const licenciaOrdinariaFuncionariosSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  {
    id: 'lfd-07-1',
    number: 1,
    type: 'activity',
    label: 'Dirigir solicitud al Alcalde',
    cycle: 'P',
    activity:
      'Dirigir la solicitud al Alcalde solicitando licencia y señalando el periodo de la misma, con mínimo ocho (8) días de anticipación a la fecha de inicio.',
    responsible: 'Funcionario interesado',
  },
  {
    id: 'lfd-07-2',
    number: 2,
    type: 'activity',
    label: 'Verificar solicitud y límites legales',
    cycle: 'P',
    activity:
      'Verificar que la solicitud sea justa y clara y que el término se encuentre dentro de los límites permitidos por la ley: sesenta (60) días continuos o discontinuos al año y prorrogables treinta (30) días más cuando medie justa causa; consultar la hoja de vida del funcionario y archivar solicitud.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'lfd-07-3',
    number: 3,
    type: 'activity',
    label: 'Decidir sobre el otorgamiento de la licencia',
    cycle: 'H',
    activity:
      'Decidir sobre el otorgamiento de la licencia tomando en cuenta la opinión del superior inmediato del funcionario interesado. Si la decisión es positiva, visar y pasar a Secretaría de Gobierno; si es negativa, así lo consignará.',
    responsible: 'Alcalde',
  },
  {
    id: 'lfd-07-4',
    number: 4,
    type: 'activity',
    label: 'Comunicar al interesado y ordenar resolución',
    cycle: 'H',
    activity:
      'Comunicar al interesado y archivar solicitud en hoja de vida del funcionario. Si se niega, se concede ordena proyectar la resolución.',
    responsible: 'Alcalde',
  },
  {
    id: 'lfd-07-5',
    number: 5,
    type: 'activity',
    label: 'Revisar y viabilizar proyecto de resolución',
    cycle: 'V',
    activity:
      'Revisar y viabilizar el proyecto de resolución concediendo licencia.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'lfd-07-6',
    number: 6,
    type: 'activity',
    label: 'Revisar y viabilizar resolución',
    cycle: 'V',
    activity:
      'Revisar y viabilizar el proyecto de resolución concediendo licencia.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'lfd-07-7',
    number: 7,
    type: 'activity',
    label: 'Radicar en el Despacho del Alcalde',
    cycle: 'V',
    activity: 'Radicar en el Despacho del Alcalde.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'lfd-07-8',
    number: 8,
    type: 'activity',
    label: 'Revisar, avalar y firmar resolución',
    cycle: 'V',
    activity: 'Revisar, avalar y firmar la resolución.',
    responsible: 'Alcalde',
  },
  {
    id: 'lfd-07-9',
    number: 9,
    type: 'activity',
    label: 'Desarrollar procedimiento de actos administrativos',
    cycle: 'V',
    activity:
      'Desarrollar procedimiento establecido para elaboración de actos administrativos de competencia del Despacho del Alcalde.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'lfd-07-10',
    number: 10,
    type: 'activity',
    label: 'Notificar comunicación al interesado',
    cycle: 'A',
    activity: 'Notificar comunicación al interesado.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'lfd-07-11',
    number: 11,
    type: 'activity',
    label: 'Informar novedades a Hacienda',
    cycle: 'A',
    activity:
      'Informar las novedades a Secretaría de Hacienda para afectación de nómina de los meses correspondientes.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'lfd-07-12',
    number: 12,
    type: 'activity',
    label: 'Verificar reintegro del funcionario',
    cycle: 'A',
    activity:
      'Verificar que el funcionario se reintegre oportunamente, vencido el término de la licencia.',
    responsible: 'Superior inmediato',
  },
  { id: 'fin', number: 13, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const nombramientoOrdinarioSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  {
    id: 'no-08-1',
    number: 1,
    type: 'activity',
    label: 'Detectar vacancias definitivas',
    cycle: 'P',
    activity:
      'Detectar las vacancias definitivas que se presenten en cargos de libre nombramiento y remoción.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'no-08-2',
    number: 2,
    type: 'activity',
    label: 'Analizar formas posibles de provisión',
    cycle: 'P',
    activity:
      'Analizar las formas posibles de provisión, bien sea mediante nombramiento ordinario, traslado o encargo.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'no-08-3',
    number: 3,
    type: 'activity',
    label: 'Comunicar al Alcalde',
    cycle: 'P',
    activity:
      'Comunicar al Señor Alcalde sobre la vacante y las posibilidades de provisión.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'no-08-4',
    number: 4,
    type: 'activity',
    label: 'Designar funcionario y forma de provisión',
    cycle: 'P',
    activity: 'Designar al funcionario y la forma de provisión.',
    responsible: 'Alcalde',
  },
  {
    id: 'no-08-5',
    number: 5,
    type: 'activity',
    label: 'Determinar requisitos del cargo',
    cycle: 'H',
    activity:
      'Mediante el fundamento legal determinar los requisitos para el cargo a proveer.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'no-08-6',
    number: 6,
    type: 'activity',
    label: 'Designar persona seleccionada',
    cycle: 'H',
    activity:
      'Designar la persona seleccionada para provisión del cargo.',
    responsible: 'Alcalde',
  },
  {
    id: 'no-08-7',
    number: 7,
    type: 'document',
    label: 'Elaborar proyecto de decreto',
    cycle: 'H',
    activity:
      'Elaborar proyecto de decreto en original y copias y remitir al despacho del Alcalde una vez revisado y avalado.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'no-08-8',
    number: 8,
    type: 'activity',
    label: 'Comunicar resolución de nombramiento',
    cycle: 'V',
    activity:
      'Comunicar el contenido de la resolución mediante oficio, haciendo firmar el original y entregando copia. En el mismo acto se hará saber al designado que tiene diez (10) días hábiles para aceptar o rechazar el nombramiento; de lo contrario se entenderá rechazado.',
    responsible: 'Alcalde',
  },
  {
    id: 'no-08-9',
    number: 9,
    type: 'document',
    label: 'Recepcionar oficio de aceptación',
    cycle: 'A',
    activity:
      'Recepcionar el oficio de aceptación y comunicar al interesado que debe diligenciar para tomar posesión del cargo los documentos requeridos para vinculación, dentro del término establecido.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'no-08-10',
    number: 10,
    type: 'activity',
    label: 'Verificar requisitos y concertar posesión',
    cycle: 'A',
    activity:
      'Verificar el cumplimiento de todos los requisitos establecidos en las normas vigentes y concertar con el Alcalde la posesión del designado cuando haya acreditado la totalidad de los requisitos exigidos.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  { id: 'fin', number: 11, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const realizacionEncargosSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  {
    id: 're-09-1',
    number: 1,
    type: 'activity',
    label: 'Solicitar licencia al Señor Alcalde',
    cycle: 'P',
    activity:
      'Solicitar al Señor Alcalde licencia y señalar el periodo de la misma, con mínimo ocho (8) días de anticipación a la fecha de inicio.',
    responsible: 'Funcionario',
  },
  {
    id: 're-09-2',
    number: 2,
    type: 'activity',
    label: 'Verificar solicitud y límites legales',
    cycle: 'P',
    activity:
      'Verificar que la solicitud sea justa y clara y que el término se encuentre dentro de los límites permitidos por la ley; consultar la hoja de vida del funcionario y archivar solicitud.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 're-09-3',
    number: 3,
    type: 'activity',
    label: 'Decidir sobre el otorgamiento de licencia',
    cycle: 'H',
    activity:
      'Decidir sobre el otorgamiento de la licencia tomando en cuenta la opinión del superior inmediato del funcionario interesado en el encargo.',
    responsible: 'Inmediato del funcionario',
  },
  {
    id: 're-09-4',
    number: 4,
    type: 'activity',
    label: 'Revisar proyecto de resolución',
    cycle: 'H',
    activity:
      'Revisar y viabilizar el proyecto de resolución concediendo encargo.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 're-09-5',
    number: 5,
    type: 'activity',
    label: 'Revisar, avalar y firmar resolución',
    cycle: 'V',
    activity: 'Revisar, avalar y firmar resolución.',
    responsible: 'Alcalde',
  },
  {
    id: 're-09-6',
    number: 6,
    type: 'activity',
    label: 'Desarrollar procedimiento de actos administrativos',
    cycle: 'V',
    activity:
      'Desarrollar procedimiento establecido para elaboración de actos administrativos de competencia del Despacho del Alcalde.',
    responsible: 'Alcalde',
  },
  {
    id: 're-09-7',
    number: 7,
    type: 'activity',
    label: 'Notificar al funcionario interesado',
    cycle: 'V',
    activity: 'Realizar la respectiva notificación al funcionario interesado.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 're-09-8',
    number: 8,
    type: 'activity',
    label: 'Informar novedades a Hacienda',
    cycle: 'A',
    activity:
      'Informar las novedades para afectación de nómina a Secretaría de Hacienda.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 're-09-9',
    number: 9,
    type: 'activity',
    label: 'Verificar retorno a funciones del cargo titular',
    cycle: 'A',
    activity:
      'Verificar que el funcionario retome las funciones del cargo del cual es titular vencido el término del encargo.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  { id: 'fin', number: 10, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const realizacionTrasladosSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  {
    id: 'rt-10-1',
    number: 1,
    type: 'activity',
    label: 'Detectar rotaciones o vacantes definitivas',
    cycle: 'P',
    activity:
      'Detectar posibles rotaciones de personal o vacantes definitivas que puedan ser cubiertas con otras personas ya vinculadas a la entidad y consultar con el Alcalde sobre conveniencia y procedencia.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'rt-10-2',
    number: 2,
    type: 'activity',
    label: 'Verificar funciones, requisitos y cargos ocupados',
    cycle: 'H',
    activity:
      'Verificar que las funciones, requisitos y cargos ocupados y a ocupar por el funcionario objeto del traslado se cumplan conforme al manual de funciones y requisitos de la entidad.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'rt-10-3',
    number: 3,
    type: 'activity',
    label: 'Verificar requisitos del funcionario',
    cycle: 'V',
    activity:
      'Verificar el cumplimiento de requisitos del funcionario para ocupar el nuevo cargo, así como determinar el tipo de traslado que se hará teniendo en cuenta la naturaleza jurídica del cargo a proveer.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'rt-10-4',
    number: 4,
    type: 'activity',
    label: 'Proyectar resolución de traslado',
    cycle: 'V',
    activity:
      'Proyectar resolución de traslado y/o comunicado en la cual debe estipularse la fecha a partir de la cual se hará efectivo el traslado y toma de posesión del nuevo cargo, para revisión y paso al Despacho del Alcalde.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'rt-10-5',
    number: 5,
    type: 'activity',
    label: 'Revisar y firmar acto administrativo',
    cycle: 'A',
    activity:
      'Revisar y firmar acto administrativo y devolver a la Secretaría de Gobierno.',
    responsible: 'Alcalde',
  },
  {
    id: 'rt-10-6',
    number: 6,
    type: 'activity',
    label: 'Comunicar resolución de traslado',
    cycle: 'A',
    activity:
      'Comunicar el contenido de la resolución mediante oficio, archivar en la hoja de vida del funcionario copia del acto administrativo y/o comunicación.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'rt-10-7',
    number: 7,
    type: 'activity',
    label: 'Coordinar posesión en el nuevo cargo',
    cycle: 'A',
    activity:
      'Coordinar con el Alcalde la posesión del funcionario en el nuevo cargo y diligenciar el acta de posesión, si se requiere.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'rt-10-8',
    number: 8,
    type: 'activity',
    label: 'Dar inducción específica al cargo',
    cycle: 'A',
    activity:
      'Dar inducción específica en el nuevo cargo al funcionario trasladado.',
    responsible: 'Jefe directo',
  },
  { id: 'fin', number: 9, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const retiroServicioEmpleadosPublicosSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  {
    id: 'rse-11-1',
    number: 1,
    type: 'activity',
    label: 'Determinar causal de retiro del servicio',
    cycle: 'P',
    activity:
      'Determinar la ocurrencia de una causal de retiro del servicio: por voluntad del alcalde, por renuncia regularmente aceptada, por supresión del empleo, por invalidez absoluta, por muerte o por destitución.',
    responsible: 'Alcalde / Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'rse-11-2',
    number: 2,
    type: 'activity',
    label: 'Disponer términos y condiciones del retiro',
    cycle: 'P',
    activity:
      'Disponer los términos y condiciones en que se haga el retiro y ordenar proyectar los actos administrativos a que hubiese lugar.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'rse-11-3',
    number: 3,
    type: 'activity',
    label: 'Proyectar actos administrativos de retiro',
    cycle: 'H',
    activity:
      'Proyectar los actos administrativos de retiro: en casos de insubsistencia, renuncia, supresión de empleo, invalidez, pensión de jubilación o retiro forzoso, muerte o destitución. Se realizan ajustes necesarios y se envían al Despacho del Alcalde.',
    responsible: 'Alcalde / Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'rse-11-4',
    number: 4,
    type: 'activity',
    label: 'Desarrollar procedimiento de actos administrativos',
    cycle: 'H',
    activity:
      'Desarrollar procedimiento para elaboración de actos administrativos de competencia del Despacho del Alcalde.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'rse-11-5',
    number: 5,
    type: 'document',
    label: 'Notificar acto administrativo',
    cycle: 'H',
    activity:
      'Notificar el acto administrativo haciendo firmar el original y archivar en la hoja de vida del funcionario copia del acto administrativo, y entregar formato de paz y salvo de retiro como requisito para trámite y pago de liquidación.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'rse-11-6',
    number: 6,
    type: 'activity',
    label: 'Coordinar entrega del puesto de trabajo',
    cycle: 'H',
    activity:
      'Coordinar con el superior inmediato del funcionario retirado la entrega del puesto de trabajo y los elementos asignados para su uso y/o custodia.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'rse-11-7',
    number: 7,
    type: 'activity',
    label: 'Verificar devolución de elementos',
    cycle: 'V',
    activity:
      'Verificar que el funcionario retirado haya entregado todos los elementos devolutivos a su cargo.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'rse-11-8',
    number: 8,
    type: 'activity',
    label: 'Introducir novedad de nómina',
    cycle: 'A',
    activity:
      'Introducir la novedad de nómina para el respectivo mes y tramitar la desafiliación de salud, pensión, riesgos laborales, cooperativas, entre otras.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  { id: 'fin', number: 9, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const planEstimulosSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  {
    id: 'pe-12-1',
    number: 1,
    type: 'activity',
    label: 'Revisar lineamientos del DAFP',
    cycle: 'P',
    activity:
      'Revisar los lineamientos del Departamento Administrativo de la Función Pública.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'pe-12-2',
    number: 2,
    type: 'activity',
    label: 'Identificar necesidades de bienestar laboral',
    cycle: 'P',
    activity:
      'Identificar las necesidades de los servidores en relación con su bienestar laboral.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'pe-12-3',
    number: 3,
    type: 'activity',
    label: 'Analizar diagnóstico realizado',
    cycle: 'P',
    activity: 'Analizar los resultados del diagnóstico realizado.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'pe-12-4',
    number: 4,
    type: 'activity',
    label: 'Definir líneas estratégicas',
    cycle: 'P',
    activity:
      'Definir las líneas estratégicas o dimensiones del plan que se desarrollarán.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'pe-12-5',
    number: 5,
    type: 'activity',
    label: 'Establecer oferta de programas y actividades',
    cycle: 'H',
    activity:
      'Establecer la oferta con programas y actividades y su forma de ejecución.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'pe-12-6',
    number: 6,
    type: 'document',
    label: 'Elaborar proyecto del Plan Institucional de Estímulos',
    cycle: 'H',
    activity:
      'Elaborar el proyecto del Plan Institucional de Estímulos “Bienestar e Incentivos”.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'pe-12-7',
    number: 7,
    type: 'document',
    label: 'Remitir proyecto al Despacho del Alcalde',
    cycle: 'H',
    activity:
      'Remitir el proyecto del Plan Institucional de Estímulos para su revisión al Despacho del Alcalde.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'pe-12-8',
    number: 8,
    type: 'activity',
    label: 'Revisar Plan Institucional de Estímulos',
    cycle: 'V',
    activity: 'Revisar el Plan Institucional de Estímulos.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'pe-12-9',
    number: 9,
    type: 'document',
    label: 'Imprimir documento final para firma',
    cycle: 'A',
    activity:
      'Imprimir el documento final del Plan Institucional de Estímulos para firma.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'pe-12-10',
    number: 10,
    type: 'document',
    label: 'Proyectar resolución de adopción',
    cycle: 'A',
    activity:
      'Proyectar la resolución para adopción del Plan Institucional.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'pe-12-11',
    number: 11,
    type: 'activity',
    label: 'Socializar Plan Institucional de Estímulos',
    cycle: 'A',
    activity: 'Socializar el Plan Institucional de Estímulos.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'pe-12-12',
    number: 12,
    type: 'activity',
    label: 'Publicar Plan Institucional de Estímulos',
    cycle: 'A',
    activity: 'Publicar el Plan Institucional de Estímulos.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'pe-12-13',
    number: 13,
    type: 'activity',
    label: 'Ejecutar Plan Institucional de Estímulos',
    cycle: 'A',
    activity: 'Ejecutar el Plan Institucional de Estímulos.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'pe-12-14',
    number: 14,
    type: 'activity',
    label: 'Evaluar Plan Institucional de Estímulos',
    cycle: 'A',
    activity: 'Evaluar el Plan Institucional de Estímulos.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  { id: 'fin', number: 15, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const retiroCesantiasSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  {
    id: 'rc-14-1',
    number: 1,
    type: 'activity',
    label: 'Radicar documentación física',
    cycle: 'P',
    activity: 'Radicar la documentación física.',
    responsible: 'Secretaría de Gobierno',
  },
  {
    id: 'rc-14-2',
    number: 2,
    type: 'activity',
    label: 'Revisar documentación presentada',
    cycle: 'H',
    activity:
      'Revisar la documentación presentada por el funcionario; si está completa, se pasa para trámite.',
    responsible: 'Secretaría de Gobierno',
  },
  {
    id: 'rc-14-3',
    number: 3,
    type: 'activity',
    label: 'Revisar saldo extracto de cesantías',
    cycle: 'H',
    activity:
      'Revisar el saldo extracto de cesantías en el aplicativo de cada fondo.',
    responsible: 'Secretaría de Gobierno',
  },
  {
    id: 'rc-14-4',
    number: 4,
    type: 'document',
    label: 'Elaborar carta de autorización de retiro',
    cycle: 'V',
    activity:
      'Elaborar carta de autorización de retiro de cesantías para la respectiva firma.',
    responsible: 'Secretaría de Gobierno',
  },
  {
    id: 'rc-14-5',
    number: 5,
    type: 'document',
    label: 'Retiro de cesantías',
    cycle: 'A',
    activity: 'Retiro de cesantías.',
    responsible: 'Secretaría de Gobierno',
  },
  {
    id: 'rc-14-6',
    number: 6,
    type: 'document',
    label: 'Archivar soportes de retiro',
    cycle: 'A',
    activity: 'Archivar soportes de retiro.',
    responsible: 'Secretaría de Gobierno',
  },
  { id: 'fin', number: 7, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const induccionReinduccionSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  {
    id: 'ir-15-1',
    number: 1,
    type: 'activity',
    label: 'Determinar causal de retiro del servicio',
    cycle: 'P',
    activity:
      'Determinar la ocurrencia de una causal de retiro del servicio por voluntad del alcalde, por renuncia regularmente aceptada, por supresión del empleo, por invalidez absoluta u otras causales aplicables.',
    responsible: 'Alcalde / Secretaría de Gobierno',
  },
  {
    id: 'ir-15-2',
    number: 2,
    type: 'activity',
    label: 'Disponer términos y condiciones del retiro',
    cycle: 'P',
    activity:
      'Disponer los términos y condiciones en que se haga el retiro y ordenar proyectar los actos administrativos a que hubiese lugar.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'ir-15-3',
    number: 3,
    type: 'activity',
    label: 'Proyectar actos administrativos de retiro',
    cycle: 'H',
    activity:
      'Proyectar los actos administrativos de retiro de acuerdo con la causal correspondiente y remitirlos para trámite.',
    responsible: 'Alcalde / Secretaría de Gobierno',
  },
  {
    id: 'ir-15-4',
    number: 4,
    type: 'activity',
    label: 'Desarrollar procedimiento de actos administrativos',
    cycle: 'H',
    activity:
      'Desarrollar procedimiento para elaboración de actos administrativos de competencia del Despacho del Alcalde.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'ir-15-5',
    number: 5,
    type: 'document',
    label: 'Notificar acto administrativo',
    cycle: 'H',
    activity:
      'Notificar el acto administrativo, hacer firmar el original, archivar en la hoja de vida del funcionario y entregar formato de paz y salvo de retiro como requisito para trámite y pago de liquidación.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'ir-15-6',
    number: 6,
    type: 'activity',
    label: 'Coordinar entrega del puesto de trabajo',
    cycle: 'V',
    activity:
      'Coordinar con el superior inmediato del funcionario retirado la entrega del puesto de trabajo y los elementos asignados para su uso y/o custodia.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'ir-15-7',
    number: 7,
    type: 'activity',
    label: 'Verificar devolución de elementos',
    cycle: 'V',
    activity:
      'Verificar que el funcionario retirado haya entregado todos los elementos devolutivos a su cargo.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'ir-15-8',
    number: 8,
    type: 'activity',
    label: 'Introducir novedad de nómina',
    cycle: 'A',
    activity:
      'Introducir la novedad de nómina para el respectivo mes y tramitar la desafiliación de salud, pensión, riesgos laborales, cooperativas, entre otras.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  { id: 'fin', number: 9, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const conciliacionCustodiaCuotaVisitasSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'carv-01-1',
    number: 1,
    type: 'activity',
    label: 'Solicitar de forma verbal o escrita',
    cycle: 'P',
    activity:
      'Solicitar de forma verbal o escrita a través de la Comisaría de Familia la custodia, cuota alimentaria y régimen de visitas de sus menores hijos y/o de los adultos mayores.',
    responsible: 'Usuario',
  },
  {
    id: 'carv-01-2',
    number: 2,
    type: 'activity',
    label: 'Recibir solicitud e informar documentos',
    cycle: 'H',
    activity:
      'Recibir la solicitud por parte del usuario y, a su vez, se le informa cuáles son los documentos que debe allegar para el día de la audiencia.',
    responsible: 'Comisaría de Familia',
  },
  {
    id: 'carv-01-3',
    number: 3,
    type: 'activity',
    label: 'Fijar fecha y hora de audiencia',
    cycle: 'H',
    activity:
      'Fijar fecha y hora para llevar a cabo la audiencia de conciliación.',
    responsible: 'Comisaría de Familia',
  },
  {
    id: 'carv-01-4',
    number: 4,
    type: 'activity',
    label: 'Ordenar la citación del obligado',
    cycle: 'H',
    activity:
      'Ordenar la citación del obligado.',
    responsible: 'Comisaría de Familia',
  },
  {
    id: 'carv-01-5',
    number: 5,
    type: 'activity',
    label: 'Suscribir acta de conciliación',
    cycle: 'V',
    activity:
      'Suscribir la respectiva acta de conciliación, la cual deberá ser suscrita por los citados, en la que se indicará: identificación de las partes, fijación de custodia, monto de la cuota alimentaria con reajuste anual, lugar y forma de pago, acta donde conste el reajuste y régimen de visitas, acta que presta mérito ejecutivo y firma de las partes. La cuota provisional de alimentos será fijada por la Comisaría de Familia según los siguientes eventos: cuando el obligado no concurra a la audiencia o cuando no se llegue a ningún acuerdo conciliatorio.',
    responsible: 'Comisaría de Familia',
  },
  {
    id: 'fin',
    number: 6,
    type: 'end',
    label: 'FIN',
    cycle: 'A',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const medidasProteccionSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'mp-02-1',
    number: 1,
    type: 'activity',
    label: 'Hacer recuento de los hechos',
    cycle: 'P',
    activity:
      'Hacer un recuento de los hechos, tiempo, modo y lugar. Si está sufriendo daño físico, se envía al Centro de Salud del Municipio para que sea valorada y se determine el grado de afectación. Además, se realiza valoración dada por el psicólogo.',
    responsible: 'Usuario',
  },
  {
    id: 'mp-02-2',
    number: 2,
    type: 'activity',
    label: 'Recepcionar denuncia de medida de protección',
    cycle: 'P',
    activity:
      'Recepcionar de manera inmediata la denuncia emitiendo una medida de protección en forma provisional, como lo estipula la Ley 575 de 2000, Ley 1257 de 2008 y demás normas concordantes, tendiente a evitar la continuación de los actos de violencia, agresión o maltrato físico, psicológico, verbal o sexual contra la víctima. Dentro de las medidas se contemplan acciones como ordenar al agresor el desalojo de la casa de habitación, abstenerse de penetrar cualquier lugar donde se encuentre la víctima, prohibir esconder o trasladar a los niños, acudir a tratamiento reeducativo o terapéutico, ordenar protección temporal por parte de autoridades de policía cuando sea necesario, entre otras medidas aplicables.',
    responsible: 'Comisaría de Familia',
  },
  {
    id: 'mp-02-3',
    number: 3,
    type: 'activity',
    label: 'Impartir medida de protección provisional',
    cycle: 'H',
    activity:
      'La Comisaría de Familia imparte la medida de protección de carácter provisional y procede a citar al acusado y a la víctima, fijando fecha y hora dentro de los cinco (5) a diez (10) días siguientes a la presentación de la denuncia. Si el agresor no comparece o no logra notificarse, se informa a la Policía para comunicación personal y/o por aviso. En la audiencia se practicarán las pruebas y se emitirá decisión sobre la medida de protección, teniendo en cuenta el reconocimiento de desigualdad, riesgo o vulnerabilidad de la víctima.',
    responsible: 'Comisaría de Familia',
  },
  {
    id: 'mp-02-4',
    number: 4,
    type: 'activity',
    label: 'Informar a la Comisaría sobre aceptación o incumplimiento',
    cycle: 'H',
    activity:
      'Informar a la Comisaría para que, mediante auto, se avale el conocimiento, se señale fecha para audiencia dentro de los diez (10) días, se ordene notificar a las partes y, si en la audiencia hay aceptación de cargos, se declare el incumplimiento y se imponga sanción; pero si no acepta cargos, se surte la etapa de pruebas y se fija fecha y hora para el fallo.',
    responsible: 'Comisaría de Familia',
  },
  {
    id: 'mp-02-5',
    number: 5,
    type: 'activity',
    label: 'Proferir resolución por incumplimiento',
    cycle: 'V',
    activity:
      'Proferida la resolución por medio de la cual se declara el incumplimiento, se remite al Juez de Familia para consulta.',
    responsible: 'Comisaría de Familia',
  },
  {
    id: 'fin',
    number: 6,
    type: 'end',
    label: 'FIN',
    cycle: 'A',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const restablecimientoDerechosRddSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'rdd-03-1',
    number: 1,
    type: 'activity',
    label: 'Recepcionar denuncia de presunta vulneración',
    cycle: 'P',
    activity:
      'Recepcionar la denuncia de la presunta vulneración de los derechos del menor.',
    responsible: 'Comisaría de Familia',
  },
  {
    id: 'rdd-03-2',
    number: 2,
    type: 'activity',
    label: 'Realizar apertura de historia de atención',
    cycle: 'P',
    activity:
      'Realizar la apertura de la historia de atención y clasificar el tipo de ingreso.',
    responsible: 'Comisaría de Familia',
  },
  {
    id: 'rdd-03-3',
    number: 3,
    type: 'activity',
    label: 'Verificar derechos vulnerados, amenazados o inobservados',
    cycle: 'P',
    activity:
      'Verificar los derechos vulnerados, amenazados e inobservados y elaborar diagnóstico, llevando atención especializada, entrevistas psicosociales y visitas domiciliarias.',
    responsible: 'Equipo interdisciplinario',
  },
  {
    id: 'rdd-03-4',
    number: 4,
    type: 'activity',
    label: 'Elaborar auto de apertura del PARD',
    cycle: 'P',
    activity:
      'Elaborar el Auto de apertura del Proceso Administrativo de Restablecimiento de Derechos conforme a los términos establecidos en el artículo 100 de la Ley 1098 de 2006, modificado por el artículo 4 de la Ley 1878 de 2018.',
    responsible: 'Comisaría de Familia',
  },
  {
    id: 'rdd-03-5',
    number: 5,
    type: 'activity',
    label: 'Aperturar investigación y verificar garantía de derechos',
    cycle: 'H',
    activity:
      'Aperturar la investigación; viene la verificación de la garantía de derechos por medio de visita domiciliaria en la residencia.',
    responsible: 'Comisaría de Familia',
  },
  {
    id: 'rdd-03-6',
    number: 6,
    type: 'activity',
    label: 'Enviar citaciones y emplazamientos',
    cycle: 'H',
    activity:
      'Enviar las citaciones, emplazamientos y diligencias con la foto del menor por medio electrónico al ICBF, Instituto Colombiano de Bienestar Familiar.',
    responsible: 'Comisaría de Familia',
  },
  {
    id: 'rdd-03-7',
    number: 7,
    type: 'activity',
    label: 'Consultar portal del ICBF',
    cycle: 'V',
    activity:
      'Consultar en la página o portal del ICBF en el ícono de citaciones y emplazamientos.',
    responsible: 'Comisaría de Familia',
  },
  {
    id: 'rdd-03-8',
    number: 8,
    type: 'activity',
    label: 'Realizar audiencia de pruebas y fallo',
    cycle: 'A',
    activity:
      'Realizar audiencia de pruebas y fallo donde se procede a revisar el informe del equipo técnico, verificar pertenencia de la medida, practicar pruebas, decretar o trasladar pruebas, dictar fallo, confirmar o cambiar la medida provisional y notificar el fallo.',
    responsible: 'Comisaría de Familia',
  },
  {
    id: 'rdd-03-9',
    number: 9,
    type: 'activity',
    label: 'Interponer recurso de reposición u homologación',
    cycle: 'A',
    activity:
      'Interponer el recurso de reposición ante el mismo funcionario o el recurso de homologación para que sea resuelto por el Juez de Familia o el Juez Promiscuo Municipal.',
    responsible: 'Comisaría de Familia',
  },
  {
    id: 'rdd-03-10',
    number: 10,
    type: 'activity',
    label: 'Realizar seguimiento al restablecimiento de derechos',
    cycle: 'A',
    activity:
      'Realizar el seguimiento del mismo por parte del equipo psicosocial y garantizar el restablecimiento de derechos de los niños, niñas y adolescentes.',
    responsible: 'Comisaría de Familia',
  },
  {
    id: 'rdd-03-11',
    number: 11,
    type: 'activity',
    label: 'Verificar restablecimiento y cerrar PARD',
    cycle: 'A',
    activity:
      'Verificar el restablecimiento de los derechos. Se procede a realizar el cierre del PARD y el expediente se envía al archivo.',
    responsible: 'Comisaría de Familia',
  },
  {
    id: 'fin',
    number: 12,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const elaboracionActosAdministrativosSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'eaa-04-1',
    number: 1,
    type: 'activity',
    label: 'Formular proyecto de acto administrativo',
    cycle: 'P',
    activity: 'Formular el proyecto de acto administrativo.',
    responsible: 'Dependencia que necesite proferir acto administrativo',
  },
  {
    id: 'eaa-04-2',
    number: 2,
    type: 'activity',
    label: 'Revisar proyecto al interior del área',
    cycle: 'P',
    activity:
      'Revisar el proyecto de acto administrativo al interior del área competente.',
    responsible: 'Dependencia que necesite proferir acto administrativo',
  },
  {
    id: 'eaa-04-3',
    number: 3,
    type: 'decision',
    label: 'Devolver el proyecto de acuerdo para ajustes',
    cycle: 'P',
    activity: 'Devolver el proyecto de acuerdo para ajustes.',
    responsible: 'Dependencia que necesite proferir acto administrativo',
    branches: [
      { label: 'SI', targetStepId: 'eaa-04-5' },
      { label: 'NO', targetStepId: 'eaa-04-4' },
    ],
  },
  {
    id: 'eaa-04-4',
    number: 4,
    type: 'activity',
    label: 'Remitir a Secretaría de Gobierno',
    cycle: 'H',
    activity:
      'Remitir a la Secretaría de Gobierno y Desarrollo Institucional.',
    responsible: 'Dependencia que necesite proferir acto administrativo',
  },
  {
    id: 'eaa-04-5',
    number: 5,
    type: 'activity',
    label: 'Remitir a dependencia para ajustes',
    cycle: 'H',
    activity: 'Remitir a la dependencia para realizar ajustes.',
    responsible: 'Dependencia que necesite proferir acto administrativo',
  },
  {
    id: 'eaa-04-6',
    number: 6,
    type: 'activity',
    label: 'Verificar requisitos de legalidad',
    cycle: 'H',
    activity:
      'Verificar si el acto administrativo cumple con los requisitos de legalidad.',
    responsible: 'Dependencia que necesite proferir acto administrativo',
  },
  {
    id: 'eaa-04-7',
    number: 7,
    type: 'decision',
    label: 'Devolver proyecto con observaciones',
    cycle: 'H',
    activity:
      'Devolver el proyecto de acto administrativo a la dependencia de origen con observaciones.',
    responsible: 'Dependencia que necesite proferir acto administrativo',
    branches: [
      { label: 'SI', targetStepId: 'eaa-04-8' },
      { label: 'NO', targetStepId: 'eaa-04-5' },
    ],
  },
  {
    id: 'eaa-04-8',
    number: 8,
    type: 'activity',
    label: 'Remitir acto aprobado al área competente',
    cycle: 'H',
    activity:
      'Remitir el acto administrativo aprobado al área competente.',
    responsible: 'Dependencia que necesite proferir acto administrativo',
  },
  {
    id: 'eaa-04-9',
    number: 9,
    type: 'activity',
    label: 'Remitir acto administrativo aprobado',
    cycle: 'H',
    activity:
      'Remitir el acto administrativo aprobado al área competente.',
    responsible: 'Dependencia que necesite proferir acto administrativo',
  },
  {
    id: 'eaa-04-10',
    number: 10,
    type: 'activity',
    label: 'Solicitar número y fecha del acto',
    cycle: 'H',
    activity:
      'Solicitar número y fecha del acto administrativo según consecutivo.',
    responsible: 'Dependencia que necesite proferir acto administrativo',
  },
  {
    id: 'eaa-04-11',
    number: 11,
    type: 'activity',
    label: 'Verificar si debe notificarse o publicarse',
    cycle: 'H',
    activity:
      'Verificar si el acto administrativo debe notificarse o publicarse.',
    responsible: 'Dependencia que necesite proferir acto administrativo',
  },
  {
    id: 'eaa-04-12',
    number: 12,
    type: 'decision',
    label: 'Realizar notificación personal',
    cycle: 'H',
    activity:
      'Realizar la notificación personal del acto administrativo firmado y fechado.',
    responsible: 'Dependencia que necesite proferir acto administrativo',
    branches: [
      { label: 'NO', targetStepId: 'eaa-04-13' },
      { label: 'SI', targetStepId: 'eaa-04-15' },
    ],
  },
  {
    id: 'eaa-04-13',
    number: 13,
    type: 'activity',
    label: 'Realizar notificación por aviso',
    cycle: 'V',
    activity:
      'Realizar la notificación por aviso del acto administrativo firmado y fechado cuando se requiera.',
    responsible: 'Dependencia que necesite proferir acto administrativo',
  },
  {
    id: 'eaa-04-14',
    number: 14,
    type: 'activity',
    label: 'Realizar notificación por comunicación',
    cycle: 'V',
    activity: 'Realizar la notificación por comunicación.',
    responsible: 'Dependencia que necesite proferir acto administrativo',
  },
  {
    id: 'eaa-04-15',
    number: 15,
    type: 'activity',
    label: 'Verificar recursos contra el acto',
    cycle: 'V',
    activity:
      'Verificar si proceden recursos en contra del acto administrativo.',
    responsible: 'Dependencia que necesite proferir acto administrativo',
  },
  {
    id: 'eaa-04-16',
    number: 16,
    type: 'activity',
    label: 'Verificar recursos contra el acto administrativo',
    cycle: 'V',
    activity:
      'Verificar si proceden recursos en contra del acto administrativo.',
    responsible: 'Dependencia que necesite proferir acto administrativo',
  },
  {
    id: 'eaa-04-17',
    number: 17,
    type: 'decision',
    label: 'Recepcionar solicitud del recurso',
    cycle: 'V',
    activity:
      'Recepcionar la solicitud del recurso a través de correspondencia y remitir al área correspondiente.',
    responsible: 'Dependencia que necesite proferir acto administrativo',
    branches: [
      { label: 'SI', targetStepId: 'eaa-04-18' },
      { label: 'NO', targetStepId: 'eaa-04-25' },
    ],
  },
  {
    id: 'eaa-04-18',
    number: 18,
    type: 'activity',
    label: 'Recibir recurso de reposición',
    cycle: 'V',
    activity:
      'Recibir el recurso de reposición y asignar al profesional para dar respuesta a dicho recurso.',
    responsible: 'Dependencia que necesite proferir acto administrativo',
  },
  {
    id: 'eaa-04-19',
    number: 19,
    type: 'activity',
    label: 'Evaluar cumplimiento de términos y antecedentes',
    cycle: 'V',
    activity:
      'Evaluar el cumplimiento de los términos de ley y los antecedentes administrativos del acto recurrido, incluyendo notificaciones surtidas, y determinar el cumplimiento de requisitos procesales para avocar conocimiento del recurso.',
    responsible: 'Dependencia que necesite proferir acto administrativo',
  },
  {
    id: 'eaa-04-20',
    number: 20,
    type: 'activity',
    label: 'Proyectar acto que resuelve recursos',
    cycle: 'V',
    activity:
      'Proyectar el acto administrativo que resuelve el o los recursos interpuestos.',
    responsible: 'Dependencia que necesite proferir acto administrativo',
  },
  {
    id: 'eaa-04-21',
    number: 21,
    type: 'activity',
    label: 'Remitir acto para revisión',
    cycle: 'A',
    activity:
      'Remitir para revisión el acto administrativo que resuelve el o los recursos.',
    responsible: 'Dependencia que necesite proferir acto administrativo',
  },
  {
    id: 'eaa-04-22',
    number: 22,
    type: 'activity',
    label: 'Aprobar y firmar acto administrativo',
    cycle: 'A',
    activity:
      'Aprobar y firmar el acto administrativo que resuelve el recurso de reposición.',
    responsible: 'Dependencia que necesite proferir acto administrativo',
  },
  {
    id: 'eaa-04-23',
    number: 23,
    type: 'decision',
    label: 'Devolver al área competente para ajustes',
    cycle: 'A',
    activity:
      'Devolver al área competente para que haga ajustes según observaciones.',
    responsible: 'Dependencia que necesite proferir acto administrativo',
    branches: [
      { label: 'SI', targetStepId: 'eaa-04-24' },
      { label: 'NO', targetStepId: 'eaa-04-23' },
    ],
  },
  {
    id: 'eaa-04-24',
    number: 24,
    type: 'activity',
    label: 'Notificar personalmente acto que resuelve recurso',
    cycle: 'A',
    activity:
      'Notificar personalmente el acto administrativo que resuelve el recurso.',
    responsible: 'Dependencia que necesite proferir acto administrativo',
  },
  {
    id: 'eaa-04-25',
    number: 25,
    type: 'activity',
    label: 'Emitir constancia de ejecutoria y archivar',
    cycle: 'A',
    activity:
      'Emitir la constancia de ejecutoria y archivar con todos los soportes en el expediente físico y electrónico.',
    responsible: 'Dependencia que necesite proferir acto administrativo',
  },
  {
    id: 'fin',
    number: 26,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const emisionConceptosJuridicosSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'evcj-05-1',
    number: 1,
    type: 'activity',
    label: 'Solicitar elaboración de concepto',
    cycle: 'P',
    activity: 'Solicitar la elaboración de un concepto.',
    responsible: 'Usuario interesado',
  },
  {
    id: 'evcj-05-2',
    number: 2,
    type: 'activity',
    label: 'Radicar solicitud en Secretaría de Gobierno',
    cycle: 'P',
    activity:
      'Radicar la solicitud al despacho de la Secretaría de Gobierno.',
    responsible: 'Usuario interesado',
  },
  {
    id: 'evcj-05-3',
    number: 3,
    type: 'activity',
    label: 'Estudiar competencia para resolver el concepto',
    cycle: 'H',
    activity:
      'Estudiar si la Secretaría de Gobierno es la competente para resolver el concepto jurídico puesto a consideración por parte de la dependencia de la administración solicitante.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'evcj-05-4',
    number: 4,
    type: 'activity',
    label: 'Entregar al asesor jurídico',
    cycle: 'H',
    activity:
      'Entregar al Asesor Jurídico para que proyecte el concepto.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'evcj-05-5',
    number: 5,
    type: 'activity',
    label: 'Analizar términos para resolver la consulta',
    cycle: 'V',
    activity:
      'Analizar que los términos para resolver la consulta no se encuentren vencidos, cuando no fuese posible resolver o contestar la consulta en el término de quince días en dicho plazo, se deberá informar a la dependencia peticionaria la fecha en que se resolverá o dará respuesta. Si es para particulares, la Ley establece treinta días; sin embargo, la Secretaría de Gobierno procura contestar por lo general antes de quince días.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'evcj-05-6',
    number: 6,
    type: 'activity',
    label: 'Proyectar emisión del concepto jurídico',
    cycle: 'V',
    activity:
      'Proyectar la emisión del concepto jurídico, revisar y firmar.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'evcj-05-7',
    number: 7,
    type: 'activity',
    label: 'Registrar respuesta con soportes',
    cycle: 'A',
    activity:
      'Registrar respuesta con los soportes o documentos requeridos, de igual manera con los particulares, pero haciendo la salvedad que frente a los particulares los conceptos no son obligatorios.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'evcj-05-8',
    number: 8,
    type: 'activity',
    label: 'Registrar y enviar concepto jurídico',
    cycle: 'A',
    activity:
      'Registrar y enviar el concepto jurídico a la Oficina solicitante o al peticionario, según el caso, para que se notifiquen personalmente o por correo certificado.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'evcj-05-9',
    number: 9,
    type: 'activity',
    label: 'Devolver a Secretaría de Despacho',
    cycle: 'A',
    activity:
      'Devolver a Secretaría de Despacho copia recibida o notificación.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'evcj-05-10',
    number: 10,
    type: 'activity',
    label: 'Entregar para archivar la respuesta',
    cycle: 'A',
    activity:
      'Entregar a Secretaría de Gobierno para archivar la respuesta.',
    responsible: 'Secretaría de Gobierno y Desarrollo Institucional',
  },
  {
    id: 'fin',
    number: 11,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const licitacionPublicaSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'lp-01-1', number: 1, type: 'activity', label: 'Generar lineamientos', cycle: 'P', activity: 'Generar lineamientos.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'lp-01-2', number: 2, type: 'activity', label: 'Identificación de la necesidad', cycle: 'P', activity: 'Identificación de la necesidad.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'lp-01-3', number: 3, type: 'activity', label: 'Determinar licencias, permisos, estudios y autorizaciones', cycle: 'P', activity: 'Determinación de licencias, permisos, estudios, diseños, planos, licencias o autorizaciones.', responsible: 'Jefe de dependencia que requiere contratación' },
  { id: 'lp-01-4', number: 4, type: 'activity', label: 'Verificación de presupuesto', cycle: 'P', activity: 'Verificación de presupuesto.', responsible: 'Secretaría de Hacienda' },
  { id: 'lp-01-5', number: 5, type: 'activity', label: 'Certificación del banco de proyectos', cycle: 'H', activity: 'Certificación del banco de proyectos.', responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura' },
  { id: 'lp-01-6', number: 6, type: 'activity', label: 'Certificación del Plan Anual de Adquisiciones', cycle: 'H', activity: 'Certificación del Plan Anual de Adquisiciones.', responsible: 'Secretaría de Hacienda' },
  { id: 'lp-01-7', number: 7, type: 'activity', label: 'Solicitud y expedición de CDP', cycle: 'H', activity: 'Solicitud de CDP y expedición de CDP.', responsible: 'Secretaría de Hacienda' },
  { id: 'lp-01-8', number: 8, type: 'activity', label: 'Estudios previos', cycle: 'H', activity: 'Estudios previos.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'lp-01-9', number: 9, type: 'activity', label: 'Asignación de número de proceso', cycle: 'H', activity: 'Asignación de número de proceso.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'lp-01-10', number: 10, type: 'activity', label: 'Estudio y análisis del sector', cycle: 'H', activity: 'Estudio y análisis del sector.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'lp-01-11', number: 11, type: 'activity', label: 'Aviso de convocatoria', cycle: 'H', activity: 'Aviso de convocatoria.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'lp-01-12', number: 12, type: 'activity', label: 'Proyecto de pliegos de condiciones', cycle: 'H', activity: 'Proyecto de pliegos de condiciones.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'lp-01-13', number: 13, type: 'activity', label: 'Anexos técnicos y documentos soporte', cycle: 'H', activity: 'Anexos técnicos y documentos soporte.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'lp-01-14', number: 14, type: 'activity', label: 'Publicar documentos precontractuales en SECOP', cycle: 'H', activity: 'Publicación de los documentos precontractuales en el SECOP.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'lp-01-15', number: 15, type: 'activity', label: 'Recepción y respuesta a observaciones', cycle: 'V', activity: 'Recepción y respuesta a observaciones presentadas al proyecto de pliegos y estudios previos.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'lp-01-16', number: 16, type: 'activity', label: 'Apertura del proceso de contratación', cycle: 'V', activity: 'Dar apertura al proceso de contratación.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'lp-01-17', number: 17, type: 'activity', label: 'Pliego definitivo', cycle: 'V', activity: 'Pliego de condiciones definitivo.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'lp-01-18', number: 18, type: 'activity', label: 'Audiencia de riesgos y aclaración de pliegos', cycle: 'V', activity: 'Audiencia para asignación de riesgos y aclaración de pliegos.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'lp-01-19', number: 19, type: 'activity', label: 'Adendas al pliego de condiciones', cycle: 'V', activity: 'Adendas para modificar el pliego de condiciones.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'lp-01-20', number: 20, type: 'activity', label: 'Recibir ofertas', cycle: 'V', activity: 'Recibir ofertas.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'lp-01-21', number: 21, type: 'activity', label: 'Cierre del proceso', cycle: 'V', activity: 'Cierre del proceso.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'lp-01-22', number: 22, type: 'activity', label: 'Designar comité evaluador', cycle: 'V', activity: 'Designar comité evaluador y evaluación de los oferentes.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'lp-01-23', number: 23, type: 'activity', label: 'Traslado del informe de evaluación', cycle: 'V', activity: 'Traslado del informe de evaluación.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'lp-01-24', number: 24, type: 'activity', label: 'Respuesta a observaciones del informe', cycle: 'V', activity: 'Respuesta a las observaciones del informe de evaluación.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'lp-01-25', number: 25, type: 'activity', label: 'Audiencia de adjudicación o declaratoria desierta', cycle: 'V', activity: 'Audiencia de adjudicación del proceso o declaratoria de desierto.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'lp-01-26', number: 26, type: 'activity', label: 'Elaborar minuta contractual', cycle: 'V', activity: 'Elaborar minuta contractual.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'lp-01-27', number: 27, type: 'activity', label: 'Aprobación de pólizas de garantía', cycle: 'V', activity: 'Constitución y aprobación de pólizas de garantía.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'lp-01-28', number: 28, type: 'activity', label: 'Elaborar acta de inicio', cycle: 'A', activity: 'Elaborar acta de inicio.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'lp-01-29', number: 29, type: 'activity', label: 'Informes de supervisión o interventoría', cycle: 'A', activity: 'Elaborar informes de supervisión y/o interventoría.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'lp-01-30', number: 30, type: 'activity', label: 'Liquidación del contrato', cycle: 'A', activity: 'Liquidación del contrato.', responsible: 'Oficina de Contratación' },
  { id: 'fin', number: 31, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const contratacionDirectaSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'cd-02-1', number: 1, type: 'activity', label: 'Identificar la necesidad', cycle: 'P', activity: 'Identificar la necesidad.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'cd-02-2', number: 2, type: 'activity', label: 'Establecer lineamientos para la hoja de ruta', cycle: 'P', activity: 'Establecer lineamientos para la Hoja de Ruta.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'cd-02-3', number: 3, type: 'activity', label: 'Enviar documentación propuesta', cycle: 'P', activity: 'Envío de documentación propuesta en la Hoja de Ruta física o en la Secretaría de Gobierno y Desarrollo Institucional.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'cd-02-4', number: 4, type: 'activity', label: 'Verificar presupuesto', cycle: 'P', activity: 'Verificar el presupuesto.', responsible: 'Secretaría de Hacienda' },
  { id: 'cd-02-5', number: 5, type: 'activity', label: 'Expedir certificación del banco de proyectos', cycle: 'H', activity: 'Expedir la certificación del banco de proyectos.', responsible: 'Secretaría de Planeación y Seguimiento a la Infraestructura' },
  { id: 'cd-02-6', number: 6, type: 'activity', label: 'Certificación del Plan Anual de Adquisiciones', cycle: 'H', activity: 'Expedir la certificación del Plan Anual de Adquisiciones.', responsible: 'Secretaría de Hacienda' },
  { id: 'cd-02-7', number: 7, type: 'activity', label: 'Solicitud y expedición del CDP', cycle: 'H', activity: 'Realizar la solicitud y expedición del CDP.', responsible: 'Secretaría de Hacienda' },
  { id: 'cd-02-8', number: 8, type: 'activity', label: 'Acto administrativo de justificación', cycle: 'H', activity: 'Elaborar acto administrativo de justificación.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'cd-02-9', number: 9, type: 'activity', label: 'Certificar inexistencia de personal', cycle: 'H', activity: 'Certificar la inexistencia de personal.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'cd-02-10', number: 10, type: 'activity', label: 'Realizar estudios previos', cycle: 'H', activity: 'Realizar estudios previos.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'cd-02-11', number: 11, type: 'activity', label: 'Allegar anexos a estudios previos', cycle: 'H', activity: 'Allegar anexos a estudios previos.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'cd-02-12', number: 12, type: 'activity', label: 'Convocar veedurías', cycle: 'H', activity: 'Convocar a las veedurías.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cd-02-13', number: 13, type: 'activity', label: 'Presentar propuesta', cycle: 'H', activity: 'Presentar la propuesta.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cd-02-14', number: 14, type: 'activity', label: 'Recepcionar propuesta', cycle: 'H', activity: 'Recepcionar la propuesta.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cd-02-15', number: 15, type: 'activity', label: 'Analizar hoja de vida o propuesta', cycle: 'V', activity: 'Analizar la Hoja de Vida y/o propuesta.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'cd-02-16', number: 16, type: 'activity', label: 'Evaluar requisitos del contratista', cycle: 'V', activity: 'Se evalúa si el contratista cumple con los requisitos exigidos por la entidad.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cd-02-17', number: 17, type: 'activity', label: 'Elaborar minuta contractual', cycle: 'V', activity: 'Elaborar la minuta en la cual se establece el objeto, plazo, valor, actividades, disposiciones presupuestales y obligaciones.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cd-02-18', number: 18, type: 'activity', label: 'Designar supervisor', cycle: 'A', activity: 'Designar al supervisor que deberá actuar de conformidad con el artículo 83 de la Ley 1474 de 2011.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cd-02-19', number: 19, type: 'activity', label: 'Solicitar y expedir Registro Presupuestal', cycle: 'A', activity: 'Solicitar y expedir el Registro Presupuestal.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cd-02-20', number: 20, type: 'activity', label: 'Elaborar acta de inicio', cycle: 'A', activity: 'Elaborar acta de inicio.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cd-02-21', number: 21, type: 'activity', label: 'Elaborar informes de supervisión', cycle: 'A', activity: 'Elaborar informes de supervisión.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cd-02-22', number: 22, type: 'activity', label: 'Liquidar contrato', cycle: 'A', activity: 'Liquidar el contrato.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'fin', number: 23, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const concursoMeritosSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'cm-03-1', number: 1, type: 'activity', label: 'Generar lineamientos', cycle: 'P', activity: 'Generar lineamientos.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'cm-03-2', number: 2, type: 'activity', label: 'Establecer necesidad', cycle: 'P', activity: 'Dependencia establece una necesidad.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'cm-03-3', number: 3, type: 'activity', label: 'Expedición CDP y banco de proyectos', cycle: 'P', activity: 'Expedición de CDP y banco de proyectos.', responsible: 'Secretaría de Hacienda' },
  { id: 'cm-03-4', number: 4, type: 'activity', label: 'Enviar ficha técnica de ítems', cycle: 'P', activity: 'Enviar por correo ficha técnica de ítems a contratar con especificaciones puntuales.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'cm-03-5', number: 5, type: 'activity', label: 'Generar estudios previos y prepliegos', cycle: 'P', activity: 'Generación de estudios previos, prepliegos, análisis del sector y resolución de apertura.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'cm-03-6', number: 6, type: 'activity', label: 'Verificación por la dependencia', cycle: 'P', activity: 'Verificación por parte de la dependencia.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'cm-03-7', number: 7, type: 'activity', label: 'Visto bueno del proceso', cycle: 'P', activity: 'Visto bueno del proceso por parte de la dependencia.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'cm-03-8', number: 8, type: 'activity', label: 'Asignación de número de proceso', cycle: 'P', activity: 'Asignación de número de proceso.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cm-03-9', number: 9, type: 'activity', label: 'Aviso de convocatoria', cycle: 'P', activity: 'Aviso de convocatoria.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cm-03-10', number: 10, type: 'activity', label: 'Proyecto de pliegos de condiciones', cycle: 'H', activity: 'Proyecto de pliegos de condiciones.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cm-03-11', number: 11, type: 'activity', label: 'Publicar documentos precontractuales', cycle: 'H', activity: 'Publicación de los documentos precontractuales en el SECOP.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cm-03-12', number: 12, type: 'activity', label: 'Responder observaciones', cycle: 'H', activity: 'Recepción y respuesta a observaciones presentadas al proyecto de pliegos y estudios previos.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cm-03-13', number: 13, type: 'activity', label: 'Apertura del proceso', cycle: 'H', activity: 'Dar apertura al proceso de contratación.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cm-03-14', number: 14, type: 'activity', label: 'Pliego definitivo', cycle: 'H', activity: 'Pliego de condiciones definitivo.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cm-03-15', number: 15, type: 'activity', label: 'Adendas al pliego', cycle: 'H', activity: 'Adendas para modificar el pliego de condiciones.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cm-03-16', number: 16, type: 'activity', label: 'Recibir ofertas', cycle: 'V', activity: 'Recibir ofertas.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cm-03-17', number: 17, type: 'activity', label: 'Cierre del proceso', cycle: 'V', activity: 'Cierre del proceso.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cm-03-18', number: 18, type: 'activity', label: 'Designar comité evaluador', cycle: 'V', activity: 'Designar comité evaluador.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cm-03-19', number: 19, type: 'activity', label: 'Informe de evaluación de ofertas', cycle: 'V', activity: 'Informe de evaluación de ofertas.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cm-03-20', number: 20, type: 'activity', label: 'Responder observaciones al informe', cycle: 'V', activity: 'Respuesta a las observaciones del informe de evaluación.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cm-03-21', number: 21, type: 'activity', label: 'Subsanaciones', cycle: 'V', activity: 'Subsanaciones.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'cm-03-22', number: 22, type: 'activity', label: 'Adjudicación de contrato', cycle: 'V', activity: 'Adjudicación de contrato.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cm-03-23', number: 23, type: 'decision', label: '¿Declaración de desierto?', cycle: 'V', activity: 'Declaración de desierto.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional', branches: [{ label: 'SI', targetStepId: 'fin' }, { label: 'NO', targetStepId: 'cm-03-24' }] },
  { id: 'cm-03-24', number: 24, type: 'activity', label: 'Constitución y aprobación de pólizas', cycle: 'V', activity: 'Constitución y aprobación de pólizas de garantía.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cm-03-25', number: 25, type: 'activity', label: 'Excepcionar pólizas y actas de inicio', cycle: 'A', activity: 'Se excepcionan pólizas y actas de inicio.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cm-03-26', number: 26, type: 'activity', label: 'Elaborar acta de inicio', cycle: 'A', activity: 'Elaborar acta de inicio.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cm-03-27', number: 27, type: 'activity', label: 'Informes de supervisión o interventoría', cycle: 'A', activity: 'Elaborar informes de supervisión y/o interventoría.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cm-03-28', number: 28, type: 'activity', label: 'Liquidación del contrato', cycle: 'A', activity: 'Liquidación del contrato.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'fin', number: 29, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const seleccionAbreviadaSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'sa-04-1', number: 1, type: 'activity', label: 'Generar lineamientos', cycle: 'P', activity: 'Generar lineamientos.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'sa-04-2', number: 2, type: 'activity', label: 'Establecer necesidad', cycle: 'P', activity: 'Dependencia establece una necesidad.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'sa-04-3', number: 3, type: 'activity', label: 'Expedición CDP y banco de proyectos', cycle: 'P', activity: 'Expedición de CDP y banco de proyectos.', responsible: 'Secretaría de Hacienda' },
  { id: 'sa-04-4', number: 4, type: 'activity', label: 'Enviar ficha técnica de ítems', cycle: 'P', activity: 'Enviar por correo ficha técnica de ítems a contratar con especificaciones puntuales.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'sa-04-5', number: 5, type: 'activity', label: 'Generar estudios previos y prepliegos', cycle: 'P', activity: 'Generación de estudios previos, prepliegos, análisis del sector y resolución de apertura.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'sa-04-6', number: 6, type: 'activity', label: 'Verificación por dependencia', cycle: 'P', activity: 'Verificación por parte de la dependencia.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'sa-04-7', number: 7, type: 'activity', label: 'Visto bueno del proceso', cycle: 'P', activity: 'Visto bueno del proceso por parte de la dependencia.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'sa-04-8', number: 8, type: 'activity', label: 'Cargue en SECOP', cycle: 'H', activity: 'Cargue en el SECOP.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'sa-04-9', number: 9, type: 'activity', label: 'Habilitar observaciones al pliego', cycle: 'H', activity: 'Se habilitan tres a cuatro días para formular observaciones al pliego de condiciones y manifestaciones de Mipymes.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'sa-04-10', number: 10, type: 'activity', label: 'Responder observaciones', cycle: 'H', activity: 'Respuesta a observaciones, cargue de resolución de apertura del proceso y pliego de condiciones definitivo.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'sa-04-11', number: 11, type: 'activity', label: 'Habilitar observaciones al pliego definitivo', cycle: 'H', activity: 'Se habilitan cuatro días para observaciones al pliego de condiciones definitivo.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'sa-04-12', number: 12, type: 'activity', label: 'Respuestas y publicación', cycle: 'V', activity: 'Dar respuestas y publicación a las observaciones.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'sa-04-13', number: 13, type: 'activity', label: 'Adendar proceso', cycle: 'V', activity: 'El mismo día se decide si se adenda el proceso.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'sa-04-14', number: 14, type: 'activity', label: 'Cierre del proceso', cycle: 'V', activity: 'Cierre del proceso al día hábil siguiente.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'sa-04-15', number: 15, type: 'activity', label: 'Expedir planilla de recepción de ofertas', cycle: 'V', activity: 'Expedir planilla de recepción de ofertas.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'sa-04-16', number: 16, type: 'activity', label: 'Levantamiento del acta de cierre', cycle: 'V', activity: 'Levantamiento del acta de cierre con hora, fecha, proponente, garantía o póliza, valor asegurado, carta de presentación firmada, NIT o cédula y número de folios de la propuesta.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'sa-04-17', number: 17, type: 'activity', label: 'Cargar a SECOP', cycle: 'V', activity: 'Cargar a SECOP, planilla de recepción de ofertas y acta de cierre.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'sa-04-18', number: 18, type: 'activity', label: 'Evaluación del proceso', cycle: 'V', activity: 'Se habilitan dos a tres días para realizar la evaluación del proceso.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'sa-04-19', number: 19, type: 'activity', label: 'Publicar informe preliminar', cycle: 'V', activity: 'Publicar informe de evaluación preliminar.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'sa-04-20', number: 20, type: 'activity', label: 'Observaciones al informe preliminar', cycle: 'V', activity: 'Tres días hábiles para que los proponentes hagan observaciones al informe preliminar.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'sa-04-21', number: 21, type: 'activity', label: 'Respuesta a observaciones', cycle: 'V', activity: 'Respuesta a observaciones.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'sa-04-22', number: 22, type: 'activity', label: 'Publicación del estudio final', cycle: 'V', activity: 'Publicación del estudio final.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'sa-04-23', number: 23, type: 'activity', label: 'Reforma de adjudicación', cycle: 'A', activity: 'Se realiza una reforma de adjudicación del contrato a quien cumpla los requisitos.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'sa-04-24', number: 24, type: 'activity', label: 'Expedir contrato', cycle: 'A', activity: 'Tres días hábiles para expedir el contrato.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'sa-04-25', number: 25, type: 'activity', label: 'Excepcionar pólizas y actas de inicio', cycle: 'A', activity: 'Se excepcionan pólizas y actas de inicio.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'sa-04-26', number: 26, type: 'activity', label: 'Respuesta a observaciones', cycle: 'A', activity: 'Respuesta a observaciones.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'fin', number: 27, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const minimaCuantiaSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'mc-05-1', number: 1, type: 'activity', label: 'Generar lineamientos del contrato', cycle: 'P', activity: 'Generar lineamientos para el desarrollo del contrato.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'mc-05-2', number: 2, type: 'activity', label: 'Recepcionar estudios previos', cycle: 'P', activity: 'Recepcionar estudios previos, análisis del sector e invitación pública.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'mc-05-3', number: 3, type: 'activity', label: 'Recepcionar CDP o banco de proyectos', cycle: 'P', activity: 'Recepcionar el CDP y/o banco de proyectos.', responsible: 'Secretaría de Hacienda' },
  { id: 'mc-05-4', number: 4, type: 'activity', label: 'Recepcionar cotizaciones', cycle: 'P', activity: 'Recepcionar cotizaciones junto con el Excel de los ítems a contratar y los valores fijados por cada cotización para establecer el valor del contrato.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'mc-05-5', number: 5, type: 'activity', label: 'Revisar documentos enviados', cycle: 'P', activity: 'Revisar documentos enviados en dos a tres días.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'mc-05-6', number: 6, type: 'activity', label: 'Dar visto bueno para cargue', cycle: 'P', activity: 'Dar el visto bueno para el cargue en la plataforma.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'mc-05-7', number: 7, type: 'activity', label: 'Concertar cronograma', cycle: 'P', activity: 'Concertar el cronograma del contrato.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'mc-05-8', number: 8, type: 'activity', label: 'Cargar al SECOP', cycle: 'H', activity: 'Cargar al SECOP del proceso.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'mc-05-9', number: 9, type: 'activity', label: 'Habilitar proceso', cycle: 'H', activity: 'Habilitar el proceso durante uno a dos días.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'mc-05-10', number: 10, type: 'activity', label: 'Cerrar proceso en SECOP', cycle: 'H', activity: 'Cerrar el proceso en SECOP.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'mc-05-11', number: 11, type: 'activity', label: 'Generar planilla de recepción', cycle: 'H', activity: 'Generar planilla de recepción de ofertas.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'mc-05-12', number: 12, type: 'activity', label: 'Radicar propuesta', cycle: 'V', activity: 'Radicar la propuesta en la dependencia encargada, en la planilla de recepción de ofertas.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'mc-05-13', number: 13, type: 'activity', label: 'Expedir acta de cierre', cycle: 'V', activity: 'Expedir el acta de cierre con hora, fecha, nombre del proponente, número de folios de la propuesta y acta de la propuesta.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'mc-05-14', number: 14, type: 'activity', label: 'Firmar por Secretaría de Gobierno', cycle: 'V', activity: 'Firmar por parte de Secretaría de Gobierno y Desarrollo Institucional.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'mc-05-15', number: 15, type: 'activity', label: 'Cargar documentos a SECOP', cycle: 'V', activity: 'Cargar documentos a SECOP.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'mc-05-16', number: 16, type: 'activity', label: 'Remitir propuestas', cycle: 'V', activity: 'Remitir las propuestas a las respectivas secretarías.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'mc-05-17', number: 17, type: 'activity', label: 'Verificar requisitos en oferentes', cycle: 'V', activity: 'Verificar requisitos en los oferentes.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'mc-05-18', number: 18, type: 'activity', label: 'Informar evaluación preliminar', cycle: 'V', activity: 'Informar sobre la evaluación preliminar.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'mc-05-19', number: 19, type: 'activity', label: 'Informar evaluación final', cycle: 'V', activity: 'Informar sobre la evaluación final o definitiva.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'mc-05-20', number: 20, type: 'activity', label: 'Aceptar oferta', cycle: 'V', activity: 'Aceptar oferta.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'mc-05-21', number: 21, type: 'activity', label: 'Firmar documento', cycle: 'V', activity: 'Firmar el documento.', responsible: 'Alcalde' },
  { id: 'mc-05-22', number: 22, type: 'activity', label: 'Supervisar pólizas', cycle: 'V', activity: 'Supervisar pólizas.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'mc-05-23', number: 23, type: 'activity', label: 'Enviar a Registro Presupuestal', cycle: 'A', activity: 'Enviar a Registro Presupuestal.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'mc-05-24', number: 24, type: 'activity', label: 'Emitir Registro Presupuestal', cycle: 'A', activity: 'Emitir el Registro Presupuestal.', responsible: 'Secretaría de Hacienda' },
  { id: 'mc-05-25', number: 25, type: 'activity', label: 'Emitir acta de inicio', cycle: 'A', activity: 'Emitir acta de inicio.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'mc-05-26', number: 26, type: 'activity', label: 'Aprobar pólizas', cycle: 'A', activity: 'Aprobar pólizas.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'mc-05-27', number: 27, type: 'activity', label: 'Recepcionar contrato firmado', cycle: 'A', activity: 'Recepcionar contrato firmado y acta de inicio.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'mc-05-28', number: 28, type: 'activity', label: 'Archivar contrato', cycle: 'A', activity: 'Archivar el contrato.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'mc-05-29', number: 29, type: 'activity', label: 'Presentar informes de contrato', cycle: 'A', activity: 'Presentar informes de contrato.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'fin', number: 30, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const presentacionCuentasCobroSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'pcc-10-1', number: 1, type: 'activity', label: 'Presentar documentación completa', cycle: 'P', activity: 'Presentar la documentación completa y depurada, que no contendrá documentos duplicados.', responsible: 'Contratista' },
  { id: 'pcc-10-2', number: 2, type: 'activity', label: 'Diligenciar documentación', cycle: 'H', activity: 'Diligenciar la documentación de forma clara, atendiendo a los formatos establecidos para tal hecho.', responsible: 'Contratista' },
  { id: 'pcc-10-3', number: 3, type: 'activity', label: 'Respetar organización de documentos', cycle: 'V', activity: 'Respetar la organización correcta de los documentos, incluyendo objeto del contrato, nombre del contratista, término de ejecución, valor del contrato, plan de pagos, aprobación de garantías cuando aplique, RP, fechas de designación de interventor o supervisor, planilla y soporte de pago de seguridad social, afiliación ARL, fecha de inicio, fecha de liquidación y RUT con responsabilidades tributarias.', responsible: 'Contratista' },
  { id: 'pcc-10-4', number: 4, type: 'activity', label: 'Radicar solicitud', cycle: 'A', activity: 'Radicar en la Secretaría de Gobierno.', responsible: 'Contratista' },
  { id: 'pcc-10-5', number: 5, type: 'decision', label: '¿Cumple con los requisitos?', cycle: 'A', activity: 'Verificar si cumple con los requisitos.', responsible: 'Contratista', branches: [{ label: 'NO', targetStepId: 'pcc-10-4' }, { label: 'SI', targetStepId: 'fin' }] },
  { id: 'fin', number: 6, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const estudioPrevioSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'ep-08-1', number: 1, type: 'activity', label: 'Identificar necesidad según análisis del sector', cycle: 'P', activity: 'Identificación de necesidad conforme al análisis del sector.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'ep-08-2', number: 2, type: 'activity', label: 'Definir ítems, plazo y forma de pago', cycle: 'P', activity: 'Definición de ítems a contratar, plazo de ejecución, forma de pago y obligaciones generales y específicas.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'ep-08-3', number: 3, type: 'activity', label: 'Enviar información a Secretaría de Gobierno', cycle: 'H', activity: 'Enviar correo a la Secretaría de Gobierno y Desarrollo Institucional adjuntando la información diligenciada anteriormente.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'ep-08-4', number: 4, type: 'activity', label: 'Formular carpeta de documentación', cycle: 'H', activity: 'Formular una carpeta donde quedará registrada la documentación.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'ep-08-5', number: 5, type: 'activity', label: 'Revisar documentación en carpeta', cycle: 'V', activity: 'Revisar documentación registrada en la carpeta.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'ep-08-6', number: 6, type: 'activity', label: 'Expedir documento final', cycle: 'V', activity: 'Expedición de documento final.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'ep-08-7', number: 7, type: 'activity', label: 'Concertar cronograma con contratista', cycle: 'A', activity: 'Concertar el cronograma con el contratista para la ejecución de actividades.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'ep-08-8', number: 8, type: 'activity', label: 'Dar visto bueno', cycle: 'A', activity: 'Dar el visto bueno.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'ep-08-9', number: 9, type: 'activity', label: 'Cargar documentación final en SECOP', cycle: 'A', activity: 'Cargar la documentación final en el SECOP.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'fin', number: 10, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const subastaInversaSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'si-09-1', number: 1, type: 'activity', label: 'Generar lineamientos', cycle: 'P', activity: 'Generar lineamientos.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'si-09-2', number: 2, type: 'activity', label: 'Establecer necesidad', cycle: 'P', activity: 'Dependencia establece una necesidad.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'si-09-3', number: 3, type: 'activity', label: 'Expedición CDP y banco de proyectos', cycle: 'P', activity: 'Expedición de CDP y banco de proyectos.', responsible: 'Secretaría de Hacienda' },
  { id: 'si-09-4', number: 4, type: 'activity', label: 'Enviar ficha técnica de ítems', cycle: 'P', activity: 'Enviar por correo ficha técnica de ítems a contratar con especificaciones puntuales.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'si-09-5', number: 5, type: 'activity', label: 'Generar estudios previos', cycle: 'P', activity: 'Generación de estudios previos, prepliegos y análisis del sector.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'si-09-6', number: 6, type: 'activity', label: 'Verificación por dependencia', cycle: 'P', activity: 'Verificación por parte de la dependencia.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'si-09-7', number: 7, type: 'activity', label: 'Visto bueno del proceso', cycle: 'P', activity: 'Visto bueno del proceso por parte de la dependencia.', responsible: 'Área donde nace la necesidad de contratación' },
  { id: 'si-09-8', number: 8, type: 'activity', label: 'Cargue en SECOP', cycle: 'P', activity: 'Cargue en el SECOP.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'si-09-9', number: 9, type: 'activity', label: 'Habilitar observaciones al pliego', cycle: 'H', activity: 'Se habilitan tres a cuatro días para formular observaciones al pliego de condiciones y manifestaciones de Mipymes.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'si-09-10', number: 10, type: 'activity', label: 'Responder observaciones', cycle: 'H', activity: 'Respuesta a observaciones, cargue de resolución de apertura del proceso y pliego de condiciones definitivos.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'si-09-11', number: 11, type: 'activity', label: 'Observaciones al pliego definitivo', cycle: 'H', activity: 'Se habilitan cuatro días para observaciones al pliego de condiciones definitivo.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'si-09-12', number: 12, type: 'activity', label: 'Dar respuestas y publicar observaciones', cycle: 'H', activity: 'Dar respuestas y publicación a las observaciones.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'si-09-13', number: 13, type: 'activity', label: 'Adendar proceso', cycle: 'H', activity: 'El mismo día se decide si se adenda el proceso.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'si-09-14', number: 14, type: 'activity', label: 'Cierre del proceso', cycle: 'H', activity: 'Cierre del proceso al día hábil siguiente.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'si-09-15', number: 15, type: 'activity', label: 'Expedir planilla de recepción', cycle: 'V', activity: 'Expedir planilla de recepción de ofertas.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'si-09-16', number: 16, type: 'activity', label: 'Levantamiento del acta de cierre', cycle: 'V', activity: 'Levantamiento del acta de cierre con hora, fecha, proponente, garantía o póliza, valor asegurado, carta de presentación firmada, NIT o cédula, número de folios de la propuesta.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'si-09-17', number: 17, type: 'activity', label: 'Cargar a SECOP', cycle: 'V', activity: 'Cargar a SECOP, planilla de recepción de ofertas y acta de cierre.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'si-09-18', number: 18, type: 'activity', label: 'Realizar evaluación', cycle: 'V', activity: 'Se habilitan dos a tres días para realizar la evaluación del proceso.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'si-09-19', number: 19, type: 'activity', label: 'Publicar informe preliminar', cycle: 'V', activity: 'Publicar informe de evaluación preliminar.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'si-09-20', number: 20, type: 'activity', label: 'Observaciones al informe preliminar', cycle: 'V', activity: 'Tres días hábiles para que los proponentes hagan observaciones al informe preliminar.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'si-09-21', number: 21, type: 'activity', label: 'Respuesta a observaciones', cycle: 'V', activity: 'Respuesta a observaciones.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'si-09-22', number: 22, type: 'activity', label: 'Publicación del estudio final', cycle: 'V', activity: 'Publicación del estudio final.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'si-09-23', number: 23, type: 'activity', label: 'Reforma de adjudicación', cycle: 'A', activity: 'Se realiza una reforma de adjudicación del contrato a quien cumpla los requisitos.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'si-09-24', number: 24, type: 'activity', label: 'Expedir contrato', cycle: 'A', activity: 'Tres días hábiles para expedir el contrato.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'si-09-25', number: 25, type: 'activity', label: 'Excepcionar pólizas y actas de inicio', cycle: 'A', activity: 'Se excepcionan pólizas y actas de inicio.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'si-09-26', number: 26, type: 'activity', label: 'Respuesta a observaciones', cycle: 'A', activity: 'Respuesta a observaciones.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'fin', number: 27, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const revisionCuentasCobroContractualSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'rcc-07-1', number: 1, type: 'activity', label: 'Recibir facturas o cuentas de cobro', cycle: 'P', activity: 'Recibir facturas o cuentas de cobro y verificar requisitos de las facturas o cuentas de cobro.', responsible: 'Área o dependencia donde nace la necesidad' },
  { id: 'rcc-07-2', number: 2, type: 'decision', label: '¿Cumple los requisitos?', cycle: 'P', activity: 'Verificar si los documentos cumplen con los requerimientos solicitados por la dependencia.', responsible: 'Área o dependencia donde nace la necesidad', branches: [{ label: 'NO', targetStepId: 'rcc-07-3' }, { label: 'SI', targetStepId: 'rcc-07-4' }] },
  { id: 'rcc-07-3', number: 3, type: 'activity', label: 'Devolver factura o cuenta de cobro', cycle: 'H', activity: 'Devolver factura o cuenta de cobro.', responsible: 'Área o dependencia donde nace la necesidad' },
  { id: 'rcc-07-4', number: 4, type: 'activity', label: 'Ingresar información al SIAFI', cycle: 'H', activity: 'Ingresar información de la factura o cuenta de cobro al Sistema SIAFI e imprimir la orden de pago en estado aprobado.', responsible: 'Área o dependencia donde nace la necesidad' },
  { id: 'rcc-07-5', number: 5, type: 'activity', label: 'Entregar orden de pago con soportes', cycle: 'H', activity: 'Entregar original de la orden de pago con los documentos soporte.', responsible: 'Área o dependencia donde nace la necesidad' },
  { id: 'rcc-07-6', number: 6, type: 'activity', label: 'Revisar información contable y presupuestal', cycle: 'V', activity: 'Revisar información contable, presupuestal y tributaria de las órdenes de pago y de los documentos soporte.', responsible: 'Área o dependencia donde nace la necesidad' },
  { id: 'rcc-07-7', number: 7, type: 'activity', label: 'Causar y firmar órdenes de pago', cycle: 'V', activity: 'Causar, firmar órdenes de pago y entregar al Subdirector Administrativo y Financiero órdenes de pago causadas y firmadas.', responsible: 'Área o dependencia donde nace la necesidad' },
  { id: 'rcc-07-8', number: 8, type: 'activity', label: 'Autorizar orden de pago', cycle: 'V', activity: 'Autorizar la orden de pago y entregar.', responsible: 'Área o dependencia donde nace la necesidad' },
  { id: 'rcc-07-9', number: 9, type: 'activity', label: 'Imprimir libro de radicación', cycle: 'V', activity: 'Imprimir el libro de radicación de órdenes de pago causadas y verificar que estén causadas y entregar las órdenes de pago y relación.', responsible: 'Área o dependencia donde nace la necesidad' },
  { id: 'rcc-07-10', number: 10, type: 'activity', label: 'Entregar órdenes de pago', cycle: 'A', activity: 'Entregar las órdenes de pago y relación al ordenador del gasto para su firma y enviar a la Tesorería.', responsible: 'Área o dependencia donde nace la necesidad' },
  { id: 'rcc-07-11', number: 11, type: 'activity', label: 'Autorizar gasto', cycle: 'A', activity: 'Autorizar el gasto, firmando las órdenes de pago y entregar a la Secretaría.', responsible: 'Área o dependencia donde nace la necesidad' },
  { id: 'rcc-07-12', number: 12, type: 'activity', label: 'Enviar órdenes de pago y relación', cycle: 'A', activity: 'Enviar las órdenes de pago y relación.', responsible: 'Área o dependencia donde nace la necesidad' },
  { id: 'fin', number: 13, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const organizacionArchivosGestionSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'oag-01-1', number: 1, type: 'activity', label: 'Clasificar documentos según TRD', cycle: 'P', activity: 'Clasificar documentos conforme a lo establecido por las Tablas de Retención Documental - TRD.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'oag-01-2', number: 2, type: 'activity', label: 'Conformar carpeta según series y subseries', cycle: 'P', activity: 'Conformar la carpeta según las series y subseries de la TRD.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'oag-01-3', number: 3, type: 'activity', label: 'Elaborar hoja de control', cycle: 'P', activity: 'Elaborar la hoja de control.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'oag-01-4', number: 4, type: 'activity', label: 'Ordenar expedientes internamente', cycle: 'H', activity: 'Ordenar de manera interna los expedientes.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'oag-01-5', number: 5, type: 'activity', label: 'Foliar documentación', cycle: 'H', activity: 'Foliar la documentación.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'oag-01-6', number: 6, type: 'activity', label: 'Rotular carpetas', cycle: 'V', activity: 'Rotular las carpetas identificando las series y subseries establecidas en las TRD.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'oag-01-7', number: 7, type: 'activity', label: 'Ordenar carpetas', cycle: 'A', activity: 'Ordenación de las carpetas.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'oag-01-8', number: 8, type: 'activity', label: 'Rotular cajas y ubicar carpetas', cycle: 'A', activity: 'Rotulación de las cajas y ubicación de las carpetas en el Archivo de Gestión.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'oag-01-12', number: 12, type: 'activity', label: 'Diligenciar inventario documental', cycle: 'A', activity: 'Diligenciar el Formato Único de Inventario Documental.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'fin', number: 13, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const organizacionArchivoCentralSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'oac-02-1', number: 1, type: 'activity', label: 'Clasificar documentos según TRD', cycle: 'P', activity: 'Clasificar los documentos conforme a lo establecido por las Tablas de Retención Documental - TRD.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'oac-02-2', number: 2, type: 'activity', label: 'Conformar carpeta según series y subseries', cycle: 'P', activity: 'Conformar la carpeta según las series y subseries de la TRD.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'oac-02-3', number: 3, type: 'activity', label: 'Elaborar hoja de control', cycle: 'P', activity: 'Elaborar la hoja de control.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'oac-02-4', number: 4, type: 'activity', label: 'Ordenar expedientes internamente', cycle: 'H', activity: 'Ordenar de forma interna los expedientes.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'oac-02-5', number: 5, type: 'activity', label: 'Foliar documentación', cycle: 'H', activity: 'Foliar la documentación.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'oac-02-6', number: 6, type: 'activity', label: 'Rotular carpetas', cycle: 'V', activity: 'Rotular las carpetas identificando las series y subseries establecidas en las TRD.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'oac-02-7', number: 7, type: 'activity', label: 'Ordenar carpetas', cycle: 'A', activity: 'Ordenar en las carpetas.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'oac-02-8', number: 8, type: 'activity', label: 'Rotular cajas y ubicar carpetas', cycle: 'A', activity: 'Rotular las cajas y ubicación de las carpetas en el Archivo de Gestión.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'oac-02-12', number: 12, type: 'activity', label: 'Diligenciar inventario documental', cycle: 'A', activity: 'Diligenciar el Formato Único de Inventario.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'fin', number: 13, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const consultaPrestamoDocumentosSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'cpd-03-1', number: 1, type: 'activity', label: 'Solicitar documentos del Archivo Central', cycle: 'P', activity: 'Solicitar documentos del Archivo Central.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cpd-03-2', number: 2, type: 'activity', label: 'Consultar documentos del Archivo Central', cycle: 'H', activity: 'Consultar los documentos del Archivo Central.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cpd-03-3', number: 3, type: 'decision', label: '¿Se aprueba la solicitud de préstamo?', cycle: 'V', activity: 'Revisar y aprobar la solicitud de préstamo de documentos, verificando que la información solicitada tenga carácter de reserva conforme a la Constitución y la ley. En lo posible se deben anexar los documentos que exigen consulta para conservar la documentación.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional', branches: [{ label: 'SI', targetStepId: 'cpd-03-4' }, { label: 'NO', targetStepId: 'fin' }] },
  { id: 'cpd-03-4', number: 4, type: 'activity', label: 'Devolver documentación prestada', cycle: 'A', activity: 'Devolver la documentación prestada.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cpd-03-5', number: 5, type: 'activity', label: 'Recibir y verificar documentación', cycle: 'A', activity: 'Recibir y verificar la documentación.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'cpd-03-12', number: 12, type: 'activity', label: 'Solicitar reprografías', cycle: 'A', activity: 'Solicitar reprografías de documentos, diligenciando el formato de solicitud. En un término de dos días hábiles serán entregadas las copias necesarias, siempre que el funcionario del Archivo Central responsable saque las copias de los documentos solicitados y el solicitante asuma el costo correspondiente.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'fin', number: 13, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const transferenciasDocumentalesSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'td-04-1', number: 1, type: 'activity', label: 'Elaborar programa anual de transferencias', cycle: 'P', activity: 'Elaborar programa anual de transferencias.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'td-04-2', number: 2, type: 'activity', label: 'Comunicar programación de transferencias', cycle: 'P', activity: 'Comunicar a productores documentales la programación definitiva de transferencias.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'td-04-3', number: 3, type: 'activity', label: 'Preparar físicamente la documentación', cycle: 'P', activity: 'Preparación física de la documentación.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'td-04-4', number: 4, type: 'activity', label: 'Numerar carpetas y elaborar inventario', cycle: 'H', activity: 'Numeración de carpetas y elaboración de inventario.', responsible: 'Secretaría de Gobierno' },
  { id: 'td-04-5', number: 5, type: 'activity', label: 'Presentar solicitud de transferencia', cycle: 'H', activity: 'Presentar la solicitud de transferencia documental.', responsible: 'Secretaría de Gobierno' },
  { id: 'td-04-6', number: 6, type: 'activity', label: 'Verificar cumplimiento de requisitos', cycle: 'V', activity: 'Verificar cumplimiento de requisitos.', responsible: 'Secretaría de Gobierno' },
  { id: 'td-04-7', number: 7, type: 'activity', label: 'Recibir transferencia', cycle: 'A', activity: 'Recibir la transferencia.', responsible: 'Secretaría de Gobierno' },
  { id: 'td-04-12', number: 12, type: 'activity', label: 'Elaborar acta de transferencia', cycle: 'A', activity: 'Elaborar el Acta de Transferencia.', responsible: 'Secretaría de Gobierno' },
  { id: 'fin', number: 13, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const eliminacionDocumentalSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'ed-05-1', number: 1, type: 'activity', label: 'Realizar inventario de documentos a eliminar', cycle: 'P', activity: 'Realizar inventario de documentos a eliminar. El funcionario responsable del Archivo Central o dependencia productora debe identificar, depurar e inventariar los documentos o expedientes que se presentan para eliminación, indicando cuáles son archivos para eliminación.', responsible: 'Secretaría de Gobierno' },
  { id: 'ed-05-2', number: 2, type: 'activity', label: 'Presentar documentos ante el comité de archivo', cycle: 'H', activity: 'Presentación de documentos a eliminar ante el comité de archivo. El Archivo Central o la dependencia productora de documentos a eliminar informa al Comité de Archivo, donde se revisa la solicitud de eliminación, series y tipos documentales. Se verifica el cumplimiento de requisitos para la eliminación documental.', responsible: 'Secretaría de Gobierno' },
  { id: 'ed-05-3', number: 3, type: 'activity', label: 'Elaborar acta de comité de archivo', cycle: 'V', activity: 'Elaboración del acta de Comité de Archivo. Se estudia y revisa el inventario documental presentado, junto con la eliminación de los documentos para aprobación por parte del comité, o para solicitud de subsanación o ajuste.', responsible: 'Secretaría de Gobierno' },
  { id: 'ed-05-12', number: 12, type: 'activity', label: 'Aplicar mecanismo para eliminar documentos', cycle: 'A', activity: 'Aplicar mecanismo para eliminar documentos. Aprobada la eliminación, se coordina el método de eliminación correspondiente y se levanta el acta respectiva.', responsible: 'Secretaría de Gobierno' },
  { id: 'fin', number: 13, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const actualizacionTablasRetencionSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'trd-06-1', number: 1, type: 'activity', label: 'Definir cronograma de actualización TRD', cycle: 'P', activity: 'Definir cronograma de actualización de las Tablas de Retención Documental. La Secretaría de Gobierno publicará el cronograma de actualización de las TRD del Archivo Central, asignando fecha para la revisión y actualización.', responsible: 'Secretaría de Gobierno' },
  { id: 'trd-06-2', number: 2, type: 'activity', label: 'Solicitar modificaciones y actualizaciones', cycle: 'H', activity: 'Solicitud de modificaciones y actualizaciones de las Tablas de Retención Documental TRD. Las secretarías u oficinas deben solicitar las modificaciones ante el Archivo Central mediante oficio a Secretaría de Gobierno.', responsible: 'Secretaría de Gobierno' },
  { id: 'trd-06-3', number: 3, type: 'activity', label: 'Revisar solicitudes de actualización TRD', cycle: 'V', activity: 'Revisión de las solicitudes de actualización de TRD. En la Secretaría de Gobierno se encarga al Archivo Central la revisión y asesoría, verificando las tablas de retención documental, los asuntos y tipos documentales que requieren actualización.', responsible: 'Secretaría de Gobierno' },
  { id: 'trd-06-4', number: 4, type: 'activity', label: 'Elaborar borrador de actualización', cycle: 'A', activity: 'Elaboración del borrador de actualización de las TRD con las modificaciones solicitadas.', responsible: 'Secretaría de Gobierno' },
  { id: 'trd-06-5', number: 5, type: 'activity', label: 'Aprobar tabla de retención actualizada', cycle: 'A', activity: 'Revisión y aprobación de la Tabla de Retención Documental actualizada.', responsible: 'Secretaría de Gobierno' },
  { id: 'trd-06-6', number: 6, type: 'activity', label: 'Socializar y publicar TRD actualizadas', cycle: 'A', activity: 'Socialización y publicación de las Tablas de Retención Documental TRD actualizadas. Se publica en la web de la entidad y se socializa por secretarías u oficinas que solicitaron actualización.', responsible: 'Secretaría de Gobierno' },
  { id: 'fin', number: 7, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const gestionViaticosSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'gv-01-1', number: 1, type: 'activity', label: 'Solicitar disponibilidad presupuestal para viáticos', cycle: 'P', activity: 'Solicitar mensualmente a la Secretaría de Hacienda la disponibilidad del rubro presupuestal de viáticos y gastos de viaje, teniendo en cuenta la ejecución presupuestal.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'gv-01-2', number: 2, type: 'activity', label: 'Solicitar comisión', cycle: 'P', activity: 'Solicitar la comisión de acuerdo con el tipo de comisión.', responsible: 'Secretarías de despacho' },
  { id: 'gv-01-3', number: 3, type: 'activity', label: 'Presentar solicitud según tipo de comisión', cycle: 'P', activity: 'Dentro del departamento, la comisión se debe solicitar con tres días hábiles de anticipación al inicio de la misma, teniendo en cuenta las actividades a realizar y la solicitud hasta un día antes del inicio de la comisión. Fuera del departamento, la solicitud de comisión se debe radicar con tres días hábiles de anticipación al inicio de la misma, con los documentos anexos requeridos.', responsible: 'Secretarías de despacho' },
  { id: 'gv-01-4', number: 4, type: 'activity', label: 'Autorizar comisiones', cycle: 'H', activity: 'Las comisiones de todos los servidores públicos deben solicitarse y deben ser autorizadas por el Secretario de Gobierno.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'gv-01-5', number: 5, type: 'activity', label: 'Aprobar o rechazar solicitudes', cycle: 'H', activity: 'Aprobar o rechazar las solicitudes de comisión que fueron autorizadas previamente por los secretarios de despacho.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'gv-01-6', number: 6, type: 'activity', label: 'Proyectar acto administrativo de comisión', cycle: 'H', activity: 'Proyectar acto administrativo por el cual se confiere comisión de servicios y se liquidan los viáticos y gastos de viaje. Generar el número de resolución correspondiente al tipo de comisión.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'gv-01-7', number: 7, type: 'activity', label: 'Revisar y aprobar acto administrativo', cycle: 'H', activity: 'Revisar y aprobar el acto administrativo.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'gv-01-8', number: 8, type: 'activity', label: 'Numerar y fechar acto administrativo', cycle: 'H', activity: 'Numerar y fechar el acto administrativo.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'gv-01-9', number: 9, type: 'activity', label: 'Publicar resolución de comisión', cycle: 'V', activity: 'Publicar la resolución en las carpetas del correo institucional por el cual se confiere la comisión de servicios.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'gv-01-10', number: 10, type: 'activity', label: 'Revisar soportes de permanencia', cycle: 'V', activity: 'El usuario encargado de cada secretaría debe revisar las comisiones aprobadas y generar el certificado de permanencia para entregarlo al funcionario comisionado.', responsible: 'Secretarías de despacho' },
  { id: 'gv-01-11', number: 11, type: 'activity', label: 'Radicar documentos de comisión', cycle: 'A', activity: 'Radicar en la Secretaría de Gobierno dentro de los tres días hábiles siguientes al cumplimiento de la comisión, con los documentos requeridos.', responsible: 'Secretarías de despacho' },
  { id: 'gv-01-12', number: 12, type: 'activity', label: 'Ingresar certificados de permanencia', cycle: 'A', activity: 'Ingresar los certificados de permanencia legalizados del 01 al 30 de cada mes para la preliquidación mensual.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'gv-01-13', number: 13, type: 'activity', label: 'Revisar y aprobar preliquidación', cycle: 'A', activity: 'Revisar y aprobar la preliquidación mensual para liquidar el pago.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'gv-01-14', number: 14, type: 'activity', label: 'Proyectar acto de liquidación', cycle: 'A', activity: 'Proyectar el acto administrativo por el cual se liquida y reconoce el pago de viáticos y gastos de viaje.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'gv-01-15', number: 15, type: 'activity', label: 'Revisar y aprobar acto administrativo', cycle: 'A', activity: 'Revisar y aprobar el acto administrativo.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'fin', number: 16, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const proyeccionActosAdministrativosSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'pa-02-1', number: 1, type: 'activity', label: 'Solicitar proyección de actos administrativos', cycle: 'P', activity: 'Realizar la solicitud de proyección y elaboración de actos administrativos y documentos. Solicitarán la proyección de los actos administrativos y documentos que se requieren para el desarrollo de las funciones de la Secretaría y el despacho.', responsible: 'Secretaría de Gobierno' },
  { id: 'pa-02-6', number: 6, type: 'activity', label: 'Proyectar acto administrativo o documento', cycle: 'V', activity: 'Realizar la solicitud de proyección y elaboración de actos administrativos y documentos siempre y cuando la materia a tratar sea de competencia de la Secretaría. La solicitud se realizará a través de correo electrónico, en el que se especificará la materia del acto o documento a elaborar.', responsible: 'Secretaría de Gobierno' },
  { id: 'fin', number: 7, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const revisionDocumentosSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'rd-03-1', number: 1, type: 'activity', label: 'Radicar actos administrativos para revisión', cycle: 'P', activity: 'Radicación de los actos administrativos que sean objeto de la Secretaría de Gobierno o del Alcalde.', responsible: 'Secretaría de Gobierno' },
  { id: 'rd-03-2', number: 2, type: 'activity', label: 'Revisar actos administrativos', cycle: 'H', activity: 'Revisión de actos administrativos de competencia de la Secretaría de Gobierno o del Alcalde.', responsible: 'Secretaría de Gobierno' },
  { id: 'rd-03-3', number: 3, type: 'activity', label: 'Tramitar firma de documentos', cycle: 'V', activity: 'Tramitar firma de documentos.', responsible: 'Secretaría de Gobierno' },
  { id: 'rd-03-4', number: 4, type: 'activity', label: 'Entregar documentos firmados', cycle: 'A', activity: 'Entregar documentos firmados a la dependencia de origen.', responsible: 'Secretaría de Gobierno' },
  { id: 'fin', number: 5, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const almacenInventarioSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'aa-04-1', number: 1, type: 'activity', label: 'Recibir notificaciones de llegada de bienes', cycle: 'P', activity: 'Recibir las notificaciones de llegada de los bienes, anexando los documentos soporte de acuerdo con la modalidad de ingreso de estos.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'aa-04-2', number: 2, type: 'activity', label: 'Recibir bienes y confrontar cantidades', cycle: 'H', activity: 'Recibir los bienes y confrontar las cantidades físicas y las especificaciones técnicas contra los documentos soporte para verificar el cumplimiento de las condiciones del bien previo a su ingreso al almacén.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'aa-04-3', number: 3, type: 'decision', label: '¿Continúa con la actividad 4?', cycle: 'H', activity: 'Si continúa con la actividad 4, no serán devueltos al proveedor; de lo contrario, ir a la actividad 2.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional', branches: [{ label: 'SI', targetStepId: 'aa-04-4' }, { label: 'NO', targetStepId: 'aa-04-2' }] },
  { id: 'aa-04-4', number: 4, type: 'activity', label: 'Registrar bienes en el sistema de inventario', cycle: 'H', activity: 'Asignar códigos y registrar los bienes en el sistema de inventario de la entidad. Se debe entregar copia impresa del comprobante de entrada al almacén al funcionario que solicita el ingreso del bien.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'aa-04-5', number: 5, type: 'activity', label: 'Registrar bienes devolutivos o de consumo', cycle: 'H', activity: 'Registrar en el aplicativo los bienes devolutivos que ingresan y asignar el número de placa correspondiente.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'aa-04-6', number: 6, type: 'activity', label: 'Imprimir y colocar placa', cycle: 'V', activity: 'Imprimir y colocar la placa a cada uno de los elementos devolutivos como a los elementos de consumo controlado.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'aa-04-7', number: 7, type: 'activity', label: 'Ubicar bienes en el almacén', cycle: 'V', activity: 'Ubicar los bienes en el almacén general por códigos y naturaleza, teniendo en cuenta las disposiciones dadas en la Guía de manejo de sustancias químicas.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'aa-04-8', number: 8, type: 'activity', label: 'Remitir relación de bienes a aseguradora', cycle: 'V', activity: 'Remitir al intermediario de seguros la relación de los bienes devolutivos y los de consumo controlado para gestionar ante la compañía de seguros la inclusión de los bienes adquiridos.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'aa-04-9', number: 9, type: 'activity', label: 'Recibir pólizas', cycle: 'A', activity: 'Recibir la póliza que remita la aseguradora y verificar que cumpla con los requerimientos de la Alcaldía Municipal de Gachetá.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'aa-04-10', number: 10, type: 'activity', label: 'Archivar información', cycle: 'A', activity: 'Archivar información según tabla de retención documental.', responsible: 'Secretaría de Gobierno y Desarrollo Institucional' },
  { id: 'fin', number: 11, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const cobroPersuasivoCoactivoSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'cpc-01-1', number: 1, type: 'activity', label: 'Iniciar e impulsar el proceso', cycle: 'P', activity: 'Librar el mandamiento de pago, que es el acto administrativo procesal que consiste en la orden de pago para que el ejecutado cancele la suma líquida de dinero adeudada contenida en el título ejecutivo, junto con los intereses desde cuando se hicieron exigibles y las costas del proceso.', responsible: 'Secretaría de Hacienda' },
  { id: 'cpc-01-2', number: 2, type: 'activity', label: 'Notificar mandamiento de pago', cycle: 'P', activity: 'Notificar personalmente al deudor, previa citación para que comparezca en un término de diez días. El mandamiento de pago podrá referirse a más de un título ejecutivo del mismo deudor. El funcionario encargado de hacer la notificación pondrá en conocimiento del interesado la providencia respectiva, entregándole una copia gratuita.', responsible: 'Secretaría de Hacienda' },
  { id: 'cpc-01-3', number: 3, type: 'activity', label: 'Excepciones contra el mandamiento', cycle: 'H', activity: 'El deudor tiene quince días hábiles para cancelar el monto de la deuda y sus respectivos intereses, o para proponer excepciones contra el mandamiento de pago. Dentro de las alternativas se encuentran pagar, guardar silencio o proponer excepciones conforme a la normatividad aplicable.', responsible: 'Secretaría de Hacienda' },
  { id: 'cpc-01-4', number: 4, type: 'activity', label: 'Tramitar recurso de reposición', cycle: 'H', activity: 'Tramitar el recurso de reposición propuesto sobre el acto administrativo que resuelve las excepciones. El funcionario ejecutor resolverá el recurso dentro del término previsto y notificará personalmente, por correo certificado o por correo electrónico al recurrente.', responsible: 'Secretaría de Hacienda' },
  { id: 'cpc-01-5', number: 5, type: 'activity', label: 'Liquidar crédito y costas', cycle: 'H', activity: 'Liquidar el crédito y las costas del proceso una vez ejecutoriado el acto administrativo que ordena seguir adelante con la ejecución, practicando la liquidación provisional correspondiente para determinar los valores adeudados.', responsible: 'Secretaría de Hacienda' },
  { id: 'cpc-01-6', number: 6, type: 'activity', label: 'Emitir avalúo de bienes embargados y secuestrados', cycle: 'H', activity: 'Emitir avalúo de los bienes embargados y secuestrados, estimando su valor en dinero conforme a los criterios aplicables, con el fin de continuar el trámite del proceso.', responsible: 'Secretaría de Hacienda' },
  { id: 'cpc-01-7', number: 7, type: 'activity', label: 'Objetar el avalúo', cycle: 'V', activity: 'Tramitar la objeción al avalúo cuando sea presentada dentro del término previsto, dando traslado al deudor para que notifique y, si aplica, solicite aclaración, complementación u objeción por error grave.', responsible: 'Secretaría de Hacienda' },
  { id: 'cpc-01-8', number: 8, type: 'activity', label: 'Ejecutoriar acto administrativo de remate', cycle: 'A', activity: 'Ejecutoriar el acto administrativo que ordena seguir adelante con la ejecución y elaborar la liquidación del crédito y las costas. Se fija fecha para la realización del remate, siempre que los bienes se encuentren debidamente embargados, secuestrados y avaluados.', responsible: 'Secretaría de Hacienda' },
  { id: 'cpc-01-9', number: 9, type: 'activity', label: 'Emitir auto terminación del proceso', cycle: 'A', activity: 'Emitir auto mediante el cual se da por terminado el proceso y se dispone el archivo del expediente, cuando haya quedado completamente satisfecha la obligación con el producto del remate.', responsible: 'Secretaría de Hacienda' },
  { id: 'fin', number: 10, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const generacionLibrosAuxiliaresSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'gla-09-1', number: 1, type: 'activity', label: 'Seleccionar sistema de información financiero', cycle: 'P', activity: 'Seleccionar el ícono del sistema de información financiero de la entidad, correspondiente a Contabilidad y Tesorería.', responsible: 'Secretaría de Hacienda' },
  { id: 'gla-09-2', number: 2, type: 'activity', label: 'Ingresar al sistema', cycle: 'H', activity: 'Ingresar al sistema digitando el nombre del usuario, la clave y finalmente seleccionar la opción de continuar.', responsible: 'Secretaría de Hacienda' },
  { id: 'gla-09-3', number: 3, type: 'decision', label: 'Elegir opción aplicaciones', cycle: 'V', activity: 'Elegir la opción aplicaciones, hacer clic en contabilidad y seleccionar la opción informes.', responsible: 'Secretaría de Hacienda', branches: [{ label: 'SI', targetStepId: 'gla-09-4' }, { label: 'NO', targetStepId: 'gla-09-3' }] },
  { id: 'gla-09-4', number: 4, type: 'activity', label: 'Seleccionar informes generales', cycle: 'A', activity: 'Seleccionar informes generales, dar la opción libro auxiliar con saldos, escoger el año, mes inicial y mes final, y cuenta inicial y cuenta final.', responsible: 'Secretaría de Hacienda' },
  { id: 'gla-09-5', number: 5, type: 'activity', label: 'Presentar e imprimir reporte', cycle: 'A', activity: 'Dar clic en presentar y seleccionar la opción imprimir.', responsible: 'Secretaría de Hacienda' },
  { id: 'fin', number: 6, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const expedicionCdpRpSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'cdp-06-1', number: 1, type: 'activity', label: 'Recibir y radicar', cycle: 'P', activity: 'Recibir y radicar la solicitud de expedición del Certificado de Registro Presupuestal o Registro Presupuestal, incluyendo el formato de solicitud y los documentos soporte requeridos.', responsible: 'Secretaría de Hacienda' },
  { id: 'cdp-06-2', number: 2, type: 'activity', label: 'Verificar conformidad de la solicitud', cycle: 'H', activity: 'Verificar que la solicitud se encuentre completa y que adjunte los documentos soporte para la generación del certificado o registro presupuestal. En caso de inconsistencias se devuelve la solicitud al área o dependencia generadora para los trámites pertinentes.', responsible: 'Secretaría de Hacienda' },
  { id: 'cdp-06-3', number: 3, type: 'activity', label: 'Recepcionar y expedir solicitud', cycle: 'V', activity: 'Recepcionar nuevamente la solicitud con todos los soportes, verificar los ajustes o correcciones propuestas, identificar el compromiso presupuestal a afectar y generar el registro presupuestal o certificado correspondiente.', responsible: 'Secretaría de Hacienda' },
  { id: 'cdp-06-4', number: 4, type: 'activity', label: 'Realizar correcciones o ajustes', cycle: 'A', activity: 'Realizar correcciones o ajustes cuando el área o dependencia generadora de la necesidad revise la solicitud y los documentos soporte, y remita nuevamente la solicitud con sus debidos soportes.', responsible: 'Secretaría de Hacienda' },
  { id: 'fin', number: 5, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const ordenPagoDefinitivaSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'opd-11-1', number: 1, type: 'activity', label: 'Recibir solicitud de orden de pago', cycle: 'P', activity: 'Recibir la solicitud de órdenes de pago, tales como nóminas, resoluciones, cuentas de cobro de contratistas y otros.', responsible: 'Secretaría de Hacienda' },
  { id: 'opd-11-2', number: 2, type: 'activity', label: 'Elaborar obligación presupuestal', cycle: 'H', activity: 'Elaborar la obligación presupuestal que ingresa en el módulo de presupuesto.', responsible: 'Secretaría de Hacienda' },
  { id: 'opd-11-3', number: 3, type: 'activity', label: 'Imprimir documento y adjuntar solicitud', cycle: 'H', activity: 'Imprimir el documento y adjuntarlo a la solicitud para pasar a firma del director de presupuesto.', responsible: 'Secretaría de Hacienda' },
  { id: 'opd-11-4', number: 4, type: 'activity', label: 'Revisar y firmar orden de pago', cycle: 'V', activity: 'Revisar y firmar la orden de pago para que pase a contratación o hacienda, dependiendo del trámite que se esté realizando.', responsible: 'Secretaría de Hacienda' },
  { id: 'fin', number: 5, type: 'end', label: 'FIN', cycle: 'A', activity: 'Fin del procedimiento', responsible: '' },
];

const cancelacionOrdenPagoSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'cop-12-1', number: 1, type: 'activity', label: 'Recepcionar orden de pago', cycle: 'P', activity: 'Recepcionar la orden de pago generada por la oficina de presupuesto y contratación.', responsible: 'Secretaría de Hacienda' },
  { id: 'cop-12-2', number: 2, type: 'activity', label: 'Activar orden de pago', cycle: 'H', activity: 'Activar la orden de pago con el radicado asignado en la cuenta del contratista.', responsible: 'Secretaría de Hacienda' },
  { id: 'cop-12-3', number: 3, type: 'decision', label: '¿Entregan las órdenes de pago?', cycle: 'H', activity: 'Entregar las órdenes de pago para su respectiva realización del comprobante de egreso.', responsible: 'Secretaría de Hacienda', branches: [{ label: 'SI', targetStepId: 'cop-12-4' }, { label: 'NO', targetStepId: 'cop-12-2' }] },
  { id: 'cop-12-4', number: 4, type: 'activity', label: 'Revisar órdenes de pago', cycle: 'V', activity: 'Revisar las órdenes de pago.', responsible: 'Secretaría de Hacienda' },
  { id: 'cop-12-5', number: 5, type: 'activity', label: 'Elaborar comprobante de egreso', cycle: 'V', activity: 'Elaborar el comprobante de egreso.', responsible: 'Secretaría de Hacienda' },
  { id: 'cop-12-6', number: 6, type: 'activity', label: 'Cargar pago', cycle: 'V', activity: 'Cargar el pago.', responsible: 'Secretaría de Hacienda' },
  { id: 'cop-12-7', number: 7, type: 'activity', label: 'Aprobar pago', cycle: 'V', activity: 'Aprobar el pago.', responsible: 'Secretaría de Hacienda' },
  { id: 'cop-12-8', number: 8, type: 'activity', label: 'Generar soporte exitoso del pago', cycle: 'A', activity: 'Generar soporte exitoso del pago.', responsible: 'Secretaría de Hacienda' },
  { id: 'cop-12-9', number: 9, type: 'activity', label: 'Cargar cuenta cancelada', cycle: 'A', activity: 'Cargar la cuenta cancelada.', responsible: 'Secretaría de Hacienda' },
  { id: 'fin', number: 10, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const actualizacionDatosImpuestoPredialSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'acip-13-1', number: 1, type: 'activity', label: 'Radicar solicitud de actualización', cycle: 'P', activity: 'Radicar la solicitud de actualización de datos de cálculo.', responsible: 'Contribuyente' },
  { id: 'acip-13-2', number: 2, type: 'activity', label: 'Recepcionar y asignar solicitud', cycle: 'H', activity: 'Recepcionar y asignar la solicitud.', responsible: 'Secretaría de Hacienda' },
  { id: 'acip-13-3', number: 3, type: 'decision', label: '¿Se aprobó?', cycle: 'H', activity: 'Realizar la actualización de datos y notificar al contribuyente el resultado de la actualización.', responsible: 'Secretaría de Hacienda', branches: [{ label: 'SI', targetStepId: 'acip-13-4' }, { label: 'NO', targetStepId: 'acip-13-2', note: 'Negar la solicitud' }] },
  { id: 'acip-13-4', number: 4, type: 'activity', label: 'Realizar seguimiento a la correspondencia', cycle: 'V', activity: 'Realizar seguimiento a la correspondencia para garantizar que sea entregada al destinatario final.', responsible: 'Secretaría de Hacienda' },
  { id: 'acip-13-5', number: 5, type: 'activity', label: 'Archivar solicitud y correspondencia', cycle: 'A', activity: 'Archivar el proceso de solicitud y correspondencia.', responsible: 'Secretaría de Hacienda' },
  { id: 'fin', number: 6, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const informeRecaudoDiarioPredialSteps: FlowStep[] = [
  { id: 'inicio', number: 0, type: 'start', label: 'INICIO', cycle: '', activity: 'Inicio del procedimiento', responsible: '' },
  { id: 'irdi-14-1', number: 1, type: 'activity', label: 'Recepcionar cancelación en caja', cycle: 'P', activity: 'Recepcionar la cancelación en la caja de tesorería, de la cual se expide recibo en caja o en la entidad bancaria.', responsible: 'Contribuyente' },
  { id: 'irdi-14-2', number: 2, type: 'activity', label: 'Solicitar entrega de colillas', cycle: 'H', activity: 'Solicitar al cajero la entrega de colillas.', responsible: 'Secretaría de Hacienda' },
  { id: 'irdi-14-3', number: 3, type: 'decision', label: '¿Se aprobó?', cycle: 'H', activity: 'Registrar pagos teniendo en cuenta la fecha en la que se recibió el documento de pago y elaborar el informe diario de recaudo de impuesto predial por caja.', responsible: 'Secretaría de Hacienda', branches: [{ label: 'SI', targetStepId: 'irdi-14-4' }, { label: 'NO', targetStepId: 'irdi-14-2', note: 'Negar la solicitud' }] },
  { id: 'irdi-14-4', number: 4, type: 'activity', label: 'Realizar cruce de cuentas', cycle: 'V', activity: 'Realizar cruce de cuentas con el cajero para verificar el saldo en caja.', responsible: 'Secretaría de Hacienda' },
  { id: 'irdi-14-5', number: 5, type: 'activity', label: 'Registrar información de pago predial', cycle: 'V', activity: 'Registrar información de pago predial enviada por la entidad bancaria.', responsible: 'Secretaría de Hacienda' },
  { id: 'irdi-14-6', number: 6, type: 'activity', label: 'Revisar informe de recaudo', cycle: 'A', activity: 'Revisar informe de recaudo por bancos frente a la planilla de recaudo, para comprobar saldos totales en banco y en caja. De lo contrario, se debe averiguar el motivo de la diferencia.', responsible: 'Secretaría de Hacienda' },
  { id: 'irdi-14-7', number: 7, type: 'activity', label: 'Generar informe diario de ingresos', cycle: 'A', activity: 'Generar informe diario de relación de ingresos de impuesto predial por caja y bancos, en original y copia.', responsible: 'Secretaría de Hacienda' },
  { id: 'irdi-14-8', number: 8, type: 'activity', label: 'Firmar informe', cycle: 'A', activity: 'Firmar el informe por parte del Secretario de Hacienda.', responsible: 'Secretaría de Hacienda' },
  { id: 'fin', number: 9, type: 'end', label: 'FIN', cycle: '', activity: 'Fin del procedimiento', responsible: '' },
];

const seguimientoMapaRiesgosSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'smr-01-1',
    number: 1,
    type: 'activity',
    label: 'Elaborar el plan anual de auditorías',
    cycle: 'P',
    activity: 'Elaborar el plan anual de auditorías.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'smr-01-2',
    number: 2,
    type: 'activity',
    label: 'Convocar al Comité Institucional de Control Interno',
    cycle: 'H',
    activity: 'Convocar al Comité Institucional de Control Interno.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'smr-01-3',
    number: 3,
    type: 'activity',
    label: 'Aprobación del plan anual de auditorías',
    cycle: 'H',
    activity: 'Aprobación del plan anual de auditorías.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'smr-01-4',
    number: 4,
    type: 'activity',
    label: 'Socialización del plan de auditorías',
    cycle: 'V',
    activity: 'Socialización del plan de auditorías.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'smr-01-5',
    number: 5,
    type: 'activity',
    label: 'Ejecución del plan de auditorías',
    cycle: 'A',
    activity: 'Ejecución del plan de auditorías.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'fin',
    number: 6,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const evaluacionSeguimientoGestionOrganizacionalSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'esg-02-1',
    number: 1,
    type: 'activity',
    label: 'Comparar metas del informe con las del plan de desarrollo',
    cycle: 'P',
    activity: 'Comparar metas del informe con las del plan de desarrollo.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'esg-02-2',
    number: 2,
    type: 'activity',
    label: 'Verificar responsables en los informes',
    cycle: 'H',
    activity: 'Verificar que los responsables en los informes estén involucrados con las metas.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'esg-02-3',
    number: 3,
    type: 'activity',
    label: 'Verificar cumplimiento de metas',
    cycle: 'V',
    activity: 'Verificar cumplimiento de metas del plan de acción y del plan de desarrollo.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'esg-02-4',
    number: 4,
    type: 'activity',
    label: 'Comprobar evidencias de avances',
    cycle: 'V',
    activity: 'Comprobar las evidencias de los avances registrados.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'esg-02-5',
    number: 5,
    type: 'activity',
    label: 'Diseñar acciones de mejora para el informe',
    cycle: 'A',
    activity: 'Diseñar acciones de mejora para el informe.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'esg-02-6',
    number: 6,
    type: 'activity',
    label: 'Realizar encuestas de satisfacción',
    cycle: 'A',
    activity: 'Realizar encuestas de satisfacción en la rendición de cuentas.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'esg-02-7',
    number: 7,
    type: 'activity',
    label: 'Notificar el resultado del informe de gestión',
    cycle: 'A',
    activity: 'Notificar el resultado del informe de gestión.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'fin',
    number: 8,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const presentacionInformesControlInternoSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'pi-03-1',
    number: 1,
    type: 'activity',
    label: 'Presentación de informe de Evaluación Oficina de Control Interno',
    cycle: 'P',
    activity: 'Presentación de informe de Evaluación Oficina de Control Interno.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'pi-03-2',
    number: 2,
    type: 'activity',
    label: 'Diligencia de Autoevaluación',
    cycle: 'H',
    activity: 'Diligencia de Autoevaluación.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'pi-03-3',
    number: 3,
    type: 'activity',
    label: 'Imprimir Certificado',
    cycle: 'H',
    activity: 'Imprimir Certificado.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'pi-03-4',
    number: 4,
    type: 'activity',
    label: 'Informe anual sobre la evaluación del control interno contable',
    cycle: 'H',
    activity: 'Informe anual sobre la evaluación del control interno contable.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'pi-03-5',
    number: 5,
    type: 'activity',
    label: 'Recopile información y evidencias de las respuestas',
    cycle: 'H',
    activity: 'Recopile información y evidencias de las respuestas.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'pi-03-6',
    number: 6,
    type: 'activity',
    label: 'Tabular información',
    cycle: 'H',
    activity: 'Tabular información.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'pi-03-7',
    number: 7,
    type: 'activity',
    label: 'Diligenciar Informe CHIP',
    cycle: 'H',
    activity: 'Diligenciar Informe CHIP.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'pi-03-8',
    number: 8,
    type: 'activity',
    label: 'Imprimir evidencia de la presentación del informe',
    cycle: 'H',
    activity: 'Imprimir evidencia de la presentación del informe.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'pi-03-9',
    number: 9,
    type: 'activity',
    label: 'Elaboración de Informe de Evaluación del Sistema de Control Interno',
    cycle: 'V',
    activity: 'Elaboración de Informe de Evaluación del Sistema de Control Interno.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'pi-03-10',
    number: 10,
    type: 'activity',
    label: 'Subir informe a la página de la Contraloría',
    cycle: 'V',
    activity: 'Subir informe a la página de la Contraloría.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'pi-03-11',
    number: 11,
    type: 'activity',
    label: 'Presentación de informes de labores de Gestión de la Oficina de Control Interno',
    cycle: 'V',
    activity: 'Presentación de informes de labores de Gestión de la Oficina de Control Interno.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'pi-03-12',
    number: 12,
    type: 'activity',
    label: 'Presentación de mapas de riesgos de la vigencia',
    cycle: 'V',
    activity: 'Presentación de mapas de riesgos de la vigencia.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'pi-03-13',
    number: 13,
    type: 'activity',
    label: 'Presentación informe pormenorizado del estado de control interno',
    cycle: 'V',
    activity: 'Presentación informe pormenorizado del estado de control interno.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'pi-03-14',
    number: 14,
    type: 'activity',
    label: 'Envío para publicación en página web institucional',
    cycle: 'A',
    activity: 'Envío para publicación en página web institucional.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'pi-03-15',
    number: 15,
    type: 'activity',
    label: 'Presentación de informe de austeridad en el gasto',
    cycle: 'A',
    activity: 'Presentación de informe de austeridad en el gasto.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'pi-03-16',
    number: 16,
    type: 'activity',
    label: 'Solicitud de información',
    cycle: 'A',
    activity: 'Solicitud de información.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'pi-03-17',
    number: 17,
    type: 'activity',
    label: 'Elaboración de informe y publicación en página web institucional',
    cycle: 'A',
    activity: 'Elaboración de informe y publicación en página web institucional.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'pi-03-18',
    number: 18,
    type: 'activity',
    label: 'Presentación de informe de PQR',
    cycle: 'A',
    activity: 'Presentación de informe de PQR.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'pi-03-19',
    number: 19,
    type: 'activity',
    label: 'Seleccionar muestra a revisar',
    cycle: 'A',
    activity: 'Seleccionar muestra a revisar.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'pi-03-20',
    number: 20,
    type: 'activity',
    label: 'Consolidar y tabular información',
    cycle: 'A',
    activity: 'Consolidar y tabular información.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'pi-03-21',
    number: 21,
    type: 'activity',
    label: 'Notificación del informe',
    cycle: 'A',
    activity: 'Notificación del informe.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'pi-03-22',
    number: 22,
    type: 'activity',
    label: 'Informe de Seguimiento a las estrategias anticorrupción',
    cycle: 'A',
    activity: 'Informe de Seguimiento a las estrategias anticorrupción.',
    responsible: 'Secretaría de Planeación y demás dependencias',
  },
  {
    id: 'pi-03-23',
    number: 23,
    type: 'activity',
    label: 'Realizar seguimiento cuatrimestral',
    cycle: 'A',
    activity: 'Realizar seguimiento cuatrimestral.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'pi-03-24',
    number: 24,
    type: 'activity',
    label: 'Realizar recomendaciones para el cumplimiento de las metas',
    cycle: 'A',
    activity: 'Realizar recomendaciones para el cumplimiento de las metas.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'pi-03-25',
    number: 25,
    type: 'activity',
    label: 'Informe de Rendición de Cuentas',
    cycle: 'A',
    activity: 'Informe de Rendición de Cuentas.',
    responsible: 'Secretaría de Planeación y demás dependencias',
  },
  {
    id: 'pi-03-26',
    number: 26,
    type: 'activity',
    label: 'Presentación de informe a la ciudadanía',
    cycle: 'A',
    activity: 'Presentación de informe a la ciudadanía.',
    responsible: 'Alcalde y secretarios de despacho',
  },
  {
    id: 'pi-03-27',
    number: 27,
    type: 'activity',
    label: 'Elaboración del Informe de Evaluación',
    cycle: 'A',
    activity: 'Elaboración del Informe de Evaluación.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'pi-03-28',
    number: 28,
    type: 'activity',
    label: 'Notificación del informe',
    cycle: 'A',
    activity: 'Notificación del informe.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'pi-03-29',
    number: 29,
    type: 'activity',
    label: 'Publicación del informe de rendición de cuentas',
    cycle: 'A',
    activity: 'Publicación del informe de rendición de cuentas.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'fin',
    number: 30,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const elaboracionSeguimientoPlanMejoramientoAuditoriaSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'recibir-informe',
    number: 1,
    type: 'activity',
    label: 'Recibir informe y analizar',
    cycle: 'P',
    activity: 'Recibir el informe definitivo y analizar observaciones',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'elaborar-formato',
    number: 2,
    type: 'activity',
    label: 'Elaborar formato plan',
    cycle: 'H',
    activity: 'Elaborar formato plan de mejoramiento y reenviarlo a las oficinas responsables',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'recibir-planes',
    number: 3,
    type: 'activity',
    label: 'Recibir planes diligenciados',
    cycle: 'H',
    activity: 'Recibir planes de mejoramiento diligenciados por partes de las oficinas responsables',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'consolidar-informacion',
    number: 4,
    type: 'activity',
    label: 'Consolidar información',
    cycle: 'H',
    activity: 'Consolidar la información recibida en el plan de mejoramiento',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'envio-plan',
    number: 5,
    type: 'activity',
    label: 'Envío plan a Entidad',
    cycle: 'H',
    activity: 'Envío de plan de mejoramiento a Entidad Auditora Externa',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'hacer-ajustes',
    number: 6,
    type: 'activity',
    label: 'Hacer ajustes',
    cycle: 'H',
    activity: 'Hacer los ajustes y correcciones pertinentes',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'informar-aprobacion',
    number: 7,
    type: 'activity',
    label: 'Informar aprobación',
    cycle: 'H',
    activity: 'Informar aprobación del plan de mejoramiento a las dependencias',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'recibir-seguimientos',
    number: 8,
    type: 'activity',
    label: 'Recibir seguimientos',
    cycle: 'V',
    activity: 'Recibir los seguimientos trimestrales por parte de las dependencias responsables',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'reportar-seguimientos',
    number: 9,
    type: 'activity',
    label: 'Reportar seguimientos',
    cycle: 'A',
    activity: 'Reportar los seguimientos trimestrales a la Entidad Auditora Externa',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'cumplimiento-plan',
    number: 10,
    type: 'activity',
    label: 'Cumplimiento plan',
    cycle: 'A',
    activity: 'Cumplimiento plan de mejoramiento externo',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'fin',
    number: 11,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const seguimientoPlanesMejoramientoInternosSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'enviar-informe',
    number: 1,
    type: 'activity',
    label: 'Enviar informe',
    cycle: 'P',
    activity: 'Enviar correo electrónico a auditados, el Informe definitivo de Auditoria en el cual se presentan las observaciones y hallazgos y se informa el plazo de 07 días hábiles siguientes al recibo del correo, para realizar el Plan de Mejoramiento',
    responsible: 'Dependencia auditada',
  },
  {
    id: 'verificar-suscripcion',
    number: 2,
    type: 'activity',
    label: 'Verificar plan',
    cycle: 'V', // En la imagen aparecen H y V en esta celda, se asume V por "Verificar"
    activity: 'Verificar la suscripción del Plan de Mejoramiento, así mismo analizar la pertinencia de las acciones correctivas junto con el plazo establecido para su ejecución y luego se procede a la correspondiente notificación por correo electrónico.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'realizar-seguimiento',
    number: 3,
    type: 'activity',
    label: 'Realizar seguimiento',
    cycle: '',
    activity: 'Realizar cada dos meses (una vez aprobado el plan de mejora), el seguimiento a las acciones establecidas asegurándose del cumplimiento de lo establecido, y/o registrando los avances evidenciados en cada seguimiento, siempre solicitando las evidencias que soportan la ejecución de las acciones.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'cierre-hallazgos',
    number: 4,
    type: 'activity',
    label: 'Cierre de hallazgos',
    cycle: 'A',
    activity: 'Realizar el cierre de los hallazgos, y se recoge la firma del líder del proceso, y de todas las personas que fueron asignadas como responsables de acciones en el plan de mejoramiento.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'archivar-plan',
    number: 5,
    type: 'activity',
    label: 'Archivar plan',
    cycle: '',
    activity: 'Archivar el plan de mejoramiento en la carpeta del proceso respectivo.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'fin',
    number: 6,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const elaboracionAprobacionPlanAnualAuditoriasSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'elaborar-plan',
    number: 1,
    type: 'activity',
    label: 'Elaborar plan',
    cycle: 'P',
    activity: 'Elaborar el plan anual de auditorías',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'convocar-comite',
    number: 2,
    type: 'activity',
    label: 'Convocar comité',
    cycle: 'H',
    activity: 'Convocar al comité de control interno para revisión y aprobación del plan anual de auditorías',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'exponer-plan',
    number: 3,
    type: 'activity',
    label: 'Exponer plan',
    cycle: 'V',
    activity: 'Exponer el plan anual de auditorías al comité de control interno, para que posteriormente sea aprobado',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'dar-conocer-plan',
    number: 4,
    type: 'activity',
    label: 'Dar a conocer plan',
    cycle: 'A',
    activity: 'Dar a conocer el plan anual auditorías a todas las dependencias de la Administración.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'ejecutar-vigencia',
    number: 5,
    type: 'activity',
    label: 'Ejecutar plan',
    cycle: 'A',
    activity: 'Ejecuta durante la vigencia, el cual deberá ir firmado por el Jefe de Control Interno.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'fin',
    number: 6,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const comitesSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'convocar-integrantes',
    number: 1,
    type: 'activity',
    label: 'Convocar integrantes',
    cycle: 'P',
    activity: 'Convocar a los integrantes del acuerdo con los términos establecidos en el decreto de creación y funcionamiento del Comité Institucional de Coordinación de Control Interno',
    responsible: 'Secretario técnico del comité institucional de coordinación de control interno',
  },
  {
    id: 'realizar-reunion',
    number: 2,
    type: 'activity',
    label: 'Realizar reunión',
    cycle: 'H',
    activity: 'Realizar la reunión de Comité, desarrollando el Orden del Día Propuesto',
    responsible: 'Secretario técnico del comité institucional de coordinación de control interno',
  },
  {
    id: 'elaborar-acta',
    number: 3,
    type: 'activity',
    label: 'Elaborar acta',
    cycle: 'H',
    activity: 'Elaborar el acta de comité, que contendrá la relación de quienes intervinieron, los temas tratados, las decisiones adoptadas y los votos emitidos por cada uno de los integrantes',
    responsible: 'Secretario técnico del comité institucional de coordinación de control interno',
  },
  {
    id: 'aprobar-actas',
    number: 4,
    type: 'activity',
    label: 'Aprobar actas',
    cycle: 'V',
    activity: 'Aprobar y suscribir las actas, que tendrán el número consecutivo por cada año.',
    responsible: 'Secretario técnico del comité institucional de coordinación de control interno',
  },
  {
    id: 'archivar-actas',
    number: 5,
    type: 'activity',
    label: 'Archivar actas',
    cycle: 'A',
    activity: 'Archivar actas y demás documentos del comité como citaciones, de acuerdo a lo establecido en las Tablas de Retención Documental',
    responsible: 'Secretario técnico del comité institucional de coordinación de control interno',
  },
  {
    id: 'fin',
    number: 6,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const controlInternoDisciplinarioPrimeraInstanciaSteps: FlowStep[] = [
  {
    id: 'inicio',
    number: 0,
    type: 'start',
    label: 'INICIO',
    cycle: '',
    activity: 'Inicio del procedimiento',
    responsible: '',
  },
  {
    id: 'recibir-queja',
    number: 1,
    type: 'activity',
    label: 'Recibir queja',
    cycle: 'P',
    activity: 'Se recibe la queja del particular y/o informe del servidor público.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'evaluar-tramite',
    number: 2,
    type: 'decision',
    label: '¿Hay lugar a trámite?',
    cycle: 'P',
    activity: 'Se revisa y evalúa la queja o informe para determinar si hay lugar a trámite disciplinario. Si se encuentra elementos de incidencia disciplinaria se inicia indagación preliminar continua en la actividad 3. Si se encuentra identificado el posible autor de la falta disciplinaria se continúa en la actividad 4. En el caso de que se den los presupuestos del parágrafo 1 del artículo 150 del CDU por ser la queja temeraria y no amerita credibilidad se procede a proyectar auto inhibitorio el cual se comunicara al quejoso.',
    responsible: 'Oficina de Control Interno',
    branches: [
      { label: 'SI', targetStepId: 'culminar-indagacion-4' },
      { label: 'NO', targetStepId: 'proyectar-auto-3' },
    ],
  },
  {
    id: 'proyectar-auto-3',
    number: 3,
    type: 'activity',
    label: 'Proyectar apertura indagación',
    cycle: 'P',
    activity: 'Se proyecta el auto de apertura de indagación preliminar en averiguación y se practican pruebas. Se pueden decretar pruebas de oficio en el caso de que las practicadas no sean suficientes.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'culminar-indagacion-4',
    number: 4,
    type: 'activity',
    label: 'Culminar etapa indagación',
    cycle: 'P',
    activity: 'Una vez culminada la etapa de indagación preliminar se establece si se dan los requisitos conforme al Articulo 152 CDU y se proyecta auto de apertura de Investigación disciplinaria continúe en la actividad 12. El término de la investigación disciplinaria corresponde a un año. Este termino podrá aumentarse hasta en una tercera parte cuando en la misma se investiguen varias faltas o dos o más investigados. En el evento en que no sea procedente se emitirá un auto de archivo y terminación del procedimiento de acuerdo al Articulo 73 CDU, se comunica al quejoso y al Implicado Continúa en la actividad 5.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'comunicar-archivo',
    number: 5,
    type: 'activity',
    label: 'Comunicar decisión archivo',
    cycle: '',
    activity: 'Se le comunica la decisión de archivo al quejoso y de esta forma haga uso de los recursos de ley, si así lo considera.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'recurso-apelacion-quejoso',
    number: 6,
    type: 'decision',
    label: '¿El quejoso interpone recurso de apelación?',
    cycle: 'H',
    activity: 'Si el quejoso interpone recurso de apelación, porque no esta de acuerdo con la decisión de archivo continúe en la actividad 7. Si se declara desierto o no se interpone el recurso, el procedimiento termina.',
    responsible: 'Oficina de Control Interno',
    branches: [
      { label: 'SI', targetStepId: 'conceder-recurso-apelacion' },
      { label: 'NO', targetStepId: 'fin' },
    ],
  },
  {
    id: 'conceder-recurso-apelacion',
    number: 7,
    type: 'decision',
    label: '¿Se concede recurso de apelación?',
    cycle: 'H',
    activity: 'Si se concede recurso de apelación continúe en la actividad 9. Si no se concede el quejoso puede interponer un recurso de queja que lo conocerá el superior jerárquico continúe en la actividad 8.',
    responsible: 'Oficina de Control Interno',
    branches: [
      { label: 'SI', targetStepId: 'enviar-comunicacion-instancia' },
      { label: 'NO', targetStepId: 'conceder-recurso-queja' },
    ],
  },
  {
    id: 'conceder-recurso-queja',
    number: 8,
    type: 'decision',
    label: '¿Se concede el recurso de queja?',
    cycle: 'H',
    activity: 'Si el profesional de segunda instancia concede el recurso de queja remite el expediente para que el aquo de trámite al recurso de apelación continúe en la actividad 9. En el caso en que rechace el recurso de queja devuelve el expediente a primera instancia donde finaliza el procedimiento.',
    responsible: 'Oficina de Control Interno',
    branches: [
      { label: 'SI', targetStepId: 'enviar-comunicacion-instancia' },
      { label: 'NO', targetStepId: 'fin' },
    ],
  },
  {
    id: 'enviar-comunicacion-instancia',
    number: 9,
    type: 'activity',
    label: 'Enviar a segunda instancia',
    cycle: 'H',
    activity: 'El operador disciplinario de primera instancia envíe comunicación junto con el expediente a segunda instancia para que se surta el recurso de apelación.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'evaluar-apelacion',
    number: 10,
    type: 'activity',
    label: 'Evaluar recurso de apelación',
    cycle: 'H',
    activity: 'Se evalúa el recurso de apelación para que el profesional de segunda instancia confirme la decisión adoptada por el operador de primera instancia o revoque la decisión de archivo.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'decision-revocar',
    number: 11,
    type: 'decision',
    label: '¿La decisión es de revocar?',
    cycle: 'H',
    activity: 'La segunda instancia puede confirmar la decisión de archivo y la remite para que el operador de primera instancia proceda a archivar y terminar la actuación. Si la decisión es de revocar lo remite al operador de primera instancia para continuar el trámite que puede ser una indagación preliminar (Continuar en la actividad 3) si es de apertura de Investigación disciplinaria (Continuar en la actividad 12).',
    responsible: 'Oficina de Control Interno',
    branches: [
      { label: 'SI', targetStepId: 'proyectar-auto-3' },
      { label: 'NO', targetStepId: 'apertura-investigacion-12' },
    ],
  },
  {
    id: 'apertura-investigacion-12',
    number: 12,
    type: 'activity',
    label: 'Apertura de investigación',
    cycle: 'H',
    activity: 'Se realiza apertura de investigación disciplinaria, se envía citación al investigado para que se notifique y comunicación a la Personería de Bogotá y la Procuraduría General de la Nación. En el auto de apertura de investigación se procede a ordenar la práctica de pruebas (Documentales, o testimoniales). De igual forma se puede requerir ampliación de queja, así como se ordena escuchar // validar texto',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'practicar-pruebas',
    number: 13,
    type: 'activity',
    label: 'Practicar pruebas',
    cycle: 'V',
    activity: 'Se procede a escuchar en versión libre al investigado y se practican pruebas como ampliación de queja, declaraciones, juramentadas y/o documentales.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'atender-visita',
    number: 14,
    type: 'activity',
    label: 'Atender visita administrativa',
    cycle: 'V',
    activity: 'En el transcurso de la investigación disciplinaria, el investigado puede solicitar a los entes de control (Personería de Gachetá y Procuraduría General), realizar vigilancia al proceso. De igual forma la Personería de oficio puede ejercer poder preferente para continuar con el trámite de la investigación. Lo anterior se realiza mediante una visita administrativa.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'decretar-pruebas-oficio',
    number: 15,
    type: 'activity',
    label: 'Decretar pruebas de oficio',
    cycle: 'V',
    activity: 'Se pueden decretar pruebas de oficio, en el caso de que las practicadas no sean suficientes.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'prorrogar-pruebas',
    number: 16,
    type: 'activity',
    label: 'Prorrogar pruebas',
    cycle: 'V',
    activity: 'Si vencido el termino de investigación disciplinaria hiciere falta pruebas se prorrogara la investigación hasta por la mitad del termino es decir seis meses.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'cierre-investigacion',
    number: 17,
    type: 'activity',
    label: 'Auto cierre investigación',
    cycle: 'V',
    activity: 'Una vez recaudada prueba que permita la formulación de cargos o vencido el termino de investigación o de sus prorrogas, se procede a proyectar auto que declara el cierre de investigación. El quejoso podrá interponer recurso de reposición, el cual lo resolverá el mismo funcionario de primera instancia.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'verificar-evaluacion',
    number: 18,
    type: 'activity',
    label: 'Verificar evaluación disciplinaria',
    cycle: 'V',
    activity: 'Una vez en firme la providencia del cierre de investigación se verificará dentro de los 15 días hábiles siguientes, la evaluación de la investigación disciplinaria.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'es-pliego-cargos',
    number: 19,
    type: 'decision',
    label: '¿Es pliego de cargos?',
    cycle: 'V',
    activity: 'Durante los 15 dias, si se recaudo prueba se formula pliego de cargo, en caso contrario se archiva la actuación. En caso de archivo puede interponerse recursos de ley, remitirse a las actividades 5, 6, 7, 8, 9 y 10.',
    responsible: 'Oficina de Control Interno',
    branches: [
      { label: 'SI', targetStepId: 'tramite-pliego-cargos' },
      { label: 'NO', targetStepId: 'comunicar-archivo' },
    ],
  },
  {
    id: 'tramite-pliego-cargos',
    number: 20,
    type: 'activity',
    label: 'Tramite pliego de cargos',
    cycle: 'V',
    activity: 'En el evento de pliego de cargos se comunica al investigado quien debe nombrar un defensor si no lo hiciere, el operador disciplinario debe nombrarle uno de oficio, para lo cual debe enviar comunicación a los consultorios jurídicos de las universidades con el fin de que sea asignado estudiante de derecho.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'revisar-descargos',
    number: 21,
    type: 'activity',
    label: 'Revisar descargos de pruebas',
    cycle: 'V',
    activity: 'Notificado el pliego de cargos quedara en la secretaria del despacho por el término de 10 dias para que dentro de ese término el investigado o su defensor, presente sus descargos. Cualquiera de los sujetos procesales puede aportar y solicitar pruebas.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'resolver-nulidades',
    number: 22,
    type: 'activity',
    label: 'Resolver nulidades',
    cycle: 'A',
    activity: 'Una vez vencido el término de 10 dias el funcionario resolverá sobre nulidades, propuestas y ordena la práctica de pruebas en un término no mayor a 90 dias. El investigado podrá interponer recurso de apelación, el cual si se concede se enviara a segunda instancia para su conocimiento y en caso de rechazo se mantiene la decisión y se continua con el trámite.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'ordenar-traslado',
    number: 23,
    type: 'activity',
    label: 'Ordenar traslado',
    cycle: 'A',
    activity: 'Una vez evacuado el término probatorio, mediante auto notificable se ordenara el traslado común de 10 dias para que los sujetos procesales puedan presentar alegatos de conclusión. Esta providencia será notificada por estado.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'proferir-fallo',
    number: 24,
    type: 'activity',
    label: 'Proferir fallo',
    cycle: 'A',
    activity: 'El funcionario proferirá fallo dentro de los 20 dias hábiles al vencimiento del término de traslado para alegatos de conclusión.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'notificar-fallo',
    number: 25,
    type: 'activity',
    label: 'Notificar fallo',
    cycle: 'A',
    activity: 'Se le notifica el fallo al investigado y a su defensor, quien podrá interponer recurso de apelación dentro del término de ejecutoria.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'comunicar-segunda-instancia',
    number: 26,
    type: 'activity',
    label: 'Comunicar segunda Instancia',
    cycle: 'A',
    activity: 'Si el recurso reúne los requisitos el operador disciplinario procede a concederlo, remitiendo para tal efecto mediante comunicación a la segunda instancia.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'resolver-fallo',
    number: 27,
    type: 'activity',
    label: 'Resolver fallo segunda instancia',
    cycle: 'A',
    activity: 'Se resuelve dentro de los 45 dias siguientes al recibido del proceso. Si se considera necesario se decreta pruebas de oficio en cuyo caso el término se ampliara hasta otro tanto.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'remitir-primera-instancia',
    number: 28,
    type: 'activity',
    label: 'Remitir a primera Instancia',
    cycle: 'A',
    activity: 'Se remite al juzgador de primera instancia para el registro de la sanción o para absolución según el caso.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'informar-sancion',
    number: 29,
    type: 'activity',
    label: 'Informar sanción',
    cycle: 'A',
    activity: 'El operador de primera instancia debe informar a los entes de control (Personería de Gachetá y Procuraduría General) la imposición de sanción.',
    responsible: 'Oficina de Control Interno',
  },
  {
    id: 'fin',
    number: 30,
    type: 'end',
    label: 'FIN',
    cycle: '',
    activity: 'Fin del procedimiento',
    responsible: '',
  },
];

const pePeProcedures: ProcedureItem[] = [
  {
    ...procedure('PE-PE-EPD-01', 'Elaboración y Aprobación del Plan de Desarrollo', 'Secretaría de Planeación', 28, ['PE-PE-FR-01 POAI', 'PE-PE-FR-02 Plan Indicativo']),
    source: { pageStart: 28, pageEnd: 28, validationMode: 'visual_validated' },
    detail: {
      objective: 'Determinar las directrices y presentar de manera ordenada los lineamientos para la formulación, elaboración y aprobación del Plan de Desarrollo Municipal.',
      scope: 'El procedimiento inicia con la generación de los pasos lógicos a seguir para la elaboración y aprobación del plan de desarrollo; así mismo se determina el seguimiento, la evaluación y la difusión de este ante actores públicos, privados y comunidad en general.',
      definitions: [
        'Plan de Desarrollo: Instrumento de planificación y gestión que promueve el desarrollo integral del territorio.',
        'Componente estratégico: Define objetivos de desarrollo, estrategias, programas, indicadores y metas.',
      ],
      generalDispositions: ['Se debe consolidar el mayor número de información de la comunidad y armonizar estos datos con el plan de gobierno y las proyecciones del presupuesto.'],
      documents: [], formats: ['PE-PE-FR-01 POAI', 'PE-PE-FR-02 Plan Indicativo'], legalRequirements: [], variablesToMeasure: [], flowSteps: planDesarrolloSteps,
    },
  },
  {
    ...procedure('PE-PE-POAI-02', 'Elaboración y Aprobación del Plan Operativo Anual de Inversiones', 'Secretaría de Planeación', 29, ['PE-PE-FR-01 POAI']),
    source: { pageStart: 29, pageEnd: 29, validationMode: 'visual_validated' },
    detail: {
      objective: 'Programar los proyectos de inversión que se deben ejecutar en una determinada vigencia fiscal en concordancia con el Plan de Desarrollo Municipal.',
      scope: 'Se realiza con el fin de armonizar las políticas presupuestales con los planes, programas y proyectos con que cuenta la entidad en el plan de desarrollo municipal, en especial con los temas desarrollados al componente inversión social. Finaliza con la entrega del plan operativo anual de inversiones a la Secretaría de Hacienda.',
      definitions: [
        'POAI: Herramienta de planificación de la inversión que permite determinar el conjunto de planes, programas y proyectos que se incorporarán en el presupuesto anual del Municipio.',
        'Proyecto: Unidad operativa mínima de un plan compuesta por actividades planificadas y relacionadas entre sí.',
        'Plan de Desarrollo: Carta de navegación de la política pública.',
        'Programa: Conjunto organizado, coherente e integrado de proyectos relacionados entre sí.',
      ],
      generalDispositions: ['Se deben registrar los proyectos de inversión armonizados con los planes, programas y proyectos con los que cuenta la entidad en el Plan de Desarrollo Municipal.'],
      documents: ['Solicitud', 'Plan', 'RP'], formats: ['PE-PE-FR-01 POAI'], legalRequirements: [], variablesToMeasure: [], flowSteps: poaiSteps,
    },
  },
  {
    ...procedure(
      'PE-PE-APA-03',
      'Elaboración y Aprobación de Plan de Acción',
      'Secretaría de Planeación',
      30,
      ['PE-PE-FR-03 Plan de Acción'],
    ),
    source: {
      pageStart: 30,
      pageEnd: 30,
      validationMode: 'visual_validated',
    },
    detail: {
      objective:
        'Orientar a cada dependencia de la administración en el desarrollo estratégico de sus procesos, instrumentos y recursos disponibles, dirigidos hacia el logro de objetivos y metas anuales a través de la ejecución de acciones y proyectos que contribuyan al cumplimiento de los objetivos del plan de desarrollo.',
      scope:
        'El procedimiento inicia con la directriz emitida por parte de la Secretaría de Infraestructura para la elaboración del Plan de Acción, y finaliza con la aprobación de la versión definitiva del Plan de Acción consolidado por parte del Consejo de Gobierno Municipal.',
      definitions: [
        'Plan de Desarrollo: Es un instrumento de planificación y gestión que promueve el desarrollo integral del territorio, para atender las necesidades insatisfechas de la población y mejorar la calidad de vida de todos los ciudadanos. Los planes de desarrollo de las entidades territoriales estarán conformados por una parte estratégica y un plan de inversiones a mediano y corto plazo, en los términos establecidos por la Ley 152 de 1994.',
        'Plan de Acción: Es un instrumento o una herramienta que permite organizar, prever, ejecutar, evaluar y corregir las acciones desarrolladas dentro de una organización.',
      ],
      generalDispositions: [
        'El Secretario de Despacho deberá organizar, orientar y coordinar la elaboración de los planes de acción.',
        'Es necesaria una revisión detallada y minuciosa de las responsabilidades y actividades establecidas en el Plan Indicativo, para efectos de garantizar la correcta elaboración del Plan de Acción.',
        'Previo a la elaboración del Plan de Acción, es necesario revisar el Plan Plurianual de Inversiones, el POAI, el Plan Indicativo y los proyectos registrados en Banco de Proyectos, dado su carácter orientador en las decisiones de inversión.',
        'El Plan de Acción elaborado por cada una de las dependencias de la Alcaldía deberá guardar relación con su respectiva misión, con el contexto de los objetivos y estrategias del Plan Municipal de Desarrollo y el plan indicativo, ajustado al marco legal e institucional que rige la naturaleza, objetivos y funciones de cada dependencia.',
        'La Secretaría de Planeación y Obras Públicas ofrecerá asesoría para la elaboración del plan de acción y brindará acompañamiento permanente a las dependencias y entidades del sector central del Municipio.',
      ],
      documents: [],
      formats: ['PE-PE-FR-03 Plan de Acción'],
      legalRequirements: [],
      variablesToMeasure: [],
      flowSteps: planAccionSteps,
    },
  },
  {
    ...procedure(
      'PE-PE-ANC-06',
      'Atención Necesidades a la Comunidad',
      'Secretaría de Desarrollo Social',
      31,
      ['PE-PE-FR-06 Acta de Visita Inspección Ocular'],
    ),
    source: {
      pageStart: 31,
      pageEnd: 31,
      validationMode: 'visual_validated',
    },
    detail: {
      objective:
        'Atender las necesidades de la comunidad que se encuentran dentro del alcance de la Secretaría de Infraestructura y Planeación.',
      scope:
        'Mediante este procedimiento se establecen las condiciones generales por medio de las cuales se debe proceder cuando la comunidad requiera los servicios de alquiler de maquinaria y/o presente necesidades en la ejecución de obras civiles.',
      definitions: [
        'Solicitud: Una solicitud o instancia es un documento escrito que va dirigido a un organismo público o a una autoridad, a los que se pide algo o ante los que se plantea una reclamación con la exposición de los motivos en los que se basan.',
      ],
      generalDispositions: [
        'Se establecen los lineamientos para la solicitud de requerimiento de maquinarias, entre otras necesidades.',
      ],
      documents: [],
      formats: ['PE-PE-FR-06 Acta de Visita Inspección Ocular'],
      legalRequirements: [],
      variablesToMeasure: [],
      flowSteps: atencionNecesidadesComunidadSteps,
    },
  },
  {
    ...procedure(
      'PE-PE-LC-07',
      'Licencia de Construcción',
      'Secretaría de Planeación',
      32,
      ['PE-PE-FR-07 Licencia de Construcción'],
    ),
    source: {
      pageStart: 32,
      pageEnd: 32,
      validationMode: 'visual_validated',
    },
    detail: {
      objective:
        'Ejercer el debido control y verificación del cumplimiento de las normas técnicas y de urbanismo en las construcciones; así como el cumplimiento y acatamiento de las normas urbanísticas por parte de la comunidad.',
      scope:
        'Inicia con la solicitud de información por parte de personas naturales y jurídicas que requieren de autorización para ejecutar un proyecto de construcción en un predio de la jurisdicción del Municipio, acorde con el Plan de Ordenamiento Territorial y las normas urbanísticas del Municipio.',
      definitions: [
        'Solicitud: Una solicitud o instancia es un documento escrito que va dirigido a un organismo público o a una autoridad, a los que se pide algo o ante los que se plantea una reclamación con la exposición de los motivos en los que se basan.',
        'Licencia de Construcción: Es la autorización previa para adelantar obras de urbanización y parcelación de predios, de construcción y demolición de edificaciones.',
      ],
      generalDispositions: [
        'Se establecen los lineamientos para la solicitud de requerimiento de maquinarias, entre otras necesidades.',
      ],
      documents: [],
      formats: ['PE-PE-FR-07 Licencia de Construcción'],
      legalRequirements: [],
      variablesToMeasure: [],
      flowSteps: licenciaConstruccionSteps,
    },
  },
  {
    ...procedure(
      'PE-PE-LS-08',
      'Licencia de Subdivisión',
      'Secretaría de Planeación',
      33,
    ),
    source: {
      pageStart: 33,
      pageEnd: 33,
      validationMode: 'visual_validated',
    },
    detail: {
      objective:
        'Ejercer el debido control y verificación del cumplimiento de las normas técnicas y de urbanismo en las construcciones. Así como crear conciencia en la comunidad del cumplimiento y acatamiento de las normas que en materia de ordenamiento rigen para el Municipio y dar estricto cumplimiento a la Ley.',
      scope:
        'Este proceso lo pueden solicitar todas aquellas personas naturales o jurídicas que requieran obtener autorización para ejecutar un proyecto de construcción en un predio de la jurisdicción del Municipio, acorde con el Plan de Ordenamiento Territorial y las normas urbanísticas de la entidad.',
      definitions: [
        'Solicitud: Una solicitud o instancia es un documento escrito que va dirigido a un organismo público o a una autoridad, a los que se pide algo o ante los que se plantea una reclamación con la exposición de los motivos en los que se basan.',
        'Licencia de Subdivisión: Es la autorización previa para dividir uno o varios predios, ubicados en suelo rural, urbano o de expansión urbana, de conformidad con lo dispuesto en el Plan de Ordenamiento Territorial, los instrumentos que lo desarrollen y complementen y demás normatividad vigente aplicable a las anteriores clases de suelo.',
      ],
      generalDispositions: [
        'Se establecen los lineamientos para la solicitud de requerimiento de maquinarias, entre otras necesidades.',
      ],
      documents: [],
      formats: [],
      legalRequirements: [],
      variablesToMeasure: [],
      flowSteps: licenciaSubdivisionSteps,
    },
  },
  {
    ...procedure(
      'PE-PE-CE-09',
      'Certificado de Estratificación',
      'Secretaría de Planeación',
      34,
    ),
    source: {
      pageStart: 34,
      pageEnd: 34,
      validationMode: 'visual_validated',
    },
    detail: {
      objective:
        'Determinar en las bases de datos gráficas y alfanuméricas y los archivos físicos y digitales el guarismo del estrato de una o más viviendas.',
      scope:
        'Inicia con una solicitud por escrito de certificado de estratificación y finaliza con la certificación del estrato.',
      definitions: [
        'Esquema de Ordenamiento Territorial EOT: Es el instrumento establecido por la Ley 388 de 1997, mediante el cual la Administración, concertadamente con los particulares, fija objetivos y estrategias, traza políticas y acciones para regular la intervención en el territorio a corto, mediano y largo plazo.',
        'Servicio de Estratificación: Es el servicio de clasificación de los inmuebles residenciales a cargo de cada Municipio y Distrito, el cual comprende todas las actividades que conducen a la realización, adopción, actualización y suministro de información para la aplicación de las estratificaciones tanto urbana como semiurbana o de centros poblados y rural.',
        'Realización de la Estratificación: Es el conjunto de actividades a cargo de la Alcaldía, conducentes a la ejecución, en forma directa o mediante contratación, de los estudios para la asignación de los estratos socioeconómicos en la zona urbana, semiurbana o de centros poblados y rural.',
        'Adopción de la Estratificación: Es el conjunto de actividades a cargo de la Alcaldía que comprende las labores relativas a la evaluación del impacto social y financiero de los resultados, a la divulgación general de los resultados de los estudios, a la expedición de los decretos municipales de adopción de los resultados y de plazos de aplicación por parte de las Empresas, y a la publicación oficial de los decretos.',
        'Aplicación de la Estratificación: Es el conjunto de actividades a cargo de la oficina de Servicios Públicos Domiciliarios que permiten la asignación del estrato socioeconómico a cada uno de los domicilios residenciales atendidos, de acuerdo con los resultados adoptados por la Alcaldía y la información suministrada por esta.',
        'Actualización de la Estratificación: Es el conjunto de actividades permanentes a cargo de la Alcaldía para mantener actualizada la clasificación de los inmuebles residenciales mediante la atención de reclamos, reclasificación de viviendas, incorporación de nuevos desarrollos y revisión general cuando corresponda.',
      ],
      generalDispositions: [
        'Para realizar este procedimiento el usuario debe allegar una solicitud clara y expresa, así como el recibo de pago de cancelación de estos servicios.',
      ],
      documents: [],
      formats: [],
      legalRequirements: [],
      variablesToMeasure: [],
      flowSteps: certificadoEstratificacionSteps,
    },
  },
  {
    ...procedure(
      'PE-PE-CN-10',
      'Certificado de Nomenclatura',
      'Secretaría de Planeación',
      35,
      ['PE-PE-FR-09 Certificado de Nomenclatura'],
    ),
    source: {
      pageStart: 35,
      pageEnd: 35,
      validationMode: 'visual_validated',
    },
    detail: {
      objective:
        'Brindarle al usuario una orientación específica y detallada de la ubicación y usos de su propiedad con respecto al EOT y demás normas vigentes que rigen la materia.',
      scope:
        'Por medio de este procedimiento se establecen los pasos lógicos a seguir para expedir el certificado de nomenclatura a solicitud de un usuario.',
      definitions: [
        'Certificado de Nomenclatura: Es el documento expedido por la Municipalidad, mediante el cual se indica el o los nombres anteriores con los que se ha ido identificando a una determinada vía.',
      ],
      generalDispositions: [
        'Para realizar este procedimiento el usuario debe allegar una solicitud clara y expresa, así como el recibo de pago de cancelación de estos servicios.',
      ],
      documents: [],
      formats: ['PE-PE-FR-09 Certificado de Nomenclatura'],
      legalRequirements: [],
      variablesToMeasure: [],
      flowSteps: certificadoNomenclaturaSteps,
    },
  },
  {
    ...procedure(
      'PE-PE-CUS-11',
      'Certificado Uso del Suelo',
      'Secretaría de Planeación',
      36,
      [
        'PE-PE-FR-10 Certificado Uso del Suelo Rural-PBOT',
        'PE-PE-FR-11 Concepto Uso del Suelo',
      ],
    ),
    source: {
      pageStart: 36,
      pageEnd: 36,
      validationMode: 'visual_validated',
    },
    detail: {
      objective:
        'Establecer mecanismos que permitan al municipio, en ejercicio de su autonomía, promover el ordenamiento de su territorio, el uso equitativo y racional del suelo, la preservación y defensa del patrimonio ecológico y cultural localizado en su ámbito territorial y la prevención de desastres en asentamientos de alto riesgo.',
      scope:
        'Establecer pasos lógicos a seguir para expedir el certificado de uso de suelo a solicitud de un usuario.',
      definitions: [
        'Certificado Uso del Suelo: Es la solicitud ante la Secretaría de Planeación para establecer el funcionamiento de un establecimiento que funciona o va a funcionar dentro del territorio municipal.',
        'Es la evaluación realizada por la Secretaría de Planeación municipal para regular el tipo de establecimiento o negocio que pueden ubicarse en un sector determinado del Municipio, regidos por el Plan de Ordenamiento Territorial.',
      ],
      generalDispositions: [
        'Para realizar este procedimiento el usuario debe allegar una solicitud clara y expresa, así como el recibo de pago de cancelación de estos servicios.',
      ],
      documents: [],
      formats: [
        'PE-PE-FR-10 Certificado Uso del Suelo Rural-PBOT',
        'PE-PE-FR-11 Concepto Uso del Suelo',
      ],
      legalRequirements: [],
      variablesToMeasure: [],
      flowSteps: certificadoUsoSueloSteps,
    },
  },
  {
    ...procedure(
      'PE-PE-DN-12',
      'Demarcación',
      'Secretaría de Planeación',
      37,
    ),
    source: {
      pageStart: 37,
      pageEnd: 37,
      validationMode: 'visual_validated',
    },
    detail: {
      objective:
        'Orientar e informar al usuario sobre las normas y requisitos necesarios para la solicitud de demarcación de un predio con el fin de realizarlo según las normas legales vigentes.',
      scope:
        'Por medio de este procedimiento se establecen los pasos lógicos a seguir para la demarcación en cumplimiento a las normas urbanísticas y arquitectónicas generales vigentes para determinado predio.',
      definitions: [
        'Demarcación: Es el documento por medio del cual la Secretaría de Planeación Municipal establece las normas urbanísticas con las cuales se debe desarrollar el predio.',
      ],
      generalDispositions: [
        'Para realizar este procedimiento el usuario debe allegar una solicitud clara y expresa, así como el recibo de pago de cancelación de estos servicios.',
      ],
      documents: [],
      formats: [],
      legalRequirements: [],
      variablesToMeasure: [],
      flowSteps: demarcacionSteps,
    },
  },
  {
    ...procedure(
      'PE-PE-ECR-13',
      'Elaboración Certificado de Residencia',
      'Secretaría de Planeación',
      39,
    ),
    source: {
      pageStart: 39,
      pageEnd: 39,
      validationMode: 'visual_validated',
    },
    detail: {
      objective:
        'Certificar al usuario su sitio de residencia según la normatividad legal vigente.',
      scope:
        'Se establecen los pasos lógicos a seguir para expedir el certificado de residencia a solicitud de un usuario.',
      definitions: [
        'Residencia: Vivir o habitar en un lugar determinado de forma permanente o durante un periodo considerable de tiempo. El lugar en el que un hombre tiene su hogar, o donde habita permanentemente o por un periodo prolongado de tiempo.',
      ],
      generalDispositions: [
        'Para realizar este procedimiento el usuario debe allegar una solicitud clara y expresa, así como el recibo de pago de cancelación de estos servicios.',
      ],
      documents: [],
      formats: [],
      legalRequirements: [],
      variablesToMeasure: [],
      flowSteps: certificadoResidenciaSteps,
    },
  },
  {
    ...procedure(
      'PE-PE-SOIS-14',
      'Suspensión de Obra e Imposición de Sanciones',
      'Secretaría de Planeación',
      40,
      ['PE-PE-FR-12 Acta de Suspensión'],
    ),
    source: {
      pageStart: 40,
      pageEnd: 40,
      validationMode: 'visual_validated',
    },
    detail: {
      objective:
        'Crear conciencia en la comunidad del cumplimiento y acatamiento de las normas que en materia de ordenamiento rigen para el Municipio y dar estricto cumplimiento a la Ley.',
      scope:
        'Por medio de este procedimiento se establecen los pasos lógicos a seguir en cuanto a la suspensión de obras e imposición de multas a usuarios que realicen actividades fuera del marco normativo establecido para el Municipio.',
      definitions: [
        'Sanción: Son una clase de acto administrativo que consiste en una sanción como consecuencia de una conducta ilícita del administrado.',
      ],
      generalDispositions: [
        'Para realizar este procedimiento el usuario debe allegar una solicitud clara y expresa, así como el recibo de pago de cancelación de estos servicios.',
      ],
      documents: [],
      formats: ['PE-PE-FR-12 Acta de Suspensión'],
      legalRequirements: [],
      variablesToMeasure: [],
      flowSteps: suspensionObraSancionesSteps,
    },
  },
  {
    ...procedure(
      'PE-PE-RBP-05',
      'Registro Banco de Proyectos',
      'Secretaría de Planeación',
    ),
  },
  {
    ...procedure(
      'PE-PE-EPF-15',
      'Estudio de Perfectibilidad y Factibilidad',
      'Secretaría de Planeación',
    ),
  },
  {
    ...procedure(
      'PE-PE-SO-16',
      'Supervisión de Obra',
      'Secretaría de Planeación',
    ),
  },
  {
    ...procedure(
      'PE-PE-RR-17',
      'Reporte de Regalías',
      'Secretaría de Planeación',
    ),
  },
  {
    ...procedure(
      'PE-PE-PAAC-18',
      'Formulación Plan Anticorrupción y Atención al Ciudadano',
      'Secretaría de Planeación',
    ),
  },
  {
    ...procedure(
      'PE-SG-SIG-01',
      'Manual del Sistema Integrado de Gestión',
      'Secretaría de Planeación',
    ),
  },
];

export const manualData: ManualData = {
  projectName: 'ProcesUX',
  entity: 'Municipio de Gachetá, Cundinamarca',
  sourceTitle: 'Manual de Procesos y Procedimientos del Municipio de Gachetá, Cundinamarca',
  notes: [
    'Base inicial preparada para reconstrucción visual validada de procedimientos.',
    'La estructura de macroprocesos y procesos se conserva conforme al mapa/listado del manual.',
    'Los procedimientos con validationMode="pendiente" deben completarse manualmente desde imagen o PDF antes de considerarse oficiales.',
  ],
  macroprocesses: [
    {
      id: 'pe', code: 'PE', name: 'Procesos Estratégicos', type: 'estrategico',
      processes: [
        { id: 'pe-pe', code: 'PE-PE', name: 'Planeación Estratégica', procedures: pePeProcedures },
      ],
    },
    {
      id: 'pm', code: 'PM', name: 'Procesos Misionales', type: 'misional',
      processes: [
        {
          id: 'pm-gds', code: 'PM-GDS', name: 'Gestión del Desarrollo Social', procedures: [
            {
              ...procedure('PM-GDS-CJT-01', 'Comité de Justicia Transicional y Subcomités', 'Secretaría de Gobierno y Desarrollo Institucional', 42),
              source: { pageStart: 42, pageEnd: 42, validationMode: 'visual_validated' },
              detail: {
                objective: 'Elaborar planes de acción en el marco de los planes de desarrollo a fin de lograr la atención, asistencia y reparación integral a las víctimas, coordinar acciones con las entidades del Sistema Nacional de Atención y Reparación a las Víctimas y articular la oferta institucional.',
                scope: 'El proceso inicia con la invitación realizada por la Secretaría Técnica de cada subcomité y comité, informando lugar, fecha, hora y orden del día, y finaliza con el acta de reunión y registro de asistencia.',
                definitions: [
                  'Plan de acción: herramienta de planificación empleada para la gestión y control de tareas o proyectos.',
                  'Inclusión social: proceso que asegura oportunidades y recursos para participar en la vida económica, social y cultural.',
                  'Desmovilización: proceso por el cual una tropa deja de ejercer su actividad militar.',
                  'Reintegración: oferta institucional para personas desmovilizadas que buscan reintegrarse a la vida social y económica.',
                  'Subcomité técnico: instancia de coordinación encargada de diseñar e implementar la política pública de prevención, asistencia, atención y reparación integral a las víctimas.',
                ],
                generalDispositions: ['Realizar convocatoria con los términos establecidos en el reglamento del comité y subcomités.'],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: comiteJusticiaTransicionalSteps,
              },
            },
            {
              ...procedure('PM-GDS-PP-02', 'Proyectos Productivos', 'Secretaría Desarrollo Económico', 43),
              source: { pageStart: 43, pageEnd: 43, validationMode: 'visual_validated' },
              detail: {
                objective: 'Obtener las medidas de reparación que propendan por la indemnización, rehabilitación, satisfacción y garantías de no repetición en sus dimensiones individual, colectiva, material, moral y simbólica.',
                scope: 'El proceso inicia por medio del subcomité de reparación integral, donde se presentan requisitos, líneas de unidades productivas, cantidad de personas beneficiarias y monto por unidad; culmina con la entrega de unidades productivas a cargo del operador.',
                definitions: [
                  'Indemnización: acción que se otorga al acreedor o a la víctima para exigir compensación por un daño.',
                  'Rehabilitación: conjunto de estrategias, planes, programas y acciones jurídicas, médicas, psicológicas y sociales dirigidas al restablecimiento de las víctimas.',
                ],
                generalDispositions: ['Estar registrado como incluido en el Registro Único de Víctimas.'],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: proyectosProductivosSteps,
              },
            },
            {
              ...procedure('PM-GDS-SAA-03', 'Subsidio por un Auxilio de Arrendamiento Temporal', 'Secretaría de Gobierno y Desarrollo Institucional', 44),
              source: { pageStart: 44, pageEnd: 45, validationMode: 'visual_validated' },
              detail: {
                objective: 'Contribuir a la implementación de la política nacional de atención y reparación integral de víctimas del conflicto armado para la superación definitiva de sus condiciones de vulnerabilidad y la garantía de goce efectivo de derechos.',
                scope: 'El trámite inicia con la solicitud radicada en Ventanilla Única y correspondencia por parte de la víctima, y finaliza con el reconocimiento del pago mediante acto administrativo.',
                definitions: [
                  'Conflicto armado: periodo caracterizado por confrontación armada en el territorio colombiano.',
                  'Condiciones de vulnerabilidad: capacidad disminuida de una persona o grupo para anticiparse, resistir y recuperarse de los efectos de un peligro.',
                ],
                generalDispositions: [
                  'Estar registrado como incluido en el Registro Único de Víctimas.',
                  'Ser residente del Municipio.',
                  'Contrato de arrendamiento.',
                  'Certificado de libertad y tradición.',
                  'Acta de subcomité de atención, asistencia y medidas de rehabilitación donde se aprueba solicitud.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: subsidioArrendamientoTemporalSteps,
              },
            },
            {
              ...procedure('PM-GDS-AF-04', 'Asistencia Funeraria', 'Secretaría de Gobierno y Desarrollo Institucional', 46),
              source: { pageStart: 46, pageEnd: 46, validationMode: 'visual_validated' },
              detail: {
                objective: 'Garantizar la asistencia funeraria contemplada en el Artículo 50 de la Ley 1448 de 2011 a las personas que no cuentan con recursos para sufragar gastos fúnebres.',
                scope: 'El trámite inicia con la solicitud radicada por parte de la familia de la víctima fallecida y finaliza con el reconocimiento del pago por medio de acto administrativo.',
                definitions: [
                  'Víctima: persona que sufre un daño provocado por un sujeto.',
                  'Post-Conflicto: periodo posterior a la superación total o parcial de conflictos armados.',
                  'Derechos Humanos: condiciones instrumentales que permiten a la persona su realización.',
                  'Acto administrativo: manifestación de un poder público en ejercicio de potestades administrativas.',
                ],
                generalDispositions: [
                  'Estar registrado como incluido en el Registro Único de Víctimas.',
                  'No contar con plan exequial.',
                  'Ser residente del Municipio.',
                  'Expedición de acto administrativo.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: asistenciaFunerariaSteps,
              },
            },
            {
              ...procedure('PM-GDS-AHI-05', 'Ayuda Humanitaria Inmediata', 'Secretaría de Gobierno y Desarrollo Institucional', 47),
              source: { pageStart: 47, pageEnd: 47, validationMode: 'visual_validated' },
              detail: {
                objective: 'Socorrer, asistir, proteger y atender necesidades de alimentación, aseo personal, manejo de abastecimientos, utensilios de cocina, atención médica y psicológica de emergencia, transporte y alojamiento transitorio en condiciones dignas.',
                scope: 'El trámite inicia con la declaración realizada en el Ministerio Público y radicada en correspondencia por parte de la víctima, y finaliza con la entrega de las ayudas a la población afectada.',
                definitions: [
                  'Ministerio Público: entidad que representa a la sociedad ante órganos jurisdiccionales del Estado, con autonomía funcional y administrativa.',
                ],
                generalDispositions: [
                  'Declaración realizada en el Ministerio Público.',
                  'La declaración no debe exceder tres meses desde la ocurrencia del hecho victimizante.',
                  'Haber declarado bajo el hecho victimizante de desplazamiento forzado y encontrarse en situación de vulnerabilidad acentuada.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: ayudaHumanitariaInmediataSteps,
              },
            },
            {
              ...procedure('PM-GDS-AOP-06', 'Atención y Orientación a Población Víctima', 'Secretaría de Gobierno y Desarrollo Institucional', 48, ['PM-GDS-FR-01 Acta de Visita']),
              source: { pageStart: 48, pageEnd: 48, validationMode: 'visual_validated' },
              detail: {
                objective: 'Dar información, orientación y acompañamiento jurídico y psicosocial a la víctima, facilitando el acceso y goce efectivo de derechos a la verdad, justicia y reparación.',
                scope: 'Inicia con la presencia o remisión de la víctima a la oficina correspondiente y finaliza con el seguimiento a la respuesta oportuna por parte de las dependencias o entidades implicadas.',
                definitions: [
                  'Derechos Humanos: condiciones instrumentales que permiten a la persona su realización.',
                  'Víctimas: persona física que sufre un daño provocado por un sujeto.',
                  'Post-Conflicto: periodo posterior a la superación total o parcial de conflictos armados.',
                ],
                generalDispositions: ['Estar registrado como incluido en el Registro Único de Víctimas.'],
                documents: [],
                formats: ['PM-GDS-FR-01 Acta de Visita'],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: atencionOrientacionPoblacionVictimaSteps,
              },
            },
            {
              ...procedure('PM-GDS-CE-07', 'Comité de Empleo', 'Secretaría de Gobierno y Desarrollo Institucional', 49),
              source: { pageStart: 49, pageEnd: 49, validationMode: 'visual_validated' },
              detail: {
                objective: 'Estimular las políticas y programas de empleo en el municipio, generar ingresos en la población y reducir brechas de acceso al empleo.',
                scope: 'El procedimiento comienza con el envío de invitaciones a cada miembro del Comité y termina con la asignación de tareas y cierre por parte de la secretaría técnica.',
                definitions: [
                  'Comité: grupo de personas encargadas de un asunto.',
                  'Cajas de Compensación: entidades privadas encargadas de administrar prestaciones de seguridad social y otros beneficios.',
                ],
                generalDispositions: [
                  'Enviar invitaciones a los miembros del comité.',
                  'Confirmar asistencia a la reunión.',
                  'Verificación del quórum.',
                  'Lectura del orden del día.',
                  'Deliberación del Comité.',
                  'Compromisos.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: comiteEmpleoSteps,
              },
            },
            {
              ...procedure('PM-GDS-RP-08', 'Ruta de la Productividad', 'Secretaría de Desarrollo Social', 50),
              source: { pageStart: 50, pageEnd: 51, validationMode: 'visual_validated' },
              detail: {
                objective: 'Dinamizar el emprendimiento y fortalecimiento empresarial en los sectores económicos para aumentar productividad y competitividad del Municipio de Gachetá.',
                scope: 'Inicia con la caracterización del sector productivo del Municipio y culmina con el seguimiento a la entrega de maquinaria, insumos y/o créditos al empresario o emprendedor.',
                definitions: [
                  'Emprendimiento: iniciativa de una persona que asume un riesgo económico para aprovechar una oportunidad.',
                  'Productividad: relación entre productos obtenidos y recursos utilizados.',
                  'Competitividad: capacidad de obtener rentabilidad frente a competidores.',
                  'Empresario: persona que crea o adquiere un negocio o empresa y trabaja en su crecimiento.',
                ],
                generalDispositions: [
                  'Para acceder a créditos se requiere tener negocio en funcionamiento, no estar reportado en datacrédito y aportar documentos del deudor o codeudor según corresponda.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: rutaProductividadSteps,
              },
            },
            {
              ...procedure('PM-GDS-CP-09', 'Caracterización de la Población Minoritaria', 'Secretaría de Desarrollo Social', 52),
              source: { pageStart: 52, pageEnd: 52, validationMode: 'visual_validated' },
              detail: {
                objective: 'Realizar la caracterización de la población perteneciente a minorías afrodescendiente, ROM, indígena, LGBTI y habitantes de calle para conocer ubicación, condiciones y mantener comunicación.',
                scope: 'Inicia con la identificación de la población y finaliza con su inclusión en las bases de datos creadas para tal fin.',
                definitions: [
                  'Caracterización: determinar las características particulares de alguien.',
                  'ROM: pueblo étnico gitano.',
                  'LGBTI: población lesbiana, gay, bisexual, transexual e intersexuada.',
                  'Afrodescendiente: personas con antepasados africanos.',
                  'Afrocolombiano: personas de raza afro que habitan en Colombia.',
                ],
                generalDispositions: [
                  'Utilizar los formatos indicados de acuerdo con la minoría.',
                  'Pertenecer a alguna población minoritaria: afrodescendiente, ROM, indígena, LGBTI o habitante de calle.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: caracterizacionPoblacionMinoritariaSteps,
              },
            },
            {
              ...procedure('PM-GDS-AC-10', 'Atención a la Comunidad', 'Secretaría de Desarrollo Social', 53),
              source: { pageStart: 53, pageEnd: 53, validationMode: 'visual_validated' },
              detail: {
                objective: 'Brindar atención a la población que hace parte de minorías para satisfacer y dar cumplimiento al goce efectivo de derechos humanos.',
                scope: 'Inicia con la necesidad de la persona perteneciente a población minoritaria y finaliza con la posible solución a su necesidad.',
                definitions: [
                  'Oferta institucional: conjunto de planes, programas, proyectos y acciones específicas a disposición de la población.',
                  'Minoría: grupo numéricamente menor frente al grupo mayoritario.',
                  'Enfoque diferencial de género y Derechos Humanos: análisis de relaciones sociales desde necesidades específicas.',
                  'Atención diferencial: atención dirigida a poblaciones con condiciones particulares.',
                ],
                generalDispositions: [
                  'Obedece a la necesidad o falta de información de personas pertenecientes a minorías.',
                  'La comunidad atendida debe pertenecer a una minoría: afrodescendiente, indígena, ROM, LGBTIQ o habitante de calle.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: atencionComunidadSteps,
              },
            },
            {
              ...procedure('PM-GDS-EC-11', 'Eventos Comunitarios', 'Secretaría de Gobierno y Desarrollo Institucional', 54, ['PM-GDS-FR-02 Permiso Provisional Eventos']),
              source: { pageStart: 54, pageEnd: 55, validationMode: 'visual_validated' },
              detail: {
                objective: 'Realizar eventos de apoyo comunitario dirigidos a población minoritaria para generar espacios de participación, inclusión y reconocimiento cultural.',
                scope: 'Inicia con la convocatoria a la población beneficiaria del evento y termina con su ejecución y finalización.',
                definitions: [
                  'Eventos comunitarios: actividades de construcción social con repercusión positiva.',
                  'Convocatoria: anuncio por medio del cual se convoca a un evento.',
                  'Población humana: grupo de seres humanos que viven en un espacio geográfico.',
                  'Minoría: parte menor de personas dentro de un cuerpo, nación o comunidad.',
                  'Logística: técnica para reunir medios necesarios para organizar un evento.',
                ],
                generalDispositions: [
                  'Toda la población del municipio puede hacer parte de convocatorias ofertadas por la Secretaría de Desarrollo Social.',
                  'Según la naturaleza del evento, las actividades podrán dirigirse a un grupo poblacional específico.',
                ],
                documents: [],
                formats: ['PM-GDS-FR-02 Permiso Provisional Eventos'],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: eventosComunitariosSteps,
              },
            },
            {
              ...procedure('PM-GDS-SPP-12', 'Seguimiento a la Política Pública de Jóvenes', 'Secretaría de Desarrollo Social', 56),
              source: { pageStart: 56, pageEnd: 57, validationMode: 'visual_validated' },
              detail: {
                objective: 'Implementar la política pública de juventudes en el municipio de Gachetá, dando cumplimiento a la Ley Estatutaria de Juventudes y mejorando la calidad de vida de jóvenes entre 14 y 28 años.',
                scope: 'Inicia con la creación de la hoja de ruta por diez años sobre prioridades de jóvenes y finaliza con la divulgación en lugares donde se aglomere la juventud.',
                definitions: [
                  'Política pública de juventudes: herramienta con orientaciones a corto, mediano y largo plazo para transformar condiciones sociales y ampliar oportunidades.',
                  'Ley de juventudes: marco orientado a garantizar continuidad de derechos de adolescentes y jóvenes.',
                ],
                generalDispositions: ['Los beneficiados serán jóvenes entre 14 y 28 años según la Ley 1622 de 2013.'],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: seguimientoPoliticaPublicaJovenesSteps,
              },
            },
            {
              ...procedure('PM-GDS-VJ-13', 'Voluntariado Juvenil', 'Secretaría de Desarrollo Social', 58, ['PM-GDS-FR-03 Certificaciones Prácticas Empresariales']),
              source: { pageStart: 58, pageEnd: 59, validationMode: 'visual_validated' },
              detail: {
                objective: 'Crear una estrategia de voluntariado juvenil mediante convocatoria a jóvenes para realizar actividades y estrategias de labor social, ambiental, recreativa y cultural.',
                scope: 'Inicia con la convocatoria a jóvenes entre 18 y 35 años que deseen apoyar el voluntariado juvenil y finaliza con actividades encaminadas al trabajo social, medio ambiente y mejora de calidad de vida.',
                definitions: ['Voluntariado: conjunto de personas que se unen libre y desinteresadamente para trabajar con fines benéficos o altruistas.'],
                generalDispositions: [
                  'Los voluntarios deben ser mayores de edad entre 18 y 35 años.',
                  'Firmar formato de consentimiento para uso de datos e imágenes por parte de la administración municipal.',
                ],
                documents: [],
                formats: ['PM-GDS-FR-03 Certificaciones Prácticas Empresariales'],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: voluntariadoJuvenilSteps,
              },
            },
            {
              ...procedure('PM-GDS-FCS-14', 'Realización de Foros, Congresos, Seminarios', 'Secretaría de Desarrollo Social', 60),
              source: { pageStart: 60, pageEnd: 61, validationMode: 'visual_validated' },
              detail: {
                objective: 'Realizar foros, seminarios, congresos y talleres para jóvenes del municipio de Gachetá sobre temas de importancia nacional y carácter general.',
                scope: 'Inicia con la programación de temas, ponentes y parámetros de cada proceso; termina con la evaluación del impacto sobre los jóvenes.',
                definitions: [
                  'Foro: técnica de comunicación grupal sobre un tema de interés común.',
                  'Seminario: actividades comunes de profesores y alumnos orientadas a práctica e investigación.',
                  'Congreso: reunión periódica para presentar conferencias o exposiciones sobre temas relacionados.',
                  'Taller: curso breve donde se enseña una actividad práctica o artística.',
                ],
                generalDispositions: ['Se realizarán periódicamente, mediante inscripción previa de jóvenes y con temas avalados por la plataforma de juventudes o entes juveniles.'],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: forosCongresosSeminariosSteps,
              },
            },
            {
              ...procedure('PM-GDS-DEJ-15', 'Desarrollo de Encuentros Juveniles', 'Secretaría de Desarrollo Social', 62),
              source: { pageStart: 62, pageEnd: 62, validationMode: 'visual_validated' },
              detail: {
                objective: 'Desarrollar encuentros juveniles en el municipio de Gachetá con grupos, redes, organizaciones y movimientos juveniles, con el fin de impulsar el talento juvenil.',
                scope: 'Inicia con la convocatoria a grupos de jóvenes del municipio pertenecientes a redes, organizaciones y movimientos juveniles, y finaliza con premiación y/o entrega de incentivos.',
                definitions: ['Encuentros de juventudes: espacios didácticos, recreativos y diversos para ejercer participación activa y unir objetivos y talentos de la juventud.'],
                generalDispositions: [
                  'Se desarrollará mínimo una vez al año con un grupo plural de jóvenes.',
                  'Jóvenes inscritos dentro de la plataforma de juventudes de la personería municipal y/o base de datos de la Dirección de Juventudes.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: encuentrosJuvenilesSteps,
              },
            },
            {
              ...procedure('PM-GDS-ICP-16', 'Inscripción a Cursos y Programas de Formación', 'Secretaría de Desarrollo Social', 63),
              source: { pageStart: 63, pageEnd: 64, validationMode: 'visual_validated' },
              detail: {
                objective: 'Inscribir a la población juvenil del municipio de Gachetá en cursos complementarios y programas de educación para mejorar el nivel educativo y capacidades laborales.',
                scope: 'Inicia con la apertura de la convocatoria de cursos complementarios y programas de formación a jóvenes de 14 años en adelante, y finaliza con la participación del personal inscrito.',
                definitions: [
                  'Inscripción: acción y efecto de inscribir o registrar a alguien o algo.',
                  'SENA: Servicio Nacional de Aprendizaje.',
                ],
                generalDispositions: [
                  'El joven debe tener 14 años o más.',
                  'Debe estar inscrito en la plataforma de la entidad a estudiar.',
                  'Debe traer copia del documento de identidad o conocer sus datos personales.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: inscripcionCursosProgramasSteps,
              },
            },
            {
              ...procedure('PM-GDS-SIFA-17', 'Novedades SIFA Familias en Acción', 'Secretaría de Desarrollo Social', 65),
              source: { pageStart: 65, pageEnd: 66, validationMode: 'visual_validated' },
              detail: {
                objective: 'Mantener actualizada la base de datos en la plataforma nacional SIFA, elaborando novedades realizadas por titulares del programa.',
                scope: 'Inicia con la solicitud de documentos de identidad para actualización de la plataforma SIFA y culmina con revisión y aprobación por parte de la regional Cundinamarca de Familias en Acción.',
                definitions: [
                  'Familias en Acción: programa nacional que permite otorgar incentivo monetario a familias inscritas.',
                  'SIFA: sistema de información Familias en Acción.',
                  'Caracterización: identificación de la población a la que pertenece cada usuario.',
                  'Novedades: compromisos o actualizaciones que deben cumplir los usuarios del programa.',
                ],
                generalDispositions: [
                  'Cada titular debe actualizar documentos.',
                  'El titular debe allegar fotocopia del documento de identidad al 150% y registro civil legible.',
                  'El usuario debe acercarse personalmente para realizar novedades con soportes legibles.',
                  'Si el titular no puede realizar el trámite, debe enviar apoderado con copia de cédula y trámite firmado.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: novedadesSifaSteps,
              },
            },
            {
              ...procedure('PM-GDS-RPF-18', 'Retirados Programa Familias en Acción', 'Secretaría de Desarrollo Social', 67),
              source: { pageStart: 67, pageEnd: 67, validationMode: 'visual_validated' },
              detail: {
                objective: 'Registrar el retiro del usuario por no cumplimiento de variables del programa, a partir de suspensión del beneficiario o núcleo familiar dentro de un plazo de dos meses.',
                scope: 'Inicia con el listado de beneficiarios suspendidos en SIFA y finaliza con la pérdida del beneficio y retiro del sistema por no subsanar novedades.',
                definitions: [
                  'No cobro: el titular no reclama el incentivo durante cuatro meses consecutivos.',
                  'Graduado: terminación del ciclo escolar.',
                  'Requisito de edad: actualización de documento cuando el beneficiario cambia de registro civil a tarjeta de identidad.',
                ],
                generalDispositions: ['Los beneficiarios deben cumplir requisitos de escolaridad, edad y cobro de incentivos en tiempos reglamentados por el DPS.'],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: retiradosFamiliasAccionSteps,
              },
            },
            {
              ...procedure('PM-GDS-BCF-19', 'Bienestar Comunitario, Familias en Acción', 'Secretaría de Desarrollo Social', 68),
              source: { pageStart: 68, pageEnd: 68, validationMode: 'visual_validated' },
              detail: {
                objective: 'Realizar encuentros de cuidado del programa Familias en Acción, buscando participación de titulares y articulación con profesionales de la institución.',
                scope: 'Inicia con la citación de madres líderes de cada sector y finaliza con el desarrollo de actividades de compartir por parte de participantes y profesionales líderes.',
                definitions: [
                  'DPS: Departamento para la Prosperidad Social.',
                  'Citación: llamado a lista de usuarios de Familias en Acción.',
                  'Encuentro pedagógico: agrupación de madres titulares del programa.',
                  'Capacitación: inducción a procesos articulados con profesionales.',
                  'Lúdicas: actividades de integración.',
                ],
                generalDispositions: ['Los usuarios deben cumplir los requerimientos del DPS, incluida la asistencia a encuentros de cuidado.'],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: bienestarComunitarioFamiliasAccionSteps,
              },
            },
            {
              ...procedure('PM-GDS-RCC-20', 'Revisión de Cuentas de Contratistas', 'Secretaría de Hacienda', 69),
              source: { pageStart: 69, pageEnd: 69, validationMode: 'visual_validated' },
              detail: {
                objective: 'Revisar las cuentas de cobro de los contratistas que supervisa la Secretaría de Desarrollo y verificar que las actas cumplan con el objeto y funciones de cada contratista.',
                scope: 'Inicia con la recepción de la cuenta de cobro del contratista por parte de la Secretaría de Gobierno para revisión y termina con aprobación y visto bueno por parte de la Secretaría de Hacienda.',
                definitions: [
                  'Contratista: persona que presta un servicio tras recibir el encargo correspondiente.',
                  'Cuenta de cobro: comprobante de la realización de un pago o cobro por prestación de un servicio.',
                ],
                generalDispositions: [
                  'Para la firma de las actas, el contratista debe adjuntar todos los documentos exigidos por la Secretaría de Hacienda para revisión por el secretario de gobierno.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: revisionCuentasContratistasSocialSteps,
              },
            },
            {
              ...procedure(
                'PM-GDS-RAR-21',
                'Revisión, Aprobación y Respuesta a Requerimientos',
                'Secretaría de Gobierno y Desarrollo Institucional',
                70,
              ),
              source: {
                pageStart: 70,
                pageEnd: 70,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Responder oportunamente a las solicitudes y requerimientos allegadas a la Alcaldía de Gachetá.',
                scope:
                  'Inicia con la recepción de la documentación proveniente de las diferentes secretarías que conforman la Alcaldía y la ciudadanía que requieran revisión, aprobación o respuesta.',
                definitions: [
                  'Solicitud: Documento en el que se solicita formalmente algo.',
                  'Seguimiento: Realizar seguimiento a los recibidos de las respuestas de los peticionarios. En caso de devolución, se hace la respectiva publicación.',
                ],
                generalDispositions: [
                  'Documentos para revisión, aprobación o respuesta.',
                  'Las solicitudes recepcionadas por parte de la ciudadanía deben estar dirigidas al despacho de la Secretaría de Gobierno y tener los datos básicos del peticionario: nombre, cédula y dirección.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: revisionAprobacionRespuestaRequerimientosSteps,
              },
            },
            {
              ...procedure(
                'PM-GDS-AU-22',
                'Atención a Usuarios',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
            },
          ]
        },
        {
          id: 'pm-gde', code: 'PM-GDE', name: 'Gestión del Desarrollo Económico', procedures: [
            {
              ...procedure(
                'PM-GDE-ATA-01',
                'Asistencia Técnica Agropecuaria',
                'Gestión de Desarrollo Económico, Sostenible y de Turismo',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Prestar los servicios de asistencia técnica y extensión agropecuaria y rural a proyectos relacionados con el desarrollo rural y proyectos productivos agrícolas, pecuarios y forestales, para incrementar la producción agropecuaria y garantizar la competitividad y la sostenibilidad ambiental y social.',
                scope:
                  'Este procedimiento inicia cuando se identifica la necesidad de asistencia técnica o se recibe la solicitud de usuarios en el área rural; realiza la visita, asesoría o capacitación y finaliza con el seguimiento y evaluación de la actividad.',
                definitions: [
                  'Asistencia técnica: Conjunto de actividades que tienen como propósito la transferencia de conocimiento, tecnología, métodos o cualquier otro factor que incida positivamente en la capacidad de los procesos del cliente respecto a una temática específica; se desarrolla mediante actividades de capacitación, asesoría y acompañamiento.',
                  'Capacitación: Proporciona conocimientos que le permiten a las entidades fortalecer la capacidad para la innovación y afrontar el cambio, percibir los requerimientos del entorno, tomar decisiones acertadas en situaciones complejas, generar compromisos, trabajar en equipo y valorar lo público.',
                  'Asesoría: Proporciona ayuda en el proceso de toma de decisiones, identifica problemas, señala oportunidades de mejora, aconseja y recomienda aplicar lineamientos y correctivos a seguir.',
                  'Acompañamiento: Apoyo directo, orientado a la construcción conjunta de soluciones a los temas definidos en el Plan de Asistencia Técnica.',
                  'Asistencia Técnica Directa: Se refiere a la asistencia que brindan los funcionarios de las dependencias del Departamento.',
                  'Asistencia Técnica Indirecta: Cuando la realiza una persona natural o jurídica contratada.',
                ],
                generalDispositions: [
                  'Seguimiento y acompañamiento continuo de todos los pequeños y medianos productores del municipio de Gachetá.',
                  'Se prestará asistencia técnica agropecuaria en los siguientes ámbitos: aptitud de los suelos, selección del tipo de actividad, aplicación y usos de tecnologías, uso de recursos adecuados al tipo de actividad productiva y manejo ambiental, sanitario de los agro-ecosistemas.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: asistenciaTecnicaAgropecuariaSteps,
              },
            },
            {
              ...procedure(
                'PM-GDE-EA-02',
                'Estadísticas Agropecuarias',
                'Gestión de Desarrollo Económico, Sostenible y de Turismo',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Recolectar, sistematizar, analizar, complementar y publicar la información estadística del sector agropecuario del municipio de Gachetá, mediante la realización de Evaluación Agropecuaria Municipal EVA, siguiendo lineamientos del Ministerio de Agricultura y Desarrollo Rural.',
                scope:
                  'El procedimiento inicia con la preparación logística, programación, capacitación, recolección, sistematización y análisis de la información; y culmina con el informe de los resultados estadísticos.',
                definitions: [
                  'Estadísticas Agropecuarias: Es una herramienta para el manejo de información agropecuaria de los municipios con el fin de apoyar la toma de decisiones, la orientación de recursos, la implementación de proyectos y programas y la unificación de criterios.',
                  'Evaluación Agropecuaria EVA: Las Evaluaciones Agropecuarias, como mecanismo subjetivo de recolección de información sobre área, producción y rendimiento de la agricultura, desarrollada por el Ministerio de Agricultura y Desarrollo Rural desde 1972, surge como alternativa a la debilidad gremial para operar sistemas de información adecuados y como alternativa al vacío general de información que caracteriza el sector agropecuario.',
                  'Cultivos Transitorios: Cultivos cuyo ciclo de crecimiento es, en general, menor de un año y tiene como característica fundamental que después de la cosecha deben volver a sembrarse para seguir produciendo.',
                  'Cultivos Permanentes: Son aquellos que su periodo de vida vegetativo se puede extender incluso hasta más allá de 25 años continuos como: el aguacate, el mango, las manzanas; los que regularmente una vez realizada la siembra, pueden obtenerse varias cosechas. Estas pueden ser cíclicas, además de continuas, dependiendo del tipo de plantación.',
                  'Cultivos Anuales: Cultivos cuyo ciclo de crecimiento es por lo general entre un año y dieciocho meses y tienen como característica fundamental que después de la cosecha deben volver a sembrarse para seguir produciendo.',
                ],
                generalDispositions: [
                  'Todas aquellas personas e instituciones públicas y privadas que posean información de las actividades agrícolas, pecuarias y acuícolas de la región, dentro de las cuales están universidades, gremios, productores, entre otros.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: estadisticasAgropecuariasSteps,
              },
            },
            {
              ...procedure(
                'PM-GDE-PIE-03',
                'Adquisición de Predios de Importancia Estratégica',
                'Gestión de Desarrollo Económico, Sostenible y de Turismo',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Establecer el procedimiento para la adquisición de predios de importancia estratégica para la preservación, conservación y restauración de cuencas del Municipio de Gachetá.',
                scope:
                  'El procedimiento inicia con la identificación de predios; continúa con la recepción de propuestas de venta, la verificación de la propuesta y la validación de documentos; y finaliza con el concepto de viabilidad, la suscripción del contrato, el registro legal del predio y el desembolso de los recursos por parte del Municipio.',
                definitions: [
                  'Predio de Importancia: Área destinada para la conservación, preservación y restauración de los recursos hídricos que surten de agua los acueductos municipales.',
                  'Conservación: Es la conservación in situ de los ecosistemas y los hábitats naturales, mantenimiento y recuperación de poblaciones viables de especies en su entorno natural y, en el caso de las especies domesticadas y cultivadas en los entornos en que hayan desarrollado sus propiedades específicas. La conservación in situ hace referencia a la preservación, restauración, uso sostenible y conocimiento de la biodiversidad.',
                  'Preservación: Mantener la composición, estructura y función de la biodiversidad, conforme su dinámica natural y evitando al máximo la intervención humana y sus efectos.',
                  'Restauración: Restablecer parcial o totalmente la composición, estructura y función de la biodiversidad que haya sido alterada o degradada.',
                ],
                generalDispositions: [
                  'Para la adquisición de predios de importancia hídrica, se tendrá en cuenta que estos se encuentren identificados, delimitados y priorizados dentro de las áreas de importancia estratégica establecidas por las autoridades ambientales.',
                  'Para su selección, se tendrán en cuenta los criterios definidos por el Decreto 1076 de 2015, entre los cuales se enuncian a continuación: 1. Población abastecida por los acueductos beneficiados con la conservación del área estratégica dentro de la cual está ubicada el predio. 2. Presencia en el predio de corrientes hídricas, manantiales, afloramientos y humedales.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: adquisicionPrediosImportanciaEstrategicaSteps,
              },
            },
            {
              ...procedure(
                'PM-GDE-PIE-04',
                'Mantenimiento de Predios de Importancia Estratégica',
                'Gestión de Desarrollo Económico, Sostenible y de Turismo',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Establecer las actividades para identificar y atender las solicitudes de mantenimiento de predios de importancia estratégica.',
                scope:
                  'El procedimiento inicia con la identificación de predios de importancia estratégica que hayan sido adquiridos con los recursos provenientes de la Ley 99 de 1993 y finaliza con la visita técnica, priorización y programación de mantenimientos.',
                definitions: [
                  'Mantenimiento de áreas de importancia estratégica: Aquellas actividades directamente desarrolladas en los predios adquiridos por la entidad territorial para la conservación y recuperación de los ecosistemas presentes en los mismos; el mantenimiento comprende actividades de reforestación, cercado y mantenimiento a plantaciones efectuadas anteriormente.',
                  'Predio de Importancia: Área destinada para la conservación, preservación y restauración de los recursos hídricos que surten de agua los acueductos municipales.',
                  'Conservación: Son actividades que existen para regular, minimizar o impedir el daño que las actividades de índole industrial, en el caso de las especies domesticadas y cultivadas, en los entornos en que hayan desarrollado sus propiedades específicas. La conservación hace referencia a la preservación, restauración, uso sostenible y conocimiento de la biodiversidad.',
                  'Preservación: Mantener la composición, estructura y función de la biodiversidad, conforme su dinámica natural y evitando al máximo la intervención humana y sus efectos.',
                  'Restauración: Restablecer parcial o totalmente la composición, estructura y función de la biodiversidad, que haya sido alterada o degradada.',
                ],
                generalDispositions: [
                  'Los predios priorizados para mantenimiento deben cumplir el artículo 111 de la Ley 99 de 1993 parágrafo 2.',
                  'El Ministerio de Ambiente, Vivienda y Desarrollo Territorial, institutos de investigación científica adscritos y vinculados, las corporaciones autónomas regionales y de desarrollo sostenible, las autoridades ambientales de los grandes centros urbanos y los establecimientos ambientales a que se refiere el artículo 13 de la Ley 768 de 2002, podrán en el marco de sus competencias efectuar los aportes técnicos, financieros y operativos requeridos para la consolidación del instrumento de pago por servicios ambientales y el desarrollo de proyectos derivados de este instrumento.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: mantenimientoPrediosImportanciaEstrategicaSteps,
              },
            },
          ]
        },
        {
          id: 'pm-gjc', code: 'PM-GJC', name: 'Gestión de Gobierno, Justicia y Convivencia Ciudadana', procedures: [
            {
              ...procedure(
                'PM-GJC-PBI-05',
                'Verbal Abreviado Protección de Bienes Inmuebles',
                'Inspección de Policía',
                undefined,
                [
                  'PM-GJC-FR-03 Querella Inspección de Policía',
                  'PM-GJC-FR-04 Citación',
                  'PM-GJC-FR-18 Boletas de Notificación',
                  'PM-GJC-FR-25 Auto',
                ],
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Propiciar en la comunidad comportamientos que favorezcan la convivencia en el espacio público, áreas comunes, lugares abiertos al público o que, siendo privados, trascienden a lo público; promoviendo el respeto, el ejercicio responsable de la libertad, la dignidad, los deberes y los derechos correlativos a la persona humana.',
                scope:
                  'Inicia con la recepción de la petición o la denuncia por parte de la persona que tenga interés en la aplicación del régimen de policía y termina con el registro de las actuaciones y decisiones tomadas frente a los comparendos que se expiden, en el Sistema de Registro Nacional de Medidas Correctivas de la Policía y la aplicación de acciones de mejoramiento.',
                definitions: [
                  'Restablecimiento del Statu Quo: Devolución a la situación de hecho existente antes del acto o hecho de vulneración.',
                  'Posesión: Según el artículo 762 del Código Civil, es la tenencia de una cosa determinada con ánimo de señor o dueño.',
                  'Mera Tenencia: Según el artículo 775 del Código Civil, es la que se ejerce sobre una cosa, no como dueño, sino en lugar o a nombre del dueño.',
                  'Servidumbre: Según el artículo 879 del Código Civil, es un gravamen impuesto sobre un predio en utilidad de otro predio de distinto dueño.',
                ],
                generalDispositions: [
                  'Las actividades relacionadas con este procedimiento hacen referencia al trámite del proceso verbal abreviado, de conformidad con lo dispuesto en el artículo 79 de la Ley 1801 de 2016.',
                  'La caducidad frente a bienes inmuebles particulares procede dentro de los cuatro (4) meses siguientes a la perturbación por ocupación legal.',
                  'Cuando se trate de hechos de perturbación de bienes de uso público, bienes fiscales, zonas de reserva forestal, bienes de propiedad privada afectados al espacio público, bienes de empresas de servicios públicos, bienes declarados de utilidad pública o de interés social, cultural, arquitectónico o histórico, no existe caducidad de la acción policiva.',
                  'La comunicación al personero procede cuando se trate de hechos de perturbación de bienes de uso público, bienes fiscales, zonas de reserva forestal, bienes de propiedad privada afectados al espacio público, bienes de empresas de servicios públicos, bienes declarados de utilidad pública o de interés social, cultural, arquitectónico o histórico.',
                  'El factor de competencia corresponde a la competencia del despacho o autoridad de policía para conocer sobre los comportamientos contrarios a la convivencia.',
                ],
                documents: [],
                formats: [
                  'PM-GJC-FR-03 Querella Inspección de Policía',
                  'PM-GJC-FR-04 Citación',
                  'PM-GJC-FR-18 Boletas de Notificación',
                  'PM-GJC-FR-25 Auto',
                ],
                legalRequirements: [
                  'Ley 1801 de 2016, artículos 79 y 80.',
                  'Código Civil, artículos 762, 775 y 879.',
                ],
                variablesToMeasure: [],
                flowSteps: verbalAbreviadoProteccionBienesInmueblesSteps,
              },
            },
            {
              ...procedure(
                'PM-GJC-SIP-06',
                'Apelación del Proceso Verbal Inmediato Ley 1801 del 2016',
                'Inspección de Policía',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Proferir un fallo de segunda instancia con respecto a decisiones proferidas por el personal uniformado de la Policía Nacional como resultado de la aplicación del Procedimiento establecido en el Código Nacional de Policía y Convivencia, para garantizar el cumplimiento de los deberes y obligaciones de las personas naturales y jurídicas.',
                scope:
                  'Aplica para decisiones proferidas por el personal uniformado de la Policía Nacional que sean apeladas por el ciudadano que sea objeto de las mismas, dentro de lo dispuesto por la Ley 1801 de 2016.',
                definitions: [
                  'Convivencia: Interacción pacífica, respetuosa y armónica entre las personas, con los bienes y con el ambiente en el marco del ordenamiento jurídico.',
                  'De oficio: Actualización iniciada por parte de la autoridad competente sin necesidad de queja o requerimiento de un tercero.',
                  'Estrados: Forma de notificar las decisiones dentro de la audiencia pública.',
                  'Medios de prueba: Aquellos que llevan al funcionario a obtener la certeza sobre la realización o no de las conductas investigadas, para llegar a la toma de una decisión en derecho.',
                ],
                generalDispositions: [
                  'En contra de la orden de policía o la medida correctiva procederá el recurso de apelación, el cual se concederá en el efecto devolutivo y se remitirá al Inspector de Policía dentro de las veinticuatro (24) horas siguientes.',
                  'El recurso de apelación se resolverá dentro de los tres (3) días hábiles siguientes al recibo de la actualización y será notificado por medio más eficaz y expedito.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [
                  'Ley 1801 de 2016.',
                  'Código Nacional de Policía y Convivencia.',
                ],
                variablesToMeasure: [],
                flowSteps: apelacionProcesoVerbalInmediatoSteps,
              },
            },
            {
              ...procedure(
                'PM-GJC-CCC-07',
                'Verbal Abreviado Comportamientos Contrarios a la Convivencia Ciudadana',
                'Inspección de Policía',
                undefined,
                [
                  'PM-GJC-FR-04 Citación',
                  'PM-GJC-FR-18 Boletas de Notificación',
                  'PM-GJC-FR-25 Auto',
                ],
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Restablecer las condiciones al punto en que se encontraban antes de la ocurrencia de comportamientos contrarios a la convivencia y propiciar el cumplimiento de los deberes y obligaciones de las personas naturales y jurídicas.',
                scope:
                  'Aplica a los comportamientos contrarios a la convivencia en relación con las normas urbanísticas, ambientales, sanitarias, uso del espacio público, ejercicio de la actividad económica, libertad de circulación, interacciones entre las personas y los animales, uso efectivo de los derechos de niños, niñas y adolescentes del ejercicio de la prostitución, derecho de reunión y relaciones entre personas y autoridades.',
                definitions: [
                  'Contravencional: Conducta punible que, por no afectar bienes jurídicos de mayor envergadura, no reviste la categoría de delito y su sanción es menos rígida.',
                  'Control: Comprobación, inspección, fiscalización o intervención sobre hechos y deberes legales establecidos a los ciudadanos.',
                  'Cobro persuasivo: Acciones realizadas por la administración en la etapa anterior al proceso de jurisdicción coactiva encaminadas a obtener el pago de obligaciones reconocidas mediante acto administrativo debidamente ejecutoriado.',
                  'Comparendo: Orden de comparecencia que recibe el presunto infractor por parte de la Policía Nacional, para presentarse ante la autoridad correspondiente por la violación de una norma establecida en la Ley 1801 de 2016.',
                  'De oficio: Actuación iniciada por parte de la autoridad competente sin necesidad de queja o requerimiento de un tercero.',
                  'Estrado: Forma de notificar las decisiones dentro de la audiencia pública.',
                  'Medios de prueba: Aquellos que llevan al funcionario a obtener la certeza sobre la realización o no de las conductas investigadas, para llegar a la toma de una decisión en derecho.',
                  'Multa: Imposición del pago de una suma de dinero en moneda colombiana, cuya graduación depende del comportamiento realizado.',
                ],
                generalDispositions: [
                  'Para la aplicación de medidas correctivas en asuntos relativos a infracciones, el recurso de apelación se concederá en el efecto suspensivo.',
                  'Los recursos solo procederán contra las decisiones definitivas de las autoridades de Policía.',
                  'Cumplimiento o ejecución de la orden de Policía o medida correctiva: una vez ejecutoriada la decisión que contenga una orden de Policía o una medida correctiva, esta se cumplirá en un término máximo de cinco (5) días.',
                  'Si el presunto infractor no se presenta a la audiencia sin comprobar la ocurrencia de caso fortuito o fuerza mayor, la autoridad tendrá por ciertos los hechos que dieron lugar al comportamiento contrario a la convivencia y entrará a resolver de fondo.',
                  'Con base en las pruebas allegadas y los informes de las autoridades, salvo que la autoridad de Policía considere indispensable decretar prueba de una prueba adicional.',
                ],
                documents: [],
                formats: [
                  'PM-GJC-FR-04 Citación',
                  'PM-GJC-FR-18 Boletas de Notificación',
                  'PM-GJC-FR-25 Auto',
                ],
                legalRequirements: [
                  'Ley 1801 de 2016, artículos 79 y 80.',
                  'Código Nacional de Policía y Convivencia.',
                ],
                variablesToMeasure: [],
                flowSteps: verbalAbreviadoConvivenciaCiudadanaSteps,
              },
            },
            {
              ...procedure(
                'PM-GJC-CAR-08',
                'Control y Autorización de Rifas, Juegos y Espectáculos',
                'Secretaría de Gobierno y Desarrollo Institucional',
                undefined,
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Control y autorización para la realización de rifas, juegos y espectáculos públicos.',
                scope:
                  'Inicia con la solicitud de autorización para la realización de rifas, juegos y espectáculos públicos y finaliza con la resolución de autorización.',
                definitions: [
                  'Rifa: Modalidad de juego de suerte y azar mediante la cual se sortean premios en especie entre quienes hubieren adquirido o fueren poseedores de una o varias boletas, emitidas en serie continua, distinguidas con un número de no más de cuatro dígitos y puestas en venta en el mercado a precio fijo para una fecha determinada por un operador, previa y debidamente autorizado.',
                  'Rifas menores: Aquellas cuyo plan de premios tiene un valor comercial inferior a doscientos cincuenta (250) salarios mínimos legales mensuales, circulan o se ofrecen al público exclusivamente en el territorio de un municipio o distrito y no son de carácter permanente.',
                  'Espectáculos públicos: Actividades que congregan al público con fines de recreación colectiva, que se llevan a cabo como consecuencia de una invitación pública, general e indiferenciada, donde los asistentes disfrutan y comparten expresiones artísticas, tales como conciertos, recitales, presentaciones de música, obras de teatro, actuaciones de compañías teatrales, stand up comedies, presentaciones circenses, magia e ilusionismo, desfiles de modas, exhibiciones cinematográficas, óperas, operetas o zarzuela, presentaciones humorísticas, danza, ballet y baile.',
                ],
                generalDispositions: [
                  'Rifas de competencia municipal: El Alcalde o quien este delegue será el competente para autorizar exclusivamente las rifas menores dentro de la jurisdicción del Municipio.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [
                  'Decreto 1660 de 1994, artículo 9.',
                  'RCCDB, artículo 128.',
                ],
                variablesToMeasure: [],
                flowSteps: controlAutorizacionRifasJuegosEspectaculosSteps,
              },
            },
            {
              ...procedure(
                'PM-GJC-PVI-09',
                'Proceso Violencia Intrafamiliar',
                'Comisaría de Familia',
                undefined,
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Adelantar el proceso de medida de protección en casos de violencia intrafamiliar, para la garantía de los derechos de los miembros que conforman la unidad doméstica.',
                scope:
                  'Inicia con la presentación de la denuncia y termina con la imposición de la medida de protección.',
                definitions: [
                  'Violencia intrafamiliar: Es aquella que se manifiesta entre cónyuges o compañeros permanentes, ascendientes o descendientes, incluidos hijos adoptivos, y demás personas que integran la unidad doméstica.',
                  'Daño o sufrimiento físico: Consecuencias que provienen de una acción u omisión que afecta la integridad corporal de una persona.',
                  'Daño o sufrimiento psicológico: Consecuencia proveniente de la acción u omisión destinada a afectar acciones, comportamientos, creencias o decisiones de otra persona.',
                  'Daño o sufrimiento sexual: Consecuencias que provienen de acciones que vulneran la libertad e integridad sexual de una persona.',
                  'Medidas de protección: Medidas que adoptan las autoridades competentes de manera inmediata para prevenir, mitigar o detener una situación de riesgo.',
                  'Medidas de sensibilización y prevención: Medidas dirigidas a formular e implementar políticas públicas para reconocer diferencias y desigualdades sociales, biológicas y de género.',
                  'Medidas de atención: Medidas adoptadas para la atención integral de la víctima de manera oportuna y efectiva.',
                ],
                generalDispositions: [
                  'Competencia: Las Comisarías de Familia solo tienen competencia para aplicar medidas que mitiguen situaciones de violencia intrafamiliar cuando exista o haya existido vínculo familiar o unidad doméstica entre las partes.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: procesoViolenciaIntrafamiliarSteps,
              },
            },
            {
              ...procedure(
                'PM-GJC-PRD-10',
                'Restablecimiento de Derechos',
                'Comisaría de Familia',
                undefined,
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Atender y orientar a los niños, niñas, adolescentes y demás miembros del grupo familiar en el ejercicio y restablecimiento de sus derechos.',
                scope:
                  'Inicia con la solicitud de parte o de oficio y finaliza con la resolución o fallo debidamente ejecutoriado, que deberá contener las medidas de restablecimiento de derechos de los niños, niñas y adolescentes.',
                definitions: [
                  'Proceso administrativo de restablecimiento de derechos: Conjunto de actuaciones administrativas que la autoridad competente debe desarrollar para la restauración de la dignidad e integridad de niños, niñas y adolescentes como sujetos de derechos.',
                  'Interés superior: Imperativo que obliga a todas las personas a garantizar la satisfacción integral y simultánea de todos los derechos humanos de niños, niñas y adolescentes.',
                  'Inobservancia del derecho: Incumplimiento, omisión o negación de acceso a un servicio, o de los deberes y responsabilidades ineludibles de autoridades, sociedad y familia.',
                  'Amenaza: Situación de inminente peligro o riesgo para el ejercicio de derechos de niños, niñas o adolescentes.',
                  'Vulneración: Situación de daño, lesión o perjuicio que impide el ejercicio pleno de derechos de niños, niñas y adolescentes.',
                  'Medidas de restablecimiento de derechos: Decisiones de naturaleza administrativa que decreta la autoridad competente para garantizar y restablecer el ejercicio de derechos.',
                  'Estado adoptable: Situación en la cual se declara que un niño, niña o adolescente puede ser adoptado.',
                ],
                generalDispositions: [
                  'Para la realización de este procedimiento se debe tener en cuenta la normatividad legal vigente aplicable para el proceso de restablecimiento de derechos.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: restablecimientoDerechosSteps,
              },
            },
          ]
        },
        {
          id: 'pm-ac', code: 'PM-AC', name: 'Atención al Ciudadano', procedures: [
            {
              ...procedure(
                'PA-AC-PQR-01',
                'Peticiones, Quejas, Reclamos y Sugerencias',
                'Secretaría de Gobierno',
                undefined,
                [
                  'PA-AC-FR-01 Formato PQRS',
                  'PA-AC-FR-02 Encuesta de Satisfacción',
                  'PA-AC-FR-03 Acta Apertura de Buzón de PQRS',
                  'PA-AC-FR-04 Formato de Petición Verbal',
                  'PA-AC-FR-05 Certificación para Derechos de Petición, Quejas, Reclamos y Sugerencias',
                ],
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Ofrecer soluciones y respuestas oportunas a los usuarios que presentan una petición, queja o reclamo.',
                scope:
                  'Este proceso permite corregir situaciones que se pueden presentar en la toma o registro de las lecturas.',
                definitions: [
                  'Peticiones, quejas y reclamos PQRS: Son las actividades básicas del proceso de servicio al cliente, desarrolladas en las oficinas comerciales que responden a las necesidades de los clientes.',
                  'Anónimo: Escrito presentado por un usuario, ciudadano o peticionario que no registra los datos de autoría o identidad personal.',
                  'Consulta: Se refiere a la orientación solicitada por el peticionario o ciudadano a la entidad, sobre diferentes temas propios de la entidad u otra entidad pública o privada.',
                  'Criterios de calidad del servicio: Son aspectos que determinan la calidad en la prestación de los servicios ofrecidos por la entidad. Se definen como oportunidad, pertinencia y otros criterios asociados al servicio.',
                  'Oportunidad: Tiempo que transcurre entre la solicitud del servicio y la prestación del mismo, debe ser adecuado y dentro de los tiempos establecidos para satisfacción del usuario.',
                  'Pertinencia: En el servicio se refiere a que la acción resultante de la petición del usuario sea la necesaria y adecuada para orientar su requerimiento.',
                ],
                generalDispositions: [
                  'Se debe tener en cuenta la toma adecuada de las lecturas.',
                  'En la medida en que el cargue de lectura sea manual en el módulo de facturación, se presenta especial atención a este proceso.',
                ],
                documents: [],
                formats: [
                  'PA-AC-FR-01 Formato PQRS',
                  'PA-AC-FR-02 Encuesta de Satisfacción',
                  'PA-AC-FR-03 Acta Apertura de Buzón de PQRS',
                  'PA-AC-FR-04 Formato de Petición Verbal',
                  'PA-AC-FR-05 Certificación para Derechos de Petición, Quejas, Reclamos y Sugerencias',
                ],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: peticionesQuejasReclamosSugerenciasSteps,
              },
            },
            {
              ...procedure(
                'PA-AC-AP-02',
                'Atención al Público',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Establecer el procedimiento y directrices generales que regirán el procedimiento por medio del cual se prestará atención al público en la Secretaría de Gobierno, de conformidad con lo establecido en las normas que regulan la materia.',
                scope:
                  'El procedimiento inicia con la recepción de solicitudes de los usuarios y finaliza con el registro del requerimiento solicitado.',
                definitions: [
                  'Servicio al Ciudadano: Es el punto principal de interacción virtual entre la comunidad y la Alcaldía Municipal de Gachetá, el cual permite a los ciudadanos radicar y consultar sus requerimientos en línea asociados con el municipio y sus habitantes, al igual que los servicios que presta la entidad.',
                  'La Política de Servicio al Ciudadano se define como una política pública transversal cuyo objetivo general es garantizar el acceso efectivo, oportuno y de calidad de los ciudadanos a sus derechos en todos los escenarios de relacionamiento con el Estado.',
                ],
                generalDispositions: [
                  'La entidad debe garantizar estándares de excelencia en el servicio y facilitar que los ciudadanos accedan a sus derechos cuando consultan información pública.',
                  'La entidad debe garantizar estándares de excelencia cuando hace trámites o accede a la oferta institucional.',
                  'La entidad debe garantizar estándares de excelencia cuando hace denuncias, interpone quejas, reclamos o exige cuentas.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: atencionPublicoSteps,
              },
            },
            {
              ...procedure(
                'PA-AC-RAP-03',
                'Respuesta a Acciones de Tutela, Populares, Cumplimiento y de Grupo',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Establecer el procedimiento y directrices generales que regirán el trámite por medio del cual se atenderán las acciones constitucionales que sean competencia de la Secretaría de Gobierno, de conformidad con lo establecido en la Constitución Política, artículos 86, 87 y 88, Ley 472 de 1998, Ley 393 de 1997 y Decreto 2591 de 1991.',
                scope:
                  'El procedimiento inicia con la recepción de documento y finaliza con la respuesta al despacho judicial.',
                definitions: [
                  'Acción de tutela: Mecanismo establecido en el artículo 86 de la Constitución Política y reglamentado por el Decreto 2591 de 1991, mediante el cual se reclaman derechos constitucionales fundamentales.',
                  'Acción popular: Mecanismo establecido en el artículo 88 de la Constitución Política, reglamentado por la Ley 472 de 1998, por medio del cual se protegen derechos e intereses colectivos.',
                  'Acción de grupo: Acciones interpuestas por un número plural o conjunto de personas que reúnen condiciones uniformes respecto de una misma causa que originó perjuicios individuales.',
                  'Acción de cumplimiento: Mecanismo establecido en el artículo 87 de la Constitución Política, reglamentado por la Ley 393 de 1997, mediante el cual se puede acudir ante autoridad judicial para hacer efectivo el cumplimiento de una ley o acto administrativo.',
                ],
                generalDispositions: [
                  'Se definen las políticas o criterios de desarrollo del procedimiento o documento, que condiciones se deben tener en cuenta antes de iniciar a desarrollar las actividades de gestión del procedimiento.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [
                  'Constitución Política de Colombia, artículos 86, 87 y 88.',
                  'Ley 472 de 1998.',
                  'Ley 393 de 1997.',
                  'Decreto 2591 de 1991.',
                ],
                variablesToMeasure: [],
                flowSteps: respuestaAccionesTutelaPopularesCumplimientoGrupoSteps,
              },
            },
            {
              ...procedure(
                'PA-AC-VUC-04',
                'Ventanilla Única y Correspondencia',
                'Secretaría de Gobierno y Desarrollo Institucional',
                undefined,
                ['PA-AC-FR-06 Planilla para Recuperación de Correspondencia'],
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Atender, recepcionar, radicar, direccionar y distribuir las solicitudes que llegan a la ventanilla única de correspondencia de la Alcaldía de Gachetá y se asientan o externan, dejando registro de la información o documentación despachada y entregada.',
                scope:
                  'Inicia cuando llega la solicitud a la ventanilla única de correspondencia de la Alcaldía de Gachetá y termina cuando se entrega en la dependencia o área a la cual va dirigida.',
                definitions: [
                  'Correspondencia interna: Comunicación que cursa entre las mismas dependencias o servidores de la institución y que corresponden al desarrollo de sus funciones asignadas.',
                  'Comunicaciones oficiales: Comunicaciones recibidas o producidas en desarrollo de las funciones asignadas legalmente a una entidad, independientemente del medio utilizado.',
                  'Comunicaciones oficiales recibidas externas: Comunicaciones que ingresan a través de la ventanilla única de correspondencia, dirigidas a la Alcaldía Municipal de Gachetá, como entidad, y a las personas que prestan sus servicios en la entidad.',
                  'Comunicaciones oficiales enviadas externas: Comunicaciones que se producen en cualquier área o dependencia de la Alcaldía, dirigidas a otras entidades públicas o privadas o a personas naturales o jurídicas.',
                  'Radicación de comunicaciones oficiales: Actividad por medio de la cual las entidades asignan un número consecutivo a las comunicaciones recibidas o producidas, dejando constancia de fecha y hora de recibo o envío.',
                  'Solicitud: Documento en el que se solicita formalmente algo.',
                ],
                generalDispositions: [],
                documents: [],
                formats: ['PA-AC-FR-06 Planilla para Recuperación de Correspondencia'],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: ventanillaUnicaCorrespondenciaSteps,
              },
            },
          ]
        },
        {
          id: 'pm-gpsp', code: 'PM-GPSP', name: 'Gestión Prestación de Servicios Públicos', procedures: [
            {
              ...procedure(
                'PM-GPSP-MP-01',
                'Mantenimiento de Planta',
                'Secretaría de Medio Ambiente y Desarrollo Económico',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Realizar acciones correspondientes a la operación del acueducto y el alcantarillado en el municipio, teniendo en cuenta lo establecido en la normatividad para el manejo de agua potable y el saneamiento básico.',
                scope:
                  'Inicia con la designación del personal e insumos necesarios para la operación de la planta de tratamiento de agua potable y aguas residuales.',
                definitions: [
                  'Planta de Potabilización: Conjunto de obras, equipos y materiales necesarios para efectuar los procesos que permitan cumplir con las normas de calidad del agua potable.',
                ],
                generalDispositions: [
                  'Para el desarrollo de este procedimiento se requiere establecer un programa de mantenimiento preventivo, el cual debe contener los periodos de intervención, personal responsable e insumos necesarios para su cumplimiento.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: mantenimientoPlantaSteps,
              },
            },
            {
              ...procedure(
                'PM-GPSP-MFS-02',
                'Mantenimiento Floculadores y Sedimentadores',
                'Secretaría de Planeación y Seguimiento a la Infraestructura',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Garantizar el correcto funcionamiento de los floculadores mediante un adecuado mantenimiento de estos.',
                scope:
                  'Inicia con el mantenimiento de óptimas condiciones de los tanques floculadores, con el fin de garantizar el correcto funcionamiento de la planta.',
                definitions: [
                  'Floculación: Proceso que hace referencia a la aglutinación de partículas inducida por una agitación lenta de la suspensión coagulada.',
                  'Sedimentación: Proceso en el que se depositan materiales transportados por distintos agentes como producto de la erosión de las rocas o el suelo, en el fondo del tanque.',
                ],
                generalDispositions: [
                  'Este procedimiento se realiza cada quince (15) días con el fin de presentar mejor calidad en la prestación del servicio.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: mantenimientoFloculadoresSedimentadoresSteps,
              },
            },
            {
              ...procedure(
                'PM-GPSP-LF-03',
                'Lavado de Filtros',
                'Secretaría de Planeación y Seguimiento a la Infraestructura',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Garantizar que los filtros funcionen en óptimas condiciones, con el fin de dar continuidad del servicio.',
                scope:
                  'Inicia con la verificación del correcto funcionamiento de los filtros.',
                definitions: [
                  'Lavado de Filtro: Proceso mediante el cual se hace pasar por un filtro agua en dirección contraria a la operación de filtración, expandiendo el lecho y arrastrando los depósitos existentes en él.',
                ],
                generalDispositions: [
                  'El proceso se realiza todos los días, utilizando el agua de los otros módulos de filtración, aprovechando la carga hidráulica.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: lavadoFiltrosSteps,
              },
            },
            {
              ...procedure(
                'PM-GPSP-UN-04',
                'Nuevos Usuarios',
                'Secretaría de Planeación y Seguimiento a la Infraestructura',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Establecer los pasos lógicos a seguir para darle trámite a una solicitud nueva del servicio.',
                scope:
                  'El procedimiento inicia con la presentación de la solicitud verbal o escrita a la Secretaría de Medio Ambiente y Desarrollo Económico, y finaliza con la elaboración del formato de prestación.',
                definitions: [
                  'Servicio Público: Actividades y prestaciones permitidas, reservadas o exigidas a las administraciones públicas por la legislación en cada Estado, y que tienen como finalidad responder a diferentes imperativos del funcionamiento social y, en última instancia, favorecer la realización efectiva de la igualdad y del bienestar social desarrollado por una institución pública o privada con el fin de satisfacer una necesidad social determinada.',
                ],
                generalDispositions: [
                  'Los servicios públicos deben garantizarse según la Ley 142 de 1994.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [
                  'Ley 142 de 1994.',
                ],
                variablesToMeasure: [],
                flowSteps: nuevosUsuariosSteps,
              },
            },
            {
              ...procedure(
                'PM-GPSP-ICD-05',
                'Instalación Conexión Domiciliaria',
                'Secretaría de Medio Ambiente y Desarrollo Económico',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Establecer los pasos lógicos a seguir para darle trámite a una solicitud nueva del servicio.',
                scope:
                  'Inicia con la presentación de la solicitud verbal o escrita ante la Secretaría de Medio Ambiente, que permita vincularse como usuario de los servicios, y finaliza con la elaboración del formato de prestación.',
                definitions: [
                  'Servicio Público: Actividades y prestaciones permitidas, reservadas o exigidas a las administraciones públicas por la legislación en cada Estado, y que tienen como finalidad responder a diferentes imperativos del funcionamiento social y, en última instancia, favorecer la realización efectiva de la igualdad y del bienestar social desarrollado por una institución pública o privada con el fin de satisfacer una necesidad social determinada.',
                ],
                generalDispositions: [
                  'Los servicios públicos deben garantizarse según la Ley 142 de 1994.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [
                  'Ley 142 de 1994.',
                ],
                variablesToMeasure: [],
                flowSteps: instalacionConexionDomiciliariaSteps,
              },
            },
            {
              ...procedure(
                'PM-GPSP-FSP-06',
                'Facturación de Servicios Públicos',
                'Secretaría de Planeación y Seguimiento a la Infraestructura',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Detallar el proceso a seguir por medio del cual se realiza la facturación de los servicios públicos domiciliarios.',
                scope:
                  'El procedimiento inicia con el ingreso al módulo del sistema SINFA y finaliza con la entrega al operador de las facturas para distribuirse puerta a puerta.',
                definitions: [
                  'Backup: Es una copia de los datos originales que se realiza con el fin de disponer de un medio para recuperarlos en caso de su pérdida.',
                ],
                generalDispositions: [
                  'Se debe tener en cuenta la toma adecuada de las lecturas.',
                  'En la medida en que el cargue de lecturas sea manual en el módulo de facturación se presenta especial atención a este proceso.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: facturacionServiciosPublicosSteps,
              },
            },
            {
              ...procedure(
                'PM-GPSP-MF-07',
                'Modificaciones a la Facturación',
                'Secretaría de Planeación y Seguimiento a la Infraestructura',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Detallar el proceso a seguir por medio del cual se realiza la modificación a la facturación de los servicios públicos domiciliarios.',
                scope:
                  'Este proceso inicia por corregir situaciones que se presentan al momento de registrar las lecturas en el aplicativo, una vez se detecta la inconsistencia se procede a aplicar el procedimiento correspondiente.',
                definitions: [
                  'Servicio público: Actividades y prestaciones permitidas, reservadas o exigidas a las administraciones públicas por la legislación en cada Estado, y que tienen como finalidad responder a diferentes imperativos del funcionamiento social y, en última instancia, favorecer la realización efectiva de la igualdad y del bienestar social desarrollado por una institución pública o privada con el fin de satisfacer una necesidad social determinada.',
                ],
                generalDispositions: [
                  'Se debe tener en cuenta la toma adecuada de las lecturas.',
                  'En la medida en que el cargue de lecturas sea manual en el módulo de facturación se presenta especial atención a este proceso.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: modificacionesFacturacionSteps,
              },
            },
            {
              ...procedure(
                'PM-GPSP-RSP-08',
                'Recaudo Servicios Públicos',
                'Secretaría de Planeación y Seguimiento a la Infraestructura',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Registrar en el aplicativo de servicios públicos de una manera razonable el recaudo cumpliendo los principios de contabilidad generalmente aceptados en Colombia.',
                scope:
                  'Este procedimiento permite el proceso de registro de los pagos realizados por los usuarios; sin embargo, estos deben ser reportados a Contabilidad y Presupuesto, haciendo la interfaz automáticamente.',
                definitions: [
                  'Interfaz: En informática se utiliza para nombrar a la conexión física y funcional entre dos sistemas o dispositivos de cualquier tipo, dando una comunicación entre distintos niveles.',
                ],
                generalDispositions: [
                  'Verificar que el proceso de interface desde el aplicativo de servicios públicos corresponda al período contable al cual se está trabajando.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: recaudoServiciosPublicosSteps,
              },
            },
            {
              ...procedure(
                'PM-GPSP-RSSP-09',
                'Reporte Subsidio Servicios Públicos',
                'Secretaría de Planeación y Seguimiento a la Infraestructura',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Presentar de manera lógica y ordenada el procedimiento para la elaboración del reporte de los subsidios públicos domiciliarios.',
                scope:
                  'Inicia con la recepción de la información con el fin de elaborar el reporte de los subsidios públicos a la Secretaría de Hacienda.',
                definitions: [
                  'Subsidio: Es una ayuda que organismos oficiales otorgan a determinados ciudadanos o entidades, principalmente, con el fin de brindar acceso a los bienes y servicios básicos y satisfacer necesidades.',
                ],
                generalDispositions: [
                  'Se debe tener en cuenta la facturación definitiva del período, así como las modificaciones realizadas a la misma.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: reporteSubsidioServiciosPublicosSteps,
              },
            },
            {
              ...procedure(
                'PM-GPSP-AP-10',
                'Acuerdo de Pago',
                'Secretaría de Planeación y Seguimiento a la Infraestructura',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Brindar facilidades de pago de los servicios públicos a los contribuyentes que soliciten este beneficio legal.',
                scope:
                  'Por medio de este procedimiento se presentan los pasos lógicos a seguir para la elaboración de un acuerdo de pago por concepto de servicios públicos armonizado a la normatividad legal vigente establecida para este tema.',
                definitions: [
                  'Acuerdo de pago: Es la facilidad que se otorga a los contribuyentes para pagar en cuotas parciales las deudas que mantengan con la Administración.',
                ],
                generalDispositions: [
                  'Evaluar la aplicación de acuerdos de pago dependiendo el estado de la obligación.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: acuerdoPagoSteps,
              },
            },
          ]
        },
        {
          id: 'pm-gi', code: 'PM-GI', name: 'Gestión de Infraestructura', procedures: [
            {
              ...procedure(
                'PM-GI-OI-05',
                'Obras de Infraestructura',
                'Secretaría de Planeación y Seguimiento a la Infraestructura',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Elaborar los estudios, diseños, construcción y mantenimiento de las obras de infraestructura, que requiere el Municipio acorde con las necesidades de desarrollo físico, optimizando la utilización de los recursos conforme a los planes, programas y proyectos municipales.',
                scope:
                  'Inicia con la elaboración de los estudios de infraestructura física hasta la entrega de las obras a satisfacción de la comunidad de acuerdo a las metas establecidas en los planes de desarrollo.',
                definitions: [
                  'Alcantarillas: Son obras de drenaje, cuya finalidad es evacuar el agua de las cunetas longitudinales de un lado del camino; o bien, lo posibilita alejarlas de ese lado y requiere ser trasladada al lado contrario.',
                  'Área protegida: Área establecida por el Estado para la protección de ecosistemas, especies y bienes ambientales.',
                  'Estudio ambiental: Apartado orientado a la apreciación de los impactos del proyecto sobre el medio ambiente y a la identificación de medidas de manejo.',
                  'Estudio de factibilidad: Etapa en la que se adquieren mayores conocimientos y se reduce la incertidumbre, analizando la alternativa recomendada.',
                  'Estudio legal: Determina la viabilidad jurídica del proyecto a la luz de las normas que lo rigen.',
                  'Estudio técnico: Busca optimizar la utilización de los recursos disponibles para la producción del bien o servicio en cada una de las alternativas propuestas.',
                  'Gaviones: Estructuras construidas a base de malla metálica galvanizada, llenas de piedra, muy resistentes a deslizamientos y erosión.',
                  'Interventoría: Seguimiento técnico que se realiza para asegurar el cumplimiento del contrato.',
                  'Mantenimiento rutinario: Se realiza de manera periódica con el fin de contrarrestar o aminorar el deterioro normal de las obras y mantener las vías con buen nivel de servicio.',
                  'Mantenimiento preventivo: Programa estratégico de conservación vial, proyectado para detener deterioros leves y reducir necesidades futuras de rehabilitación y reconstrucción.',
                  'Obra pública: Trabajos de construcción, adecuación, ampliación o mantenimiento de bienes inmuebles de uso público o al servicio de la comunidad.',
                  'Plan de desarrollo: Instrumento que establece compromisos y metas para orientar la gestión pública.',
                  'Proyecto de ingeniería: Conjunto de documentos técnicos definitivos que determinan las características y dimensiones de una obra.',
                  'Proyecto de inversión pública: Propuesta que genera capacidad productiva o beneficios sociales mediante el uso de recursos públicos.',
                  'Vía urbana: Faja acondicionada para circulación de vehículos y personas dentro del perímetro urbano.',
                ],
                generalDispositions: [
                  'Las obras de infraestructura se establecen en el Plan de Acción de la Anualidad.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: obrasInfraestructuraSteps,
              },
            },
          ]
        },
      ],
    },
    {
      id: 'pa', code: 'PA', name: 'Procesos de Apoyo', type: 'apoyo',
      processes: [
        {
          id: 'pa-gth', code: 'PA-GTH', name: 'Gestión del Talento Humano', procedures: [
            {
              ...procedure(
                'PA-GTH-CS-01',
                'Comisión de Servicios',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Disponer que un funcionario de la Entidad ejerza las funciones propias del empleo en un lugar diferente al de la sede del cargo, cumplir misiones especiales, asistir a conferencias o seminarios o realizar visitas de observación que interesen a la entidad y que se relacionen con la naturaleza del cargo del comisionado.',
                scope:
                  'El procedimiento inicia con la solicitud del interesado ante el señor Alcalde Municipal, con el fin de tramitar la comisión y finaliza con el reintegro del comisionado al finalizar el periodo de la comisión.',
                definitions: [
                  'Comisión de Servicios: Es aquella situación en que el empleado, por disposición de la autoridad competente, ejerce temporalmente las funciones propias de su cargo en lugares diferentes a los de su sede habitual de trabajo, o cuando atiende transitoriamente actividades oficiales distintas de las del cargo que desempeña como titular.',
                ],
                generalDispositions: [
                  'Establecer lo contemplado en la normatividad legal vigente relacionado con la comisión de servicios de personal.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: comisionServiciosSteps,
              },
            },
            {
              ...procedure(
                'PA-GTH-CS-02',
                'Expedición de las Certificaciones Laborales',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Tramitar y dar respuesta oportuna a las solicitudes de expedición de certificación laboral allegadas al responsable de Gestión Humana.',
                scope:
                  'Este procedimiento inicia con la solicitud de un usuario y continúa con la verificación de la información archivada en la hoja de vida del funcionario o exfuncionario, o fuente del caso, finalizando con la entrega a satisfacción de la respuesta, bien sea expidiendo un certificado o una comunicación informando la situación encontrada, en un plazo máximo de quince días.',
                definitions: [
                  'Bono pensional: Título valor que emite la Alcaldía Municipal, previa confirmación de las historias laborales certificadas por las distintas entidades donde ha laborado el tramitador de la pensión y por los fondos de pensiones a donde se han efectuado los aportes correspondientes.',
                  'Certificación laboral: Es un documento que se emite por una entidad y sirve para certificar lo que existió entre una persona con una entidad, especificando tiempo de servicio, salarios devengados y, cuando se requiera, funciones desempeñadas.',
                  'Pensión: Beneficio que tienen derecho los afiliados al sistema de pensiones una vez cumplidos los requisitos exigidos.',
                  'Nómina: Concepto mediante el cual se agrupan los pagos mensuales o quincenales que las empresas o empleadores deben realizar a los trabajadores vinculados mediante contrato de trabajo.',
                  'Soporte: Documento que sirve como testimonio material de un hecho o acto realizado en funciones por instituciones o personas físicas, jurídicas, públicas o privadas.',
                ],
                generalDispositions: [
                  'Serán expedidas a quien las solicite por parte de los funcionarios de la Alcaldía de Gachetá investidos de autoridad o por quienes tengan asignada esta función.',
                  'El interesado presenta estampillas si se requieren para la expedición del certificado.',
                ],
                documents: [],
                formats: [
                  'PA-GTH-FR-01 Certificaciones Laborales Contratistas',
                  'PA-GTH-FR-02 Certificaciones Laborales Funcionarios y Exfuncionarios',
                ],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: certificacionesLaboralesSteps,
              },
            },
            {
              ...procedure(
                'PA-GTH-CV-03',
                'Concesión de Vacaciones',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Reconocer el derecho a los funcionarios de disfrutar de quince días hábiles de descanso remunerado por cada año de servicio, de conformidad con las disposiciones legales vigentes.',
                scope:
                  'Este procedimiento inicia con la radicación de la solicitud en el primer mes del año y finaliza con la verificación de integración a las labores al terminar el periodo vacacional.',
                definitions: [
                  'Vacaciones: Son el descanso de quince días hábiles al que tiene derecho el empleado después de haber laborado durante un año en la respectiva entidad, teniendo en cuenta que cuando se trabaja de lunes a viernes, los días sábados no se cuentan como hábiles para el disfrute.',
                  'Las vacaciones solo se pueden aplazar o acumular por necesidades del servicio, sin que dicha acumulación sobrepase dos años, siempre que obedezca a aplazamiento por necesidades del servicio.',
                ],
                generalDispositions: [
                  'Para el otorgamiento de esta prestación legal se debe considerar el tiempo de servicio y planear el reemplazo por la ausencia del funcionario durante el tiempo de disfrute de sus vacaciones.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: concesionVacacionesSteps,
              },
            },
            {
              ...procedure(
                'PA-GTH-EPIC-04',
                'Elaboración Plan Institucional de Capacitación',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Promover, mantener e incrementar la idoneidad de los empleados y trabajadores del Municipio, mediante el desarrollo de planes, programas y actividades de capacitación.',
                scope:
                  'Este procedimiento inicia con el establecimiento de políticas para la actualización de personal respecto a capacitaciones y finaliza con la ejecución del Plan Institucional de Capacitación.',
                definitions: [
                  'Capacitación: Se entiende por capacitación el conjunto de procesos organizados, relativos tanto a la educación no formal como a la informal, de acuerdo con lo establecido por la ley general de educación, dirigidos a prolongar y complementar la educación inicial mediante la generación de conocimientos, el desarrollo de habilidades y el cambio de actitudes, con el fin de incrementar la capacidad individual y colectiva para contribuir al cumplimiento de la misión institucional, a la mejor prestación de servicios a la comunidad, al eficaz desempeño del cargo y al desarrollo personal integral.',
                ],
                generalDispositions: [
                  'El plan institucional de capacitaciones debe necesariamente estar armonizado al componente presupuestal de la entidad, con el fin de garantizar su desarrollo y cumplimiento.',
                ],
                documents: [],
                formats: [
                  'PA-GTH-FR-05 Evaluación de la Capacitación',
                  'PA-GTH-FR-06 Planilla Asistencia Capacitación',
                  'PA-GTH-FR-07 Detección de Necesidades Capacitación Funciones',
                  'PA-GTH-FR-08 Detección Necesidades Capacitación Dependencia',
                  'PA-GTH-FR-09 Evaluación Capacitación',
                  'PA-GTH-FR-10 Registro de Asistencia Capacitaciones a Instituciones Educativas',
                ],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: planInstitucionalCapacitacionSteps,
              },
            },
            {
              ...procedure(
                'PA-GTH-ED-05',
                'Evaluación del Desempeño',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Realizar evaluación de acuerdo al formato de evaluación de la Comisión Nacional del Servicio Civil CNSC.',
                scope:
                  'El procedimiento inicia con la revisión de la hoja de vida del funcionario a evaluar y finaliza con la posible capacitación al procedimiento correspondiente.',
                definitions: [
                  'Evaluación: Es el proceso mediante el cual se verifican, valoran y califican las realizaciones de una persona y el cumplimiento de los requisitos establecidos, en el ejercicio de las funciones y responsabilidades inherentes a un empleo, como aporte al logro de las metas institucionales y del valor agregado que deben generar las instituciones.',
                ],
                generalDispositions: [
                  'El evaluador debe estar capacitado en el conocimiento y principios de la metodología establecida por la CNSC para el desarrollo del proceso.',
                  'Previamente el jefe inmediato debe concertar objetivos con los funcionarios a evaluar, los cuales van a hacer la base fundamental de los seguimientos y evaluaciones producto del proceso.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: evaluacionDesempenoSteps,
              },
            },
            {
              ...procedure(
                'PA-GTH-LME-06',
                'Licencia de Maternidad o Enfermedad',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Reconocer al funcionario el tiempo para recuperarse en caso de enfermedad o el tiempo de empatía madre-hijo en caso de maternidad.',
                scope:
                  'El procedimiento inicia con la recepción del certificado de la EPS a que se encuentra afiliado el funcionario y finaliza con los trámites para la declaración de invalidez del mismo.',
                definitions: [
                  'Licencia de maternidad: Es el derecho de toda trabajadora en estado de embarazo, que consiste en el descanso de dieciocho semanas remuneradas.',
                  'Licencia de enfermedad: Corresponde al tiempo otorgado por la EPS cuando el funcionario se encuentra incapacitado para desempeñar sus funciones.',
                ],
                generalDispositions: [
                  'Se debe tener especial atención en los pagos de seguridad social de los funcionarios por parte de la Secretaría de Hacienda Municipal, requisito indispensable para que la entidad pueda recuperar los recursos por conceptos de licencia.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: licenciaMaternidadEnfermedadSteps,
              },
            },
            {
              ...procedure(
                'PA-GTH-LFD-07',
                'Licencia Ordinaria para Funcionarios Diferentes al Alcalde',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Garantizar a los funcionarios el derecho de ausentarse del trabajo hasta por sesenta días al año, prorrogables treinta días más, cuando medie justa causa, sin percibir salario correspondiente durante este periodo.',
                scope:
                  'El procedimiento inicia con la solicitud de licencia dirigida al Alcalde y finaliza con la verificación de la integración del funcionario a sus labores.',
                definitions: [
                  'Licencia ordinaria: Los empleados tienen derecho a licencias renunciables sin sueldo hasta por sesenta días al año, continuos o divididos. Si concurre justa causa, a juicio de la autoridad nominadora, la licencia puede prorrogarse hasta por treinta días más.',
                ],
                generalDispositions: [
                  'Para la realización de este procedimiento el funcionario interesado debe realizar una solicitud expresa, justificada y debidamente motivada con el fin de proceder a su análisis por parte del jefe inmediato.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: licenciaOrdinariaFuncionariosSteps,
              },
            },
            {
              ...procedure(
                'PA-GTH-NO-08',
                'Nombramiento Ordinario',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Proveer empleos públicos de libre nombramiento y remoción con vacancia definitiva.',
                scope:
                  'El procedimiento inicia con la verificación de las vacancias que se puedan nombrar por libre nombramiento y remoción, y finaliza con la verificación del cumplimiento de los requisitos establecidos en la normatividad vigente.',
                definitions: [
                  'Nombramiento ordinario: Se utiliza para proveer un empleo de libre nombramiento y remoción.',
                  'Nombramiento provisional: Se utiliza para proveer transitoriamente empleos de carrera mientras se surte el proceso de selección correspondiente.',
                ],
                generalDispositions: [
                  'Para realizar este procedimiento se debe tener en cuenta que el cargo se encuentre disponible en la planta de personal de la entidad, así como los requisitos que deben cumplirse para proveer dicho cargo.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: nombramientoOrdinarioSteps,
              },
            },
            {
              ...procedure(
                'PA-GTH-RE-09',
                'Realización de Encargos',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Proveer temporalmente vacante definitiva o temporal con un funcionario vinculado a la entidad como titular de otro empleo.',
                scope:
                  'Inicia con la solicitud de licencia al señor Alcalde y finaliza con la verificación del funcionario para retomar las funciones del cargo, una vez vencido el término del encargo.',
                definitions: [
                  'Encargo laboral: Situación administrativa en la que se designa temporalmente a un servidor para asumir total o parcialmente las funciones de otro empleo vacante, conservando los derechos propios de su cargo.',
                ],
                generalDispositions: [
                  'Para realizar este procedimiento se debe tener en cuenta que el cargo se encuentre disponible en la planta de personal de la entidad, así como los requisitos que deben cumplirse para proveer dicho cargo.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: realizacionEncargosSteps,
              },
            },
            {
              ...procedure(
                'PA-GTH-RT-10',
                'Realización de Traslados',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Suplir vacantes definitivas de la planta de funcionarios de la entidad.',
                scope:
                  'El procedimiento inicia con la detección de posibles rotaciones de personal y finaliza con la inducción en el cargo al funcionario trasladado.',
                definitions: [
                  'Control interno: Sistema integrado por planes, métodos, principios, normas, procedimientos y mecanismos de verificación y evaluación adoptados por una entidad, orientados a que todas sus actividades se realicen de acuerdo con las normas constitucionales y legales vigentes.',
                ],
                generalDispositions: [
                  'Para realizar este procedimiento se debe tener en cuenta que el cargo se encuentre disponible en la planta de personal de la entidad, así como los requisitos que deben cumplirse para proveer dicho cargo.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: realizacionTrasladosSteps,
              },
            },
            {
              ...procedure(
                'PA-GTH-RSE-11',
                'Retiro del Servicio de Empleados Públicos',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Protocolizar el retiro del servicio de empleados públicos de libre nombramiento y remoción, teniendo en cuenta las causales establecidas en las normas legales vigentes sobre la materia.',
                scope:
                  'El procedimiento inicia con la determinación de las causales de retiro del servicio y finaliza con la desafiliación de salud.',
                definitions: [
                  'Abandono del cargo: Abandono del cargo debidamente comprobado. Es una de las formas de cesación de funciones o retiro del servicio y puede ser objeto de sanción cuando se dan los supuestos para que se produzca la falta gravísima.',
                ],
                generalDispositions: [
                  'El acto administrativo por medio del cual se retira un empleado del servicio debe estar debidamente justificado y motivado por las razones expuestas en la ley.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: retiroServicioEmpleadosPublicosSteps,
              },
            },
            {
              ...procedure(
                'PA-GTH-PE-12',
                'Plan de Estímulos',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Establecer las actividades para la formulación, ejecución y evaluación de los programas del Plan Institucional de Estímulos, Bienestar e Incentivos, de la Administración Central del Municipio de Gachetá.',
                scope:
                  'El procedimiento inicia con la identificación de necesidades de bienestar e incentivos, continúa con la definición de programas y actividades a desarrollar y culmina con la ejecución y evaluación del plan.',
                definitions: [
                  'Sistema de Estímulos para Empleados del Estado: Conjunto interrelacionado y coherente de políticas, planes, entidades, disposiciones legales y programas de bienestar e incentivos que interactúan para elevar los niveles de eficiencia, satisfacción, desarrollo y bienestar de los empleados del Estado.',
                ],
                generalDispositions: [
                  'Tiene por objeto otorgar reconocimientos por el buen desempeño, propiciando una cultura de trabajo orientada a la calidad y productividad.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: planEstimulosSteps,
              },
            },
            {
              ...procedure(
                'PA-GTH-MSA-13',
                'Manual de Situaciones Administrativas',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
            },
            {
              ...procedure(
                'PA-GTH-RC-14',
                'Retiro de Cesantías',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Dar trámite a las solicitudes que presenten los funcionarios del sector central dirigidas al retiro de las cesantías del régimen retroactivo y anualizado.',
                scope:
                  'Inicia con la revisión de la documentación requerida para el trámite de retiro de cesantías, mediante acto administrativo para los de régimen retroactivo y carta de autorización para los de régimen anualizado, terminando con el archivo de la documentación en el expediente.',
                definitions: [
                  'Cesantía: Prestación social que está obligado a pagar el empleador a sus trabajadores, equivalente a un mes de salario por cada año de servicios y proporcionalmente por fracción de año.',
                ],
                generalDispositions: [
                  'Se liquidan anualmente al 31 de diciembre y se consignan en un fondo de cesantías antes del 15 de febrero del siguiente año.',
                  'El trabajador tiene derecho a elegir antes del 31 de diciembre el fondo de cesantías correspondiente.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: retiroCesantiasSteps,
              },
            },
            {
              ...procedure(
                'PA-GTH-IR-15',
                'Inducción y Reinducción',
                'Secretaría de Gobierno',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Establecer directrices, políticas, requerimientos y pasos a cumplir para la realización de la inducción, entrenamiento, reinducción al igual que por capacitación que le complementen los conocimientos y competencias de los funcionarios de la Alcaldía Municipal de Gachetá.',
                scope:
                  'El procedimiento inicia con la determinación de una causal de retiro del servicio y finaliza con la introducción de la novedad de nómina para el respectivo mes, tramitando la desafiliación de salud.',
                definitions: [
                  'DAFP: Departamento Administrativo de la Función Pública.',
                  'PIC: Plan Institucional de Capacitación.',
                  'STTH: Subdirección Técnica de Recursos Humanos.',
                  'Inducción: Proceso dirigido a iniciar al empleado en su integración a la cultura organizacional.',
                  'Reinducción: Proceso orientado a reorientar la integración del empleado a la cultura organizacional por cambios producidos en la entidad.',
                ],
                generalDispositions: [
                  'El programa de inducción y reinducción debe estar contenido en el Plan Institucional de Capacitación de cada vigencia.',
                  'Se debe realizar a los funcionarios que entran a la entidad en carrera administrativa, provisionalidad y libre nombramiento.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: induccionReinduccionSteps,
              },
            },
          ]
        },
        {
          id: 'pa-gj', code: 'PA-GJ', name: 'Gestión Jurídica', procedures: [
            {
              ...procedure(
                'PA-GJ-CARV-01',
                'Conciliación-Fijación Custodia, Cuota Alimentaria y Régimen de Visitas',
                'Comisaría de Familia',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Gestionar jurídicamente y asesorar el proceso de conciliación, fijación de custodia, cuota alimentaria y régimen de visitas.',
                scope:
                  'Inicia desde el establecimiento de la solicitud ante la Comisaría de Familia y finaliza con la suscripción del acta de conciliación de partes.',
                definitions: [
                  'Cuota alimentaria: Tiene como objeto garantizar el derecho a los alimentos de los niños, niñas y adolescentes.',
                  'Defensor de Familia y Comisario de Familia aplican criterios de equidad y justicia para que no se vean afectados los intereses del alimentante ni de quien recibe los alimentos.',
                ],
                generalDispositions: [
                  'Para la realización de este procedimiento se debe tener en cuenta la normatividad legal vigente aplicable para conciliación, fijación de custodia, cuota alimentaria y régimen de visitas.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: conciliacionCustodiaCuotaVisitasSteps,
              },
            },
            {
              ...procedure(
                'PA-GJ-MP-02',
                'Medidas de Protección',
                'Comisaría de Familia',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Asesorar jurídicamente el proceso a seguir para realizar una medida de protección en los casos de violencia.',
                scope:
                  'El procedimiento inicia desde el recuento de los hechos por parte del usuario y finaliza con la resolución proferida.',
                definitions: [
                  'Violencia intrafamiliar: Las definiciones de ambos conceptos, familia y violencia, permiten acercarse a la noción de violencia intrafamiliar, que es el ejercicio de la violencia en el seno de una familia.',
                  'Violencia intrafamiliar también puede entenderse como toda acción u omisión que un integrante de una familia ejerce contra otro integrante y que produce un daño físico o psíquico.',
                ],
                generalDispositions: [
                  'Para la realización de este procedimiento se debe tener en cuenta la normatividad legal vigente aplicable para el proceso de medida de protección en los casos de violencia.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [
                  'Ley 575 de 2000.',
                  'Ley 1257 de 2008.',
                  'Artículo 12 de la Ley 294 de 1996.',
                  'Artículo 17 de la Ley 575 de 2000.',
                  'Artículo 7 de la Ley 1257 de 2008.',
                ],
                variablesToMeasure: [],
                flowSteps: medidasProteccionSteps,
              },
            },
            {
              ...procedure(
                'PA-GJ-RDD-03',
                'Restablecimiento de los Derechos',
                'Comisaría de Familia',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Aplicar la Ley 1098 de 2006, Código de la Infancia y la Adolescencia, en cumplimiento del restablecimiento de derechos PARD, para que la Inspección de Policía cumpla con las funciones que correspondan al comisario de familia o, en ausencia de este, al defensor de familia.',
                scope:
                  'El procedimiento inicia con la recepción de la denuncia de vulneración de derechos y finaliza con la verificación del restablecimiento de los derechos y cierre del PARD, enviándose a archivo.',
                definitions: [
                  'Proceso Administrativo de Restablecimiento de Derechos PARD: Es la restauración de la dignidad e integridad como sujetos y de la capacidad para hacer un ejercicio efectivo de los derechos que le han sido vulnerados.',
                  'Responsabilidad del Estado: A través de sus autoridades debe informar, oficiar o conducir ante la Policía, defensorías de familia, comisarías de familia o, en su defecto, ante inspectores de policía, las personas implicadas o distraídas, y todos los niños, niñas y adolescentes que se encuentren en condiciones de riesgo o vulnerabilidad.',
                ],
                generalDispositions: [
                  'Para la realización de este procedimiento se debe tener en cuenta la normatividad legal vigente aplicable para el proceso de restablecimiento de derechos.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [
                  'Ley 1098 de 2006.',
                  'Ley 1878 de 2018.',
                ],
                variablesToMeasure: [],
                flowSteps: restablecimientoDerechosRddSteps,
              },
            },
            {
              ...procedure(
                'PA-GJ-EAA-04',
                'Elaboración Actos Administrativos',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Establecer los lineamientos generales para el trámite de emisión de los actos administrativos proferidos por el Municipio de Gachetá.',
                scope:
                  'Los lineamientos generales de este procedimiento aplican a todos los actos administrativos emitidos por el Municipio de Gachetá. Inicia con la elaboración del acto administrativo y termina con la notificación, comunicación o publicación del mismo.',
                definitions: [
                  'Acto administrativo: Manifestación de la voluntad de la administración, tendiente a producir efectos jurídicos, ya sea creando, modificando o extinguiendo derechos para los administrados o en contra de estos.',
                  'Acto con presupuesto esencial: Acto sujeto al orden jurídico y al respeto por las garantías y derechos de los administrados.',
                ],
                generalDispositions: [
                  'Cuando aplique, el acto administrativo deberá informar si contra este proceden los recursos de ley.',
                  'Por regla general, contra los actos definitivos procederá el recurso de reposición, ante quien expidió la decisión, para que la aclare, modifique, adicione o revoque.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [
                  'Código de Procedimiento Administrativo y de lo Contencioso Administrativo.',
                ],
                variablesToMeasure: [],
                flowSteps: elaboracionActosAdministrativosSteps,
              },
            },
            {
              ...procedure(
                'PA-GJ-EVCJ-05',
                'Emisión y Viabilización de Conceptos Jurídicos',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Prestar el servicio de asesoría jurídica a las diferentes dependencias de la Alcaldía que así lo requieran, garantizando seguridad y certeza jurídica.',
                scope:
                  'El procedimiento inicia con la solicitud de la elaboración de concepto y finaliza con la entrega a la Secretaría de Gobierno para archivar.',
                definitions: [
                  'Concepto: Se trata de un pensamiento jurídico que es expresado mediante palabras y ajustado a la normatividad legal vigente.',
                ],
                generalDispositions: [
                  'Para la realización de este procedimiento se requiere de un alto nivel de experiencia y componente técnico, especializado a la gestión pública municipal.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: emisionConceptosJuridicosSteps,
              },
            },
            {
              ...procedure(
                'PA-GJ-AD-06',
                'Amparo Domicilio',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
            },
            {
              ...procedure(
                'PA-GJ-AL-07',
                'Tutela',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
            },
            {
              ...procedure(
                'PA-GJ-EGMG-08',
                'Expedición Guías de Movilización de Ganado',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
            },
            {
              ...procedure(
                'PA-GJ-RBUP-09',
                'Restitución del Bien de Uso Público',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
            },
          ]
        },
        {
          id: 'pa-gc', code: 'PA-GC', name: 'Gestión Contractual', procedures: [
            {
              ...procedure(
                'PA-GC-LP-01',
                'Licitación Pública',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Establecer la metodología prevista en la ley para la gestión contractual, con el fin de dirigir la celebración de licitaciones del Municipio de Gachetá y asegurar eficiencia, eficacia y transparencia en los procesos de contratación.',
                scope:
                  'Inicia con la elaboración de los estudios y documentos previos y termina con la ejecución del procedimiento de supervisión e interventoría.',
                definitions: [
                  'Licitación pública: Proceso de contratación general que tiene como finalidad obtener la oferta más beneficiosa para la Alcaldía Municipal.',
                  'Contratista: Persona natural o jurídica que se obliga a una determinada prestación.',
                  'Gestión contractual: Conjunto de actividades de planeación, coordinación, organización, control, ejecución y supervisión de los procesos de contratación.',
                ],
                generalDispositions: [
                  'La licitación pública es la regla general de la contratación y las demás modalidades constituyen la excepción.',
                  'Se utiliza cuando el objeto del contrato sea complejo o de mayor cuantía, cuando el contrato sea de obra y de mayor cuantía, o cuando el objeto contractual incluya consultoría, obra u otras prestaciones según corresponda.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [
                  'Ley 1150 de 2007.',
                  'Decreto 1082 de 2015.',
                ],
                variablesToMeasure: [],
                flowSteps: licitacionPublicaSteps,
              },
            },
            {
              ...procedure(
                'PA-GC-CD-02',
                'Contratación Directa',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Establecer la metodología prevista en la ley para la gestión contractual por parte de los diferentes actores de la administración municipal.',
                scope:
                  'El procedimiento inicia con la elaboración de estudios previos y termina con la suscripción del contrato y el cumplimiento de los requisitos de ejecución.',
                definitions: [
                  'Contratista: Persona natural o jurídica que se obliga a una prestación contractual.',
                  'Acta de inicio: Documento en el cual se deja constancia del inicio de la ejecución del objeto contratado.',
                  'Registro Presupuestal: Documento que certifica la operación mediante la cual se afecta de forma definitiva la apropiación presupuestal.',
                ],
                generalDispositions: [
                  'Los bienes o servicios que se deban adquirir mediante contratación directa deben estar incluidos en el Plan Anual de Adquisiciones de la respectiva vigencia.',
                  'El funcionario designado del área de origen deberá elaborar el documento de estudios previos con los requisitos contemplados en el Decreto 1082 de 2015.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [
                  'Decreto 1082 de 2015.',
                  'Ley 1474 de 2011.',
                ],
                variablesToMeasure: [],
                flowSteps: contratacionDirectaSteps,
              },
            },
            {
              ...procedure(
                'PA-GC-CM-03',
                'Concurso de Méritos',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Establecer la metodología prevista en la ley para la gestión contractual municipal y asegurar eficiencia, eficacia y transparencia en los procesos que adelanten las dependencias.',
                scope:
                  'Inicia con la identificación de la necesidad y finaliza con la liquidación del contrato por mutuo acuerdo.',
                definitions: [
                  'Concurso de méritos: Modalidad de selección utilizada para contratar consultorías, estudios, diseños, interventorías y otros servicios especializados.',
                  'Contratista: Persona natural o jurídica que se obliga a una prestación contractual.',
                  'Informe de evaluación: Documento donde se consolida la evaluación de las propuestas presentadas.',
                ],
                generalDispositions: [
                  'Aplica para contratos de consultoría y demás objetos contractuales que requieran evaluación técnica especializada.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [
                  'Ley 1150 de 2007.',
                  'Decreto 1082 de 2015.',
                ],
                variablesToMeasure: [],
                flowSteps: concursoMeritosSteps,
              },
            },
            {
              ...procedure(
                'PA-GC-SA-04',
                'Selección Abreviada',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Establecer la metodología prevista en la ley para la gestión contractual municipal, bajo la modalidad de selección abreviada.',
                scope:
                  'Inicia con la identificación de la necesidad y finaliza con la liquidación del contrato por mutuo acuerdo.',
                definitions: [
                  'Selección abreviada: Modalidad de contratación aplicable a objetos contractuales definidos por la ley, según sus características y cuantía.',
                  'Contrato: Acuerdo celebrado entre la entidad y el proponente favorecido.',
                ],
                generalDispositions: [
                  'Aplica en los eventos definidos por la normativa contractual para selección abreviada.',
                  'Debe garantizarse la publicidad, la transparencia, la igualdad de oferentes y la correcta evaluación de las propuestas.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [
                  'Ley 1150 de 2007.',
                  'Decreto 1082 de 2015.',
                ],
                variablesToMeasure: [],
                flowSteps: seleccionAbreviadaSteps,
              },
            },
            {
              ...procedure(
                'PA-GC-MC-05',
                'Mínima Cuantía',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Establecer la metodología prevista en la ley para la gestión contractual de mínima cuantía, garantizando eficiencia y transparencia en el proceso.',
                scope:
                  'Inicia con la identificación de la necesidad y finaliza con la liquidación del contrato por mutuo acuerdo.',
                definitions: [
                  'Mínima cuantía: Modalidad aplicable cuando el valor de la adquisición no excede el porcentaje definido legalmente para la menor cuantía de la entidad.',
                  'Invitación pública: Documento mediante el cual se convoca a los interesados a presentar oferta.',
                ],
                generalDispositions: [
                  'Será procedente contratar por mínima cuantía cuando el valor de la adquisición de bienes, servicios u obras sea igual o inferior al porcentaje establecido legalmente.',
                  'Las reglas del procedimiento bajo mínima cuantía se regulan conforme a la normatividad contractual vigente.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [
                  'Ley 1474 de 2011.',
                  'Decreto 1082 de 2015.',
                ],
                variablesToMeasure: [],
                flowSteps: minimaCuantiaSteps,
              },
            },
            {
              ...procedure(
                'PA-GC-PA-06',
                'Plan de Adquisiciones',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
            },
            {
              ...procedure(
                'PA-GC-RCC-07',
                'Revisión Cuentas de Cobro',
                'Alcaldía Municipal',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Dar a conocer el trámite y documentación necesaria para el proceso de pago de las cuentas presentadas virtualmente por los contratistas vinculados a la Alcaldía Municipal de Gachetá.',
                scope:
                  'Este procedimiento aplica para la recepción, causación de facturas, cuentas de cobro o documento equivalente y generación de órdenes de pago.',
                definitions: [
                  'SIAFI: Sistema de Información Administrativa y Financiera.',
                  'SAF: Subdirección Administrativa y Financiera.',
                ],
                generalDispositions: [
                  'Para el recibo de facturas o cuentas de cobro se deben tener los documentos completos.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: revisionCuentasCobroContractualSteps,
              },
            },
            {
              ...procedure(
                'PA-GC-EP-08',
                'Estudio Previo',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Documentar la elaboración de los estudios y documentos previos por cada dependencia, de acuerdo con lo establecido en el Estatuto General de la Contratación Pública y sus decretos reglamentarios.',
                scope:
                  'El procedimiento inicia con la identificación de necesidades y finaliza con el cargue de documentos en el SECOP.',
                definitions: [
                  'Contrato: Acuerdo de voluntades entre dos o más personas con el objeto de crear obligaciones.',
                  'Certificado de disponibilidad presupuestal CDP: Documento que garantiza la existencia de apropiación presupuestal disponible.',
                  'Estudios y documentos previos: Documentos que sirven de soporte para la elaboración del contrato.',
                ],
                generalDispositions: [
                  'El Estado, al contratar bienes y servicios, debe garantizar el cumplimiento de los fines institucionales e invertir recursos públicos de manera adecuada.',
                  'El bien o servicio debe estar incluido en el Plan Anual de Adquisiciones.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [
                  'Estatuto General de Contratación Pública.',
                  'Decreto 1082 de 2015.',
                ],
                variablesToMeasure: [],
                flowSteps: estudioPrevioSteps,
              },
            },
            {
              ...procedure(
                'PA-GC-SI-09',
                'Selección Abreviada por Subasta Inversa',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Establecer la metodología prevista en la ley para la gestión contractual mediante selección abreviada por subasta inversa.',
                scope:
                  'Inicia con la identificación de la necesidad y finaliza con la liquidación del contrato por mutuo acuerdo.',
                definitions: [
                  'Subasta inversa: Procedimiento de selección en el que los oferentes compiten mediante la disminución sucesiva de precios o mejora de condiciones económicas.',
                  'Contrato: Acuerdo celebrado entre la Alcaldía Municipal y el proponente favorecido.',
                ],
                generalDispositions: [
                  'Aplica para la contratación de bienes y servicios de características técnicas uniformes y de común utilización.',
                  'Debe realizarse conforme a las reglas de publicidad, selección objetiva y transparencia contractual.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [
                  'Ley 1150 de 2007.',
                  'Decreto 1082 de 2015.',
                ],
                variablesToMeasure: [],
                flowSteps: subastaInversaSteps,
              },
            },
            {
              ...procedure(
                'PA-GC-PCC-10',
                'Presentación de Cuentas de Cobro',
                'Alcaldía Municipal',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Establecer los parámetros para la elaboración de los documentos adjuntos a las cuentas de cobro de los contratos celebrados por la Administración Municipal.',
                scope:
                  'Este procedimiento aplica para la elaboración y entrega de cuentas de cobro.',
                definitions: [
                  'Contrato: Acto jurídico generador de obligaciones entre las partes.',
                  'Acta de inicio: Documento en el cual se deja constancia del inicio de ejecución contractual.',
                  'Planilla y soporte de pago de seguridad social: Documento requerido para acreditar el cumplimiento de aportes.',
                ],
                generalDispositions: [
                  'Es necesario seguir los lineamientos que presenta cada dependencia con el fin de presentar la menor cantidad de errores posibles.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: presentacionCuentasCobroSteps,
              },
            },
          ]
        },
        {
          id: 'pa-gd', code: 'PA-GD', name: 'Gestión Documental', procedures: [
            {
              ...procedure(
                'PA-GD-OAG-01',
                'Organización Archivos de Gestión',
                'Secretaría de Gobierno',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Definir las actividades que deben realizar los servidores públicos y contratistas en la Administración de la Alcaldía Municipal de Gachetá para organizar el archivo de gestión bajo su responsabilidad, aplicando las Tablas de Retención Documental.',
                scope:
                  'El procedimiento inicia con la clasificación de documentos conforme a lo establecido en las Tablas de Retención Documental y finaliza con el diligenciamiento del Formato Único de Inventario Documental.',
                definitions: [
                  'Archivo: Conjunto de documentos acumulados en un proceso natural por una persona o entidad pública o privada.',
                  'Archivo de gestión: Archivo de la oficina productora que reúne la documentación en trámite y consulta permanente.',
                  'Tabla de Retención Documental TRD: Listado de series y subseries documentales con sus tiempos de permanencia y disposición final.',
                  'Foliación: Acción de numerar hojas de documentos registrados.',
                ],
                generalDispositions: [
                  'Los documentos de los archivos de gestión son parte integral del patrimonio documental de la Alcaldía Municipal de Gachetá.',
                  'Los servidores públicos y contratistas responsables deben organizar y mantener en buen estado los documentos aplicando las Tablas de Retención Documental.',
                ],
                documents: [],
                formats: ['Formato Único de Inventario Documental'],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: organizacionArchivosGestionSteps,
              },
            },
            {
              ...procedure(
                'PA-GD-OAC-02',
                'Organización Archivo Central',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Definir las actividades que deben realizar los servidores públicos y contratistas para organizar el archivo de gestión bajo su responsabilidad y aplicar las Tablas de Retención Documental.',
                scope:
                  'El procedimiento inicia con la clasificación de documentos según la TRD y finaliza con el diligenciamiento del Formato Único de Inventario Documental.',
                definitions: [
                  'Archivo central: Archivo que agrupa documentos transferidos por los archivos de gestión de la entidad.',
                  'Archivo de gestión: Documentación sometida a continua utilización y consulta administrativa por las oficinas productoras.',
                  'Organización documental: Proceso archivístico orientado a la clasificación, ordenación y descripción de documentos.',
                  'Inventario único de documentos: Relación de expedientes que se entregan con datos de identificación y contenido.',
                ],
                generalDispositions: [
                  'Los documentos de los archivos de gestión son parte integral del patrimonio documental de la Alcaldía Municipal de Gachetá.',
                  'Los responsables de su manejo deben aplicar las Tablas de Retención Documental para conservarlos y organizarlos correctamente.',
                ],
                documents: [],
                formats: ['Formato Único de Inventario Documental'],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: organizacionArchivoCentralSteps,
              },
            },
            {
              ...procedure(
                'PA-GD-CPD-03',
                'Consulta y Préstamo de Documentos',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Establecer la metodología necesaria para la consulta y préstamo de documentos en el Archivo Central de la Alcaldía Municipal de Gachetá.',
                scope:
                  'Inicia con la solicitud de consulta o préstamo de documentos por parte de las secretarías u oficinas de la Alcaldía Municipal de Gachetá o comunidad, y termina con la devolución y ubicación de los documentos al Archivo Central.',
                definitions: [
                  'Archivo: Conjunto de documentos acumulados por una persona o entidad en desarrollo de sus funciones.',
                  'Archivo de gestión: Documentación sometida a continua utilización y consulta administrativa.',
                  'Archivo central: Archivo donde se agrupan documentos transferidos por los archivos de gestión.',
                  'Consulta de documentos: Derecho de acceso a documentos por parte de usuarios autorizados.',
                  'Reprografía: Reproducción de documentos por medios físicos o digitales.',
                ],
                generalDispositions: [
                  'Toda consulta debe ser registrada por el funcionario encargado del Archivo Central del Municipio de Gachetá.',
                  'No se permite el acceso directo a los documentos al personal ajeno al Archivo de Gestión, Central, sin autorización.',
                  'El préstamo de documentos es temporal y la dependencia solicitante debe reintegrarlos al Archivo Central en el plazo definido.',
                ],
                documents: [],
                formats: ['Formato de Solicitud de Documentos'],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: consultaPrestamoDocumentosSteps,
              },
            },
            {
              ...procedure(
                'PA-GD-TD-04',
                'Transferencias Documentales',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Remitir los documentos del archivo de gestión de cada dependencia al Archivo Central de la entidad, de forma histórica y organizada, conforme a los plazos establecidos en las Tablas de Retención Documental.',
                scope:
                  'Inicia con la elaboración del Plan Anual de Transferencias y finaliza con la elaboración del Acta de Transferencia Documental.',
                definitions: [
                  'Transferencia documental: Remisión de documentos del archivo de gestión al archivo central o histórico, de conformidad con las tablas de retención y valoración documental.',
                  'Transferencia primaria: Traslado de documentos del archivo de gestión al central sin alteración de sus propiedades.',
                  'Transferencia secundaria: Traslado de documentos del archivo central al histórico para conservación permanente.',
                  'Tiempo de retención: Ciclo de vida de los documentos en las diferentes fases del archivo.',
                ],
                generalDispositions: [
                  'La Oficina de Archivo Central brinda asesoría para la organización de los archivos de gestión en las dependencias que lo soliciten.',
                  'Las transferencias documentales se deben realizar conforme a los lineamientos de la Ley de Archivo Central.',
                ],
                documents: [],
                formats: ['Acta de Transferencia Documental'],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: transferenciasDocumentalesSteps,
              },
            },
            {
              ...procedure(
                'PA-GD-ED-05',
                'Eliminación Documental',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Definir los lineamientos para aplicar la eliminación técnicamente de los documentos de la Alcaldía Municipal de Gachetá, según lo indicado en las Tablas de Retención Documental o Tablas de Valoración Documental.',
                scope:
                  'El procedimiento inicia con la aplicación a los documentos del Archivo Central o de las oficinas productoras que deben ser eliminados y finaliza con la destrucción del archivo.',
                definitions: [
                  'Depuración documental: Fase del proceso de organización documental en la que se retiran documentos sin valores primarios ni secundarios.',
                  'Disposición final de documentos: Decisión resultante de la valoración documental.',
                  'Eliminación documental: Procedimiento mediante el cual se destruyen documentos que han perdido su valor administrativo, legal, fiscal o histórico.',
                ],
                generalDispositions: [
                  'Toda documentación que se requiera y pueda eliminar debe solicitarse al Comité de Archivo.',
                  'Ninguna serie o subserie documental podrá destruirse sin estar previamente registrada en la Tabla de Retención Documental o en las Tablas de Valoración Documental.',
                  'Toda destrucción documental debe realizarse utilizando técnica de picado de papel con el fin de preservar el medio ambiente.',
                ],
                documents: [],
                formats: ['Inventario de documentos a eliminar', 'Acta de Comité de Archivo'],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: eliminacionDocumentalSteps,
              },
            },
            {
              ...procedure(
                'PA-GD-TRD-06',
                'Actualización de Tablas de Retención Documental',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Establecer las actividades necesarias para la actualización de las Tablas de Retención Documental de las secretarías u oficinas de la Alcaldía Municipal de Gachetá.',
                scope:
                  'El procedimiento inicia con las solicitudes de modificación realizadas por las secretarías u oficinas al Archivo Central y finaliza con la actualización de las Tablas de Retención Documental de las dependencias.',
                definitions: [
                  'Archivo: Conjunto de documentos acumulados en el desarrollo de funciones.',
                  'Tabla de Retención Documental TRD: Listado de series y subseries documentales con tiempos de permanencia y disposición final.',
                  'Valor primario: Cualidad inmediata que adquieren los documentos mientras cumplen fines administrativos, fiscales, legales o contables.',
                  'Valor permanente o secundario: Cualidad atribuida a documentos que deben conservarse por su importancia histórica, científica o cultural.',
                ],
                generalDispositions: [
                  'Los documentos de los archivos de gestión son parte integral del patrimonio documental de la Alcaldía Municipal de Gachetá.',
                  'Las secretarías u oficinas deben solicitar las modificaciones de las Tablas de Retención Documental por medio de oficio al Archivo Central.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: actualizacionTablasRetencionSteps,
              },
            },
          ]
        },
        {
          id: 'pa-ga', code: 'PA-GA', name: 'Gestión Administrativa', procedures: [
            {
              ...procedure(
                'PA-GA-GV-01',
                'Gestión de Viáticos',
                'Secretaría de Gobierno y Desarrollo Institucional',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Establecer el procedimiento y directrices generales que regirán el trámite por medio del cual se gestionarán los viáticos que deban ser concedidos al señor Alcalde Municipal.',
                scope:
                  'El procedimiento inicia con la solicitud a la Secretaría de Gobierno y Desarrollo Institucional para el otorgamiento de viáticos y finaliza con el pago de los viáticos.',
                definitions: [
                  'Viáticos: Conjunto de provisiones o dinero que se le da a una persona, especialmente a un funcionario, para realizar un viaje.',
                ],
                generalDispositions: [
                  'La solicitud de los viáticos del señor alcalde solo puede ser solicitada por la Secretaría de Gobierno y otorgada por resolución expedida por la Secretaría de Gobierno.',
                  'El pago solo puede ser realizado por la Tesorería de la entidad.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: gestionViaticosSteps,
              },
            },
            {
              ...procedure(
                'PA-GA-PA-02',
                'Proyección de Actos Administrativos y Documentos',
                'Secretaría de Gobierno',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Establecer el procedimiento y directrices generales que regirán el trámite por medio del cual se proyectarán los actos administrativos y documentos cuya elaboración sea de competencia de la Secretaría de Gobierno y del señor Alcalde, de conformidad con lo establecido en las normas que regulen el asunto de cada documento a proyectar y elaborar.',
                scope:
                  'El procedimiento inicia con la solicitud de proyección y elaboración de los actos administrativos.',
                definitions: [
                  'Acto administrativo: Acto administrativo se refiere a aquella declaración voluntaria que el Estado o un organismo público realiza en nombre del ejercicio de la función pública.',
                  'Documento: Cualquier documento que deba ser proyectado y elaborado, que no implique la manifestación de la administración, directrices o creación de situaciones generales, concretas o particulares.',
                ],
                generalDispositions: [
                  'El acto administrativo emana de la Administración Pública y sirve de medio o resolución para imponer su voluntad en el ejercicio de una potestad administrativa.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: proyeccionActosAdministrativosSteps,
              },
            },
            {
              ...procedure(
                'PA-GA-RD-03',
                'Revisión de Documentos',
                'Secretaría de Gobierno',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Establecer el procedimiento y directrices generales que regirán el trámite por medio del cual se revisarán los documentos que sean de competencia de la Secretaría de Gobierno y del señor Alcalde, de conformidad con lo establecido en las normas que regulen el asunto de cada documento a revisar.',
                scope:
                  'El procedimiento inicia con la radicación de los actos administrativos que sean objeto de la Secretaría de Gobierno y finaliza con la entrega de documentos firmados por la dependencia de origen.',
                definitions: [
                  'Acto administrativo: Declaración voluntaria que el Estado o un organismo público realiza en ejercicio de la función pública y que genera efectos jurídicos.',
                ],
                generalDispositions: [
                  'La gestión documental es el conjunto de procesos que se enfocan en la revisión, almacenamiento y recuperación de los documentos y de la información de importancia institucional.',
                  'Este procedimiento debe caracterizarse por su practicidad al momento de llevar a cabo la administración de los archivos físicos y electrónicos.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: revisionDocumentosSteps,
              },
            },
            {
              ...procedure(
                'PA-GA-AA-04',
                'Almacén e Inventario',
                'Secretaría de Gobierno',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Establecer las actividades y condiciones para ingresar, administrar, proveer y retirar temporal o definitivamente los bienes devolutivos y de consumo de la Alcaldía Municipal de Gachetá, con base en las disposiciones legales vigentes.',
                scope:
                  'Inicia con la entrada de los bienes devolutivos y de consumo, continúa con la descripción sobre la baja de bienes y sus diferentes disposiciones, y finaliza cuando la entrega de los comprobantes contables es enviada al encargado de almacén.',
                definitions: [
                  'Almacén: Espacio delimitado en donde se guardan elementos, bienes o mercancías de consumo o devolutivos suministrados a las dependencias.',
                  'Almacenamiento: Labor de registro de los artículos y su distribución física desde que ingresan o se adquieren hasta que se requieren para su utilización.',
                  'Bienes de consumo: Elementos que por su naturaleza se consumen con su primer uso.',
                  'Bienes devolutivos: Bienes muebles, inmuebles o intangibles que no se extinguen o consumen de manera inmediata y requieren control administrativo.',
                  'Inventario: Registro permanente y valorizado de los bienes que conforman el patrimonio del almacén.',
                  'Placa: Etiqueta adhesiva que contiene el número consecutivo que permite identificar un bien devolutivo en el inventario.',
                ],
                generalDispositions: [
                  'El ingreso de bienes está sujeto a la entrada física y documental de los bienes de consumo o devolutivos.',
                  'El inventario de la entidad debe manejarse física y documentalmente, a través del registro de ingreso en el sistema de inventarios.',
                ],
                documents: [
                  'Comprobante de almacén',
                  'Boletín diario de movimiento de almacén',
                  'Boletín mensual de almacén',
                  'Comprobante de entrada de productos',
                  'Comprobante de traspaso',
                  'Orden de ingreso',
                  'Póliza',
                ],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: almacenInventarioSteps,
              },
            },
          ]
        },
        {
          id: 'pa-gf', code: 'PA-GF', name: 'Gestión Financiera', procedures: [
            {
              ...procedure(
                'PA-GF-CPC-01',
                'Cobro Persuasivo y Coactivo',
                'Secretaría de Hacienda',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Facilitar a los funcionarios y personal de apoyo responsables de adelantar el proceso administrativo de cobro persuasivo y coactivo una herramienta eficaz para que directamente se hagan efectivos los créditos exigibles a su favor, y a su vez garantizar la seguridad jurídica y la transparencia del ejercicio de la función administrativa de cobro.',
                scope:
                  'El procedimiento inicia desde la libración del mandamiento de pago y finaliza con el auto que da por terminado el proceso.',
                definitions: [
                  'Funcionario ejecutor: Funcionario investido de la facultad de adelantar el cobro coactivo en la Oficina de Jurisdicción Coactiva.',
                  'Cobro coactivo: Procedimiento mediante el cual las entidades públicas ejecutan directamente sus créditos a su favor, a través de sus propias dependencias, funcionarios y sin necesidad de acudir a la justicia ordinaria.',
                ],
                generalDispositions: [
                  'El presente documento plasma las acciones que integran el proceso administrativo coactivo, contenido en los artículos 823 y siguientes del Decreto 624 de 1989, Estatuto Tributario Nacional, o las normas que lo modifiquen o adicionen.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: cobroPersuasivoCoactivoSteps,
              },
            },
            {
              ...procedure(
                'PA-GF-IEP-02',
                'Informes de Ejecución Presupuestal',
                'Secretaría de Hacienda',
              ),
            },
            {
              ...procedure(
                'PA-GF-GCB-03',
                'Gestión de Cuentas Bancarias',
                'Secretaría de Hacienda',
              ),
            },
            {
              ...procedure(
                'PA-GF-RI-04',
                'Recaudo de Ingresos',
                'Secretaría de Hacienda',
              ),
            },
            {
              ...procedure(
                'PA-GF-IDC-05',
                'Informe Diario de Caja',
                'Secretaría de Hacienda',
              ),
            },
            {
              ...procedure(
                'PA-GF-CDP-06',
                'Expedición de CDP y RP',
                'Secretaría de Hacienda',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Expedir el registro presupuestal que perfecciona los compromisos adquiridos en cumplimiento de los planes, programas, proyectos institucionales y proyectos remunerados aprobados.',
                scope:
                  'Este procedimiento inicia con la recepción y radicación de la solicitud de registro presupuestal enviada por la Secretaría de Hacienda y finaliza con el envío del registro de compromiso al solicitante.',
                definitions: [
                  'Número registro: Número asignado por el aplicativo al momento de realizar el registro presupuestal.',
                  'Fecha: Corresponde a la fecha en la que se hace el registro presupuestal.',
                  'NIT: Corresponde a la cédula o NIT del proveedor o beneficiario de la cuenta.',
                  'A favor de: Corresponde al nombre del proveedor o beneficiario a quien se le expide el registro presupuestal.',
                  'Valor: Corresponde al valor del registro presupuestal.',
                ],
                generalDispositions: [
                  'Se definen los criterios de desarrollo del procedimiento o documento que deben tenerse en cuenta antes de iniciar las actividades de gestión del procedimiento.',
                ],
                documents: [
                  'Solicitud de Registro Presupuestal',
                  'Certificado de Registro Presupuestal',
                  'Certificado de Disponibilidad Presupuestal',
                ],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: expedicionCdpRpSteps,
              },
            },
            {
              ...procedure(
                'PA-GF-PT-07',
                'Pagos a Terceros',
                'Secretaría de Hacienda',
              ),
            },
            {
              ...procedure(
                'PA-GF-CB-08',
                'Conciliaciones Bancarias',
                'Secretaría de Hacienda',
              ),
            },
            {
              ...procedure(
                'PA-GF-GLA-09',
                'Generación de Libros Auxiliares',
                'Secretaría de Hacienda',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Presentar de una manera ordenada los registros contables realizados en determinado periodo de tiempo.',
                scope:
                  'El procedimiento inicia con el ingreso al sistema y finaliza con la presentación e impresión del reporte.',
                definitions: [
                  'Libro contable: Soporte material en la elaboración de la información financiera. Puede ser de carácter obligatorio o voluntario.',
                ],
                generalDispositions: [
                  'Para la elaboración de los auxiliares contables se requiere principalmente que la información contable se encuentre debidamente ordenada y clasificada según la normatividad legal vigente.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: generacionLibrosAuxiliaresSteps,
              },
            },
            {
              ...procedure(
                'PA-GF-RGN-10',
                'Elaboración Reporte Contaduría General de La Nación',
                'Secretaría de Hacienda',
              ),
            },
            {
              ...procedure(
                'PA-GF-OPD-11',
                'Orden de Pago Definitiva',
                'Secretaría de Hacienda',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Realizar la obligación presupuestal de los bienes recibidos a satisfacción y demás exigibilidades por la administración municipal.',
                scope:
                  'El procedimiento inicia con el recibimiento de la solicitud de orden de pago y finaliza con la firma de la orden para que pase a la dependencia necesaria.',
                definitions: [
                  'Orden de pago: Orden que se da por escrito para que el tesorero pague cierta cantidad de dinero a alguien.',
                  'CDP: Documento mediante el cual se garantiza el principio de legalidad, es decir, la existencia del rubro y la apropiación presupuestal suficiente para atender un gasto determinado.',
                  'RP: Registro presupuestal que perfecciona el compromiso, garantizando que los recursos comprometidos no sean desviados a ningún otro fin.',
                ],
                generalDispositions: [
                  'Sin excepción, todas las órdenes de pago se realizan a través del Sistema de Información Financiera.',
                  'Los pagos se realizarán una vez cumplan con todos los requisitos.',
                ],
                documents: [
                  'Orden de pago',
                  'Cuenta de cobro',
                  'Resolución',
                  'Nómina',
                ],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: ordenPagoDefinitivaSteps,
              },
            },
            {
              ...procedure(
                'PA-GF-COP-12',
                'Cancelación de Orden de Pago',
                'Secretaría de Hacienda',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Verificar y aprobar los pagos a través de los portales bancarios en convenio con la Alcaldía Municipal de Gachetá.',
                scope:
                  'El procedimiento inicia desde la recepción de la orden de pago y finaliza con el cargue de la cuenta cancelada.',
                definitions: [
                  'Pago: Tributo que se ofrece por contraprestación de un servicio o por la adquisición de un producto.',
                  'Portal bancario: Herramienta mediante la cual se realizan operaciones bancarias a través de una conexión a internet.',
                  'Orden de pago: Documento predeterminado por la administración central como soporte de reconocimiento de la obligación.',
                ],
                generalDispositions: [
                  'La orden de pago y el comprobante de egreso que este correctamente generado y cargado en el respectivo portal bancario para su cancelación.',
                ],
                documents: [
                  'Orden de pago',
                  'Comprobante de egreso',
                  'Soporte exitoso del pago',
                ],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: cancelacionOrdenPagoSteps,
              },
            },
            {
              ...procedure(
                'PA-GF-ACIP-13',
                'Actualización de Datos Cálculo del Impuesto Predial',
                'Secretaría de Hacienda',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Definir la metodología para realizar el cálculo del impuesto predial de manera correcta y actualizada.',
                scope:
                  'El procedimiento inicia desde la radicación de la solicitud de actualización y finaliza con el archivo del proceso de solicitud.',
                definitions: [
                  'Tasa de usura: Límite máximo con el que un particular o una entidad pueden cobrar intereses sobre un compromiso adquirido.',
                ],
                generalDispositions: [
                  'Para el desarrollo de este procedimiento se debe tener en cuenta la normatividad legal vigente relacionada con la liquidación del impuesto predial, así como la actualización en las tasas de interés fijadas por el Banco de la República.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: actualizacionDatosImpuestoPredialSteps,
              },
            },
            {
              ...procedure(
                'PA-GF-IRDI-14',
                'Informes de Recaudo Diario Impuesto Predial',
                'Secretaría de Hacienda',
              ),
              source: { pageStart: undefined, pageEnd: undefined, validationMode: 'visual_validated' },
              detail: {
                objective:
                  'Establecer los lineamientos con el fin de proceder a elaborar un adecuado reporte de los movimientos diarios de recaudo del impuesto predial realizados en la Secretaría de Hacienda.',
                scope:
                  'El procedimiento inicia con la recepción de cancelación en caja y finaliza con la firma del informe por parte del Secretario de Hacienda.',
                definitions: [
                  'Impuesto predial: Tributo que deben pagar los propietarios de un inmueble a los gobiernos municipales.',
                ],
                generalDispositions: [
                  'Diligenciar diariamente las operaciones de ingreso y consignación en la base de datos para tal fin.',
                ],
                documents: [
                  'Informe diario de recaudo',
                  'Planilla de recaudo',
                  'Soportes bancarios',
                ],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: informeRecaudoDiarioPredialSteps,
              },
            },
          ]
        },
      ],
    },
    {
      id: 'pec', code: 'PEC', name: 'Procesos de Evaluación y Control', type: 'evaluacion_control',
      processes: [
        {
          id: 'pec-cve', code: 'PEC-CVE', name: 'Control, Verificación y Evaluación', procedures: [
            {
              ...procedure(
                'PEC-CVE-SMR-01',
                'Seguimiento a Mapa de Riesgos',
                'Oficina de Control Interno',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Definir las actividades a desarrollar por parte de la Oficina de Control Interno durante la vigencia, con el fin de garantizar el cumplimiento del proceso de evaluación a todas las dependencias de la administración y realizar seguimiento periódico para verificar su ejecución y avance.',
                scope:
                  'El procedimiento inicia con la elaboración del Plan Anual de Auditorías y finaliza con la ejecución del Plan de Auditorías.',
                definitions: [
                  'Auditoría: Proceso sistemático, independiente y documentado para obtener evidencias de auditoría y evaluarlas de manera objetiva con el fin de determinar la extensión en que se cumplen los criterios de auditoría.',
                  'Plan de auditoría: Descripción de las actividades y de los detalles acordados de una auditoría.',
                  'Comité: Conjunto de personas elegidas para desempeñar una labor determinada, especialmente si tiene autoridad o actúa en representación de un colectivo.',
                ],
                generalDispositions: [
                  'El plan de auditorías se elaborará una vez al año y se planificará al principio de cada vigencia.',
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: seguimientoMapaRiesgosSteps,
              },
            },
            {
              ...procedure(
                'PEC-CVE-ESG-02',
                'Evaluación y Seguimiento a la Gestión Organizacional',
                'Oficina de Control Interno',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Garantizar la correcta evaluación y seguimiento de la gestión organizacional.',
                scope:
                  'Este procedimiento inicia con la recepción de los informes de gestión por parte de las dependencias y culmina con la socialización de los resultados.',
                definitions: [
                  'Oficina de Control Interno: Componente del Sistema de Control Interno de nivel gerencial o directivo, encargado de medir y evaluar la eficiencia, eficacia y economía de los demás controles, asesorando a la dirección en la continuidad del proceso administrativo, la reevaluación de los planes establecidos y la introducción de correctivos necesarios para el cumplimiento de metas u objetivos previstos.',
                  'Plan de Desarrollo: Herramienta de gestión que promueve el desarrollo social en un determinado territorio, sentando las bases para atender las necesidades insatisfechas de la población y mejorar la calidad de vida de los ciudadanos.',
                  'Informe de gestión: Documento que incluye las actividades de coordinación, gestión, administración y dirección efectuadas durante un periodo de tiempo en una empresa.',
                ],
                generalDispositions: [
                  'Los informes de gestión serán presentados por el ejecutivo municipal a la comunidad en audiencia pública, anualmente.',
                  'La Oficina de Control Interno garantizará la correcta evaluación y seguimiento a la gestión organizacional, de conformidad con las metas propuestas en el Plan de Desarrollo Municipal.',
                  'Igualmente, una vez el ejecutivo presente la rendición de cuentas a la comunidad, la Oficina de Control Interno realizará el informe final de rendición de cuentas o informe de gestión, para lo cual además del seguimiento realizado al Plan de Desarrollo en las auditorías internas, se elabora una encuesta a la comunidad sobre el desarrollo de la actividad realizada.',
                ],
                documents: [
                  'Informe de gestión',
                  'Plan de Desarrollo',
                  'Plan de Acción',
                  'Encuesta de satisfacción',
                ],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: evaluacionSeguimientoGestionOrganizacionalSteps,
              },
            },
            {
              ...procedure(
                'PEC-CVE-PI-03',
                'Presentación de Informes Oficina de Control Interno',
                'Oficina de Control Interno',
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective:
                  'Establecer las actividades que se deben seguir en la Oficina de Control Interno, para facilitar la preparación, verificación y presentación de los informes de acuerdo con los lineamientos establecidos por el Gobierno Nacional y ante los organismos de control.',
                scope:
                  'Este procedimiento inicia con la identificación de las fechas de entrega de los informes por parte de la administración y termina con el reporte oportuno de la información en la herramienta exigida, archivos planos, documentación en físico y medio magnético de los informes, y publicación en la web de la entidad de acuerdo a la norma.',
                definitions: [
                  'Oficina de Control Interno: Oficina de los componentes del Sistema de Control Interno de nivel gerencial o directivo, encargada de medir y evaluar la eficiencia, eficacia y economía de los demás controles, asesorando a la dirección en la continuidad del proceso administrativo, la reevaluación de los planes establecidos y la introducción de los correctivos necesarios para el cumplimiento de las metas u objetivos previstos.',
                  'Informe de Gestión: Herramienta que hace públicos los principales logros obtenidos por una entidad durante una vigencia, el cual también se usa para presentar balances y resultados institucionales.',
                  'Oficina de Control Interno: Unidad que realiza evaluación y seguimiento al Sistema de Control Interno, al cumplimiento de informes y a la presentación de reportes ante organismos de control.',
                  'SISTEMA CHIP: Consolidador de Hacienda e Información Financiera Pública, herramienta a través de la cual se genera, transmite y difunde información financiera producida por las entidades públicas con destino al gobierno central, entidades de control y ciudadanía en general.',
                  'FURAG: Formulario Único de Reporte y Avance de la Gestión en las entidades públicas.',
                ],
                generalDispositions: [
                  'El informe de Evaluación de Control Interno FURAG se presenta anualmente al DAFP.',
                  'El informe anual sobre la Evaluación del Control Interno Contable se presenta anualmente a la Contaduría General de la Nación a través del aplicativo CHIP.',
                  'El informe de Evaluación del Sistema de Control Interno se presenta anualmente con corte al 31 de diciembre y se entrega a la Secretaría de Hacienda para subir los informes de fin de año.',
                  'El seguimiento a Mapas de Riesgo de la vigencia se realiza periódicamente mediante el proceso de ejecución de las auditorías internas.',
                  'El informe de Austeridad del Gasto se elabora trimestralmente y se publica en la página web del municipio.',
                  'El informe de seguimiento a las Estrategias Anticorrupción y Mapa de Riesgo de Corrupción se realiza tres veces al año.',
                  'El informe pormenorizado del estado del Control Interno se presenta cuatrimestralmente.',
                ],
                documents: [
                  'Informe de Evaluación Oficina de Control Interno',
                  'Autoevaluación',
                  'Certificado',
                  'Informe anual de Evaluación del Control Interno Contable',
                  'Informe CHIP',
                  'Informe de Evaluación del Sistema de Control Interno',
                  'Informe de Gestión de la Oficina de Control Interno',
                  'Mapa de riesgos de la vigencia',
                  'Informe pormenorizado del estado de control interno',
                  'Informe de austeridad en el gasto',
                  'Informe de PQR',
                  'Informe de seguimiento a estrategias anticorrupción',
                  'Informe de Rendición de Cuentas',
                ],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: presentacionInformesControlInternoSteps,
              },
            },
            {
              ...procedure(
                'PEC-CVE-ESP-04',
                'Elaboración y seguimiento a plan de mejoramiento auditoría',
                'Oficina de Control Interno',
                undefined,
                []
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective: 'Promover que los procesos internos de la administración se desarrollen en forma eficiente y transparente a través de la adopción y cumplimiento de las acciones correctivas y de la implementación de metodologías orientadas al mejoramiento continuo planteadas por los entes de control externos.',
                scope: 'Este procedimiento inicia con la notificación del Informe Definitivo externo y culmina con el cierre de los hallazgos plasmados en el plan de mejoramiento.',
                definitions: [
                  'OFICINA DE CONTROL INTERNO: Es uno de los componentes del Sistema de Control Interno, de nivel gerencial o directivo, encargado de medir y evaluar la eficiencia, eficacia y economía de los demás controles, asesorando a la dirección en la continuidad del proceso administrativo, la reevaluación de los planes establecidos y en la introducción de los correctivos necesarios para el cumplimiento de las metas u objetivos previstos.',
                  'AUDITORÍA EXTERNA: Mediante ella se realiza un análisis y control exhaustivos por parte de un auditor externo, el cual es totalmente ajeno a la actividad de la empresa, con el objetivo de emitir una opinión imparcial e independiente sobre el sistema de operación de la empresa y su control interno. Además, a través de la auditoría externa, se formulan sugerencias de mejora para la organización.',
                  'HALLAZGOS DE LA AUDITORÍA: En el ejercicio del control interno se refiere a los hechos detectados en la auditoría, referente a deficiencias, desviaciones, irregularidades, errores, debilidades, fortalezas y/o necesidades de cambio',
                  'PLAN DE MEJORAMIENTO: Documento que consolida un conjunto de acciones correctivas planteadas para los hallazgos detectados en cada uno de los procesos establecidos.'
                ],
                generalDispositions: [
                  'El seguimiento de planes de auditorías externos debe ser realizado por el Municipio de Gachetá hasta cumplir con el 100% de las actividades propuestas en el Plan de Mejoramiento, y de lo cual la Oficina de Control Interno deberá efectuar al seguimiento respectivo dentro de los plazos establecidos por cada organismo de control.'
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: elaboracionSeguimientoPlanMejoramientoAuditoriaSteps,
              },
            },
            {
              ...procedure(
                'PEC-CVE-SPMI-05',
                'Seguimiento a planes de mejoramiento internos',
                'Oficina de Control Interno',
                undefined,
                []
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective: 'Realizar seguimiento al cumplimiento de las acciones contenidas en el Plan de Mejoramiento Interno, producto de los resultados (Hallazgos) de las Auditorias realizadas por la Oficina de Control Interno a los diferentes procesos, a través del análisis de la información reportada por cada una de las dependencias, con el propósito de verificar las evidencias y determinar su estado y avance.',
                scope: 'Este procedimiento inicia con la notificación del Informe Definitivo de Auditoria y culmina con el cierre de los hallazgos plasmados en el plan de mejoramiento.',
                definitions: [
                  'ACCIÓN CORRECTIVA: Gestión correctiva y/o preventiva que subsana la causa que dio origen a la observación identificada.',
                  'HALLAZGO: En el ejercicio del control interno se refiere a los hechos detectados en la auditoria, referente a deficiencias, desviaciones, irregularidades, errores, debilidades, fortalezas y/o necesidades de cambio',
                  'INFORME DEFINITIVO: Es un segundo informe que se construye después que el auditado da respuesta al informe preliminar, en este informe se contesta si se CONFIRMA o se DESVIRTÚAN los hallazgos, después de analizar todas las respuestas y evidencias allegadas por el auditado en el anterior informe.',
                  'PLAN DE MEJORAMIENTO: Documento que consolida un conjunto de acciones correctivas planteadas para las no conformidades detectadas en cada uno de los procesos establecidos.'
                ],
                generalDispositions: [
                  'El seguimiento a los planes de mejoramiento interno se realizará cada dos meses. Si el jefe de control interno cree que una acción correctiva planteada por la oficina auditada en el plan de mejoramiento no es pertinente para el hallazgo, se procede a devolver el mismo.'
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: seguimientoPlanesMejoramientoInternosSteps,
              },
            },
            {
              ...procedure(
                'PEC-CVE-PAA-06',
                'Elaboración y aprobación del plan anual de auditorías',
                'Oficina de Control Interno',
                undefined,
                []
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective: 'Definir las actividades a desarrollar por parte de la Oficina de Control Interno durante la vigencia, con el fin de garantizar el cumplimiento del proceso de Evaluación a todas las dependencias de la administración, y realizar seguimiento periódico para verificar su ejecución y avance.',
                scope: 'Cubre la programación de actividades para la respectiva vigencia y la comunicación del Plan Anual de Auditoría resultante al Comité de Control Interno, así como el seguimiento a su ejecución, con el fin de determinar su cumplimiento.',
                definitions: [
                  'AUDITORIA: Proceso sistemático, independiente y documentado para obtener evidencias de auditoría y evaluarlas de manera objetiva con el fin de determinar la extensión en que se cumplen los criterios de auditoria.',
                  'PLAN DE AUDITORIA: Descripción de las actividades y de los detalles acordados de una Auditoría.',
                  'COMITÉ: Conjunto de personas elegidas para desempeñar una labor determinada, especialmente si tiene autoridad o actúa en representación de un colectivo'
                ],
                generalDispositions: [
                  'El plan de auditorías se elaborará una vez al año, y se planificará al principio de cada vigencia.'
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: elaboracionAprobacionPlanAnualAuditoriasSteps,
              },
            },
            {
              ...procedure(
                'PEC-CVE-CT-07',
                'Comités',
                'Oficina de Control Interno',
                undefined,
                []
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective: 'Orientar el procedimiento de las reuniones del Comité Institucional de Coordinación de Control Interno',
                scope: 'El procedimiento inicia con la citación a la reunión y finaliza con el archivo del acta de la sesión.',
                definitions: [
                  'Comité Institucional de Coordinación de Control Interno: Órgano de asesoría y decisión en los asuntos de control interno de la entidad. En su rol de responsable y facilitador hace parte de las instancias de articulación para el funcionamiento armónico del Sistema de Control Interno.',
                  'Reunión: Espacio para discutir uno a varios temas, convocados mediante un orden del día y los acuerdos adoptados se incluyen en el acta de la reunión.',
                  'Orden del Día: Agenda o programa de puntos a ser discutidos en una determinada reunión'
                ],
                generalDispositions: [
                  'En concordancia con lo anterior, el artículo 2.2.21.1.5 del Decreto 1083 de 2015 dispone que las entidades y organismos del Estado están obligadas a establecer un Comité Institucional de Coordinación de Control Interno como órgano asesor e instancia decisoria en los asuntos de control interno'
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: comitesSteps,
              },
            },
            {
              ...procedure(
                'PEC-CVE-OPI-08',
                'Control interno disciplinario ordinario de primera instancia',
                'Oficina de Control Interno',
                undefined,
                []
              ),
              source: {
                pageStart: undefined,
                pageEnd: undefined,
                validationMode: 'visual_validated',
              },
              detail: {
                objective: 'Adelantar las actividades encaminadas a investigar y/o a sancionar determinados comportamientos o conductas de los servidores públicos, que conlleven incumplimiento de deberes, extralimitación en el ejercicio de funciones, incurrir en prohibiciones y violación del régimen de inhabilidades, incompatibilidades, impedimentos y conflicto de intereses.',
                scope: 'El procedimiento inicia con la recepción de la queja, informe del servidor público o conocimiento de una presunta falta disciplinaria, contempla las actividades de control disciplinario interno y finaliza con la emisión del fallo por parte de la instancia correspondiente.',
                definitions: [
                  'AUTO: Acto administrativo mediante el cual se da inicio a una investigación preliminar o se pone fin a una actuación administrativa (fallo o sentencia)',
                  'QUEJA: Es el medio por el cual se da a conocer a la administración una presunta irregularidad cometida por un funcionario o ex funcionario.',
                  'FALTA DISCIPLINARIA: Es una presunta irregularidad en la que está incurso el funcionario que incumple sus deberes o se extralimite en sus funciones.',
                  'CONTROL INTERNO DISCIPLINARIO: Es la instancia encargada de juzgar las faltas disciplinarias en ejercicio de la función pública.'
                ],
                generalDispositions: [
                  'La función disciplinaria debe adelantarse con organización, planificación, manejo del tiempo, diligencia y eficiencia.',
                  'Los principios del debido proceso, el derecho de defensa, la presunción de inocencia, entre otros, deben regir el proceso disciplinario.',
                  'En los casos en que existe poder preferente por parte de la Personería de Gachetá, el ente de control envía un abogado comisionado para realizar visita administrativa.'
                ],
                documents: [],
                formats: [],
                legalRequirements: [],
                variablesToMeasure: [],
                flowSteps: controlInternoDisciplinarioPrimeraInstanciaSteps,
              },
            }
          ]
        },
      ],
    },
  ],
};

export const allProcedures = manualData.macroprocesses.flatMap((macro) =>
  macro.processes.flatMap((process) =>
    process.procedures.map((procedure) => ({ macro, process, procedure })),
  ),
);
