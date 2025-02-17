const express = require('express');
const router = express.Router();
const AdminProfileMiddleware = require('../../middleware/Admin/AdminProfileMiddleware');
const { getAdminProfile } = require('../../controllers/Admin/AdminProfileController'); // Fixed the import path

// Route to fetch admin profile data
router.get('/profile', AdminProfileMiddleware, getAdminProfile); // Ensure getAdminProfile is defined and imported

module.exports = router;
