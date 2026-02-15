const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const CycleData = require('../models/CycleData');
const MoodLog = require('../models/MoodLog');

// Get cycle analytics
router.get('/cycle', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get last 6 months of cycle data
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const cycleData = await CycleData.find({
      userId,
      lastPeriodDate: { $gte: sixMonthsAgo }
    }).sort({ lastPeriodDate: -1 });

    if (cycleData.length === 0) {
      return res.json({
        averageCycleLength: 0,
        cycleLengths: [],
        regularityScore: 0,
        totalCycles: 0
      });
    }

    // Calculate cycle lengths
    const cycleLengths = [];
    for (let i = 0; i < cycleData.length - 1; i++) {
      const current = new Date(cycleData[i].lastPeriodDate);
      const next = new Date(cycleData[i + 1].lastPeriodDate);
      const diffTime = Math.abs(current - next);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 0 && diffDays < 60) { // Valid cycle length
        cycleLengths.push(diffDays);
      }
    }

    // Calculate average cycle length
    const averageCycleLength = cycleLengths.length > 0 
      ? Math.round(cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length)
      : 28;

    // Calculate regularity score (how consistent cycles are)
    let regularityScore = 0;
    if (cycleLengths.length > 1) {
      const variance = cycleLengths.reduce((acc, length) => {
        return acc + Math.pow(length - averageCycleLength, 2);
      }, 0) / cycleLengths.length;
      
      const standardDeviation = Math.sqrt(variance);
      regularityScore = Math.max(0, Math.min(100, 100 - (standardDeviation * 10)));
    }

    res.json({
      averageCycleLength,
      cycleLengths,
      regularityScore: Math.round(regularityScore),
      totalCycles: cycleLengths.length,
      cycleHistory: cycleData.slice(0, 12).map(cycle => ({
        date: cycle.lastPeriodDate,
        cycleLength: cycle.cycleLength,
        periodDuration: cycle.periodDuration
      }))
    });

  } catch (error) {
    console.error('Analytics cycle error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get mood analytics
router.get('/mood', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get last 3 months of mood data
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    
    const moodData = await MoodLog.find({
      userId,
      date: { $gte: threeMonthsAgo }
    }).sort({ date: -1 });

    if (moodData.length === 0) {
      return res.json({
        moodDistribution: {},
        totalEntries: 0,
        averageMoodScore: 0,
        moodTrend: []
      });
    }

    // Calculate mood distribution
    const moodDistribution = {};
    const moodScores = {
      'happy': 5,
      'calm': 4,
      'neutral': 3,
      'sad': 2,
      'angry': 1,
      'anxious': 1,
      'tired': 2
    };

    let totalScore = 0;
    moodData.forEach(entry => {
      const mood = entry.mood.toLowerCase();
      moodDistribution[mood] = (moodDistribution[mood] || 0) + 1;
      totalScore += moodScores[mood] || 3;
    });

    // Calculate mood trend (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentMoods = moodData.filter(entry => 
      new Date(entry.date) >= thirtyDaysAgo
    );

    const moodTrend = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayMood = recentMoods.find(entry => 
        entry.date.toISOString().split('T')[0] === dateStr
      );
      
      moodTrend.push({
        date: dateStr,
        mood: dayMood ? dayMood.mood : null,
        score: dayMood ? (moodScores[dayMood.mood.toLowerCase()] || 3) : null
      });
    }

    const averageMoodScore = moodData.length > 0 
      ? (totalScore / moodData.length).toFixed(1)
      : 3;

    res.json({
      moodDistribution,
      totalEntries: moodData.length,
      averageMoodScore: parseFloat(averageMoodScore),
      moodTrend,
      recentMoods: moodData.slice(0, 10).map(entry => ({
        date: entry.date,
        mood: entry.mood,
        notes: entry.notes
      }))
    });

  } catch (error) {
    console.error('Analytics mood error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get combined insights
router.get('/insights', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get recent data for insights
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    const recentCycles = await CycleData.find({
      userId,
      lastPeriodDate: { $gte: oneMonthAgo }
    }).sort({ lastPeriodDate: -1 }).limit(3);

    const recentMoods = await MoodLog.find({
      userId,
      date: { $gte: oneMonthAgo }
    }).sort({ date: -1 });

    const insights = [];

    // Cycle insights
    if (recentCycles.length >= 2) {
      const latestCycle = recentCycles[0];
      const previousCycle = recentCycles[1];
      
      if (latestCycle.cycleLength > previousCycle.cycleLength + 3) {
        insights.push({
          type: 'cycle',
          message: 'Your cycle is getting longer. This is normal but track any unusual symptoms.',
          icon: '📅'
        });
      } else if (latestCycle.cycleLength < previousCycle.cycleLength - 3) {
        insights.push({
          type: 'cycle',
          message: 'Your cycle is getting shorter. Keep monitoring for patterns.',
          icon: '📅'
        });
      }
    }

    // Mood insights
    if (recentMoods.length > 7) {
      const happyMoods = recentMoods.filter(m => 
        ['happy', 'calm'].includes(m.mood.toLowerCase())
      ).length;
      
      const sadMoods = recentMoods.filter(m => 
        ['sad', 'angry', 'anxious'].includes(m.mood.toLowerCase())
      ).length;

      if (happyMoods > sadMoods * 2) {
        insights.push({
          type: 'mood',
          message: 'You\'ve been feeling great lately! Keep up the positive momentum.',
          icon: '😊'
        });
      } else if (sadMoods > happyMoods) {
        insights.push({
          type: 'mood',
          message: 'You\'ve had some tough days. Remember to practice self-care.',
          icon: '💝'
        });
      }
    }

    // Tracking consistency insight
    const totalDays = Math.ceil((new Date() - oneMonthAgo) / (1000 * 60 * 60 * 24));
    const trackingRate = (recentMoods.length / totalDays) * 100;
    
    if (trackingRate > 80) {
      insights.push({
        type: 'tracking',
        message: `Amazing! You've been tracking consistently (${Math.round(trackingRate)}% of days).`,
        icon: '🎯'
      });
    } else if (trackingRate < 30) {
      insights.push({
        type: 'tracking',
        message: 'Try to track your mood more regularly for better insights.',
        icon: '📝'
      });
    }

    res.json({ insights });

  } catch (error) {
    console.error('Analytics insights error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;