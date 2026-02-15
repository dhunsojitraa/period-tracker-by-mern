const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const SleepLog = require('../models/SleepLog');
const CycleData = require('../models/CycleData');

// Get sleep logs for a user
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate, limit = 30 } = req.query;
    
    let query = { userId };
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    
    const sleepLogs = await SleepLog.find(query)
      .sort({ date: -1 })
      .limit(parseInt(limit));
    
    res.json({ sleepLogs });
  } catch (error) {
    console.error('Error fetching sleep logs:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get sleep log for a specific date
router.get('/date/:date', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const date = new Date(req.params.date);
    
    const sleepLog = await SleepLog.findOne({ userId, date });
    
    res.json({ sleepLog });
  } catch (error) {
    console.error('Error fetching sleep log:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create or update sleep log
router.post('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      date,
      bedtime,
      wakeTime,
      sleepQuality,
      energyLevel,
      sleepDisruptions,
      sleepAids,
      notes
    } = req.body;

    // Validate required fields
    if (!date || !bedtime || !wakeTime || !sleepQuality || !energyLevel) {
      return res.status(400).json({ 
        message: 'Date, bedtime, wake time, sleep quality, and energy level are required' 
      });
    }

    // Determine cycle phase
    let cyclePhase = null;
    const latestCycle = await CycleData.findOne({ userId }).sort({ lastPeriodDate: -1 });
    
    if (latestCycle) {
      const logDate = new Date(date);
      const lastPeriod = new Date(latestCycle.lastPeriodDate);
      const daysSinceLastPeriod = Math.ceil((logDate - lastPeriod) / (1000 * 60 * 60 * 24));
      
      if (daysSinceLastPeriod <= 5) {
        cyclePhase = 'menstrual';
      } else if (daysSinceLastPeriod <= 13) {
        cyclePhase = 'follicular';
      } else if (daysSinceLastPeriod <= 17) {
        cyclePhase = 'ovulation';
      } else {
        cyclePhase = 'luteal';
      }
    }

    // Check if sleep log already exists for this date
    let sleepLog = await SleepLog.findOne({ userId, date: new Date(date) });
    
    if (sleepLog) {
      // Update existing log
      sleepLog.bedtime = bedtime;
      sleepLog.wakeTime = wakeTime;
      sleepLog.sleepQuality = sleepQuality;
      sleepLog.energyLevel = energyLevel;
      sleepLog.sleepDisruptions = sleepDisruptions || [];
      sleepLog.sleepAids = sleepAids || [];
      sleepLog.notes = notes || '';
      sleepLog.cyclePhase = cyclePhase;
      
      await sleepLog.save();
    } else {
      // Create new log
      sleepLog = new SleepLog({
        userId,
        date: new Date(date),
        bedtime,
        wakeTime,
        sleepQuality,
        energyLevel,
        sleepDisruptions: sleepDisruptions || [],
        sleepAids: sleepAids || [],
        notes: notes || '',
        cyclePhase
      });
      
      await sleepLog.save();
    }

    res.status(201).json({ sleepLog });
  } catch (error) {
    console.error('Error creating/updating sleep log:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete sleep log
router.delete('/:id', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const sleepLogId = req.params.id;
    
    const sleepLog = await SleepLog.findOneAndDelete({ _id: sleepLogId, userId });
    
    if (!sleepLog) {
      return res.status(404).json({ message: 'Sleep log not found' });
    }
    
    res.json({ message: 'Sleep log deleted successfully' });
  } catch (error) {
    console.error('Error deleting sleep log:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get sleep analytics
router.get('/analytics', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get last 30 days of sleep data
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const sleepLogs = await SleepLog.find({
      userId,
      date: { $gte: thirtyDaysAgo }
    }).sort({ date: -1 });

    if (sleepLogs.length === 0) {
      return res.json({
        averageSleepDuration: 0,
        averageSleepQuality: 0,
        averageEnergyLevel: 0,
        sleepEfficiency: 0,
        totalNights: 0,
        sleepTrends: [],
        phaseAnalysis: {}
      });
    }

    // Calculate averages
    const totalDuration = sleepLogs.reduce((sum, log) => sum + log.sleepDuration, 0);
    const totalQuality = sleepLogs.reduce((sum, log) => sum + log.sleepQuality, 0);
    const totalEnergy = sleepLogs.reduce((sum, log) => sum + log.energyLevel, 0);
    const totalEfficiency = sleepLogs.reduce((sum, log) => sum + (log.sleepEfficiency || 0), 0);

    const averageSleepDuration = (totalDuration / sleepLogs.length).toFixed(1);
    const averageSleepQuality = (totalQuality / sleepLogs.length).toFixed(1);
    const averageEnergyLevel = (totalEnergy / sleepLogs.length).toFixed(1);
    const sleepEfficiency = Math.round(totalEfficiency / sleepLogs.length);

    // Sleep trends (last 14 days)
    const sleepTrends = sleepLogs.slice(0, 14).reverse().map(log => ({
      date: log.date,
      duration: log.sleepDuration,
      quality: log.sleepQuality,
      energy: log.energyLevel
    }));

    // Phase analysis
    const phaseAnalysis = {};
    const phases = ['menstrual', 'follicular', 'ovulation', 'luteal'];
    
    phases.forEach(phase => {
      const phaseLogs = sleepLogs.filter(log => log.cyclePhase === phase);
      if (phaseLogs.length > 0) {
        phaseAnalysis[phase] = {
          count: phaseLogs.length,
          avgDuration: (phaseLogs.reduce((sum, log) => sum + log.sleepDuration, 0) / phaseLogs.length).toFixed(1),
          avgQuality: (phaseLogs.reduce((sum, log) => sum + log.sleepQuality, 0) / phaseLogs.length).toFixed(1),
          avgEnergy: (phaseLogs.reduce((sum, log) => sum + log.energyLevel, 0) / phaseLogs.length).toFixed(1)
        };
      }
    });

    // Common disruptions
    const allDisruptions = sleepLogs.flatMap(log => log.sleepDisruptions);
    const disruptionCounts = {};
    allDisruptions.forEach(disruption => {
      disruptionCounts[disruption] = (disruptionCounts[disruption] || 0) + 1;
    });

    // Sleep quality distribution
    const qualityDistribution = {};
    sleepLogs.forEach(log => {
      const quality = log.sleepQuality;
      if (quality <= 3) qualityDistribution.poor = (qualityDistribution.poor || 0) + 1;
      else if (quality <= 6) qualityDistribution.fair = (qualityDistribution.fair || 0) + 1;
      else if (quality <= 8) qualityDistribution.good = (qualityDistribution.good || 0) + 1;
      else qualityDistribution.excellent = (qualityDistribution.excellent || 0) + 1;
    });

    res.json({
      averageSleepDuration: parseFloat(averageSleepDuration),
      averageSleepQuality: parseFloat(averageSleepQuality),
      averageEnergyLevel: parseFloat(averageEnergyLevel),
      sleepEfficiency,
      totalNights: sleepLogs.length,
      sleepTrends,
      phaseAnalysis,
      commonDisruptions: disruptionCounts,
      qualityDistribution
    });

  } catch (error) {
    console.error('Error fetching sleep analytics:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;