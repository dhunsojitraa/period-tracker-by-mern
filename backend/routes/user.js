const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', [
  auth,
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').optional().isEmail().withMessage('Please enter a valid email'),
  body('dateOfBirth').optional().isISO8601().withMessage('Please provide a valid date of birth')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, dateOfBirth } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (dateOfBirth) updateData.dateOfBirth = dateOfBirth;

    // Check if email is already taken by another user
    if (email) {
      const existingUser = await User.findOne({ 
        email, 
        _id: { $ne: req.user._id } 
      });
      
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already taken' });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true }
    ).select('-password');

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        cycleLength: user.cycleLength,
        periodLength: user.periodLength,
        lastPeriodDate: user.lastPeriodDate
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error while updating profile' });
  }
});

// @route   PUT /api/user/cycle-preferences
// @desc    Update cycle preferences
// @access  Private
router.put('/cycle-preferences', [
  auth,
  body('cycleLength').optional().isInt({ min: 21, max: 35 }).withMessage('Cycle length must be between 21-35 days'),
  body('periodLength').optional().isInt({ min: 3, max: 8 }).withMessage('Period length must be between 3-8 days'),
  body('lastPeriodDate').optional().isISO8601().withMessage('Please provide a valid last period date')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { cycleLength, periodLength, lastPeriodDate } = req.body;
    
    const updateData = {};
    if (cycleLength) updateData.cycleLength = cycleLength;
    if (periodLength) updateData.periodLength = periodLength;
    if (lastPeriodDate) updateData.lastPeriodDate = lastPeriodDate;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true }
    ).select('-password');

    res.json({
      message: 'Cycle preferences updated successfully',
      cyclePreferences: {
        cycleLength: user.cycleLength,
        periodLength: user.periodLength,
        lastPeriodDate: user.lastPeriodDate
      }
    });
  } catch (error) {
    console.error('Update cycle preferences error:', error);
    res.status(500).json({ message: 'Server error while updating cycle preferences' });
  }
});

// @route   GET /api/user/dashboard
// @desc    Get dashboard data
// @access  Private
router.get('/dashboard', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    // Calculate days since last period and next period prediction
    let cyclePredictions = null;
    if (user.lastPeriodDate) {
      const lastPeriod = new Date(user.lastPeriodDate);
      const today = new Date();
      const daysSinceLastPeriod = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24));
      
      const nextPeriod = new Date(lastPeriod);
      nextPeriod.setDate(lastPeriod.getDate() + user.cycleLength);
      
      const daysUntilNextPeriod = Math.floor((nextPeriod - today) / (1000 * 60 * 60 * 24));
      
      // Determine current phase
      let currentPhase;
      if (daysSinceLastPeriod <= user.periodLength) {
        currentPhase = 'menstrual';
      } else if (daysSinceLastPeriod <= Math.floor(user.cycleLength / 2) - 2) {
        currentPhase = 'follicular';
      } else if (daysSinceLastPeriod <= Math.floor(user.cycleLength / 2) + 2) {
        currentPhase = 'ovulation';
      } else {
        currentPhase = 'luteal';
      }
      
      cyclePredictions = {
        daysSinceLastPeriod,
        daysUntilNextPeriod,
        nextPeriodDate: nextPeriod,
        currentPhase
      };
    }

    res.json({
      user: {
        name: user.name,
        email: user.email,
        cycleLength: user.cycleLength,
        periodLength: user.periodLength,
        lastPeriodDate: user.lastPeriodDate
      },
      cyclePredictions
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ message: 'Server error while getting dashboard data' });
  }
});

module.exports = router;