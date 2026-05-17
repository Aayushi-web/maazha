import { Navigate, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import PropertyManagementPage from './pages/PropertyManagementPage'
import RentManagementPage from './pages/RentManagementPage'
import ExpenseManagementPage from './pages/ExpenseManagementPage'
import TenantManagementPage from './pages/TenantManagementPage'

import './App.css'

import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './components/layout/DashboardLayout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      
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
        path="/property-management" 
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <PropertyManagementPage />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/rent-management" 
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <RentManagementPage />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/expense-management" 
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ExpenseManagementPage />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />

      <Route
        path="/tenant-management"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <TenantManagementPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App
