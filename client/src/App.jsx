import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Sidebar from './components/common/Sidebar';
import Navbar from './components/common/Navbar';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EnvironmentalData from './pages/EnvironmentalData';
import Analytics from './pages/Analytics';
import AiInsights from './pages/AiInsights';
import Recommendations from './pages/Recommendations';
import Alerts from './pages/Alerts';
import Reports from './pages/Reports';
import ComparativeAnalysis from './pages/ComparativeAnalysis';
import UserManagement from './pages/UserManagement';
import Settings from './pages/Settings';

const AppLayout = ({ children, title }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar title={title} />
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppLayout title="Campus Sustainability Dashboard">
                  <Dashboard />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/environment"
            element={
              <ProtectedRoute>
                <AppLayout title="Environmental Data Hub">
                  <EnvironmentalData />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <AppLayout title="Analytics & Trends Engine">
                  <Analytics />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/ai-insights"
            element={
              <ProtectedRoute>
                <AppLayout title="AI Intelligence & Insights">
                  <AiInsights />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/recommendations"
            element={
              <ProtectedRoute>
                <AppLayout title="AI Sustainability Recommendations">
                  <Recommendations />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/alerts"
            element={
              <ProtectedRoute>
                <AppLayout title="Alert & Event Hub">
                  <Alerts />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <AppLayout title="Environmental Audit Reports">
                  <Reports />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/compare"
            element={
              <ProtectedRoute>
                <AppLayout title="Comparative Analysis Matrix">
                  <ComparativeAnalysis />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AppLayout title="User & Governance Management">
                  <UserManagement />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <AppLayout title="System Configuration">
                  <Settings />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
