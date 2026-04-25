import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import TwoFactorModal from '../components/TwoFactorModal';
import toast from 'react-hot-toast';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [tempUserId, setTempUserId] = useState(null);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.requires2FA) {
        setTempUserId(result.userId);
        setShow2FA(true);
        setLoading(false);
      } else if (result.success) {
        toast.success(`Welcome back, ${result.user.name}!`);
        navigate(from, { replace: true });
      } else {
        toast.error(result.error);
        setLoading(false);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      setLoading(false);
    }
  };

  const handle2FAVerify = async (code) => {
    try {
      const result = await login(formData.email, formData.password, code);
      
      if (result.success) {
        toast.success(`Welcome back, ${result.user.name}!`);
        setShow2FA(false);
        navigate(from, { replace: true });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      throw error;
    }
  };

  const handle2FACancel = () => {
    setShow2FA(false);
    setTempUserId(null);
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to continue your wellness journey</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input"
                placeholder="Enter your password"
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="auth-link">
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        <div className="auth-illustration">
          <div className="illustration-content">
            <h2>Your Digital Best Friend</h2>
            <p>Track, learn, and grow with personalized menstrual health insights</p>
            <div className="illustration-icons">
              <div className="icon-float">🌸</div>
              <div className="icon-float">💕</div>
              <div className="icon-float">🌙</div>
            </div>
          </div>
        </div>
      </div>

      {show2FA && (
        <TwoFactorModal
          onVerify={handle2FAVerify}
          onCancel={handle2FACancel}
          userId={tempUserId}
        />
      )}
    </div>
  );
};

export default Login;