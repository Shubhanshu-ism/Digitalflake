const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Category = require('../models/Category');
const asyncHandler = require('express-async-handler');
const upload = require('../middleware/uploadMiddleware');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Private
router.get('/', protect, asyncHandler(async (req, res) => {
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
}));

// @desc    Create a category
// @route   POST /api/categories
// @access  Private
router.post('/', protect, upload.single('image'), asyncHandler(async (req, res) => {
    const { name, status } = req.body;

    let image = {};
    if (req.file) {
        image = {
            url: `/uploads/${req.file.filename}`,
            public_id: req.file.filename
        };
    }

    const category = new Category({
        name,
        image,
        status,
    });

    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
}));

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private
router.delete('/:id', protect, asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (category) {
        await category.deleteOne();
        res.json({ message: 'Category removed' });
    } else {
        res.status(404);
        throw new Error('Category not found');
    }
}));

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private
router.put('/:id', protect, upload.single('image'), asyncHandler(async (req, res) => {
    const { name, status } = req.body;

    const category = await Category.findById(req.params.id);

    if (category) {
        category.name = name || category.name;
        category.status = status || category.status;

        if (req.file) {
            category.image = {
                url: `/uploads/${req.file.filename}`,
                public_id: req.file.filename
            };
        }

        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } else {
        res.status(404);
        throw new Error('Category not found');
    }
}));

module.exports = router;
