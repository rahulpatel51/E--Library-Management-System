const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryId: {
        type: String,
        required: true,
        unique: true,
        default: function () {
            return `${Math.floor(10000000 + Math.random() * 90000000)}`; // Generate a unique 8-digit ID
        },
    },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
