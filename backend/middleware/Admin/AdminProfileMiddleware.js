// AdminProfileMiddleware.js
const jwt = require('jsonwebtoken');
const Admin = require('../../models/Admin/Admin');

const AdminProfileMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        // Verify token and extract adminId
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.adminId = decoded.id; // Store the adminId in the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
    }
};

// Export the middleware
module.exports = AdminProfileMiddleware;
