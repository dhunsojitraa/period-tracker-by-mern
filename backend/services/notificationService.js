const cron = require('node-cron');
const Notification = require('../models/Notification');
const User = require('../models/User');
const CycleData = require('../models/CycleData');
const MoodLog = require('../models/MoodLog');

class NotificationService {
  constructor() {
    this.startScheduler();
  }

  startScheduler() {
    cron.schedule('0 * * * *', () => {
      this.checkPeriodReminders();
      this.checkMoodReminders();
      this.checkHealthInsights();
    });
    cron.schedule('0 9 * * *', () => { this.generateDailyInsights(); });
    cron.schedule('0 10 * * *', () => { this.checkInactiveUsers(); });
    cron.schedule('0 8 1 * *', () => { this.generateMonthlyReport(); });
    console.log('Notification scheduler started');
  }

  async createNotification(userId, type, title, message, options = {}) {
    try {
      const notification = new Notification({
        userId, type, title, message,
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

  async checkPeriodReminders() {
    try {
      const users = await User.find({});
      for (const user of users) {
        const latestCycle = await CycleData.findOne({ userId: user._id }).sort({ lastPeriodDate: -1 });
        if (latestCycle) {
          const nextPeriodDate = new Date(latestCycle.lastPeriodDate);
          nextPeriodDate.setDate(nextPeriodDate.getDate() + latestCycle.cycleLength);
          const daysUntilPeriod = Math.ceil((nextPeriodDate - new Date()) / (1000 * 60 * 60 * 24));
          if (daysUntilPeriod === 3) {
            await this.createNotification(user._id, 'period', '🩸 Period Reminder',
              'Your period is expected in 3 days. Time to prepare!',
              { priority: 'medium', actionUrl: '/period-tracker', metadata: { daysUntil: 3 } }
            );
          }
          if (daysUntilPeriod < -2) {
            const daysLate = Math.abs(daysUntilPeriod);
            await this.createNotification(user._id, 'period', '📅 Period Update',
              `Your period is ${daysLate} days late. This can be normal, but consider tracking any symptoms.`,
              { priority: 'high', actionUrl: '/period-tracker', metadata: { daysLate } }
            );
          }
        }
      }
    } catch (error) {
      console.error('Error checking period reminders:', error);
    }
  }

  async checkMoodReminders() {
    try {
      const users = await User.find({});
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      for (const user of users) {
        const todayMood = await MoodLog.findOne({ userId: user._id, date: { $gte: today } });
        if (!todayMood) {
          const existingReminder = await Notification.findOne({ userId: user._id, type: 'mood', createdAt: { $gte: today } });
          if (!existingReminder) {
            await this.createNotification(user._id, 'mood', '😊 Daily Check-in',
              'How are you feeling today? Take a moment to log your mood.',
              { priority: 'low', actionUrl: '/mood-tracker' }
            );
          }
        }
      }
    } catch (error) {
      console.error('Error checking mood reminders:', error);
    }
  }

  async checkHealthInsights() {
    try {
      const users = await User.find({});
      for (const user of users) {
        const last7Days = new Date();
        last7Days.setDate(last7Days.getDate() - 7);
        const recentMoods = await MoodLog.find({ userId: user._id, date: { $gte: last7Days } });
        if (recentMoods.length >= 6) {
          const existingCelebration = await Notification.findOne({
            userId: user._id, type: 'insight',
            title: { $regex: /consistent/i }, createdAt: { $gte: last7Days }
          });
          if (!existingCelebration) {
            await this.createNotification(user._id, 'insight', '🎯 Great Progress!',
              `You've been tracking consistently! ${recentMoods.length} mood entries this week.`,
              { priority: 'low', actionUrl: '/analytics' }
            );
          }
        }
        if (recentMoods.length >= 5) {
          const sadMoods = recentMoods.filter(m => ['sad', 'angry', 'anxious'].includes(m.mood.toLowerCase())).length;
          if (sadMoods >= 4) {
            const existingSupport = await Notification.findOne({
              userId: user._id, type: 'health',
              title: { $regex: /support/i }, createdAt: { $gte: last7Days }
            });
            if (!existingSupport) {
              await this.createNotification(user._id, 'health', '💝 Self-Care Reminder',
                "You've had some challenging days lately. Remember to be gentle with yourself.",
                { priority: 'high', actionUrl: '/music-therapy' }
              );
            }
          }
        }
      }
    } catch (error) {
      console.error('Error checking health insights:', error);
    }
  }

  async generateDailyInsights() {
    try {
      const users = await User.find({});
      for (const user of users) {
        const latestCycle = await CycleData.findOne({ userId: user._id }).sort({ lastPeriodDate: -1 });
        if (latestCycle) {
          const daysSinceLastPeriod = Math.ceil((new Date() - new Date(latestCycle.lastPeriodDate)) / (1000 * 60 * 60 * 24));
          let phase, phaseMessage;
          if (daysSinceLastPeriod <= 5) { phase = 'menstrual'; phaseMessage = "You're in your menstrual phase. Focus on rest and nourishing foods."; }
          else if (daysSinceLastPeriod <= 13) { phase = 'follicular'; phaseMessage = "You're in your follicular phase! Great time for new projects."; }
          else if (daysSinceLastPeriod <= 17) { phase = 'ovulation'; phaseMessage = "You're in your ovulation phase. You might feel more social and confident!"; }
          else { phase = 'luteal'; phaseMessage = "You're in your luteal phase. Focus on completing projects."; }

          const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
          const existingPhaseInsight = await Notification.findOne({
            userId: user._id, type: 'insight',
            'metadata.phase': phase, createdAt: { $gte: todayStart }
          });
          if (!existingPhaseInsight) {
            await this.createNotification(user._id, 'insight',
              `🌙 ${phase.charAt(0).toUpperCase() + phase.slice(1)} Phase`, phaseMessage,
              { priority: 'low', actionUrl: '/cycle-phases', metadata: { phase, daysSinceLastPeriod } }
            );
          }
        }
      }
    } catch (error) {
      console.error('Error generating daily insights:', error);
    }
  }

  async getUserNotifications(userId, limit = 20, unreadOnly = false) {
    try {
      const query = { userId };
      if (unreadOnly) query.isRead = false;
      return await Notification.find(query).sort({ createdAt: -1 }).limit(limit);
    } catch (error) {
      console.error('Error getting user notifications:', error);
      throw error;
    }
  }

  async markAsRead(notificationId, userId) {
    try {
      return await Notification.findOneAndUpdate({ _id: notificationId, userId }, { isRead: true }, { new: true });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

  async markAllAsRead(userId) {
    try {
      await Notification.updateMany({ userId, isRead: false }, { isRead: true });
      return true;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  }

  async getUnreadCount(userId) {
    try {
      return await Notification.countDocuments({ userId, isRead: false });
    } catch (error) {
      console.error('Error getting unread count:', error);
      throw error;
    }
  }

  async checkInactiveUsers() {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const inactiveUsers = await User.find({ lastActiveDate: { $lt: sevenDaysAgo } });
      for (const user of inactiveUsers) {
        const existingReminder = await Notification.findOne({
          userId: user._id, type: 'reminder',
          title: { $regex: /miss you/i }, createdAt: { $gte: sevenDaysAgo }
        });
        if (!existingReminder) {
          const daysSinceActive = Math.floor((new Date() - new Date(user.lastActiveDate)) / (1000 * 60 * 60 * 24));
          await this.createNotification(user._id, 'reminder', '💕 We Miss You!',
            `You haven't checked in for ${daysSinceActive} days. Your health journey matters!`,
            { priority: 'medium', actionUrl: '/dashboard' }
          );
        }
      }
    } catch (error) {
      console.error('Error checking inactive users:', error);
    }
  }

  async generateMonthlyReport() {
    try {
      const users = await User.find({});
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      const startOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1);
      const endOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0);
      for (const user of users) {
        const cycles = await CycleData.find({ userId: user._id, startDate: { $gte: startOfLastMonth, $lte: endOfLastMonth } });
        const moods = await MoodLog.find({ userId: user._id, date: { $gte: startOfLastMonth, $lte: endOfLastMonth } });
        if (cycles.length === 0 && moods.length === 0) continue;
        const moodScores = { happy: 5, energetic: 5, calm: 4, tired: 2, sad: 1, anxious: 1, angry: 1, stressed: 1 };
        const avgMoodScore = moods.length > 0
          ? (moods.reduce((sum, m) => sum + (moodScores[m.mood] || 3), 0) / moods.length).toFixed(1) : 'N/A';
        const monthName = lastMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
        const reportSummary = { month: monthName, periodsLogged: cycles.length, moodsLogged: moods.length, avgMoodScore, cycleLength: user.cycleLength, generatedAt: new Date() };
        await User.findByIdAndUpdate(user._id, { monthlyReportData: reportSummary });
        await this.createNotification(user._id, 'insight', `📊 Your ${monthName} Health Report is Ready`,
          `Last month: ${cycles.length} period log(s), ${moods.length} mood entries, average mood score: ${avgMoodScore}/5.`,
          { priority: 'medium', actionUrl: '/analytics', metadata: reportSummary }
        );
      }
    } catch (error) {
      console.error('Error generating monthly report:', error);
    }
  }
}

module.exports = new NotificationService();
