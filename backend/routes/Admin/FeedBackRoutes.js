const express = require("express");
const router = express.Router();
const FeedbackController = require("../../controllers/Admin/FeedBackController");

// Route to get all feedback (admin only)
router.get("/admin/feedback", FeedbackController.getAllFeedback);

module.exports = router;
