import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { unitesService, alarmesService } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { UnitesFrigo, Alarme } from '../../types';

export default function DashboardPage() {
  const { user } = useAuth();
  const [unites, setUnites] = useState<UnitesFrigo[]>([]);
  const [alarmes, setAlarmes] = useState<Alarme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      unitesService.getAll(),
      alarmesService.getActives(),
    ]).then(([u, a]) => {
      setUnites(u.data);
      setAlarmes(a.data);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}><div className="spinner" /></div>;

  const totalChambres = unites.reduce((s, u) => s + (u.chambres?.length || u.nombre_chambres), 0);
  const alarmesCritiques = alarmes.filter(a => a.niveau === 'critique').length;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Tableau de bord</h1>
          <p className="page-sub">Bonjour {user?.prenom} — {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        </div>
        <Link to="/unites/new" className="btn btn-primary">+ Nouvelle unité</Link>
      </div>

      {/* KPIs */}
      <div className="grid-4" style={{ marginBottom: '1.5rem' }}>
        <div className="kpi-card">
          <div className="kpi-label">Unités actives</div>
          <div className="kpi-value">{unites.length}</div>
          <div className="kpi-sub">Unités frigorifiques</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total chambres</div>
          <div className="kpi-value">{totalChambres}</div>
          <div className="kpi-sub">Chambres configurées</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Alarmes actives</div>
          <div className="kpi-value" style={{ color: alarmes.length > 0 ? 'var(--danger)' : 'var(--primary)' }}>
            {alarmes.length}
          </div>
          <div className="kpi-sub" style={{ color: alarmesCritiques > 0 ? 'var(--danger)' : 'var(--text-muted)' }}>
            {alarmesCritiques > 0 ? `${alarmesCritiques} critique(s)` : 'Aucune critique'}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Source données</div>
          <div className="kpi-value" style={{ fontSize: 16, marginTop: 4 }}>
            {unites.filter(u => u.source_donnees === 'automate').length > 0
              ? `${unites.filter(u => u.source_donnees === 'automate').length} automate(s)`
              : 'Saisie manuelle'}
          </div>
          <div className="kpi-sub">Mode acquisition</div>
        </div>
      </div>

      {/* Alarmes actives */}
      {alarmes.length > 0 && (
        <div className="card" style={{ marginBottom: '1.5rem', borderLeft: '3px solid var(--danger)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ fontSize: 15, fontWeight: 600 }}>🔔 Alarmes non acquittées ({alarmes.length})</h2>
            <Link to="/alarmes" className="btn btn-secondary btn-sm">Voir tout</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {alarmes.slice(0, 5).map(a => (
              <div key={a.id} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
                background: a.niveau === 'critique' ? '#fef2f2' : '#fffbeb',
                borderRadius: 8, border: `1px solid ${a.niveau === 'critique' ? '#fecaca' : '#fde68a'}`,
              }}>
                <span style={{ fontSize: 18 }}>{a.niveau === 'critique' ? '🔴' : '🟡'}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: 13 }}>{a.message}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    {a.chambre?.nom} — {new Date(a.declenchee_at).toLocaleString('fr-FR')}
                  </div>
                </div>
                {a.valeur_mesuree != null && (
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--danger)' }}>
                    {a.valeur_mesuree.toFixed(1)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Liste unités */}
      <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: '1rem' }}>Mes unités frigorifiques</h2>
      {unites.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏭</div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Aucune unité configurée. Commencez par créer votre première unité.
          </p>
          <Link to="/unites/new" className="btn btn-primary">Créer une unité</Link>
        </div>
      ) : (
        <div className="grid-2">
          {unites.map(u => (
            <Link key={u.id} to={`/unites/${u.id}`} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ cursor: 'pointer', transition: 'box-shadow .15s' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = 'var(--shadow-md)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = 'var(--shadow)')}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{u.nom}</div>
                    {u.adresse && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{u.adresse}</div>}
                  </div>
                  <span className={`badge ${u.source_donnees === 'automate' ? 'badge-info' : 'badge-neutral'}`}>
                    {u.source_donnees === 'automate' ? '🤖 Automate' : '✍️ Manuel'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 16 }}>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.04em' }}>Chambres</div>
                    <div style={{ fontSize: 22, fontWeight: 600 }}>{u.chambres?.length || u.nombre_chambres}</div>
                  </div>
                  {u.client && (
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.04em' }}>Client</div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{u.client.nom}</div>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
