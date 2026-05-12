import { useMemo } from 'react';
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
import { Building2, ShieldCheck, UserRoundCheck, UsersRound } from 'lucide-react';
import type { FunctionProfile } from '../types/manual';
import styles from './OrgChart.module.css';

interface OrgChartProps {
  profiles: FunctionProfile[];
  selectedProfileId: string;
  onSelectProfile?: (profileId: string) => void;
}

type OrgNodeData = {
  profile: FunctionProfile;
  selected: boolean;
};

const levelLabel: Record<FunctionProfile['level'], string> = {
  directivo: 'Directivo',
  profesional: 'Profesional',
  tecnico: 'Técnico',
  asistencial: 'Asistencial',
};

const NODE_WIDTH = 292;
const NODE_HEIGHT = 118;

const secretaryParentMap: Record<string, string> = {
  'secretario-gobierno-020-04': 'alcalde-005-06',
  'secretario-planeacion-020-04': 'alcalde-005-06',
  'secretario-desarrollo-social-020-04': 'alcalde-005-06',
  'secretario-hacienda-020-04': 'alcalde-005-06',
  'secretario-desarrollo-economico-020-04': 'alcalde-005-06',
};

const directParentMap: Record<string, string> = {
  'jefe-control-interno-006-04': 'alcalde-005-06',
  'profesional-gobierno-219-03': 'secretario-gobierno-020-04',
  'inspector-policia-303-03': 'secretario-gobierno-020-04',
  'comisario-familia-202-04': 'secretario-gobierno-020-04',
  'profesional-comisaria-219-03': 'comisario-familia-202-04',
  'tecnico-gobierno-almacen-367-03': 'secretario-gobierno-020-04',
  'profesional-planeacion-219-03': 'secretario-planeacion-020-04',
  'profesional-desarrollo-social-219-03': 'secretario-desarrollo-social-020-04',
  'tecnico-cultura-367-03': 'secretario-desarrollo-social-020-04',
  'tecnico-hacienda-367-06': 'secretario-hacienda-020-04',
  'tecnico-apoyo-hacienda-367-03': 'secretario-hacienda-020-04',
  'profesional-desarrollo-economico-219-03': 'secretario-desarrollo-economico-020-04',
  'tecnico-transversal-367-06': 'alcalde-005-06',
  'secretario-ejecutivo-425-05': 'alcalde-005-06',
  'auxiliar-administrativo-407-04': 'alcalde-005-06',
  'auxiliar-servicios-generales-470-02': 'alcalde-005-06',
  'conductor-480-06': 'alcalde-005-06',
  'operario-487-03': 'alcalde-005-06',
  ...secretaryParentMap,
};

function OrgProfileNode({ data }: NodeProps<Node<OrgNodeData>>) {
  const { profile, selected } = data;
  return (
    <div className={`${styles.orgNode} ${styles[`level_${profile.level}`]} ${selected ? styles.selectedNode : ''}`}>
      <Handle type="target" position={Position.Top} className={styles.handle} />
      <div className={styles.nodeTopline}>
        <span>{levelLabel[profile.level]}</span>
        <em>{profile.positions} cargo{profile.positions === 1 ? '' : 's'}</em>
      </div>
      <strong>{profile.denomination}</strong>
      <p>{profile.functionalArea}</p>
      <div className={styles.nodeMeta}>
        <span>Cód. {profile.code}</span>
        <span>Gr. {profile.grade}</span>
        <span>{profile.functions.length} funciones</span>
      </div>
      <Handle type="source" position={Position.Bottom} className={styles.handle} />
    </div>
  );
}

const nodeTypes = {
  orgProfileNode: OrgProfileNode,
};

function getNodeColor(node: Node<OrgNodeData>) {
  if (node.data.profile.level === 'directivo') return '#004884';
  if (node.data.profile.level === 'profesional') return '#2f9e44';
  if (node.data.profile.level === 'tecnico') return '#fdd400';
  return '#db0a13';
}

