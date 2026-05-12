import { memo, useCallback, useDeferredValue, useEffect, useMemo, useState, useTransition, type ReactNode } from 'react';
import {
  Archive,
  Activity,
  AlertTriangle,
  BadgeCheck,
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Download,
  Eye,
  FileCheck2,
  FilePenLine,
  FileSpreadsheet,
  FileText,
  GitCompare,
  Gauge,
  History,
  Layers3,
  LibraryBig,
  ListChecks,
  MessageSquareText,
  Route,
  Scale,
  Network,
  Printer,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  TableProperties,
  Target,
  Workflow,
  X,
} from 'lucide-react';
import { allProcedures } from '../data/manualData';
import { allFunctionProfiles } from '../data/functionsManualData';
import type { FunctionProfile, ProcedureItem } from '../types/manual';
import { buildProfileLoad, buildProcedureIntelligence, coverageLabel, riskLabel, type IntelligenceRisk } from '../utils/intelligence';
import {
  buildAdministrativeActDraft,
  buildAuditChecklist,
  buildChangeTrace,
  buildCriticalityClassification,
  buildDependencyMap,
  buildDuplicateFindings,
  buildEvidenceModel,
  buildExecutiveSummary,
  buildMaturityAssessment,
  buildNormativeLibrary,
  buildPrioritizedNormativeUpdates,
  buildProcedureIndicatorSuggestions,
  buildProcedureSheet,
  buildQualityIndicators,
  buildRaciForProcedure,
  buildRelationConfidenceMatrix,
  buildResponsibilityInconsistencies,
  buildUpdatePlan,
  buildValidationChecklist,
  exportAdministrativeActDraft,
  exportProcedureSheet,
  exportProfileSheet,
  exportRelationshipMatrix,
  exportUpdatePlan,
  exportValidationChecklist,
  exportMeetingMinuteDraft,
  buildChangeImpactModel,
  buildUpdateSimulationScenarios,
  buildGlobalBeforeAfter,
  buildDocumentQualityValidator,
  buildInstitutionalGlossary,
  buildInstitutionalFaqs,
  buildInstitutionalTags,
  buildUpdateEvidenceControl,
  buildMeetingMinuteDraft,
  buildPublicationReadiness,
  buildRoleControlModel,
  buildInstitutionalTimeline,
  buildDependencySummary,
  buildUpdateAssistantSteps,
  manualVersions,
  semanticSearch,
  type AdministrativeActDraft,
  type ApprovalStage,
  type ChangeTraceItem,
  type InstitutionalProcedureSheet,
  type NormativeLibraryItem,
  type RaciRole,
  type SemanticSearchResult,
  type UpdatePlanItem,
} from '../utils/governance';
import { getMissingProcedureRecommendations, getProcedureUpdateActions, getProfileFunctionUpdateActions, getProfileUpdateFindings } from '../utils/relations';
import styles from './GovernanceCenter.module.css';

interface GovernanceCenterProps {
  onSelectProcedure: (procedureId: string) => void;
  onSelectProfile: (profileId: string) => void;
}

type TabId = 'plan' | 'herramientas' | 'fichas' | 'indicadores' | 'trazabilidad' | 'confianza' | 'evidencias' | 'priorizacion' | 'validacion' | 'indicadoresProc' | 'criticidad' | 'dependencias' | 'inconsistencias' | 'acto' | 'madurez' | 'ejecutiva' | 'duplicidades' | 'normativa' | 'auditoria' | 'raci' | 'buscador' | 'versiones' | 'publico';

const tabs: { id: TabId; label: string; icon: typeof ClipboardCheck }[] = [
  { id: 'plan', label: 'Plan de actualización', icon: ClipboardCheck },
  { id: 'herramientas', label: 'Herramientas avanzadas', icon: SlidersHorizontal },
  { id: 'fichas', label: 'Fichas institucionales', icon: FileCheck2 },
  { id: 'indicadores', label: 'Indicadores', icon: Layers3 },
  { id: 'trazabilidad', label: 'Trazabilidad', icon: History },
  { id: 'confianza', label: 'Confianza relación', icon: Target },
  { id: 'evidencias', label: 'Evidencias mínimas', icon: ClipboardList },
  { id: 'priorizacion', label: 'Prioridad normativa', icon: AlertTriangle },
  { id: 'validacion', label: 'Checklist calidad', icon: CheckCircle2 },
  { id: 'indicadoresProc', label: 'Indicadores por proceso', icon: Activity },
  { id: 'criticidad', label: 'Criticidad', icon: Gauge },
  { id: 'dependencias', label: 'Dependencias cruzadas', icon: Route },
  { id: 'inconsistencias', label: 'Inconsistencias', icon: Scale },
  { id: 'acto', label: 'Acto administrativo', icon: FilePenLine },
  { id: 'madurez', label: 'Madurez', icon: Workflow },
  { id: 'ejecutiva', label: 'Vista ejecutiva', icon: BookOpenCheck },
  { id: 'duplicidades', label: 'Duplicidades', icon: GitCompare },
  { id: 'normativa', label: 'Normativa', icon: LibraryBig },
  { id: 'auditoria', label: 'Modo auditoría', icon: ShieldCheck },
  { id: 'raci', label: 'Matriz RACI', icon: Network },
  { id: 'buscador', label: 'Buscador semántico', icon: Search },
  { id: 'versiones', label: 'Versionamiento', icon: Archive },
  { id: 'publico', label: 'Modo público', icon: Eye },
];

const approvalStages: { id: ApprovalStage; label: string; description: string }[] = [
  { id: 'propuesto', label: 'Propuesto', description: 'Cambio identificado y documentado técnicamente.' },
  { id: 'dependencia', label: 'Revisado por dependencia', description: 'La dependencia valida pertinencia, responsable y evidencias.' },
  { id: 'juridica', label: 'Validado jurídicamente', description: 'Se verifica competencia, norma y redacción institucional.' },
  { id: 'despacho', label: 'Aprobado por despacho', description: 'Se aprueba para acto administrativo o adopción interna.' },
  { id: 'acto_administrativo', label: 'Pendiente de acto administrativo', description: 'Se proyecta decreto, resolución o documento de adopción.' },
  { id: 'publicado', label: 'Publicado', description: 'Cambio incorporado en versión final y publicado.' },
];

