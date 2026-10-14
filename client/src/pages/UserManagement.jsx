import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Users, UserPlus, Shield, Trash2, Edit } from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuth();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await API.get('/users');
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await API.put(`/users/${userId}`, { role: newRole });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update user role');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await API.delete(`/users/${userId}`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete user');
    }
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', color: '#fff', margin: 0, fontWeight: 700 }}>Governance & User Management</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Manage access controls, assign roles, and audit user permissions across campus</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="table-container">
        {loading ? (
          <div className="skeleton" style={{ height: '350px', borderRadius: '12px' }}></div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>User Details</th>
                <th>Department</th>
                <th>Role Permission</th>
                <th>Status</th>
                <th>Created Date</th>
                <th style={{ textAlign: 'right' }}>Role Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--primary-emerald-dark)',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '0.85rem'
                      }}>
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: '#fff' }}>{u.name}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{u.department || 'General'}</td>
                  <td>
                    <span className={`badge ${u.role === 'ADMIN' ? 'badge-rose' : u.role === 'COORDINATOR' ? 'badge-amber' : 'badge-emerald'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${u.isActive ? 'badge-emerald' : 'badge-amber'}`}>
                      {u.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {u._id !== currentUser?._id && (
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <select
                          className="form-select"
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                          value={u.role}
                          onChange={(e) => handleRoleChange(u._id, e.target.value)}
                        >
                          <option value="ADMIN">ADMIN</option>
                          <option value="COORDINATOR">COORDINATOR</option>
                          <option value="STAFF">STAFF</option>
                          <option value="VIEWER">VIEWER</option>
                        </select>

                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          style={{ background: 'rgba(244,63,94,0.1)', color: '#f87171', border: '1px solid rgba(244,63,94,0.3)', padding: '0.25rem 0.5rem', borderRadius: '6px' }}
                          title="Delete User"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
