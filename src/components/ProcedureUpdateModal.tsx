import { useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import {
  Background,
  Controls,
  Handle,
  MarkerType,
  MiniMap,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
  type NodeTypes,
} from '@xyflow/react';
import dagre from 'dagre';
import { AlertTriangle, CheckCircle2, FilePenLine, GitPullRequestArrow, Maximize2, PlusCircle, RefreshCcw, Scale, ShieldCheck, Trash2, X } from 'lucide-react';
import type { FlowNodeType, ProcedureItem } from '../types/manual';
import { getProcedureRecommendedFlow, type MissingProcedureRecommendation, type ProcedureRecommendedFlowStep, type ProcedureUpdateAction } from '../utils/relations';
import styles from './ProcedureUpdateModal.module.css';

interface ProcedureUpdateModalProps {
  procedure: ProcedureItem;
  actions: ProcedureUpdateAction[];
  missingRecommendations: MissingProcedureRecommendation[];
  isOpen: boolean;
  onClose: () => void;
}

const actionLabel: Record<ProcedureUpdateAction['action'], string> = {
  mantener: 'Mantener',
  modificar: 'Modificar',
  agregar: 'Agregar',
  quitar: 'Quitar',
  fusionar: 'Fusionar',
  trasladar: 'Trasladar',
};

const actionIcon: Record<ProcedureUpdateAction['action'], ReactNode> = {
  mantener: <CheckCircle2 size={15} />,
  modificar: <RefreshCcw size={15} />,
  agregar: <PlusCircle size={15} />,
  quitar: <Trash2 size={15} />,
  fusionar: <GitPullRequestArrow size={15} />,
  trasladar: <FilePenLine size={15} />,
};

const severityLabel: Record<ProcedureUpdateAction['severity'], string> = {
  critico: 'Crítico',
  alto: 'Alto',
  medio: 'Medio',
  bajo: 'Bajo',
};

type RecommendedFlowNodeData = {
  stepNumber: number;
  phase: ProcedureRecommendedFlowStep['phase'];
  nodeType: FlowNodeType;
  title: string;
  description: string;
  responsible: string;
  evidence: string;
  decision?: string;
  compactLabel?: string;
  nodeIndex?: number;
};

const PHASE_LABEL: Record<ProcedureRecommendedFlowStep['phase'], string> = {
  P: 'Planear',
  H: 'Hacer',
  V: 'Verificar',
  A: 'Actuar',
};

const NODE_WIDTH = 340;
const NODE_HEIGHT = 142;
const DOCUMENT_WIDTH = 332;
const DOCUMENT_HEIGHT = 126;
const DECISION_WIDTH = 316;
const DECISION_HEIGHT = 224;
const TERMINAL_WIDTH = 228;
const TERMINAL_HEIGHT = 66;

function nodeSize(nodeType: FlowNodeType) {
  if (nodeType === 'decision') return { width: DECISION_WIDTH, height: DECISION_HEIGHT };
  if (nodeType === 'document') return { width: DOCUMENT_WIDTH, height: DOCUMENT_HEIGHT };
  if (nodeType === 'start' || nodeType === 'end') return { width: TERMINAL_WIDTH, height: TERMINAL_HEIGHT };
  return { width: NODE_WIDTH, height: NODE_HEIGHT };
}

function RecommendedFlowNode({ data }: NodeProps<Node<RecommendedFlowNodeData>>) {
  const isTerminal = data.nodeType === 'start' || data.nodeType === 'end';
  const isDecision = data.nodeType === 'decision';
  const isDocument = data.nodeType === 'document';

  return (
    <div className={[styles.recommendedNode, styles[`recommended_${data.nodeType}`], styles[`phase_${data.phase}`]].join(' ')}>
      <Handle type="target" position={Position.Top} className={styles.handle} />
      {!isTerminal && <span className={styles.stepBubble}>{data.stepNumber}</span>}
      <div className={styles.recommendedNodeBody}>
        <small>{isTerminal ? data.compactLabel : `${isDocument ? 'Documento' : isDecision ? 'Decisión' : 'Actividad'} · ${PHASE_LABEL[data.phase]}`}</small>
        <strong>{data.title}</strong>
        {!isTerminal && <p>{data.description}</p>}
        {data.decision && <em>{data.decision}</em>}
        {!isTerminal && !isDocument && <b>{data.responsible}</b>}
        {isDocument && <b>{data.evidence}</b>}
      </div>
      {!isTerminal && <span className={styles.phaseBadge}>{data.phase}</span>}
      <Handle type="source" position={Position.Bottom} className={styles.handle} />
    </div>
  );
}

const nodeTypes: NodeTypes = { recommendedFlowNode: RecommendedFlowNode };

function getMiniMapNodeColor(node: Node<RecommendedFlowNodeData>) {
  if (node.data.nodeType === 'decision') return '#f7c948';
  if (node.data.nodeType === 'document') return '#cfe2ff';
  if (node.data.nodeType === 'connector') return '#e7d8ff';
  if (node.data.nodeType === 'start' || node.data.nodeType === 'end') return '#cfeedd';
  if (node.data.phase === 'P') return '#0645b0';
  if (node.data.phase === 'H') return '#018a2c';
  if (node.data.phase === 'V') return '#7250c7';
  return '#db0a13';
}

function edge(source: string, target: string, label?: string, tone: 'default' | 'doc' | 'decision' = 'default'): Edge {
  const color = tone === 'doc' ? '#4a8fe7' : tone === 'decision' ? '#d89b00' : '#72b84c';
  return {
    id: `${source}-${target}`,
    source,
    target,
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed, width: 15, height: 15, color },
    style: { stroke: color, strokeWidth: 2 },
    label,
    labelStyle: { fill: tone === 'decision' ? '#7a5300' : '#00305a', fontWeight: 900, fontSize: 11 },
    labelBgStyle: { fill: '#ffffff', fillOpacity: 0.94 },
    labelBgPadding: [7, 4],
    labelBgBorderRadius: 10,
  };
}

