# A Girl's Best Friend 🌸

A comprehensive menstrual health, mood, and wellness tracking platform built with the MERN stack. Designed to be your digital best friend for menstrual and emotional wellness.

## ✨ Features

### 🔐 User Authentication
- Secure JWT-based login/signup
- Password hashing with bcrypt
- User profile management with cycle preferences

### 📅 Period Tracking
- Smart cycle predictions
- Calendar view with period days, fertile window, and ovulation
- Cycle history and statistics
- Customizable cycle and period length

### 😊 Mood Tracking
- Daily mood logging with intensity levels
- Mood history visualization with charts
- Pattern recognition and insights
- Trigger identification

### 🌙 Educational Content
- **Cycle Phases**: Detailed information about all 4 menstrual phases
  - Hormonal changes explanation
  - Physical and emotional changes
  - Diet recommendations (what to eat/avoid)
  - Exercise suggestions
  - Yoga poses with YouTube links
  - Self-care tips

### 💊 Symptoms & Remedies
- 8 common period symptoms with detailed pages
- Natural remedies and relief tips
- Yoga poses and exercises for each symptom
- Lifestyle recommendations
- When to seek medical help

### 🧬 Fertility Education
- Fertility awareness information
- Ovulation and reproductive health education
- Healthy habits for fertility

### 🌼 Menopause Support
- Comprehensive menopause education
- Symptom management
- Hormonal changes explanation
- Diet and exercise recommendations

### 🎵 Music Therapy
- Curated playlists for different moods
- Embedded YouTube/Spotify links
- Mood-based music recommendations

## 🛠️ Tech Stack

### Frontend
- **React.js** (JavaScript)
- **React Router** for navigation
- **Chart.js** for mood visualization
- **React Calendar** for cycle tracking
- **Axios** for API calls
- **React Hot Toast** for notifications

### Backend
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Express Validator** for input validation
- **CORS** for cross-origin requests

### Styling
- **CSS3** with custom properties
- **Soft pastel theme** (pink, lavender, mint, cream)
- **Mobile-responsive design**
- **Rounded cards and gentle shadows**

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd worlds-best-friend
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   
   Create `backend/.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/worlds-best-friend
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Run the application**
   ```bash
   # Development mode (runs both frontend and backend)
   npm run dev
   
   # Or run separately:
   # Backend only
   npm run server
   
   # Frontend only
   npm run client
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
worlds-best-friend/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── CycleData.js
│   │   └── MoodLog.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── cycle.js
│   │   ├── mood.js
│   │   └── user.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── ProtectedRoute.js
│   │   ├── contexts/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── PeriodTracker.js
│   │   │   ├── MoodTracker.js
│   │   │   ├── CyclePhases.js
│   │   │   ├── Symptoms.js
│   │   │   └── [other pages]
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── package.json
└── README.md
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Cycle Tracking
- `POST /api/cycle/period` - Log period
- `GET /api/cycle/predictions` - Get cycle predictions
- `GET /api/cycle/history` - Get cycle history
- `PUT /api/cycle/settings` - Update cycle settings

### Mood Tracking
- `POST /api/mood/log` - Log daily mood
- `GET /api/mood/history` - Get mood history
- `GET /api/mood/today` - Get today's mood
- `GET /api/mood/patterns` - Get mood patterns

### User Management
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/cycle-preferences` - Update cycle preferences
- `GET /api/user/dashboard` - Get dashboard data

## 🎨 Design Philosophy

### Color Palette
- **Primary Pink**: #f8b4d9
- **Secondary Purple**: #d1a7dd
- **Mint Green**: #68d391
- **Cream**: #fef7ff
- **Soft Lavender**: #f8f4ff

### UI/UX Principles
- **Compassionate Design**: Built with empathy for women's health journey
- **Accessibility**: High contrast ratios and readable fonts
- **Mobile-First**: Responsive design for all devices
- **Gentle Aesthetics**: Rounded corners, soft shadows, calming colors
- **Supportive Tone**: Friendly, non-judgmental language throughout

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for secure cross-origin requests
- **Environment Variables**: Sensitive data stored securely
- **No Third-Party Data Sharing**: Privacy-first approach

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- **Desktop**: Full feature set with optimal layout
- **Tablet**: Adapted grid layouts and touch-friendly interfaces
- **Mobile**: Streamlined navigation and thumb-friendly controls

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Medical information sourced from reputable health organizations
- Yoga pose tutorials linked from certified instructors
- Design inspiration from modern wellness applications
- Community feedback from women's health advocates

## 📞 Support

For support, email support@worldsbestfriend.com or create an issue in the repository.

---

**A Girl's Best Friend** - Your compassionate companion for menstrual health and wellness 💝