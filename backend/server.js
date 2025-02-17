const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

dotenv.config(); // Ensure .env is loaded

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());
app.use(helmet());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
 
// Import routes
const userProfileRoutes = require('./routes/User/UserProfileRoutes');
const authRoutes = require("./routes/User/UserAuthRoutes");
const allFeedbackRoutes = require('./routes/Admin/FeedBackRoutes');
const feedbackRoutes = require('./routes/User/FeedbackRoutes');
const adminAuthRoutes = require("./routes/Admin/AdminAuthRoutes");
const categoryRoutes = require("./routes/Admin/CategoryRoutes");
const authorManagementRoutes = require('./routes/Admin/authorManagementRoutes');
const adminRoutes = require('./routes/Admin/AdminRoutes'); 
const bookRoutes = require('./routes/Admin/bookRoutes');
const ProfileRoute = require('./routes/Admin/ProfileRoute'); 
const userRoutes = require('./routes/Admin/UserRoutes');
const issueBookRoutes = require('./routes/Admin/IssueBookRoutes');

// Add routes
app.use('/api/user', userProfileRoutes);
app.use("/api/auth", authRoutes);
app.use('/api', allFeedbackRoutes);
app.use('/api', feedbackRoutes);
app.use("/api/auth", adminAuthRoutes); 
app.use("/api/admin", categoryRoutes); 
app.use('/api/authors', authorManagementRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin', bookRoutes);
app.use('/api/admin', ProfileRoute);
app.use('/api/admin', userRoutes);
app.use('/api/admin/issuebook', issueBookRoutes);

// Serve static files for frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Default route to serve the login page for the frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/Adminlogin.html"));
});

// User signup route



// Catch-all route for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});