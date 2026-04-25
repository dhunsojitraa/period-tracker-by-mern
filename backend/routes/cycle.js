const express = require('express');
const { body, validationResult } = require('express-validator');
const CycleData = require('../models/CycleData');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { bayesianCyclePrediction } = require('../services/bayesianPrediction');

const router = express.Router();

router.post('/period', [
  auth,
  body('startDate').isISO8601().withMessage('Please provide a valid start date'),
  body('flow').optional().isIn(['light', 'medium', 'heavy']).withMessage('Flow must be light, medium, or heavy')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { startDate, endDate, symptoms, flow, notes } = req.body;

    const cycleData = new CycleData({
      userId: req.user._id,
      startDate, endDate,
      symptoms: symptoms || [],
      flow: flow || 'medium',
      notes: notes || ''
    });

    await cycleData.save();
    await User.findByIdAndUpdate(req.user._id, { lastPeriodDate: startDate });

    const recentCycles = await CycleData.find({ userId: req.user._id })
      .sort({ startDate: -1 }).limit(4);

    if (recentCycles.length >= 3) {
      const cycleLengths = [];
      for (let i = 0; i < recentCycles.length - 1; i++) {
        const gap = Math.round(
          (new Date(recentCycles[i].startDate) - new Date(recentCycles[i + 1].startDate)) / (1000 * 60 * 60 * 24)
        );
        if (gap >= 21 && gap <= 35) cycleLengths.push(gap);
      }
      if (cycleLengths.length >= 2) {
        const avgCycleLength = Math.round(cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length);
        await User.findByIdAndUpdate(req.user._id, { cycleLength: avgCycleLength });
      }
    }

    const user = await User.findById(req.user._id);
    if (recentCycles.length >= 2) {
      const lastGap = Math.round(
        (new Date(recentCycles[0].startDate) - new Date(recentCycles[1].startDate)) / (1000 * 60 * 60 * 24)
      );
      const diff = Math.abs(lastGap - user.cycleLength);
      if (diff >= 5) {
        const notificationService = require('../services/notificationService');
        await notificationService.createNotification(
          req.user._id, 'health', '⚠️ Irregular Cycle Detected',
          `Your last cycle was ${lastGap} days, which is ${diff} days ${lastGap > user.cycleLength ? 'longer' : 'shorter'} than your usual ${user.cycleLength}-day cycle.`,
          { priority: 'high', actionUrl: '/analytics' }
        );
      }
    }

    try {
      const notificationService = require('../services/notificationService');
      const updatedUser = await User.findById(req.user._id);
      const nextPeriod = new Date(startDate);
      nextPeriod.setDate(nextPeriod.getDate() + (updatedUser.cycleLength || 28));
      const nextPeriodStr = nextPeriod.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

      await notificationService.createNotification(
        req.user._id, 'period', '📅 Next Period Predicted!',
        `Based on your cycle length of ${updatedUser.cycleLength} days, your next period is predicted on ${nextPeriodStr}.`,
        { priority: 'medium', actionUrl: '/period-tracker' }
      );

      const loggedSymptoms = symptoms || [];
      const loggedFlow = flow || 'medium';

      if (loggedFlow === 'heavy' || loggedSymptoms.includes('cramps')) {
        await notificationService.createNotification(
          req.user._id, 'health', '💊 Relief Tips for You',
          'For heavy flow and cramps: Try a warm heating pad, stay hydrated, take ibuprofen if needed, and gentle yoga stretches can help.',
          { priority: 'high', actionUrl: '/symptoms' }
        );
      }
      if (loggedSymptoms.includes('fatigue') || loggedSymptoms.includes('back_pain')) {
        await notificationService.createNotification(
          req.user._id, 'health', '🛌 Self-Care Reminder',
          'Fatigue and back pain are common during your period. Rest when you can and try light stretching.',
          { priority: 'medium', actionUrl: '/symptoms' }
        );
      }
      if (loggedSymptoms.includes('headache')) {
        await notificationService.createNotification(
          req.user._id, 'health', '🧠 Headache Relief',
          'Stay hydrated, rest in a dark room, and a cold compress on your forehead can provide quick relief.',
          { priority: 'medium', actionUrl: '/symptoms' }
        );
      }
    } catch (e) { console.error('Auto notification error:', e); }

    res.status(201).json({ message: 'Period logged successfully', cycleData });
  } catch (error) {
    console.error('Log period error:', error);
    res.status(500).json({ message: 'Server error while logging period' });
  }
});

router.get('/predictions', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user.lastPeriodDate) {
      return res.status(400).json({ message: 'Please log your last period first to get predictions' });
    }
    const cycleHistory = await CycleData.find({ userId: req.user._id })
      .sort({ startDate: -1 }).limit(12);
    const predictions = bayesianCyclePrediction(cycleHistory, user);
    res.json({
      predictions,
      userCycleInfo: { cycleLength: user.cycleLength, periodLength: user.periodLength, lastPeriodDate: user.lastPeriodDate },
      model: {
        name: 'Bayesian Gaussian Inference',
        description: 'Combines population data with your personal cycle history to improve predictions over time',
        dataPoints: predictions.dataPoints,
        confidenceScore: predictions.confidenceScore,
        note: predictions.modelNote
      }
    });
  } catch (error) {
    console.error('Get predictions error:', error);
    res.status(500).json({ message: 'Server error while getting predictions' });
  }
});

router.get('/history', auth, async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const cycleHistory = await CycleData.find({ userId: req.user._id })
      .sort({ startDate: -1 }).limit(limit * 1).skip((page - 1) * limit);
    const total = await CycleData.countDocuments({ userId: req.user._id });
    res.json({ cycleHistory, pagination: { current: page, pages: Math.ceil(total / limit), total } });
  } catch (error) {
    console.error('Get cycle history error:', error);
    res.status(500).json({ message: 'Server error while getting cycle history' });
  }
});

router.put('/settings', [
  auth,
  body('cycleLength').optional().isInt({ min: 21, max: 35 }).withMessage('Cycle length must be between 21-35 days'),
  body('periodLength').optional().isInt({ min: 3, max: 8 }).withMessage('Period length must be between 3-8 days')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { cycleLength, periodLength } = req.body;
    const updateData = {};
    if (cycleLength) updateData.cycleLength = cycleLength;
    if (periodLength) updateData.periodLength = periodLength;
    const user = await User.findByIdAndUpdate(req.user._id, updateData, { new: true }).select('-password');
    res.json({ message: 'Cycle settings updated successfully', user: { cycleLength: user.cycleLength, periodLength: user.periodLength } });
  } catch (error) {
    console.error('Update cycle settings error:', error);
    res.status(500).json({ message: 'Server error while updating settings' });
  }
});

module.exports = router;
