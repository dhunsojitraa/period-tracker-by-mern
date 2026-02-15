import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    cycleLength: 28,
    periodLength: 5
  });
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registrationData } = formData;
      const result = await register(registrationData);
      
      if (result.success) {
        toast.success(`Welcome to A Girl's Best Friend, ${result.user.name}!`);
        navigate('/dashboard');
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Join A Girl's Best Friend</h1>
            <p>Start your personalized wellness journey today</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input"
                placeholder="Enter your full name"
                required
              />
            </div>

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

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input"
                  placeholder="Create a password"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth" className="form-label">Date of Birth (Optional)</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cycleLength" className="form-label">Cycle Length (days)</label>
                <select
                  id="cycleLength"
                  name="cycleLength"
                  value={formData.cycleLength}
                  onChange={handleChange}
                  className="input"
                >
                  {Array.from({ length: 15 }, (_, i) => i + 21).map(day => (
                    <option key={day} value={day}>{day} days</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="periodLength" className="form-label">Period Length (days)</label>
                <select
                  id="periodLength"
                  name="periodLength"
                  value={formData.periodLength}
                  onChange={handleChange}
                  className="input"
                >
                  {Array.from({ length: 6 }, (_, i) => i + 3).map(day => (
                    <option key={day} value={day}>{day} days</option>
                  ))}
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="auth-illustration">
          <div className="illustration-content">
            <h2>Welcome to Your Journey</h2>
            <p>Join thousands of women taking control of their menstrual health</p>
            <div className="illustration-features">
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <span>Smart Tracking</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🧠</span>
                <span>Educational Content</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💝</span>
                <span>Personalized Care</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;