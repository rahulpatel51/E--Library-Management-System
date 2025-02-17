const validateAuthorData = (req, res, next) => {
    const { authorName, authorBio, authorCountry } = req.body;

    // Check if all fields are provided
    if (!authorName || !authorBio || !authorCountry) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // You can add further validations here if needed, like checking the length or format of data
    if (authorName.length < 3) {
        return res.status(400).json({ message: 'Author name must be at least 3 characters long.' });
    }

    if (authorBio.length < 10) {
        return res.status(400).json({ message: 'Author bio must be at least 10 characters long.' });
    }

    if (authorCountry.length < 3) {
        return res.status(400).json({ message: 'Author country must be at least 3 characters long.' });
    }

    // Proceed to the next middleware if everything is valid
    next();
};

module.exports = { validateAuthorData };
