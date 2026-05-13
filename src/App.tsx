import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import PropertiesPage from './pages/PropertiesPage'

import './App.css'

import ProtectedRoute from './components/ProtectedRoute'

import DashboardLayout from './components/layout/DashboardLayout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route 
        path="/properties/*" 
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <PropertiesPage />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/*" 
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}

export default App
