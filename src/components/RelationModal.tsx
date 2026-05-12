import { AlertTriangle, CheckCircle2, ClipboardList, Scale, ShieldAlert, X } from 'lucide-react';
import type { ProcedureItem } from '../types/manual';
import type { ProcedureRelationship } from '../utils/relations';
import styles from './RelationModal.module.css';

interface RelationModalProps {
  procedure: ProcedureItem;
  relation: ProcedureRelationship | null;
  onClose: () => void;
}

const legalLabel = {
  compatible: 'Compatible con el perfil',
  requiere_validacion: 'Requiere validación',
  no_recomendado: 'No recomendado',
};

export function RelationModal({ procedure, relation, onClose }: RelationModalProps) {
  if (!relation) return null;
  const criticalClass = relation.criticality === 'critico' || relation.criticality === 'alto' ? styles.badgeCritical : relation.criticality === 'medio' ? styles.badgeWarn : styles.badge;
  const legalClass = relation.legalFit === 'compatible' ? styles.badgeOk : relation.legalFit === 'requiere_validacion' ? styles.badgeWarn : styles.badgeCritical;

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true">
      <section className={styles.modal}>
        <header className={styles.header}>
          <div>
            <span className={styles.kicker}>Relación proceso ↔ manual de funciones</span>
            <h2>{relation.profile.denomination} · {relation.profile.functionalArea}</h2>
            <p>{procedure.code} · {procedure.title}</p>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Cerrar modal"><X size={18} /></button>
        </header>

        <div className={styles.body}>
          <div className={styles.badgeRow}>
            <span className={relation.confidence === 'directa' ? styles.badgeOk : styles.badgeWarn}>{relation.confidence === 'directa' ? 'Relación directa estricta' : 'Relación probable'}</span>
            <span className={criticalClass}>Nivel {relation.criticality}</span>
            <span className={legalClass}>{legalLabel[relation.legalFit]}</span>
          </div>

          <div className={styles.grid}>
            <article className={styles.card}>
              <h3><ClipboardList size={16} /> Criterio de relación</h3>
              <p>{relation.reason}</p>
            </article>
            <article className={styles.card}>
              <h3><CheckCircle2 size={16} /> Recomendación</h3>
              <p>{relation.recommendation}</p>
            </article>
            <article className={styles.card}>
              <h3><Scale size={16} /> Revisión funcional/legal</h3>
              <p>{relation.legalReview}</p>
            </article>
          </div>

          <article className={styles.card}>
            <h3><ShieldAlert size={16} /> Funciones específicas que soportan este procedimiento</h3>
            {relation.functions.length > 0 ? (
              <div className={styles.functionList}>
                {relation.functions.map((fn) => (
                  <div key={fn.id} className={styles.functionItem}>
                    <span className={styles.number}>{fn.number}</span>
                    <div>
                      <strong>Función {fn.number}</strong>
                      <p>{fn.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.empty}><AlertTriangle size={15} /> No hay funciones específicas relacionadas con criterio estricto.</p>
            )}
          </article>
        </div>
      </section>
    </div>
  );
}
