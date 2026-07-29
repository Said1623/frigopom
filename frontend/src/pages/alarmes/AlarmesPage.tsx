import { useEffect, useState } from 'react';
import { alarmesService } from '../../services/api';
import { Alarme } from '../../types';

export default function AlarmesPage() {
  const [alarmes, setAlarmes] = useState<Alarme[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtre, setFiltre] = useState<'toutes' | 'actives' | 'acquittees'>('actives');

  const load = () => {
    alarmesService.getActives().then(r => {
      setAlarmes(r.data);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleAcquitter = async (id: number) => {
    await alarmesService.acquitter(id);
    load();
  };

  const filtrees = alarmes.filter(a => {
    if (filtre === 'actives') return !a.acquittee;
    if (filtre === 'acquittees') return a.acquittee;
    return true;
  });

  const critiques = alarmes.filter(a => !a.acquittee && a.niveau === 'critique').length;
  const avertissements = alarmes.filter(a => !a.acquittee && a.niveau === 'avertissement').length;

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}><div className="spinner" /></div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Gestion des alarmes</h1>
          <p className="page-sub">{alarmes.filter(a => !a.acquittee).length} alarme(s) active(s)</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid-3" style={{ marginBottom: '1.5rem' }}>
        <div className="kpi-card" style={{ borderLeft: `3px solid var(--danger)` }}>
          <div className="kpi-label">Critiques</div>
          <div className="kpi-value" style={{ color: 'var(--danger)' }}>{critiques}</div>
        </div>
        <div className="kpi-card" style={{ borderLeft: `3px solid var(--warning)` }}>
          <div className="kpi-label">Avertissements</div>
          <div className="kpi-value" style={{ color: 'var(--warning)' }}>{avertissements}</div>
        </div>
        <div className="kpi-card" style={{ borderLeft: `3px solid var(--primary)` }}>
          <div className="kpi-label">Acquittées (total)</div>
          <div className="kpi-value" style={{ color: 'var(--primary)' }}>{alarmes.filter(a => a.acquittee).length}</div>
        </div>
      </div>

      {/* Filtres */}
      <div style={{ display: 'flex', gap: 4, marginBottom: '1rem' }}>
        {(['actives', 'acquittees', 'toutes'] as const).map(f => (
          <button key={f} className={`btn btn-sm ${filtre === f ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFiltre(f)}>
            {f === 'actives' ? 'Actives' : f === 'acquittees' ? 'Acquittées' : 'Toutes'}
          </button>
        ))}
      </div>

      <div className="card">
        {filtrees.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
            {filtre === 'actives' ? '✅ Aucune alarme active' : 'Aucune alarme'}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filtrees.map(a => (
              <div key={a.id} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px',
                background: a.acquittee ? 'var(--bg)' : a.niveau === 'critique' ? '#fef2f2' : '#fffbeb',
                borderRadius: 8,
                border: `1px solid ${a.acquittee ? 'var(--border)' : a.niveau === 'critique' ? '#fecaca' : '#fde68a'}`,
              }}>
                <span style={{ fontSize: 20, marginTop: 2 }}>
                  {a.acquittee ? '✅' : a.niveau === 'critique' ? '🔴' : '🟡'}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: 14 }}>{a.message}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                    Chambre #{a.chambre_id}
                    {a.valeur_mesuree != null && ` — Valeur: ${a.valeur_mesuree.toFixed(1)}`}
                    {a.seuil != null && ` — Seuil: ${a.seuil}`}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 2 }}>
                    Déclenchée le {new Date(a.declenchee_at).toLocaleString('fr-FR')}
                    {a.acquittee && a.acquittee_par && ` — Acquittée par ${a.acquittee_par}`}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className={`badge ${a.niveau === 'critique' ? 'badge-danger' : a.niveau === 'avertissement' ? 'badge-warn' : 'badge-info'}`}>
                    {a.niveau}
                  </span>
                  {!a.acquittee && (
                    <button className="btn btn-secondary btn-sm" onClick={() => handleAcquitter(a.id)}>
                      Acquitter
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
