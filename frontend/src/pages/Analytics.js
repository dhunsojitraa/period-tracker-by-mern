import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import './Analytics.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = () => {
  const { user } = useAuth();
  const [cycleData, setCycleData] = useState(null);
  const [moodData, setMoodData] = useState(null);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const [cycleResponse, moodResponse, insightsResponse] = await Promise.all([
        api.get('/analytics/cycle'),
        api.get('/analytics/mood'),
        api.get('/analytics/insights')
      ]);

      setCycleData(cycleResponse.data);
      setMoodData(moodResponse.data);
      setInsights(insightsResponse.data.insights);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMoodChartData = () => {
    if (!moodData || !moodData.moodDistribution) return null;

    const moods = Object.keys(moodData.moodDistribution);
    const counts = Object.values(moodData.moodDistribution);

    return {
      labels: moods.map(mood => mood.charAt(0).toUpperCase() + mood.slice(1)),
      datasets: [
        {
          data: counts,
          backgroundColor: [
            '#FFB6C1', // Light Pink
            '#DDA0DD', // Plum
            '#98FB98', // Pale Green
            '#87CEEB', // Sky Blue
            '#F0E68C', // Khaki
            '#FFA07A', // Light Salmon
            '#D3D3D3', // Light Gray
          ],
          borderWidth: 2,
          borderColor: '#fff',
        },
      ],
    };
  };

  const getCycleTrendData = () => {
    if (!cycleData || !cycleData.cycleHistory) return null;

    const last6Cycles = cycleData.cycleHistory.slice(0, 6).reverse();
    
    return {
      labels: last6Cycles.map((_, index) => `Cycle ${index + 1}`),
      datasets: [
        {
          label: 'Cycle Length (days)',
          data: last6Cycles.map(cycle => cycle.cycleLength),
          borderColor: '#FF69B4',
          backgroundColor: 'rgba(255, 105, 180, 0.1)',
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Period Duration (days)',
          data: last6Cycles.map(cycle => cycle.periodDuration),
          borderColor: '#DDA0DD',
          backgroundColor: 'rgba(221, 160, 221, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    };
  };

  const getMoodTrendData = () => {
    if (!moodData || !moodData.moodTrend) return null;

    const last14Days = moodData.moodTrend.slice(-14);
    
    return {
      labels: last14Days.map(day => {
        const date = new Date(day.date);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }),
      datasets: [
        {
          label: 'Mood Score',
          data: last14Days.map(day => day.score),
          borderColor: '#32CD32',
          backgroundColor: 'rgba(50, 205, 50, 0.1)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#32CD32',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
        },
      ],
    };
  };

  if (loading) {
    return (
      <div className="analytics-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Analyzing your data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h1>📊 Your Health Analytics</h1>
        <p>Insights from your tracking journey</p>
      </div>

      {/* Tab Navigation */}
      <div className="analytics-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'cycle' ? 'active' : ''}`}
          onClick={() => setActiveTab('cycle')}
        >
          Cycle Analysis
        </button>
        <button 
          className={`tab ${activeTab === 'mood' ? 'active' : ''}`}
          onClick={() => setActiveTab('mood')}
        >
          Mood Patterns
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="tab-content">
          {/* Key Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-info">
                <h3>{cycleData?.averageCycleLength || 0}</h3>
                <p>Average Cycle Length</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-info">
                <h3>{cycleData?.regularityScore || 0}%</h3>
                <p>Cycle Regularity</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">😊</div>
              <div className="stat-info">
                <h3>{moodData?.averageMoodScore || 0}</h3>
                <p>Average Mood Score</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-info">
                <h3>{moodData?.totalEntries || 0}</h3>
                <p>Mood Entries</p>
              </div>
            </div>
          </div>

          {/* Insights */}
          {insights.length > 0 && (
            <div className="insights-section">
              <h2>💡 Personal Insights</h2>
              <div className="insights-grid">
                {insights.map((insight, index) => (
                  <div key={index} className="insight-card">
                    <span className="insight-icon">{insight.icon}</span>
                    <p>{insight.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Cycle Analysis Tab */}
      {activeTab === 'cycle' && (
        <div className="tab-content">
          <div className="charts-grid">
            <div className="chart-card">
              <h3>Cycle Trends (Last 6 Cycles)</h3>
              {getCycleTrendData() && (
                <Line 
                  data={getCycleTrendData()} 
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 40,
                      },
                    },
                  }}
                />
              )}
            </div>
            
            <div className="cycle-summary">
              <h3>Cycle Summary</h3>
              <div className="summary-stats">
                <div className="summary-item">
                  <span className="label">Total Cycles Tracked:</span>
                  <span className="value">{cycleData?.totalCycles || 0}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Shortest Cycle:</span>
                  <span className="value">
                    {cycleData?.cycleLengths?.length > 0 
                      ? Math.min(...cycleData.cycleLengths) + ' days'
                      : 'N/A'
                    }
                  </span>
                </div>
                <div className="summary-item">
                  <span className="label">Longest Cycle:</span>
                  <span className="value">
                    {cycleData?.cycleLengths?.length > 0 
                      ? Math.max(...cycleData.cycleLengths) + ' days'
                      : 'N/A'
                    }
                  </span>
                </div>
                <div className="summary-item">
                  <span className="label">Regularity Score:</span>
                  <span className={`value ${
                    cycleData?.regularityScore >= 80 ? 'good' : 
                    cycleData?.regularityScore >= 60 ? 'okay' : 'needs-attention'
                  }`}>
                    {cycleData?.regularityScore || 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mood Patterns Tab */}
      {activeTab === 'mood' && (
        <div className="tab-content">
          <div className="charts-grid">
            <div className="chart-card">
              <h3>Mood Distribution (Last 3 Months)</h3>
              {getMoodChartData() && (
                <Doughnut 
                  data={getMoodChartData()} 
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                    },
                  }}
                />
              )}
            </div>
            
            <div className="chart-card">
              <h3>Mood Trend (Last 2 Weeks)</h3>
              {getMoodTrendData() && (
                <Line 
                  data={getMoodTrendData()} 
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 5,
                        ticks: {
                          stepSize: 1,
                          callback: function(value) {
                            const labels = ['', 'Low', 'Fair', 'Good', 'Great', 'Excellent'];
                            return labels[value] || value;
                          }
                        }
                      },
                    },
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;