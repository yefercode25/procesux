import { BookOpen, ChevronDown, FolderTree, LibraryBig } from 'lucide-react';
import type { FunctionProfile, FunctionsManualData, ManualData, ManualModule } from '../types/manual';
import { getStatusLabel, procedureProgress } from '../utils/manualStats';
import { countLinkedFunctions } from '../utils/relations';
import styles from './Sidebar.module.css';

interface SidebarProps {
  data: ManualData;
  functionsData: FunctionsManualData;
  query: string;
  selectedProcedureId: string;
  selectedProfileId: string;
  module: ManualModule;
  onSelectProcedure: (procedureId: string) => void;
  onSelectProfile: (profileId: string) => void;
}

const macroLabel: Record<string, string> = {
  estrategico: 'Estratégico',
  misional: 'Misional',
  apoyo: 'Apoyo',
  evaluacion_control: 'Evaluación',
};

const levelLabel: Record<FunctionProfile['level'], string> = {
  directivo: 'Directivo',
  profesional: 'Profesional',
  tecnico: 'Técnico',
  asistencial: 'Asistencial',
};

export function Sidebar({ data, functionsData, query, selectedProcedureId, selectedProfileId, module, onSelectProcedure, onSelectProfile }: SidebarProps) {
  const normalizedQuery = query.trim().toLowerCase();

  return (
    <aside className={styles.sidebar}>
      {module === 'processes' ? (
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
      ) : (
        <section className={styles.panelBlock}>
          <div className={styles.kicker}>Explorador</div>
          <details className={styles.rootDetails} open>
            <summary className={styles.rootSummary}>
              <span className={styles.summaryIcon}><LibraryBig size={17} /></span>
              <span>Manual de funciones</span>
              <b>{functionsData.profiles.length}</b>
            </summary>

            <div className={styles.tree}>
              {(['directivo', 'profesional', 'tecnico', 'asistencial'] as FunctionProfile['level'][]).map((level) => {
                const profiles = functionsData.profiles.filter((profile) => {
                  const matchesLevel = profile.level === level;
                  if (!matchesLevel) return false;
                  if (!normalizedQuery) return true;
                  return [profile.denomination, profile.dependency, profile.functionalArea, profile.code, profile.grade]
                    .join(' ')
                    .toLowerCase()
                    .includes(normalizedQuery);
                });

                if (profiles.length === 0) return null;

                return (
                  <details key={level} className={styles.macroGroup} open>
                    <summary className={styles.macroSummary}>
                      <span className={`${styles.dot} ${level === 'directivo' ? styles.dot_estrategico : level === 'profesional' ? styles.dot_misional : level === 'tecnico' ? styles.dot_apoyo : styles.dot_evaluacion_control}`} />
                      <span>{levelLabel[level]}</span>
                      <small>{profiles.length}</small>
                      <ChevronDown size={15} />
                    </summary>

                    <div className={styles.processGroup}>
                      <div className={styles.procedureList}>
                        {profiles.map((profile) => (
                          <button
                            key={profile.id}
                            type="button"
                            className={`${styles.procedureItem} ${selectedProfileId === profile.id ? styles.selected : ''}`}
                            onClick={() => onSelectProfile(profile.id)}
                          >
                            <span className={styles.procedureCode}>{profile.code} · Grado {profile.grade}</span>
                            <strong>{profile.denomination}</strong>
                            <small>{profile.functionCount} funciones · {profile.positions} cargo(s) · {countLinkedFunctions(profile)} relacionadas</small>
                          </button>
                        ))}
                      </div>
                    </div>
                  </details>
                );
              })}
            </div>
          </details>
        </section>
      )}
    </aside>
  );
}
