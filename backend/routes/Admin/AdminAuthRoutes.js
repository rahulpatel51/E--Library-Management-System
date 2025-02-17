const express = require("express");
const router = express.Router();
const Admin = require("../../models/Admin/Admin");  // Correct path to Admin model
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Admin Signup Route
router.post("/Adminsignup", async (req, res) => {
    const { name, number, email, address, password } = req.body;

    // Validate required fields
    if (!name || !number || !email || !address || !password) {
        return res.status(400).json({ message: "All fields are required: name, number, email, address, and password." });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format." });
    }

    // Validate password length
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    try {
        // Check if the admin already exists
        const adminExists = await Admin.findOne({ email });
        if (adminExists) {
            return res.status(400).json({ message: "Email is already registered." });
        }

        // Hash the password with a specified number of salt rounds
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new admin
        const newAdmin = new Admin({
            name,
            number,
            email,
            address,
            password: hashedPassword,
            role: "Admin", // Default role
        });

        await newAdmin.save();

        // Generate JWT token
        const token = jwt.sign(
            { id: newAdmin._id, role: newAdmin.role, email: newAdmin.email, name: newAdmin.name },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Respond with success message and token
        res.status(201).json({
            message: "Admin registered successfully.",
            token,
            admin: {
                id: newAdmin._id,
                name: newAdmin.name,
                email: newAdmin.email,
                number: newAdmin.number,
                address: newAdmin.address,
            },
        });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Server error during signup. Please try again." });
    }
});

// Admin Login Route
router.post("/Adminlogin", async (req, res) => {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide both email and password." });
    }

    // Validate password length
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    try {
        // Find admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials: Email not found." });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials: Incorrect password." });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: admin._id, role: admin.role, email: admin.email, name: admin.name },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Respond with success message and token
        res.status(200).json({
            message: "Login successful",
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
            }
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Server error during login. Please try again." });
    }
});

module.exports = router;
