import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PeriodTracker from './pages/PeriodTracker';
import MoodTracker from './pages/MoodTracker';
import CyclePhases from './pages/CyclePhases';
import Symptoms from './pages/Symptoms';
import SymptomDetail from './pages/SymptomDetail';
import Fertility from './pages/Fertility';
import Menopause from './pages/Menopause';
import MusicTherapy from './pages/MusicTherapy';
import Profile from './pages/Profile';
import Analytics from './pages/Analytics';
import TwoFactorSetup from './pages/TwoFactorSetup';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/period-tracker" element={
                <ProtectedRoute>
                  <PeriodTracker />
                </ProtectedRoute>
              } />
              <Route path="/mood-tracker" element={
                <ProtectedRoute>
                  <MoodTracker />
                </ProtectedRoute>
              } />
              <Route path="/cycle-phases" element={<CyclePhases />} />
              <Route path="/symptoms" element={<Symptoms />} />
              <Route path="/symptoms/:symptomId" element={<SymptomDetail />} />
              <Route path="/fertility" element={<Fertility />} />
              <Route path="/menopause" element={<Menopause />} />
              <Route path="/music-therapy" element={<MusicTherapy />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/analytics" element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              } />
              <Route path="/2fa-setup" element={
                <ProtectedRoute>
                  <TwoFactorSetup />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#4a5568',
                borderRadius: '12px',
                border: '1px solid rgba(248, 180, 217, 0.2)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
              }
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;