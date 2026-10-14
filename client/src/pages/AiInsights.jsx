import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Sparkles, AlertTriangle, CheckCircle, RefreshCw, Layers } from 'lucide-react';

const AiInsights = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);

  const fetchAiAnalysis = async () => {
    try {
      const res = await API.get('/ai/insights');
      if (res.data.success) {
        // Also call scan analysis
        const scanRes = await API.post('/ai/analyze');
        if (scanRes.data.success) {
          setAnalysis(scanRes.data.data);
        }
      }
    } catch (err) {
      console.error('AI scan failed:', err);
    } finally {
      setLoading(false);
      setScanning(false);
    }
  };

  useEffect(() => {
    fetchAiAnalysis();
  }, []);

  const handleRunScan = async () => {
    setScanning(true);
    await fetchAiAnalysis();
  };

  if (loading) {
    return (
      <div className="page-wrapper" style={{ padding: '2rem' }}>
        <div className="skeleton" style={{ height: '200px', borderRadius: '12px', marginBottom: '1.5rem' }}></div>
        <div className="skeleton" style={{ height: '300px', borderRadius: '12px' }}></div>
      </div>
    );
  }

  const insights = analysis?.insights || [];
  const anomalies = analysis?.anomalies || [];

  return (
    <div className="page-wrapper">
      {/* Header Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', color: '#fff', margin: 0, fontWeight: 700 }}>AI Intelligence & Pattern Analysis Hub</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Automated anomaly detection, consumption pattern interpretation, and sustainability scoring</p>
        </div>

        <button className="btn btn-primary" onClick={handleRunScan} disabled={scanning}>
          <Sparkles size={18} />
          <span>{scanning ? 'Running AI Scan...' : 'Trigger AI Environmental Scan'}</span>
        </button>
      </div>

      {/* Overview Status Banner Card */}
      <div className="glass-card" style={{ marginBottom: '1.75rem', borderLeft: '4px solid var(--primary-emerald)', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(17, 24, 39, 0.8))' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Sparkles size={24} color="#34d399" />
            <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>Campus Diagnostic Overview</h3>
          </div>
          <span className="badge badge-emerald">
            {analysis?.mode || 'FALLBACK_ENGINE'}
          </span>
        </div>

        <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '1rem' }}>
          {analysis?.summary}
        </p>

        <div style={{ display: 'flex', gap: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Campus Sustainability Score: </span>
            <strong style={{ color: '#34d399', fontSize: '1rem' }}>{analysis?.campusScore}/100</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Detected Anomalies: </span>
            <strong style={{ color: anomalies.length > 0 ? '#f87171' : '#34d399', fontSize: '1rem' }}>{anomalies.length}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Active Recommendations: </span>
            <strong style={{ color: '#fbbf24', fontSize: '1rem' }}>{analysis?.recommendations?.length || 0}</strong>
          </div>
        </div>
      </div>

      {/* Grid: Insights & Detected Anomalies */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Left Column: Pattern Insights */}
        <div>
          <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={20} color="#06b6d4" />
            <span>Key Pattern Insights</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {insights.map((ins, idx) => (
              <div key={idx} className="glass-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{ins.title}</span>
                  <span className={`badge ${ins.impact === 'CRITICAL' || ins.impact === 'HIGH' ? 'badge-rose' : 'badge-emerald'}`}>
                    {ins.impact}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{ins.description}</p>
                <div style={{ marginTop: '0.5rem', fontSize: '0.72rem', color: 'var(--primary-emerald)' }}>
                  Category: {ins.category}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Detected Anomalies */}
        <div>
          <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle size={20} color="#f43f5e" />
            <span>Detected Baseline Anomalies</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {anomalies.length === 0 ? (
              <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <CheckCircle size={36} color="#10b981" style={{ margin: '0 auto 0.5rem auto' }} />
                <p style={{ color: '#fff', fontSize: '0.9rem', margin: 0 }}>No Baseline Deviations Detected</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.2rem' }}>All resource consumption readings align with historical averages.</p>
              </div>
            ) : (
              anomalies.map((anom, idx) => (
                <div key={idx} className="glass-card" style={{ borderLeft: '4px solid var(--accent-rose)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{anom.parameter} Surge</span>
                    <span className="badge badge-rose">+{anom.percentageChange}% Spikes</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '0.6rem' }}>{anom.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
                    <span>Building: <strong style={{ color: '#fff' }}>{anom.building}</strong></span>
                    <span>Current: <strong style={{ color: '#f87171' }}>{anom.currentValue}</strong> vs Hist Avg: <strong>{anom.historicalAverage}</strong></span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiInsights;
