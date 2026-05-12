import { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Link2, PanelLeftOpen } from 'lucide-react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ProcedureDetail } from './components/ProcedureDetail';
import { FunctionDetail } from './components/FunctionDetail';
import { Dashboard } from './components/Dashboard';
import { InstitutionalIntelligence } from './components/InstitutionalIntelligence';
import { GovernanceCenter } from './components/GovernanceCenter';
import { allProcedures, manualData } from './data/manualData';
import { allFunctionProfiles, functionsManualData } from './data/functionsManualData';
import type { ManualModule } from './types/manual';
import styles from './App.module.css';

type View = 'inicio' | 'revision' | 'funciones' | 'analisis' | 'gobernanza';
type ShareKind = 'proceso' | 'cargo';

type RouteState = {
  activeView: View;
  selectedProcedureId: string;
  selectedProfileId: string;
  isolated: boolean;
};

const normalizeId = (value: string | null | undefined) => decodeURIComponent(value ?? '').trim().toLowerCase();

const routeMarkers = new Set([
  'consulta',
  'inicio',
  'analisis',
  'gobernanza',
  'publico',
  'procesos',
  'proceso',
  'procedimientos',
  'procedimiento',
  'cargos',
  'cargo',
  'perfiles',
  'perfil',
  'funciones',
  'funcion',
]);

const defaultRoute = (): RouteState => ({
  activeView: 'revision',
  selectedProcedureId: allProcedures[0]?.procedure.id ?? '',
  selectedProfileId: allFunctionProfiles[0]?.id ?? '',
  isolated: false,
});

const findProcedureByValue = (value: string) =>
  allProcedures.find(({ procedure }) => procedure.id === value || procedure.code.toLowerCase() === value);

const findProfileByValue = (value: string) =>
  allFunctionProfiles.find((profile) => profile.id === value);

const parsePathRoute = (pathname: string): Partial<RouteState> | null => {
  const segments = pathname
    .split('/')
    .map((segment) => normalizeId(segment))
    .filter(Boolean);

  if (!segments.length) return null;

  const markerIndex = segments.findIndex((segment) => routeMarkers.has(segment));
  if (markerIndex === -1) return null;

  const relevant = segments.slice(markerIndex);
  const isolated = relevant[0] === 'consulta' || relevant.at(-1) === 'consulta';
  const route = relevant[0] === 'consulta' ? relevant.slice(1) : relevant;

  const [kind, rawId] = route;
  const id = normalizeId(rawId);

  if (kind === 'inicio') return { activeView: 'inicio', isolated: false };
  if (kind === 'analisis') return { activeView: 'analisis', isolated: false };
  if (kind === 'gobernanza') return { activeView: 'gobernanza', isolated: false };

  if (kind === 'publico' && route.length >= 3) {
    const publicKind = route[1];
    const publicId = normalizeId(route[2]);
    if (['procesos', 'proceso', 'procedimientos', 'procedimiento'].includes(publicKind)) {
      const procedure = findProcedureByValue(publicId);
      if (procedure) return { activeView: 'revision', selectedProcedureId: procedure.procedure.id, isolated: true };
    }
    if (['cargos', 'cargo', 'perfiles', 'perfil', 'funciones', 'funcion'].includes(publicKind)) {
      const profile = findProfileByValue(publicId);
      if (profile) return { activeView: 'funciones', selectedProfileId: profile.id, isolated: true };
    }
  }

  if (['procesos', 'proceso', 'procedimientos', 'procedimiento'].includes(kind) && id) {
    const procedure = findProcedureByValue(id);
    if (procedure) {
      return {
        activeView: 'revision',
        selectedProcedureId: procedure.procedure.id,
        isolated,
      };
    }
  }

  if (['cargos', 'cargo', 'perfiles', 'perfil', 'funciones', 'funcion'].includes(kind) && id) {
    const profile = findProfileByValue(id);
    if (profile) {
      return {
        activeView: 'funciones',
        selectedProfileId: profile.id,
        isolated,
      };
    }
  }

  return null;
};

