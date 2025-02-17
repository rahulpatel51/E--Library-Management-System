const mongoose = require('mongoose');

// Define Author schema
const authorSchema = new mongoose.Schema({
    authorName: {
        type: String,
        required: true,
    },
    authorBio: {
        type: String,
        required: true,
    },
    authorCountry: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Check if the model is already defined to avoid OverwriteModelError
const Author = mongoose.models.Author || mongoose.model('Author', authorSchema);

module.exports = Author;
