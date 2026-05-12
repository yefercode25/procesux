import { useMemo, useState, type ReactNode } from 'react';
import {
  AlertTriangle,
  BookOpenCheck,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileSearch,
  Filter,
  Flame,
  GitBranch,
  Layers3,
  ListChecks,
  MessageSquareText,
  Network,
  RotateCcw,
  Search,
  ShieldAlert,
  SlidersHorizontal,
  Sparkles,
  TableProperties,
  X,
} from 'lucide-react';
import type { FunctionProfile } from '../types/manual';
import {
  buildDependencyHeatmap,
  buildInstitutionalInconsistencies,
  buildProcedureIntelligence,
  buildProfileLoad,
  coverageLabel,
  generateExecutiveReport,
  getSuggestedDecision,
  riskLabel,
  textMatchesRow,
  type CoverageStatus,
  type DecisionStatus,
  type IntelligenceRisk,
  type ProcedureIntelligenceRow,
} from '../utils/intelligence';
import { getMissingProcedureRecommendations, getProcedureRelationships, getProcedureUpdateActions, getProfileFunctionUpdateActions, getProfileUpdateFindings } from '../utils/relations';
import styles from './InstitutionalIntelligence.module.css';

interface InstitutionalIntelligenceProps {
  onSelectProcedure: (procedureId: string) => void;
  onSelectProfile: (profileId: string) => void;
}

interface DecisionRecord {
  id: string;
  itemId: string;
  itemType: 'procedure' | 'profile';
  status: DecisionStatus;
  responsible: string;
  dueDate: string;
  note: string;
  createdAt: string;
}

const STORAGE_KEY = 'procesux_mesa_tecnica_decisiones_v1';

const statusLabel: Record<DecisionStatus, string> = {
  pendiente: 'Pendiente',
  revisado: 'Revisado',
  aprobado: 'Aprobado',
  rechazado: 'Rechazado',
  mesa_tecnica: 'Mesa técnica',
  en_actualizacion: 'En actualización',
};

