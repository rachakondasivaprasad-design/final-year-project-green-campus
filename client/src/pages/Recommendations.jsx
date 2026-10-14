import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Lightbulb, CheckCircle2, Clock, Filter, ArrowRight, Shield } from 'lucide-react';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const { hasRole } = useAuth();

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const res = await API.get('/recommendations', {
        params: { priority: priorityFilter, status: statusFilter }
      });
      if (res.data.success) {
        setRecommendations(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [priorityFilter, statusFilter]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.put(`/recommendations/${id}`, { status: newStatus });
      fetchRecommendations();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update status');
    }
  };

  return (
    <div className="page-wrapper">
      {/* Header & Filter Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', color: '#fff', margin: 0, fontWeight: 700 }}>AI Sustainability Recommendations</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Actionable eco-initiatives, estimated impacts, and implementation progress</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <select className="form-select" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="All">All Priorities</option>
            <option value="HIGH">High Priority</option>
            <option value="MEDIUM">Medium Priority</option>
            <option value="LOW">Low Priority</option>
          </select>

          <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="PROPOSED">Proposed</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="IMPLEMENTED">Implemented</option>
          </select>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="skeleton" style={{ height: '220px', borderRadius: '12px' }}></div>
          <div className="skeleton" style={{ height: '220px', borderRadius: '12px' }}></div>
        </div>
      ) : recommendations.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <Lightbulb size={40} color="var(--accent-amber)" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>No Recommendations Found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Try clearing your filters or running an AI diagnostic scan.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1.5rem' }}>
          {recommendations.map((rec) => (
            <div key={rec._id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: `3px solid ${rec.priority === 'HIGH' ? '#f43f5e' : '#f59e0b'}` }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span className={`badge ${rec.priority === 'HIGH' ? 'badge-rose' : 'badge-amber'}`}>
                    {rec.priority} PRIORITY
                  </span>
                  <span className={`badge ${rec.status === 'IMPLEMENTED' ? 'badge-emerald' : rec.status === 'IN_PROGRESS' ? 'badge-purple' : 'badge-amber'}`}>
                    {rec.status}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '0.5rem' }}>{rec.title}</h3>
                
                <div style={{ fontSize: '0.82rem', color: 'var(--primary-emerald)', fontWeight: 600, marginBottom: '0.8rem' }}>
                  Building: {rec.building} | Category: {rec.category}
                </div>

                <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.82rem', color: '#fff', marginBottom: '0.4rem' }}>
                    <strong>Issue:</strong> {rec.issue}
                  </p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                    <strong>AI Insight:</strong> {rec.insight}
                  </p>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '1rem', lineHeight: 1.5 }}>
                  <strong>Recommended Action:</strong> {rec.action}
                </div>
              </div>

              <div style={{ paddingTop: '0.85rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '0.78rem', color: '#34d399', fontWeight: 600 }}>
                  Est. Impact: {rec.estimatedImpact}
                </div>

                {hasRole('ADMIN', 'COORDINATOR') && (
                  <select
                    className="form-select"
                    style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }}
                    value={rec.status}
                    onChange={(e) => handleStatusChange(rec._id, e.target.value)}
                  >
                    <option value="PROPOSED">Mark Proposed</option>
                    <option value="IN_PROGRESS">Mark In Progress</option>
                    <option value="IMPLEMENTED">Mark Implemented</option>
                    <option value="DISMISSED">Dismiss Action</option>
                  </select>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
