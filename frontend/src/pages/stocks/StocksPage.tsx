import { useEffect, useState } from 'react';
import { stocksService, unitesService } from '../../services/api';
import { Stock, UnitesFrigo } from '../../types';

export default function StocksPage() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [unites, setUnites] = useState<UnitesFrigo[]>([]);
  const [selectedUnite, setSelectedUnite] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ chambre_id: '', client_nom: '', variete: '', nb_palettes: '', poids_tonnes: '', date_entree: '', date_sortie_prevue: '', notes: '' });

  const load = async (uniteId: number) => {
    const r = await stocksService.getByUnite(uniteId);
    setStocks(r.data);
  };

  useEffect(() => {
    unitesService.getAll().then(r => {
      setUnites(r.data);
      if (r.data.length > 0) {
        setSelectedUnite(r.data[0].id);
        load(r.data[0].id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await stocksService.create({
      ...form,
      chambre_id: +form.chambre_id,
      nb_palettes: +form.nb_palettes,
      poids_tonnes: +form.poids_tonnes,
    });
    setShowModal(false);
    setForm({ chambre_id: '', client_nom: '', variete: '', nb_palettes: '', poids_tonnes: '', date_entree: '', date_sortie_prevue: '', notes: '' });
    if (selectedUnite) load(selectedUnite);
  };

  const handleSortie = async (id: number) => {
    if (confirm('Confirmer la sortie de ce lot ?')) {
      await stocksService.remove(id);
      if (selectedUnite) load(selectedUnite);
    }
  };

  const totalPalettes = stocks.reduce((s, st) => s + st.nb_palettes, 0);
  const totalTonnes = stocks.reduce((s, st) => s + st.poids_tonnes, 0);
  const selectedUniteData = unites.find(u => u.id === selectedUnite);
  const chambresUnite = selectedUniteData?.chambres || [];

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}><div className="spinner" /></div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Gestion des stocks</h1>
          <p className="page-sub">{totalPalettes} palettes — {totalTonnes.toFixed(1)} tonnes en stock</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <select className="form-select" value={selectedUnite || ''} onChange={e => { setSelectedUnite(+e.target.value); load(+e.target.value); }}>
            {unites.map(u => <option key={u.id} value={u.id}>{u.nom}</option>)}
          </select>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Entrée stock</button>
        </div>
      </div>

      <div className="grid-3" style={{ marginBottom: '1.5rem' }}>
        <div className="kpi-card">
          <div className="kpi-label">Lots en stock</div>
          <div className="kpi-value">{stocks.length}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total palettes</div>
          <div className="kpi-value">{totalPalettes}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Tonnage total</div>
          <div className="kpi-value">{totalTonnes.toFixed(1)}<span className="kpi-unit"> t</span></div>
        </div>
      </div>

      <div className="card">
        {stocks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
            Aucun stock enregistré. Cliquez sur "+ Entrée stock" pour commencer.
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Chambre</th>
                  <th>Client</th>
                  <th>Variété</th>
                  <th>Palettes</th>
                  <th>Tonnes</th>
                  <th>Entrée</th>
                  <th>Sortie prévue</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map(s => (
                  <tr key={s.id}>
                    <td>Ch. {s.chambre_id}</td>
                    <td style={{ fontWeight: 500 }}>{s.client_nom}</td>
                    <td>{s.variete}</td>
                    <td>{s.nb_palettes}</td>
                    <td>{s.poids_tonnes.toFixed(1)} t</td>
                    <td style={{ fontSize: 12 }}>{s.date_entree ? new Date(s.date_entree).toLocaleDateString('fr-FR') : '—'}</td>
                    <td style={{ fontSize: 12 }}>{s.date_sortie_prevue ? new Date(s.date_sortie_prevue).toLocaleDateString('fr-FR') : '—'}</td>
                    <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.notes || '—'}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleSortie(s.id)}>Sortie</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">Entrée de stock</h3>
            <form onSubmit={handleAdd}>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Chambre *</label>
                  <select className="form-select" value={form.chambre_id} onChange={e => setForm(p => ({ ...p, chambre_id: e.target.value }))} required>
                    <option value="">Sélectionner...</option>
                    {chambresUnite.map((c: any) => <option key={c.id} value={c.id}>{c.nom}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Variété *</label>
                  <select className="form-select" value={form.variete} onChange={e => setForm(p => ({ ...p, variete: e.target.value }))} required>
                    <option value="">Choisir...</option>
                    {['Gala', 'Golden', 'Jonagold', 'Fuji', 'Pink Lady', 'Braeburn', 'Elstar', 'Autre'].map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Nom client *</label>
                  <input className="form-input" value={form.client_nom} onChange={e => setForm(p => ({ ...p, client_nom: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Nb palettes *</label>
                  <input className="form-input" type="number" min={1} value={form.nb_palettes} onChange={e => setForm(p => ({ ...p, nb_palettes: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Poids (tonnes)</label>
                  <input className="form-input" type="number" step="0.1" value={form.poids_tonnes} onChange={e => setForm(p => ({ ...p, poids_tonnes: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Date entrée</label>
                  <input className="form-input" type="date" value={form.date_entree} onChange={e => setForm(p => ({ ...p, date_entree: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Sortie prévue</label>
                  <input className="form-input" type="date" value={form.date_sortie_prevue} onChange={e => setForm(p => ({ ...p, date_sortie_prevue: e.target.value }))} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea className="form-input" rows={2} value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} style={{ resize: 'vertical' }} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Annuler</button>
                <button type="submit" className="btn btn-primary">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
