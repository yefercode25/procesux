import { useMemo, useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ProcedureDetail } from './components/ProcedureDetail';
import { FunctionDetail } from './components/FunctionDetail';
import { Dashboard } from './components/Dashboard';
import { BuilderGuide } from './components/BuilderGuide';
import { allProcedures, manualData } from './data/manualData';
import { allFunctionProfiles, functionsManualData } from './data/functionsManualData';
import type { ManualModule } from './types/manual';
import styles from './App.module.css';

type View = 'inicio' | 'revision' | 'funciones' | 'constructor';

function App() {
  const [query, setQuery] = useState('');
  const [activeView, setActiveView] = useState<View>('revision');
  const [selectedProcedureId, setSelectedProcedureId] = useState(allProcedures[0]?.procedure.id ?? '');
  const [selectedProfileId, setSelectedProfileId] = useState(allFunctionProfiles[0]?.id ?? '');
  const [activeStepId, setActiveStepId] = useState<string | null>(null);

  const selected = useMemo(
    () => allProcedures.find(({ procedure }) => procedure.id === selectedProcedureId) ?? allProcedures[0],
    [selectedProcedureId],
  );

  const selectedProfile = useMemo(
    () => allFunctionProfiles.find((profile) => profile.id === selectedProfileId) ?? allFunctionProfiles[0],
    [selectedProfileId],
  );

  const module: ManualModule = activeView === 'funciones' ? 'functions' : 'processes';

  const handleSelectProcedure = (procedureId: string) => {
    setSelectedProcedureId(procedureId);
    setActiveStepId(null);
    setActiveView('revision');
  };

  const handleSelectProfile = (profileId: string) => {
    setSelectedProfileId(profileId);
    setActiveView('funciones');
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
          functionsData={functionsManualData}
          query={query}
          module={module}
          selectedProcedureId={selectedProcedureId}
          selectedProfileId={selectedProfileId}
          onSelectProcedure={handleSelectProcedure}
          onSelectProfile={handleSelectProfile}
        />

        {activeView === 'inicio' && <Dashboard data={manualData} functionsData={functionsManualData} onSelectFirstPending={handleFirstPending} />}
        {activeView === 'constructor' && <BuilderGuide />}
        {activeView === 'funciones' && selectedProfile && <FunctionDetail profile={selectedProfile} manualData={manualData} onSelectProfile={handleSelectProfile} />}
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
