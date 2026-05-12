import { useMemo, useState, type CSSProperties } from 'react';
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
} from '@xyflow/react';
import dagre from 'dagre';
import { Maximize2, X } from 'lucide-react';
import type { FlowStep } from '../types/manual';
import styles from './FlowDiagram.module.css';

interface FlowDiagramProps {
  steps: FlowStep[];
  activeStepId: string | null;
  onSelectStep: (stepId: string) => void;
}

type ProcedureNodeData = {
  step: FlowStep;
  active: boolean;
  branchBadges: Array<{ label: string; target?: string; note?: string }>;
};

const PHASE_LABEL: Record<string, string> = {
  P: 'Planear',
  H: 'Hacer',
  V: 'Verificar',
  A: 'Actuar',
};

const NODE_WIDTH = 292;
const NODE_HEIGHT = 94;
const DECISION_WIDTH = 246;
const DECISION_HEIGHT = 176;
const TERMINAL_WIDTH = 176;
const TERMINAL_HEIGHT = 58;

function nodeSize(step: FlowStep) {
  if (step.type === 'decision') return { width: DECISION_WIDTH, height: DECISION_HEIGHT };
  if (step.type === 'start' || step.type === 'end') return { width: TERMINAL_WIDTH, height: TERMINAL_HEIGHT };
  return { width: NODE_WIDTH, height: NODE_HEIGHT };
}

function ManualProcedureNode({ data }: NodeProps<Node<ProcedureNodeData>>) {
  const { step, active, branchBadges } = data;
  const isTerminal = step.type === 'start' || step.type === 'end';
  const isDecision = step.type === 'decision';

  return (
    <div
      className={[
        styles.manualNode,
        styles[`node_${step.type}`],
        active ? styles.activeNode : '',
      ].join(' ')}
      title={step.activity || step.label}
    >
      <Handle type="target" position={Position.Top} className={styles.handle} />

      {!isTerminal && <span className={styles.stepNumber}>{step.number}</span>}

      <div className={styles.nodeBody}>
        <strong>{step.label}</strong>
        {!isTerminal && step.responsible && <small>{step.responsible}</small>}
      </div>

      {!isTerminal && step.cycle && (
        <span className={`${styles.phase} ${styles[`phase_${step.cycle.toLowerCase()}`]}`} title={PHASE_LABEL[step.cycle] ?? step.cycle}>
          {step.cycle}
        </span>
      )}

      {isDecision && branchBadges.length > 0 && (
        <div className={styles.branchBadges}>
          {branchBadges.map((branch) => (
            <span key={`${branch.label}-${branch.target ?? branch.note ?? ''}`} className={`${styles.branchChip} ${branch.label.toUpperCase() === 'NO' ? styles.branchNo : styles.branchYes}`}>
              {branch.label}{branch.target ? ` → ${branch.target}` : ''}
            </span>
          ))}
        </div>
      )}

      <Handle type="source" position={Position.Bottom} className={styles.handle} />
    </div>
  );
}

const nodeTypes = {
  manualProcedureNode: ManualProcedureNode,
};

function getMiniMapNodeColor(node: Node<ProcedureNodeData>) {
  const step = node.data?.step;
  if (step?.type === 'decision') return '#f7c948';
  if (step?.type === 'start' || step?.type === 'end') return '#cfeedd';
  if (step?.type === 'document') return '#cfe2ff';
  if (step?.type === 'connector') return '#e7d8ff';
  if (step?.type === 'software') return '#d1f2eb';
  const cycle = step?.cycle;
  if (cycle === 'P') return '#004884';
  if (cycle === 'H') return '#1f7a32';
  if (cycle === 'V') return '#7250c7';
  if (cycle === 'A') return '#d71920';
  return '#8ccf66';
}

function getMiniMapNodeStroke(node: Node<ProcedureNodeData>) {
  return node.data?.active ? '#06152e' : '#ffffff';
}

function buildEdges(steps: FlowStep[]): Edge[] {
  const edges: Edge[] = [];
  const stepMap = new Map(steps.map((step) => [step.id, step]));

  steps.forEach((step, index) => {
    const next = steps[index + 1];

    if (step.branches && step.branches.length > 0) {
      step.branches.forEach((branch) => {
        if (!branch.targetStepId || branch.targetStepId === step.id || !stepMap.has(branch.targetStepId)) return;
        const isNo = branch.label.toUpperCase() === 'NO';
        edges.push({
          id: `${step.id}-${branch.label}-${branch.targetStepId}`,
          source: step.id,
          target: branch.targetStepId,
          label: branch.label,
          type: 'smoothstep',
          markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16, color: isNo ? '#d89b00' : '#4f9e3a' },
          style: {
            stroke: isNo ? '#d89b00' : '#4f9e3a',
            strokeWidth: 2,
          },
          labelStyle: {
            fill: isNo ? '#7a5300' : '#215c12',
            fontWeight: 900,
            fontSize: 12,
          },
          labelBgStyle: { fill: '#fffdf5', fillOpacity: 0.98 },
          labelBgPadding: [8, 5],
          labelBgBorderRadius: 10,
        });
      });
      return;
    }

    if (!next) return;
    edges.push({
      id: `${step.id}-${next.id}`,
      source: step.id,
      target: next.id,
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed, width: 15, height: 15, color: '#9aa7b4' },
      style: { stroke: '#72b84c', strokeWidth: 2 },
    });
  });

  return edges;
}

