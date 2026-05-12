import { useMemo, useState } from 'react';
import { AlertTriangle, BadgeCheck, BriefcaseBusiness, Download, Eye, FileWarning, GitMerge, Layers3, ListChecks, Network, RotateCcw, Scale, ScrollText, Search, Share2, ShieldAlert, SlidersHorizontal, X } from 'lucide-react';
import type { FunctionItem, FunctionProfile, ManualData, ProcedureItem } from '../types/manual';
import { countLinkedFunctions, getFunctionRelations, getFunctionStrictRules, getProcedureRelationships, getProfileFunctionUpdateActions, getProfileUpdateFindings } from '../utils/relations';
import { ProcedurePreviewModal } from './ProcedurePreviewModal';
import { OrgChart } from './OrgChart';
import { exportProfileSheet } from '../utils/governance';
import { FunctionUpdateModal } from './FunctionUpdateModal';
import { allFunctionProfiles } from '../data/functionsManualData';
import styles from './FunctionDetail.module.css';

interface FunctionDetailProps {
  profile: FunctionProfile;
  manualData: ManualData;
  onSelectProfile?: (profileId: string) => void;
  onShareProfile?: () => void;
  isSharedView?: boolean;
}

const flattenProcedures = (data: ManualData) => data.macroprocesses.flatMap((macro) =>
  macro.processes.flatMap((process) => process.procedures.map((procedure) => ({ macro, process, procedure }))),
);

const levelLabel: Record<FunctionProfile['level'], string> = {
  directivo: 'Directivo',
  profesional: 'Profesional',
  tecnico: 'Técnico',
  asistencial: 'Asistencial',
};

const legalLabel = {
  compatible: 'Compatible',
  requiere_validacion: 'Validar',
  no_recomendado: 'No recomendado',
};

type FunctionFilter = 'todas' | 'relacionadas' | 'sin_relacion' | 'validacion';

function FunctionRecommendation({ fn, profile }: { fn: FunctionItem; profile: FunctionProfile }) {
  const rules = getFunctionStrictRules(fn, profile);
  if (rules.length === 0) {
    return <span className={styles.warning}><FileWarning size={14} /> Sin proceso estricto</span>;
  }
  const hasCritical = rules.some((rule) => rule.criticality === 'critico' || rule.criticality === 'alto');
  const needsValidation = rules.some((rule) => rule.legalFit !== 'compatible');
  return (
    <div className={styles.recommendationStack}>
      <span className={hasCritical ? styles.badgeCritical : styles.badge}>Nivel {hasCritical ? 'alto/crítico' : 'medio/bajo'}</span>
      <span className={needsValidation ? styles.badgeWarn : styles.badgeOk}><Scale size={13} /> {needsValidation ? 'Validación requerida' : 'Compatible'}</span>
    </div>
  );
}

