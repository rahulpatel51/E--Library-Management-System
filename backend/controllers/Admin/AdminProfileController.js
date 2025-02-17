// AdminProfileController.js
const Admin = require('../../models/Admin/Admin');

const getAdminProfile = async (req, res) => {
    try {
        const adminId = req.adminId; // Assuming adminId is passed by the middleware
        const adminData = await Admin.findById(adminId); // Fetch the admin data from DB

        if (!adminData) {
            return res.status(404).json({ message: 'Admin not found.' });
        }

        res.json({
            name: adminData.name,
            email: adminData.email,
            number: adminData.number,
            address: adminData.address,
        });
    } catch (error) {
        console.error("Error fetching admin data:", error);
        res.status(500).json({ message: "Server error while fetching profile data." });
    }
};

// Export the function
module.exports = { getAdminProfile };
