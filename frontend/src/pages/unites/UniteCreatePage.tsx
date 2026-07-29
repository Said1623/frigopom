import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { unitesService, chambresService } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

export default function UniteCreatePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [uniteForm, setUniteForm] = useState({
    nom: '',
    adresse: '',
    description: '',
    nombre_chambres: 1,
    source_donnees: 'manuel',
    automate_url: '',
  });

  const [uniteCreee, setUniteCreee] = useState<any>(null);
  const [chambresConfig, setChambresConfig] = useState<any[]>([]);

  const setField = (f: string, v: any) => setUniteForm(p => ({ ...p, [f]: v }));

  const handleCreateUnite = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await unitesService.create({
        ...uniteForm,
        client_id: user?.client_id,
      });
      const unite = res.data;
      setUniteCreee(unite);
      const configs = Array.from({ length: +uniteForm.nombre_chambres }, (_, i) => ({
        numero: i + 1,
        nom: `Chambre ${i + 1}`,
        volume_m3: '',
        capacite_palettes: '',
        type_atmosphere: 'AC',
      }));
      setChambresConfig(configs);
      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la création');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateChambres = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      for (const ch of chambresConfig) {
        await chambresService.create({
          ...ch,
          unite_id: uniteCreee.id,
          volume_m3: ch.volume_m3 ? +ch.volume_m3 : null,
          capacite_palettes: ch.capacite_palettes ? +ch.capacite_palettes : null,
        });
      }
      navigate(`/unites/${uniteCreee.id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur création chambres');
    } finally {
      setLoading(false);
    }
  };

  const updateChambre = (i: number, field: string, value: any) => {
    setChambresConfig(prev => prev.map((c, idx) => idx === i ? { ...c, [field]: value } : c));
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      {/* Steps */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '2rem' }}>
        {[
          { n: 1, label: "Informations de l'unité" },
          { n: 2, label: 'Configuration des chambres' },
        ].map((s, idx) => (
          <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%', display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600,
              background: step >= s.n ? 'var(--primary)' : 'var(--border)',
              color: step >= s.n ? 'white' : 'var(--text-muted)',
            }}>{s.n}</div>
            <span style={{ fontSize: 13, fontWeight: step === s.n ? 500 : 400, color: step >= s.n ? 'var(--text)' : 'var(--text-muted)' }}>{s.label}</span>
            {idx === 0 && <div style={{ width: 40, height: 1, background: 'var(--border)', margin: '0 4px' }} />}
          </div>
        ))}
      </div>

      {error && (
        <div style={{ padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, color: '#991b1b', fontSize: 13, marginBottom: '1rem' }}>{error}</div>
      )}

      {step === 1 && (
        <div className="card">
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: '1.5rem' }}>🏭 Informations de l'unité</h2>
          <form onSubmit={handleCreateUnite}>
            <div className="form-group">
              <label className="form-label">Nom de l'unité *</label>
              <input className="form-input" value={uniteForm.nom} onChange={e => setField('nom', e.target.value)}
                placeholder="Ex: Coopérative Agricole du Rif" required />
            </div>
            <div className="form-group">
              <label className="form-label">Adresse</label>
              <input className="form-input" value={uniteForm.adresse} onChange={e => setField('adresse', e.target.value)}
                placeholder="Adresse de l'unité" />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-input" value={uniteForm.description} onChange={e => setField('description', e.target.value)}
                placeholder="Description optionnelle" rows={2} style={{ resize: 'vertical' }} />
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Nombre de chambres *</label>
                <input className="form-input" type="number" min={1} max={50}
                  value={uniteForm.nombre_chambres} onChange={e => setField('nombre_chambres', +e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Source des données</label>
                <select className="form-select" value={uniteForm.source_donnees} onChange={e => setField('source_donnees', e.target.value)}>
                  <option value="manuel">✍️ Saisie manuelle</option>
                  <option value="automate">🤖 Automate (OPC-UA / Modbus)</option>
                </select>
              </div>
            </div>

            {uniteForm.source_donnees === 'automate' && (
              <div className="form-group">
                <label className="form-label">URL de l'automate</label>
                <input className="form-input" value={uniteForm.automate_url} onChange={e => setField('automate_url', e.target.value)}
                  placeholder="opc.tcp://192.168.1.100:4840 ou modbus://192.168.1.50" />
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Configurable après installation des équipements</span>
              </div>
            )}

            <div className="modal-footer" style={{ marginTop: '1.5rem', padding: 0 }}>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/unites')}>Annuler</button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Création...' : 'Suivant →'}
              </button>
            </div>
          </form>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="card" style={{ marginBottom: '1rem', background: 'var(--primary-light)', border: '1px solid #a7f3d0' }}>
            <p style={{ fontSize: 13, color: 'var(--primary-text)' }}>
              ✅ Unité <strong>{uniteCreee?.nom}</strong> créée. Configurez maintenant les {chambresConfig.length} chambre(s).
            </p>
          </div>

          <form onSubmit={handleCreateChambres}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {chambresConfig.map((ch, i) => (
                <div key={i} className="card">
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12, color: 'var(--primary)' }}>
                    Chambre {ch.numero}
                  </div>
                  <div className="grid-2">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Nom *</label>
                      <input className="form-input" value={ch.nom}
                        onChange={e => updateChambre(i, 'nom', e.target.value)} required />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Type atmosphère</label>
                      <select className="form-select" value={ch.type_atmosphere}
                        onChange={e => updateChambre(i, 'type_atmosphere', e.target.value)}>
                        <option value="AC">AC — Atmosphère contrôlée</option>
                        <option value="ULO">ULO — Ultra Low Oxygen</option>
                        <option value="Standard">Standard (froid simple)</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Volume (m³)</label>
                      <input className="form-input" type="number" min={0} value={ch.volume_m3}
                        onChange={e => updateChambre(i, 'volume_m3', e.target.value)}
                        placeholder="Ex: 500" />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Capacité (palettes)</label>
                      <input className="form-input" type="number" min={0} value={ch.capacite_palettes}
                        onChange={e => updateChambre(i, 'capacite_palettes', e.target.value)}
                        placeholder="Ex: 800" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-footer" style={{ padding: 0, marginTop: '1.5rem' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>← Retour</button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Création...' : '✅ Terminer la configuration'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
