const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

router.post('/register', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password, dateOfBirth, cycleLength, periodLength } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists with this email' });

    const user = new User({
      name, email, password, dateOfBirth,
      cycleLength: cycleLength || 28,
      periodLength: periodLength || 5
    });

    await user.save();
    const token = generateToken(user._id);

    try {
      const notificationService = require('../services/notificationService');
      await notificationService.createNotification(
        user._id, 'reminder',
        `🌸 Welcome to A Girl's Best Friend, ${name}!`,
        `Hi ${name}! Start by logging your last period date to get your first cycle prediction. Then track your mood daily for personalized insights.`,
        { priority: 'high', actionUrl: '/period-tracker' }
      );
    } catch (e) { console.error('Welcome notification error:', e); }

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user._id, name: user.name, email: user.email, cycleLength: user.cycleLength, periodLength: user.periodLength }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

router.post('/login', [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').exists().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password, twoFactorToken } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    if (user.twoFactorEnabled) {
      if (!twoFactorToken) {
        return res.json({ requires2FA: true, userId: user._id, message: 'Please enter your 2FA code' });
      }
      const speakeasy = require('speakeasy');
      const backupCodeIndex = user.twoFactorBackupCodes.indexOf(twoFactorToken.toUpperCase());
      let isValid = false;
      if (backupCodeIndex !== -1) {
        user.twoFactorBackupCodes.splice(backupCodeIndex, 1);
        await user.save();
        isValid = true;
      } else {
        isValid = speakeasy.totp.verify({
          secret: user.twoFactorSecret,
          encoding: 'base32',
          token: twoFactorToken,
          window: 2
        });
      }
      if (!isValid) return res.status(400).json({ message: 'Invalid 2FA code' });
    }

    const token = generateToken(user._id);
    await User.findByIdAndUpdate(user._id, { lastActiveDate: new Date() });

    try {
      const notificationService = require('../services/notificationService');
      if (user.lastPeriodDate) {
        const daysSince = Math.floor((new Date() - new Date(user.lastPeriodDate)) / (1000 * 60 * 60 * 24));
        const cycle = user.cycleLength || 28;
        let phase, tip;
        if (daysSince <= 5) { phase = 'Menstrual'; tip = 'Rest well today. Warm compress and hydration can ease cramps. 🩸'; }
        else if (daysSince <= Math.floor(cycle / 2) - 2) { phase = 'Follicular'; tip = 'Your energy is rising! Great time to start something new. 🌱'; }
        else if (daysSince <= Math.floor(cycle / 2) + 2) { phase = 'Ovulation'; tip = 'You are at your peak energy today! ✨'; }
        else { phase = 'Luteal'; tip = 'Wind-down time. Focus on self-care and comfort foods. 🌙'; }

        const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
        const alreadySent = await require('../models/Notification').findOne({
          userId: user._id, type: 'insight',
          title: { $regex: /phase tip/i },
          createdAt: { $gte: todayStart }
        });
        if (!alreadySent) {
          await notificationService.createNotification(
            user._id, 'insight', `🌸 ${phase} Phase Tip`, tip,
            { priority: 'low', actionUrl: '/cycle-phases' }
          );
        }
      }
    } catch (e) { console.error('Phase tip error:', e); }

    res.json({
      message: 'Login successful', token,
      user: {
        id: user._id, name: user.name, email: user.email,
        cycleLength: user.cycleLength, periodLength: user.periodLength,
        lastPeriodDate: user.lastPeriodDate, twoFactorEnabled: user.twoFactorEnabled
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id, name: req.user.name, email: req.user.email,
        cycleLength: req.user.cycleLength, periodLength: req.user.periodLength,
        lastPeriodDate: req.user.lastPeriodDate
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
