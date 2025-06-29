# EventHub - Event Booking System

A full-stack event booking platform that allows users to browse events, book tickets, and provides an admin panel for event management.

## Features

- User authentication (register and login)
- Browse and filter events
- Book event tickets
- User booking management
- Admin panel for event CRUD operations
- Role-based access control

## Tech Stack

### Frontend
- React
- TypeScript
- React Router
- React Hook Form
- Tailwind CSS
- Lucide React (for icons)
- Zod (for form validation)

### Backend
- Node.js
- Express
- SQLite
- JWT Authentication
- bcrypt (for password hashing)

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/eventhub.git
cd eventhub
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
# Start the backend server
npm run server

# In a separate terminal, start the frontend
npm run dev
```

4. Access the application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login a user
- GET /api/auth/user - Get current user (protected)

### Events
- GET /api/events - Get all events
- GET /api/events/:id - Get a specific event
- POST /api/events - Create a new event (admin only)
- PUT /api/events/:id - Update an event (admin only)
- DELETE /api/events/:id - Delete an event (admin only)

### Bookings
- GET /api/bookings - Get user bookings (protected)
- POST /api/bookings - Create a booking (protected)

## Default Admin Account
- Email: admin@example.com
- Password: admin123

## Project Structure

```
├── public/             # Static files
├── server/             # Backend code
│   └── index.js        # Express server
├── src/                # Frontend code
│   ├── components/     # Reusable components
│   ├── context/        # React context providers
│   ├── pages/          # App pages
│   └── main.tsx        # Entry point
├── .env                # Environment variables
├── package.json        # Dependencies and scripts
└── README.md           # Project documentation
```

## License

This project is licensed under the MIT License.