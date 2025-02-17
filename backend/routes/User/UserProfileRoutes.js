// routes/User/userRoutes.js

const express = require("express");
const router = express.Router();
const { getProfile } = require("../../controllers/User/UserProfileController");
const authMiddleware = require("../../middleware/User/UserAuthMiddleware");

// Profile Route (only accessible if the user is authenticated)
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
