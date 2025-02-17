const IssueBook = require('../../models/Admin/IssueBook'); // Assuming you have an IssueBook model

// Controller for issuing a book
exports.issueBook = async (req, res) => {
    const { studentId, studentName, bookTitle, issueDate, returnDate } = req.body;

    // Validate the input data
    if (!studentId || !studentName || !bookTitle || !issueDate || !returnDate) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Create new record for issued book
        const newIssue = new IssueBook({
            studentId,
            studentName,
            bookTitle,
            issueDate,
            returnDate
        });

        // Save the issued book to the database
        await newIssue.save();

        res.status(201).json({ message: 'Book issued successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while issuing the book.' });
    }
};

// Controller for viewing all issued books
exports.viewIssuedBooks = async (req, res) => {
    try {
        const issuedBooks = await IssueBook.find();  // Fetch all issued books from the database
        res.json({ books: issuedBooks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve issued books.' });
    }
};

exports.viewBooksByStudent = async (req, res) => {
    const { studentId } = req.params;  // Get the student ID from the URL parameter

    try {
        // Fetch books issued to this student
        const books = await IssueBook.find({ studentId });

        if (!books.length) {
            return res.status(404).json({ message: 'No books found for this student.' });
        }

        // Return the books as JSON
        res.json({ books });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve books.' });
    }
};