require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const progressRoutes = require('./routes/progressRoutes');
const pool = require('./config/db');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/progress', progressRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ API endpoints:`);
  console.log(`  - Auth: POST /api/auth/register, /api/auth/login, GET /api/auth/profile`);
  console.log(`  - Courses: GET/POST /api/courses, GET/PUT/DELETE /api/courses/:id`);
  console.log(`  - Progress: GET/PUT/DELETE /api/progress/user/:userId/course/:courseId`);
});
