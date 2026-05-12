import { Bell, ChevronDown, Search, Sparkles } from 'lucide-react';
import styles from './Header.module.css';

interface HeaderProps {
  query: string;
  onQueryChange: (value: string) => void;
  activeView: string;
  onViewChange: (view: string) => void;
}

const navItems = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'revision', label: 'Procesos' },
  { id: 'funciones', label: 'Funciones' },
  { id: 'constructor', label: 'Constructor' },
];

export function Header({ query, onQueryChange, activeView, onViewChange }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.brandMark} aria-hidden="true">
          <span className={styles.brandShapeTop} />
          <span className={styles.brandShapeMiddle} />
          <span className={styles.brandShapeBottom} />
        </div>
        <div className={styles.brandText}>
          <strong>ProcesUX</strong>
          <small>Procesos y funciones</small>
        </div>
      </div>

      <label className={styles.searchBox}>
        <Search size={18} />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Buscar código, proceso, cargo, función o responsable..."
        />
      </label>

      <nav className={styles.nav} aria-label="Vistas principales">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={activeView === item.id ? styles.active : ''}
            type="button"
            onClick={() => onViewChange(item.id)}
          >
            {item.id === 'constructor' && <Sparkles size={15} />}
            {item.id === 'funciones' && <Sparkles size={15} />}
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
