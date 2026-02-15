const mongoose = require('mongoose');

const moodLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  mood: {
    type: String,
    required: true,
    enum: ['happy', 'sad', 'angry', 'anxious', 'calm', 'tired', 'energetic', 'stressed']
  },
  intensity: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
  },
  notes: {
    type: String,
    maxlength: 300
  },
  triggers: [{
    type: String
  }]
}, {
  timestamps: true
});

// Ensure one mood log per user per day
moodLogSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('MoodLog', moodLogSchema);