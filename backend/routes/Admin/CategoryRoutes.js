const express = require('express');
const { 
    addCategory, 
    getCategories, 
    editCategory, 
    deleteCategory 
} = require('../../controllers/Admin/CategoryController');
const router = express.Router();

// Add Category Route
router.post('/category', addCategory);

// Get Categories Route
router.get('/categories', getCategories);

// Edit Category Route
router.put('/category/:Id', editCategory);

// Delete Category Route
router.delete('/category/:Id', deleteCategory); 

module.exports = router;
