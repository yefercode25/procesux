import { Code2, FileJson, GitBranch, Info } from 'lucide-react';
import styles from './BuilderGuide.module.css';

const snippet = `{
  id: 'poai-7',
  number: 7,
  type: 'decision',
  label: 'Revisión del Documento',
  cycle: 'V',
  activity: 'Revisión del documento por parte del Consejo de Gobierno...',
  responsible: 'Secretaría de Infraestructura y Planeación / Consejo de Gobierno',
  branches: [
    { label: 'NO', targetStepId: 'poai-6' },
    { label: 'SI', targetStepId: 'poai-8' }
  ]
}`;

export function BuilderGuide() {
  return (
    <main className={styles.builderPanel}>
      <section className={styles.welcomeCard}>
        <span>Constructor de datos</span>
        <h1>Plantilla para implementar cada procedimiento</h1>
        <p>El proyecto está preparado para que los datos vivan en <code>src/data/manualData.ts</code>. Cada procedimiento tiene una ficha y un arreglo <code>flowSteps</code> para dibujar el diagrama.</p>
      </section>

      <section className={styles.builderGrid}>
        <article className={styles.infoCard}>
          <header><FileJson size={19} /><h2>1. Ubica el procedimiento</h2></header>
          <p>Busca el código dentro de <code>manualData.ts</code> y reemplaza campos pendientes: objetivo, alcance, definiciones, disposiciones, formatos y requisitos.</p>
        </article>
        <article className={styles.infoCard}>
          <header><GitBranch size={19} /><h2>2. Dibuja el flujo con datos</h2></header>
          <p>Cada nodo del flujograma se agrega como un elemento en <code>flowSteps</code>. El sistema reconoce inicio, actividad, decisión, documento, conector, software y fin.</p>
        </article>
        <article className={styles.infoCard}>
          <header><Info size={19} /><h2>3. Valida contra la imagen</h2></header>
          <p>Cuando el diagrama de la UI coincida con la ficha original, cambia <code>validationMode</code> a <code>visual_validated</code>.</p>
        </article>
      </section>

      <section className={styles.codeCard}>
        <header><Code2 size={19} /><h2>Ejemplo de nodo de decisión</h2></header>
        <pre>{snippet}</pre>
      </section>
    </main>
  );
}
