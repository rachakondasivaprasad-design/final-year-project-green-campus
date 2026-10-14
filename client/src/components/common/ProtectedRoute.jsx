import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, token, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-dark)',
        color: 'var(--primary-emerald)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div className="skeleton" style={{ width: '60px', height: '60px', borderRadius: '50%', margin: '0 auto 1rem auto' }}></div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Loading Smart Green Campus System...</p>
        </div>
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
