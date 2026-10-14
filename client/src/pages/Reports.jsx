import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FileText, Download, Printer, Plus, CheckCircle } from 'lucide-react';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportType, setReportType] = useState('MONTHLY');
  const [year, setYear] = useState('2026');
  const [month, setMonth] = useState('1');
  const [generating, setGenerating] = useState(false);

  const { hasRole } = useAuth();

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await API.get('/reports');
      if (res.data.success) {
        setReports(res.data.data);
        if (res.data.data.length > 0 && !selectedReport) {
          setSelectedReport(res.data.data[0]);
        }
      }
    } catch (err) {
      console.error('Failed to load reports:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setGenerating(true);
    try {
      const res = await API.post('/reports/generate', {
        type: reportType,
        year: Number(year),
        month: Number(month),
        period: `${month}/${year}`
      });
      if (res.data.success) {
        setSelectedReport(res.data.data);
        fetchReports();
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to generate report');
    } finally {
      setGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="page-wrapper">
      {/* Header & Generate Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', color: '#fff', margin: 0, fontWeight: 700 }}>Environmental Audit & Compliance Reports</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Generate, review, and export monthly/annual sustainability reports</p>
        </div>

        {hasRole('ADMIN', 'COORDINATOR') && (
          <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <select className="form-select" value={reportType} onChange={(e) => setReportType(e.target.value)}>
              <option value="MONTHLY">Monthly Audit Report</option>
              <option value="ANNUAL">Annual Campus Report</option>
              <option value="COMPARATIVE">Comparative Analysis Report</option>
            </select>

            <select className="form-select" value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>

            <button type="submit" className="btn btn-primary" disabled={generating}>
              <Plus size={16} />
              <span>{generating ? 'Generating...' : 'Generate Report'}</span>
            </button>
          </form>
        )}
      </div>

      {/* Main Grid: Report Selection List & Printable Report Preview */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
        {/* Left Side: Archive List */}
        <div>
          <h3 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '1rem' }}>Generated Audit Archive</h3>

          {loading ? (
            <div className="skeleton" style={{ height: '250px', borderRadius: '12px' }}></div>
          ) : reports.length === 0 ? (
            <div className="glass-card" style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No reports generated yet.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {reports.map((r) => (
                <div
                  key={r._id}
                  onClick={() => setSelectedReport(r)}
                  className="glass-card glass-card-interactive"
                  style={{
                    cursor: 'pointer',
                    borderColor: selectedReport?._id === r._id ? 'var(--primary-emerald)' : 'var(--border-color)',
                    backgroundColor: selectedReport?._id === r._id ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-card)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{r.title}</span>
                    <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>{r.type}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Period: {r.period}</span>
                    <span>Score: <strong style={{ color: '#34d399' }}>{r.score}/100</strong></span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Printable Report Display */}
        {selectedReport ? (
          <div className="glass-card" style={{ borderTop: '4px solid var(--primary-emerald)' }}>
            {/* Action Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary-emerald)', fontWeight: 600, textTransform: 'uppercase' }}>
                  {selectedReport.type} REPORT
                </span>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: 0 }}>{selectedReport.title}</h3>
              </div>

              <button className="btn btn-secondary" onClick={handlePrint}>
                <Printer size={16} />
                <span>Print / Save PDF</span>
              </button>
            </div>

            {/* Printable Report Document Body */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Score Metric Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(15, 23, 42, 0.6)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Audit Rating Score</span>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399' }}>
                    {selectedReport.score} / 100
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  <div>Period: <strong style={{ color: '#fff' }}>{selectedReport.period}</strong></div>
                  <div>Audit Year: <strong style={{ color: '#fff' }}>{selectedReport.year}</strong></div>
                </div>
              </div>

              {/* Insights Section */}
              <div>
                <h4 style={{ fontSize: '0.95rem', color: '#fff', marginBottom: '0.6rem' }}>AI Environmental Insights Summary</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {(selectedReport.insightsSummary || []).map((ins, idx) => (
                    <div key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-muted)', backgroundColor: 'rgba(255,255,255,0.02)', padding: '0.6rem 0.8rem', borderRadius: '6px', borderLeft: '3px solid #06b6d4' }}>
                      {ins}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations Section */}
              <div>
                <h4 style={{ fontSize: '0.95rem', color: '#fff', marginBottom: '0.6rem' }}>Key Recommendations & Action Steps</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {(selectedReport.recommendationsSummary || []).map((rec, idx) => (
                    <div key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-muted)', backgroundColor: 'rgba(255,255,255,0.02)', padding: '0.6rem 0.8rem', borderRadius: '6px', borderLeft: '3px solid #10b981' }}>
                      {rec}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <p style={{ color: 'var(--text-muted)' }}>Select a report from the archive list to view details.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
