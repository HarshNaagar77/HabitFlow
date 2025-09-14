# HabitFlow – Documentation

## Approach
I designed and implemented HabitFlow as a full-stack MERN app with a focus on clean UI/UX, robust backend, and social accountability features.

- **Frontend**: React + Tailwind for a modern, responsive UI
- **Backend**: Node.js + Express with JWT authentication
- **Database**: MongoDB to store users, habits, check-ins, and follow relationships
- **Deployment**: Backend hosted on Render, frontend also hosted on Render

## Key Features
- Secure authentication (JWT)
- Habit creation, editing, and deletion
- Progress tracking with streaks
- Friends’ activity feed for accountability
- Edge case handling (no duplicate habits, no multiple check-ins per day, no self-follow)

## Challenges & Solutions
- **Authentication & Security**: Implemented JWT tokens and password hashing to ensure safe login.  
- **Database Modeling**: Needed efficient schema for habits and check-ins; solved with relational references in MongoDB.  
- **Deployment Issues**: Faced downtime on free Render plan; optimized build size and ensured CORS settings were correct.  

## Outcome
Successfully built a deployed habit tracker app demonstrating full-stack skills and ownership of end-to-end development.
