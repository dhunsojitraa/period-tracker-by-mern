const express = require('express');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const crypto = require('crypto');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/2fa/setup
// @desc    Generate 2FA secret and QR code
// @access  Private
router.post('/setup', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.twoFactorEnabled) {
      return res.status(400).json({ message: '2FA is already enabled for this account' });
    }

    // Generate secret
    const secret = speakeasy.generateSecret({
      name: `A Girl's Best Friend (${user.email})`,
      issuer: 'A Girl\'s Best Friend'
    });

    // Generate QR code
    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);

    // Save secret temporarily (not enabled yet)
    user.twoFactorSecret = secret.base32;
    await user.save();

    res.json({
      secret: secret.base32,
      qrCode: qrCodeUrl,
      message: 'Scan this QR code with Google Authenticator or similar app'
    });
  } catch (error) {
    console.error('2FA setup error:', error);
    res.status(500).json({ message: 'Server error during 2FA setup' });
  }
});

// @route   POST /api/2fa/verify
// @desc    Verify 2FA token and enable 2FA
// @access  Private
router.post('/verify', auth, async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Verification token is required' });
    }

    const user = await User.findById(req.user._id);

    if (!user.twoFactorSecret) {
      return res.status(400).json({ message: 'Please setup 2FA first' });
    }

    // Verify the token
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: token,
      window: 2 // Allow 2 time steps before/after for clock skew
    });

    if (!verified) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    // Generate backup codes
    const backupCodes = [];
    for (let i = 0; i < 10; i++) {
      backupCodes.push(crypto.randomBytes(4).toString('hex').toUpperCase());
    }

    // Enable 2FA
    user.twoFactorEnabled = true;
    user.twoFactorBackupCodes = backupCodes;
    await user.save();

    res.json({
      message: '2FA enabled successfully',
      backupCodes,
      warning: 'Save these backup codes in a safe place. You can use them if you lose access to your authenticator app.'
    });
  } catch (error) {
    console.error('2FA verification error:', error);
    res.status(500).json({ message: 'Server error during 2FA verification' });
  }
});

// @route   POST /api/2fa/validate
// @desc    Validate 2FA token during login
// @access  Public (but requires temp auth)
router.post('/validate', async (req, res) => {
  try {
    const { userId, token } = req.body;

    if (!userId || !token) {
      return res.status(400).json({ message: 'User ID and token are required' });
    }

    const user = await User.findById(userId);

    if (!user || !user.twoFactorEnabled) {
      return res.status(400).json({ message: 'Invalid request' });
    }

    // Check if it's a backup code
    const backupCodeIndex = user.twoFactorBackupCodes.indexOf(token.toUpperCase());
    if (backupCodeIndex !== -1) {
      // Remove used backup code
      user.twoFactorBackupCodes.splice(backupCodeIndex, 1);
      await user.save();
      
      return res.json({
        valid: true,
        message: 'Backup code accepted',
        remainingBackupCodes: user.twoFactorBackupCodes.length
      });
    }

    // Verify TOTP token
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: token,
      window: 2
    });

    if (!verified) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    res.json({
      valid: true,
      message: '2FA validation successful'
    });
  } catch (error) {
    console.error('2FA validation error:', error);
    res.status(500).json({ message: 'Server error during 2FA validation' });
  }
});

// @route   POST /api/2fa/disable
// @desc    Disable 2FA
// @access  Private
router.post('/disable', auth, async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password is required to disable 2FA' });
    }

    const user = await User.findById(req.user._id);

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Disable 2FA
    user.twoFactorEnabled = false;
    user.twoFactorSecret = null;
    user.twoFactorBackupCodes = [];
    await user.save();

    res.json({ message: '2FA disabled successfully' });
  } catch (error) {
    console.error('2FA disable error:', error);
    res.status(500).json({ message: 'Server error while disabling 2FA' });
  }
});

// @route   GET /api/2fa/status
// @desc    Get 2FA status
// @access  Private
router.get('/status', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.json({
      enabled: user.twoFactorEnabled,
      backupCodesRemaining: user.twoFactorBackupCodes.length
    });
  } catch (error) {
    console.error('2FA status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;