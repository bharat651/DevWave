const express = require('express');
const { register, login, getProfile, updateDailyActivity } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);
router.post(
    "/activity",
    authMiddleware,
    updateDailyActivity
);

module.exports = router;
