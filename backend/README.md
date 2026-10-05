# Learning Management System Backend

A RESTful API backend for a Learning Management System (LMS) built with Express.js and PostgreSQL.

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                 # PostgreSQL database connection
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT authentication middleware
│   ├── controllers/
│   │   ├── authController.js     # Auth logic (register, login, profile)
│   │   ├── courseController.js   # Course CRUD operations
│   │   └── progressController.js # User progress tracking
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── courseRoutes.js       # Course endpoints
│   │   └── progressRoutes.js     # Progress endpoints
│   └── server.js                 # Express app & server setup
├── schema.sql                     # Database schema
├── .env                          # Environment variables
└── package.json                  # Dependencies
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup PostgreSQL Database
```bash
# Create database
createdb learning_db

# Run schema
psql -U postgres -d learning_db -f schema.sql
```

### 3. Configure Environment Variables
Update `.env` with your database credentials:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=learning_db
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
```

### 4. Start Server
```bash
# Production
npm start

# Development (with auto-reload)
npm run dev
```

Server runs on `http://localhost:5000`

## API Endpoints

### Auth Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires token)

### Course Endpoints
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course (requires token)
- `PUT /api/courses/:id` - Update course (requires token)
- `DELETE /api/courses/:id` - Delete course (requires token)

### Progress Endpoints
- `GET /api/progress/user/:userId` - Get user's progress (requires token)
- `GET /api/progress/user/:userId/course/:courseId` - Get progress in specific course (requires token)
- `PUT /api/progress/user/:userId/course/:courseId` - Update progress (requires token)
- `DELETE /api/progress/user/:userId/course/:courseId` - Delete progress (requires token)

## Example Requests

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Get Profile (with JWT token)
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Technologies

- **Node.js** - Runtime
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables

## Notes

- All protected endpoints require JWT token in Authorization header: `Bearer <token>`
- Passwords are hashed using bcryptjs
- JWT tokens expire after 7 days (configurable in .env)
- Database uses foreign keys for referential integrity
