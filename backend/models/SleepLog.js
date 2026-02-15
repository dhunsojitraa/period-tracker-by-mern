const mongoose = require('mongoose');

const sleepLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  bedtime: {
    type: String, // Format: "22:30"
    required: true
  },
  wakeTime: {
    type: String, // Format: "07:00"
    required: true
  },
  sleepDuration: {
    type: Number, // Hours (calculated)
    required: true
  },
  sleepQuality: {
    type: Number, // 1-10 scale
    required: true,
    min: 1,
    max: 10
  },
  energyLevel: {
    type: Number, // 1-10 scale
    required: true,
    min: 1,
    max: 10
  },
  sleepDisruptions: [{
    type: String,
    enum: [
      'frequent_waking',
      'difficulty_falling_asleep',
      'early_waking',
      'restless_sleep',
      'nightmares',
      'hot_flashes',
      'cramps',
      'bathroom_breaks',
      'stress',
      'noise',
      'other'
    ]
  }],
  sleepAids: [{
    type: String,
    enum: [
      'melatonin',
      'herbal_tea',
      'meditation',
      'white_noise',
      'essential_oils',
      'reading',
      'warm_bath',
      'breathing_exercises',
      'other'
    ]
  }],
  notes: {
    type: String,
    maxlength: 500
  },
  // Calculated fields
  sleepEfficiency: {
    type: Number // Percentage of time in bed actually sleeping
  },
  cyclePhase: {
    type: String,
    enum: ['menstrual', 'follicular', 'ovulation', 'luteal']
  }
}, {
  timestamps: true
});

// Index for efficient queries
sleepLogSchema.index({ userId: 1, date: -1 });
sleepLogSchema.index({ userId: 1, createdAt: -1 });

// Calculate sleep duration before saving
sleepLogSchema.pre('save', function(next) {
  if (this.bedtime && this.wakeTime) {
    const bedtime = this.bedtime.split(':');
    const wakeTime = this.wakeTime.split(':');
    
    let bedtimeMinutes = parseInt(bedtime[0]) * 60 + parseInt(bedtime[1]);
    let wakeTimeMinutes = parseInt(wakeTime[0]) * 60 + parseInt(wakeTime[1]);
    
    // Handle overnight sleep (wake time next day)
    if (wakeTimeMinutes < bedtimeMinutes) {
      wakeTimeMinutes += 24 * 60; // Add 24 hours
    }
    
    const durationMinutes = wakeTimeMinutes - bedtimeMinutes;
    this.sleepDuration = Math.round((durationMinutes / 60) * 10) / 10; // Round to 1 decimal
    
    // Calculate sleep efficiency (assuming 85% is good)
    this.sleepEfficiency = Math.min(100, Math.round((this.sleepQuality / 10) * 100));
  }
  next();
});

module.exports = mongoose.model('SleepLog', sleepLogSchema);