// controllers/Admin/UserController.js
const User = require('../../models/User/User'); // Assuming the User model is correct

// Controller function to get all users
const getUserController = async (req, res) => {
    try {
        console.log("Fetching all users...");

        // Fetch all users from the database and select necessary fields
        const users = await User.find({}, 'userId name email role createdAt');

        // Format the data to include 'membershipDate' in a user-friendly format
        const formattedUsers = users.map(user => ({
            userId: user.userId,
            name: user.name,
            email: user.email,
            role: user.role,
            membershipDate: user.createdAt.toDateString(), // Convert 'createdAt' to a readable format
        }));

        // Return the formatted list of users
        res.status(200).json(formattedUsers);
    } catch (error) {
        console.error('Error fetching users:', error); // Log errors for debugging
        res.status(500).json({ message: 'Failed to fetch users.' });
    }
};

module.exports = { getUserController };
