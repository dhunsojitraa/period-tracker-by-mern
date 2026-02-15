# 🚀 Quick Start Guide for A Girl's Best Friend

## To Run the Application Again

### 1. Open Terminal/Command Prompt
Navigate to your project directory:
```bash
cd path/to/worlds-best-friend
```

### 2. Start MongoDB (if not running)
Check if MongoDB is running:
```bash
Get-Service -Name "*mongo*"
```

If not running, start it:
```bash
net start MongoDB
```
*(Run as Administrator if you get access denied)*

### 3. Start the Application
Run both frontend and backend together:
```bash
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB Compass**: mongodb://localhost:27017

## That's It! 🎉

The application will be fully functional with all features:
- ✅ User registration/login
- ✅ Period tracking
- ✅ Mood tracking  
- ✅ Educational content
- ✅ Music therapy
- ✅ Dashboard

## Alternative: Run Separately (if needed)

If you want to run frontend and backend separately:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

## Troubleshooting

**If MongoDB connection fails:**
1. Check MongoDB service: `Get-Service -Name "*mongo*"`
2. Start if needed: `net start MongoDB`
3. Restart the app: `npm run dev`

**If ports are busy:**
- Frontend runs on port 3000
- Backend runs on port 5000
- MongoDB runs on port 27017

**If dependencies are missing:**
```bash
npm run install-all
```

## Quick Commands Summary
```bash
# Navigate to project
cd minor

# Start everything
npm run dev

# Access app
# http://localhost:3000
```

**That's all you need! 🌸💕**