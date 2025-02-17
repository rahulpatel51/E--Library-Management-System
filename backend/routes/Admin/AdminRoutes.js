// backend/routes/Admin/AdminRoutes.js
const express = require('express');
const router = express.Router();

// Correct path to import statsController
const statsController = require('../../controllers/Admin/statsController');  // <-- Ensure this path is correct

// Define the route for fetching stats
router.get('/stats', statsController.getStats);

module.exports = router;
