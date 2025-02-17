// Feedback route
const express = require('express');
const router = express.Router();
const { addFeedback } = require('../../controllers/User/FeedbackController');
const authMiddleware = require('../../middleware/User/UserAuthMiddleware'); // Middleware to authenticate user

router.post('/feedback', authMiddleware, addFeedback);

module.exports = router;