import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

const navItems = [
  { to: '/', label: 'Tableau de bord', icon: '⊞', exact: true },
  { to: '/unites', label: 'Mes unités', icon: '🏭' },
  { to: '/alarmes', label: 'Alarmes', icon: '🔔' },
  { to: '/stocks', label: 'Stocks', icon: '📦' },
  { to: '/config', label: 'Configuration', icon: '⚙️' },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? 220 : 60, transition: 'width .2s',
        background: '#0a1628', display: 'flex', flexDirection: 'column',
        flexShrink: 0, position: 'sticky', top: 0, height: '100vh',
      }}>
        {/* Logo */}
        <div style={{ padding: '1.25rem 1rem', borderBottom: '1px solid rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18 }}>❄️</div>
          {sidebarOpen && (
            <div>
              <div style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>FrigoPom</div>
              <div style={{ color: 'rgba(255,255,255,.4)', fontSize: 11 }}>Gestion frigorifique</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} end={item.exact}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px',
                borderRadius: 8, color: isActive ? 'white' : 'rgba(255,255,255,.5)',
                background: isActive ? 'rgba(255,255,255,.1)' : 'transparent',
                fontSize: 13, fontWeight: isActive ? 500 : 400,
                transition: 'all .15s', textDecoration: 'none',
              })}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div style={{ padding: '1rem 8px', borderTop: '1px solid rgba(255,255,255,.08)' }}>
          {sidebarOpen && user && (
            <div style={{ padding: '8px 10px', marginBottom: 4 }}>
              <div style={{ color: 'white', fontSize: 13, fontWeight: 500 }}>{user.prenom} {user.nom}</div>
              <div style={{ color: 'rgba(255,255,255,.4)', fontSize: 11 }}>{user.role}</div>
            </div>
          )}
          <button onClick={handleLogout} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 10px', background: 'none', border: 'none',
            color: 'rgba(255,255,255,.5)', fontSize: 13, borderRadius: 8,
            cursor: 'pointer', transition: 'all .15s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = 'white')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.5)')}>
            <span>🚪</span>{sidebarOpen && <span>Déconnexion</span>}
          </button>
        </div>

        {/* Toggle */}
        <button onClick={() => setSidebarOpen(o => !o)} style={{
          position: 'absolute', top: '50%', right: -12, width: 24, height: 24,
          borderRadius: '50%', background: 'white', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', fontSize: 12, boxShadow: 'var(--shadow)',
        }}>
          {sidebarOpen ? '◀' : '▶'}
        </button>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ padding: '1.5rem 2rem', maxWidth: 1400, margin: '0 auto' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
