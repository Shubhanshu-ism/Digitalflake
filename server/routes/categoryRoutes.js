const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Category = require('../models/Category');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Private
router.get('/', protect, async (req, res) => {
    const keyword = req.query.search
        ? {
            name: {
                $regex: req.query.search,
                $options: 'i',
            },
        }
        : {};

    const categories = await Category.find({ ...keyword });
    res.json(categories);
});

// @desc    Create a category
// @route   POST /api/categories
// @access  Private
router.post('/', protect, async (req, res) => {
    const { name, description, status } = req.body;

    const category = new Category({
        name,
        description,
        status,
    });

    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
});

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (category) {
        await category.deleteOne();
        res.json({ message: 'Category removed' });
    } else {
        res.status(404).json({ message: 'Category not found' });
    }
});

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
    const { name, description, status } = req.body;

    const category = await Category.findById(req.params.id);

    if (category) {
        category.name = name || category.name;
        category.description = description || category.description;
        category.status = status || category.status;

        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } else {
        res.status(404).json({ message: 'Category not found' });
    }
});

module.exports = router;
