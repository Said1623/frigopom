import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { chambresService, alarmesService, unitesService } from '../../services/api';
import { Chambre, Alarme, UnitesFrigo } from '../../types';

function StatBar({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <div className="stat-bar">
      <div className="stat-bar-fill" style={{ width: `${Math.min(100, (value / max) * 100)}%`, background: color }} />
    </div>
  );
}

function ValeurCell({ val, consigne, unit }: { val?: number; consigne?: number; unit: string }) {
  if (val == null) return <span style={{ color: 'var(--text-muted)' }}>—</span>;
  const diff = consigne != null ? Math.abs(val - consigne) : 0;
  const color = diff > 1 ? 'var(--danger)' : diff > 0.3 ? 'var(--warning)' : 'var(--primary)';
  return <span style={{ fontWeight: 500, color }}>{val.toFixed(1)}{unit}</span>;
}

export default function UniteDetailPage() {
  const { id } = useParams();
  const [unite, setUnite] = useState<UnitesFrigo | null>(null);
  const [chambres, setChambres] = useState<Chambre[]>([]);
  const [alarmes, setAlarmes] = useState<Alarme[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingChambre, setAddingChambre] = useState(false);
  const [newChambre, setNewChambre] = useState({ nom: '', type_atmosphere: 'AC', volume_m3: '', capacite_palettes: '' });

  const load = async () => {
    const [u, ch, al] = await Promise.all([
      unitesService.getOne(+id!),
      chambresService.getDashboard(+id!),
      alarmesService.getByUnite(+id!),
    ]);
    setUnite(u.data);
    setChambres(ch.data);
    setAlarmes(al.data.filter((a: Alarme) => !a.acquittee));
  };

  useEffect(() => { load().finally(() => setLoading(false)); }, [id]);

  const handleAddChambre = async (e: React.FormEvent) => {
    e.preventDefault();
    const maxNum = chambres.reduce((m, c) => Math.max(m, c.numero), 0);
    await chambresService.create({
      ...newChambre,
      unite_id: +id!,
      numero: maxNum + 1,
      volume_m3: newChambre.volume_m3 ? +newChambre.volume_m3 : null,
      capacite_palettes: newChambre.capacite_palettes ? +newChambre.capacite_palettes : null,
    });
    setAddingChambre(false);
    setNewChambre({ nom: '', type_atmosphere: 'AC', volume_m3: '', capacite_palettes: '' });
    await load();
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}><div className="spinner" /></div>;
  if (!unite) return <div>Unité introuvable</div>;

  const alarmesActives = alarmes.filter(a => !a.acquittee);

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>
            <Link to="/unites" style={{ color: 'var(--text-muted)' }}>Unités</Link> / {unite.nom}
          </div>
          <h1 className="page-title">{unite.nom}</h1>
          <p className="page-sub">
            {unite.adresse} — {chambres.length} chambre(s) —
            <span style={{ color: unite.source_donnees === 'automate' ? 'var(--info)' : 'var(--text-muted)', marginLeft: 4 }}>
              {unite.source_donnees === 'automate' ? '🤖 Automate actif' : '✍️ Saisie manuelle'}
            </span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {alarmesActives.length > 0 && (
            <Link to="/alarmes" className="btn btn-danger btn-sm">
              🔔 {alarmesActives.length} alarme(s)
            </Link>
          )}
          <button className="btn btn-secondary btn-sm" onClick={() => setAddingChambre(true)}>+ Chambre</button>
          <Link to={`/config`} className="btn btn-secondary btn-sm">⚙️ Config</Link>
        </div>
      </div>

      {/* Alarmes actives */}
      {alarmesActives.length > 0 && (
        <div className="card" style={{ marginBottom: '1.5rem', borderLeft: '3px solid var(--danger)', background: '#fef2f2' }}>
          <p style={{ fontSize: 13, color: 'var(--danger)', fontWeight: 500 }}>
            🔔 {alarmesActives.length} alarme(s) non acquittée(s) sur cette unité
          </p>
        </div>
      )}

      {/* Tableau des chambres */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: 15, fontWeight: 600 }}>Chambres — Vue d'ensemble</h2>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Dernière actualisation : {new Date().toLocaleTimeString('fr-FR')}
          </span>
        </div>

        {chambres.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
            Aucune chambre. Cliquez sur "+ Chambre" pour en ajouter.
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Nom</th>
                  <th>Type</th>
                  <th>Température</th>
                  <th>Humidité</th>
                  <th>CO₂</th>
                  <th>O₂</th>
                  <th>État</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {chambres.map(ch => {
                  const m = ch.derniere_mesure;
                  const alarmesCh = alarmes.filter(a => a.chambre_id === ch.id && !a.acquittee);
                  const etat = alarmesCh.length > 0
                    ? (alarmesCh.some(a => a.niveau === 'critique') ? 'critique' : 'alerte')
                    : (m ? 'ok' : 'vide');
                  return (
                    <tr key={ch.id}>
                      <td style={{ fontWeight: 600, color: 'var(--text-muted)' }}>#{ch.numero}</td>
                      <td style={{ fontWeight: 500 }}>{ch.nom}</td>
                      <td>
                        <span className={`badge ${ch.type_atmosphere === 'ULO' ? 'badge-info' : 'badge-neutral'}`}>
                          {ch.type_atmosphere}
                        </span>
                      </td>
                      <td>
                        <ValeurCell val={m?.temperature} consigne={ch.config?.temp_consigne} unit="°C" />
                        <StatBar value={(m?.temperature ?? 0) + 2} max={6} color={etat === 'critique' ? 'var(--danger)' : 'var(--primary)'} />
                      </td>
                      <td><ValeurCell val={m?.humidite} consigne={ch.config?.hum_consigne} unit="%" /></td>
                      <td><ValeurCell val={m?.co2} consigne={ch.config?.co2_consigne} unit="%" /></td>
                      <td><ValeurCell val={m?.o2} consigne={ch.config?.o2_consigne} unit="%" /></td>
                      <td>
                        <span className={`badge ${
                          etat === 'critique' ? 'badge-danger' :
                          etat === 'alerte' ? 'badge-warn' :
                          etat === 'ok' ? 'badge-ok' : 'badge-neutral'
                        }`}>
                          {etat === 'critique' ? '🔴 Critique' :
                           etat === 'alerte' ? '🟡 Alerte' :
                           etat === 'ok' ? '🟢 Normal' : '⚪ Sans mesure'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <Link to={`/unites/${id}/chambres/${ch.id}`} className="btn btn-secondary btn-sm">Voir</Link>
                          <Link to={`/unites/${id}/chambres/${ch.id}/saisie`} className="btn btn-primary btn-sm">+ Saisie</Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal ajout chambre */}
      {addingChambre && (
        <div className="modal-overlay" onClick={() => setAddingChambre(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">Ajouter une chambre</h3>
            <form onSubmit={handleAddChambre}>
              <div className="form-group">
                <label className="form-label">Nom de la chambre *</label>
                <input className="form-input" value={newChambre.nom}
                  onChange={e => setNewChambre(p => ({ ...p, nom: e.target.value }))} required />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select className="form-select" value={newChambre.type_atmosphere}
                    onChange={e => setNewChambre(p => ({ ...p, type_atmosphere: e.target.value }))}>
                    <option value="AC">AC</option>
                    <option value="ULO">ULO</option>
                    <option value="Standard">Standard</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Volume (m³)</label>
                  <input className="form-input" type="number" value={newChambre.volume_m3}
                    onChange={e => setNewChambre(p => ({ ...p, volume_m3: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Capacité (palettes)</label>
                  <input className="form-input" type="number" value={newChambre.capacite_palettes}
                    onChange={e => setNewChambre(p => ({ ...p, capacite_palettes: e.target.value }))} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setAddingChambre(false)}>Annuler</button>
                <button type="submit" className="btn btn-primary">Ajouter</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
