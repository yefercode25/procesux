import { useMemo, useState, type ReactNode } from 'react';
import {
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  DatabaseZap,
  Download,
  FileText,
  GitBranch,
  Layers3,
  PanelRightClose,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Share2,
  Star,
  TableProperties,
} from 'lucide-react';
import type { CyclePhase, MacroprocessItem, ProcessItem, ProcedureItem } from '../types/manual';
import { FlowDiagram } from './FlowDiagram';
import { StepInspector } from './StepInspector';
import { getStatusLabel, procedureProgress } from '../utils/manualStats';
import { getMissingProcedureRecommendations, getProcedureRelationships, getProcedureUpdateActions, type ProcedureRelationship } from '../utils/relations';
import { exportProcedureSheet } from '../utils/governance';
import { RelationModal } from './RelationModal';
import { ProcedureUpdateModal } from './ProcedureUpdateModal';
import styles from './ProcedureDetail.module.css';

interface ProcedureDetailProps {
  macro: MacroprocessItem;
  process: ProcessItem;
  procedure: ProcedureItem;
  activeStepId: string | null;
  onSelectStep: (stepId: string) => void;
  onShareProcedure?: () => void;
  isSharedView?: boolean;
}

const validationLabel: Record<string, string> = {
  visual_validated: 'Validado visualmente',
  textual_draft: 'Borrador textual',
  pendiente: 'Pendiente de validar',
};

const phaseLabel: Record<CyclePhase, string> = {
  P: 'Planear',
  H: 'Hacer',
  V: 'Verificar',
  A: 'Actuar',
  '': 'Sin fase',
};

const tabs = ['Ficha del procedimiento'];

type PhaseFilter = 'todas' | 'P' | 'H' | 'V' | 'A' | 'sin_fase';
type RelationFilter = 'todas' | 'directa' | 'probable';

