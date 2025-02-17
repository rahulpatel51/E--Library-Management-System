const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true, // Ensure student ID is mandatory
    },
    name: {
        type: String,
        required: true, // Ensure name is mandatory
    },
    email: {
        type: String,
        required: true, // Ensure email is mandatory
    },
    message: {
        type: String,
        required: true, // Ensure feedback message is mandatory
    },
    timestamp: {
        type: Date,
        required: true, // Store both date and time together in a Date field
        default: Date.now, // Automatically set the timestamp to the current date and time
    },
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
