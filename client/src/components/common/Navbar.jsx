import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Bell, Shield, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ title = 'Dashboard' }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={{
      height: '70px',
      backgroundColor: 'var(--bg-header)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Title & Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <h1 style={{ fontSize: '1.4rem', color: '#fff', margin: 0, fontWeight: 700 }}>{title}</h1>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          backgroundColor: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '0.2rem 0.6rem',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.75rem',
          color: '#34d399',
          fontWeight: 600
        }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }}></span>
          AI Engine Active
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <button
          onClick={() => navigate('/alerts')}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-muted)',
            padding: '0.5rem',
            borderRadius: '8px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title="Notifications & Alerts"
        >
          <Bell size={18} />
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-rose)'
          }}></span>
        </button>

        <div style={{ height: '24px', width: '1px', backgroundColor: 'var(--border-color)' }}></div>

        {/* User Info & Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', margin: 0 }}>{user?.name || 'User'}</p>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>{user?.department || 'Department'}</p>
          </div>

          <button
            onClick={handleLogout}
            className="btn btn-secondary"
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
            title="Logout"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
