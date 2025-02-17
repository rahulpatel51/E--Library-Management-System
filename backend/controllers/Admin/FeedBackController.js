const Feedback = require("../../models/User/FeedbackModel");

// Get all feedback
exports.getAllFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find().sort({ date: -1 }); // Sort by most recent
        res.status(200).json({ success: true, feedback });
    } catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).json({ success: false, message: "Something went wrong." });
    }
};