export function FunctionDetail({ profile, manualData, onSelectProfile, onShareProfile, isSharedView = false }: FunctionDetailProps) {
  const [previewProcedure, setPreviewProcedure] = useState<ProcedureItem | null>(null);
  const [expandedFunctionId, setExpandedFunctionId] = useState<string | null>(null);
  const [isOrgChartOpen, setIsOrgChartOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [functionQuery, setFunctionQuery] = useState('');
  const [functionFilter, setFunctionFilter] = useState<FunctionFilter>('todas');
  const procedures = useMemo(() => flattenProcedures(manualData), [manualData]);
  const procedureMap = useMemo(() => new Map(procedures.map((item) => [item.procedure.id, item])), [procedures]);
  const linkedFunctions = countLinkedFunctions(profile);
  const relatedProcedureIds = Array.from(new Set(profile.functions.flatMap((fn) => getFunctionRelations(fn, profile).map((relation) => relation.procedureId).filter(Boolean))));
  const relatedProcedures = relatedProcedureIds.map((id) => procedureMap.get(id)).filter(Boolean) as ReturnType<typeof flattenProcedures>;
  const unlinkedFunctions = profile.functions.filter((fn) => getFunctionRelations(fn, profile).every((relation) => !relation.procedureId));
  const updateFindings = getProfileUpdateFindings(profile.id);
  const updateActions = getProfileFunctionUpdateActions(profile.id);
  const normalizedFunctionQuery = functionQuery.trim().toLowerCase();
  const functionsNeedingValidation = profile.functions.filter((fn) => getFunctionStrictRules(fn, profile).some((rule) => rule.legalFit !== 'compatible'));
  const directRelationCount = profile.functions.reduce((acc, fn) => acc + getFunctionRelations(fn, profile).filter((relation) => relation.procedureId).length, 0);
  const filteredFunctions = profile.functions.filter((fn) => {
    const relations = getFunctionRelations(fn, profile).filter((relation) => relation.procedureId);
    const rules = getFunctionStrictRules(fn, profile);
    const matchesFilter = functionFilter === 'todas'
      ? true
      : functionFilter === 'relacionadas'
        ? relations.length > 0
        : functionFilter === 'sin_relacion'
          ? relations.length === 0
          : rules.some((rule) => rule.legalFit !== 'compatible');
    if (!matchesFilter) return false;
    if (!normalizedFunctionQuery) return true;
    return [fn.number, fn.description, profile.denomination, profile.functionalArea]
      .join(' ')
      .toLowerCase()
      .includes(normalizedFunctionQuery);
  });

  return (
    <main className={styles.detailPanel}>
      <section className={styles.heroCard}>
        <div>
          <span className={styles.breadcrumb}>Manual de funciones / {levelLabel[profile.level]}</span>
          <h1>{profile.denomination}</h1>
          <p className={styles.purpose}>{profile.purpose}</p>
          <div className={styles.metaRow}>
            <span className={styles.codeChip}>Código {profile.code} · Grado {profile.grade}</span>
            <span>{profile.dependency}</span>
            <span>{profile.positions} cargo{profile.positions === 1 ? '' : 's'}</span>
          </div>
          <div className={styles.heroButtonRow}>
            {onShareProfile && !isSharedView && (
              <button type="button" className={styles.shareHeroButton} onClick={onShareProfile}>
                <Share2 size={15} /> Compartir URL de consulta
              </button>
            )}
            <button type="button" className={styles.shareHeroButton} onClick={() => exportProfileSheet(profile)}>
              <Download size={15} /> Exportar ficha
            </button>
          </div>
        </div>

        <aside className={styles.metaPanel}>
          <div><span>Funciones</span><strong>{profile.functionCount}</strong></div>
          <div><span>Relacionadas</span><strong>{linkedFunctions}</strong></div>
          <div><span>Sin relación estricta</span><strong>{unlinkedFunctions.length}</strong></div>
          <div><span>Páginas</span><strong>{profile.pageStart} - {profile.pageEnd}</strong></div>
          <div><span>Área funcional</span><strong>{profile.functionalArea}</strong></div>
          <div><span>Jefe inmediato</span><strong>{profile.immediateBoss}</strong></div>
        </aside>
      </section>

      <section className={styles.insightGrid} aria-label="Indicadores del perfil funcional">
        <article><span>Funciones</span><strong>{profile.functions.length}</strong><small>{filteredFunctions.length} visibles</small></article>
        <article><span>Relacionadas</span><strong>{linkedFunctions}</strong><small>{directRelationCount} vínculos</small></article>
        <article><span>Sin relación</span><strong>{unlinkedFunctions.length}</strong><small>Criterio estricto</small></article>
        <article><span>Validación</span><strong>{functionsNeedingValidation.length}</strong><small>Funcional/legal</small></article>
        <article><span>Procedimientos</span><strong>{relatedProcedures.length}</strong><small>Asociados</small></article>
      </section>

      <section className={styles.contentCard}>
        <div className={styles.summaryGrid}>
          <article className={styles.infoCard}>
            <h2><BriefcaseBusiness size={17} /> Identificación del empleo</h2>
            <p><b>Nivel:</b> {levelLabel[profile.level]} · <b>Denominación:</b> {profile.denomination} · <b>No. cargos:</b> {profile.positions}</p>
          </article>
          <article className={styles.infoCard}>
            <h2><GitMerge size={17} /> Relación estricta con procesos</h2>
            <p>{relatedProcedures.length > 0 ? `${relatedProcedures.length} procedimiento(s) relacionados con funciones específicas.` : 'No se encontraron procedimientos relacionados.'}</p>
          </article>
          <article className={styles.infoCard}>
            <h2><BadgeCheck size={17} /> Criterio de recomendación</h2>
            <p>La relación se muestra solo cuando una función concreta del perfil soporta el procedimiento, no por coincidencia general de dependencia.</p>
          </article>
        </div>


        <section className={styles.orgLauncherCard}>
          <div>
            <span className={styles.orgKicker}><Network size={15} /> Organigrama funcional</span>
            <h2>Explorar estructura del Manual de Funciones</h2>
            <p>Abre el organigrama interactivo construido con la misma librería del flujograma. Incluye todos los perfiles, cargos, dependencias, niveles y relaciones jerárquicas cargadas.</p>
          </div>
          <button type="button" className={styles.primaryActionButton} onClick={() => setIsOrgChartOpen(true)}>
            <Network size={17} /> Abrir organigrama
          </button>
        </section>

        {(updateFindings.length > 0 || updateActions.length > 0) && (
          <section className={styles.updateCard}>
            <header className={styles.sectionHeader}>
              <div><ShieldAlert size={18} /><h2>Revisión de actualización del cargo</h2></div>
              <span className={styles.badge}>{updateFindings.length + updateActions.length}</span>
            </header>
            <div className={styles.updateIntro}>
              <p>Consulta qué funciones conviene mantener, modificar, agregar, quitar, fusionar o trasladar antes de actualizar formalmente el manual.</p>
              <button type="button" className={styles.primaryActionButton} onClick={() => setIsUpdateModalOpen(true)}>
                <ShieldAlert size={17} /> Abrir propuesta de actualización
              </button>
            </div>
            {updateFindings.length > 0 && (
              <div className={styles.findingList}>
                {updateFindings.map((finding) => (
                  <article key={finding.id} className={styles.findingItem}>
                    <span className={styles[`finding_${finding.severity}`]}>{finding.severity}</span>
                    <div>
                      <h3>{finding.title}</h3>
                      <p><b>Ámbito:</b> {finding.scope}</p>
                      <p>{finding.summary}</p>
                      <p><strong>Recomendación:</strong> {finding.recommendation}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {unlinkedFunctions.length > 0 && (
          <div className={styles.warningBox}>
            <AlertTriangle size={17} /> {unlinkedFunctions.length} función(es) no tienen procedimiento relacionado con criterio estricto. Pueden ser funciones transversales, de dirección general o no documentadas como procedimiento.
          </div>
        )}

        <section className={styles.matrixCard}>
          <header className={styles.sectionHeader}>
            <div><ListChecks size={18} /><h2>Funciones principales ({profile.functions.length})</h2></div>
            <span className={styles.badge}>Apartado IV</span>
          </header>

          <div className={styles.filterPanel}>
            <label className={styles.searchControl}>
              <Search size={14} />
              <input value={functionQuery} onChange={(event) => setFunctionQuery(event.target.value)} placeholder="Buscar texto de la función..." />
            </label>
            <label className={styles.selectControl}>
              <SlidersHorizontal size={14} />
              <select value={functionFilter} onChange={(event) => setFunctionFilter(event.target.value as FunctionFilter)} aria-label="Filtrar funciones">
                <option value="todas">Todas las funciones</option>
                <option value="relacionadas">Con procedimiento</option>
                <option value="sin_relacion">Sin relación estricta</option>
                <option value="validacion">Requieren validación</option>
              </select>
            </label>
            <button type="button" className={styles.secondaryButton} onClick={() => { setFunctionQuery(''); setFunctionFilter('todas'); }}>
              <RotateCcw size={14} /> Limpiar
            </button>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.functionTable}>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Función</th>
                  <th>Procesos relacionados</th>
                  <th>Recomendación</th>
                </tr>
              </thead>
              <tbody>
                {filteredFunctions.map((fn) => {
                  const relations = getFunctionRelations(fn, profile).filter((relation) => relation.procedureId);
                  const rules = getFunctionStrictRules(fn, profile);
                  const isExpanded = expandedFunctionId === fn.id;
                  return (
                    <tr key={fn.id}>
                      <td><span className={styles.codePill}>{fn.number}</span></td>
                      <td>
                        <p className={styles.functionText}>{fn.description}</p>
                        {rules.length > 0 && isExpanded ? (
                          <div className={styles.ruleBox}>
                            {rules.map((rule) => (
                              <article key={`${fn.id}-${rule.profileId}-${rule.functionNumbers.join('-')}`}>
                                <b>Nivel {rule.criticality} · {legalLabel[rule.legalFit]}</b>
                                <p><strong>Por qué:</strong> {rule.reason}</p>
                                <p><strong>Se recomienda:</strong> {rule.recommendation}</p>
                                <p><strong>Revisión funcional/legal:</strong> {rule.legalReview}</p>
                              </article>
                            ))}
                          </div>
                        ) : null}
                        {rules.length > 0 ? (
                          <button type="button" className={styles.inlineButton} onClick={() => setExpandedFunctionId(isExpanded ? null : fn.id)}>
                            {isExpanded ? 'Ocultar recomendación' : 'Ver recomendación'}
                          </button>
                        ) : null}
                      </td>
                      <td>
                        {relations.length > 0
                          ? relations.slice(0, isExpanded ? relations.length : 5).map((relation) => {
                            const item = procedureMap.get(relation.procedureId);
                            return item ? (
                              <button key={`${fn.id}-${relation.procedureId}`} type="button" className={styles.procedureLink} onClick={() => setPreviewProcedure(item.procedure)}>
                                <Eye size={13} /> <b>{item.procedure.code}</b> · {item.procedure.title}
                              </button>
                            ) : null;
                          })
                          : 'Sin relación asignada'}
                        {relations.length > 5 && !isExpanded ? <div className={styles.moreText}>+ {relations.length - 5} más. Abre la recomendación para verlas.</div> : null}
                      </td>
                      <td><FunctionRecommendation fn={fn} profile={profile} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.relationCard}>
          <header className={styles.sectionHeader}>
            <div><Layers3 size={18} /><h2>Procesos y procedimientos relacionados</h2></div>
            <span className={styles.badge}>{relatedProcedures.length}</span>
          </header>

          {relatedProcedures.length > 0 ? (
            <div className={styles.relationList}>
              {relatedProcedures.map(({ macro, process, procedure }) => {
                const procedureRelations = getProcedureRelationships(procedure).filter((relation) => relation.profile.id === profile.id);
                return (
                  <article key={procedure.id} className={styles.relationItem}>
                    <h3>{procedure.code} · {procedure.title}</h3>
                    <p>{macro.name} / {process.name}. Responsable: {procedure.responsibleArea || 'Pendiente por validar'}.</p>
                    {procedureRelations[0] ? <p><b>{procedureRelations[0].functions.length} función(es) de este perfil lo soportan.</b> {procedureRelations[0].recommendation}</p> : null}
                    <button type="button" className={styles.inlineButton} onClick={() => setPreviewProcedure(procedure)}>
                      Abrir flujo y elementos del procedimiento
                    </button>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className={styles.mutedText}>Este perfil no tiene procedimientos relacionados con criterio estricto.</p>
          )}
        </section>

        <section className={styles.relationCard}>
          <header className={styles.sectionHeader}>
            <div><ScrollText size={18} /><h2>Nota de validación</h2></div>
          </header>
          <p className={styles.mutedText}>La matriz no asigna todos los procedimientos a todos los cargos de una dependencia. Solo vincula funciones concretas del perfil con procedimientos donde hay afinidad funcional clara. Las relaciones marcadas como “Validar” requieren confirmar estructura vigente, delegaciones y manual actualizado.</p>
        </section>
      </section>

      {isOrgChartOpen && (
        <div className={styles.orgModalBackdrop} role="dialog" aria-modal="true" aria-label="Organigrama funcional del manual de funciones">
          <section className={styles.orgModal}>
            <header className={styles.orgModalHeader}>
              <div>
                <span><Network size={15} /> Organigrama interactivo</span>
                <h2>Manual Específico de Funciones · Alcaldía Municipal de Gachetá</h2>
                <p>Usa zoom, desplazamiento y minimapa para navegar. Al seleccionar un cargo se abre su ficha funcional.</p>
              </div>
              <button type="button" className={styles.closeButton} onClick={() => setIsOrgChartOpen(false)} aria-label="Cerrar organigrama">
                <X size={18} />
              </button>
            </header>
            <div className={styles.orgModalBody}>
              <OrgChart
                profiles={allFunctionProfiles}
                selectedProfileId={profile.id}
                onSelectProfile={(profileId) => {
                  onSelectProfile?.(profileId);
                  setIsOrgChartOpen(false);
                }}
              />
            </div>
          </section>
        </div>
      )}
      <FunctionUpdateModal
        profile={profile}
        findings={updateFindings}
        actions={updateActions}
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
      />
      <ProcedurePreviewModal procedure={previewProcedure} manualData={manualData} onClose={() => setPreviewProcedure(null)} />
    </main>
  );
}
