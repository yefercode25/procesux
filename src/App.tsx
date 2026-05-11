import { useMemo, useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ProcedureDetail } from './components/ProcedureDetail';
import { Dashboard } from './components/Dashboard';
import { BuilderGuide } from './components/BuilderGuide';
import { allProcedures, manualData } from './data/manualData';
import styles from './App.module.css';

type View = 'inicio' | 'revision' | 'constructor';

function App() {
  const [query, setQuery] = useState('');
  const [activeView, setActiveView] = useState<View>('revision');
  const [selectedProcedureId, setSelectedProcedureId] = useState(allProcedures[0]?.procedure.id ?? '');
  const [activeStepId, setActiveStepId] = useState<string | null>(null);

  const selected = useMemo(
    () => allProcedures.find(({ procedure }) => procedure.id === selectedProcedureId) ?? allProcedures[0],
    [selectedProcedureId],
  );

  const handleSelectProcedure = (procedureId: string) => {
    setSelectedProcedureId(procedureId);
    setActiveStepId(null);
    setActiveView('revision');
  };

  const handleFirstPending = () => {
    const firstPending = allProcedures.find(({ procedure }) => procedure.source.validationMode !== 'visual_validated') ?? allProcedures[0];
    if (firstPending) handleSelectProcedure(firstPending.procedure.id);
  };

  return (
    <div className={styles.appShell}>
      <Header query={query} onQueryChange={setQuery} activeView={activeView} onViewChange={(view) => setActiveView(view as View)} />
      <div className={styles.workspace}>
        <Sidebar
          data={manualData}
          query={query}
          selectedProcedureId={selectedProcedureId}
          onSelectProcedure={handleSelectProcedure}
        />

        {activeView === 'inicio' && <Dashboard data={manualData} onSelectFirstPending={handleFirstPending} />}
        {activeView === 'constructor' && <BuilderGuide />}
        {activeView === 'revision' && selected && (
          <ProcedureDetail
            macro={selected.macro}
            process={selected.process}
            procedure={selected.procedure}
            activeStepId={activeStepId}
            onSelectStep={setActiveStepId}
          />
        )}
      </div>
    </div>
  );
}

export default App;
