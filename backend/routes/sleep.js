const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const SleepLog = require('../models/SleepLog');
const CycleData = require('../models/CycleData');

router.get('/', auth, async (req, res) => {
  try {
    const { startDate, endDate, limit = 30 } = req.query;
    let query = { userId: req.user.id };
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    const sleepLogs = await SleepLog.find(query).sort({ date: -1 }).limit(parseInt(limit));
    res.json({ sleepLogs });
  } catch (error) {
    console.error('Error fetching sleep logs:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/date/:date', auth, async (req, res) => {
  try {
    const sleepLog = await SleepLog.findOne({ userId: req.user.id, date: new Date(req.params.date) });
    res.json({ sleepLog });
  } catch (error) {
    console.error('Error fetching sleep log:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { date, bedtime, wakeTime, sleepQuality, energyLevel, sleepDisruptions, sleepAids, notes } = req.body;
    if (!date || !bedtime || !wakeTime || !sleepQuality || !energyLevel) {
      return res.status(400).json({ message: 'Date, bedtime, wake time, sleep quality, and energy level are required' });
    }
    let cyclePhase = null;
    const latestCycle = await CycleData.findOne({ userId: req.user.id }).sort({ lastPeriodDate: -1 });
    if (latestCycle) {
      const daysSinceLastPeriod = Math.ceil((new Date(date) - new Date(latestCycle.lastPeriodDate)) / (1000 * 60 * 60 * 24));
      if (daysSinceLastPeriod <= 5) cyclePhase = 'menstrual';
      else if (daysSinceLastPeriod <= 13) cyclePhase = 'follicular';
      else if (daysSinceLastPeriod <= 17) cyclePhase = 'ovulation';
      else cyclePhase = 'luteal';
    }
    let sleepLog = await SleepLog.findOne({ userId: req.user.id, date: new Date(date) });
    if (sleepLog) {
      sleepLog.bedtime = bedtime; sleepLog.wakeTime = wakeTime;
      sleepLog.sleepQuality = sleepQuality; sleepLog.energyLevel = energyLevel;
      sleepLog.sleepDisruptions = sleepDisruptions || []; sleepLog.sleepAids = sleepAids || [];
      sleepLog.notes = notes || ''; sleepLog.cyclePhase = cyclePhase;
      await sleepLog.save();
    } else {
      sleepLog = new SleepLog({
        userId: req.user.id, date: new Date(date), bedtime, wakeTime,
        sleepQuality, energyLevel, sleepDisruptions: sleepDisruptions || [],
        sleepAids: sleepAids || [], notes: notes || '', cyclePhase
      });
      await sleepLog.save();
    }
    res.status(201).json({ sleepLog });
  } catch (error) {
    console.error('Error creating/updating sleep log:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const sleepLog = await SleepLog.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!sleepLog) return res.status(404).json({ message: 'Sleep log not found' });
    res.json({ message: 'Sleep log deleted successfully' });
  } catch (error) {
    console.error('Error deleting sleep log:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/analytics', auth, async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const sleepLogs = await SleepLog.find({ userId: req.user.id, date: { $gte: thirtyDaysAgo } }).sort({ date: -1 });
    if (sleepLogs.length === 0) {
      return res.json({ averageSleepDuration: 0, averageSleepQuality: 0, averageEnergyLevel: 0, sleepEfficiency: 0, totalNights: 0, sleepTrends: [], phaseAnalysis: {} });
    }
    const avg = (arr, key) => (arr.reduce((sum, log) => sum + log[key], 0) / arr.length).toFixed(1);
    const sleepTrends = sleepLogs.slice(0, 14).reverse().map(log => ({ date: log.date, duration: log.sleepDuration, quality: log.sleepQuality, energy: log.energyLevel }));
    const phaseAnalysis = {};
    ['menstrual', 'follicular', 'ovulation', 'luteal'].forEach(phase => {
      const phaseLogs = sleepLogs.filter(log => log.cyclePhase === phase);
      if (phaseLogs.length > 0) {
        phaseAnalysis[phase] = { count: phaseLogs.length, avgDuration: avg(phaseLogs, 'sleepDuration'), avgQuality: avg(phaseLogs, 'sleepQuality'), avgEnergy: avg(phaseLogs, 'energyLevel') };
      }
    });
    const disruptionCounts = {};
    sleepLogs.flatMap(log => log.sleepDisruptions).forEach(d => { disruptionCounts[d] = (disruptionCounts[d] || 0) + 1; });
    const qualityDistribution = {};
    sleepLogs.forEach(log => {
      const q = log.sleepQuality;
      if (q <= 3) qualityDistribution.poor = (qualityDistribution.poor || 0) + 1;
      else if (q <= 6) qualityDistribution.fair = (qualityDistribution.fair || 0) + 1;
      else if (q <= 8) qualityDistribution.good = (qualityDistribution.good || 0) + 1;
      else qualityDistribution.excellent = (qualityDistribution.excellent || 0) + 1;
    });
    res.json({
      averageSleepDuration: parseFloat(avg(sleepLogs, 'sleepDuration')),
      averageSleepQuality: parseFloat(avg(sleepLogs, 'sleepQuality')),
      averageEnergyLevel: parseFloat(avg(sleepLogs, 'energyLevel')),
      sleepEfficiency: Math.round(sleepLogs.reduce((sum, log) => sum + (log.sleepEfficiency || 0), 0) / sleepLogs.length),
      totalNights: sleepLogs.length, sleepTrends, phaseAnalysis,
      commonDisruptions: disruptionCounts, qualityDistribution
    });
  } catch (error) {
    console.error('Error fetching sleep analytics:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
