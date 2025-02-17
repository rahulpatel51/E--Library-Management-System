const express = require('express');
const router = express.Router();
const IssueBookController = require('../../controllers/Admin/IssueBookController');

router.post('/issue', IssueBookController.issueBook);

router.get('/view', IssueBookController.viewIssuedBooks);

router.get('/issued-books/:studentId', IssueBookController.viewBooksByStudent);

module.exports = router;
