import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, AdminRoute } from './components/common/ProtectedRoute';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AdminLoginPage } from './pages/AdminLoginPage';

// User Dashboard Layout & Subroutes (Full Width with Right-Side Sidebar)
import { UserDashboardLayout } from './layouts/UserDashboardLayout';
import { UserOverviewView } from './pages/dashboard/UserOverviewView';
import { UserInvestmentsView } from './pages/dashboard/UserInvestmentsView';
import { UserReferralTreeView } from './pages/dashboard/UserReferralTreeView';
import { UserRoiHistoryView } from './pages/dashboard/UserRoiHistoryView';
import { UserCommissionsView } from './pages/dashboard/UserCommissionsView';

// Admin Dashboard Layout & Subroutes (Full Width with Right-Side Sidebar)
import { AdminDashboardLayout } from './layouts/AdminDashboardLayout';
import { AdminOverviewView } from './pages/admin/AdminOverviewView';
import { AdminCronRunnerView } from './pages/admin/AdminCronRunnerView';
import { AdminUsersView } from './pages/admin/AdminUsersView';
import { AdminInvestmentsView } from './pages/admin/AdminInvestmentsView';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected User Dashboard Routes with Right-Side Sidebar */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<UserDashboardLayout />}>
              <Route index element={<UserOverviewView />} />
              <Route path="investments" element={<UserInvestmentsView />} />
              <Route path="tree" element={<UserReferralTreeView />} />
              <Route path="roi" element={<UserRoiHistoryView />} />
              <Route path="commissions" element={<UserCommissionsView />} />
            </Route>
          </Route>

          {/* Protected Super Admin Console Routes with Right-Side Sidebar */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboardLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminOverviewView />} />
              <Route path="cron" element={<AdminCronRunnerView />} />
              <Route path="users" element={<AdminUsersView />} />
              <Route path="investments" element={<AdminInvestmentsView />} />
            </Route>
          </Route>

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
