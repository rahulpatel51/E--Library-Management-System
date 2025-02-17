const mongoose = require('mongoose');

const IssueBookSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    bookTitle: {
        type: String,
        required: true
    },
    issueDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('IssueBook', IssueBookSchema);
