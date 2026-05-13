import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import PropertiesPage from './pages/PropertiesPage'
import PropertyDetailsPage from './pages/PropertyDetailsPage'
import TenantsPage from './pages/TenantsPage'
import TenantProfilePage from './pages/TenantProfilePage'
import BookingsPage from './pages/BookingsPage'
import BookingDetailsPage from './pages/BookingDetailsPage'
import FinancePage from './pages/FinancePage'
import SettingsPage from './pages/SettingsPage'

import './App.css'

import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './components/layout/DashboardLayout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      
      {/* Protected Dashboard Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/properties" 
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <PropertiesPage />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/properties/:id" 
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <PropertyDetailsPage />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/bookings" 
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <BookingsPage />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/bookings/:id" 
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <BookingDetailsPage />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/tenants" 
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <TenantsPage />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/tenants/:id" 
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <TenantProfilePage />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/finance" 
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <FinancePage />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <SettingsPage />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}

export default App
