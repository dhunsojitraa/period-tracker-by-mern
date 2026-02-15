import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';
import './Profile.css';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [twoFactorStatus, setTwoFactorStatus] = useState({
    enabled: false,
    backupCodesRemaining: 0
  });
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    dateOfBirth: ''
  });
  
  const [cycleData, setCycleData] = useState({
    cycleLength: 28,
    periodLength: 5,
    lastPeriodDate: ''
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split('T')[0] : ''
      });
      
      setCycleData({
        cycleLength: user.cycleLength || 28,
        periodLength: user.periodLength || 5,
        lastPeriodDate: user.lastPeriodDate ? user.lastPeriodDate.split('T')[0] : ''
      });

      // Fetch 2FA status
      fetch2FAStatus();
    }
  }, [user]);

  const fetch2FAStatus = async () => {
    try {
      const response = await api.get('/2fa/status');
      setTwoFactorStatus(response.data);
    } catch (error) {
      console.error('Error fetching 2FA status:', error);
    }
  };

  const handleEnable2FA = () => {
    navigate('/2fa-setup');
  };

  const handleDisable2FA = async () => {
    const password = prompt('Enter your password to disable 2FA:');
    if (!password) return;

    try {
      setLoading(true);
      await api.post('/2fa/disable', { password });
      toast.success('2FA disabled successfully');
      fetch2FAStatus();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to disable 2FA');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleCycleChange = (e) => {
    setCycleData({
      ...cycleData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.put('/user/profile', profileData);
      updateUser(response.data.user);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCycleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.put('/user/cycle-preferences', cycleData);
      updateUser(response.data.cyclePreferences);
      toast.success('Cycle preferences updated successfully!');
    } catch (error) {
      console.error('Error updating cycle preferences:', error);
      toast.error(error.response?.data?.message || 'Failed to update cycle preferences');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
          <div className="profile-info">
            <h1>Hello, {user?.name}!</h1>
            <p>Manage your profile and preferences</p>
          </div>
        </div>

        <div className="profile-content">
          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button
              className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <span className="tab-icon">👤</span>
              Personal Info
            </button>
            <button
              className={`tab-btn ${activeTab === 'cycle' ? 'active' : ''}`}
              onClick={() => setActiveTab('cycle')}
            >
              <span className="tab-icon">🌙</span>
              Cycle Settings
            </button>
            <button
              className={`tab-btn ${activeTab === 'privacy' ? 'active' : ''}`}
              onClick={() => setActiveTab('privacy')}
            >
              <span className="tab-icon">🔒</span>
              Privacy & Security
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="tab-panel">
                <div className="panel-header">
                  <h2>Personal Information</h2>
                  <p>Update your basic profile information</p>
                </div>

                <form onSubmit={handleProfileSubmit} className="profile-form">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      className="input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      className="input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="dateOfBirth" className="form-label">Date of Birth (Optional)</label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={profileData.dateOfBirth}
                      onChange={handleProfileChange}
                      className="input"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Profile'}
                  </button>
                </form>
              </div>
            )}

            {/* Cycle Settings Tab */}
            {activeTab === 'cycle' && (
              <div className="tab-panel">
                <div className="panel-header">
                  <h2>Cycle Preferences</h2>
                  <p>Customize your cycle tracking settings for more accurate predictions</p>
                </div>

                <form onSubmit={handleCycleSubmit} className="cycle-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="cycleLength" className="form-label">
                        Average Cycle Length
                        <span className="form-help">Days from first day of period to first day of next period</span>
                      </label>
                      <select
                        id="cycleLength"
                        name="cycleLength"
                        value={cycleData.cycleLength}
                        onChange={handleCycleChange}
                        className="input"
                      >
                        {Array.from({ length: 15 }, (_, i) => i + 21).map(day => (
                          <option key={day} value={day}>{day} days</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="periodLength" className="form-label">
                        Average Period Length
                        <span className="form-help">Number of days your period typically lasts</span>
                      </label>
                      <select
                        id="periodLength"
                        name="periodLength"
                        value={cycleData.periodLength}
                        onChange={handleCycleChange}
                        className="input"
                      >
                        {Array.from({ length: 6 }, (_, i) => i + 3).map(day => (
                          <option key={day} value={day}>{day} days</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastPeriodDate" className="form-label">
                      Last Period Start Date
                      <span className="form-help">When did your last period start?</span>
                    </label>
                    <input
                      type="date"
                      id="lastPeriodDate"
                      name="lastPeriodDate"
                      value={cycleData.lastPeriodDate}
                      onChange={handleCycleChange}
                      className="input"
                    />
                  </div>

                  <div className="cycle-info-card">
                    <h4>Why This Matters</h4>
                    <ul>
                      <li>More accurate period predictions</li>
                      <li>Better cycle phase identification</li>
                      <li>Personalized health insights</li>
                      <li>Improved symptom tracking</li>
                    </ul>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Cycle Settings'}
                  </button>
                </form>
              </div>
            )}

            {/* Privacy & Security Tab */}
            {activeTab === 'privacy' && (
              <div className="tab-panel">
                <div className="panel-header">
                  <h2>Privacy & Security</h2>
                  <p>Your data privacy and security settings</p>
                </div>

                <div className="privacy-sections">
                  <div className="privacy-card">
                    <div className="privacy-header">
                      <h3>Data Privacy</h3>
                      <span className="privacy-status secure">Secure</span>
                    </div>
                    <div className="privacy-content">
                      <div className="privacy-item">
                        <div className="privacy-icon">🔒</div>
                        <div className="privacy-text">
                          <h4>Encrypted Data</h4>
                          <p>All your personal health data is encrypted and stored securely</p>
                        </div>
                      </div>
                      
                      <div className="privacy-item">
                        <div className="privacy-icon">🚫</div>
                        <div className="privacy-text">
                          <h4>No Third-Party Sharing</h4>
                          <p>We never share your personal data with third parties</p>
                        </div>
                      </div>
                      
                      <div className="privacy-item">
                        <div className="privacy-icon">👤</div>
                        <div className="privacy-text">
                          <h4>Anonymous Analytics</h4>
                          <p>Only anonymized data is used to improve our services</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="privacy-card">
                    <div className="privacy-header">
                      <h3>Account Security</h3>
                      <span className="privacy-status secure">Protected</span>
                    </div>
                    <div className="privacy-content">
                      <div className="privacy-item">
                        <div className="privacy-icon">🔐</div>
                        <div className="privacy-text">
                          <h4>Two-Factor Authentication</h4>
                          <p>
                            {twoFactorStatus.enabled 
                              ? `2FA is enabled. ${twoFactorStatus.backupCodesRemaining} backup codes remaining.`
                              : 'Add an extra layer of security to your account'
                            }
                          </p>
                          {twoFactorStatus.enabled ? (
                            <button 
                              className="btn btn-outline btn-sm"
                              onClick={handleDisable2FA}
                              disabled={loading}
                            >
                              Disable 2FA
                            </button>
                          ) : (
                            <button 
                              className="btn btn-primary btn-sm"
                              onClick={handleEnable2FA}
                            >
                              Enable 2FA
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="privacy-item">
                        <div className="privacy-icon">🔑</div>
                        <div className="privacy-text">
                          <h4>Secure Authentication</h4>
                          <p>Your account is protected with industry-standard security</p>
                        </div>
                      </div>
                      
                      <div className="privacy-item">
                        <div className="privacy-icon">🛡️</div>
                        <div className="privacy-text">
                          <h4>Password Protection</h4>
                          <p>Passwords are hashed and salted for maximum security</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="privacy-card">
                    <div className="privacy-header">
                      <h3>Data Control</h3>
                    </div>
                    <div className="privacy-content">
                      <div className="data-control-buttons">
                        <button className="btn btn-secondary">
                          Download My Data
                        </button>
                        <button className="btn btn-outline">
                          Delete Account
                        </button>
                      </div>
                      <p className="data-control-note">
                        You have full control over your data. You can download all your information 
                        or permanently delete your account at any time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;