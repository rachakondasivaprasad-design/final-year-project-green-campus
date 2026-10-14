import React, { useState, useEffect } from 'react';
import API from '../services/api';
import ComparisonBarChart from '../components/charts/ComparisonBarChart';
import { GitCompare, ArrowRightLeft, TrendingUp } from 'lucide-react';

const ComparativeAnalysis = () => {
  const [type, setType] = useState('MONTH'); // MONTH or BUILDING
  const [entityA, setEntityA] = useState('1'); // Month 1 or Building A
  const [entityB, setEntityB] = useState('2'); // Month 2 or Building B
  const [year, setYear] = useState('2025');
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchComparison = async () => {
    setLoading(true);
    try {
      const res = await API.get('/analytics/compare', {
        params: { type, entityA, entityB, year }
      });
      if (res.data.success) {
        setComparison(res.data.data);
      }
    } catch (err) {
      console.error('Failed comparison fetch:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComparison();
  }, [type, entityA, entityB, year]);

  return (
    <div className="page-wrapper">
      {/* Header & Comparison Selector */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', color: '#fff', margin: 0, fontWeight: 700 }}>Comparative Sustainability Matrix</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Side-by-side environmental benchmarking across periods, buildings, and parameters</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <select className="form-select" value={type} onChange={(e) => {
            setType(e.target.value);
            if (e.target.value === 'BUILDING') {
              setEntityA('Main Academic Block');
              setEntityB('Science & Technology Block');
            } else {
              setEntityA('1');
              setEntityB('2');
            }
          }}>
            <option value="MONTH">Month vs Month</option>
            <option value="BUILDING">Building vs Building</option>
          </select>

          {type === 'MONTH' ? (
            <>
              <select className="form-select" value={entityA} onChange={(e) => setEntityA(e.target.value)}>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
              <span style={{ color: 'var(--primary-emerald)', fontWeight: 'bold' }}>VS</span>
              <select className="form-select" value={entityB} onChange={(e) => setEntityB(e.target.value)}>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </>
          ) : (
            <>
              <select className="form-select" value={entityA} onChange={(e) => setEntityA(e.target.value)}>
                <option value="Main Academic Block">Main Academic Block</option>
                <option value="Science & Technology Block">Science & Tech Block</option>
                <option value="Student Hostel Complex">Student Hostel Complex</option>
                <option value="Administration Building">Administration Building</option>
              </select>
              <span style={{ color: 'var(--primary-emerald)', fontWeight: 'bold' }}>VS</span>
              <select className="form-select" value={entityB} onChange={(e) => setEntityB(e.target.value)}>
                <option value="Main Academic Block">Main Academic Block</option>
                <option value="Science & Technology Block">Science & Tech Block</option>
                <option value="Student Hostel Complex">Student Hostel Complex</option>
                <option value="Administration Building">Administration Building</option>
              </select>
            </>
          )}

          <select className="form-select" value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Comparison Chart & Breakdown Table */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Chart Column */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '1rem' }}>
            Visual Comparison: {comparison?.entityA} vs {comparison?.entityB}
          </h3>

          {loading ? (
            <div className="skeleton" style={{ height: '300px', borderRadius: '12px' }}></div>
          ) : (
            <ComparisonBarChart
              data={comparison?.metrics || []}
              entityA={comparison?.entityA}
              entityB={comparison?.entityB}
            />
          )}
        </div>

        {/* Table / Variance Metrics Column */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '1rem' }}>
            Variance & Percentage Difference Table
          </h3>

          {loading ? (
            <div className="skeleton" style={{ height: '300px', borderRadius: '12px' }}></div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>{comparison?.entityA}</th>
                    <th>{comparison?.entityB}</th>
                    <th>Variance / Diff</th>
                  </tr>
                </thead>
                <tbody>
                  {(comparison?.metrics || []).map((m, idx) => {
                    const diff = m.valueB - m.valueA;
                    const pct = m.valueA > 0 ? ((diff / m.valueA) * 100).toFixed(1) : 0;
                    return (
                      <tr key={idx}>
                        <td style={{ fontWeight: 600 }}>{m.name}</td>
                        <td style={{ color: '#10b981' }}>{m.valueA?.toLocaleString()}</td>
                        <td style={{ color: '#06b6d4' }}>{m.valueB?.toLocaleString()}</td>
                        <td>
                          <span style={{ color: diff > 0 ? '#f87171' : '#34d399', fontWeight: 600 }}>
                            {diff > 0 ? `+${diff.toLocaleString()} (+${pct}%)` : `${diff.toLocaleString()} (${pct}%)`}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComparativeAnalysis;
