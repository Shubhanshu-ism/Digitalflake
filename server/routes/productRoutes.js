const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Product = require('../models/Product');

const upload = require('../middleware/uploadMiddleware');

// @desc    Get all products
// @route   GET /api/products
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

    const products = await Product.find({ ...keyword })
        .populate('category', 'name')
        .populate('subcategory', 'name');
    res.json(products);
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private
router.post('/', protect, upload.single('image'), async (req, res) => {
    const { name, category, subcategory, status } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const product = new Product({
        name,
        category,
        subcategory,
        image,
        status,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private
router.put('/:id', protect, upload.single('image'), async (req, res) => {
    const { name, category, subcategory, status } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.category = category || product.category;
        product.subcategory = subcategory || product.subcategory;
        product.status = status || product.status;
        if (req.file) {
            product.image = `/uploads/${req.file.filename}`;
        }

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

module.exports = router;
