const Category = require('../../models/Admin/Category');

// Add New Category
exports.addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists.' });
        }

        const category = new Category({ name, description });
        await category.save();

        res.status(201).json({ message: 'Category added successfully.', category });
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
};

// View Categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ categories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
};

// Edit Category
exports.editCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const category = await Category.findByIdAndUpdate(categoryId, { name, description }, { new: true });
        if (!category) {
            return res.status(404).json({ message: 'Category not found.' });
        }

        res.status(200).json({ message: 'Category updated successfully.', category });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
};

// Delete category
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the category by ID
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category' });
    }
};