export function ProcedureDetail({ macro, process, procedure, activeStepId, onSelectStep, onShareProcedure, isSharedView = false }: ProcedureDetailProps) {
  const progress = procedureProgress(procedure);
  const currentStep = procedure.detail.flowSteps.find((step) => step.id === activeStepId) ?? procedure.detail.flowSteps[0];
  const activitySteps = procedure.detail.flowSteps.filter((step) => step.type !== 'start' && step.type !== 'end');
  const functionRelations = getProcedureRelationships(procedure);
  const [selectedRelation, setSelectedRelation] = useState<ProcedureRelationship | null>(null);
  const [isProcedureUpdateOpen, setIsProcedureUpdateOpen] = useState(false);
  const [activityQuery, setActivityQuery] = useState('');
  const [phaseFilter, setPhaseFilter] = useState<PhaseFilter>('todas');
  const [relationFilter, setRelationFilter] = useState<RelationFilter>('todas');
  const procedureUpdateActions = getProcedureUpdateActions(procedure);
  const missingProcedureRecommendations = getMissingProcedureRecommendations(procedure);
  const decisionSteps = procedure.detail.flowSteps.filter((step) => step.type === 'decision').length;
  const documentsCount = procedure.detail.documents.length + procedure.detail.formats.length;
  const controlsCount = decisionSteps + documentsCount + procedure.detail.legalRequirements.length;
  const normalizedActivityQuery = activityQuery.trim().toLowerCase();

  const filteredActivitySteps = activitySteps.filter((step) => {
    const matchesPhase = phaseFilter === 'todas'
      ? true
      : phaseFilter === 'sin_fase'
        ? !step.cycle
        : step.cycle === phaseFilter;
    if (!matchesPhase) return false;
    if (!normalizedActivityQuery) return true;
    return [step.number, step.label, step.activity, step.responsible, step.cycle]
      .join(' ')
      .toLowerCase()
      .includes(normalizedActivityQuery);
  });

  const filteredFunctionRelations = functionRelations.filter((relation) => (
    relationFilter === 'todas' ? true : relation.confidence === relationFilter
  ));

  const maxProcedureSeverity = procedureUpdateActions.some((action) => action.severity === 'critico')
    ? 'Crítico'
    : procedureUpdateActions.some((action) => action.severity === 'alto')
      ? 'Alto'
      : procedureUpdateActions.some((action) => action.severity === 'medio')
        ? 'Medio'
        : 'Bajo';

  return (
    <main className={styles.detailPanel}>
      <section className={styles.heroCard}>
        <div className={styles.heroCopy}>
          <span className={styles.breadcrumb}>{macro.name} <b>/</b> {process.name}</span>
          <h1>{procedure.title}</h1>
          <div className={styles.metaRow}>
            <span className={styles.codeChip}>Código: {procedure.code}</span>
            <span>Responsable: {procedure.responsibleArea || 'Por validar'}</span>
            <span>Estado: {getStatusLabel(procedure.status)}</span>
          </div>
          <div className={styles.heroButtonRow}>
            {onShareProcedure && !isSharedView && (
              <button type="button" className={styles.shareHeroButton} onClick={onShareProcedure}>
                <Share2 size={15} /> Compartir URL de consulta
              </button>
            )}
            <button type="button" className={styles.shareHeroButton} onClick={() => exportProcedureSheet(procedure)}>
              <Download size={15} /> Exportar ficha
            </button>
          </div>
        </div>

        <aside className={styles.metaPanel}>
          <div><Star size={16} /><span>Versión</span><strong>1.0</strong></div>
          <div><CheckCircle2 size={16} /><span>Estado</span><strong>{getStatusLabel(procedure.status)}</strong></div>
          <div><CalendarDays size={16} /><span>Actualización</span><strong>14 may 2024</strong></div>
          <div><DatabaseZap size={16} /><span>Estructura</span><strong>{progress}%</strong></div>
          <div className={styles.progressTrack}><span style={{ width: `${progress}%` }} /></div>
        </aside>
      </section>

      <section className={styles.insightGrid} aria-label="Indicadores del procedimiento">
        <article><span>Actividades</span><strong>{activitySteps.length}</strong><small>{filteredActivitySteps.length} visibles</small></article>
        <article><span>Decisiones</span><strong>{decisionSteps}</strong><small>Puntos de control</small></article>
        <article><span>Funciones vinculadas</span><strong>{functionRelations.reduce((acc, item) => acc + item.functions.length, 0)}</strong><small>{functionRelations.length} perfil(es)</small></article>
        <article><span>Evidencias</span><strong>{documentsCount}</strong><small>Docs + formatos</small></article>
        <article><span>Control mínimo</span><strong>{controlsCount}</strong><small>Soportes críticos</small></article>
      </section>

      <section className={styles.reviewCard}>
        <nav className={styles.tabs} aria-label="Secciones del procedimiento">
          {tabs.map((tab, index) => (
            <button key={tab} type="button" className={index === 0 ? styles.activeTab : ''}>{tab}</button>
          ))}
        </nav>

        <div className={styles.summaryGrid}>
          <article className={styles.infoCard}>
            <header><ClipboardList size={18} /><h2>Ficha del procedimiento</h2></header>
            <div className={styles.twoCols}>
              <div className={styles.fieldBox}><span>Objetivo</span><p>{procedure.detail.objective || 'Pendiente por registrar.'}</p></div>
              <div className={styles.fieldBox}><span>Alcance</span><p>{procedure.detail.scope || 'Pendiente por registrar.'}</p></div>
            </div>
          </article>

          <article className={styles.infoCard}>
            <header><Layers3 size={18} /><h2>Fuente y control</h2></header>
            <dl className={styles.sourceList}>
              <div><dt>Página</dt><dd>{procedure.source.pageStart ?? 'Pendiente'}</dd></div>
              <div><dt>Modo</dt><dd>{validationLabel[procedure.source.validationMode]}</dd></div>
              <div><dt>Proceso</dt><dd>{process.code}</dd></div>
              <div><dt>Relaciones</dt><dd>{functionRelations.length}</dd></div>
            </dl>
          </article>
        </div>

        <section className={styles.updateProposalCard}>
          <div>
            <span>Actualización normativa y operativa</span>
            <h2>Propuesta integral de ajuste</h2>
            <p>Incluye flujo recomendado, cambios sugeridos, soporte técnico/normativo e impacto. Se conserva compacto para revisar sin perder contexto del procedimiento.</p>
          </div>
          <div className={styles.updateProposalActions}>
            <strong>Nivel {maxProcedureSeverity}</strong>
            <button type="button" onClick={() => setIsProcedureUpdateOpen(true)}>Abrir propuesta</button>
          </div>
        </section>

        <section className={styles.flowSection}>
          <header className={styles.sectionHeader}>
            <div><GitBranch size={18} /><div><h2>Flujo interactivo actual</h2><p>Seleccione un paso para consultar responsable, actividad y validaciones.</p></div></div>
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
            <div><DatabaseZap size={18} /><h2>Relación con manual de funciones ({filteredFunctionRelations.length})</h2></div>
            <div className={styles.filterBarCompact}>
              <SlidersHorizontal size={14} />
              <select value={relationFilter} onChange={(event) => setRelationFilter(event.target.value as RelationFilter)} aria-label="Filtrar relaciones por confianza">
                <option value="todas">Todas</option>
                <option value="directa">Directas</option>
                <option value="probable">Probables</option>
              </select>
            </div>
          </header>

          {filteredFunctionRelations.length > 0 ? (
            <div className={styles.relationGrid}>
              {filteredFunctionRelations.map((relation) => (
                <article key={relation.profile.id} className={styles.relationCard}>
                  <span>{relation.confidence === 'directa' ? 'Relación directa estricta' : 'Coincidencia probable'}</span>
                  <h3>{relation.profile.denomination} · {relation.profile.functionalArea}</h3>
                  <p>{relation.reason}</p>
                  <div className={styles.relationMeta}><b>{relation.functions.length} función(es)</b><em>Nivel {relation.criticality}</em></div>
                  <button type="button" className={styles.relationButton} onClick={() => setSelectedRelation(relation)}>Ver funciones y recomendación</button>
                </article>
              ))}
            </div>
          ) : (
            <p className={styles.alertText}>⚠ Este procedimiento no tiene perfil ni función relacionada con el filtro aplicado.</p>
          )}
        </section>

        <section className={styles.matrixCard}>
          <header className={styles.sectionHeaderCompact}>
            <div><TableProperties size={18} /><h2>Matriz de actividades ({filteredActivitySteps.length})</h2></div>
            <div className={styles.headerActions}>
              <label className={styles.tableSearch}><Search size={14} /><input value={activityQuery} onChange={(event) => setActivityQuery(event.target.value)} placeholder="Buscar actividad o responsable" /></label>
              <select value={phaseFilter} onChange={(event) => setPhaseFilter(event.target.value as PhaseFilter)} aria-label="Filtrar por fase">
                <option value="todas">Todas las fases</option>
                <option value="P">Planear</option>
                <option value="H">Hacer</option>
                <option value="V">Verificar</option>
                <option value="A">Actuar</option>
                <option value="sin_fase">Sin fase</option>
              </select>
              <button type="button" onClick={() => { setActivityQuery(''); setPhaseFilter('todas'); }}><RotateCcw size={14} /> Limpiar</button>
              <button type="button"><Download size={14} /> Exportar</button>
            </div>
          </header>

          {filteredActivitySteps.length > 0 ? (
            <div className={styles.activityTableWrap}>
              <table className={styles.activityTable}>
                <thead><tr><th>No.</th><th>Ciclo</th><th>Actividad</th><th>Responsable</th></tr></thead>
                <tbody>
                  {filteredActivitySteps.map((step) => (
                    <tr key={step.id} className={currentStep?.id === step.id ? styles.rowActive : ''} onClick={() => onSelectStep(step.id)}>
                      <td>{step.number}</td>
                      <td>{step.cycle ? <b title={phaseLabel[step.cycle]} className={`${styles.phaseMini} ${styles[`phase_${step.cycle.toLowerCase()}`]}`}>{step.cycle}</b> : '—'}</td>
                      <td>{step.activity || step.label}</td>
                      <td>{step.responsible || 'Pendiente'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <p className={styles.mutedText}>No hay actividades que coincidan con los filtros actuales.</p>}
        </section>

        <section className={styles.bottomGrid}>
          <AccordionCard title="Documentos" icon={<FileText size={18} />} count={procedure.detail.documents.length}><ChipList items={procedure.detail.documents} empty="Sin documentos cargados." /></AccordionCard>
          <AccordionCard title="Formatos" icon={<ClipboardList size={18} />} count={procedure.detail.formats.length}><ChipList items={procedure.detail.formats} empty="Sin formatos cargados." /></AccordionCard>
          <AccordionCard title="Definiciones" icon={<BookOpenCheck size={18} />} count={procedure.detail.definitions.length} wide><TextList items={procedure.detail.definitions} empty="Sin definiciones cargadas." /></AccordionCard>
          <AccordionCard title="Disposiciones" icon={<PanelRightClose size={18} />} count={procedure.detail.generalDispositions.length} wide><TextList items={procedure.detail.generalDispositions} empty="Sin disposiciones cargadas." /></AccordionCard>
        </section>
      </section>
      <RelationModal procedure={procedure} relation={selectedRelation} onClose={() => setSelectedRelation(null)} />
      <ProcedureUpdateModal procedure={procedure} actions={procedureUpdateActions} missingRecommendations={missingProcedureRecommendations} isOpen={isProcedureUpdateOpen} onClose={() => setIsProcedureUpdateOpen(false)} />
    </main>
  );
}

function AccordionCard({ title, icon, count, children, wide = false }: { title: string; icon: ReactNode; count: number; children: ReactNode; wide?: boolean }) {
  return (
    <details className={`${styles.accordionCard} ${wide ? styles.wide : ''}`} open>
      <summary><span>{icon}{title} <b>({count})</b></span><ChevronDown size={17} /></summary>
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