function buildOrgElements(profiles: FunctionProfile[], selectedProfileId: string) {
  const profileIds = new Set(profiles.map((profile) => profile.id));
  const edges: Edge[] = profiles.flatMap((profile) => {
    const parentId = directParentMap[profile.id];
    if (!parentId || !profileIds.has(parentId)) return [];
    return [{
      id: `${parentId}-${profile.id}`,
      source: parentId,
      target: profile.id,
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed, width: 15, height: 15, color: '#8ccf66' },
      style: { stroke: '#8ccf66', strokeWidth: 2 },
    }];
  });

  const graph = new dagre.graphlib.Graph();
  graph.setDefaultEdgeLabel(() => ({}));
  graph.setGraph({ rankdir: 'TB', ranksep: 82, nodesep: 38, marginx: 56, marginy: 48 });

  profiles.forEach((profile) => graph.setNode(profile.id, { width: NODE_WIDTH, height: NODE_HEIGHT }));
  edges.forEach((edge) => graph.setEdge(edge.source, edge.target));
  dagre.layout(graph);

  const nodes: Node<OrgNodeData>[] = profiles.map((profile) => {
    const position = graph.node(profile.id) ?? { x: 0, y: 0 };
    return {
      id: profile.id,
      type: 'orgProfileNode',
      position: {
        x: position.x - NODE_WIDTH / 2,
        y: position.y - NODE_HEIGHT / 2,
      },
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
      style: { width: NODE_WIDTH, height: NODE_HEIGHT },
      data: { profile, selected: profile.id === selectedProfileId },
      draggable: false,
      selectable: true,
    };
  });

  return { nodes, edges };
}

export function OrgChart({ profiles, selectedProfileId, onSelectProfile }: OrgChartProps) {
  const { nodes, edges } = useMemo(() => buildOrgElements(profiles, selectedProfileId), [profiles, selectedProfileId]);
  const totals = profiles.reduce((acc, profile) => {
    acc.positions += profile.positions;
    acc.functions += profile.functions.length;
    return acc;
  }, { positions: 0, functions: 0 });

  return (
    <section className={styles.orgCard} aria-label="Organigrama funcional interactivo">
      <header className={styles.header}>
        <div>
          <span className={styles.kicker}><Building2 size={15} /> Organigrama funcional</span>
          <h2>Estructura jerárquica basada en el Manual Específico de Funciones</h2>
          <p>Explora todos los perfiles, cargos, dependencias, jefes inmediatos y funciones cargadas. Selecciona un nodo para abrir su ficha funcional.</p>
        </div>
        <div className={styles.stats}>
          <span><UsersRound size={15} /> {profiles.length} perfiles</span>
          <span><UserRoundCheck size={15} /> {totals.positions} cargos</span>
          <span><ShieldCheck size={15} /> {totals.functions} funciones</span>
        </div>
      </header>

      <div className={styles.legendRow}>
        <span><i className={styles.legendDirectivo} /> Directivo</span>
        <span><i className={styles.legendProfesional} /> Profesional</span>
        <span><i className={styles.legendTecnico} /> Técnico</span>
        <span><i className={styles.legendAsistencial} /> Asistencial</span>
      </div>

      <div className={styles.reactFlowShell}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          nodesDraggable={false}
          nodesConnectable={false}
          fitView
          fitViewOptions={{ padding: 0.18, minZoom: 0.18, maxZoom: 1.1 }}
          minZoom={0.16}
          maxZoom={1.45}
          onNodeClick={(_, node) => onSelectProfile?.(node.id)}
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={20} size={1} color="#d7e4f2" />
          <MiniMap
            pannable
            zoomable
            position="bottom-right"
            nodeColor={getNodeColor}
            nodeStrokeColor={(node) => node.data?.selected ? '#06152e' : '#ffffff'}
            nodeStrokeWidth={3}
            maskColor="rgba(0, 72, 132, 0.08)"
            maskStrokeColor="#004884"
            maskStrokeWidth={2}
            className={styles.minimap}
          />
          <Controls showInteractive={false} className={styles.controls} />
        </ReactFlow>
      </div>
    </section>
  );
}
