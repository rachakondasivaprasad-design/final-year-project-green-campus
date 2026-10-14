import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Settings as SettingsIcon, Sliders, Cpu, Shield, CpuIcon, Radio } from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.3rem', color: '#fff', margin: 0, fontWeight: 700 }}>System Configuration & Profile</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Configure anomaly thresholds, AI API bindings, user profile, and IoT expansion parameters</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Profile Card */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <Shield size={20} color="var(--primary-emerald)" />
            <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: 0 }}>User Profile & Role</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Name:</span>
              <strong style={{ color: '#fff', fontSize: '0.85rem' }}>{user?.name}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Email:</span>
              <strong style={{ color: '#fff', fontSize: '0.85rem' }}>{user?.email}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Department:</span>
              <strong style={{ color: '#fff', fontSize: '0.85rem' }}>{user?.department}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Role:</span>
              <span className={`badge ${user?.role === 'ADMIN' ? 'badge-rose' : 'badge-emerald'}`}>
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        {/* AI Service Architecture Card */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <Cpu size={20} color="#06b6d4" />
            <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: 0 }}>AI Service Layer Status</h3>
          </div>

          <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Active Mode:</span>
              <span className="badge badge-emerald">DETERMINISTIC FALLBACK ENGINE</span>
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
              The system is operating under rule-based Fallback AI analysis mode. External LLM keys (Gemini/OpenAI) can be bound in <code>server/.env</code> using <code>AI_API_KEY</code>.
            </p>
          </div>
        </div>

        {/* Future IoT Sensor Hardware Roadmap Card */}
        <div className="glass-card" style={{ gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <Radio size={20} color="#f59e0b" />
            <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: 0 }}>Future IoT Hardware Expansion Architecture (Phase 2 Roadmap)</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', backgroundColor: 'rgba(15, 23, 42, 0.5)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 700, marginBottom: '0.2rem' }}>1. Physical Sensors</div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>ESP32 / Arduino current transformers, ultrasonic flow meters, smart bin optical sensors.</p>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 700, marginBottom: '0.2rem' }}>2. IoT Gateway</div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>MQTT Broker / LoRaWAN gateway aggregating live telemetric data bursts.</p>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 700, marginBottom: '0.2rem' }}>3. Ingestion API</div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Express IoT ingest endpoint (<code>/api/v1/iot/telemetry</code>) with validation schema.</p>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 700, marginBottom: '0.2rem' }}>4. AI Live Monitoring</div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Continuous anomaly evaluation & automated smart breaker/valve triggers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
