import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#0a1628',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14, background: 'var(--primary)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, marginBottom: 12,
          }}>❄️</div>
          <div style={{ color: 'white', fontSize: 24, fontWeight: 700 }}>FrigoPom</div>
          <div style={{ color: 'rgba(255,255,255,.4)', fontSize: 13, marginTop: 4 }}>
            Gestion d'unités frigorifiques
          </div>
        </div>

        {/* Form */}
        <div style={{
          background: 'white', borderRadius: 16, padding: '2rem',
          boxShadow: '0 20px 60px rgba(0,0,0,.3)',
        }}>
          <h1 style={{ fontSize: 18, fontWeight: 600, marginBottom: '1.5rem' }}>Connexion</h1>

          {error && (
            <div style={{
              padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca',
              borderRadius: 8, color: '#991b1b', fontSize: 13, marginBottom: '1rem',
            }}>{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Adresse email</label>
              <input className="form-input" type="email" value={email}
                onChange={e => setEmail(e.target.value)} placeholder="nom@exemple.com" required />
            </div>
            <div className="form-group">
              <label className="form-label">Mot de passe</label>
              <input className="form-input" type="password" value={password}
                onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            <button type="submit" className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '10px', marginTop: 8 }}
              disabled={loading}>
              {loading ? <><span className="spinner" style={{ width: 16, height: 16 }} />Connexion...</> : 'Se connecter'}
            </button>
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'rgba(255,255,255,.3)', fontSize: 12 }}>
          FrigoPom v1.0 — Stockage sous atmosphère contrôlée
        </div>
      </div>
    </div>
  );
}
