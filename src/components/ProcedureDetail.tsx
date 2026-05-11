import type { ReactNode } from 'react';
import { BookOpenCheck, CalendarDays, CheckCircle2, ChevronDown, ClipboardList, DatabaseZap, Download, FileText, Filter, GitBranch, Layers3, PanelRightClose, Star, TableProperties } from 'lucide-react';
import type { MacroprocessItem, ProcessItem, ProcedureItem } from '../types/manual';
import { FlowDiagram } from './FlowDiagram';
import { StepInspector } from './StepInspector';
import { getStatusLabel, procedureProgress } from '../utils/manualStats';
import styles from './ProcedureDetail.module.css';

interface ProcedureDetailProps {
  macro: MacroprocessItem;
  process: ProcessItem;
  procedure: ProcedureItem;
  activeStepId: string | null;
  onSelectStep: (stepId: string) => void;
}

const validationLabel: Record<string, string> = {
  visual_validated: 'Validado visualmente',
  textual_draft: 'Borrador textual',
  pendiente: 'Pendiente de validar',
};

const tabs = [
  'Ficha del procedimiento',
];

export function ProcedureDetail({ macro, process, procedure, activeStepId, onSelectStep }: ProcedureDetailProps) {
  const progress = procedureProgress(procedure);
  const currentStep = procedure.detail.flowSteps.find((step) => step.id === activeStepId) ?? procedure.detail.flowSteps[0];
  const activitySteps = procedure.detail.flowSteps.filter((step) => step.type !== 'start' && step.type !== 'end');

  return (
    <main className={styles.detailPanel}>
      <section className={styles.heroCard}>
        <div className={styles.heroCopy}>
          <span className={styles.breadcrumb}>{macro.name} <b>/</b> {process.name}</span>
          <h1>{procedure.title}</h1>
          <div className={styles.metaRow}>
            <span className={styles.codeChip}>Código: {procedure.code}</span>
            <span>Responsable: {procedure.responsibleArea}</span>
            <span>Estado: {getStatusLabel(procedure.status)}</span>
          </div>
        </div>

        <aside className={styles.metaPanel}>
          <div>
            <Star size={16} />
            <span>Versión</span>
            <strong>1.0</strong>
          </div>
          <div>
            <CheckCircle2 size={16} />
            <span>Estado</span>
            <strong>{getStatusLabel(procedure.status)}</strong>
          </div>
          <div>
            <CalendarDays size={16} />
            <span>Última actualización</span>
            <strong>14 may 2024</strong>
          </div>
          <div>
            <DatabaseZap size={16} />
            <span>Estructura del proceso</span>
            <strong>{progress}% estructurado</strong>
          </div>
          <div className={styles.progressTrack}><span style={{ width: `${progress}%` }} /></div>
        </aside>
      </section>

      <section className={styles.reviewCard}>
        <nav className={styles.tabs} aria-label="Secciones del procedimiento">
          {tabs.map((tab, index) => (
            <button key={tab} type="button" className={index === 0 ? styles.activeTab : ''}>
              {tab}{tab === 'Documentos' ? ` (${procedure.detail.documents.length})` : ''}{tab === 'Formatos' ? ` (${procedure.detail.formats.length})` : ''}
            </button>
          ))}
        </nav>

        <div className={styles.summaryGrid}>
          <article className={styles.infoCard}>
            <header><ClipboardList size={18} /><h2>Ficha del procedimiento</h2></header>
            <div className={styles.twoCols}>
              <div className={styles.fieldBox}>
                <span>Objetivo</span>
                <p>{procedure.detail.objective || 'Pendiente por registrar.'}</p>
              </div>
              <div className={styles.fieldBox}>
                <span>Alcance</span>
                <p>{procedure.detail.scope || 'Pendiente por registrar.'}</p>
              </div>
            </div>
          </article>

          <article className={styles.infoCard}>
            <header><Layers3 size={18} /><h2>Fuente</h2></header>
            <dl className={styles.sourceList}>
              <div><dt>Página</dt><dd>{procedure.source.pageStart ?? 'Pendiente'}</dd></div>
              <div><dt>Modo</dt><dd>{validationLabel[procedure.source.validationMode]}</dd></div>
              <div><dt>Proceso</dt><dd>{process.code}</dd></div>
            </dl>
          </article>
        </div>

        <section className={styles.flowSection}>
          <header className={styles.sectionHeader}>
            <div>
              <GitBranch size={18} />
              <div>
                <h2>Diagrama de flujo interactivo</h2>
                <p>Seleccione un paso para consultar el detalle, responsable y validaciones.</p>
              </div>
            </div>
            <div className={styles.legendInline}>
              <span><i className={styles.legendActivity} /> Actividad</span>
              <span><i className={styles.legendDecision} /> Decisión</span>
              <span><i className={styles.legendTerminal} /> Inicio / Fin</span>
            </div>
          </header>

          <div className={styles.flowLayout}>
            <FlowDiagram steps={procedure.detail.flowSteps} activeStepId={activeStepId} onSelectStep={onSelectStep} />
            <StepInspector steps={procedure.detail.flowSteps} activeStepId={activeStepId} onSelectStep={onSelectStep} />
          </div>
        </section>

        <section className={styles.matrixCard}>
          <header className={styles.sectionHeaderCompact}>
            <div>
              <TableProperties size={18} />
              <h2>Matriz de actividades ({activitySteps.length})</h2>
            </div>
            <div className={styles.headerActions}>
              <button type="button"><Filter size={14} /> Filtrar</button>
              <button type="button"><Download size={14} /> Exportar</button>
            </div>
          </header>

          {activitySteps.length > 0 ? (
            <div className={styles.activityTableWrap}>
              <table className={styles.activityTable}>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Ciclo</th>
                    <th>Actividad</th>
                    <th>Responsable</th>
                  </tr>
                </thead>
                <tbody>
                  {activitySteps.map((step) => (
                    <tr key={step.id} className={currentStep?.id === step.id ? styles.rowActive : ''} onClick={() => onSelectStep(step.id)}>
                      <td>{step.number}</td>
                      <td>{step.cycle ? <b className={`${styles.phaseMini} ${styles[`phase_${step.cycle.toLowerCase()}`]}`}>{step.cycle}</b> : '—'}</td>
                      <td>{step.activity || step.label}</td>
                      <td>{step.responsible || 'Pendiente'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <p className={styles.mutedText}>La matriz se activará cuando este procedimiento tenga pasos cargados.</p>}
        </section>

        <section className={styles.bottomGrid}>
          <AccordionCard title="Documentos" icon={<FileText size={18} />} count={procedure.detail.documents.length}>
            <ChipList items={procedure.detail.documents} empty="Sin documentos cargados." />
          </AccordionCard>

          <AccordionCard title="Formatos" icon={<ClipboardList size={18} />} count={procedure.detail.formats.length}>
            <ChipList items={procedure.detail.formats} empty="Sin formatos cargados." />
          </AccordionCard>

          <AccordionCard title="Definiciones" icon={<BookOpenCheck size={18} />} count={procedure.detail.definitions.length} wide>
            <TextList items={procedure.detail.definitions} empty="Sin definiciones cargadas." />
          </AccordionCard>

          <AccordionCard title="Disposiciones" icon={<PanelRightClose size={18} />} count={procedure.detail.generalDispositions.length} wide>
            <TextList items={procedure.detail.generalDispositions} empty="Sin disposiciones cargadas." />
          </AccordionCard>
        </section>
      </section>
    </main>
  );
}

function AccordionCard({ title, icon, count, children, wide = false }: { title: string; icon: ReactNode; count: number; children: ReactNode; wide?: boolean }) {
  return (
    <details className={`${styles.accordionCard} ${wide ? styles.wide : ''}`} open>
      <summary>
        <span>{icon}{title} <b>({count})</b></span>
        <ChevronDown size={17} />
      </summary>
      <div className={styles.accordionBody}>{children}</div>
    </details>
  );
}

function ChipList({ items, empty }: { items: string[]; empty: string }) {
  if (items.length === 0) return <p className={styles.mutedText}>{empty}</p>;
  return <div className={styles.chipList}>{items.map((item) => <span key={item}>{item}</span>)}</div>;
}

function TextList({ items, empty }: { items: string[]; empty: string }) {
  if (items.length === 0) return <p className={styles.mutedText}>{empty}</p>;
  return <ul className={styles.textList}>{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}
