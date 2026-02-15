const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const cycleRoutes = require('./routes/cycle');
const moodRoutes = require('./routes/mood');
const userRoutes = require('./routes/user');
const analyticsRoutes = require('./routes/analytics');
const notificationRoutes = require('./routes/notifications');
const twoFactorRoutes = require('./routes/twoFactor');
const sleepRoutes = require('./routes/sleep');

// Initialize notification service
const notificationService = require('./services/notificationService');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cycle', cycleRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/user', userRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/2fa', twoFactorRoutes);
app.use('/api/sleep', sleepRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'World\'s Best Friend API is running with notifications and 2FA!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});