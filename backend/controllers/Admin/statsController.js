const User = require('../../models/User/User'); // Assuming you have a User model
const Book = require('../../models/Admin/BookModel'); // Assuming you have a Book model
const Category = require('../../models/Admin/Category'); // Assuming you have a Category model
const Author = require('../../models/Admin/authorModel'); // Assuming you have an Author model
const IssueBook = require('../../models/Admin/IssueBook'); // Assuming you have an IssueBook model
const Feedback = require('../../models/User/FeedbackModel'); // Assuming you have a Feedback model

exports.getStats = async (req, res) => {
    try {
        // Fetch counts from the database
        const userCount = await User.countDocuments();
        const bookCount = await Book.countDocuments();
        const categoryCount = await Category.countDocuments();
        const authorCount = await Author.countDocuments();
        const issuedBookCount = await IssueBook.countDocuments();
        const feedbackCount = await Feedback.countDocuments(); // Get the number of feedback entries
        
        // Return the stats as a JSON response
        res.status(200).json({
            userCount,
            bookCount,
            categoryCount,
            authorCount,
            issuedBookCount,
            feedbackCount, // Include feedback count in the response
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ message: 'Error loading data' });
    }
};
