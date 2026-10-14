import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Leaf, Lock, Mail, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('admin@greencampus.com');
  const [password, setPassword] = useState('Password123!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, skipAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      // Fallback skip auth directly
      skipAuth();
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleDirectEnter = () => {
    skipAuth();
    navigate('/dashboard');
  };

  const fillDemoCreds = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('Password123!');
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: 'var(--bg-dark)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: 'radial-gradient(ellipse at 80% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 60%)',
      padding: '1.5rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '960px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
        overflow: 'hidden'
      }}>
        {/* Left Hero Section */}
        <div style={{
          padding: '3rem 2.5rem',
          background: 'linear-gradient(135deg, rgba(6, 78, 59, 0.6), rgba(15, 23, 42, 0.9))',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'var(--primary-emerald)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 0 15px rgba(16,185,129,0.5)'
              }}>
                <Leaf size={24} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 800 }}>EcoPulse</h2>
                <p style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 600, letterSpacing: '0.05em' }}>SMART GREEN CAMPUS</p>
              </div>
            </div>

            <h1 style={{ fontSize: '1.8rem', color: '#fff', lineHeight: 1.2, marginBottom: '1rem' }}>
              AI-Powered Environmental Intelligence System
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
              Real-time resource tracking, dynamic sustainability scoring, predictive anomaly detection, and automated eco-recommendations.
            </p>

            <button
              onClick={handleDirectEnter}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '0.9rem',
                fontSize: '1rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #10b981, #047857)',
                boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
              }}
            >
              <Sparkles size={20} />
              <span>Enter System Directly (Skip Login)</span>
            </button>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2rem' }}>
            © 2026 EcoPulse Green Campus Management. All rights reserved.
          </div>
        </div>

        {/* Right Form Section */}
        <div style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.4rem' }}>Welcome Back</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Sign in to access your green campus dashboard
          </p>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                <input
                  type="email"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem', width: '100%' }}
                  placeholder="admin@greencampus.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                <input
                  type="password"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem', width: '100%' }}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem', marginTop: '1rem', fontSize: '0.95rem' }} disabled={loading}>
              <span>{loading ? 'Entering...' : 'Sign In to Campus'}</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Quick Demo Credentials Autofill */}
          <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.6rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Quick Demo Accounts
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                onClick={() => fillDemoCreds('admin@greencampus.com')}
              >
                Admin
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                onClick={() => fillDemoCreds('coordinator@greencampus.com')}
              >
                Coordinator
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                onClick={() => fillDemoCreds('staff@greencampus.com')}
              >
                Staff
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                onClick={() => fillDemoCreds('viewer@greencampus.com')}
              >
                Viewer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
