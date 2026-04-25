const mongoose = require('mongoose');

const sleepLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  bedtime: { type: String, required: true },
  wakeTime: { type: String, required: true },
  sleepDuration: { type: Number, required: true },
  sleepQuality: { type: Number, required: true, min: 1, max: 10 },
  energyLevel: { type: Number, required: true, min: 1, max: 10 },
  sleepDisruptions: [{ type: String, enum: ['frequent_waking', 'difficulty_falling_asleep', 'early_waking', 'restless_sleep', 'nightmares', 'hot_flashes', 'cramps', 'bathroom_breaks', 'stress', 'noise', 'other'] }],
  sleepAids: [{ type: String, enum: ['melatonin', 'herbal_tea', 'meditation', 'white_noise', 'essential_oils', 'reading', 'warm_bath', 'breathing_exercises', 'other'] }],
  notes: { type: String, maxlength: 500 },
  sleepEfficiency: { type: Number },
  cyclePhase: { type: String, enum: ['menstrual', 'follicular', 'ovulation', 'luteal'] }
}, { timestamps: true });

sleepLogSchema.index({ userId: 1, date: -1 });
sleepLogSchema.index({ userId: 1, createdAt: -1 });

sleepLogSchema.pre('save', function(next) {
  if (this.bedtime && this.wakeTime) {
    const bedtime = this.bedtime.split(':');
    const wakeTime = this.wakeTime.split(':');
    let bedtimeMinutes = parseInt(bedtime[0]) * 60 + parseInt(bedtime[1]);
    let wakeTimeMinutes = parseInt(wakeTime[0]) * 60 + parseInt(wakeTime[1]);
    if (wakeTimeMinutes < bedtimeMinutes) wakeTimeMinutes += 24 * 60;
    this.sleepDuration = Math.round(((wakeTimeMinutes - bedtimeMinutes) / 60) * 10) / 10;
    this.sleepEfficiency = Math.min(100, Math.round((this.sleepQuality / 10) * 100));
  }
  next();
});

module.exports = mongoose.model('SleepLog', sleepLogSchema);
