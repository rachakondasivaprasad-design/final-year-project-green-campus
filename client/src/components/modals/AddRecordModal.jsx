import React, { useState } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import API from '../../services/api';

const AddRecordModal = ({ isOpen, onClose, onSuccess }) => {
  const [category, setCategory] = useState('Electricity');
  const [building, setBuilding] = useState('Main Academic Block');
  const [department, setDepartment] = useState('Facilities');
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(1);
  const [notes, setNotes] = useState('');
  
  // Dynamic metrics
  const [elecConsumption, setElecConsumption] = useState('');
  const [elecCost, setElecCost] = useState('');
  const [waterConsumption, setWaterConsumption] = useState('');
  const [wasteType, setWasteType] = useState('Organic Food Waste');
  const [wasteQty, setWasteQty] = useState('');
  const [wasteRecycled, setWasteRecycled] = useState('');
  const [paperConsumption, setPaperConsumption] = useState('');
  const [cleanlinessScore, setCleanlinessScore] = useState(85);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let metrics = {};

      if (category === 'Electricity') {
        if (!elecConsumption) throw new Error('Electricity consumption is required');
        metrics = { consumption: Number(elecConsumption), cost: Number(elecCost || 0) };
      } else if (category === 'Water') {
        if (!waterConsumption) throw new Error('Water consumption is required');
        metrics = { consumption: Number(waterConsumption) };
      } else if (category === 'Waste') {
        if (!wasteQty) throw new Error('Waste quantity is required');
        metrics = {
          wasteType,
          quantity: Number(wasteQty),
          recycled: Number(wasteRecycled || 0),
          nonRecycled: Math.max(0, Number(wasteQty) - Number(wasteRecycled || 0))
        };
      } else if (category === 'Paper') {
        if (!paperConsumption) throw new Error('Paper consumption is required');
        metrics = { consumption: Number(paperConsumption) };
      } else if (category === 'Cleanliness') {
        metrics = { cleanlinessScore: Number(cleanlinessScore), location: building, remarks: notes };
      } else {
        metrics = { value: 100 };
      }

      const payload = {
        category,
        building,
        department,
        year: Number(year),
        month: Number(month),
        notes,
        metrics
      };

      const res = await API.post('/environment', payload);
      if (res.data.success) {
        onSuccess();
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to create record');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '560px',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(15, 23, 42, 0.6)'
        }}>
          <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>Add Environmental Record</h3>
          <button onClick={onClose} style={{ background: 'none', color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem', maxHeight: '80vh', overflowY: 'auto' }}>
          {error && (
            <div style={{
              backgroundColor: 'rgba(244, 63, 94, 0.15)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              color: '#f87171',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Electricity">Electricity</option>
                <option value="Water">Water</option>
                <option value="Waste">Waste</option>
                <option value="Paper">Paper</option>
                <option value="Transportation">Transportation</option>
                <option value="GreenSpace">Green Space</option>
                <option value="Cleanliness">Cleanliness</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Building</label>
              <select className="form-select" value={building} onChange={(e) => setBuilding(e.target.value)}>
                <option value="Main Academic Block">Main Academic Block</option>
                <option value="Science & Technology Block">Science & Tech Block</option>
                <option value="Student Hostel Complex">Student Hostel Complex</option>
                <option value="Administration Building">Administration Building</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Department</label>
              <input type="text" className="form-input" value={department} onChange={(e) => setDepartment(e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">Year</label>
              <input type="number" className="form-input" value={year} onChange={(e) => setYear(e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">Month (1-12)</label>
              <input type="number" className="form-input" min="1" max="12" value={month} onChange={(e) => setMonth(e.target.value)} />
            </div>
          </div>

          {/* Dynamic Metrics Section */}
          <div style={{
            padding: '1rem',
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            marginBottom: '1rem'
          }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--primary-emerald)', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {category} Metrics
            </h4>

            {category === 'Electricity' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Consumption (kWh)</label>
                  <input type="number" className="form-input" placeholder="e.g. 12500" value={elecConsumption} onChange={(e) => setElecConsumption(e.target.value)} required />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Cost ($)</label>
                  <input type="number" className="form-input" placeholder="e.g. 1750" value={elecCost} onChange={(e) => setElecCost(e.target.value)} />
                </div>
              </div>
            )}

            {category === 'Water' && (
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Water Consumption (Liters)</label>
                <input type="number" className="form-input" placeholder="e.g. 45000" value={waterConsumption} onChange={(e) => setWaterConsumption(e.target.value)} required />
              </div>
            )}

            {category === 'Waste' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Total Quantity (kg)</label>
                  <input type="number" className="form-input" placeholder="e.g. 1200" value={wasteQty} onChange={(e) => setWasteQty(e.target.value)} required />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Recycled Quantity (kg)</label>
                  <input type="number" className="form-input" placeholder="e.g. 800" value={wasteRecycled} onChange={(e) => setWasteRecycled(e.target.value)} />
                </div>
              </div>
            )}

            {category === 'Paper' && (
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Paper Consumption (Reams)</label>
                <input type="number" className="form-input" placeholder="e.g. 140" value={paperConsumption} onChange={(e) => setPaperConsumption(e.target.value)} required />
              </div>
            )}

            {category === 'Cleanliness' && (
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Cleanliness Rating (0 - 100)</label>
                <input type="number" className="form-input" min="0" max="100" value={cleanlinessScore} onChange={(e) => setCleanlinessScore(e.target.value)} required />
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Audit Notes & Remarks</label>
            <textarea className="form-textarea" rows="2" placeholder="Optional inspector remarks..." value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <Save size={16} />
              <span>{loading ? 'Saving...' : 'Save Record'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecordModal;
