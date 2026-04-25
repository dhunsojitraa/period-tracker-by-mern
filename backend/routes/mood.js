const express = require('express');
const { body, validationResult } = require('express-validator');
const MoodLog = require('../models/MoodLog');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/log', [
  auth,
  body('mood').isIn(['happy', 'sad', 'angry', 'anxious', 'calm', 'tired', 'energetic', 'stressed']).withMessage('Please select a valid mood'),
  body('intensity').optional().isInt({ min: 1, max: 5 }).withMessage('Intensity must be between 1-5'),
  body('date').optional().isISO8601().withMessage('Please provide a valid date')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { mood, intensity, notes, triggers, date } = req.body;
    const logDate = date ? new Date(date) : new Date();
    logDate.setHours(0, 0, 0, 0);

    const existingLog = await MoodLog.findOne({ userId: req.user._id, date: logDate });
    if (existingLog) {
      existingLog.mood = mood;
      existingLog.intensity = intensity || existingLog.intensity;
      existingLog.notes = notes || existingLog.notes;
      existingLog.triggers = triggers || existingLog.triggers;
      await existingLog.save();
      return res.json({ message: 'Mood updated successfully', moodLog: existingLog });
    }

    const moodLog = new MoodLog({
      userId: req.user._id, date: logDate, mood,
      intensity: intensity || 3, notes: notes || '', triggers: triggers || []
    });
    await moodLog.save();

    try {
      const notificationService = require('../services/notificationService');
      const negativeMoods = ['sad', 'anxious', 'angry', 'stressed'];
      const positiveMoods = ['happy', 'energetic', 'calm'];
      if (negativeMoods.includes(mood)) {
        const messages = {
          sad: { title: '💙 Sending You a Hug', msg: "It's okay to feel sad. Be gentle with yourself today. Try some calming music or journaling. 💕" },
          anxious: { title: '🌿 Breathe With Us', msg: 'Try the 4-7-8 breathing technique. Check out our Music Therapy section for calming playlists! 🎵' },
          angry: { title: '🔥 Release & Reset', msg: "Anger is valid. Try a brisk walk or write down your feelings. You've got this! 💪" },
          stressed: { title: '🧘 Stress Relief Tips', msg: 'Try a 5-minute meditation, reduce caffeine today, and prioritize sleep tonight. 🎵' }
        };
        const { title, msg } = messages[mood];
        await notificationService.createNotification(req.user._id, 'health', title, msg, { priority: 'high', actionUrl: '/music-therapy' });
      } else if (positiveMoods.includes(mood)) {
        const messages = {
          happy: { title: '🌟 Love Your Energy!', msg: "You're feeling happy today! Great time to tackle goals and connect with friends. ✨" },
          energetic: { title: '⚡ Channel That Energy!', msg: 'Perfect time for a workout or a creative project. Make the most of it! 🚀' },
          calm: { title: '🌸 Beautiful Calm', msg: 'Use this peaceful energy for reflection or planning ahead. 🌿' }
        };
        const { title, msg } = messages[mood];
        await notificationService.createNotification(req.user._id, 'insight', title, msg, { priority: 'low', actionUrl: '/dashboard' });
      }
    } catch (e) { console.error('Auto mood response error:', e); }

    res.status(201).json({ message: 'Mood logged successfully', moodLog });
  } catch (error) {
    console.error('Log mood error:', error);
    res.status(500).json({ message: 'Server error while logging mood' });
  }
});

router.get('/history', auth, async (req, res) => {
  try {
    const { days = 30, page = 1, limit = 30 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const moodHistory = await MoodLog.find({ userId: req.user._id, date: { $gte: startDate } })
      .sort({ date: -1 }).limit(limit * 1).skip((page - 1) * limit);
    const moodStats = await MoodLog.aggregate([
      { $match: { userId: req.user._id, date: { $gte: startDate } } },
      { $group: { _id: '$mood', count: { $sum: 1 }, avgIntensity: { $avg: '$intensity' } } },
      { $sort: { count: -1 } }
    ]);
    res.json({ moodHistory, statistics: moodStats, period: `Last ${days} days` });
  } catch (error) {
    console.error('Get mood history error:', error);
    res.status(500).json({ message: 'Server error while getting mood history' });
  }
});

router.get('/today', auth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayMood = await MoodLog.findOne({ userId: req.user._id, date: today });
    res.json({ todayMood: todayMood || null, hasLoggedToday: !!todayMood });
  } catch (error) {
    console.error('Get today mood error:', error);
    res.status(500).json({ message: "Server error while getting today's mood" });
  }
});

router.get('/patterns', auth, async (req, res) => {
  try {
    const { days = 90 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const weeklyPatterns = await MoodLog.aggregate([
      { $match: { userId: req.user._id, date: { $gte: startDate } } },
      { $group: { _id: { $dayOfWeek: '$date' }, moods: { $push: '$mood' }, avgIntensity: { $avg: '$intensity' }, count: { $sum: 1 } } },
      { $sort: { '_id': 1 } }
    ]);
    const commonTriggers = await MoodLog.aggregate([
      { $match: { userId: req.user._id, date: { $gte: startDate }, triggers: { $exists: true, $ne: [] } } },
      { $unwind: '$triggers' },
      { $group: { _id: '$triggers', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    res.json({ weeklyPatterns, commonTriggers, analysisPeriod: `Last ${days} days` });
  } catch (error) {
    console.error('Get mood patterns error:', error);
    res.status(500).json({ message: 'Server error while analyzing mood patterns' });
  }
});

module.exports = router;
