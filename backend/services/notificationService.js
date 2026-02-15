const cron = require('node-cron');
const Notification = require('../models/Notification');
const User = require('../models/User');
const CycleData = require('../models/CycleData');
const MoodLog = require('../models/MoodLog');

class NotificationService {
  constructor() {
    this.startScheduler();
  }

  // Start the notification scheduler
  startScheduler() {
    // Run every hour to check for notifications
    cron.schedule('0 * * * *', () => {
      this.checkPeriodReminders();
      this.checkMoodReminders();
      this.checkHealthInsights();
    });

    // Run daily at 9 AM for insights
    cron.schedule('0 9 * * *', () => {
      this.generateDailyInsights();
    });

    console.log('Notification scheduler started');
  }

  // Create a new notification
  async createNotification(userId, type, title, message, options = {}) {
    try {
      const notification = new Notification({
        userId,
        type,
        title,
        message,
        priority: options.priority || 'medium',
        scheduledFor: options.scheduledFor || new Date(),
        actionUrl: options.actionUrl,
        metadata: options.metadata
      });

      await notification.save();
      return notification;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

  // Check for period reminders
  async checkPeriodReminders() {
    try {
      const users = await User.find({});
      
      for (const user of users) {
        const latestCycle = await CycleData.findOne({ userId: user._id })
          .sort({ lastPeriodDate: -1 });

        if (latestCycle) {
          const nextPeriodDate = new Date(latestCycle.lastPeriodDate);
          nextPeriodDate.setDate(nextPeriodDate.getDate() + latestCycle.cycleLength);
          
          const today = new Date();
          const daysUntilPeriod = Math.ceil((nextPeriodDate - today) / (1000 * 60 * 60 * 24));

          // 3 days before period reminder
          if (daysUntilPeriod === 3) {
            await this.createNotification(
              user._id,
              'period',
              '🩸 Period Reminder',
              'Your period is expected in 3 days. Time to prepare! Stock up on supplies and plan some self-care.',
              {
                priority: 'medium',
                actionUrl: '/period-tracker',
                metadata: { daysUntil: 3 }
              }
            );
          }

          // Period is late reminder
          if (daysUntilPeriod < -2) {
            const daysLate = Math.abs(daysUntilPeriod);
            await this.createNotification(
              user._id,
              'period',
              '📅 Period Update',
              `Your period is ${daysLate} days late. This can be normal, but consider tracking any symptoms.`,
              {
                priority: 'high',
                actionUrl: '/period-tracker',
                metadata: { daysLate }
              }
            );
          }
        }
      }
    } catch (error) {
      console.error('Error checking period reminders:', error);
    }
  }

  // Check for mood reminders
  async checkMoodReminders() {
    try {
      const users = await User.find({});
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (const user of users) {
        // Check if user logged mood today
        const todayMood = await MoodLog.findOne({
          userId: user._id,
          date: { $gte: today }
        });

        if (!todayMood) {
          // Check if we already sent a reminder today
          const existingReminder = await Notification.findOne({
            userId: user._id,
            type: 'mood',
            createdAt: { $gte: today }
          });

          if (!existingReminder) {
            await this.createNotification(
              user._id,
              'mood',
              '😊 Daily Check-in',
              'How are you feeling today? Take a moment to log your mood and reflect on your day.',
              {
                priority: 'low',
                actionUrl: '/mood-tracker'
              }
            );
          }
        }
      }
    } catch (error) {
      console.error('Error checking mood reminders:', error);
    }
  }

  // Check for health insights
  async checkHealthInsights() {
    try {
      const users = await User.find({});

      for (const user of users) {
        // Check for consistent tracking
        const last7Days = new Date();
        last7Days.setDate(last7Days.getDate() - 7);

        const recentMoods = await MoodLog.find({
          userId: user._id,
          date: { $gte: last7Days }
        });

        // Celebrate consistent tracking
        if (recentMoods.length >= 6) {
          const existingCelebration = await Notification.findOne({
            userId: user._id,
            type: 'insight',
            title: { $regex: /consistent/i },
            createdAt: { $gte: last7Days }
          });

          if (!existingCelebration) {
            await this.createNotification(
              user._id,
              'insight',
              '🎯 Great Progress!',
              `You've been tracking consistently! ${recentMoods.length} mood entries this week. Keep it up!`,
              {
                priority: 'low',
                actionUrl: '/analytics'
              }
            );
          }
        }

        // Check for mood patterns
        if (recentMoods.length >= 5) {
          const sadMoods = recentMoods.filter(m => 
            ['sad', 'angry', 'anxious'].includes(m.mood.toLowerCase())
          ).length;

          if (sadMoods >= 4) {
            const existingSupport = await Notification.findOne({
              userId: user._id,
              type: 'health',
              title: { $regex: /support/i },
              createdAt: { $gte: last7Days }
            });

            if (!existingSupport) {
              await this.createNotification(
                user._id,
                'health',
                '💝 Self-Care Reminder',
                'You\'ve had some challenging days lately. Remember to be gentle with yourself and consider reaching out for support.',
                {
                  priority: 'high',
                  actionUrl: '/music-therapy'
                }
              );
            }
          }
        }
      }
    } catch (error) {
      console.error('Error checking health insights:', error);
    }
  }

  // Generate daily insights
  async generateDailyInsights() {
    try {
      const users = await User.find({});

      for (const user of users) {
        const latestCycle = await CycleData.findOne({ userId: user._id })
          .sort({ lastPeriodDate: -1 });

        if (latestCycle) {
          const today = new Date();
          const lastPeriod = new Date(latestCycle.lastPeriodDate);
          const daysSinceLastPeriod = Math.ceil((today - lastPeriod) / (1000 * 60 * 60 * 24));
          
          let phase = 'menstrual';
          let phaseMessage = '';

          // Determine cycle phase
          if (daysSinceLastPeriod <= 5) {
            phase = 'menstrual';
            phaseMessage = 'You\'re in your menstrual phase. Focus on rest, gentle movement, and nourishing foods.';
          } else if (daysSinceLastPeriod <= 13) {
            phase = 'follicular';
            phaseMessage = 'You\'re in your follicular phase! This is a great time for new projects and higher energy activities.';
          } else if (daysSinceLastPeriod <= 17) {
            phase = 'ovulation';
            phaseMessage = 'You\'re in your ovulation phase. You might feel more social and confident - perfect for important meetings!';
          } else {
            phase = 'luteal';
            phaseMessage = 'You\'re in your luteal phase. Focus on completing projects and preparing for your next cycle.';
          }

          // Check if we already sent a phase insight today
          const today_start = new Date();
          today_start.setHours(0, 0, 0, 0);

          const existingPhaseInsight = await Notification.findOne({
            userId: user._id,
            type: 'insight',
            'metadata.phase': phase,
            createdAt: { $gte: today_start }
          });

          if (!existingPhaseInsight) {
            await this.createNotification(
              user._id,
              'insight',
              `🌙 ${phase.charAt(0).toUpperCase() + phase.slice(1)} Phase`,
              phaseMessage,
              {
                priority: 'low',
                actionUrl: '/cycle-phases',
                metadata: { phase, daysSinceLastPeriod }
              }
            );
          }
        }
      }
    } catch (error) {
      console.error('Error generating daily insights:', error);
    }
  }

  // Get notifications for a user
  async getUserNotifications(userId, limit = 20, unreadOnly = false) {
    try {
      const query = { userId };
      if (unreadOnly) {
        query.isRead = false;
      }

      const notifications = await Notification.find(query)
        .sort({ createdAt: -1 })
        .limit(limit);

      return notifications;
    } catch (error) {
      console.error('Error getting user notifications:', error);
      throw error;
    }
  }

  // Mark notification as read
  async markAsRead(notificationId, userId) {
    try {
      const notification = await Notification.findOneAndUpdate(
        { _id: notificationId, userId },
        { isRead: true },
        { new: true }
      );

      return notification;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

  // Mark all notifications as read
  async markAllAsRead(userId) {
    try {
      await Notification.updateMany(
        { userId, isRead: false },
        { isRead: true }
      );

      return true;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  }

  // Get unread count
  async getUnreadCount(userId) {
    try {
      const count = await Notification.countDocuments({
        userId,
        isRead: false
      });

      return count;
    } catch (error) {
      console.error('Error getting unread count:', error);
      throw error;
    }
  }
}

module.exports = new NotificationService();