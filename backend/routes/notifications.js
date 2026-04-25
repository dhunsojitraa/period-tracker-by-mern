const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const notificationService = require('../services/notificationService');

router.get('/', auth, async (req, res) => {
  try {
    const { limit = 20, unreadOnly = false } = req.query;
    const notifications = await notificationService.getUserNotifications(req.user.id, parseInt(limit), unreadOnly === 'true');
    res.json({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/unread-count', auth, async (req, res) => {
  try {
    const count = await notificationService.getUnreadCount(req.user.id);
    res.json({ count });
  } catch (error) {
    console.error('Error fetching unread count:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/:id/read', auth, async (req, res) => {
  try {
    const notification = await notificationService.markAsRead(req.params.id, req.user.id);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    res.json({ notification });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/mark-all-read', auth, async (req, res) => {
  try {
    await notificationService.markAllAsRead(req.user.id);
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/test', auth, async (req, res) => {
  try {
    const { type, title, message } = req.body;
    const notification = await notificationService.createNotification(
      req.user.id, type || 'reminder',
      title || 'Test Notification',
      message || 'This is a test notification!'
    );
    res.json({ notification });
  } catch (error) {
    console.error('Error creating test notification:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
