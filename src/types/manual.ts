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
