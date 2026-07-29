import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { chambresService, mesuresService, alarmesService } from '../../services/api';
import { Chambre } from '../../types';
import { useAuth } from '../../hooks/useAuth';

export default function SaisieManuelle() {
  const { id, uniteId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [chambre, setChambre] = useState<Chambre | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alertes, setAlertes] = useState<string[]>([]);

  const [form, setForm] = useState({
    temperature: '',
    humidite: '',
    co2: '',
    o2: '',
    ethylene: '',
    notes: '',
    operateur: '',
  });

  useEffect(() => {
    chambresService.getOne(+id!).then(r => {
      setChambre(r.data);
      setForm(p => ({ ...p, operateur: user?.email || '' }));
    }).finally(() => setLoading(false));
  }, [id]);

  const setField = (f: string, v: string) => {
    setForm(p => ({ ...p, [f]: v }));
    // Vérification seuils en temps réel
    if (chambre?.config) checkAlertes({ ...form, [f]: v });
  };

  const checkAlertes = (vals: any) => {
    const cfg = chambre!.config!;
    const warns: string[] = [];
    const t = parseFloat(vals.temperature);
    const h = parseFloat(vals.humidite);
    const c = parseFloat(vals.co2);
    const o = parseFloat(vals.o2);
    if (!isNaN(t)) {
      if (t > cfg.alarme_temp_haute) warns.push(`🔴 Température ${t}°C > seuil alarme ${cfg.alarme_temp_haute}°C`);
      else if (t < cfg.alarme_temp_basse) warns.push(`🔴 Température ${t}°C < seuil alarme ${cfg.alarme_temp_basse}°C`);
      else if (t > cfg.temp_max) warns.push(`🟡 Température ${t}°C dépasse consigne max ${cfg.temp_max}°C`);
    }
    if (!isNaN(h) && h < cfg.alarme_hum_basse) warns.push(`🔴 Humidité ${h}% < seuil alarme ${cfg.alarme_hum_basse}%`);
    if (!isNaN(c) && c > cfg.alarme_co2_haute) warns.push(`🔴 CO₂ ${c}% > seuil alarme ${cfg.alarme_co2_haute}%`);
    setAlertes(warns);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: any = {
        chambre_id: +id!,
        source: 'manuel',
        operateur: form.operateur,
        notes: form.notes,
      };
      if (form.temperature) payload.temperature = parseFloat(form.temperature);
      if (form.humidite) payload.humidite = parseFloat(form.humidite);
      if (form.co2) payload.co2 = parseFloat(form.co2);
      if (form.o2) payload.o2 = parseFloat(form.o2);
      if (form.ethylene) payload.ethylene = parseFloat(form.ethylene);

      await mesuresService.create(payload);

      // Créer alarmes si seuils dépassés
      const cfg = chambre?.config;
      if (cfg && payload.temperature != null) {
        if (payload.temperature > cfg.alarme_temp_haute) {
          await alarmesService.create({ chambre_id: +id!, type: 'temp_haute', niveau: 'critique', message: `Température haute: ${payload.temperature}°C`, valeur_mesuree: payload.temperature, seuil: cfg.alarme_temp_haute });
        } else if (payload.temperature < cfg.alarme_temp_basse) {
          await alarmesService.create({ chambre_id: +id!, type: 'temp_basse', niveau: 'critique', message: `Température basse: ${payload.temperature}°C`, valeur_mesuree: payload.temperature, seuil: cfg.alarme_temp_basse });
        }
      }
      if (cfg && payload.humidite != null && payload.humidite < cfg.alarme_hum_basse) {
        await alarmesService.create({ chambre_id: +id!, type: 'hum_basse', niveau: 'avertissement', message: `Humidité faible: ${payload.humidite}%`, valeur_mesuree: payload.humidite, seuil: cfg.alarme_hum_basse });
      }
      if (cfg && payload.co2 != null && payload.co2 > cfg.alarme_co2_haute) {
        await alarmesService.create({ chambre_id: +id!, type: 'co2_haut', niveau: 'critique', message: `CO₂ élevé: ${payload.co2}%`, valeur_mesuree: payload.co2, seuil: cfg.alarme_co2_haute });
      }

      setSuccess(true);
      setTimeout(() => navigate(`/unites/${uniteId}/chambres/${id}`), 1500);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erreur lors de la saisie');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}><div className="spinner" /></div>;
  if (!chambre) return <div>Chambre introuvable</div>;
  const cfg = chambre.config;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>
        <Link to={`/unites/${uniteId}`} style={{ color: 'var(--text-muted)' }}>Unité</Link>
        {' / '}
        <Link to={`/unites/${uniteId}/chambres/${id}`} style={{ color: 'var(--text-muted)' }}>{chambre.nom}</Link>
        {' / Saisie manuelle'}
      </div>

      <div className="page-header">
        <div>
          <h1 className="page-title">Saisie manuelle</h1>
          <p className="page-sub">{chambre.nom} — {new Date().toLocaleString('fr-FR')}</p>
        </div>
      </div>

      {success && (
        <div style={{ padding: '14px', background: '#dcfce7', border: '1px solid #86efac', borderRadius: 8, color: '#166534', fontWeight: 500, marginBottom: '1rem', textAlign: 'center' }}>
          ✅ Mesure enregistrée avec succès !
        </div>
      )}

      {alertes.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          {alertes.map((a, i) => (
            <div key={i} style={{
              padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 6,
              background: a.startsWith('🔴') ? '#fef2f2' : '#fffbeb',
              border: `1px solid ${a.startsWith('🔴') ? '#fecaca' : '#fde68a'}`,
              color: a.startsWith('🔴') ? '#991b1b' : '#92400e',
            }}>{a}</div>
          ))}
        </div>
      )}

      <div className="card">
        <form onSubmit={handleSubmit}>
          {/* Consignes de référence */}
          {cfg && (
            <div style={{ padding: '12px', background: 'var(--primary-light)', borderRadius: 8, marginBottom: '1.5rem', fontSize: 12 }}>
              <div style={{ fontWeight: 500, marginBottom: 6, color: 'var(--primary-text)' }}>Consignes de la chambre</div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', color: 'var(--primary-text)' }}>
                <span>🌡️ Temp: {cfg.temp_consigne}°C ({cfg.temp_min}…{cfg.temp_max})</span>
                <span>💧 Hum: {cfg.hum_consigne}% ({cfg.hum_min}…{cfg.hum_max})</span>
                <span>CO₂: {cfg.co2_consigne}% ({cfg.co2_min}…{cfg.co2_max})</span>
                {cfg.o2_consigne && <span>O₂: {cfg.o2_consigne}%</span>}
              </div>
            </div>
          )}

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Température (°C)</label>
              <input className="form-input" type="number" step="0.1"
                value={form.temperature} onChange={e => setField('temperature', e.target.value)}
                placeholder="Ex: 1.2" />
            </div>
            <div className="form-group">
              <label className="form-label">Humidité (%)</label>
              <input className="form-input" type="number" step="0.1" min="0" max="100"
                value={form.humidite} onChange={e => setField('humidite', e.target.value)}
                placeholder="Ex: 92" />
            </div>
            <div className="form-group">
              <label className="form-label">CO₂ (%)</label>
              <input className="form-input" type="number" step="0.01" min="0"
                value={form.co2} onChange={e => setField('co2', e.target.value)}
                placeholder="Ex: 2.5" />
            </div>
            <div className="form-group">
              <label className="form-label">O₂ (%)</label>
              <input className="form-input" type="number" step="0.01" min="0"
                value={form.o2} onChange={e => setField('o2', e.target.value)}
                placeholder="Ex: 1.5" />
            </div>
            <div className="form-group">
              <label className="form-label">Éthylène (ppm) <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>optionnel</span></label>
              <input className="form-input" type="number" step="0.01"
                value={form.ethylene} onChange={e => setField('ethylene', e.target.value)}
                placeholder="Ex: 0.05" />
            </div>
            <div className="form-group">
              <label className="form-label">Opérateur</label>
              <input className="form-input" value={form.operateur}
                onChange={e => setField('operateur', e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Notes / Observations</label>
            <textarea className="form-input" rows={2} value={form.notes}
              onChange={e => setField('notes', e.target.value)}
              placeholder="Observations particulières, état du matériel, anomalies visuelles..."
              style={{ resize: 'vertical' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
            <Link to={`/unites/${uniteId}/chambres/${id}`} className="btn btn-secondary">← Annuler</Link>
            <button type="submit" className="btn btn-primary" disabled={saving || success}>
              {saving ? 'Enregistrement...' : '✅ Enregistrer la mesure'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
