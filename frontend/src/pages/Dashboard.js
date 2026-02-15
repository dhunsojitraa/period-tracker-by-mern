import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [todayMood, setTodayMood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    fetchTodayMood();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/user/dashboard');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    }
  };

  const fetchTodayMood = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await api.get(`/mood?date=${today}`);
      if (response.data.moods && response.data.moods.length > 0) {
        setTodayMood(response.data.moods[0]);
      }
    } catch (error) {
      console.error('Error fetching today mood:', error);
    } finally {
      setLoading(false);
    }
  };

  // Test notification function
  const createTestNotification = async () => {
    try {
      await api.post('/notifications/test', {
        type: 'reminder',
        title: '🌸 Test Notification',
        message: 'This is a test notification! Your notification system is working perfectly.'
      });
      toast.success('Test notification created! Check the bell icon.');
    } catch (error) {
      console.error('Error creating test notification:', error);
      toast.error('Failed to create test notification');
    }
  };

  const getPhaseInfo = (phase) => {
    const phases = {
      menstrual: {
        name: 'Menstrual Phase',
        emoji: '🩸',
        color: '#e53e3e',
        description: 'Your period is here. Focus on rest and self-care.'
      },
      follicular: {
        name: 'Follicular Phase',
        emoji: '🌱',
        color: '#38a169',
        description: 'Energy is building. Great time for new activities.'
      },
      ovulation: {
        name: 'Ovulation Phase',
        emoji: '✨',
        color: '#d69e2e',
        description: 'Peak energy and fertility. You might feel most confident.'
      },
      luteal: {
        name: 'Luteal Phase',
        emoji: '🌙',
        color: '#805ad5',
        description: 'Winding down. Focus on comfort and preparation.'
      }
    };
    return phases[phase] || phases.follicular;
  };

  const getMoodEmoji = (mood) => {
    const moods = {
      happy: '😊',
      sad: '😢',
      angry: '😠',
      anxious: '😰',
      calm: '😌',
      tired: '😴',
      energetic: '⚡',
      stressed: '😵'
    };
    return moods[mood] || '😊';
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const cyclePredictions = dashboardData?.cyclePredictions;
  const currentPhase = cyclePredictions?.currentPhase;
  const phaseInfo = currentPhase ? getPhaseInfo(currentPhase) : null;

  return (
    <div className="dashboard">
      <div className="container">
        {/* Welcome Header */}
        <div className="dashboard-header">
          <div className="welcome-section">
            <h1>Welcome back, {user?.name}! 🌸</h1>
            <p>Here's your wellness overview for today</p>
          </div>
          <div className="quick-actions">
            <Link to="/period-tracker" className="btn btn-primary">
              Log Period
            </Link>
            <Link to="/mood-tracker" className="btn btn-outline">
              Track Mood
            </Link>
            <button onClick={createTestNotification} className="btn btn-secondary">
              Test Notification
            </button>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Cycle Overview Card */}
          <div className="dashboard-card cycle-overview">
            <div className="card-header">
              <h3>Cycle Overview</h3>
              {phaseInfo && (
                <div className="phase-badge" style={{ backgroundColor: phaseInfo.color }}>
                  {phaseInfo.emoji} {phaseInfo.name}
                </div>
              )}
            </div>
            
            {cyclePredictions ? (
              <div className="cycle-info">
                <div className="cycle-stats">
                  <div className="stat">
                    <div className="stat-number">{cyclePredictions.daysSinceLastPeriod}</div>
                    <div className="stat-label">Days since last period</div>
                  </div>
                  <div className="stat">
                    <div className="stat-number">
                      {cyclePredictions.daysUntilNextPeriod > 0 
                        ? cyclePredictions.daysUntilNextPeriod 
                        : 'Due'}
                    </div>
                    <div className="stat-label">Days until next period</div>
                  </div>
                </div>
                
                {phaseInfo && (
                  <div className="phase-description">
                    <p>{phaseInfo.description}</p>
                  </div>
                )}
                
                <div className="cycle-actions">
                  <Link to="/period-tracker" className="btn btn-secondary">
                    View Full Tracker
                  </Link>
                </div>
              </div>
            ) : (
              <div className="no-cycle-data">
                <p>Start tracking your cycle to see predictions and insights</p>
                <Link to="/period-tracker" className="btn btn-primary">
                  Log Your Last Period
                </Link>
              </div>
            )}
          </div>

          {/* Today's Mood Card */}
          <div className="dashboard-card mood-card">
            <div className="card-header">
              <h3>Today's Mood</h3>
            </div>
            
            {todayMood?.hasLoggedToday ? (
              <div className="mood-display">
                <div className="mood-emoji">
                  {getMoodEmoji(todayMood.todayMood.mood)}
                </div>
                <div className="mood-info">
                  <h4>{todayMood.todayMood.mood.charAt(0).toUpperCase() + todayMood.todayMood.mood.slice(1)}</h4>
                  <p>Intensity: {todayMood.todayMood.intensity}/5</p>
                  {todayMood.todayMood.notes && (
                    <p className="mood-notes">"{todayMood.todayMood.notes}"</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="no-mood-data">
                <p>How are you feeling today?</p>
                <Link to="/mood-tracker" className="btn btn-primary">
                  Log Your Mood
                </Link>
              </div>
            )}
          </div>

          {/* Quick Links Card */}
          <div className="dashboard-card quick-links">
            <div className="card-header">
              <h3>Quick Access</h3>
            </div>
            
            <div className="links-grid">
              <Link to="/cycle-phases" className="quick-link">
                <div className="link-icon">🌙</div>
                <div className="link-text">
                  <h4>Cycle Phases</h4>
                  <p>Learn about your cycle</p>
                </div>
              </Link>
              
              <Link to="/symptoms" className="quick-link">
                <div className="link-icon">💊</div>
                <div className="link-text">
                  <h4>Symptoms</h4>
                  <p>Find relief tips</p>
                </div>
              </Link>
              
              <Link to="/music-therapy" className="quick-link">
                <div className="link-icon">🎵</div>
                <div className="link-text">
                  <h4>Music Therapy</h4>
                  <p>Mood-based playlists</p>
                </div>
              </Link>
              
              <Link to="/fertility" className="quick-link">
                <div className="link-icon">🌱</div>
                <div className="link-text">
                  <h4>Fertility</h4>
                  <p>Educational content</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Wellness Tips Card */}
          <div className="dashboard-card wellness-tips">
            <div className="card-header">
              <h3>Today's Wellness Tip</h3>
            </div>
            
            <div className="tip-content">
              {phaseInfo ? (
                <>
                  <div className="tip-icon">{phaseInfo.emoji}</div>
                  <div className="tip-text">
                    <h4>Perfect for your {phaseInfo.name.toLowerCase()}</h4>
                    <p>
                      {currentPhase === 'menstrual' && "Stay hydrated and consider gentle yoga or meditation to ease discomfort."}
                      {currentPhase === 'follicular' && "Great time to start new projects! Your energy is naturally increasing."}
                      {currentPhase === 'ovulation' && "You're at your peak! Perfect time for important conversations and social activities."}
                      {currentPhase === 'luteal' && "Focus on self-care and prepare for your upcoming period with comfort foods and rest."}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="tip-icon">💝</div>
                  <div className="tip-text">
                    <h4>Welcome to your wellness journey!</h4>
                    <p>Start by logging your last period to get personalized insights and predictions.</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;