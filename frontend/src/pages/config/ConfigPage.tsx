import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { unitesService, chambresService } from '../../services/api';
import { UnitesFrigo, Chambre } from '../../types';
import { useAuth } from '../../hooks/useAuth';

export default function ConfigPage() {
  const { user } = useAuth();
  const [unites, setUnites] = useState<UnitesFrigo[]>([]);
  const [selectedUnite, setSelectedUnite] = useState<number | null>(null);
  const [chambres, setChambres] = useState<Chambre[]>([]);
  const [editingChambre, setEditingChambre] = useState<Chambre | null>(null);
  const [configForm, setConfigForm] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    unitesService.getAll().then(r => {
      setUnites(r.data);
      if (r.data.length > 0) loadChambres(r.data[0].id);
    }).finally(() => setLoading(false));
  }, []);

  const loadChambres = (uniteId: number) => {
    setSelectedUnite(uniteId);
    chambresService.getByUnite(uniteId).then(r => setChambres(r.data));
  };

  const openConfig = (ch: Chambre) => {
    setEditingChambre(ch);
    setConfigForm({ ...ch.config });
    setSaved(false);
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingChambre) return;
    setSaving(true);
    try {
      await chambresService.updateConfig(editingChambre.id, configForm);
      setSaved(true);
      if (selectedUnite) chambresService.getByUnite(selectedUnite).then(r => setChambres(r.data));
      setTimeout(() => setEditingChambre(null), 1200);
    } finally {
      setSaving(false);
    }
  };

  const setF = (k: string, v: string) => setConfigForm((p: any) => ({ ...p, [k]: parseFloat(v) || v }));

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}><div className="spinner" /></div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Configuration</h1>
          <p className="page-sub">Consignes et seuils d'alarme par chambre</p>
        </div>
        {user?.role === 'super_admin' && (
          <Link to="/config/clients" className="btn btn-secondary">👥 Gestion clients</Link>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem' }}>
        {unites.map(u => (
          <button key={u.id}
            className={`btn btn-sm ${selectedUnite === u.id ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => loadChambres(u.id)}>
            {u.nom}
          </button>
        ))}
      </div>

      {chambres.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
          Aucune chambre configurée pour cette unité.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {chambres.map(ch => (
            <div key={ch.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{ch.nom}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{ch.type_atmosphere} — {ch.volume_m3 ? `${ch.volume_m3} m³` : 'Volume n/r'}</div>
                </div>
                <button className="btn btn-secondary btn-sm" onClick={() => openConfig(ch)}>
                  ⚙️ Modifier consignes
                </button>
              </div>

              {ch.config && (
                <div style={{ display: 'flex', gap: 24, marginTop: 12, flexWrap: 'wrap' }}>
                  {[
                    { label: '🌡️ Température', v: ch.config.temp_consigne, min: ch.config.temp_min, max: ch.config.temp_max, unit: '°C' },
                    { label: '💧 Humidité', v: ch.config.hum_consigne, min: ch.config.hum_min, max: ch.config.hum_max, unit: '%' },
                    { label: 'CO₂', v: ch.config.co2_consigne, min: ch.config.co2_min, max: ch.config.co2_max, unit: '%' },
                    ...(ch.config.o2_consigne ? [{ label: 'O₂', v: ch.config.o2_consigne, min: ch.config.o2_min, max: ch.config.o2_max, unit: '%' }] : []),
                  ].map(r => (
                    <div key={r.label} style={{ fontSize: 13 }}>
                      <div style={{ color: 'var(--text-muted)', fontSize: 11, marginBottom: 2 }}>{r.label}</div>
                      <div style={{ fontWeight: 500 }}>{r.v}{r.unit}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-light)' }}>{r.min}…{r.max}{r.unit}</div>
                    </div>
                  ))}
                  <div style={{ fontSize: 13 }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: 11, marginBottom: 2 }}>🚨 Alarmes</div>
                    <div style={{ fontSize: 11, color: 'var(--danger)' }}>T &gt; {ch.config.alarme_temp_haute}°C ou &lt; {ch.config.alarme_temp_basse}°C</div>
                    <div style={{ fontSize: 11, color: 'var(--danger)' }}>Hum &lt; {ch.config.alarme_hum_basse}% — CO₂ &gt; {ch.config.alarme_co2_haute}%</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal config */}
      {editingChambre && (
        <div className="modal-overlay" onClick={() => setEditingChambre(null)}>
          <div className="modal" style={{ maxWidth: 600 }} onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">⚙️ Consignes — {editingChambre.nom}</h3>
            {saved && <div style={{ padding: '8px 12px', background: '#dcfce7', borderRadius: 6, color: '#166534', fontSize: 13, marginBottom: '1rem' }}>✅ Enregistré !</div>}
            <form onSubmit={handleSaveConfig}>
              {[
                { title: 'Température (°C)', keys: ['temp_consigne', 'temp_min', 'temp_max', 'alarme_temp_basse', 'alarme_temp_haute'] },
                { title: 'Humidité (%)', keys: ['hum_consigne', 'hum_min', 'hum_max', 'alarme_hum_basse'] },
                { title: 'CO₂ (%)', keys: ['co2_consigne', 'co2_min', 'co2_max', 'alarme_co2_haute'] },
                { title: 'O₂ (%) — optionnel', keys: ['o2_consigne', 'o2_min', 'o2_max'] },
              ].map(group => (
                <div key={group.title} style={{ marginBottom: '1.25rem' }}>
                  <div className="section-title">{group.title}</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {group.keys.map(k => (
                      <div key={k} style={{ flex: '1 1 120px' }}>
                        <label className="form-label" style={{ fontSize: 11 }}>
                          {k.replace(/_/g, ' ')}
                        </label>
                        <input className="form-input" type="number" step="0.1"
                          value={configForm[k] ?? ''} onChange={e => setF(k, e.target.value)} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setEditingChambre(null)}>Annuler</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
