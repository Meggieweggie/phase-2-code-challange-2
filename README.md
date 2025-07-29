# Smart Goal Planner - Phase 2 Code Challenge

A React-based fintech application for managing multiple savings goals with full CRUD functionality.

## Project Overview

The Smart Goal Planner allows users to:
- Create and manage multiple financial goals
- Track progress with visual indicators
- Make deposits to specific goals
- Monitor deadlines and completion status
- View comprehensive savings overview

## Technology Stack

- **Frontend**: React 19 with Vite
- **Backend**: JSON Server (REST API)
- **Database**: db.json file
- **Styling**: CSS3

## Quick Start

1. Navigate to the SGP directory:
   ```bash
   cd SGP
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start JSON Server (Terminal 1):
   ```bash
   npm run server
   ```

4. Start React App (Terminal 2):
   ```bash
   npm run dev
   ```

5. Open http://localhost:5173 in your browser

## Features

- ✅ Full CRUD operations for goals
- ✅ Progress tracking with visual bars
- ✅ Deposit management system
- ✅ Deadline warnings and overdue alerts
- ✅ Overview dashboard with statistics
- ✅ Responsive design

## Project Structure

```
SGP/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   └── main.jsx         # React entry point
├── db.json              # JSON database
├── package.json         # Dependencies and scripts
└── README.md           # Detailed documentation
```

For detailed setup instructions and API documentation, see [SGP/README.md](SGP/README.md).