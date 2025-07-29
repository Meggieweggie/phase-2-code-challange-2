# Smart Goal Planner

A React-based financial goal management application that allows users to create, track, and manage multiple savings goals.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete financial goals
- **Progress Tracking**: Visual progress bars and completion percentages
- **Deposit Management**: Make deposits to specific goals
- **Deadline Monitoring**: Warnings for approaching deadlines and overdue goals
- **Overview Dashboard**: Total goals, savings, and completion statistics

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the JSON Server** (in one terminal)
   ```bash
   npm run server
   ```
   This will start the API server at http://localhost:3000

3. **Start the React App** (in another terminal)
   ```bash
   npm run dev
   ```
   This will start the development server at http://localhost:5173

## API Endpoints

- `GET /goals` - Fetch all goals
- `POST /goals` - Create a new goal
- `PUT /goals/:id` - Update a goal
- `PATCH /goals/:id` - Partially update a goal (used for deposits)
- `DELETE /goals/:id` - Delete a goal

## Goal Structure

```json
{
  "id": "string",
  "name": "string",
  "targetAmount": number,
  "savedAmount": number,
  "category": "string",
  "deadline": "YYYY-MM-DD",
  "createdAt": "YYYY-MM-DD"
}
```

## Usage

1. **Add New Goal**: Click "Add New Goal" and fill in the details
2. **Make Deposit**: Click "Make Deposit", select a goal, and enter amount
3. **Edit Goal**: Click "Edit" on any goal card to modify details
4. **Delete Goal**: Click "Delete" on any goal card to remove it
5. **Track Progress**: View progress bars and completion percentages
6. **Monitor Deadlines**: See warnings for goals approaching deadlines

## Status Indicators

- 🟢 **Complete**: Goal has been achieved
- 🟡 **Warning**: Deadline is within 30 days
- 🔴 **Overdue**: Deadline has passed without completion