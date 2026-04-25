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
const chatbotRoutes = require('./routes/chatbot');
const notificationService = require('./services/notificationService');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.json({
    message: "A Girl's Best Friend API Server",
    status: 'Running',
    version: '1.0.0',
    endpoints: { auth: '/api/auth', cycle: '/api/cycle', mood: '/api/mood', user: '/api/user', analytics: '/api/analytics', notifications: '/api/notifications', twoFactor: '/api/2fa', sleep: '/api/sleep', health: '/api/health' }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/cycle', cycleRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/user', userRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/2fa', twoFactorRoutes);
app.use('/api/sleep', sleepRoutes);
app.use('/api/chatbot', chatbotRoutes);

app.get('/api/health', (req, res) => {
  res.json({ message: "A Girl's Best Friend API is running!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });
