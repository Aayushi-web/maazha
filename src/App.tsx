import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'

import './App.css'

import ProtectedRoute from './components/ProtectedRoute'

import DashboardLayout from './components/layout/DashboardLayout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
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