function getLayoutedElements(steps: FlowStep[], activeStepId: string | null) {
  const graph = new dagre.graphlib.Graph();
  graph.setDefaultEdgeLabel(() => ({}));
  graph.setGraph({ rankdir: 'TB', ranksep: 64, nodesep: 60, marginx: 56, marginy: 46 });

  steps.forEach((step) => graph.setNode(step.id, nodeSize(step)));

  buildEdges(steps)
    .filter((edge) => edge.source !== edge.target)
    .forEach((edge) => graph.setEdge(edge.source, edge.target));

  dagre.layout(graph);

  const nodes: Node<ProcedureNodeData>[] = steps.map((step) => {
    const size = nodeSize(step);
    const position = graph.node(step.id) ?? { x: 0, y: 0 };
    const branchBadges = (step.branches ?? [])
      .filter((branch) => branch.targetStepId === step.id || !branch.targetStepId)
      .map((branch) => ({ label: branch.label, target: branch.targetStepId, note: branch.note }));

    return {
      id: step.id,
      type: 'manualProcedureNode',
      position: {
        x: position.x - size.width / 2,
        y: position.y - size.height / 2,
      },
      width: size.width,
      height: size.height,
      style: { width: size.width, height: size.height, '--node-index': String(steps.indexOf(step)) } as CSSProperties,
      data: { step, active: activeStepId === step.id, branchBadges },
      draggable: false,
      selectable: true,
    };
  });

  return { nodes, edges: buildEdges(steps) };
}

function FlowCanvas({
  steps,
  activeStepId,
  onSelectStep,
  fullscreen = false,
}: FlowDiagramProps & { fullscreen?: boolean }) {
  const visibleActiveStep = activeStepId ?? steps.find((step) => step.type !== 'start')?.id ?? steps[0]?.id ?? null;
  const { nodes, edges } = useMemo(
    () => getLayoutedElements(steps, visibleActiveStep),
    [steps, visibleActiveStep],
  );

  return (
    <div className={fullscreen ? styles.fullscreenReactFlowShell : styles.reactFlowShell}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        nodesDraggable={false}
        nodesConnectable={false}
        fitView
        fitViewOptions={{ padding: fullscreen ? 0.24 : 0.18, minZoom: 0.16, maxZoom: fullscreen ? 1.25 : 1.15 }}
        minZoom={0.12}
        maxZoom={1.7}
        onNodeClick={(_, node) => onSelectStep(node.id)}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={18} size={1} color="#d7e4f2" />
        <MiniMap
          pannable
          zoomable
          position="bottom-right"
          nodeColor={getMiniMapNodeColor}
          nodeStrokeColor={getMiniMapNodeStroke}
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

export function FlowDiagram({ steps, activeStepId, onSelectStep }: FlowDiagramProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (steps.length === 0) {
    return (
      <div className={styles.emptyFlow}>
        <strong>Diagrama pendiente por construir</strong>
        <p>Agrega los pasos en <code>manualData.ts</code>. El visor dibujará automáticamente el flujograma con nodos tipo actividad, decisión, documento, conector e inicio/fin.</p>
      </div>
    );
  }

  return (
    <>
      <section className={styles.flowBoard} aria-label="Diagrama de flujo interactivo">
        <div className={styles.toolbar}>
          <span>Flujo del procedimiento</span>
          <button type="button" onClick={() => setIsFullscreen(true)}>
            <Maximize2 size={15} /> Abrir pantalla completa
          </button>
        </div>
        <FlowCanvas steps={steps} activeStepId={activeStepId} onSelectStep={onSelectStep} />
      </section>

      {isFullscreen && (
        <div className={styles.fullscreenBackdrop} role="dialog" aria-modal="true" aria-label="Flujo del procedimiento en pantalla completa">
          <section className={styles.fullscreenModal}>
            <header className={styles.fullscreenHeader}>
              <div>
                <span>Modo paso a paso</span>
                <h2>Flujo del procedimiento</h2>
                <p>Selecciona cada nodo para revisar el detalle del paso en la vista principal.</p>
              </div>
              <button type="button" onClick={() => setIsFullscreen(false)} aria-label="Cerrar pantalla completa">
                <X size={18} />
              </button>
            </header>
            <FlowCanvas steps={steps} activeStepId={activeStepId} onSelectStep={onSelectStep} fullscreen />
          </section>
        </div>
      )}
    </>
  );
}
