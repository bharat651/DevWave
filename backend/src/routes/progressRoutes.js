const express = require('express');
const {
  getUserProgress,
  getCourseProgress,
  updateProgress,
  deleteProgress,
} = require('../controllers/progressController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/user/:userId', authMiddleware, getUserProgress);
router.get('/user/:userId/course/:courseId', authMiddleware, getCourseProgress);
router.put('/user/:userId/course/:courseId', authMiddleware, updateProgress);
router.delete('/user/:userId/course/:courseId', authMiddleware, deleteProgress);

module.exports = router;
