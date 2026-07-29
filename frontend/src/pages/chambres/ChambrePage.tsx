import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { chambresService, mesuresService } from '../../services/api';
import { Chambre, Mesure } from '../../types';

export default function ChambrePage() {
  const { id, uniteId } = useParams();
  const [chambre, setChambre] = useState<Chambre | null>(null);
  const [mesures, setMesures] = useState<Mesure[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [periode, setPeriode] = useState<'24h' | '7j' | '30j'>('24h');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'temp' | 'hum' | 'co2'>('temp');

  useEffect(() => {
    Promise.all([
      chambresService.getOne(+id!),
      mesuresService.getByChambre(+id!, 200),
      mesuresService.getStats(+id!, 24),
    ]).then(([c, m, s]) => {
      setChambre(c.data);
      setMesures(m.data.reverse());
      setStats(s.data);
    }).finally(() => setLoading(false));
  }, [id]);

  const chartData = mesures.map(m => ({
    time: new Date(m.horodatage).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }),
    temp: m.temperature,
    hum: m.humidite,
    co2: m.co2,
    o2: m.o2,
  }));

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}><div className="spinner" /></div>;
  if (!chambre) return <div>Chambre introuvable</div>;

  const last = mesures[mesures.length - 1];
  const cfg = chambre.config;

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>
        <Link to="/unites" style={{ color: 'var(--text-muted)' }}>Unités</Link>
        {' / '}
        <Link to={`/unites/${uniteId}`} style={{ color: 'var(--text-muted)' }}>Unité</Link>
        {' / '}
        {chambre.nom}
      </div>

      <div className="page-header">
        <div>
          <h1 className="page-title">{chambre.nom}</h1>
          <p className="page-sub">
            {chambre.type_atmosphere} — {chambre.volume_m3 ? `${chambre.volume_m3} m³` : ''} {chambre.capacite_palettes ? `· ${chambre.capacite_palettes} palettes` : ''}
          </p>
        </div>
        <Link to={`/unites/${uniteId}/chambres/${id}/saisie`} className="btn btn-primary">
          + Nouvelle mesure
        </Link>
      </div>

      {/* KPIs dernière mesure */}
      <div className="grid-4" style={{ marginBottom: '1.5rem' }}>
        {[
          { label: 'Température', val: last?.temperature, consigne: cfg?.temp_consigne, unit: '°C', min: cfg?.temp_min, max: cfg?.temp_max },
          { label: 'Humidité', val: last?.humidite, consigne: cfg?.hum_consigne, unit: '%', min: cfg?.hum_min, max: cfg?.hum_max },
          { label: 'CO₂', val: last?.co2, consigne: cfg?.co2_consigne, unit: '%', min: cfg?.co2_min, max: cfg?.co2_max },
          { label: 'O₂', val: last?.o2, consigne: cfg?.o2_consigne, unit: '%', min: cfg?.o2_min, max: cfg?.o2_max },
        ].map(kpi => {
          const diff = kpi.val != null && kpi.consigne != null ? Math.abs(kpi.val - kpi.consigne) : 0;
          const color = kpi.val == null ? 'var(--text-muted)' : diff > 1 ? 'var(--danger)' : diff > 0.3 ? 'var(--warning)' : 'var(--primary)';
          return (
            <div key={kpi.label} className="kpi-card">
              <div className="kpi-label">{kpi.label}</div>
              <div className="kpi-value" style={{ color }}>
                {kpi.val != null ? kpi.val.toFixed(1) : '—'}
                <span className="kpi-unit">{kpi.unit}</span>
              </div>
              {kpi.consigne != null && (
                <div className="kpi-sub">Consigne: {kpi.consigne}{kpi.unit} ({kpi.min}…{kpi.max})</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Stats 24h */}
      {stats && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: 'var(--text-muted)' }}>STATISTIQUES 24H ({stats.nb_mesures} mesures)</h3>
          <div className="grid-3">
            {[
              { label: 'Température', s: stats.temperature, unit: '°C' },
              { label: 'Humidité', s: stats.humidite, unit: '%' },
              { label: 'CO₂', s: stats.co2, unit: '%' },
            ].map(row => row.s && (
              <div key={row.label} style={{ fontSize: 13 }}>
                <div style={{ fontWeight: 500, marginBottom: 4 }}>{row.label}</div>
                <div style={{ display: 'flex', gap: 12, color: 'var(--text-muted)' }}>
                  <span>Min <strong style={{ color: 'var(--text)' }}>{row.s.min.toFixed(1)}{row.unit}</strong></span>
                  <span>Moy <strong style={{ color: 'var(--text)' }}>{row.s.moy.toFixed(1)}{row.unit}</strong></span>
                  <span>Max <strong style={{ color: 'var(--text)' }}>{row.s.max.toFixed(1)}{row.unit}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Graphique */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {(['temp', 'hum', 'co2'] as const).map(t => (
              <button key={t} className={`btn btn-sm ${activeTab === t ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setActiveTab(t)}>
                {t === 'temp' ? 'Température' : t === 'hum' ? 'Humidité' : 'CO₂'}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {(['24h', '7j', '30j'] as const).map(p => (
              <button key={p} className={`btn btn-sm ${periode === p ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setPeriode(p)}>{p}</button>
            ))}
          </div>
        </div>

        {mesures.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            Aucune mesure enregistrée. Ajoutez la première mesure.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0ef" />
              <XAxis dataKey="time" tick={{ fontSize: 11 }} interval="preserveStartEnd" />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              {activeTab === 'temp' && (
                <>
                  <Line type="monotone" dataKey="temp" stroke="#0F6E56" strokeWidth={2} dot={false} name="Température (°C)" />
                  {cfg && <Line type="monotone" dataKey={() => cfg.temp_consigne} stroke="#0F6E5640" strokeWidth={1} strokeDasharray="4 4" dot={false} name="Consigne" />}
                </>
              )}
              {activeTab === 'hum' && (
                <Line type="monotone" dataKey="hum" stroke="#2563eb" strokeWidth={2} dot={false} name="Humidité (%)" />
              )}
              {activeTab === 'co2' && (
                <Line type="monotone" dataKey="co2" stroke="#d97706" strokeWidth={2} dot={false} name="CO₂ (%)" />
              )}
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Historique des mesures */}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: '1rem' }}>Historique des mesures</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date / Heure</th>
                <th>Température</th>
                <th>Humidité</th>
                <th>CO₂</th>
                <th>O₂</th>
                <th>Source</th>
                <th>Opérateur</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {mesures.slice().reverse().slice(0, 50).map(m => (
                <tr key={m.id}>
                  <td style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{new Date(m.horodatage).toLocaleString('fr-FR')}</td>
                  <td>{m.temperature != null ? `${m.temperature.toFixed(1)}°C` : '—'}</td>
                  <td>{m.humidite != null ? `${m.humidite.toFixed(1)}%` : '—'}</td>
                  <td>{m.co2 != null ? `${m.co2.toFixed(2)}%` : '—'}</td>
                  <td>{m.o2 != null ? `${m.o2.toFixed(2)}%` : '—'}</td>
                  <td>
                    <span className={`badge ${m.source === 'automate' ? 'badge-info' : 'badge-neutral'}`}>
                      {m.source}
                    </span>
                  </td>
                  <td style={{ fontSize: 12 }}>{m.operateur || '—'}</td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{m.notes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
