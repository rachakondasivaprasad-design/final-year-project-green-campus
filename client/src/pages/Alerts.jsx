import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Bell, AlertTriangle, CheckCircle, ShieldAlert, Filter } from 'lucide-react';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [severityFilter, setSeverityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const { hasRole } = useAuth();

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const res = await API.get('/alerts', {
        params: { severity: severityFilter, status: statusFilter }
      });
      if (res.data.success) {
        setAlerts(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load alerts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, [severityFilter, statusFilter]);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await API.put(`/alerts/${id}`, { status: newStatus });
      fetchAlerts();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update alert');
    }
  };

  return (
    <div className="page-wrapper">
      {/* Header & Filters */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', color: '#fff', margin: 0, fontWeight: 700 }}>Alert & Event Monitoring Center</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Real-time threshold breaches, consumption anomalies, and critical system notifications</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <select className="form-select" value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)}>
            <option value="All">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="WARNING">Warning</option>
            <option value="INFO">Informational</option>
          </select>

          <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="ACTIVE">Active Alerts</option>
            <option value="ACKNOWLEDGED">Acknowledged</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>
      </div>

      {/* Alerts Table / List */}
      {loading ? (
        <div className="skeleton" style={{ height: '300px', borderRadius: '12px' }}></div>
      ) : alerts.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <CheckCircle size={42} color="#10b981" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ color: '#fff', marginBottom: '0.4rem' }}>No Active System Alerts</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>All environmental parameters across campus buildings are operating within normal baseline limits.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {alerts.map((alert) => (
            <div
              key={alert._id}
              className="glass-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderLeft: `4px solid ${alert.severity === 'CRITICAL' ? '#f43f5e' : alert.severity === 'WARNING' ? '#f59e0b' : '#10b981'}`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{
                  padding: '0.6rem',
                  borderRadius: '8px',
                  backgroundColor: alert.severity === 'CRITICAL' ? 'rgba(244,63,94,0.15)' : alert.severity === 'WARNING' ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.15)'
                }}>
                  <AlertTriangle size={20} color={alert.severity === 'CRITICAL' ? '#f87171' : alert.severity === 'WARNING' ? '#fbbf24' : '#34d399'} />
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                    <h3 style={{ fontSize: '1rem', color: '#fff', margin: 0 }}>{alert.title}</h3>
                    <span className={`badge ${alert.severity === 'CRITICAL' ? 'badge-rose' : alert.severity === 'WARNING' ? 'badge-amber' : 'badge-emerald'}`}>
                      {alert.severity}
                    </span>
                    <span className={`badge ${alert.status === 'RESOLVED' ? 'badge-emerald' : alert.status === 'ACKNOWLEDGED' ? 'badge-purple' : 'badge-rose'}`}>
                      {alert.status}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 0.4rem 0' }}>{alert.message}</p>

                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', gap: '1.5rem' }}>
                    <span>Building: <strong style={{ color: '#fff' }}>{alert.building}</strong></span>
                    <span>Parameter: <strong>{alert.parameter}</strong></span>
                    {alert.triggeredValue && <span>Trigger Value: <strong style={{ color: '#f87171' }}>{alert.triggeredValue}</strong> (Threshold: {alert.thresholdValue})</span>}
                  </div>
                </div>
              </div>

              {/* Status Action Buttons */}
              {hasRole('ADMIN', 'COORDINATOR', 'STAFF') && alert.status !== 'RESOLVED' && (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {alert.status === 'ACTIVE' && (
                    <button
                      className="btn btn-secondary"
                      style={{ fontSize: '0.78rem', padding: '0.4rem 0.75rem' }}
                      onClick={() => handleUpdateStatus(alert._id, 'ACKNOWLEDGED')}
                    >
                      Acknowledge
                    </button>
                  )}
                  <button
                    className="btn btn-primary"
                    style={{ fontSize: '0.78rem', padding: '0.4rem 0.75rem' }}
                    onClick={() => handleUpdateStatus(alert._id, 'RESOLVED')}
                  >
                    Resolve Alert
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Alerts;
