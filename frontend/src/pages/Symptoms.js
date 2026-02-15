import React from 'react';
import { Link } from 'react-router-dom';
import './Symptoms.css';

const Symptoms = () => {
  const symptoms = [
    {
      id: 'cramps',
      name: 'Menstrual Cramps',
      emoji: '🤕',
      description: 'Painful contractions in the lower abdomen and back',
      color: '#e53e3e',
      severity: 'Common',
      quickTip: 'Apply heat and try gentle stretching'
    },
    {
      id: 'fatigue',
      name: 'Fatigue',
      emoji: '😴',
      description: 'Feeling tired and low on energy',
      color: '#805ad5',
      severity: 'Very Common',
      quickTip: 'Prioritize sleep and gentle movement'
    },
    {
      id: 'bloating',
      name: 'Bloating',
      emoji: '🎈',
      description: 'Feeling of fullness and swelling in the abdomen',
      color: '#d69e2e',
      severity: 'Common',
      quickTip: 'Reduce sodium and stay hydrated'
    },
    {
      id: 'back-pain',
      name: 'Back Pain',
      emoji: '🔥',
      description: 'Lower back discomfort and tension',
      color: '#e53e3e',
      severity: 'Common',
      quickTip: 'Use heat therapy and gentle stretches'
    },
    {
      id: 'headache',
      name: 'Headaches',
      emoji: '🤯',
      description: 'Head pain often related to hormonal changes',
      color: '#f56565',
      severity: 'Moderate',
      quickTip: 'Stay hydrated and manage stress'
    },
    {
      id: 'mood-swings',
      name: 'Mood Swings',
      emoji: '🎭',
      description: 'Emotional ups and downs throughout the cycle',
      color: '#9f7aea',
      severity: 'Very Common',
      quickTip: 'Practice mindfulness and self-compassion'
    },
    {
      id: 'nausea',
      name: 'Nausea',
      emoji: '🤢',
      description: 'Feeling sick to your stomach',
      color: '#38a169',
      severity: 'Moderate',
      quickTip: 'Try ginger tea and small, frequent meals'
    },
    {
      id: 'breast-tenderness',
      name: 'Breast Tenderness',
      emoji: '💔',
      description: 'Soreness and sensitivity in the breasts',
      color: '#f8b4d9',
      severity: 'Common',
      quickTip: 'Wear supportive bras and avoid caffeine'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Very Common':
        return '#e53e3e';
      case 'Common':
        return '#d69e2e';
      case 'Moderate':
        return '#38a169';
      default:
        return '#718096';
    }
  };

  return (
    <div className="symptoms-page">
      <div className="container">
        <div className="symptoms-header">
          <h1>Period Symptoms & Relief</h1>
          <p>
            Understanding common menstrual symptoms and finding natural ways to manage them. 
            Click on any symptom to learn more about causes, remedies, and when to seek help.
          </p>
        </div>

        <div className="symptoms-grid">
          {symptoms.map((symptom) => (
            <Link
              key={symptom.id}
              to={`/symptoms/${symptom.id}`}
              className="symptom-card"
              style={{ borderColor: symptom.color }}
            >
              <div className="symptom-header">
                <div className="symptom-emoji">{symptom.emoji}</div>
                <div className="symptom-info">
                  <h3>{symptom.name}</h3>
                  <div 
                    className="severity-badge"
                    style={{ backgroundColor: getSeverityColor(symptom.severity) }}
                  >
                    {symptom.severity}
                  </div>
                </div>
              </div>
              
              <p className="symptom-description">{symptom.description}</p>
              
              <div className="quick-tip">
                <span className="tip-icon">💡</span>
                <span className="tip-text">{symptom.quickTip}</span>
              </div>
              
              <div className="card-footer">
                <span className="learn-more">Learn More →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* General Tips Section */}
        <div className="general-tips">
          <div className="tips-card">
            <h2>General Wellness Tips</h2>
            <div className="tips-grid">
              <div className="tip-item">
                <div className="tip-icon-large">🧘‍♀️</div>
                <h4>Stress Management</h4>
                <p>Practice meditation, deep breathing, or yoga to help manage stress and reduce symptom severity.</p>
              </div>
              
              <div className="tip-item">
                <div className="tip-icon-large">💧</div>
                <h4>Stay Hydrated</h4>
                <p>Drink plenty of water throughout your cycle to help reduce bloating and support overall health.</p>
              </div>
              
              <div className="tip-item">
                <div className="tip-icon-large">🥗</div>
                <h4>Balanced Nutrition</h4>
                <p>Eat nutrient-rich foods and consider supplements like magnesium and omega-3 fatty acids.</p>
              </div>
              
              <div className="tip-item">
                <div className="tip-icon-large">🏃‍♀️</div>
                <h4>Regular Exercise</h4>
                <p>Gentle exercise can help reduce cramps, improve mood, and boost energy levels.</p>
              </div>
              
              <div className="tip-item">
                <div className="tip-icon-large">😴</div>
                <h4>Quality Sleep</h4>
                <p>Aim for 7-9 hours of sleep per night to help your body recover and regulate hormones.</p>
              </div>
              
              <div className="tip-item">
                <div className="tip-icon-large">🌡️</div>
                <h4>Heat Therapy</h4>
                <p>Use heating pads, warm baths, or hot water bottles to relieve cramps and muscle tension.</p>
              </div>
            </div>
          </div>
        </div>

        {/* When to See a Doctor */}
        <div className="medical-advice">
          <div className="advice-card">
            <h2>When to Consult a Healthcare Provider</h2>
            <div className="warning-signs">
              <div className="warning-item">
                <span className="warning-icon">⚠️</span>
                <div>
                  <h4>Severe Pain</h4>
                  <p>Cramps that interfere with daily activities or don't respond to over-the-counter pain relief</p>
                </div>
              </div>
              
              <div className="warning-item">
                <span className="warning-icon">🩸</span>
                <div>
                  <h4>Heavy Bleeding</h4>
                  <p>Changing pads/tampons every hour, bleeding for more than 7 days, or passing large clots</p>
                </div>
              </div>
              
              <div className="warning-item">
                <span className="warning-icon">📅</span>
                <div>
                  <h4>Irregular Cycles</h4>
                  <p>Cycles shorter than 21 days or longer than 35 days, or missing periods for several months</p>
                </div>
              </div>
              
              <div className="warning-item">
                <span className="warning-icon">🤒</span>
                <div>
                  <h4>Unusual Symptoms</h4>
                  <p>Fever during menstruation, severe nausea/vomiting, or symptoms that worsen over time</p>
                </div>
              </div>
            </div>
            
            <div className="advice-footer">
              <p>
                <strong>Remember:</strong> Every woman's experience is different. Trust your body and don't hesitate 
                to seek medical advice if something doesn't feel right. Your healthcare provider can help determine 
                if your symptoms are normal or if further evaluation is needed.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="quick-links-section">
          <h2>Explore More</h2>
          <div className="quick-links-grid">
            <Link to="/cycle-phases" className="quick-link-card">
              <div className="link-icon">🌙</div>
              <h4>Cycle Phases</h4>
              <p>Learn about the four phases of your menstrual cycle</p>
            </Link>
            
            <Link to="/mood-tracker" className="quick-link-card">
              <div className="link-icon">😊</div>
              <h4>Mood Tracker</h4>
              <p>Track your emotions and discover patterns</p>
            </Link>
            
            <Link to="/music-therapy" className="quick-link-card">
              <div className="link-icon">🎵</div>
              <h4>Music Therapy</h4>
              <p>Curated playlists for different moods</p>
            </Link>
            
            <Link to="/fertility" className="quick-link-card">
              <div className="link-icon">🌱</div>
              <h4>Fertility Education</h4>
              <p>Understanding fertility and reproductive health</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Symptoms;