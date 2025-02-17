const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    studentId: { type: String, required: true, unique: true }, // 6-digit unique ID
    membershipDate: { type: Date, default: Date.now }, // Membership date
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
