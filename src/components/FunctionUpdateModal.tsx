import type { ReactNode } from 'react';
import { AlertTriangle, CheckCircle2, FilePenLine, GitPullRequestArrow, PlusCircle, RefreshCcw, Scale, ShieldCheck, Trash2, X } from 'lucide-react';
import type { FunctionProfile } from '../types/manual';
import type { ManualUpdateFinding, ProfileFunctionUpdateAction } from '../utils/relations';
import styles from './FunctionUpdateModal.module.css';

interface FunctionUpdateModalProps {
  profile: FunctionProfile;
  findings: ManualUpdateFinding[];
  actions: ProfileFunctionUpdateAction[];
  isOpen: boolean;
  onClose: () => void;
}

const actionLabel: Record<ProfileFunctionUpdateAction['action'], string> = {
  mantener: 'Mantener',
  modificar: 'Modificar',
  agregar: 'Agregar',
  quitar: 'Quitar',
  fusionar: 'Fusionar',
  trasladar: 'Trasladar',
};

const actionIcon: Record<ProfileFunctionUpdateAction['action'], ReactNode> = {
  mantener: <CheckCircle2 size={15} />,
  modificar: <RefreshCcw size={15} />,
  agregar: <PlusCircle size={15} />,
  quitar: <Trash2 size={15} />,
  fusionar: <GitPullRequestArrow size={15} />,
  trasladar: <FilePenLine size={15} />,
};

const severityLabel: Record<ManualUpdateFinding['severity'], string> = {
  critico: 'Crítico',
  alto: 'Alto',
  medio: 'Medio',
  bajo: 'Bajo',
};

export function FunctionUpdateModal({ profile, findings, actions, isOpen, onClose }: FunctionUpdateModalProps) {
  if (!isOpen) return null;

  const groupedActions = actions.reduce<Record<ProfileFunctionUpdateAction['action'], ProfileFunctionUpdateAction[]>>((acc, action) => {
    acc[action.action] = [...(acc[action.action] ?? []), action];
    return acc;
  }, {
    mantener: [],
    modificar: [],
    agregar: [],
    quitar: [],
    fusionar: [],
    trasladar: [],
  });

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label="Propuesta de actualización del manual de funciones">
      <section className={styles.modal}>
        <header className={styles.header}>
          <div>
            <span className={styles.kicker}><ShieldCheck size={15} /> Propuesta normativa de actualización</span>
            <h2>{profile.denomination} · {profile.functionalArea}</h2>
            <p>{profile.dependency} · Código {profile.code} · Grado {profile.grade}</p>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Cerrar revisión normativa">
            <X size={18} />
          </button>
        </header>

        <div className={styles.body}>
          <section className={styles.noticeCard}>
            <div><Scale size={18} /></div>
            <p>
              Esta vista no reemplaza el acto administrativo de modificación del manual. Sirve como matriz técnica para saber qué funciones se mantienen, modifican, agregan, quitan, fusionan o trasladan, y por qué conviene hacerlo antes de actualizar formalmente el Decreto 057 de 2018.
            </p>
          </section>

          {findings.length > 0 && (
            <section className={styles.findingsGrid}>
              {findings.map((finding) => (
                <article key={finding.id} className={styles.findingCard}>
                  <span className={`${styles.severity} ${styles[`severity_${finding.severity}`]}`}>{severityLabel[finding.severity]}</span>
                  <h3>{finding.title}</h3>
                  <p><b>Ámbito:</b> {finding.scope}</p>
                  <p>{finding.summary}</p>
                  <p><strong>Recomendación base:</strong> {finding.recommendation}</p>
                </article>
              ))}
            </section>
          )}

          <section className={styles.actionSummary}>
            {Object.entries(groupedActions).map(([key, list]) => (
              <div key={key}>
                <span>{actionLabel[key as ProfileFunctionUpdateAction['action']]}</span>
                <strong>{list.length}</strong>
              </div>
            ))}
          </section>

          <section className={styles.actionsList}>
            {actions.map((action) => {
              const sourceFunctions = action.functionNumbers
                ?.map((number) => profile.functions.find((fn) => fn.number === number))
                .filter(Boolean) ?? [];

              return (
                <article key={action.id} className={`${styles.actionCard} ${styles[`action_${action.action}`]}`}>
                  <header>
                    <span className={styles.actionBadge}>{actionIcon[action.action]} {actionLabel[action.action]}</span>
                    {action.functionNumbers?.length ? <em>Función(es): {action.functionNumbers.join(', ')}</em> : <em>Nueva disposición</em>}
                  </header>
                  <h3>{action.title}</h3>

                  {sourceFunctions.length > 0 && (
                    <details className={styles.currentBox}>
                      <summary>Ver redacción actual relacionada</summary>
                      <div>
                        {sourceFunctions.map((fn) => (
                          <p key={fn!.id}><b>Función {fn!.number}:</b> {fn!.description}</p>
                        ))}
                      </div>
                    </details>
                  )}

                  <div className={styles.proposedBox}>
                    <span>Cómo debería quedar</span>
                    <p>{action.proposedText}</p>
                  </div>

                  <div className={styles.explainGrid}>
                    <div>
                      <h4>Por qué</h4>
                      <p>{action.why}</p>
                    </div>
                    <div>
                      <h4>Soporte normativo / técnico</h4>
                      <p>{action.normativeBasis}</p>
                    </div>
                    <div>
                      <h4>Impacto en procesos</h4>
                      <p>{action.impact}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>

          {actions.length === 1 && actions[0].id === 'global-competencias-decreto-815' && (
            <div className={styles.emptyState}>
              <AlertTriangle size={18} /> Para este perfil no se detectó ajuste funcional específico adicional; aun así debe completarse la revisión general de competencias laborales y requisitos.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
