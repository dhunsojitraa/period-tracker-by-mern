import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import NotificationBell from './NotificationBell';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <span className="brand-icon">🌸</span>
            A Girl's Best Friend
          </Link>

          <div className="navbar-menu desktop-menu">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/period-tracker" 
                  className={`nav-link ${isActive('/period-tracker') ? 'active' : ''}`}
                >
                  Period Tracker
                </Link>
                <Link 
                  to="/mood-tracker" 
                  className={`nav-link ${isActive('/mood-tracker') ? 'active' : ''}`}
                >
                  Mood Tracker
                </Link>
                <Link 
                  to="/cycle-phases" 
                  className={`nav-link ${isActive('/cycle-phases') ? 'active' : ''}`}
                >
                  Cycle Phases
                </Link>
                <Link 
                  to="/symptoms" 
                  className={`nav-link ${isActive('/symptoms') ? 'active' : ''}`}
                >
                  Symptoms
                </Link>
                <Link 
                  to="/music-therapy" 
                  className={`nav-link ${isActive('/music-therapy') ? 'active' : ''}`}
                >
                  Music
                </Link>
                <Link 
                  to="/analytics" 
                  className={`nav-link ${isActive('/analytics') ? 'active' : ''}`}
                >
                  Analytics
                </Link>
                <Link 
                  to="/sex-education" 
                  className={`nav-link ${isActive('/sex-education') ? 'active' : ''}`}
                >
                  Sex Ed
                </Link>
                <div className="user-menu">
                  <NotificationBell />
                  <span className="user-greeting">Hi, {user?.name}!</span>
                  <Link to="/profile" className="btn btn-secondary">Profile</Link>
                  <button onClick={handleLogout} className="btn btn-outline">Logout</button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/cycle-phases" 
                  className={`nav-link ${isActive('/cycle-phases') ? 'active' : ''}`}
                >
                  Learn
                </Link>
                <Link 
                  to="/symptoms" 
                  className={`nav-link ${isActive('/symptoms') ? 'active' : ''}`}
                >
                  Symptoms
                </Link>
                <Link 
                  to="/fertility" 
                  className={`nav-link ${isActive('/fertility') ? 'active' : ''}`}
                >
                  Fertility
                </Link>
                <Link 
                  to="/menopause" 
                  className={`nav-link ${isActive('/menopause') ? 'active' : ''}`}
                >
                  Menopause
                </Link>
                <Link to="/login" className="btn btn-secondary">Login</Link>
                <Link to="/register" className="btn btn-primary">Sign Up</Link>
              </>
            )}
          </div>

          
          <button 
            className="mobile-menu-btn"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`mobile-nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/period-tracker" 
                  className={`mobile-nav-link ${isActive('/period-tracker') ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Period Tracker
                </Link>
                <Link 
                  to="/mood-tracker" 
                  className={`mobile-nav-link ${isActive('/mood-tracker') ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mood Tracker
                </Link>
                <Link 
                  to="/cycle-phases" 
                  className={`mobile-nav-link ${isActive('/cycle-phases') ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cycle Phases
                </Link>
                <Link 
                  to="/symptoms" 
                  className={`mobile-nav-link ${isActive('/symptoms') ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Symptoms
                </Link>
                <Link 
                  to="/music-therapy" 
                  className={`mobile-nav-link ${isActive('/music-therapy') ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Music
                </Link>
                <Link 
                  to="/analytics" 
                  className={`mobile-nav-link ${isActive('/analytics') ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Analytics
                </Link>
                <Link 
                  to="/profile" 
                  className={`mobile-nav-link ${isActive('/profile') ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button onClick={handleLogout} className="mobile-nav-link logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/cycle-phases" 
                  className={`mobile-nav-link ${isActive('/cycle-phases') ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Learn
                </Link>
                <Link 
                  to="/symptoms" 
                  className={`mobile-nav-link ${isActive('/symptoms') ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Symptoms
                </Link>
                <Link 
                  to="/fertility" 
                  className={`mobile-nav-link ${isActive('/fertility') ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Fertility
                </Link>
                <Link 
                  to="/menopause" 
                  className={`mobile-nav-link ${isActive('/menopause') ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Menopause
                </Link>
                <Link 
                  to="/login" 
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;