export type ReviewStatus = 'pendiente' | 'en_revision' | 'requiere_ajuste' | 'validado';
export type CyclePhase = 'P' | 'H' | 'V' | 'A' | '';
export type FlowNodeType = 'start' | 'activity' | 'decision' | 'document' | 'connector' | 'offpage' | 'software' | 'end';

export interface FlowBranch {
  label: 'SI' | 'NO' | string;
  targetStepId?: string;
  note?: string;
}

export interface FlowStep {
  id: string;
  number: number;
  type: FlowNodeType;
  label: string;
  cycle: CyclePhase;
  activity: string;
  responsible: string;
  branches?: FlowBranch[];
  notes?: string[];
}

export interface ProcedureSource {
  pageStart?: number;
  pageEnd?: number;
  imageRefs?: string[];
  validationMode: 'pendiente' | 'visual_validated' | 'textual_draft';
}

export interface ProcedureDetail {
  objective: string;
  scope: string;
  definitions: string[];
  generalDispositions: string[];
  documents: string[];
  formats: string[];
  legalRequirements: string[];
  variablesToMeasure: string[];
  flowSteps: FlowStep[];
}

export interface ProcedureItem {
  id: string;
  code: string;
  title: string;
  responsibleArea: string;
  status: ReviewStatus;
  source: ProcedureSource;
  detail: ProcedureDetail;
}

export interface ProcessItem {
  id: string;
  code: string;
  name: string;
  procedures: ProcedureItem[];
}

export interface MacroprocessItem {
  id: string;
  code: string;
  name: string;
  type: 'estrategico' | 'misional' | 'apoyo' | 'evaluacion_control';
  processes: ProcessItem[];
}

export interface ManualData {
  projectName: string;
  entity: string;
  sourceTitle: string;
  notes: string[];
  macroprocesses: MacroprocessItem[];
}

export type ManualModule = 'processes' | 'functions';
export type FunctionRelationConfidence = 'directa' | 'probable' | 'sin_relacion';


export type RelationCriticality = 'critico' | 'alto' | 'medio' | 'bajo';
export type LegalFitLevel = 'compatible' | 'requiere_validacion' | 'no_recomendado';

export interface StrictFunctionRelationRule {
  procedureIds: string[];
  profileId: string;
  functionNumbers: number[];
  confidence: 'directa' | 'probable';
  criticality: RelationCriticality;
  legalFit: LegalFitLevel;
  legalReview: string;
  reason: string;
  recommendation: string;
}

export interface FunctionProcessRelation {
  procedureId: string;
  functionProfileId: string;
  functionId?: string;
  confidence: FunctionRelationConfidence;
  reason: string;
}

export interface FunctionItem {
  id: string;
  number: number;
  title: string;
  description: string;
  relatedProcedureIds: string[];
  relationNote?: string;
}

export interface FunctionProfile {
  id: string;
  level: 'directivo' | 'profesional' | 'tecnico' | 'asistencial';
  dependency: string;
  functionalArea: string;
  denomination: string;
  code: string;
  grade: string;
  positions: number;
  immediateBoss: string;
  purpose: string;
  pageStart: number;
  pageEnd: number;
  functionCount: number;
  functions: FunctionItem[];
}

export interface FunctionsManualData {
  projectName: string;
  entity: string;
  sourceTitle: string;
  issueDate: string;
  profiles: FunctionProfile[];
  notes: string[];
}
