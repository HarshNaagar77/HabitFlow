# Habit Tracker App

A full-stack social habit tracker built with React, Node.js, Express, and MongoDB.

## Features
- User registration and login (JWT auth)
- Dashboard for habit tracking (CRUD)
- Tag/categorize habits and filter
- Friends feed, follow/unfollow
- Leaderboard (streaks)
- Responsive dark UI

## Prerequisites
- Node.js (v16+ recommended)
- npm (comes with Node.js)
- MongoDB (local or Atlas)

## Setup Instructions

### 1. Clone the repository
```sh
git clone <your-repo-url>
cd intern
```

### 2. Install dependencies
#### For the backend:
```sh
cd server
npm install
```
#### For the frontend:
```sh
cd ../client
npm install
```

### 3. Configure environment variables
- Copy `.env.example` to `.env` in the `server` folder and fill in your MongoDB URI and JWT secret.

### 4. Start MongoDB
- Make sure your MongoDB server is running (local or Atlas).

### 5. Run the backend server
```sh
cd server
npm run dev
```
- The backend will run on `http://localhost:5000` by default.

### 6. Run the frontend React app
```sh
cd ../client
npm start
```
- The frontend will run on `http://localhost:3000` by default.

## Usage
- Register a new account or log in.
- Add, edit, or delete habits from your dashboard.
- Tag habits and filter by tags.
- Add friends, follow/unfollow, and view their activity feed.
- Check the leaderboard for top streaks.

## Folder Structure
```
/intern
  /client    # React frontend
  /server    # Node.js/Express backend
```

## Troubleshooting
- If you get MongoDB connection errors, check your `.env` and MongoDB server status.
- For CORS issues, make sure both servers are running and ports match in API calls.

## License
MIT
