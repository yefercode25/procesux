import { AlertTriangle, ClipboardList, FileText, GitBranch, X } from 'lucide-react';
import type { ManualData, ProcedureItem } from '../types/manual';
import { getProcedureRelationships } from '../utils/relations';
import styles from './RelationModal.module.css';

interface ProcedurePreviewModalProps {
  procedure: ProcedureItem | null;
  manualData: ManualData;
  onClose: () => void;
}

const findContext = (manualData: ManualData, procedureId: string) => {
  for (const macro of manualData.macroprocesses) {
    for (const process of macro.processes) {
      const procedure = process.procedures.find((item) => item.id === procedureId);
      if (procedure) return { macro, process, procedure };
    }
  }
  return null;
};

export function ProcedurePreviewModal({ procedure, manualData, onClose }: ProcedurePreviewModalProps) {
  if (!procedure) return null;
  const context = findContext(manualData, procedure.id);
  const relations = getProcedureRelationships(procedure);
  const steps = procedure.detail.flowSteps.filter((step) => step.type !== 'start' && step.type !== 'end');

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true">
      <section className={styles.modal}>
        <header className={styles.header}>
          <div>
            <span className={styles.kicker}>Vista rápida del procedimiento</span>
            <h2>{procedure.code} · {procedure.title}</h2>
            <p>{context ? `${context.macro.name} / ${context.process.name}` : 'Contexto no disponible'} · Responsable: {procedure.responsibleArea || 'Pendiente'}</p>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Cerrar modal"><X size={18} /></button>
        </header>

        <div className={styles.body}>
          <div className={styles.grid}>
            <article className={styles.card}>
              <h3><ClipboardList size={16} /> Objetivo</h3>
              <p>{procedure.detail.objective || 'Pendiente por registrar.'}</p>
            </article>
            <article className={styles.card}>
              <h3><ClipboardList size={16} /> Alcance</h3>
              <p>{procedure.detail.scope || 'Pendiente por registrar.'}</p>
            </article>
            <article className={styles.card}>
              <h3><FileText size={16} /> Elementos</h3>
              <p>{procedure.detail.documents.length} documento(s), {procedure.detail.formats.length} formato(s), {steps.length} actividad(es) en flujo.</p>
            </article>
          </div>

          <article className={styles.card}>
            <h3><GitBranch size={16} /> Flujo y actividades</h3>
            {steps.length > 0 ? (
              <div className={styles.tableWrap}>
                <table className={styles.flowTable}>
                  <thead><tr><th>No.</th><th>Ciclo</th><th>Actividad</th><th>Responsable</th></tr></thead>
                  <tbody>
                    {steps.map((step) => <tr key={step.id}><td>{step.number}</td><td>{step.cycle || '—'}</td><td>{step.activity || step.label}</td><td>{step.responsible || 'Pendiente'}</td></tr>)}
                  </tbody>
                </table>
              </div>
            ) : <p className={styles.empty}>Este procedimiento no tiene flujo cargado.</p>}
          </article>

          <article className={styles.card}>
            <h3><AlertTriangle size={16} /> Relación estricta con funciones</h3>
            {relations.length > 0 ? (
              <div className={styles.functionList}>
                {relations.map((rel) => (
                  <div key={rel.profile.id} className={styles.functionItem}>
                    <span className={styles.number}>{rel.functions.length}</span>
                    <div>
                      <strong>{rel.profile.denomination} · {rel.profile.functionalArea}</strong>
                      <p>{rel.reason} Recomendación: {rel.recommendation}</p>
                      <div className={styles.miniFunctions}>
                        {rel.functions.slice(0, 6).map((fn) => (
                          <span key={fn.id}>F{fn.number}. {fn.description}</span>
                        ))}
                        {rel.functions.length > 6 ? <em>+ {rel.functions.length - 6} función(es) más en la ficha del procedimiento.</em> : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : <p className={styles.empty}>No se encontró relación estricta con funciones del manual.</p>}
          </article>
        </div>
      </section>
    </div>
  );
}
