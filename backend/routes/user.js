const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

router.put('/profile', [
  auth,
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').optional().isEmail().withMessage('Please enter a valid email'),
  body('dateOfBirth').optional().isISO8601().withMessage('Please provide a valid date of birth')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { name, email, dateOfBirth } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (dateOfBirth) updateData.dateOfBirth = dateOfBirth;
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: req.user._id } });
      if (existingUser) return res.status(400).json({ message: 'Email is already taken' });
    }
    const user = await User.findByIdAndUpdate(req.user._id, updateData, { new: true }).select('-password');
    res.json({
      message: 'Profile updated successfully',
      user: { id: user._id, name: user.name, email: user.email, dateOfBirth: user.dateOfBirth, cycleLength: user.cycleLength, periodLength: user.periodLength, lastPeriodDate: user.lastPeriodDate }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error while updating profile' });
  }
});

router.put('/cycle-preferences', [
  auth,
  body('cycleLength').optional().isInt({ min: 21, max: 35 }).withMessage('Cycle length must be between 21-35 days'),
  body('periodLength').optional().isInt({ min: 3, max: 8 }).withMessage('Period length must be between 3-8 days'),
  body('lastPeriodDate').optional().isISO8601().withMessage('Please provide a valid last period date')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { cycleLength, periodLength, lastPeriodDate } = req.body;
    const updateData = {};
    if (cycleLength) updateData.cycleLength = cycleLength;
    if (periodLength) updateData.periodLength = periodLength;
    if (lastPeriodDate) updateData.lastPeriodDate = lastPeriodDate;
    const user = await User.findByIdAndUpdate(req.user._id, updateData, { new: true }).select('-password');
    res.json({ message: 'Cycle preferences updated successfully', cyclePreferences: { cycleLength: user.cycleLength, periodLength: user.periodLength, lastPeriodDate: user.lastPeriodDate } });
  } catch (error) {
    console.error('Update cycle preferences error:', error);
    res.status(500).json({ message: 'Server error while updating cycle preferences' });
  }
});

router.get('/dashboard', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    let cyclePredictions = null;
    if (user.lastPeriodDate) {
      const lastPeriod = new Date(user.lastPeriodDate);
      const today = new Date();
      const daysSinceLastPeriod = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24));
      const nextPeriod = new Date(lastPeriod);
      nextPeriod.setDate(lastPeriod.getDate() + user.cycleLength);
      const daysUntilNextPeriod = Math.floor((nextPeriod - today) / (1000 * 60 * 60 * 24));
      let currentPhase;
      if (daysSinceLastPeriod <= user.periodLength) currentPhase = 'menstrual';
      else if (daysSinceLastPeriod <= Math.floor(user.cycleLength / 2) - 2) currentPhase = 'follicular';
      else if (daysSinceLastPeriod <= Math.floor(user.cycleLength / 2) + 2) currentPhase = 'ovulation';
      else currentPhase = 'luteal';
      cyclePredictions = { daysSinceLastPeriod, daysUntilNextPeriod, nextPeriodDate: nextPeriod, currentPhase };
    }
    res.json({
      user: { name: user.name, email: user.email, cycleLength: user.cycleLength, periodLength: user.periodLength, lastPeriodDate: user.lastPeriodDate },
      cyclePredictions
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ message: 'Server error while getting dashboard data' });
  }
});

router.get('/health-score', auth, async (req, res) => {
  try {
    const CycleData = require('../models/CycleData');
    const MoodLog = require('../models/MoodLog');
    const user = await User.findById(req.user._id).select('-password');
    const today = new Date();
    const weekAgo = new Date(); weekAgo.setDate(today.getDate() - 7);
    const weekMoods = await MoodLog.find({ userId: user._id, date: { $gte: weekAgo } });
    const cycles = await CycleData.find({ userId: user._id }).sort({ startDate: -1 }).limit(4);
    let score = 0;
    let breakdown = {};
    let cycleScore = 0;
    if (cycles.length >= 2) {
      const gaps = [];
      for (let i = 0; i < cycles.length - 1; i++) {
        const gap = Math.round((new Date(cycles[i].startDate) - new Date(cycles[i+1].startDate)) / (1000*60*60*24));
        if (gap >= 21 && gap <= 35) gaps.push(gap);
      }
      if (gaps.length > 0) {
        const avg = gaps.reduce((a,b) => a+b, 0) / gaps.length;
        const variance = gaps.reduce((a,b) => a + Math.pow(b-avg,2), 0) / gaps.length;
        cycleScore = Math.max(0, 30 - Math.round(Math.sqrt(variance) * 3));
      }
    } else if (cycles.length === 1) cycleScore = 15;
    breakdown.cycleRegularity = { score: cycleScore, max: 30 };
    score += cycleScore;
    const moodScoreMap = { happy: 5, energetic: 5, calm: 4, tired: 2, sad: 1, anxious: 1, angry: 1, stressed: 1 };
    let moodScore = 0;
    if (weekMoods.length >= 5) {
      const avg = weekMoods.reduce((s, m) => s + (moodScoreMap[m.mood] || 3), 0) / weekMoods.length;
      moodScore = Math.round((avg / 5) * 30);
    } else if (weekMoods.length > 0) {
      const avg = weekMoods.reduce((s, m) => s + (moodScoreMap[m.mood] || 3), 0) / weekMoods.length;
      moodScore = Math.round((avg / 5) * 20);
    }
    breakdown.moodConsistency = { score: moodScore, max: 30 };
    score += moodScore;
    const trackingScore = Math.min(40, weekMoods.length * 5 + (cycles.length > 0 ? 10 : 0));
    breakdown.trackingConsistency = { score: trackingScore, max: 40 };
    score += trackingScore;
    const moodCounts = {};
    weekMoods.forEach(m => { moodCounts[m.mood] = (moodCounts[m.mood] || 0) + 1; });
    const topMood = Object.keys(moodCounts).sort((a,b) => moodCounts[b]-moodCounts[a])[0] || null;
    let currentPhase = null;
    if (user.lastPeriodDate) {
      const daysSince = Math.floor((today - new Date(user.lastPeriodDate)) / (1000*60*60*24));
      const c = user.cycleLength || 28;
      if (daysSince <= (user.periodLength || 5)) currentPhase = 'Menstrual';
      else if (daysSince <= Math.floor(c/2) - 2) currentPhase = 'Follicular';
      else if (daysSince <= Math.floor(c/2) + 2) currentPhase = 'Ovulation';
      else currentPhase = 'Luteal';
    }
    const nextPeriodDate = user.lastPeriodDate
      ? new Date(new Date(user.lastPeriodDate).getTime() + (user.cycleLength||28)*24*60*60*1000) : null;
    const phaseTips = {
      Menstrual: 'Rest well, stay warm, and be gentle with yourself this week.',
      Follicular: 'Your energy is rising! Great week to start new goals.',
      Ovulation: 'Peak energy week! Tackle your biggest tasks now.',
      Luteal: 'Wind down, prioritize sleep and comfort foods.'
    };
    res.json({
      healthScore: Math.min(100, score), breakdown,
      weeklyDigest: {
        moodsLogged: weekMoods.length, topMood, currentPhase, nextPeriodDate,
        tip: currentPhase ? phaseTips[currentPhase] : 'Log your period to get personalized tips!',
        cyclesLogged: cycles.length
      }
    });
  } catch (error) {
    console.error('Health score error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
