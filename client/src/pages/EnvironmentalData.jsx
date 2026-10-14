import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import AddRecordModal from '../components/modals/AddRecordModal';
import { Plus, Search, Filter, Trash2, Edit3, Database } from 'lucide-react';

const EnvironmentalData = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [building, setBuilding] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { hasRole } = useAuth();

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await API.get('/environment', {
        params: {
          category,
          building,
          search,
          page,
          limit: 10
        }
      });
      if (res.data.success) {
        setRecords(res.data.data);
        setTotalPages(res.data.pages || 1);
      }
    } catch (err) {
      console.error('Failed to fetch records:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [category, building, page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchRecords();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      await API.delete(`/environment/${id}`);
      fetchRecords();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete record');
    }
  };

  return (
    <div className="page-wrapper">
      {/* Header & Action Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', color: '#fff', margin: 0, fontWeight: 700 }}>Environmental Records Data Hub</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>View, enter, filter, and audit campus environmental logs</p>
        </div>

        {hasRole('ADMIN', 'COORDINATOR', 'STAFF') && (
          <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={18} />
            <span>Add New Log</span>
          </button>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-card" style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem' }}>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input
              type="text"
              className="form-input"
              style={{ width: '100%', paddingLeft: '2.5rem' }}
              placeholder="Search building, notes, or department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} color="var(--text-muted)" />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Category:</span>
            <select className="form-select" value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }}>
              <option value="All">All Categories</option>
              <option value="Electricity">Electricity</option>
              <option value="Water">Water</option>
              <option value="Waste">Waste</option>
              <option value="Paper">Paper</option>
              <option value="Transportation">Transportation</option>
              <option value="GreenSpace">Green Space</option>
              <option value="Cleanliness">Cleanliness</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Building:</span>
            <select className="form-select" value={building} onChange={(e) => { setBuilding(e.target.value); setPage(1); }}>
              <option value="All">All Buildings</option>
              <option value="Main Academic Block">Main Academic Block</option>
              <option value="Science & Technology Block">Science & Tech Block</option>
              <option value="Student Hostel Complex">Student Hostel Complex</option>
              <option value="Administration Building">Administration Building</option>
            </select>
          </div>

          <button type="submit" className="btn btn-secondary" style={{ padding: '0.65rem 1rem' }}>Search</button>
        </form>
      </div>

      {/* Data Table Container */}
      <div className="table-container">
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <div className="skeleton" style={{ height: '40px', marginBottom: '1rem' }}></div>
            <div className="skeleton" style={{ height: '40px', marginBottom: '1rem' }}></div>
            <div className="skeleton" style={{ height: '40px' }}></div>
          </div>
        ) : records.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <Database size={42} color="var(--primary-emerald)" style={{ margin: '0 auto 1rem auto' }} />
            <h4 style={{ color: '#fff', marginBottom: '0.4rem' }}>No environmental records found</h4>
            <p style={{ fontSize: '0.85rem' }}>Try adjusting your search criteria or add a new environmental record.</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Period</th>
                <th>Building / Location</th>
                <th>Recorded Value / Metrics</th>
                <th>Notes</th>
                <th>Logged By</th>
                {hasRole('ADMIN', 'COORDINATOR') && <th style={{ textAlign: 'right' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {records.map((r) => {
                const m = r.metrics || {};
                let metricDisplay = '';

                if (r.category === 'Electricity') metricDisplay = `${m.consumption?.toLocaleString()} kWh ($${m.cost || 0})`;
                else if (r.category === 'Water') metricDisplay = `${m.consumption?.toLocaleString()} Liters`;
                else if (r.category === 'Waste') metricDisplay = `${m.quantity} kg (${m.recycled || 0} kg Recycled)`;
                else if (r.category === 'Paper') metricDisplay = `${m.consumption} Reams`;
                else if (r.category === 'Cleanliness') metricDisplay = `${m.cleanlinessScore}/100 Rating`;
                else if (r.category === 'GreenSpace') metricDisplay = `${m.greenArea?.toLocaleString()} sq.m (${m.trees} trees)`;
                else metricDisplay = JSON.stringify(m);

                return (
                  <tr key={r._id}>
                    <td>
                      <span className={`badge ${r.category === 'Electricity' ? 'badge-emerald' : r.category === 'Water' ? 'badge-purple' : 'badge-amber'}`}>
                        {r.category}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600 }}>{r.month}/{r.year}</td>
                    <td>{r.building}</td>
                    <td style={{ fontWeight: 600, color: '#34d399' }}>{metricDisplay}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{r.notes || '—'}</td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{r.recordedBy?.name || 'System'}</td>
                    {hasRole('ADMIN', 'COORDINATOR') && (
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => handleDelete(r._id)}
                          style={{ background: 'rgba(244,63,94,0.1)', color: '#f87171', border: '1px solid rgba(244,63,94,0.3)', padding: '0.35rem 0.6rem', borderRadius: '6px' }}
                          title="Delete Record"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Page {page} of {totalPages}
        </span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className="btn btn-secondary"
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </button>
          <button
            className="btn btn-secondary"
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      </div>

      {/* Add Record Modal */}
      <AddRecordModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => { fetchRecords(); }}
      />
    </div>
  );
};

export default EnvironmentalData;
