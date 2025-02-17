const Author = require('../../models/Admin/authorModel'); // Import the Author model

// Add a new author
exports.addAuthor = async (req, res) => {
    try {
        const { authorName, authorBio, authorCountry } = req.body;

        // Log the incoming data to verify it
        console.log('Adding new author with data:', { authorName, authorBio, authorCountry });

        // Create a new author instance
        const newAuthor = new Author({
            authorName,
            authorBio,
            authorCountry,
        });

        // Save the author to the database
        const savedAuthor = await newAuthor.save();

        // Log success and author details
        console.log('Author added successfully:', savedAuthor);

        // Send success response
        res.status(201).json({
            message: 'Author added successfully!',
            author: savedAuthor,
        });
    } catch (error) {
        console.error('Error adding author:', error);
        res.status(500).json({ message: 'Error adding author', error: error.message });
    }
};

// Fetch all authors
exports.getAuthors = async (req, res) => {
    try {
        console.log('Fetching authors from database...'); // Log when fetching starts

        const authors = await Author.find(); // Fetch all authors

        console.log('Authors fetched successfully:', authors); // Log fetched authors

        res.status(200).json({ authors });
    } catch (error) {
        console.error('Error fetching authors:', error);
        res.status(500).json({ message: 'Error fetching authors', error: error.message });
    }
};

// Delete an author
exports.deleteAuthor = async (req, res) => {
    try {
        const authorId = req.params.id;

        // Log the authorId to verify it's being received correctly
        console.log('Attempting to delete author with ID:', authorId);

        // Find the author and delete it
        const author = await Author.findByIdAndDelete(authorId);

        if (!author) {
            console.log('Author not found with ID:', authorId);
            return res.status(404).json({ message: 'Author not found' });
        }

        console.log('Author deleted successfully:', author);

        res.status(200).json({
            success: true,
            message: 'Author deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting author:', error);
        res.status(500).json({ message: 'Error deleting author', error: error.message });
    }
};