const parseQueryRoute = (): Partial<RouteState> | null => {
  if (typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  const procedureParam = normalizeId(params.get('proceso') ?? params.get('procedimiento'));
  const profileParam = normalizeId(params.get('cargo') ?? params.get('perfil'));
  const isolated = params.get('solo') === '1' || params.get('modo') === 'consulta';

  const procedure = findProcedureByValue(procedureParam);
  const profile = findProfileByValue(profileParam);

  if (profile) {
    return {
      activeView: 'funciones',
      selectedProfileId: profile.id,
      isolated,
    };
  }

  if (procedure) {
    return {
      activeView: 'revision',
      selectedProcedureId: procedure.procedure.id,
      isolated,
    };
  }

  const viewParam = params.get('vista') as View | null;
  if (viewParam && ['inicio', 'revision', 'funciones', 'analisis', 'gobernanza'].includes(viewParam)) {
    return { activeView: viewParam, isolated: false };
  }

  return null;
};

const resolveRoute = (): RouteState => {
  const fallback = defaultRoute();
  if (typeof window === 'undefined') return fallback;

  const pathRoute = parsePathRoute(window.location.pathname);
  const queryRoute = parseQueryRoute();
  const route = pathRoute ?? queryRoute ?? {};

  return {
    ...fallback,
    ...route,
  };
};

const getAppBasePath = () => {
  if (typeof window === 'undefined') return '';

  const rawSegments = window.location.pathname.split('/').filter(Boolean);
  const normalizedSegments = rawSegments.map((segment) => normalizeId(segment));
  const markerIndex = normalizedSegments.findIndex((segment) => routeMarkers.has(segment));

  if (markerIndex >= 0) {
    return rawSegments.slice(0, markerIndex).join('/');
  }

  const lastSegment = rawSegments.at(-1) ?? '';
  if (lastSegment.includes('.')) {
    return rawSegments.slice(0, -1).join('/');
  }

  return rawSegments.join('/');
};

const buildPathUrl = (segments: string[]) => {
  const url = new URL(window.location.href);
  const basePath = getAppBasePath();
  const pathSegments = [...(basePath ? basePath.split('/') : []), ...segments].filter(Boolean);

  url.pathname = `/${pathSegments.map((segment) => encodeURIComponent(segment)).join('/')}`;
  url.search = '';
  url.hash = '';
  return url.toString();
};

const buildUrl = (kind: ShareKind, id: string, isolated = false) => {
  const collection = kind === 'proceso' ? 'procesos' : 'cargos';
  return buildPathUrl(isolated ? ['consulta', collection, id] : [collection, id]);
};

const buildViewUrl = (view: View, selectedProcedureId: string, selectedProfileId: string) => {
  if (view === 'inicio') return buildPathUrl(['inicio']);
  if (view === 'analisis') return buildPathUrl(['analisis']);
  if (view === 'gobernanza') return buildPathUrl(['gobernanza']);
  if (view === 'funciones') return buildUrl('cargo', selectedProfileId, false);
  return buildUrl('proceso', selectedProcedureId, false);
};

const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', 'true');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  }
};

