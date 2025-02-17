const User = require("../../models/User/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Generate a unique 6-digit student ID
const generateStudentId = async () => {
    let studentId;
    let exists;
    do {
        studentId = Math.floor(100000 + Math.random() * 900000).toString();
        exists = await User.findOne({ studentId });
    } while (exists);
    return studentId;
};

// Signup controller
exports.signup = async (req, res) => {
    const { name, number, email, address, password } = req.body;

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a unique student ID
        const studentId = await generateStudentId();

        // Create a new user with membership date (default: current date)
        const user = new User({
            name,
            number,
            email,
            address,
            password: hashedPassword,
            studentId,
            membershipDate: new Date(), // Membership date explicitly set to current date
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully.",
            studentId,
        });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Login controller
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password." });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, studentId: user.studentId }, process.env.JWT_SECRET, {
            expiresIn: "1h", // Token expiration time
        });

        res.status(200).json({
            message: "Login successful.",
            token, // Send the token to the frontend
            studentId: user.studentId, // Optional: Send the student's ID
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
