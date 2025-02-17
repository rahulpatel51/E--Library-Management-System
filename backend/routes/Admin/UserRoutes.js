// UserRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../../models/User/User'); // Correct path to your User model

// Route to fetch all users with their details
router.get('/users', async (req, res) => {
    try {
        console.log("Fetching all users...");
        const users = await User.find(); // Ensure this fetches all necessary user fields
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json(users); // Return the list of users as JSON
    } catch (error) {
        console.error('Error fetching users:', error); // Log errors for debugging
        res.status(500).json({ message: 'Failed to fetch users.' });
    }
});

module.exports = router;
