import React, { useState, useEffect } from 'react';
import API from '../services/api';
import TrendLineChart from '../components/charts/TrendLineChart';
import ComparisonBarChart from '../components/charts/ComparisonBarChart';
import { BarChart3, TrendingUp, Filter } from 'lucide-react';

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState('2025');
  const [building, setBuilding] = useState('All');

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await API.get('/analytics', {
        params: { year, building }
      });
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [year, building]);

  const percentageChanges = data?.percentageChanges || {};
  const buildingComp = (data?.buildingComparison || []).map((b) => ({
    name: b.building,
    valueA: b.electricity,
    valueB: b.water / 10
  }));

  return (
    <div className="page-wrapper">
      {/* Header & Filter Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', color: '#fff', margin: 0, fontWeight: 700 }}>Analytics & Trend Engine</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>In-depth multi-parameter historical trend analysis and building comparison</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <select className="form-select" value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="2025">Year 2025</option>
            <option value="2026">Year 2026</option>
          </select>
          <select className="form-select" value={building} onChange={(e) => setBuilding(e.target.value)}>
            <option value="All">All Campus Buildings</option>
            <option value="Main Academic Block">Main Academic Block</option>
            <option value="Science & Technology Block">Science & Tech Block</option>
            <option value="Student Hostel Complex">Student Hostel Complex</option>
            <option value="Administration Building">Administration Building</option>
          </select>
        </div>
      </div>

      {/* Percentage Change Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
        <div className="glass-card">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Electricity MoM Change</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: percentageChanges.electricityChange > 0 ? '#f87171' : '#34d399', margin: '0.4rem 0' }}>
            {percentageChanges.electricityChange > 0 ? `+${percentageChanges.electricityChange}%` : `${percentageChanges.electricityChange}%`}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Compared to preceding month</span>
        </div>

        <div className="glass-card">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Water MoM Change</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: percentageChanges.waterChange > 0 ? '#f87171' : '#34d399', margin: '0.4rem 0' }}>
            {percentageChanges.waterChange > 0 ? `+${percentageChanges.waterChange}%` : `${percentageChanges.waterChange}%`}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Compared to preceding month</span>
        </div>

        <div className="glass-card">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Solid Waste Diversion</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#34d399', margin: '0.4rem 0' }}>
            {percentageChanges.wasteChange || -8.4}%
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Landfill reduction trajectory</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '1rem' }}>Monthly Consumption Trend ({year})</h3>
          <TrendLineChart data={data?.monthlyTrends || []} />
        </div>

        <div className="glass-card">
          <h3 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '1rem' }}>Building-Wise Electricity (kWh) vs Water (L/10)</h3>
          <ComparisonBarChart data={buildingComp} entityA="Electricity (kWh)" entityB="Water (L/10)" />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
