import { BarChart3, CheckCircle2, Database, GitBranch, Layers3 } from 'lucide-react';
import type { ManualData } from '../types/manual';
import { countProcedures } from '../utils/manualStats';
import styles from './Dashboard.module.css';

interface DashboardProps {
  data: ManualData;
  onSelectFirstPending: () => void;
}

export function Dashboard({ data, onSelectFirstPending }: DashboardProps) {
  const totalProcedures = countProcedures(data);
  const totalProcesses = data.macroprocesses.reduce((acc, macro) => acc + macro.processes.length, 0);
  const validated = data.macroprocesses.flatMap((m) => m.processes).flatMap((p) => p.procedures).filter((p) => p.source.validationMode === 'visual_validated').length;

  return (
    <main className={styles.dashboardPanel}>
      <section className={styles.welcomeCard}>
        <span>ProcesUX · Base limpia de trabajo</span>
        <h1>Reconstruye el manual con diagramas de flujo interactivos</h1>
        <p>
          Esta versión conserva la estructura de macroprocesos, procesos y procedimientos del manual, pero deja la información fina lista para completarse con validación visual procedimiento por procedimiento.
        </p>
        <button type="button" onClick={onSelectFirstPending}>Iniciar revisión</button>
      </section>

      <section className={styles.metricGrid}>
        <article><Layers3 /><span>Macroprocesos</span><strong>{data.macroprocesses.length}</strong></article>
        <article><Database /><span>Procesos</span><strong>{totalProcesses}</strong></article>
        <article><GitBranch /><span>Procedimientos</span><strong>{totalProcedures}</strong></article>
        <article><CheckCircle2 /><span>Validados visualmente</span><strong>{validated}</strong></article>
      </section>

      <section className={styles.howtoCard}>
        <div>
          <BarChart3 />
          <h2>Flujo recomendado para cargar el manual</h2>
        </div>
        <ol>
          <li>Selecciona un procedimiento en el explorador.</li>
          <li>Abre la imagen o página fuente del PDF.</li>
          <li>Transcribe objetivo, alcance, definiciones y disposiciones.</li>
          <li>Construye el arreglo <code>flowSteps</code> con cada actividad del diagrama.</li>
          <li>Marca el procedimiento como validado cuando coincida con la ficha original.</li>
        </ol>
      </section>

      <section className={styles.macroGrid}>
        {data.macroprocesses.map((macro) => (
          <article className={`${styles.macroCard} ${styles[`macro_${macro.type}`]}`} key={macro.id}>
            <span>{macro.code}</span>
            <h3>{macro.name}</h3>
            <p>{macro.processes.length} procesos · {macro.processes.reduce((acc, item) => acc + item.procedures.length, 0)} procedimientos</p>
          </article>
        ))}
      </section>
    </main>
  );
}