function readDecisions(): DecisionRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveDecisions(records: DecisionRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

const asPct = (value: number, total: number) => `${Math.round((value / Math.max(total, 1)) * 100)}%`;

function riskClass(risk: IntelligenceRisk) {
  return styles[`risk_${risk}`] ?? '';
}

function coverageClass(coverage: CoverageStatus) {
  return styles[`coverage_${coverage}`] ?? '';
}

export function InstitutionalIntelligence({ onSelectProcedure, onSelectProfile }: InstitutionalIntelligenceProps) {
  const rows = useMemo(() => buildProcedureIntelligence(), []);
  const loadRows = useMemo(() => buildProfileLoad(rows), [rows]);
  const heatmap = useMemo(() => buildDependencyHeatmap(rows), [rows]);
  const inconsistencies = useMemo(() => buildInstitutionalInconsistencies(rows), [rows]);
  const report = useMemo(() => generateExecutiveReport(rows), [rows]);
  const missing = useMemo(() => getMissingProcedureRecommendations(), []);

  const [query, setQuery] = useState('');
  const [coverage, setCoverage] = useState<'todos' | CoverageStatus>('todos');
  const [risk, setRisk] = useState<'todos' | IntelligenceRisk>('todos');
  const [decision, setDecision] = useState('todos');
  const [macro, setMacro] = useState('todos');
  const [responsible, setResponsible] = useState('todos');
  const [selectedRow, setSelectedRow] = useState<ProcedureIntelligenceRow | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<FunctionProfile | null>(null);
  const [decisions, setDecisions] = useState<DecisionRecord[]>(() => readDecisions());
  const [decisionStatus, setDecisionStatus] = useState<DecisionStatus>('mesa_tecnica');
  const [decisionResponsible, setDecisionResponsible] = useState('');
  const [decisionDate, setDecisionDate] = useState('');
  const [decisionNote, setDecisionNote] = useState('');

  const filteredRows = rows.filter((row) => {
    if (!textMatchesRow(row, query)) return false;
    if (coverage !== 'todos' && row.coverage !== coverage) return false;
    if (risk !== 'todos' && row.risk !== risk) return false;
    if (decision !== 'todos' && row.decision !== decision) return false;
    if (macro !== 'todos' && row.macroName !== macro) return false;
    if (responsible !== 'todos' && row.responsible !== responsible) return false;
    return true;
  });

  const totals = {
    procedures: rows.length,
    covered: rows.filter((row) => row.coverage === 'cubierto').length,
    partial: rows.filter((row) => row.coverage === 'parcial').length,
    uncovered: rows.filter((row) => row.coverage === 'no_cubierto').length,
    highRisk: rows.filter((row) => row.risk === 'alto' || row.risk === 'critico').length,
    decisions: decisions.length,
  };

  const decisionsOptions = Array.from(new Set(rows.map((row) => row.decision))).sort();
  const macroOptions = Array.from(new Set(rows.map((row) => row.macroName))).sort();
  const responsibleOptions = Array.from(new Set(rows.map((row) => row.responsible))).sort();

  const resetFilters = () => {
    setQuery('');
    setCoverage('todos');
    setRisk('todos');
    setDecision('todos');
    setMacro('todos');
    setResponsible('todos');
  };

  const addDecision = (item: ProcedureIntelligenceRow | FunctionProfile) => {
    const isProcedureRow = (value: ProcedureIntelligenceRow | FunctionProfile): value is ProcedureIntelligenceRow =>
      Object.prototype.hasOwnProperty.call(value, 'procedure');
    const itemType = isProcedureRow(item) ? 'procedure' : 'profile';
    const itemId = isProcedureRow(item) ? item.procedure.id : item.id;
    const record: DecisionRecord = {
      id: `${itemType}-${itemId}-${Date.now()}`,
      itemId,
      itemType,
      status: decisionStatus,
      responsible: decisionResponsible.trim() || 'Por definir',
      dueDate: decisionDate,
      note: decisionNote.trim() || 'Sin observación registrada.',
      createdAt: new Date().toISOString(),
    };
    const next = [record, ...decisions];
    setDecisions(next);
    saveDecisions(next);
    setDecisionNote('');
  };

  const deleteDecision = (id: string) => {
    const next = decisions.filter((record) => record.id !== id);
    setDecisions(next);
    saveDecisions(next);
  };

  const downloadReport = () => {
    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'informe-brechas-manuales-gacheta.txt';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className={styles.intelligencePage}>
      <section className={styles.heroCard}>
        <div>
          <span className={styles.kicker}><Sparkles size={15} /> Inteligencia institucional</span>
          <h1>Brechas, riesgos y actualización integral</h1>
          <p>
            Tablero profesional para cruzar manual de procesos, manual de funciones, soporte funcional, riesgos, propuestas de actualización y decisiones de mesa técnica.
          </p>
        </div>
        <div className={styles.heroActions}>
          <button type="button" onClick={downloadReport}><Download size={16} /> Descargar informe</button>
          <button type="button" onClick={() => setSelectedRow(rows.find((row) => row.risk === 'critico') ?? rows[0])}><ShieldAlert size={16} /> Revisar prioridad</button>
        </div>
      </section>

      <section className={styles.metricGrid} aria-label="Indicadores principales">
        <article><Layers3 size={18} /><span>Procedimientos</span><strong>{totals.procedures}</strong><small>{filteredRows.length} visibles</small></article>
        <article><CheckCircle2 size={18} /><span>Cubiertos</span><strong>{totals.covered}</strong><small>{asPct(totals.covered, totals.procedures)}</small></article>
        <article><AlertTriangle size={18} /><span>Parciales</span><strong>{totals.partial}</strong><small>{asPct(totals.partial, totals.procedures)}</small></article>
        <article><Flame size={18} /><span>Alto / crítico</span><strong>{totals.highRisk}</strong><small>{asPct(totals.highRisk, totals.procedures)}</small></article>
        <article><BriefcaseBusiness size={18} /><span>Perfiles</span><strong>{loadRows.length}</strong><small>{loadRows.filter((row) => row.coveragePressure === 'alto' || row.coveragePressure === 'critico').length} alertas</small></article>
        <article><ClipboardCheck size={18} /><span>Decisiones</span><strong>{totals.decisions}</strong><small>mesa técnica</small></article>
      </section>

      <section className={styles.filterCard}>
        <div className={styles.searchBox}>
          <Search size={15} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscador inteligente: contratación, comisaría, PQRSD, predial, servicios públicos..." />
        </div>
        <label><Filter size={14} /> Cobertura<select value={coverage} onChange={(event) => setCoverage(event.target.value as 'todos' | CoverageStatus)}><option value="todos">Todas</option><option value="cubierto">Cubierto</option><option value="parcial">Parcial</option><option value="no_cubierto">No cubierto</option></select></label>
        <label><Flame size={14} /> Riesgo<select value={risk} onChange={(event) => setRisk(event.target.value as 'todos' | IntelligenceRisk)}><option value="todos">Todos</option><option value="critico">Crítico</option><option value="alto">Alto</option><option value="medio">Medio</option><option value="bajo">Bajo</option></select></label>
        <label><SlidersHorizontal size={14} /> Decisión<select value={decision} onChange={(event) => setDecision(event.target.value)}><option value="todos">Todas</option>{decisionsOptions.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label><Layers3 size={14} /> Macroproceso<select value={macro} onChange={(event) => setMacro(event.target.value)}><option value="todos">Todos</option>{macroOptions.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label><BriefcaseBusiness size={14} /> Responsable<select value={responsible} onChange={(event) => setResponsible(event.target.value)}><option value="todos">Todos</option>{responsibleOptions.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <button type="button" className={styles.cleanButton} onClick={resetFilters}><RotateCcw size={14} /> Limpiar</button>
      </section>

      <section className={styles.twoColumnGrid}>
        <article className={styles.panelCard}>
          <header><div><TableProperties size={18} /><h2>Matriz procedimiento ↔ función ↔ cargo</h2></div><span>{filteredRows.length}</span></header>
          <div className={styles.tableWrap}>
            <table className={styles.matrixTable}>
              <thead><tr><th>Procedimiento</th><th>Soporte</th><th>Riesgo</th><th>Cargos / funciones</th><th>Decisión</th><th /></tr></thead>
              <tbody>
                {filteredRows.slice(0, 120).map((row) => (
                  <tr key={row.procedure.id}>
                    <td><b>{row.procedure.code}</b><span>{row.procedure.title}</span><small>{row.responsible}</small></td>
                    <td><span className={`${styles.badge} ${coverageClass(row.coverage)}`}>{coverageLabel[row.coverage]}</span></td>
                    <td><span className={`${styles.badge} ${riskClass(row.risk)}`}>{riskLabel[row.risk]}</span></td>
                    <td><strong>{row.profileCount}</strong> cargo(s) · <strong>{row.functionCount}</strong> función(es)</td>
                    <td>{row.decision}</td>
                    <td><button type="button" onClick={() => setSelectedRow(row)}>Ver</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className={styles.panelCard}>
          <header><div><Flame size={18} /><h2>Procedimientos sin dueño funcional</h2></div><span>{totals.uncovered}</span></header>
          <div className={styles.compactList}>
            {rows.filter((row) => row.coverage === 'no_cubierto').slice(0, 14).map((row) => (
              <button key={row.procedure.id} type="button" onClick={() => setSelectedRow(row)} className={styles.alertItem}>
                <span className={`${styles.badge} ${riskClass(row.risk)}`}>{riskLabel[row.risk]}</span>
                <b>{row.procedure.code}</b>
                <small>{row.procedure.title}</small>
              </button>
            ))}
          </div>
        </article>
      </section>

      <section className={styles.threeColumnGrid}>
        <article className={styles.panelCard}>
          <header><div><BriefcaseBusiness size={18} /><h2>Cargos sobrecargados</h2></div><span>Top {Math.min(loadRows.length, 10)}</span></header>
          <div className={styles.loadList}>
            {loadRows.slice(0, 10).map((item) => (
              <button key={item.profile.id} type="button" onClick={() => setSelectedProfile(item.profile)}>
                <span className={`${styles.badge} ${riskClass(item.coveragePressure)}`}>{riskLabel[item.coveragePressure]}</span>
                <b>{item.profile.denomination}</b>
                <small>{item.profile.dependency}</small>
                <div><span>{item.procedureCount} procedimientos</span><span>{item.linkedFunctionCount}/{item.functionCount} funciones</span></div>
              </button>
            ))}
          </div>
        </article>

        <article className={styles.panelCard}>
          <header><div><Network size={18} /><h2>Mapa de calor por dependencia</h2></div><span>{heatmap.length}</span></header>
          <div className={styles.heatList}>
            {heatmap.slice(0, 12).map((item) => (
              <div key={item.dependency} className={styles.heatRow}>
                <div><b>{item.dependency}</b><small>{item.procedureCount} proc. · {item.profileCount} perfil(es) · {item.functions} func.</small></div>
                <meter min="0" max="100" value={Math.min(100, item.score * 3)} />
                <span>{item.highRisk} altos</span>
              </div>
            ))}
          </div>
        </article>

        <article className={styles.panelCard}>
          <header><div><AlertTriangle size={18} /><h2>Inconsistencias detectadas</h2></div><span>{inconsistencies.length}</span></header>
          <div className={styles.compactList}>
            {inconsistencies.slice(0, 12).map((item) => (
              <article key={item.id} className={styles.inconsistencyItem}>
                <span className={`${styles.badge} ${riskClass(item.severity)}`}>{riskLabel[item.severity]}</span>
                <b>{item.title}</b>
                <small>{item.target}</small>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </article>
      </section>

      <section className={styles.twoColumnGrid}>
        <article className={styles.panelCard}>
          <header><div><FileSearch size={18} /><h2>Procedimientos o módulos sugeridos</h2></div><span>{missing.length}</span></header>
          <div className={styles.suggestionGrid}>
            {missing.map((item) => (
              <article key={item.id}>
                <b>{item.title}</b>
                <p>{item.reason}</p>
                <small><strong>Responsable:</strong> {item.suggestedResponsible}</small>
                <small><strong>Base:</strong> {item.normativeBasis}</small>
              </article>
            ))}
          </div>
        </article>

        <article className={styles.panelCard}>
          <header><div><BookOpenCheck size={18} /><h2>Informe ejecutivo generado</h2></div><button type="button" onClick={downloadReport}><Download size={14} /> TXT</button></header>
          <textarea className={styles.reportBox} value={report} readOnly />
        </article>
      </section>

      <section className={styles.panelCard}>
        <header><div><MessageSquareText size={18} /><h2>Historial de decisiones y mesa técnica</h2></div><span>{decisions.length}</span></header>
        <div className={styles.decisionBoard}>
          {decisions.length === 0 ? <p className={styles.emptyText}>Aún no hay decisiones registradas. Abre un procedimiento o cargo y guarda una decisión de mesa técnica.</p> : decisions.map((record) => (
            <article key={record.id}>
              <span className={styles.badge}>{statusLabel[record.status]}</span>
              <b>{record.itemType === 'procedure' ? 'Procedimiento' : 'Cargo'} · {record.itemId}</b>
              <p>{record.note}</p>
              <small>Responsable: {record.responsible || 'Por definir'} {record.dueDate ? `· Compromiso: ${record.dueDate}` : ''}</small>
              <button type="button" onClick={() => deleteDecision(record.id)}><X size={13} /> Quitar</button>
            </article>
          ))}
        </div>
      </section>

      {selectedRow && (
        <DetailModal title={`${selectedRow.procedure.code} · ${selectedRow.procedure.title}`} onClose={() => setSelectedRow(null)}>
          <ProcedureAnalysis row={selectedRow} onSelectProcedure={onSelectProcedure} onOpenProfile={setSelectedProfile} />
          <DecisionForm
            status={decisionStatus}
            setStatus={setDecisionStatus}
            responsible={decisionResponsible}
            setResponsible={setDecisionResponsible}
            dueDate={decisionDate}
            setDueDate={setDecisionDate}
            note={decisionNote}
            setNote={setDecisionNote}
            onSave={() => addDecision(selectedRow)}
          />
        </DetailModal>
      )}

      {selectedProfile && (
        <DetailModal title={`${selectedProfile.denomination} · ${selectedProfile.dependency}`} onClose={() => setSelectedProfile(null)}>
          <ProfileAnalysis profile={selectedProfile} rows={rows} onSelectProfile={onSelectProfile} />
          <DecisionForm
            status={decisionStatus}
            setStatus={setDecisionStatus}
            responsible={decisionResponsible}
            setResponsible={setDecisionResponsible}
            dueDate={decisionDate}
            setDueDate={setDecisionDate}
            note={decisionNote}
            setNote={setDecisionNote}
            onSave={() => addDecision(selectedProfile)}
          />
        </DetailModal>
      )}
    </main>
  );
}

function DetailModal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return (
    <div className={styles.modalBackdrop} role="dialog" aria-modal="true">
      <section className={styles.modalPanel}>
        <header className={styles.modalHeader}>
          <div><span>Revisión detallada</span><h2>{title}</h2></div>
          <button type="button" onClick={onClose}><X size={18} /></button>
        </header>
        <div className={styles.modalBody}>{children}</div>
      </section>
    </div>
  );
}

function ProcedureAnalysis({ row, onSelectProcedure, onOpenProfile }: { row: ProcedureIntelligenceRow; onSelectProcedure: (id: string) => void; onOpenProfile: (profile: FunctionProfile) => void }) {
  const relationships = getProcedureRelationships(row.procedure);
  const actions = getProcedureUpdateActions(row.procedure);

  return (
    <div className={styles.analysisGrid}>
      <article className={styles.analysisSummary}>
        <h3><GitBranch size={16} /> Diagnóstico del procedimiento</h3>
        <div className={styles.chipRow}>
          <span className={`${styles.badge} ${coverageClass(row.coverage)}`}>{coverageLabel[row.coverage]}</span>
          <span className={`${styles.badge} ${riskClass(row.risk)}`}>{riskLabel[row.risk]}</span>
          <span className={styles.badge}>{getSuggestedDecision(row.procedure)}</span>
        </div>
        <p><b>Responsable actual:</b> {row.responsible}</p>
        <p><b>Proceso:</b> {row.processName}</p>
        <ul>{row.riskReasons.map((reason) => <li key={reason}>{reason}</li>)}</ul>
        <button type="button" onClick={() => onSelectProcedure(row.procedure.id)}>Abrir procedimiento en vista principal</button>
      </article>

      <article className={styles.analysisSummary}>
        <h3><ListChecks size={16} /> Funciones asociadas</h3>
        {relationships.length === 0 ? <p>No hay funciones asociadas con criterio estricto. Debe revisarse actualización del manual de funciones o del procedimiento.</p> : relationships.map((relationship) => (
          <div key={`${relationship.profile.id}-${relationship.rule.functionNumbers.join('-')}`} className={styles.relationBlock}>
            <button type="button" onClick={() => onOpenProfile(relationship.profile)}><b>{relationship.profile.denomination}</b> · {relationship.profile.dependency}</button>
            <small>{relationship.confidence} · {relationship.legalFit} · {relationship.criticality}</small>
            <p>{relationship.reason}</p>
            <ol>{relationship.functions.slice(0, 6).map((fn) => <li key={fn.id}>{fn.number}. {fn.description}</li>)}</ol>
          </div>
        ))}
      </article>

      <article className={styles.analysisSummaryWide}>
        <h3><ShieldAlert size={16} /> Actual vs propuesta</h3>
        <div className={styles.compareGrid}>
          {actions.map((action) => (
            <article key={action.id}>
              <span className={`${styles.badge} ${riskClass(action.severity)}`}>{action.action} · {riskLabel[action.severity]}</span>
              <h4>{action.title}</h4>
              <div className={styles.compareColumns}>
                <p><b>Actual:</b> {action.currentState}</p>
                <p><b>Propuesta:</b> {action.proposedState}</p>
              </div>
              <p><b>Por qué:</b> {action.why}</p>
              <p><b>Base:</b> {action.normativeBasis}</p>
              <p><b>Impacto:</b> {action.impact}</p>
            </article>
          ))}
        </div>
      </article>
    </div>
  );
}

function ProfileAnalysis({ profile, rows, onSelectProfile }: { profile: FunctionProfile; rows: ProcedureIntelligenceRow[]; onSelectProfile: (id: string) => void }) {
  const relatedRows = rows.filter((row) => getProcedureRelationships(row.procedure).some((relationship) => relationship.profile.id === profile.id));
  const updateActions = getProfileFunctionUpdateActions(profile.id);
  const findings = getProfileUpdateFindings(profile.id);

  return (
    <div className={styles.analysisGrid}>
      <article className={styles.analysisSummary}>
        <h3><BriefcaseBusiness size={16} /> Diagnóstico del cargo</h3>
        <p><b>Nivel:</b> {profile.level} · <b>Código:</b> {profile.code} · <b>Grado:</b> {profile.grade}</p>
        <p><b>Funciones:</b> {profile.functions.length} · <b>Procedimientos relacionados:</b> {relatedRows.length}</p>
        <p>{profile.purpose}</p>
        <button type="button" onClick={() => onSelectProfile(profile.id)}>Abrir cargo en vista principal</button>
      </article>

      <article className={styles.analysisSummary}>
        <h3><TableProperties size={16} /> Procedimientos relacionados</h3>
        <div className={styles.profileProcedureList}>
          {relatedRows.slice(0, 24).map((row) => <span key={row.procedure.id}>{row.procedure.code} · {row.procedure.title}</span>)}
          {relatedRows.length === 0 && <p>No hay procedimientos relacionados con criterio estricto.</p>}
        </div>
      </article>

      <article className={styles.analysisSummaryWide}>
        <h3><ShieldAlert size={16} /> Actualización sugerida del cargo</h3>
        {findings.map((finding) => (
          <article key={finding.id} className={styles.findingBox}>
            <span className={`${styles.badge} ${riskClass(finding.severity)}`}>{riskLabel[finding.severity]}</span>
            <b>{finding.title}</b>
            <p>{finding.summary}</p>
            <p><b>Recomendación:</b> {finding.recommendation}</p>
          </article>
        ))}
        <div className={styles.compareGrid}>
          {updateActions.map((action) => (
            <article key={action.id}>
              <span className={styles.badge}>{action.action}</span>
              <h4>{action.title}</h4>
              {action.functionNumbers?.length ? <small>Funciones actuales: {action.functionNumbers.join(', ')}</small> : null}
              <p><b>Cómo debería quedar:</b> {action.proposedText}</p>
              <p><b>Por qué:</b> {action.why}</p>
              <p><b>Base:</b> {action.normativeBasis}</p>
              <p><b>Impacto:</b> {action.impact}</p>
            </article>
          ))}
        </div>
      </article>
    </div>
  );
}

function DecisionForm({
  status,
  setStatus,
  responsible,
  setResponsible,
  dueDate,
  setDueDate,
  note,
  setNote,
  onSave,
}: {
  status: DecisionStatus;
  setStatus: (value: DecisionStatus) => void;
  responsible: string;
  setResponsible: (value: string) => void;
  dueDate: string;
  setDueDate: (value: string) => void;
  note: string;
  setNote: (value: string) => void;
  onSave: () => void;
}) {
  return (
    <section className={styles.decisionForm}>
      <h3><ClipboardCheck size={16} /> Registrar decisión de mesa técnica</h3>
      <div className={styles.formGrid}>
        <label>Estado<select value={status} onChange={(event) => setStatus(event.target.value as DecisionStatus)}>{Object.entries(statusLabel).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
        <label>Responsable<input value={responsible} onChange={(event) => setResponsible(event.target.value)} placeholder="Dependencia o funcionario responsable" /></label>
        <label>Fecha compromiso<input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} /></label>
      </div>
      <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Observación, acuerdo, ajuste requerido o justificación de la decisión..." />
      <button type="button" onClick={onSave}><ClipboardCheck size={15} /> Guardar decisión</button>
    </section>
  );
}