const priorityClass = (priority: IntelligenceRisk) => styles[`risk_${priority}`] ?? '';
const raciName: Record<RaciRole, string> = { R: 'Responsable', A: 'Aprueba', C: 'Consultado', I: 'Informado' };

const procedureById = new Map(allProcedures.map(({ procedure }) => [procedure.id, procedure]));
const procedureByCode = new Map(allProcedures.map(({ procedure }) => [procedure.code.toLowerCase(), procedure]));
const profileById = new Map(allFunctionProfiles.map((profile) => [profile.id, profile]));

function pickProcedure(id: string) {
  return procedureById.get(id) ?? allProcedures[0]?.procedure;
}

function pickProfile(id: string) {
  return profileById.get(id) ?? allFunctionProfiles[0];
}

function copyToClipboard(value: string) {
  navigator.clipboard?.writeText(value).catch(() => undefined);
}

export function GovernanceCenter({ onSelectProcedure, onSelectProfile }: GovernanceCenterProps) {
  const intelligenceRows = useMemo(() => buildProcedureIntelligence(), []);
  const plan = useMemo(() => buildUpdatePlan(), []);
  const quality = useMemo(() => buildQualityIndicators(), []);
  const duplicates = useMemo(() => buildDuplicateFindings(), []);
  const norms = useMemo(() => buildNormativeLibrary(), []);
  const audit = useMemo(() => buildAuditChecklist(), []);
  const profileLoad = useMemo(() => buildProfileLoad(intelligenceRows), [intelligenceRows]);
  const missing = useMemo(() => getMissingProcedureRecommendations(), []);
  const trace = useMemo(() => buildChangeTrace(), []);
  const confidence = useMemo(() => buildRelationConfidenceMatrix(), []);
  const evidenceModel = useMemo(() => buildEvidenceModel(), []);
  const prioritizedUpdates = useMemo(() => buildPrioritizedNormativeUpdates(), []);
  const validationChecklist = useMemo(() => buildValidationChecklist(), []);
  const procedureIndicators = useMemo(() => buildProcedureIndicatorSuggestions(), []);
  const criticality = useMemo(() => buildCriticalityClassification(), []);
  const dependencies = useMemo(() => buildDependencyMap(), []);
  const inconsistencies = useMemo(() => buildResponsibilityInconsistencies(), []);
  const actDraft = useMemo(() => buildAdministrativeActDraft(), []);
  const maturity = useMemo(() => buildMaturityAssessment(), []);
  const executive = useMemo(() => buildExecutiveSummary(), []);
  const changeImpact = useMemo(() => buildChangeImpactModel(), []);
  const simulations = useMemo(() => buildUpdateSimulationScenarios(), []);
  const beforeAfter = useMemo(() => buildGlobalBeforeAfter(), []);
  const documentQuality = useMemo(() => buildDocumentQualityValidator(), []);
  const glossary = useMemo(() => buildInstitutionalGlossary(), []);
  const faqs = useMemo(() => buildInstitutionalFaqs(), []);
  const institutionalTags = useMemo(() => buildInstitutionalTags(), []);
  const updateEvidence = useMemo(() => buildUpdateEvidenceControl(), []);
  const meetingMinute = useMemo(() => buildMeetingMinuteDraft(), []);
  const publication = useMemo(() => buildPublicationReadiness(), []);
  const roles = useMemo(() => buildRoleControlModel(), []);
  const timeline = useMemo(() => buildInstitutionalTimeline(), []);
  const dependencySummary = useMemo(() => buildDependencySummary(), []);
  const assistantSteps = useMemo(() => buildUpdateAssistantSteps(), []);

  const [tab, setTab] = useState<TabId>('plan');
  const [planStatus, setPlanStatus] = useState('todos');
  const [planPriority, setPlanPriority] = useState<'todos' | IntelligenceRisk>('todos');
  const [sheetProcedureId, setSheetProcedureId] = useState(allProcedures[0]?.procedure.id ?? '');
  const [sheetProfileId, setSheetProfileId] = useState(allFunctionProfiles[0]?.id ?? '');
  const [raciProcedureId, setRaciProcedureId] = useState(allProcedures[0]?.procedure.id ?? '');
  const [semanticQuery, setSemanticQuery] = useState('');
  const [debouncedSemanticQuery, setDebouncedSemanticQuery] = useState('');
  const [selectedNorm, setSelectedNorm] = useState<NormativeLibraryItem | null>(null);
  const [selectedPlanItem, setSelectedPlanItem] = useState<UpdatePlanItem | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedSemanticQuery(semanticQuery.trim()), 220);
    return () => window.clearTimeout(timeout);
  }, [semanticQuery]);

  const deferredSemanticQuery = useDeferredValue(debouncedSemanticQuery);
  const selectedProcedure = useMemo(() => pickProcedure(sheetProcedureId), [sheetProcedureId]);
  const selectedProfile = useMemo(() => pickProfile(sheetProfileId), [sheetProfileId]);
  const selectedRaciProcedure = useMemo(() => pickProcedure(raciProcedureId), [raciProcedureId]);
  const selectedSheet = useMemo(
    () => (tab === 'fichas' && selectedProcedure ? buildProcedureSheet(selectedProcedure) : null),
    [tab, selectedProcedure],
  );
  const semanticResults = useMemo(
    () => (tab === 'buscador' ? semanticSearch(deferredSemanticQuery) : []),
    [tab, deferredSemanticQuery],
  );
  const filteredPlan = useMemo(() => plan.filter((item) => {
    if (planStatus !== 'todos' && item.status !== planStatus) return false;
    if (planPriority !== 'todos' && item.priority !== planPriority) return false;
    return true;
  }), [plan, planPriority, planStatus]);
  const statusOptions = useMemo(() => Array.from(new Set(plan.map((item) => item.status))).sort(), [plan]);
  const auditRows = useMemo(() => (
    tab === 'auditoria'
      ? audit.slice(0, 150).map((item) => ({ item, procedure: procedureById.get(item.procedureId) }))
      : []
  ), [audit, tab]);
  const raciItems = useMemo(
    () => (tab === 'raci' && selectedRaciProcedure ? buildRaciForProcedure(selectedRaciProcedure) : []),
    [tab, selectedRaciProcedure],
  );
  const handleTabChange = useCallback((nextTab: TabId) => {
    startTransition(() => setTab(nextTab));
  }, [startTransition]);

  return (
    <main className={styles.governancePage}>
      <section className={styles.heroCard}>
        <div>
          <span className={styles.kicker}><BadgeCheck size={16} /> Centro de gobernanza institucional</span>
          <h1>Actualización, auditoría y aprobación de manuales</h1>
          <p>Convierte las relaciones entre procesos y funciones en un plan ejecutable: RACI, fichas institucionales, normativa, versiones, modo auditoría, exportables y consulta pública.</p>
        </div>
        <div className={styles.heroActions}>
          <button type="button" onClick={exportRelationshipMatrix}><FileSpreadsheet size={16} /> Matriz Excel</button>
          <button type="button" onClick={exportUpdatePlan}><Download size={16} /> Plan Excel</button>
          <button type="button" onClick={() => window.print()}><Printer size={16} /> Imprimir</button>
        </div>
      </section>

      <section className={styles.metricGrid}>
        <Metric label="Procedimientos" value={quality.totalProcedures} note="manual cargado" />
        <Metric label="Cubiertos" value={quality.covered} note={coverageLabel.cubierto} />
        <Metric label="Parciales" value={quality.partial} note={coverageLabel.parcial} />
        <Metric label="Sin soporte" value={quality.uncovered} note="brecha funcional" />
        <Metric label="Riesgo alto/crítico" value={quality.highRisk} note="prioridad" />
        <Metric label="Módulos sugeridos" value={quality.missingProcedures} note="faltantes" />
      </section>

      <nav className={styles.tabBar} aria-label="Módulos de gobernanza">
        {tabs.map((item) => {
          const Icon = item.icon;
          return <button key={item.id} type="button" className={tab === item.id ? styles.activeTab : ''} onClick={() => handleTabChange(item.id)}><Icon size={15} /> {item.label}</button>;
        })}
      </nav>


      {tab === 'herramientas' && (
        <section className={styles.panelCard}>
          <header className={styles.panelHeader}>
            <div><SlidersHorizontal size={18} /><h2>Herramientas profesionales de actualización institucional</h2></div>
            <button type="button" onClick={exportMeetingMinuteDraft}><Download size={14} /> Exportar minuta</button>
          </header>
          <p className={styles.lead}>Este bloque agrupa funciones avanzadas para pasar del diagnóstico a la decisión, adopción, publicación y seguimiento de los manuales.</p>

          <div className={styles.advancedGrid}>
            <article className={styles.advancedSection}>
              <h3><Target size={16} /> Motor de impacto del cambio</h3>
              <div className={styles.compactList}>{changeImpact.slice(0, 8).map((item) => <button key={item.procedureId} type="button" onClick={() => onSelectProcedure(item.procedureId)}><b>{item.code}</b><span>{item.summary}</span><small>{item.leader} · apoyo: {item.supportDependencies.join(', ') || 'por definir'}</small></button>)}</div>
            </article>

            <article className={styles.advancedSection}>
              <h3><GitCompare size={16} /> Simulador de actualización</h3>
              <div className={styles.simulationStack}>{simulations.map((scenario) => <section key={scenario.id} className={styles.simulationCard}><span className={`${styles.badge} ${priorityClass(scenario.risk)}`}>{riskLabel[scenario.risk]}</span><h4>{scenario.title}</h4><p>{scenario.question}</p><ListBlock title="Efectos esperados" items={scenario.effects} /><ListBlock title="Acciones requeridas" items={scenario.requiredActions} /></section>)}</div>
            </article>

            <article className={styles.advancedSection}>
              <h3><GitCompare size={16} /> Antes y después global</h3>
              <div className={styles.beforeAfterGrid}>{beforeAfter.map((item) => <section key={item.id}><span className={`${styles.badge} ${priorityClass(item.priority)}`}>{riskLabel[item.priority]}</span><h4>{item.scope}</h4><p><b>Actual:</b> {item.currentState}</p><p><b>Propuesto:</b> {item.proposedState}</p><small>{item.impact}</small></section>)}</div>
            </article>

            <article className={styles.advancedSection}>
              <h3><ClipboardCheck size={16} /> Validador de calidad documental</h3>
              <div className={styles.qualityList}>{documentQuality.slice(0, 10).map((item) => <button key={item.procedureId} type="button" onClick={() => onSelectProcedure(item.procedureId)}><strong>{item.score}/100</strong><b>{item.code} · {item.title}</b><span>Falta: {item.missing.slice(0, 5).join(', ') || 'Sin faltantes críticos'}</span></button>)}</div>
            </article>

            <article className={styles.advancedSection}>
              <h3><BookOpenCheck size={16} /> Glosario institucional</h3>
              <div className={styles.glossaryGrid}>{glossary.map((item) => <section key={item.term}><b>{item.term}</b><span>{item.category}</span><p>{item.definition}</p><small>{item.example}</small></section>)}</div>
            </article>

            <article className={styles.advancedSection}>
              <h3><MessageSquareText size={16} /> Preguntas frecuentes institucionales</h3>
              <div className={styles.faqList}>{faqs.map((faq) => <section key={faq.question}><h4>{faq.question}</h4><p>{faq.answer}</p>{faq.targetType === 'procedimiento' && faq.targetId && <button type="button" onClick={() => onSelectProcedure(faq.targetId!)}>{faq.actionLabel}</button>}{faq.targetType === 'cargo' && faq.targetId && <button type="button" onClick={() => onSelectProfile(faq.targetId!)}>{faq.actionLabel}</button>}{!faq.targetId && <span>{faq.actionLabel}</span>}</section>)}</div>
            </article>

            <article className={styles.advancedSection}>
              <h3><Archive size={16} /> Etiquetas institucionales</h3>
              <div className={styles.tagGrid}>{institutionalTags.map((item) => <section key={item.tag}><b>{item.tag}</b><p>{item.purpose}</p><small>{item.suggestedUse}</small><div>{item.examples.map((example) => <span key={example}>{example}</span>)}</div></section>)}</div>
            </article>

            <article className={styles.advancedSection}>
              <h3><FileCheck2 size={16} /> Control de evidencias de actualización</h3>
              <div className={styles.tableWrap}><table className={styles.dataTable}><thead><tr><th>Elemento</th><th>Evidencia</th><th>Responsable</th><th>Estado</th></tr></thead><tbody>{updateEvidence.map((item) => <tr key={item.id}><td><b>{item.title}</b><small>{item.target}</small></td><td>{item.evidenceType}</td><td>{item.responsible}</td><td><span className={styles.badge}>{item.status}</span></td></tr>)}</tbody></table></div>
            </article>

            <article className={styles.advancedSection}>
              <h3><FileText size={16} /> Generador de minuta de reunión</h3>
              <div className={styles.minuteBox}><h4>{meetingMinute.title}</h4>{meetingMinute.sections.map((section) => <ListBlock key={section.title} title={section.title} items={section.items} />)}<button type="button" className={styles.primaryButton} onClick={exportMeetingMinuteDraft}><Download size={14} /> Descargar minuta</button></div>
            </article>

            <article className={styles.advancedSection}>
              <h3><Eye size={16} /> Modo publicación</h3>
              <div className={styles.publicationGrid}>{publication.slice(0, 18).map((item) => <section key={item.id} className={styles[`publish_${item.status}`]}><b>{item.title}</b><span>{item.status.replaceAll('_', ' ')}</span><p>{item.reason}</p><small>{item.nextStep}</small></section>)}</div>
            </article>

            <article className={styles.advancedSection}>
              <h3><ShieldCheck size={16} /> Control de roles</h3>
              <div className={styles.roleGrid}>{roles.map((role) => <section key={role.role}><h4>{role.role}</h4><p>{role.description}</p><b>Puede ver</b><small>{role.canSee.join(' · ')}</small><b>Puede hacer</b><small>{role.canDo.join(' · ')}</small></section>)}</div>
            </article>

            <article className={styles.advancedSection}>
              <h3><History size={16} /> Línea de tiempo institucional</h3>
              <div className={styles.timelineBox}>{timeline.map((item) => <section key={item.id} className={styles[`timeline_${item.status}`]}><span>{item.date}</span><h4>{item.title}</h4><p>{item.description}</p></section>)}</div>
            </article>

            <article className={styles.advancedSection}>
              <h3><Layers3 size={16} /> Dependencias responsables y calificación</h3>
              <div className={styles.dependencyScoreGrid}>{dependencySummary.map((item) => <section key={item.dependency}><strong>{item.score}/100</strong><h4>{item.dependency}</h4><p>{item.procedures} procedimientos · {item.profiles} cargos · {item.highRisk} riesgos altos</p><small>{item.recommendation}</small></section>)}</div>
            </article>

            <article className={styles.advancedSection}>
              <h3><Workflow size={16} /> Asistente de actualización</h3>
              <div className={styles.assistantSteps}>{assistantSteps.map((step) => <section key={step.step}><span>{step.step}</span><div><h4>{step.title}</h4><p>{step.description}</p><small><b>Salida:</b> {step.expectedOutput} · <b>Módulo:</b> {step.relatedModule}</small></div></section>)}</div>
            </article>
          </div>
        </section>
      )}

      {tab === 'plan' && (
        <section className={styles.panelCard}>
          <header className={styles.panelHeader}>
            <div><ClipboardCheck size={18} /><h2>Plan de actualización con responsables y evidencias</h2></div>
            <div className={styles.filtersInline}>
              <select value={planStatus} onChange={(event) => setPlanStatus(event.target.value)} aria-label="Estado del plan"><option value="todos">Todos los estados</option>{statusOptions.map((item) => <option key={item} value={item}>{item}</option>)}</select>
              <select value={planPriority} onChange={(event) => setPlanPriority(event.target.value as 'todos' | IntelligenceRisk)} aria-label="Prioridad"><option value="todos">Todas las prioridades</option><option value="critico">Crítico</option><option value="alto">Alto</option><option value="medio">Medio</option><option value="bajo">Bajo</option></select>
            </div>
          </header>
          <div className={styles.tableWrap}>
            <table className={styles.dataTable}>
              <thead><tr><th>Elemento</th><th>Tipo</th><th>Prioridad</th><th>Estado</th><th>Responsable</th><th>Fecha</th><th /></tr></thead>
              <tbody>{filteredPlan.map((item) => (
                <tr key={item.id}>
                  <td><b>{item.title}</b><small>{item.observation}</small></td>
                  <td>{item.targetType}</td>
                  <td><span className={`${styles.badge} ${priorityClass(item.priority)}`}>{riskLabel[item.priority]}</span></td>
                  <td>{item.status}</td>
                  <td>{item.responsible}</td>
                  <td>{item.dueDate}</td>
                  <td><button type="button" onClick={() => setSelectedPlanItem(item)}>Ver</button></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          <ApprovalWorkflow />
        </section>
      )}

      {tab === 'fichas' && selectedSheet && (
        <section className={styles.twoColumnGrid}>
          <article className={styles.panelCard}>
            <header className={styles.panelHeader}><div><FileCheck2 size={18} /><h2>Ficha institucional completa por proceso</h2></div><button type="button" onClick={() => exportProcedureSheet(selectedSheet.procedure)}><Download size={14} /> Exportar</button></header>
            <label className={styles.selectBlock}>Procedimiento<select value={sheetProcedureId} onChange={(event) => setSheetProcedureId(event.target.value)}>{allProcedures.map(({ procedure }) => <option key={procedure.id} value={procedure.id}>{procedure.code} · {procedure.title}</option>)}</select></label>
            <ProcedureSheetView sheet={selectedSheet} onSelectProcedure={onSelectProcedure} />
          </article>
          <article className={styles.panelCard}>
            <header className={styles.panelHeader}><div><FileText size={18} /><h2>Ficha institucional completa por cargo</h2></div><button type="button" onClick={() => exportProfileSheet(selectedProfile)}><Download size={14} /> Exportar</button></header>
            <label className={styles.selectBlock}>Cargo<select value={sheetProfileId} onChange={(event) => setSheetProfileId(event.target.value)}>{allFunctionProfiles.map((profile) => <option key={profile.id} value={profile.id}>{profile.denomination} · {profile.dependency}</option>)}</select></label>
            <ProfileSheetView profile={selectedProfile} onSelectProfile={onSelectProfile} />
          </article>
        </section>
      )}

      {tab === 'indicadores' && (
        <section className={styles.twoColumnGrid}>
          <article className={styles.panelCard}>
            <header className={styles.panelHeader}><div><Layers3 size={18} /><h2>Indicadores de calidad del manual</h2></div></header>
            <div className={styles.indicatorList}>
              <Indicator label="Procedimientos con función expresa" value={quality.covered} total={quality.totalProcedures} />
              <Indicator label="Procedimientos con función parcial" value={quality.partial} total={quality.totalProcedures} />
              <Indicator label="Procedimientos sin soporte funcional" value={quality.uncovered} total={quality.totalProcedures} />
              <Indicator label="Procedimientos de riesgo crítico" value={quality.criticalRisk} total={quality.totalProcedures} />
              <Indicator label="Cargos con actualización sugerida" value={quality.profilesWithUpdates} total={allFunctionProfiles.length} />
              <Indicator label="Cargos sobrecargados" value={quality.overloadedProfiles} total={allFunctionProfiles.length} />
              <Indicator label="Procesos candidatos a fusionarse" value={quality.fusionCandidates} total={quality.duplicateFindings} />
            </div>
          </article>
          <article className={styles.panelCard}>
            <header className={styles.panelHeader}><div><SlidersHorizontal size={18} /><h2>Carga funcional por cargo</h2></div></header>
            <div className={styles.loadList}>{profileLoad.slice(0, 14).map((item) => <button key={item.profile.id} type="button" onClick={() => onSelectProfile(item.profile.id)}><b>{item.profile.denomination}</b><small>{item.profile.dependency}</small><meter min="0" max="50" value={Math.min(50, item.procedureCount)} /><span>{item.procedureCount} proc. · {item.linkedFunctionCount}/{item.functionCount} func.</span></button>)}</div>
          </article>
        </section>
      )}


      {tab === 'trazabilidad' && (
        <section className={styles.panelCard}>
          <header className={styles.panelHeader}><div><History size={18} /><h2>Sistema de trazabilidad de cambios</h2></div></header>
          <div className={styles.timelineList}>{trace.map((item) => <TraceCard key={item.id} item={item} onSelectProcedure={onSelectProcedure} onSelectProfile={onSelectProfile} />)}</div>
        </section>
      )}

      {tab === 'confianza' && (
        <section className={styles.panelCard}>
          <header className={styles.panelHeader}><div><Target size={18} /><h2>Nivel de confianza de relaciones proceso ↔ cargo ↔ función</h2></div></header>
          <div className={styles.tableWrap}><table className={styles.dataTable}><thead><tr><th>Procedimiento</th><th>Cargo</th><th>Tipo</th><th>Confianza</th><th>Funciones</th><th>Validación</th></tr></thead><tbody>{confidence.slice(0, 260).map((item) => <tr key={item.id}><td><button type="button" onClick={() => onSelectProcedure(item.procedureId)}>{item.procedureCode} · {item.procedureTitle}</button></td><td>{item.profileId ? <button type="button" onClick={() => onSelectProfile(item.profileId!)}>{item.profileName}</button> : 'Sin cargo soporte'}</td><td><span className={styles.badge}>{relationKindLabel(item.relationKind)}</span></td><td><span className={`${styles.badge} ${trustClass(item.trust)}`}>{trustLabel(item.trust)} · {item.score}%</span></td><td>{item.functionNumbers.length ? item.functionNumbers.join(', ') : '—'}</td><td>{item.validationNeed}</td></tr>)}</tbody></table></div>
        </section>
      )}

      {tab === 'evidencias' && (
        <section className={styles.panelCard}>
          <header className={styles.panelHeader}><div><ClipboardList size={18} /><h2>Evidencias mínimas por procedimiento</h2></div></header>
          <div className={styles.cardGrid}>{evidenceModel.map((item) => <article key={item.procedureId} className={styles.findingCard}><h3>{item.procedureCode} · {item.title}</h3><p><b>Custodia:</b> {item.custodyResponsible}</p><p><b>Sistema:</b> {item.preservationSystem}</p><ListBlock title="Evidencias mínimas" items={item.minimumEvidences.slice(0, 4)} /><ListBlock title="Soportes obligatorios" items={item.mandatorySupports.slice(0, 4)} /><small>{item.retentionHint}</small></article>)}</div>
        </section>
      )}

      {tab === 'priorizacion' && (
        <section className={styles.panelCard}>
          <header className={styles.panelHeader}><div><AlertTriangle size={18} /><h2>Actualización normativa priorizada</h2></div></header>
          <div className={styles.tableWrap}><table className={styles.dataTable}><thead><tr><th>Prioridad</th><th>Procedimiento</th><th>Factores</th><th>Primera acción recomendada</th><th>Responsable</th></tr></thead><tbody>{prioritizedUpdates.slice(0, 120).map((item) => <tr key={item.id}><td><span className={`${styles.badge} ${priorityClass(item.priority)}`}>{riskLabel[item.priority]} · {item.score}</span></td><td><button type="button" onClick={() => onSelectProcedure(item.targetId)}>{item.targetCode} · {item.title}</button></td><td>{item.factors.join(' | ')}</td><td>{item.recommendedFirstAction}</td><td>{item.responsible}</td></tr>)}</tbody></table></div>
        </section>
      )}

      {tab === 'validacion' && (
        <section className={styles.panelCard}>
          <header className={styles.panelHeader}><div><CheckCircle2 size={18} /><h2>Checklist de validación por procedimiento</h2></div><button type="button" onClick={exportValidationChecklist}><Download size={14} /> Exportar checklist</button></header>
          <div className={styles.cardGrid}>{validationChecklist.map((item) => <article key={item.procedureId} className={styles.findingCard}><h3>{item.procedureCode} · {item.title}</h3><div className={styles.progressLine}><meter min="0" max="100" value={item.completion} /><strong>{item.completion}%</strong></div><div className={styles.checkGrid}>{item.checks.map((check) => <span key={check.label} className={`${styles.checkPill} ${styles[`check_${check.status}`]}`}>{check.label}</span>)}</div><button type="button" onClick={() => onSelectProcedure(item.procedureId)}>Abrir proceso</button></article>)}</div>
        </section>
      )}

      {tab === 'indicadoresProc' && (
        <section className={styles.panelCard}>
          <header className={styles.panelHeader}><div><Activity size={18} /><h2>Indicadores sugeridos por procedimiento</h2></div></header>
          <div className={styles.cardGrid}>{procedureIndicators.map((item) => <article key={item.procedureId} className={styles.findingCard}><h3>{item.procedureCode} · {item.title}</h3>{item.indicators.map((indicator) => <div key={indicator.name} className={styles.miniBlock}><b>{indicator.name}</b><p>{indicator.formula}</p><small>{indicator.frequency} · {indicator.owner} · {indicator.purpose}</small></div>)}</article>)}</div>
        </section>
      )}

      {tab === 'criticidad' && (
        <section className={styles.panelCard}>
          <header className={styles.panelHeader}><div><Gauge size={18} /><h2>Clasificación por criticidad institucional</h2></div></header>
          <div className={styles.cardGrid}>{criticality.map((item) => <article key={item.procedureId} className={styles.findingCard}><span className={`${styles.badge} ${priorityClass(item.risk)}`}>{riskLabel[item.risk]}</span><h3>{item.procedureCode} · {item.title}</h3><p><b>Categoría:</b> {item.category}</p><p>{item.reason}</p><button type="button" onClick={() => onSelectProcedure(item.procedureId)}>Abrir proceso</button></article>)}</div>
        </section>
      )}

      {tab === 'dependencias' && (
        <section className={styles.panelCard}>
          <header className={styles.panelHeader}><div><Route size={18} /><h2>Módulo de dependencias cruzadas</h2></div></header>
          <div className={styles.dependencyList}>{dependencies.map((item) => <article key={item.id} className={styles.dependencyCard}><button type="button" onClick={() => { const proc = findByProcedureCode(item.fromCode); if (proc) onSelectProcedure(proc.id); }}>{item.fromCode}</button><span>→</span><button type="button" onClick={() => { const proc = findByProcedureCode(item.toCode); if (proc) onSelectProcedure(proc.id); }}>{item.toCode}</button><div><b>{item.relation}</b><p>{item.impact}</p></div></article>)}</div>
        </section>
      )}

      {tab === 'inconsistencias' && (
        <section className={styles.panelCard}>
          <header className={styles.panelHeader}><div><Scale size={18} /><h2>Alertas por inconsistencias de responsable</h2></div></header>
          <div className={styles.tableWrap}><table className={styles.dataTable}><thead><tr><th>Procedimiento</th><th>Actual</th><th>Sugerido</th><th>Riesgo</th><th>Acción</th></tr></thead><tbody>{inconsistencies.map((item) => <tr key={item.id}><td><button type="button" onClick={() => onSelectProcedure(item.procedureId)}>{item.procedureCode} · {item.title}</button><small>{item.reason}</small></td><td>{item.currentResponsible}</td><td>{item.suggestedResponsible}</td><td><span className={`${styles.badge} ${priorityClass(item.severity)}`}>{riskLabel[item.severity]}</span></td><td>{item.action}</td></tr>)}</tbody></table></div>
        </section>
      )}

      {tab === 'acto' && (
        <section className={styles.panelCard}>
          <header className={styles.panelHeader}><div><FilePenLine size={18} /><h2>Modo preparar acto administrativo</h2></div><button type="button" onClick={exportAdministrativeActDraft}><Download size={14} /> Exportar borrador</button></header>
          <ActDraftView draft={actDraft} />
        </section>
      )}

      {tab === 'madurez' && (
        <section className={styles.panelCard}>
          <header className={styles.panelHeader}><div><Workflow size={18} /><h2>Control de madurez de procedimientos</h2></div></header>
          <div className={styles.cardGrid}>{maturity.map((item) => <article key={item.procedureId} className={styles.findingCard}><span className={styles.levelBadge}>Nivel {item.level}</span><h3>{item.procedureCode} · {item.title}</h3><p><b>{item.label}</b></p><p>{item.evidence}</p><p><b>Siguiente paso:</b> {item.nextStep}</p><button type="button" onClick={() => onSelectProcedure(item.procedureId)}>Abrir proceso</button></article>)}</div>
        </section>
      )}

      {tab === 'ejecutiva' && (
        <section className={styles.panelCard}>
          <header className={styles.panelHeader}><div><BookOpenCheck size={18} /><h2>Vista ejecutiva para Alcalde y Secretarios</h2></div></header>
          <div className={styles.executiveGrid}>{executive.map((item) => <article key={item.id} className={styles.executiveCard}><span className={item.tone === 'positivo' ? styles.positiveTone : priorityClass(item.tone)}>{item.title}</span><strong>{item.value}</strong><p>{item.detail}</p><b>{item.action}</b></article>)}</div>
        </section>
      )}

      {tab === 'duplicidades' && (
        <section className={styles.panelCard}>
          <header className={styles.panelHeader}><div><GitCompare size={18} /><h2>Detector de duplicidades y posibles fusiones</h2></div><span className={styles.badge}>{duplicates.length}</span></header>
          <div className={styles.cardGrid}>{duplicates.map((item) => <article key={item.id} className={styles.findingCard}><span className={`${styles.badge} ${priorityClass(item.severity)}`}>{riskLabel[item.severity]}</span><h3>{item.title}</h3><p>{item.recommendation}</p><div className={styles.codeCloud}>{item.items.map((code) => <button key={code} type="button" onClick={() => { const proc = findByProcedureCode(code); if (proc) onSelectProcedure(proc.id); }}>{code}</button>)}</div></article>)}</div>
        </section>
      )}

      {tab === 'normativa' && (
        <section className={styles.panelCard}>
          <header className={styles.panelHeader}><div><LibraryBig size={18} /><h2>Biblioteca normativa vinculada</h2></div></header>
          <div className={styles.cardGrid}>{norms.map((norm) => <button key={norm.id} type="button" className={styles.normCard} onClick={() => setSelectedNorm(norm)}><b>{norm.title}</b><span>{norm.category}</span><p>{norm.impact}</p><small>{norm.affectedProcedureCodes.length} procesos · {norm.affectedProfileIds.length} cargos</small></button>)}</div>
        </section>
      )}

      {tab === 'auditoria' && (
        <section className={styles.panelCard}>
          <header className={styles.panelHeader}><div><ShieldCheck size={18} /><h2>Modo auditoría para Control Interno</h2></div></header>
          <div className={styles.tableWrap}><table className={styles.dataTable}><thead><tr><th>Procedimiento</th><th>Riesgo</th><th>Control esperado</th><th>Evidencia mínima</th><th>Responsable</th></tr></thead><tbody>{auditRows.map(({ item, procedure }) => <tr key={item.id}><td><button type="button" onClick={() => onSelectProcedure(item.procedureId)}>{procedure?.code} · {procedure?.title}</button></td><td><span className={`${styles.badge} ${priorityClass(item.risk)}`}>{riskLabel[item.risk]}</span></td><td>{item.controlExpected}</td><td>{item.minimumEvidence}</td><td>{item.responsible}</td></tr>)}</tbody></table></div>
        </section>
      )}

      {tab === 'raci' && selectedRaciProcedure && (
        <section className={styles.panelCard}>
          <header className={styles.panelHeader}><div><Network size={18} /><h2>Matriz RACI por procedimiento</h2></div></header>
          <label className={styles.selectBlock}>Procedimiento<select value={raciProcedureId} onChange={(event) => setRaciProcedureId(event.target.value)}>{allProcedures.map(({ procedure }) => <option key={procedure.id} value={procedure.id}>{procedure.code} · {procedure.title}</option>)}</select></label>
          <div className={styles.raciGrid}>{raciItems.map((item) => <article key={item.role}><strong>{item.role}</strong><h3>{raciName[item.role]}</h3><b>{item.actor}</b><p>{item.responsibility}</p><small>{item.source}</small></article>)}</div>
        </section>
      )}

      {tab === 'buscador' && (
        <section className={styles.panelCard}>
          <header className={styles.panelHeader}><div><Search size={18} /><h2>Buscador semántico local</h2></div></header>
          <label className={styles.searchBox}><Search size={16} /><input value={semanticQuery} onChange={(event) => setSemanticQuery(event.target.value)} placeholder="Ejemplo: quién responde derechos de petición, quién maneja SISBEN, qué cargo hace interventoría..." /></label>
          {semanticQuery.trim() && semanticQuery.trim() !== debouncedSemanticQuery && <p className={styles.searchStatus}>Preparando resultados…</p>}
          <div className={styles.searchResults}>{semanticResults.map((result) => <SearchResultCard key={result.id} result={result} onSelectProcedure={onSelectProcedure} onSelectProfile={onSelectProfile} />)}</div>
        </section>
      )}

      {tab === 'versiones' && (
        <section className={styles.panelCard}>
          <header className={styles.panelHeader}><div><Archive size={18} /><h2>Versionamiento de manuales</h2></div></header>
          <div className={styles.versionTimeline}>{manualVersions.map((version) => <article key={version.id}><span>{version.year}</span><h3>{version.name}</h3><b>{version.status}</b><p>{version.description}</p><small>Responsable: {version.owner}</small></article>)}</div>
        </section>
      )}

      {tab === 'publico' && (
        <section className={styles.panelCard}>
          <header className={styles.panelHeader}><div><Eye size={18} /><h2>Modo solo lectura pública</h2></div></header>
          <p className={styles.lead}>Usa estas rutas para compartir una vista limpia, sin tablero interno ni menú completo. El servidor debe redirigir rutas SPA a <code>index.html</code>.</p>
          <div className={styles.twoColumnGridInner}>
            <article><h3>Procesos</h3>{allProcedures.slice(0, 12).map(({ procedure }) => <button key={procedure.id} type="button" onClick={() => copyToClipboard(`/publico/procesos/${procedure.id}`)}>{procedure.code} · copiar URL pública</button>)}</article>
            <article><h3>Cargos</h3>{allFunctionProfiles.slice(0, 12).map((profile) => <button key={profile.id} type="button" onClick={() => copyToClipboard(`/publico/cargos/${profile.id}`)}>{profile.denomination} · copiar URL pública</button>)}</article>
          </div>
        </section>
      )}

      {selectedNorm && <Modal title={selectedNorm.title} onClose={() => setSelectedNorm(null)}><NormativeModal norm={selectedNorm} onSelectProcedure={onSelectProcedure} onSelectProfile={onSelectProfile} /></Modal>}
      {selectedPlanItem && <Modal title="Detalle del plan de actualización" onClose={() => setSelectedPlanItem(null)}><PlanModal item={selectedPlanItem} /></Modal>}
    </main>
  );
}

function findByProcedureCode(code: string) {
  return procedureByCode.get(code.toLowerCase());
}

function relationKindLabel(kind: string) {
  const labels: Record<string, string> = {
    directa: 'Relación directa',
    parcial: 'Relación parcial',
    apoyo_operativo_condicionado: 'Apoyo operativo condicionado',
    normativa: 'Relación normativa',
    sugerida: 'Relación sugerida',
    sin_soporte: 'Sin soporte funcional',
  };
  return labels[kind] ?? kind;
}

function trustLabel(trust: string) {
  const labels: Record<string, string> = {
    alta: 'Alta confianza',
    media: 'Media confianza',
    baja: 'Baja confianza',
    validacion: 'Requiere validación',
  };
  return labels[trust] ?? trust;
}

function trustClass(trust: string) {
  if (trust === 'alta') return styles.trustAlta;
  if (trust === 'media') return styles.trustMedia;
  if (trust === 'baja') return styles.trustBaja;
  return styles.trustValidacion;
}

function TraceCard({ item, onSelectProcedure, onSelectProfile }: { item: ChangeTraceItem; onSelectProcedure: (id: string) => void; onSelectProfile: (id: string) => void }) {
  return <article className={styles.traceCard}>
    <div><span>{item.date}</span><b>{item.actor}</b></div>
    <section><h3>{item.title}</h3><p><b>Antes:</b> {item.previousState}</p><p><b>Después:</b> {item.newState}</p><p><b>Justificación:</b> {item.justification}</p><small>{item.observation}</small></section>
    {item.targetType === 'procedimiento' && <button type="button" onClick={() => onSelectProcedure(item.targetId)}>Abrir</button>}
    {item.targetType === 'cargo' && <button type="button" onClick={() => onSelectProfile(item.targetId)}>Abrir</button>}
  </article>;
}

function ActDraftView({ draft }: { draft: AdministrativeActDraft }) {
  return <div className={styles.actDraft}>
    <h3>{draft.title}</h3>
    <ListBlock title="Considerandos" items={draft.considerations} />
    <ListBlock title="Justificación técnica" items={draft.technicalJustification.slice(0, 10)} />
    <ListBlock title="Cambios propuestos" items={draft.proposedChanges} />
    <ListBlock title="Anexo de procedimientos ajustados" items={draft.procedureAnnex.slice(0, 12)} />
    <ListBlock title="Anexo de funciones ajustadas" items={draft.functionAnnex.slice(0, 10)} />
    <ListBlock title="Articulado base" items={draft.articles} />
  </div>;
}

const Metric = memo(function Metric({ label, value, note }: { label: string; value: number | string; note: string }) {
  return <article><span>{label}</span><strong>{value}</strong><small>{note}</small></article>;
});

const Indicator = memo(function Indicator({ label, value, total }: { label: string; value: number; total: number }) {
  const pct = Math.round((value / Math.max(total, 1)) * 100);
  return <div className={styles.indicator}><div><b>{label}</b><span>{value} de {total}</span></div><meter min="0" max="100" value={pct} /><strong>{pct}%</strong></div>;
});

function ProcedureSheetView({ sheet, onSelectProcedure }: { sheet: InstitutionalProcedureSheet; onSelectProcedure: (procedureId: string) => void }) {
  return <div className={styles.sheetView}>
    <button type="button" className={styles.primaryButton} onClick={() => onSelectProcedure(sheet.procedure.id)}>Abrir procedimiento</button>
    <h3>{sheet.procedure.code} · {sheet.procedure.title}</h3>
    <p><b>Objetivo:</b> {sheet.objective}</p>
    <p><b>Alcance:</b> {sheet.scope}</p>
    <p><b>Responsable:</b> {sheet.responsible}</p>
    <ListBlock title="Entradas" items={sheet.inputs} />
    <ListBlock title="Salidas" items={sheet.outputs} />
    <ListBlock title="Normativa" items={sheet.legalRequirements} />
    <ListBlock title="Riesgos" items={sheet.risks} />
    <ListBlock title="Controles" items={sheet.controls} />
    <ListBlock title="Indicadores" items={sheet.indicators} />
    <ListBlock title="Evidencias" items={sheet.evidences} />
    <ListBlock title="Funciones relacionadas" items={sheet.relatedFunctions.slice(0, 8)} />
  </div>;
}

function ProfileSheetView({ profile, onSelectProfile }: { profile: FunctionProfile; onSelectProfile: (profileId: string) => void }) {
  const findings = useMemo(() => getProfileUpdateFindings(profile.id), [profile.id]);
  const actions = useMemo(() => getProfileFunctionUpdateActions(profile.id), [profile.id]);
  const findingItems = useMemo(() => findings.map((finding) => `${finding.title}: ${finding.summary}`), [findings]);
  const actionItems = useMemo(() => actions.map((action) => `${action.action.toUpperCase()} · ${action.title}: ${action.proposedText}`), [actions]);
  const functionItems = useMemo(() => profile.functions.slice(0, 12).map((fn) => `${fn.number}. ${fn.description}`), [profile.functions]);
  return <div className={styles.sheetView}>
    <button type="button" className={styles.primaryButton} onClick={() => onSelectProfile(profile.id)}>Abrir cargo</button>
    <h3>{profile.denomination}</h3>
    <p><b>Dependencia:</b> {profile.dependency}</p>
    <p><b>Área:</b> {profile.functionalArea}</p>
    <p><b>Propósito:</b> {profile.purpose}</p>
    <ListBlock title="Hallazgos" items={findingItems} />
    <ListBlock title="Acciones de actualización" items={actionItems} />
    <ListBlock title="Funciones" items={functionItems} />
  </div>;
}

const ListBlock = memo(function ListBlock({ title, items }: { title: string; items: string[] }) {
  return <section className={styles.listBlock}><h4>{title}</h4>{items.length ? <ul>{items.map((item, index) => <li key={`${title}-${index}`}>{item}</li>)}</ul> : <p>Sin información registrada.</p>}</section>;
});

const ApprovalWorkflow = memo(function ApprovalWorkflow() {
  return <section className={styles.approvalBox}><header><ListChecks size={17} /><h3>Módulo de aprobación de cambios</h3></header><div>{approvalStages.map((stage, index) => <article key={stage.id}><span>{index + 1}</span><b>{stage.label}</b><p>{stage.description}</p></article>)}</div></section>;
});

function SearchResultCard({ result, onSelectProcedure, onSelectProfile }: { result: SemanticSearchResult; onSelectProcedure: (procedureId: string) => void; onSelectProfile: (profileId: string) => void }) {
  return <article className={styles.searchResult}><span>{result.type}</span><h3>{result.title}</h3><small>{result.subtitle}</small><p>{result.body}</p>{result.procedureId && <button type="button" onClick={() => onSelectProcedure(result.procedureId!)}>Abrir proceso</button>}{result.profileId && <button type="button" onClick={() => onSelectProfile(result.profileId!)}>Abrir cargo</button>}</article>;
}

function NormativeModal({ norm, onSelectProcedure, onSelectProfile }: { norm: NormativeLibraryItem; onSelectProcedure: (id: string) => void; onSelectProfile: (id: string) => void }) {
  return <div className={styles.modalBody}><p>{norm.summary}</p><p><b>Impacto:</b> {norm.impact}</p><p><b>Recomendación:</b> {norm.recommendation}</p><h3>Procedimientos afectados</h3><div className={styles.codeCloud}>{norm.affectedProcedureCodes.map((code) => { const proc = findByProcedureCode(code); return <button key={code} type="button" onClick={() => proc && onSelectProcedure(proc.id)}>{code}</button>; })}</div><h3>Cargos afectados</h3><div className={styles.codeCloud}>{norm.affectedProfileIds.slice(0, 30).map((id) => <button key={id} type="button" onClick={() => onSelectProfile(id)}>{id}</button>)}</div></div>;
}

function PlanModal({ item }: { item: UpdatePlanItem }) {
  return <div className={styles.modalBody}><p><b>Elemento:</b> {item.title}</p><p><b>Dependencia:</b> {item.dependency}</p><p><b>Prioridad:</b> {riskLabel[item.priority]}</p><p><b>Estado sugerido:</b> {item.status}</p><p><b>Responsable:</b> {item.responsible}</p><p><b>Fecha compromiso:</b> {item.dueDate}</p><p><b>Evidencia de cierre:</b> {item.evidence}</p><p><b>Observación:</b> {item.observation}</p></div>;
}

function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return <div className={styles.modalOverlay} role="dialog" aria-modal="true"><section className={styles.modalCard}><header><h2>{title}</h2><button type="button" onClick={onClose} aria-label="Cerrar"><X size={18} /></button></header>{children}</section></div>;
}
