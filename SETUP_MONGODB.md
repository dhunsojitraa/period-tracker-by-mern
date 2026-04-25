# MongoDB Setup Guide

## Option 1: Install MongoDB Community Edition (Recommended)

1. Download MongoDB Community Edition
   - Go to https://www.mongodb.com/try/download/community
   - Select Windows, Version 7.0, Package: msi
   - Download and run the installer

2. Install MongoDB
   - Run the downloaded .msi file
   - Choose "Complete" installation
   - Install MongoDB as a Service
   - Install MongoDB Compass (optional GUI tool)

3. Verify Installation
   ```bash
   mongod --version
   ```

4. Start MongoDB Service
   ```bash
   net start MongoDB
   ```

## Option 2: Use MongoDB Atlas (Cloud Database)

1. Create Free Account at https://www.mongodb.com/atlas

2. Create a Cluster
   - Create a free M0 cluster
   - Choose a cloud provider and region
   - Create a database user
   - Add your IP address to the whitelist

3. Get Connection String
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

4. Update Backend Configuration
   - Replace MONGODB_URI in `backend/.env` with your Atlas connection string
   - Example: `MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/worlds-best-friend`

## Option 3: Use Docker

```bash
docker run --name mongodb -d -p 27017:27017 mongo:latest
```

## Current Status

- Frontend: Running on http://localhost:3000
- Backend: Running on http://localhost:5000
- Database: Requires MongoDB to be running

## Features Requiring MongoDB

- User registration and login
- Period tracking
- Mood tracking
- Dashboard data
- Notifications
- Analytics

## Next Steps

1. Choose one of the MongoDB setup options above
2. Start MongoDB service
3. The backend will automatically connect
4. All features will be fully functional
