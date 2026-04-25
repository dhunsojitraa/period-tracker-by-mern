# Quick Start Guide - A Girl's Best Friend

## To Run the Application

### Step 1: Open Terminal
Navigate to your project directory:
```bash
cd path/to/minor
```

### Step 2: Start MongoDB
Check if MongoDB is running:
```bash
Get-Service -Name "*mongo*"
```

If not running, start it (run as Administrator):
```bash
net start MongoDB
```

### Step 3: Start the Application
Run both frontend and backend together:
```bash
npm run dev
```

### Step 4: Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB Compass: mongodb://localhost:27017

## Run Separately (if needed)

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

## Troubleshooting

If MongoDB connection fails:
1. Check MongoDB service: `Get-Service -Name "*mongo*"`
2. Start if needed: `net start MongoDB`
3. Restart the app: `npm run dev`

If ports are busy:
- Frontend runs on port 3000
- Backend runs on port 5000
- MongoDB runs on port 27017

Kill existing Node processes:
```bash
taskkill /IM node.exe /F
```

If dependencies are missing:
```bash
npm run install-all
```

## Quick Commands Summary
```bash
cd minor
npm run dev
```

Access the app at http://localhost:3000
