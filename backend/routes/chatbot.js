const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

const SYSTEM_PROMPT = `You are a compassionate, knowledgeable women's health assistant for the app "A Girl's Best Friend". You specialize in menstrual health, reproductive health, sexual health, vaginal health, hormonal health, and general wellness related to the menstrual cycle. Be warm, supportive, non-judgmental, and evidence-based. Always recommend consulting a healthcare provider for personal medical concerns. Never diagnose conditions. Keep responses concise (2-4 paragraphs max).`;

router.post('/message', auth, async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ message: 'Message is required' });
    }

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-openai-api-key-here') {
      return res.status(503).json({ message: 'AI chatbot not configured', error: 'OPENAI_API_KEY not set', fallback: true });
    }

    const user = await User.findById(req.user._id).select('-password');
    let userContext = '';
    if (user.lastPeriodDate) {
      const daysSince = Math.floor((new Date() - new Date(user.lastPeriodDate)) / (1000 * 60 * 60 * 24));
      const cycle = user.cycleLength || 28;
      let phase = 'unknown';
      if (daysSince <= (user.periodLength || 5)) phase = 'menstrual';
      else if (daysSince <= Math.floor(cycle / 2) - 2) phase = 'follicular';
      else if (daysSince <= Math.floor(cycle / 2) + 2) phase = 'ovulation';
      else phase = 'luteal';
      userContext = `\n\nUser context: Currently in ${phase} phase (day ${daysSince} of cycle). Cycle length: ${cycle} days.`;
    }

    const OpenAI = require('openai');
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT + userContext },
      ...conversationHistory.slice(-8),
      { role: 'user', content: message }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    res.json({ reply: completion.choices[0].message.content, model: 'gpt-3.5-turbo', usage: completion.usage });

  } catch (error) {
    console.error('Chatbot error:', error);
    if (error.status === 401) return res.status(401).json({ message: 'Invalid OpenAI API key', fallback: true });
    if (error.status === 429) return res.status(429).json({ message: 'Rate limit reached. Please wait a moment.', fallback: true });
    if (error.status === 402) return res.status(402).json({ message: 'OpenAI quota exceeded.', fallback: true });
    res.status(500).json({ message: 'AI service error', fallback: true });
  }
});

module.exports = router;
