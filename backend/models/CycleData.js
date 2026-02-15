const mongoose = require('mongoose');

const cycleDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  cycleLength: {
    type: Number,
    min: 21,
    max: 35
  },
  periodLength: {
    type: Number,
    min: 3,
    max: 8
  },
  symptoms: [{
    type: String,
    enum: ['cramps', 'fatigue', 'bloating', 'back_pain', 'headache', 'mood_swings', 'nausea', 'breast_tenderness']
  }],
  flow: {
    type: String,
    enum: ['light', 'medium', 'heavy'],
    default: 'medium'
  },
  notes: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CycleData', cycleDataSchema);