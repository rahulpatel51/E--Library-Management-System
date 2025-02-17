const BookModle = require('../../models/Admin/BookModel');
const Author = require('../../models/Admin/authorModel');
const Category = require('../../models/Admin/Category');

// Add a new book
exports.addBook = async (req, res) => {
    try {
        const { title, author, category, description, isbn } = req.body;

        // Check if the author and category exist
        const authorExists = await Author.findById(author);
        const categoryExists = await Category.findById(category);

        if (!authorExists) {
            return res.status(404).json({ message: 'Author not found.' });
        }

        if (!categoryExists) {
            return res.status(404).json({ message: 'Category not found.' });
        }

        // Create a new book
        const newBook = new BookModle({
            title,
            author,
            category,
            description,
            isbn
        });

        // Save the book to the database
        const savedBook = await newBook.save();

        res.status(201).json({
            message: 'Book added successfully!',
            book: savedBook
        });
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ message: 'Error adding book', error: error.message });
    }
};

// Fetch all books
exports.getBook = async (req, res) => {
    try {
        const books = await BookModle.find().populate('author category'); // Ensure that author and category are populated with full details
        
        if (!books || books.length === 0) {
            return res.status(404).json({ message: 'No books found' });
        }

        res.json({ books });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Error fetching books' });
    }
};

// Edit book
exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, category, description, isbn } = req.body;

    try {
        const updatedBook = await BookModle.findByIdAndUpdate(
            id,
            { title, author, category, description, isbn },
            { new: true }
        );
        res.json({ updatedBook });
    } catch (error) {
        res.status(500).json({ message: 'Error updating book' });
    }
};

// Delete book
exports.deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        await BookModle.findByIdAndDelete(id);
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book' });
    }
};

