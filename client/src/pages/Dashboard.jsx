import React, { useEffect, useState } from 'react';
import API from '../services/api';
import KpiCard from '../components/common/KpiCard';
import ScoreGaugeChart from '../components/charts/ScoreGaugeChart';
import TrendLineChart from '../components/charts/TrendLineChart';
import WastePieChart from '../components/charts/WastePieChart';
import {
  Zap,
  Droplet,
  Trash2,
  FileText,
  Trees,
  AlertTriangle,
  Sparkles,
  ArrowUpRight,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      setRefreshing(true);
      const res = await API.get('/dashboard/summary');
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="page-wrapper" style={{ padding: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '2rem' }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton" style={{ height: '120px', borderRadius: '12px' }}></div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
          <div className="skeleton" style={{ height: '350px', borderRadius: '12px' }}></div>
          <div className="skeleton" style={{ height: '350px', borderRadius: '12px' }}></div>
        </div>
      </div>
    );
  }

  const kpis = data?.kpis || {};
  const score = data?.score?.overallScore || 82;
  const scoreBreakdown = data?.score?.breakdown || {};
  const aiSummary = data?.aiSummary || {};

  return (
    <div className="page-wrapper">
      {/* Top Banner / Refresh Trigger */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', color: '#fff', margin: 0, fontWeight: 700 }}>Campus Sustainability Overview</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Real-time metrics aggregated across all campus blocks</p>
        </div>
        <button
          onClick={fetchDashboardData}
          className="btn btn-secondary"
          style={{ fontSize: '0.82rem', padding: '0.5rem 0.9rem' }}
          disabled={refreshing}
        >
          <RefreshCw size={14} className={refreshing ? 'spin' : ''} />
          <span>{refreshing ? 'Syncing...' : 'Sync Live Data'}</span>
        </button>
      </div>

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
        <KpiCard
          title="Electricity Usage"
          value={kpis.electricity?.value || 44200}
          unit="kWh"
          change={kpis.electricity?.change}
          icon={Zap}
          color="#10b981"
        />
        <KpiCard
          title="Water Consumption"
          value={kpis.water?.value || 165000}
          unit="L"
          change={kpis.water?.change}
          icon={Droplet}
          color="#06b6d4"
        />
        <KpiCard
          title="Solid Waste"
          value={kpis.waste?.value || 1240}
          unit="kg"
          change={kpis.waste?.change}
          icon={Trash2}
          color="#f59e0b"
        />
        <KpiCard
          title="Paper Consumption"
          value={kpis.paper?.value || 185}
          unit="reams"
          change={kpis.paper?.change}
          icon={FileText}
          color="#8b5cf6"
        />
        <KpiCard
          title="Green Canopy Cover"
          value={kpis.greenArea?.value || 42}
          unit="%"
          change={kpis.greenArea?.change}
          icon={Trees}
          color="#34d399"
        />
        <KpiCard
          title="Active Alerts"
          value={kpis.activeAlertsCount || 2}
          unit="issues"
          icon={AlertTriangle}
          color="#f43f5e"
        />
      </div>

      {/* Main Grid Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '1.75rem' }}>
        {/* Left Column: Consumption Trends Chart */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: 0 }}>Historical Resource Consumption Trends</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>12-Month Electricity & Water consumption pattern</p>
            </div>
            <button className="btn btn-secondary" style={{ fontSize: '0.78rem', padding: '0.35rem 0.7rem' }} onClick={() => navigate('/analytics')}>
              Full Analytics <ArrowUpRight size={14} />
            </button>
          </div>
          <TrendLineChart data={data?.trends || []} />
        </div>

        {/* Right Column: Environmental Score Gauge */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: 0 }}>Campus Environmental Score</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Aggregated weighted sustainability index</p>
          </div>

          <ScoreGaugeChart score={score} />

          {/* Breakdown Mini Progress Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <span>Electricity Efficiency</span>
              <span style={{ color: '#fff', fontWeight: 600 }}>{scoreBreakdown.electricityScore || 75}/100</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <span>Water Conservation</span>
              <span style={{ color: '#fff', fontWeight: 600 }}>{scoreBreakdown.waterScore || 82}/100</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <span>Waste Recycling Ratio</span>
              <span style={{ color: '#fff', fontWeight: 600 }}>{scoreBreakdown.wasteScore || 70}/100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Row: AI Insights & Alerts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* AI Insights Widget */}
        <div className="glass-card" style={{ borderLeft: '4px solid var(--primary-emerald)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={20} color="#34d399" />
              <h3 style={{ fontSize: '1.05rem', color: '#fff', margin: 0 }}>AI Environmental Insights</h3>
            </div>
            <span className="badge badge-emerald" style={{ fontSize: '0.68rem' }}>
              {aiSummary.mode || 'FALLBACK_ENGINE'}
            </span>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
            {aiSummary.summary || 'AI Analysis completed across all records.'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {(aiSummary.insights || []).slice(0, 3).map((insight, idx) => (
              <div
                key={idx}
                style={{
                  padding: '0.85rem',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{insight.title}</span>
                  <span className={`badge ${insight.impact === 'CRITICAL' || insight.impact === 'HIGH' ? 'badge-rose' : 'badge-emerald'}`}>
                    {insight.impact}
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>{insight.description}</p>
              </div>
            ))}
          </div>

          <button
            className="btn btn-secondary"
            style={{ width: '100%', marginTop: '1rem', fontSize: '0.82rem' }}
            onClick={() => navigate('/ai-insights')}
          >
            Run Detailed AI Scan
          </button>
        </div>

        {/* Active System Alerts Widget */}
        <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-rose)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={20} color="#f43f5e" />
              <h3 style={{ fontSize: '1.05rem', color: '#fff', margin: 0 }}>Recent System Alerts</h3>
            </div>
            <button className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }} onClick={() => navigate('/alerts')}>
              View All
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {(data?.recentAlerts || []).length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={32} color="#10b981" style={{ margin: '0 auto 0.5rem auto' }} />
                <p style={{ fontSize: '0.85rem' }}>No active critical alerts detected across campus.</p>
              </div>
            ) : (
              (data?.recentAlerts || []).map((alert) => (
                <div
                  key={alert._id || alert.id}
                  style={{
                    padding: '0.85rem',
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.3rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{alert.title}</span>
                    <span className={`badge ${alert.severity === 'CRITICAL' ? 'badge-rose' : alert.severity === 'WARNING' ? 'badge-amber' : 'badge-emerald'}`}>
                      {alert.severity}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>{alert.message}</p>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Building: {alert.building}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
