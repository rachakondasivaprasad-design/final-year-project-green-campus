import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Database,
  BarChart3,
  Sparkles,
  Lightbulb,
  Bell,
  FileText,
  GitCompare,
  Users,
  Settings,
  Leaf
} from 'lucide-react';

const Sidebar = () => {
  const { user, hasRole } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Environmental Data', path: '/environment', icon: Database },
    { label: 'Analytics', path: '/analytics', icon: BarChart3 },
    { label: 'AI Insights', path: '/ai-insights', icon: Sparkles },
    { label: 'Recommendations', path: '/recommendations', icon: Lightbulb },
    { label: 'Alerts', path: '/alerts', icon: Bell },
    { label: 'Reports', path: '/reports', icon: FileText },
    { label: 'Comparative Analysis', path: '/compare', icon: GitCompare },
  ];

  if (hasRole('ADMIN')) {
    navItems.push({ label: 'User Management', path: '/users', icon: Users });
  }

  navItems.push({ label: 'Settings', path: '/settings', icon: Settings });

  return (
    <aside style={{
      width: '260px',
      backgroundColor: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem 1rem',
      flexShrink: 0
    }}>
      {/* Brand Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 0.5rem 1.5rem 0.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          boxShadow: '0 0 12px rgba(16,185,129,0.4)'
        }}>
          <Leaf size={22} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 700, margin: 0 }}>EcoPulse</h2>
          <p style={{ fontSize: '0.72rem', color: 'var(--primary-emerald)', margin: 0, fontWeight: 500 }}>SMART GREEN CAMPUS</p>
        </div>
      </div>

      {/* Navigation List */}
      <nav style={{ flex: 1, margin: '1.25rem 0', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.7rem 0.9rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.88rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#fff' : 'var(--text-muted)',
                backgroundColor: isActive ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--primary-emerald)' : '3px solid transparent',
                transition: 'all 0.2s ease'
              })}
            >
              <Icon size={18} color={item.path === '/ai-insights' ? '#34d399' : 'currentColor'} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User Badge Info at Bottom */}
      {user && (
        <div style={{
          padding: '0.9rem',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-emerald-dark)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '0.85rem'
          }}>
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff', margin: 0, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.name}</p>
            <span className={`badge ${user.role === 'ADMIN' ? 'badge-rose' : user.role === 'COORDINATOR' ? 'badge-amber' : 'badge-emerald'}`} style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem', marginTop: '0.2rem' }}>
              {user.role}
            </span>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
