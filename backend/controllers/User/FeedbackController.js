const Feedback = require('../../models/User/FeedbackModel');
const User = require('../../models/User/User'); // Assuming User model exists to fetch user profile

// Add feedback controller
exports.addFeedback = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available from middleware

        // Find user profile
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ message: 'Feedback message is required' });
        }

        // Generate current date and time adjusted to the local timezone
        const currentDate = new Date();
        const offset = currentDate.getTimezoneOffset(); // Offset in minutes from UTC
        const localDate = new Date(currentDate.getTime() - offset * 60000);

        const date = localDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        const time = localDate.toTimeString().split(' ')[0]; // Format: HH:mm:ss

        // Create new feedback
        const feedback = new Feedback({
            studentId: user.studentId,  // Fetch student ID from the user profile
            name: user.name,
            email: user.email,
            message,
            date,  // Store the date
            time,  // Store the time
        });

        await feedback.save();

        res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
