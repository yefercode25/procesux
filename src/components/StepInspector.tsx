import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, UserRound, X } from 'lucide-react';
import type { FlowStep } from '../types/manual';
import styles from './StepInspector.module.css';

interface StepInspectorProps {
  steps: FlowStep[];
  activeStepId: string | null;
  onSelectStep: (stepId: string) => void;
}

const typeLabels: Record<string, string> = {
  start: 'Inicio',
  activity: 'Actividad',
  decision: 'Decisión',
  document: 'Documento',
  connector: 'Conector',
  offpage: 'Conector fuera de página',
  software: 'Software',
  end: 'Fin',
};

const phaseLabels: Record<string, string> = {
  P: 'Planear',
  H: 'Hacer',
  V: 'Verificar',
  A: 'Actuar',
};

export function StepInspector({ steps, activeStepId, onSelectStep }: StepInspectorProps) {
  if (steps.length === 0) {
    return (
      <section className={`${styles.inspectorCard} ${styles.mutedCard}`}>
        <strong>Revisión paso a paso</strong>
        <p>Agrega los pasos en la estructura de datos para activar el inspector.</p>
      </section>
    );
  }

  const currentIndex = Math.max(0, steps.findIndex((step) => step.id === activeStepId));
  const step = steps[currentIndex] ?? steps[0];

  const goTo = (index: number) => {
    const next = steps[index];
    if (next) onSelectStep(next.id);
  };

  return (
    <aside className={styles.inspectorCard}>
      <header className={styles.inspectorHeader}>
        <strong>Detalle del paso seleccionado</strong>
        <button type="button" aria-label="Cerrar panel"><X size={17} /></button>
      </header>

      <div className={styles.stepTitleRow}>
        <span className={styles.stepNumber}>{step.number}</span>
        <h3>{step.label}</h3>
        {step.cycle && <b className={`${styles.phasePill} ${styles[`phase_${step.cycle.toLowerCase()}`]}`}>{step.cycle}</b>}
      </div>

      <div className={styles.dataRows}>
        <div>
          <span>Ciclo</span>
          <strong>{step.cycle ? `${step.cycle} · ${phaseLabels[step.cycle]}` : 'No aplica'}</strong>
        </div>
        <div>
          <span>Tipo</span>
          <strong>{typeLabels[step.type] ?? step.type}</strong>
        </div>
        <div>
          <span>Responsable</span>
          <strong>{step.responsible || 'Sin responsable definido'}</strong>
        </div>
      </div>

      <div className={styles.activityBox}>
        <span>Actividad del manual</span>
        <p>{step.activity || 'Sin actividad registrada.'}</p>
      </div>

      <div className={styles.responsibleBox}>
        <UserRound size={16} />
        <div>
          <span>Responsable</span>
          <strong>{step.responsible || 'Sin responsable definido'}</strong>
        </div>
      </div>

      {step.branches && step.branches.length > 0 && (
        <div className={styles.branchesBox}>
          <span><AlertCircle size={15} /> Ramas de decisión</span>
          {step.branches.map((branch) => (
            <p key={`${branch.label}-${branch.targetStepId ?? branch.note ?? ''}`}><b>{branch.label}</b> {branch.note || (branch.targetStepId ? `dirige a ${branch.targetStepId}` : '')}</p>
          ))}
        </div>
      )}

      <div className={styles.checklistMini}>
        <span><CheckCircle2 size={14} /> Redacción</span>
        <span><CheckCircle2 size={14} /> Responsable</span>
        <span><CheckCircle2 size={14} /> Secuencia</span>
      </div>

      <div className={styles.stepActions}>
        <button type="button" onClick={() => goTo(currentIndex - 1)} disabled={currentIndex === 0}>
          <ArrowLeft size={16} /> Anterior
        </button>
        <button type="button" onClick={() => goTo(currentIndex + 1)} disabled={currentIndex === steps.length - 1}>
          Siguiente <ArrowRight size={16} />
        </button>
      </div>
    </aside>
  );
}
