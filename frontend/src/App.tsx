import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Layout from './components/layout/Layout';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import UnitesListPage from './pages/unites/UnitesListPage';
import UniteDetailPage from './pages/unites/UniteDetailPage';
import UniteCreatePage from './pages/unites/UniteCreatePage';
import ChambrePage from './pages/chambres/ChambrePage';
import SaisieManuelle from './pages/chambres/SaisieManuelle';
import AlarmesPage from './pages/alarmes/AlarmesPage';
import StocksPage from './pages/stocks/StocksPage';
import ConfigPage from './pages/config/ConfigPage';
import ClientsPage from './pages/config/ClientsPage';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token, loading } = useAuth();
  if (loading) return <div style={{ display:'flex', justifyContent:'center', marginTop:'4rem' }}><div className="spinner" /></div>;
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const { token } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={token ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index element={<DashboardPage />} />
        <Route path="unites" element={<UnitesListPage />} />
        <Route path="unites/new" element={<UniteCreatePage />} />
        <Route path="unites/:id" element={<UniteDetailPage />} />
        <Route path="unites/:uniteId/chambres/:id" element={<ChambrePage />} />
        <Route path="unites/:uniteId/chambres/:id/saisie" element={<SaisieManuelle />} />
        <Route path="alarmes" element={<AlarmesPage />} />
        <Route path="stocks" element={<StocksPage />} />
        <Route path="config" element={<ConfigPage />} />
        <Route path="config/clients" element={<ClientsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
