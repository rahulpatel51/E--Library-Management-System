const express = require('express');
const router = express.Router();
const authorController = require('../../controllers/Admin/authorController');
const { validateAuthorData } = require('../../middleware/Admin/validateAuthor');

// Route to add a new author with validation
router.post('/add', validateAuthorData, authorController.addAuthor);
router.get('/', authorController.getAuthors);
router.delete('/:id', authorController.deleteAuthor);

module.exports = router;
