const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Item = require('../models/Item');

// @desc    Get all items
// @route   GET /api/items
// @access  Private
router.get('/', protect, async (req, res) => {
    const items = await Item.find({ user: req.user._id });
    res.json(items);
});

// @desc    Create an item
// @route   POST /api/items
// @access  Private
router.post('/', protect, async (req, res) => {
    const { name, description, category, status } = req.body;

    const item = new Item({
        name,
        description,
        category,
        status,
        user: req.user._id,
    });

    const createdItem = await item.save();
    res.status(201).json(createdItem);
});

// @desc    Update an item
// @route   PUT /api/items/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
    const { name, description, category, status } = req.body;

    const item = await Item.findById(req.params.id);

    if (item) {
        if (item.user.toString() !== req.user._id.toString()) {
            res.status(401).json({ message: 'Not authorized' });
            return;
        }

        item.name = name || item.name;
        item.description = description || item.description;
        item.category = category || item.category;
        item.status = status || item.status;

        const updatedItem = await item.save();
        res.json(updatedItem);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// @desc    Delete an item
// @route   DELETE /api/items/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    const item = await Item.findById(req.params.id);

    if (item) {
        if (item.user.toString() !== req.user._id.toString()) {
            res.status(401).json({ message: 'Not authorized' });
            return;
        }

        await item.deleteOne();
        res.json({ message: 'Item removed' });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

module.exports = router;
