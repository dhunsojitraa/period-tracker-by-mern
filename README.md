# A Girl's Best Friend

A comprehensive menstrual health, mood, and wellness tracking platform built with the MERN stack.

## Features

### User Authentication
- Secure JWT-based login/signup
- Password hashing with bcrypt
- Two-Factor Authentication (TOTP)
- User profile management with cycle preferences

### Period Tracking
- Bayesian cycle predictions
- Calendar view with period days, fertile window, and ovulation
- 6-month forecast
- Cycle history and statistics
- Customizable cycle and period length

### Mood Tracking
- Daily mood logging with intensity levels
- Mood history visualization with charts
- Pattern recognition and insights

### Analytics Dashboard
- Health score (cycle regularity, mood consistency, tracking habit)
- Weekly digest card
- Interactive charts using Chart.js
- MongoDB aggregation pipelines for data processing

### Smart Notifications
- Automated period reminders (3 days before)
- Daily mood check-ins
- Inactivity detection
- Monthly health reports
- Instant symptom tips on period log

### Two-Factor Authentication
- TOTP-based 2FA using Speakeasy
- QR code generation for authenticator apps
- 10 backup codes per user

### Educational Content
- Cycle phases information
- Fertility education
- Menopause resources
- Symptom library
- Sex education with Q&A

### AI Health Chatbot
- OpenAI GPT-3.5-turbo integration
- Fallback knowledge base (40+ health topics)
- Context-aware responses based on cycle phase

### Sleep Tracker
- Sleep duration and quality logging
- Cycle phase correlation

### Music Therapy
- Mood-based playlist recommendations

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Chart.js + react-chartjs-2
- Axios
- React Calendar
- React Hot Toast
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Speakeasy (2FA)
- node-cron
- express-validator
- OpenAI SDK

### Machine Learning
- Bayesian Gaussian Inference (custom implementation)
- Posterior mean and variance calculation
- Confidence scoring and interval estimation

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd minor
   ```

2. Install all dependencies
   ```bash
   npm run install-all
   ```

3. Set up environment variables in `backend/.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/worlds-best-friend
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   OPENAI_API_KEY=your-openai-api-key-here
   ```

4. Start MongoDB service
   ```bash
   net start MongoDB
   ```

5. Run the application
   ```bash
   npm run dev
   ```

6. Access the application
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Project Structure

```
minor/
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── CycleData.js
│   │   ├── MoodLog.js
│   │   ├── Notification.js
│   │   └── SleepLog.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── cycle.js
│   │   ├── mood.js
│   │   ├── user.js
│   │   ├── analytics.js
│   │   ├── notifications.js
│   │   ├── twoFactor.js
│   │   ├── sleep.js
│   │   └── chatbot.js
│   ├── services/
│   │   ├── notificationService.js
│   │   └── bayesianPrediction.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
└── package.json
```

## API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

### Cycle Tracking
- POST /api/cycle/period
- GET /api/cycle/predictions
- GET /api/cycle/history
- PUT /api/cycle/settings

### Mood Tracking
- POST /api/mood/log
- GET /api/mood/history
- GET /api/mood/today
- GET /api/mood/patterns

### User
- PUT /api/user/profile
- PUT /api/user/cycle-preferences
- GET /api/user/dashboard
- GET /api/user/health-score

### Analytics
- GET /api/analytics/cycle
- GET /api/analytics/mood
- GET /api/analytics/insights
- GET /api/analytics/monthly-report

### Notifications
- GET /api/notifications
- GET /api/notifications/unread-count
- PATCH /api/notifications/:id/read
- PATCH /api/notifications/mark-all-read

### Two-Factor Authentication
- POST /api/2fa/setup
- POST /api/2fa/verify
- POST /api/2fa/validate
- POST /api/2fa/disable
- GET /api/2fa/status

### Chatbot
- POST /api/chatbot/message

## Security

- Password hashing with bcrypt (salt rounds: 10)
- JWT tokens with 7-day expiry
- Two-Factor Authentication (TOTP)
- Auth middleware on all protected routes
- Input validation with express-validator
- CORS configuration
- Environment variables for sensitive data

## License

MIT License

---

**A Girl's Best Friend** - Menstrual health and wellness platform
