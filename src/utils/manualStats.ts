import type { ManualData, ProcedureItem, ReviewStatus } from '../types/manual';

export const countProcedures = (data: ManualData) =>
  data.macroprocesses.reduce(
    (total, macro) => total + macro.processes.reduce((acc, process) => acc + process.procedures.length, 0),
    0,
  );

export const getStatusLabel = (status: ReviewStatus) => {
  const labels: Record<ReviewStatus, string> = {
    pendiente: 'Pendiente',
    en_revision: 'En revisión',
    requiere_ajuste: 'Requiere ajuste',
    validado: 'Validado',
  };
  return labels[status];
};

export const procedureProgress = (procedure: ProcedureItem) => {
  const fields = [
    procedure.detail.objective,
    procedure.detail.scope,
    ...procedure.detail.definitions,
    ...procedure.detail.generalDispositions,
  ];
  const hasBase = fields.some((item) => item.trim().length > 0);
  const hasFlow = procedure.detail.flowSteps.length > 0;
  if (procedure.source.validationMode === 'visual_validated') return 100;
  if (hasBase && hasFlow) return 70;
  if (hasBase || hasFlow) return 35;
  return 0;
};