function App() {
  const initialRoute = useMemo(() => resolveRoute(), []);
  const [query, setQuery] = useState('');
  const [activeView, setActiveView] = useState<View>(initialRoute.activeView);
  const [selectedProcedureId, setSelectedProcedureId] = useState(initialRoute.selectedProcedureId);
  const [selectedProfileId, setSelectedProfileId] = useState(initialRoute.selectedProfileId);
  const [activeStepId, setActiveStepId] = useState<string | null>(null);
  const [isIsolatedRoute, setIsIsolatedRoute] = useState(initialRoute.isolated);
  const [copyNotice, setCopyNotice] = useState<string | null>(null);

  const selected = useMemo(
    () => allProcedures.find(({ procedure }) => procedure.id === selectedProcedureId) ?? allProcedures[0],
    [selectedProcedureId],
  );

  const selectedProfile = useMemo(
    () => allFunctionProfiles.find((profile) => profile.id === selectedProfileId) ?? allFunctionProfiles[0],
    [selectedProfileId],
  );

  const module: ManualModule = activeView === 'funciones' ? 'functions' : 'processes';

  useEffect(() => {
    if (!copyNotice) return;
    const timer = window.setTimeout(() => setCopyNotice(null), 2400);
    return () => window.clearTimeout(timer);
  }, [copyNotice]);

  const applyRoute = (route: RouteState) => {
    setActiveView(route.activeView);
    setSelectedProcedureId(route.selectedProcedureId);
    setSelectedProfileId(route.selectedProfileId);
    setIsIsolatedRoute(route.isolated);
    setActiveStepId(null);
  };

  useEffect(() => {
    const handlePopState = () => applyRoute(resolveRoute());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const pushRoute = (kind: ShareKind, id: string, isolated = isIsolatedRoute) => {
    if (typeof window === 'undefined') return;
    const url = buildUrl(kind, id, isolated);
    window.history.pushState(null, '', url);
  };

  const shareItem = async (kind: ShareKind, id: string) => {
    const url = buildUrl(kind, id, true);
    const copied = await copyText(url);
    setCopyNotice(copied ? 'URL de consulta copiada' : 'No se pudo copiar la URL');
  };

  const handleSelectProcedure = (procedureId: string) => {
    setSelectedProcedureId(procedureId);
    setActiveStepId(null);
    setActiveView('revision');
    pushRoute('proceso', procedureId);
  };

  const handleSelectProfile = (profileId: string) => {
    setSelectedProfileId(profileId);
    setActiveView('funciones');
    pushRoute('cargo', profileId);
  };

  const handleViewChange = (view: string) => {
    const typedView = view as View;
    setActiveView(typedView);
    setIsIsolatedRoute(false);

    if (typeof window !== 'undefined') {
      const url = buildViewUrl(typedView, selectedProcedureId, selectedProfileId);
      window.history.pushState(null, '', url);
    }
  };

  const handleFirstPending = () => {
    const firstPending = allProcedures.find(({ procedure }) => procedure.source.validationMode !== 'visual_validated') ?? allProcedures[0];
    if (firstPending) handleSelectProcedure(firstPending.procedure.id);
  };

  const exitIsolatedMode = () => {
    setIsIsolatedRoute(false);
    if (activeView === 'funciones') {
      pushRoute('cargo', selectedProfileId, false);
    } else {
      pushRoute('proceso', selectedProcedureId, false);
    }
  };

  const isolatedTitle = activeView === 'funciones'
    ? `${selectedProfile?.denomination ?? 'Cargo'} · ${selectedProfile?.code ?? ''}`
    : `${selected?.procedure.code ?? ''} · ${selected?.procedure.title ?? 'Procedimiento'}`;

  return (
    <div className={`${styles.appShell} ${isIsolatedRoute ? styles.isolatedShell : ''}`}>
      {!isIsolatedRoute && <Header query={query} onQueryChange={setQuery} activeView={activeView} onViewChange={handleViewChange} />}

      {isIsolatedRoute && (
        <header className={styles.publicHeader}>
          <div>
            <span><Link2 size={15} /> Consulta compartida</span>
            <h1>Procesux</h1>
            <p>{isolatedTitle}</p>
          </div>
          <div className={styles.publicHeaderActions}>
            <button type="button" onClick={() => shareItem(activeView === 'funciones' ? 'cargo' : 'proceso', activeView === 'funciones' ? selectedProfileId : selectedProcedureId)}>
              <ExternalLink size={16} /> Copiar URL
            </button>
            <button type="button" onClick={exitIsolatedMode}>
              <PanelLeftOpen size={16} /> Ver aplicación completa
            </button>
          </div>
        </header>
      )}

      {copyNotice && <div className={styles.copyToast} role="status">{copyNotice}</div>}

      <div className={styles.workspace}>
        {!isIsolatedRoute && (
          <Sidebar
            data={manualData}
            functionsData={functionsManualData}
            query={query}
            module={module}
            selectedProcedureId={selectedProcedureId}
            selectedProfileId={selectedProfileId}
            onSelectProcedure={handleSelectProcedure}
            onSelectProfile={handleSelectProfile}
            onShareProcedure={(procedureId) => shareItem('proceso', procedureId)}
            onShareProfile={(profileId) => shareItem('cargo', profileId)}
          />
        )}

        {activeView === 'inicio' && !isIsolatedRoute && <Dashboard data={manualData} functionsData={functionsManualData} onSelectFirstPending={handleFirstPending} />}
        {activeView === 'analisis' && !isIsolatedRoute && <InstitutionalIntelligence onSelectProcedure={handleSelectProcedure} onSelectProfile={handleSelectProfile} />}
        {activeView === 'gobernanza' && !isIsolatedRoute && <GovernanceCenter onSelectProcedure={handleSelectProcedure} onSelectProfile={handleSelectProfile} />}
        {activeView === 'funciones' && selectedProfile && (
          <FunctionDetail
            profile={selectedProfile}
            manualData={manualData}
            onSelectProfile={handleSelectProfile}
            onShareProfile={() => shareItem('cargo', selectedProfile.id)}
            isSharedView={isIsolatedRoute}
          />
        )}
        {activeView === 'revision' && selected && (
          <ProcedureDetail
            macro={selected.macro}
            process={selected.process}
            procedure={selected.procedure}
            activeStepId={activeStepId}
            onSelectStep={setActiveStepId}
            onShareProcedure={() => shareItem('proceso', selected.procedure.id)}
            isSharedView={isIsolatedRoute}
          />
        )}
      </div>
    </div>
  );
}

export default App;
