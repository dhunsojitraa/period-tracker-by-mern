const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const notificationService = require('../services/notificationService');

// Get user notifications
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit = 20, unreadOnly = false } = req.query;
    
    const notifications = await notificationService.getUserNotifications(
      userId, 
      parseInt(limit), 
      unreadOnly === 'true'
    );

    res.json({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get unread notification count
router.get('/unread-count', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const count = await notificationService.getUnreadCount(userId);
    
    res.json({ count });
  } catch (error) {
    console.error('Error fetching unread count:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark notification as read
router.patch('/:id/read', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const notificationId = req.params.id;
    
    const notification = await notificationService.markAsRead(notificationId, userId);
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json({ notification });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark all notifications as read
router.patch('/mark-all-read', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    
    await notificationService.markAllAsRead(userId);
    
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a manual notification (for testing)
router.post('/test', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { type, title, message } = req.body;
    
    const notification = await notificationService.createNotification(
      userId,
      type || 'reminder',
      title || 'Test Notification',
      message || 'This is a test notification to verify the system is working!'
    );

    res.json({ notification });
  } catch (error) {
    console.error('Error creating test notification:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;