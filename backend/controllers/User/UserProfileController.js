// controllers/User/UserProfileController.js

const User = require("../../models/User/User");

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Access user id from JWT token payload
        const user = await User.findById(userId).select("-password"); // Exclude password field

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({
            name: user.name,
            email: user.email,
            number: user.number,
            address: user.address,
            studentId: user.studentId,
        });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
