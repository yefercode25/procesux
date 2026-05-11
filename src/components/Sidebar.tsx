import { BookOpen, ChevronDown, ClipboardList, FileText, FolderTree, LibraryBig, ScrollText } from 'lucide-react';
import type { ManualData } from '../types/manual';
import { getStatusLabel, procedureProgress } from '../utils/manualStats';
import styles from './Sidebar.module.css';

interface SidebarProps {
  data: ManualData;
  query: string;
  selectedProcedureId: string;
  onSelectProcedure: (procedureId: string) => void;
}

const macroLabel: Record<string, string> = {
  estrategico: 'Estratégico',
  misional: 'Misional',
  apoyo: 'Apoyo',
  evaluacion_control: 'Evaluación',
};

export function Sidebar({ data, query, selectedProcedureId, onSelectProcedure }: SidebarProps) {
  const normalizedQuery = query.trim().toLowerCase();

  return (
    <aside className={styles.sidebar}>
      <section className={styles.panelBlock}>
        <div className={styles.kicker}>Explorador</div>
        <details className={styles.rootDetails} open>
          <summary className={styles.rootSummary}>
            <span className={styles.summaryIcon}><FolderTree size={17} /></span>
            <span>Macroprocesos</span>
            <b>{data.macroprocesses.length}</b>
          </summary>

          <div className={styles.tree}>
            {data.macroprocesses.map((macro) => (
              <details key={macro.id} className={styles.macroGroup} open={macro.type === 'estrategico'}>
                <summary className={styles.macroSummary}>
                  <span className={`${styles.dot} ${styles[`dot_${macro.type}`]}`} />
                  <span>{macro.name}</span>
                  <small>{macro.code}</small>
                  <ChevronDown size={15} />
                </summary>

                {macro.processes.map((process) => {
                  const procedures = process.procedures.filter((procedure) => {
                    if (!normalizedQuery) return true;
                    return [procedure.code, procedure.title, procedure.responsibleArea, process.name, macro.name]
                      .join(' ')
                      .toLowerCase()
                      .includes(normalizedQuery);
                  });

                  if (procedures.length === 0) return null;

                  return (
                    <div className={styles.processGroup} key={process.id}>
                      <div className={styles.processHeading}>
                        <BookOpen size={15} />
                        <span>{process.name}</span>
                        <b>{procedures.length}</b>
                      </div>

                      <div className={styles.procedureList}>
                        {procedures.map((procedure) => (
                          <button
                            key={procedure.id}
                            type="button"
                            className={`${styles.procedureItem} ${selectedProcedureId === procedure.id ? styles.selected : ''}`}
                            onClick={() => onSelectProcedure(procedure.id)}
                          >
                            <span className={styles.procedureCode}>{procedure.code}</span>
                            <strong>{procedure.title}</strong>
                            <small>
                              {getStatusLabel(procedure.status)} · {procedureProgress(procedure)}% · {macroLabel[macro.type]}
                            </small>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </details>
            ))}
          </div>
        </details>
      </section>
    </aside>
  );
}