function buildRecommendedFlowGraph(steps: ProcedureRecommendedFlowStep[]) {
  const nodes: Node<RecommendedFlowNodeData>[] = [];
  const edges: Edge[] = [];

  nodes.push({
    id: 'inicio-recomendado',
    type: 'recommendedFlowNode',
    position: { x: 0, y: 0 },
    ...nodeSize('start'),
    style: { ...nodeSize('start'), '--node-index': '0' } as CSSProperties,
    data: {
      stepNumber: 0,
      phase: 'P',
      nodeType: 'start',
      title: 'Inicio',
      description: 'Inicio del flujo recomendado.',
      responsible: '',
      evidence: '',
      compactLabel: 'Inicio del rediseño',
      nodeIndex: 0,
    },
    draggable: false,
  });

  let previousId = 'inicio-recomendado';

  steps.forEach((flowStep, index) => {
    const isDecision = Boolean(flowStep.decision);
    const activityId = `${flowStep.id}-${isDecision ? 'decision' : 'actividad'}`;
    const evidenceId = `${flowStep.id}-documento`;
    const activitySize = nodeSize(isDecision ? 'decision' : 'activity');
    const documentSize = nodeSize('document');

    nodes.push({
      id: activityId,
      type: 'recommendedFlowNode',
      position: { x: 0, y: 0 },
      width: activitySize.width,
      height: activitySize.height,
      style: { ...activitySize, '--node-index': String(index * 2 + 1) } as CSSProperties,
      data: {
        stepNumber: index + 1,
        phase: flowStep.phase,
        nodeType: isDecision ? 'decision' : 'activity',
        title: flowStep.title,
        description: flowStep.description,
        responsible: flowStep.responsible,
        evidence: flowStep.evidence,
        decision: flowStep.decision,
        nodeIndex: index * 2 + 1,
      },
      draggable: false,
    });

    nodes.push({
      id: evidenceId,
      type: 'recommendedFlowNode',
      position: { x: 0, y: 0 },
      width: documentSize.width,
      height: documentSize.height,
      style: { ...documentSize, '--node-index': String(index * 2 + 2) } as CSSProperties,
      data: {
        stepNumber: index + 1,
        phase: flowStep.phase,
        nodeType: 'document',
        title: 'Evidencia mínima',
        description: flowStep.evidence,
        responsible: flowStep.responsible,
        evidence: flowStep.evidence,
        nodeIndex: index * 2 + 2,
      },
      draggable: false,
    });

    edges.push(edge(previousId, activityId, index === 0 ? 'Inicia' : undefined));
    edges.push(edge(activityId, evidenceId, 'Soporte', 'doc'));
    previousId = evidenceId;
  });

  nodes.push({
    id: 'fin-recomendado',
    type: 'recommendedFlowNode',
    position: { x: 0, y: 0 },
    ...nodeSize('end'),
    style: { ...nodeSize('end'), '--node-index': String(steps.length * 2 + 2) } as CSSProperties,
    data: {
      stepNumber: steps.length + 1,
      phase: 'A',
      nodeType: 'end',
      title: 'Fin',
      description: 'Cierre del procedimiento actualizado.',
      responsible: '',
      evidence: '',
      compactLabel: 'Cierre y control de cambios',
      nodeIndex: steps.length * 2 + 2,
    },
    draggable: false,
  });
  edges.push(edge(previousId, 'fin-recomendado', 'Cierre'));

  const graph = new dagre.graphlib.Graph();
  graph.setDefaultEdgeLabel(() => ({}));
  graph.setGraph({ rankdir: 'TB', ranksep: 64, nodesep: 72, marginx: 64, marginy: 52 });

  nodes.forEach((node) => graph.setNode(node.id, { width: node.width ?? NODE_WIDTH, height: node.height ?? NODE_HEIGHT }));
  edges.forEach((edgeItem) => graph.setEdge(edgeItem.source, edgeItem.target));
  dagre.layout(graph);

  const layoutedNodes = nodes.map((node) => {
    const size = { width: node.width ?? NODE_WIDTH, height: node.height ?? NODE_HEIGHT };
    const position = graph.node(node.id) ?? { x: 0, y: 0 };
    return {
      ...node,
      position: {
        x: position.x - size.width / 2,
        y: position.y - size.height / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
}

function RecommendedFlowCanvas({ nodes, edges, fullscreen = false }: { nodes: Node<RecommendedFlowNodeData>[]; edges: Edge[]; fullscreen?: boolean }) {
  return (
    <div className={`${styles.reactFlowShell} ${styles.fullFlowShell} ${fullscreen ? styles.fullscreenFlowShell : ''}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        nodesDraggable={false}
        nodesConnectable={false}
        fitView
        fitViewOptions={{ padding: fullscreen ? 0.18 : 0.16, minZoom: 0.12, maxZoom: fullscreen ? 1.05 : 0.9 }}
        minZoom={0.1}
        maxZoom={1.35}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={18} size={1} color="#d7e4f2" />
        <MiniMap
          pannable
          zoomable
          position="bottom-right"
          nodeColor={getMiniMapNodeColor}
          nodeStrokeColor="#ffffff"
          nodeStrokeWidth={3}
          maskColor="rgba(0, 72, 132, 0.08)"
          maskStrokeColor="#004884"
          maskStrokeWidth={2}
          className={styles.minimap}
        />
        <Controls showInteractive={false} className={styles.controls} />
      </ReactFlow>
    </div>
  );
}

export function ProcedureUpdateModal({ procedure, actions, missingRecommendations, isOpen, onClose }: ProcedureUpdateModalProps) {
  const [isFlowFullscreen, setIsFlowFullscreen] = useState(false);
  const recommendedFlow = useMemo(() => getProcedureRecommendedFlow(procedure), [procedure]);
  const { nodes: recommendedNodes, edges: recommendedEdges } = useMemo(() => buildRecommendedFlowGraph(recommendedFlow), [recommendedFlow]);

  const groupedActions = actions.reduce<Record<ProcedureUpdateAction['action'], ProcedureUpdateAction[]>>((acc, action) => {
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

  const highestSeverity = actions.some((action) => action.severity === 'critico')
    ? 'Crítico'
    : actions.some((action) => action.severity === 'alto')
      ? 'Alto'
      : actions.some((action) => action.severity === 'medio')
        ? 'Medio'
        : 'Bajo';

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label="Propuesta de actualización de procesos y procedimientos">
      <section className={styles.modal}>
        <header className={styles.header}>
          <div>
            <span className={styles.kicker}><ShieldCheck size={15} /> Propuesta normativa del procedimiento</span>
            <h2>{procedure.code} · {procedure.title}</h2>
            <p>{procedure.responsibleArea || 'Responsable pendiente por validar'}</p>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Cerrar propuesta de actualización">
            <X size={18} />
          </button>
        </header>

        <div className={styles.body}>
          <section className={styles.noticeCard}>
            <div><Scale size={18} /></div>
            <p>
              Esta matriz orienta la actualización del Manual de Procesos y Procedimientos. No reemplaza el concepto jurídico ni el acto formal de adopción; permite ver el flujo recomendado, las evidencias mínimas, los cambios sugeridos y su impacto operativo.
            </p>
          </section>

          <section className={styles.modalStatsGrid}>
            <article><span>Nivel de atención</span><strong>{highestSeverity}</strong></article>
            <article><span>Acciones</span><strong>{actions.length}</strong></article>
            <article><span>Pasos recomendados</span><strong>{recommendedFlow.length}</strong></article>
            <article><span>Nuevos procedimientos</span><strong>{missingRecommendations.length}</strong></article>
          </section>

          <section className={styles.graphCard}>
            <header>
              <div>
                <h3>Flujo completo recomendado</h3>
                <p>Ruta vertical propuesta con componentes tipo actividad, decisión, documento, inicio y fin para hacer seguimiento paso a paso.</p>
              </div>
              <button type="button" className={styles.fullscreenButton} onClick={() => setIsFlowFullscreen(true)}>
                <Maximize2 size={15} /> Abrir pantalla completa
              </button>
            </header>
            <RecommendedFlowCanvas nodes={recommendedNodes} edges={recommendedEdges} />
          </section>

          <section className={styles.flowTableCard}>
            <header>
              <div>
                <h3>Lectura detallada del flujo recomendado</h3>
                <p>Resumen paso a paso para copiar al rediseño del procedimiento.</p>
              </div>
            </header>
            <div className={styles.flowStepsGrid}>
              {recommendedFlow.map((flowStep, index) => (
                <article key={flowStep.id}>
                  <span>Fase {flowStep.phase} · Paso {index + 1}</span>
                  <strong>{flowStep.title}</strong>
                  <p>{flowStep.description}</p>
                  {flowStep.decision && <em>{flowStep.decision}</em>}
                  <small><b>Responsable:</b> {flowStep.responsible}</small>
                  <small><b>Evidencia:</b> {flowStep.evidence}</small>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.actionSummary}>
            {Object.entries(groupedActions).map(([key, list]) => (
              <div key={key}>
                <span>{actionLabel[key as ProcedureUpdateAction['action']]}</span>
                <strong>{list.length}</strong>
              </div>
            ))}
          </section>

          <section className={styles.actionsList}>
            {actions.map((action) => (
              <article key={action.id} className={`${styles.actionCard} ${styles[`action_${action.action}`]}`}>
                <header>
                  <span className={styles.actionBadge}>{actionIcon[action.action]} {actionLabel[action.action]}</span>
                  <em>{severityLabel[action.severity]}</em>
                </header>
                <h3>{action.title}</h3>

                <div className={styles.stateGrid}>
                  <div>
                    <span>Estado actual</span>
                    <p>{action.currentState}</p>
                  </div>
                  <div>
                    <span>Cómo debe quedar</span>
                    <p>{action.proposedState}</p>
                  </div>
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

                {action.suggestedFlow.length > 0 && (
                  <div className={styles.flowList}>
                    <span>Flujo específico de la acción</span>
                    <ol>
                      {action.suggestedFlow.map((step) => <li key={step}>{step}</li>)}
                    </ol>
                  </div>
                )}
              </article>
            ))}
          </section>

          {missingRecommendations.length > 0 && (
            <section className={styles.missingCard}>
              <header>
                <div><AlertTriangle size={18} /><h3>Procedimientos recomendados para incorporar al manual</h3></div>
                <span>{missingRecommendations.length}</span>
              </header>
              <div className={styles.missingGrid}>
                {missingRecommendations.map((item) => (
                  <article key={item.id}>
                    <b>{item.title}</b>
                    <p>{item.reason}</p>
                    <small><strong>Responsable sugerido:</strong> {item.suggestedResponsible}</small>
                    <small><strong>Soporte:</strong> {item.normativeBasis}</small>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      {isFlowFullscreen && (
        <div className={styles.fullscreenBackdrop} role="dialog" aria-modal="true" aria-label="Flujo recomendado en pantalla completa">
          <section className={styles.fullscreenModal}>
            <header className={styles.fullscreenHeader}>
              <div>
                <span>Modo paso a paso recomendado</span>
                <h2>{procedure.code} · Flujo recomendado</h2>
                <p>Recorre verticalmente actividades, decisiones y documentos mínimos. Usa zoom, desplazamiento y minimapa.</p>
              </div>
              <button type="button" onClick={() => setIsFlowFullscreen(false)} aria-label="Cerrar pantalla completa">
                <X size={18} />
              </button>
            </header>
            <RecommendedFlowCanvas nodes={recommendedNodes} edges={recommendedEdges} fullscreen />
          </section>
        </div>
      )}
    </div>
  );
}
