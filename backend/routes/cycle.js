const express = require('express');
const { body, validationResult } = require('express-validator');
const CycleData = require('../models/CycleData');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Helper function to calculate cycle predictions
const calculateCyclePredictions = (lastPeriodDate, cycleLength, periodLength) => {
  const lastPeriod = new Date(lastPeriodDate);
  const nextPeriod = new Date(lastPeriod);
  nextPeriod.setDate(lastPeriod.getDate() + cycleLength);
  
  const ovulationDate = new Date(lastPeriod);
  ovulationDate.setDate(lastPeriod.getDate() + Math.floor(cycleLength / 2));
  
  const fertileWindowStart = new Date(ovulationDate);
  fertileWindowStart.setDate(ovulationDate.getDate() - 5);
  
  const fertileWindowEnd = new Date(ovulationDate);
  fertileWindowEnd.setDate(ovulationDate.getDate() + 1);
  
  // Calculate current phase
  const today = new Date();
  const daysSinceLastPeriod = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24));
  
  let currentPhase;
  if (daysSinceLastPeriod <= periodLength) {
    currentPhase = 'menstrual';
  } else if (daysSinceLastPeriod <= Math.floor(cycleLength / 2) - 2) {
    currentPhase = 'follicular';
  } else if (daysSinceLastPeriod <= Math.floor(cycleLength / 2) + 2) {
    currentPhase = 'ovulation';
  } else {
    currentPhase = 'luteal';
  }
  
  return {
    nextPeriod,
    ovulationDate,
    fertileWindowStart,
    fertileWindowEnd,
    currentPhase,
    daysSinceLastPeriod
  };
};

// @route   POST /api/cycle/period
// @desc    Log a new period
// @access  Private
router.post('/period', [
  auth,
  body('startDate').isISO8601().withMessage('Please provide a valid start date'),
  body('flow').optional().isIn(['light', 'medium', 'heavy']).withMessage('Flow must be light, medium, or heavy')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { startDate, endDate, symptoms, flow, notes } = req.body;

    const cycleData = new CycleData({
      userId: req.user._id,
      startDate,
      endDate,
      symptoms: symptoms || [],
      flow: flow || 'medium',
      notes: notes || ''
    });

    await cycleData.save();

    // Update user's last period date
    await User.findByIdAndUpdate(req.user._id, { lastPeriodDate: startDate });

    res.status(201).json({
      message: 'Period logged successfully',
      cycleData
    });
  } catch (error) {
    console.error('Log period error:', error);
    res.status(500).json({ message: 'Server error while logging period' });
  }
});

// @route   GET /api/cycle/predictions
// @desc    Get cycle predictions
// @access  Private
router.get('/predictions', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user.lastPeriodDate) {
      return res.status(400).json({ message: 'Please log your last period first to get predictions' });
    }

    const predictions = calculateCyclePredictions(
      user.lastPeriodDate,
      user.cycleLength,
      user.periodLength
    );

    res.json({
      predictions,
      userCycleInfo: {
        cycleLength: user.cycleLength,
        periodLength: user.periodLength,
        lastPeriodDate: user.lastPeriodDate
      }
    });
  } catch (error) {
    console.error('Get predictions error:', error);
    res.status(500).json({ message: 'Server error while getting predictions' });
  }
});

// @route   GET /api/cycle/history
// @desc    Get cycle history
// @access  Private
router.get('/history', auth, async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    
    const cycleHistory = await CycleData.find({ userId: req.user._id })
      .sort({ startDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await CycleData.countDocuments({ userId: req.user._id });

    res.json({
      cycleHistory,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get cycle history error:', error);
    res.status(500).json({ message: 'Server error while getting cycle history' });
  }
});

// @route   PUT /api/cycle/settings
// @desc    Update cycle settings
// @access  Private
router.put('/settings', [
  auth,
  body('cycleLength').optional().isInt({ min: 21, max: 35 }).withMessage('Cycle length must be between 21-35 days'),
  body('periodLength').optional().isInt({ min: 3, max: 8 }).withMessage('Period length must be between 3-8 days')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { cycleLength, periodLength } = req.body;
    
    const updateData = {};
    if (cycleLength) updateData.cycleLength = cycleLength;
    if (periodLength) updateData.periodLength = periodLength;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true }
    ).select('-password');

    res.json({
      message: 'Cycle settings updated successfully',
      user: {
        cycleLength: user.cycleLength,
        periodLength: user.periodLength
      }
    });
  } catch (error) {
    console.error('Update cycle settings error:', error);
    res.status(500).json({ message: 'Server error while updating settings' });
  }
});

module.exports = router;