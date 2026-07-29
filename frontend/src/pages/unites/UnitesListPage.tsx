import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { unitesService } from '../../services/api';
import { UnitesFrigo } from '../../types';

export default function UnitesListPage() {
  const [unites, setUnites] = useState<UnitesFrigo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    unitesService.getAll().then(r => setUnites(r.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}><div className="spinner" /></div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Unités frigorifiques</h1>
          <p className="page-sub">{unites.length} unité(s) configurée(s)</p>
        </div>
        <Link to="/unites/new" className="btn btn-primary">+ Nouvelle unité</Link>
      </div>

      {unites.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏭</div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Aucune unité configurée.</p>
          <Link to="/unites/new" className="btn btn-primary">Créer la première unité</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {unites.map(u => (
            <div key={u.id} className="card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🏭</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{u.nom}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {u.adresse || 'Adresse non renseignée'} — {u.nombre_chambres} chambre(s)
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className={`badge ${u.source_donnees === 'automate' ? 'badge-info' : 'badge-neutral'}`}>
                    {u.source_donnees === 'automate' ? '🤖 Automate' : '✍️ Manuel'}
                  </span>
                  <Link to={`/unites/${u.id}`} className="btn btn-secondary btn-sm">Ouvrir →</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
