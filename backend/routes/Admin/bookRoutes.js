const express = require('express');
const { addBook } = require('../../controllers/Admin/bookController');
const { getBook } = require('../../controllers/Admin/bookController');
const { updateBook } = require('../../controllers/Admin/bookController');
const { deleteBook } = require('../../controllers/Admin/bookController');

const router = express.Router();

// Add Book Route
router.post('/books', addBook);

// Fetch all books
router.get('/books', getBook); // Corrected: Now it fetches books from /books

// Edit a specific book
router.put('/books/:id', updateBook);

// Delete a specific book
router.delete('/books/:id', deleteBook);

module.exports = router;



