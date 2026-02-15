import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import api from '../services/api';
import toast from 'react-hot-toast';
import 'react-calendar/dist/Calendar.css';
import './PeriodTracker.css';

const PeriodTracker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [predictions, setPredictions] = useState(null);
  const [cycleHistory, setCycleHistory] = useState([]);
  const [showLogForm, setShowLogForm] = useState(false);
  const [formData, setFormData] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    flow: 'medium',
    symptoms: [],
    notes: ''
  });
  const [loading, setLoading] = useState(true);

  const symptoms = [
    'cramps', 'fatigue', 'bloating', 'back_pain', 
    'headache', 'mood_swings', 'nausea', 'breast_tenderness'
  ];

  const symptomLabels = {
    cramps: 'Cramps',
    fatigue: 'Fatigue',
    bloating: 'Bloating',
    back_pain: 'Back Pain',
    headache: 'Headache',
    mood_swings: 'Mood Swings',
    nausea: 'Nausea',
    breast_tenderness: 'Breast Tenderness'
  };

  useEffect(() => {
    fetchPredictions();
    fetchCycleHistory();
  }, []);

  const fetchPredictions = async () => {
    try {
      const response = await api.get('/cycle/predictions');
      setPredictions(response.data.predictions);
    } catch (error) {
      console.error('Error fetching predictions:', error);
    }
  };

  const fetchCycleHistory = async () => {
    try {
      const response = await api.get('/cycle/history');
      setCycleHistory(response.data.cycleHistory);
    } catch (error) {
      console.error('Error fetching cycle history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        symptoms: checked 
          ? [...prev.symptoms, value]
          : prev.symptoms.filter(s => s !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await api.post('/cycle/period', formData);
      toast.success('Period logged successfully!');
      
      // Reset form and refresh data
      setFormData({
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        flow: 'medium',
        symptoms: [],
        notes: ''
      });
      setShowLogForm(false);
      
      // Refresh predictions and history
      fetchPredictions();
      fetchCycleHistory();
    } catch (error) {
      console.error('Error logging period:', error);
      toast.error('Failed to log period');
    }
  };

  const getTileClassName = ({ date, view }) => {
    if (view !== 'month') return null;
    
    const classes = [];
    
    // Check if it's a period day from history
    const isPeriodDay = cycleHistory.some(cycle => {
      const startDate = new Date(cycle.startDate);
      const endDate = cycle.endDate ? new Date(cycle.endDate) : new Date(startDate.getTime() + (5 * 24 * 60 * 60 * 1000));
      return date >= startDate && date <= endDate;
    });
    
    if (isPeriodDay) {
      classes.push('period-day');
    }
    
    // Check predictions
    if (predictions) {
      const nextPeriod = new Date(predictions.nextPeriod);
      const ovulation = new Date(predictions.ovulationDate);
      const fertileStart = new Date(predictions.fertileWindowStart);
      const fertileEnd = new Date(predictions.fertileWindowEnd);
      
      if (date.toDateString() === nextPeriod.toDateString()) {
        classes.push('predicted-period');
      } else if (date.toDateString() === ovulation.toDateString()) {
        classes.push('ovulation-day');
      } else if (date >= fertileStart && date <= fertileEnd) {
        classes.push('fertile-day');
      }
    }
    
    return classes.join(' ');
  };

  const getTileContent = ({ date, view }) => {
    if (view !== 'month') return null;
    
    const classes = getTileClassName({ date, view });
    
    if (classes.includes('predicted-period')) {
      return <div className="tile-marker predicted">P</div>;
    } else if (classes.includes('ovulation-day')) {
      return <div className="tile-marker ovulation">O</div>;
    } else if (classes.includes('period-day')) {
      return <div className="tile-marker period">•</div>;
    }
    
    return null;
  };

  const getPhaseInfo = () => {
    if (!predictions) return null;
    
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
    
    return phases[predictions.currentPhase] || null;
  };

  if (loading) {
    return (
      <div className="period-tracker-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your cycle data...</p>
        </div>
      </div>
    );
  }

  const phaseInfo = getPhaseInfo();

  return (
    <div className="period-tracker">
      <div className="container">
        <div className="tracker-header">
          <h1>Period Tracker</h1>
          <p>Track your cycle and get personalized predictions</p>
          <button 
            onClick={() => setShowLogForm(true)}
            className="btn btn-primary"
          >
            Log Period
          </button>
        </div>

        <div className="tracker-grid">
          {/* Calendar Section */}
          <div className="calendar-section">
            <div className="card">
              <h3>Cycle Calendar</h3>
              <div className="calendar-container">
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  tileClassName={getTileClassName}
                  tileContent={getTileContent}
                />
                
                <div className="calendar-legend">
                  <div className="legend-item">
                    <div className="legend-color period-day"></div>
                    <span>Period Days</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color fertile-day"></div>
                    <span>Fertile Window</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color ovulation-day"></div>
                    <span>Ovulation</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color predicted-period"></div>
                    <span>Predicted Period</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Predictions Section */}
          <div className="predictions-section">
            {predictions ? (
              <div className="card">
                <h3>Cycle Predictions</h3>
                
                {phaseInfo && (
                  <div className="current-phase" style={{ borderColor: phaseInfo.color }}>
                    <div className="phase-header">
                      <span className="phase-emoji">{phaseInfo.emoji}</span>
                      <div>
                        <h4>{phaseInfo.name}</h4>
                        <p>{phaseInfo.description}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="predictions-grid">
                  <div className="prediction-item">
                    <div className="prediction-number">{predictions.daysSinceLastPeriod}</div>
                    <div className="prediction-label">Days since last period</div>
                  </div>
                  
                  <div className="prediction-item">
                    <div className="prediction-number">
                      {Math.max(0, Math.ceil((new Date(predictions.nextPeriod) - new Date()) / (1000 * 60 * 60 * 24)))}
                    </div>
                    <div className="prediction-label">Days until next period</div>
                  </div>
                  
                  <div className="prediction-item">
                    <div className="prediction-date">
                      {new Date(predictions.nextPeriod).toLocaleDateString()}
                    </div>
                    <div className="prediction-label">Next period date</div>
                  </div>
                  
                  <div className="prediction-item">
                    <div className="prediction-date">
                      {new Date(predictions.ovulationDate).toLocaleDateString()}
                    </div>
                    <div className="prediction-label">Ovulation date</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card no-predictions">
                <h3>No Predictions Yet</h3>
                <p>Log your last period to start getting cycle predictions and insights.</p>
                <button 
                  onClick={() => setShowLogForm(true)}
                  className="btn btn-primary"
                >
                  Log Your Last Period
                </button>
              </div>
            )}
          </div>

          {/* Cycle History */}
          <div className="history-section">
            <div className="card">
              <h3>Recent Cycles</h3>
              {cycleHistory.length > 0 ? (
                <div className="history-list">
                  {cycleHistory.slice(0, 5).map((cycle, index) => (
                    <div key={cycle._id} className="history-item">
                      <div className="history-date">
                        <strong>{new Date(cycle.startDate).toLocaleDateString()}</strong>
                        {cycle.endDate && (
                          <span> - {new Date(cycle.endDate).toLocaleDateString()}</span>
                        )}
                      </div>
                      <div className="history-details">
                        <span className="flow-badge flow-{cycle.flow}">{cycle.flow} flow</span>
                        {cycle.symptoms.length > 0 && (
                          <div className="symptoms-list">
                            {cycle.symptoms.map(symptom => (
                              <span key={symptom} className="symptom-tag">
                                {symptomLabels[symptom]}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-history">No cycle history yet. Start logging your periods!</p>
              )}
            </div>
          </div>
        </div>

        {/* Log Period Modal */}
        {showLogForm && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>Log Period</h3>
                <button 
                  onClick={() => setShowLogForm(false)}
                  className="close-btn"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="log-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">End Date (Optional)</label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="input"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Flow Intensity</label>
                  <select
                    name="flow"
                    value={formData.flow}
                    onChange={handleInputChange}
                    className="input"
                  >
                    <option value="light">Light</option>
                    <option value="medium">Medium</option>
                    <option value="heavy">Heavy</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Symptoms</label>
                  <div className="symptoms-grid">
                    {symptoms.map(symptom => (
                      <label key={symptom} className="checkbox-label">
                        <input
                          type="checkbox"
                          value={symptom}
                          checked={formData.symptoms.includes(symptom)}
                          onChange={handleInputChange}
                        />
                        <span>{symptomLabels[symptom]}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Notes (Optional)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="input"
                    rows="3"
                    placeholder="Any additional notes about this cycle..."
                  />
                </div>
                
                <div className="form-actions">
                  <button 
                    type="button" 
                    onClick={() => setShowLogForm(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Log Period
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeriodTracker;