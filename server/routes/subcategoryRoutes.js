const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Subcategory = require('../models/Subcategory');

const upload = require('../middleware/uploadMiddleware');

// @desc    Get all subcategories
// @route   GET /api/subcategories
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

    const subcategories = await Subcategory.find({ ...keyword }).populate('category', 'name');
    res.json(subcategories);
});

// @desc    Create a subcategory
// @route   POST /api/subcategories
// @access  Private
router.post('/', protect, upload.single('image'), async (req, res) => {
    const { name, category, status } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const subcategory = new Subcategory({
        name,
        category,
        image,
        status,
    });

    const createdSubcategory = await subcategory.save();
    res.status(201).json(createdSubcategory);
});

// @desc    Update a subcategory
// @route   PUT /api/subcategories/:id
// @access  Private
router.put('/:id', protect, upload.single('image'), async (req, res) => {
    const { name, category, status } = req.body;
    const subcategory = await Subcategory.findById(req.params.id);

    if (subcategory) {
        subcategory.name = name || subcategory.name;
        subcategory.category = category || subcategory.category;
        subcategory.status = status || subcategory.status;
        if (req.file) {
            subcategory.image = `/uploads/${req.file.filename}`;
        }

        const updatedSubcategory = await subcategory.save();
        res.json(updatedSubcategory);
    } else {
        res.status(404);
        throw new Error('Subcategory not found');
    }
});

// @desc    Delete a subcategory
// @route   DELETE /api/subcategories/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    const subcategory = await Subcategory.findById(req.params.id);

    if (subcategory) {
        await subcategory.deleteOne();
        res.json({ message: 'Subcategory removed' });
    } else {
        res.status(404).json({ message: 'Subcategory not found' });
    }
});

module.exports = router;
