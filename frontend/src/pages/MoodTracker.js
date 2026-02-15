import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import api from '../services/api';
import toast from 'react-hot-toast';
import './MoodTracker.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [intensity, setIntensity] = useState(3);
  const [notes, setNotes] = useState('');
  const [triggers, setTriggers] = useState([]);
  const [newTrigger, setNewTrigger] = useState('');
  const [todayMood, setTodayMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [moodStats, setMoodStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const moods = [
    { name: 'happy', emoji: '😊', color: '#f6e05e' },
    { name: 'sad', emoji: '😢', color: '#63b3ed' },
    { name: 'angry', emoji: '😠', color: '#fc8181' },
    { name: 'anxious', emoji: '😰', color: '#a78bfa' },
    { name: 'calm', emoji: '😌', color: '#68d391' },
    { name: 'tired', emoji: '😴', color: '#a0aec0' },
    { name: 'energetic', emoji: '⚡', color: '#fbb6ce' },
    { name: 'stressed', emoji: '😵', color: '#f687b3' }
  ];

  const commonTriggers = [
    'Work stress', 'Relationship issues', 'Health concerns', 'Financial worries',
    'Family problems', 'Sleep issues', 'Exercise', 'Social events',
    'Weather changes', 'Hormonal changes', 'Diet changes', 'Travel'
  ];

  useEffect(() => {
    fetchTodayMood();
    fetchMoodHistory();
  }, []);

  const fetchTodayMood = async () => {
    try {
      const response = await api.get('/mood/today');
      setTodayMood(response.data);
      
      if (response.data.hasLoggedToday) {
        const mood = response.data.todayMood;
        setSelectedMood(mood.mood);
        setIntensity(mood.intensity);
        setNotes(mood.notes || '');
        setTriggers(mood.triggers || []);
      }
    } catch (error) {
      console.error('Error fetching today mood:', error);
    }
  };

  const fetchMoodHistory = async () => {
    try {
      const response = await api.get('/mood/history?days=30');
      setMoodHistory(response.data.moodHistory);
      setMoodStats(response.data.statistics);
    } catch (error) {
      console.error('Error fetching mood history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const handleAddTrigger = (trigger) => {
    if (!triggers.includes(trigger)) {
      setTriggers([...triggers, trigger]);
    }
  };

  const handleRemoveTrigger = (trigger) => {
    setTriggers(triggers.filter(t => t !== trigger));
  };

  const handleCustomTrigger = () => {
    if (newTrigger.trim() && !triggers.includes(newTrigger.trim())) {
      setTriggers([...triggers, newTrigger.trim()]);
      setNewTrigger('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedMood) {
      toast.error('Please select a mood');
      return;
    }

    try {
      const moodData = {
        mood: selectedMood,
        intensity,
        notes: notes.trim(),
        triggers
      };

      await api.post('/mood/log', moodData);
      
      if (todayMood?.hasLoggedToday) {
        toast.success('Mood updated successfully!');
      } else {
        toast.success('Mood logged successfully!');
      }
      
      // Refresh data
      fetchTodayMood();
      fetchMoodHistory();
    } catch (error) {
      console.error('Error logging mood:', error);
      toast.error('Failed to log mood');
    }
  };

  const getMoodEmoji = (moodName) => {
    const mood = moods.find(m => m.name === moodName);
    return mood ? mood.emoji : '😊';
  };

  const getMoodColor = (moodName) => {
    const mood = moods.find(m => m.name === moodName);
    return mood ? mood.color : '#f8b4d9';
  };

  const getChartData = () => {
    const last7Days = moodHistory.slice(0, 7).reverse();
    
    return {
      labels: last7Days.map(entry => 
        new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      ),
      datasets: [
        {
          label: 'Mood Intensity',
          data: last7Days.map(entry => entry.intensity),
          borderColor: '#f8b4d9',
          backgroundColor: 'rgba(248, 180, 217, 0.1)',
          borderWidth: 3,
          pointBackgroundColor: last7Days.map(entry => getMoodColor(entry.mood)),
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 8,
          tension: 0.4,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Mood Intensity Over Last 7 Days',
        font: {
          size: 16,
          weight: 'bold',
        },
        color: '#2d3748',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: function(value) {
            const labels = ['', 'Very Low', 'Low', 'Medium', 'High', 'Very High'];
            return labels[value];
          },
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="mood-tracker-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your mood data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mood-tracker">
      <div className="container">
        <div className="tracker-header">
          <h1>Mood Tracker</h1>
          <p>Track your daily emotions and discover patterns</p>
        </div>

        <div className="mood-grid">
          {/* Mood Logging Form */}
          <div className="mood-form-section">
            <div className="card">
              <h3>
                {todayMood?.hasLoggedToday ? 'Update Today\'s Mood' : 'How are you feeling today?'}
              </h3>
              
              <form onSubmit={handleSubmit}>
                {/* Mood Selection */}
                <div className="mood-selection">
                  <label className="form-label">Select your mood:</label>
                  <div className="mood-grid-selector">
                    {moods.map((mood) => (
                      <button
                        key={mood.name}
                        type="button"
                        className={`mood-button ${selectedMood === mood.name ? 'selected' : ''}`}
                        onClick={() => handleMoodSelect(mood.name)}
                        style={{
                          backgroundColor: selectedMood === mood.name ? mood.color : 'transparent',
                          borderColor: mood.color
                        }}
                      >
                        <span className="mood-emoji">{mood.emoji}</span>
                        <span className="mood-name">{mood.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Intensity Slider */}
                {selectedMood && (
                  <div className="intensity-section">
                    <label className="form-label">
                      Intensity: {intensity}/5
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={intensity}
                      onChange={(e) => setIntensity(parseInt(e.target.value))}
                      className="intensity-slider"
                      style={{ accentColor: getMoodColor(selectedMood) }}
                    />
                    <div className="intensity-labels">
                      <span>Very Low</span>
                      <span>Low</span>
                      <span>Medium</span>
                      <span>High</span>
                      <span>Very High</span>
                    </div>
                  </div>
                )}

                {/* Triggers Section */}
                <div className="triggers-section">
                  <label className="form-label">What might have influenced your mood?</label>
                  
                  <div className="common-triggers">
                    {commonTriggers.map((trigger) => (
                      <button
                        key={trigger}
                        type="button"
                        className={`trigger-tag ${triggers.includes(trigger) ? 'selected' : ''}`}
                        onClick={() => 
                          triggers.includes(trigger) 
                            ? handleRemoveTrigger(trigger)
                            : handleAddTrigger(trigger)
                        }
                      >
                        {trigger}
                      </button>
                    ))}
                  </div>

                  <div className="custom-trigger">
                    <input
                      type="text"
                      value={newTrigger}
                      onChange={(e) => setNewTrigger(e.target.value)}
                      placeholder="Add custom trigger..."
                      className="input"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleCustomTrigger())}
                    />
                    <button
                      type="button"
                      onClick={handleCustomTrigger}
                      className="btn btn-secondary"
                    >
                      Add
                    </button>
                  </div>

                  {triggers.length > 0 && (
                    <div className="selected-triggers">
                      <p>Selected triggers:</p>
                      <div className="trigger-list">
                        {triggers.map((trigger) => (
                          <span key={trigger} className="selected-trigger">
                            {trigger}
                            <button
                              type="button"
                              onClick={() => handleRemoveTrigger(trigger)}
                              className="remove-trigger"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Notes */}
                <div className="form-group">
                  <label className="form-label">Notes (Optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any additional thoughts about your mood today..."
                    className="input"
                    rows="3"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  {todayMood?.hasLoggedToday ? 'Update Mood' : 'Log Mood'}
                </button>
              </form>
            </div>
          </div>

          {/* Mood Chart */}
          <div className="mood-chart-section">
            <div className="card">
              <h3>Mood Trends</h3>
              {moodHistory.length > 0 ? (
                <div className="chart-container">
                  <Line data={getChartData()} options={chartOptions} />
                </div>
              ) : (
                <div className="no-data">
                  <p>Start logging your moods to see trends and patterns!</p>
                </div>
              )}
            </div>
          </div>

          {/* Mood Statistics */}
          <div className="mood-stats-section">
            <div className="card">
              <h3>Mood Statistics (Last 30 Days)</h3>
              {moodStats.length > 0 ? (
                <div className="stats-list">
                  {moodStats.map((stat) => (
                    <div key={stat._id} className="stat-item">
                      <div className="stat-mood">
                        <span className="stat-emoji">{getMoodEmoji(stat._id)}</span>
                        <span className="stat-name">{stat._id}</span>
                      </div>
                      <div className="stat-details">
                        <div className="stat-count">{stat.count} times</div>
                        <div className="stat-avg">Avg: {stat.avgIntensity.toFixed(1)}/5</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-data">
                  <p>No mood data available yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Moods */}
          <div className="recent-moods-section">
            <div className="card">
              <h3>Recent Moods</h3>
              {moodHistory.length > 0 ? (
                <div className="recent-list">
                  {moodHistory.slice(0, 7).map((entry) => (
                    <div key={entry._id} className="recent-item">
                      <div className="recent-date">
                        {new Date(entry.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="recent-mood">
                        <span className="recent-emoji">{getMoodEmoji(entry.mood)}</span>
                        <span className="recent-name">{entry.mood}</span>
                        <span className="recent-intensity">{entry.intensity}/5</span>
                      </div>
                      {entry.notes && (
                        <div className="recent-notes">"{entry.notes}"</div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-data">
                  <p>No mood history available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;