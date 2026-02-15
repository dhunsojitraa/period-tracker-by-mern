const express = require('express');
const { body, validationResult } = require('express-validator');
const MoodLog = require('../models/MoodLog');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/mood/log
// @desc    Log daily mood
// @access  Private
router.post('/log', [
  auth,
  body('mood').isIn(['happy', 'sad', 'angry', 'anxious', 'calm', 'tired', 'energetic', 'stressed'])
    .withMessage('Please select a valid mood'),
  body('intensity').optional().isInt({ min: 1, max: 5 }).withMessage('Intensity must be between 1-5'),
  body('date').optional().isISO8601().withMessage('Please provide a valid date')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { mood, intensity, notes, triggers, date } = req.body;
    
    const logDate = date ? new Date(date) : new Date();
    // Set to start of day to ensure uniqueness
    logDate.setHours(0, 0, 0, 0);

    // Check if mood already logged for this date
    const existingLog = await MoodLog.findOne({
      userId: req.user._id,
      date: logDate
    });

    if (existingLog) {
      // Update existing log
      existingLog.mood = mood;
      existingLog.intensity = intensity || existingLog.intensity;
      existingLog.notes = notes || existingLog.notes;
      existingLog.triggers = triggers || existingLog.triggers;
      
      await existingLog.save();
      
      return res.json({
        message: 'Mood updated successfully',
        moodLog: existingLog
      });
    }

    // Create new mood log
    const moodLog = new MoodLog({
      userId: req.user._id,
      date: logDate,
      mood,
      intensity: intensity || 3,
      notes: notes || '',
      triggers: triggers || []
    });

    await moodLog.save();

    res.status(201).json({
      message: 'Mood logged successfully',
      moodLog
    });
  } catch (error) {
    console.error('Log mood error:', error);
    res.status(500).json({ message: 'Server error while logging mood' });
  }
});

// @route   GET /api/mood/history
// @desc    Get mood history
// @access  Private
router.get('/history', auth, async (req, res) => {
  try {
    const { days = 30, page = 1, limit = 30 } = req.query;
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const moodHistory = await MoodLog.find({
      userId: req.user._id,
      date: { $gte: startDate }
    })
    .sort({ date: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

    // Calculate mood statistics
    const moodStats = await MoodLog.aggregate([
      {
        $match: {
          userId: req.user._id,
          date: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$mood',
          count: { $sum: 1 },
          avgIntensity: { $avg: '$intensity' }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.json({
      moodHistory,
      statistics: moodStats,
      period: `Last ${days} days`
    });
  } catch (error) {
    console.error('Get mood history error:', error);
    res.status(500).json({ message: 'Server error while getting mood history' });
  }
});

// @route   GET /api/mood/today
// @desc    Get today's mood
// @access  Private
router.get('/today', auth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayMood = await MoodLog.findOne({
      userId: req.user._id,
      date: today
    });

    res.json({
      todayMood: todayMood || null,
      hasLoggedToday: !!todayMood
    });
  } catch (error) {
    console.error('Get today mood error:', error);
    res.status(500).json({ message: 'Server error while getting today\'s mood' });
  }
});

// @route   GET /api/mood/patterns
// @desc    Get mood patterns and insights
// @access  Private
router.get('/patterns', auth, async (req, res) => {
  try {
    const { days = 90 } = req.query;
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    // Get mood patterns by day of week
    const weeklyPatterns = await MoodLog.aggregate([
      {
        $match: {
          userId: req.user._id,
          date: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: { $dayOfWeek: '$date' },
          moods: { $push: '$mood' },
          avgIntensity: { $avg: '$intensity' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ]);

    // Get most common triggers
    const commonTriggers = await MoodLog.aggregate([
      {
        $match: {
          userId: req.user._id,
          date: { $gte: startDate },
          triggers: { $exists: true, $ne: [] }
        }
      },
      {
        $unwind: '$triggers'
      },
      {
        $group: {
          _id: '$triggers',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      }
    ]);

    res.json({
      weeklyPatterns,
      commonTriggers,
      analysisPeriod: `Last ${days} days`
    });
  } catch (error) {
    console.error('Get mood patterns error:', error);
    res.status(500).json({ message: 'Server error while analyzing mood patterns' });
  }
});

module.exports = router;