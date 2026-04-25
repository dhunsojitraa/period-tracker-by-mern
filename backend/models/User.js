const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  dateOfBirth: { type: Date },
  cycleLength: { type: Number, default: 28, min: 21, max: 35 },
  periodLength: { type: Number, default: 5, min: 3, max: 8 },
  lastPeriodDate: { type: Date },
  isActive: { type: Boolean, default: true },
  twoFactorSecret: { type: String, default: null },
  twoFactorEnabled: { type: Boolean, default: false },
  twoFactorBackupCodes: { type: [String], default: [] },
  lastActiveDate: { type: Date, default: Date.now },
  monthlyReportData: { type: Object, default: null }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
