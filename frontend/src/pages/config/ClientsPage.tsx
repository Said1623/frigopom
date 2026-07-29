import { useEffect, useState } from 'react';
import { clientsService, authService } from '../../services/api';
import { Client } from '../../types';

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [form, setForm] = useState({ nom: '', adresse: '', telephone: '', email: '' });
  const [userForm, setUserForm] = useState({ nom: '', prenom: '', email: '', password: '', role: 'operateur', client_id: 0 });

  const load = () => clientsService.getAll().then(r => setClients(r.data)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    await clientsService.create(form);
    setShowModal(false);
    setForm({ nom: '', adresse: '', telephone: '', email: '' });
    load();
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    await authService.createUser({ ...userForm, client_id: selectedClient?.id });
    setShowUserModal(false);
    setUserForm({ nom: '', prenom: '', email: '', password: '', role: 'operateur', client_id: 0 });
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}><div className="spinner" /></div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Gestion des clients</h1>
          <p className="page-sub">{clients.length} client(s) — Mode super admin</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Nouveau client</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {clients.map(c => (
          <div key={c.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{c.nom}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {c.email || 'Pas d\'email'} — {c.telephone || 'Pas de tél'} — {c.adresse || 'Adresse n/r'}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-secondary btn-sm" onClick={() => { setSelectedClient(c); setShowUserModal(true); }}>
                  + Utilisateur
                </button>
                <span className={`badge ${c.actif ? 'badge-ok' : 'badge-neutral'}`}>
                  {c.actif ? 'Actif' : 'Inactif'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal client */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">Nouveau client</h3>
            <form onSubmit={handleAddClient}>
              <div className="form-group"><label className="form-label">Nom *</label><input className="form-input" value={form.nom} onChange={e => setForm(p => ({ ...p, nom: e.target.value }))} required /></div>
              <div className="form-group"><label className="form-label">Adresse</label><input className="form-input" value={form.adresse} onChange={e => setForm(p => ({ ...p, adresse: e.target.value }))} /></div>
              <div className="grid-2">
                <div className="form-group"><label className="form-label">Téléphone</label><input className="form-input" value={form.telephone} onChange={e => setForm(p => ({ ...p, telephone: e.target.value }))} /></div>
                <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} /></div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Annuler</button>
                <button type="submit" className="btn btn-primary">Créer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal utilisateur */}
      {showUserModal && selectedClient && (
        <div className="modal-overlay" onClick={() => setShowUserModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">Ajouter un utilisateur — {selectedClient.nom}</h3>
            <form onSubmit={handleAddUser}>
              <div className="grid-2">
                <div className="form-group"><label className="form-label">Prénom *</label><input className="form-input" value={userForm.prenom} onChange={e => setUserForm(p => ({ ...p, prenom: e.target.value }))} required /></div>
                <div className="form-group"><label className="form-label">Nom *</label><input className="form-input" value={userForm.nom} onChange={e => setUserForm(p => ({ ...p, nom: e.target.value }))} required /></div>
                <div className="form-group"><label className="form-label">Email *</label><input className="form-input" type="email" value={userForm.email} onChange={e => setUserForm(p => ({ ...p, email: e.target.value }))} required /></div>
                <div className="form-group"><label className="form-label">Mot de passe *</label><input className="form-input" type="password" value={userForm.password} onChange={e => setUserForm(p => ({ ...p, password: e.target.value }))} required /></div>
                <div className="form-group"><label className="form-label">Rôle</label>
                  <select className="form-select" value={userForm.role} onChange={e => setUserForm(p => ({ ...p, role: e.target.value }))}>
                    <option value="admin">Admin</option>
                    <option value="operateur">Opérateur</option>
                    <option value="lecteur">Lecteur</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowUserModal(false)}>Annuler</button>
                <button type="submit" className="btn btn-primary">Créer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
