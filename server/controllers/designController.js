const asyncHandler = require('express-async-handler');
const Design = require('../models/Design');

// @desc    Get all designs
// @route   GET /api/designs
// @access  Private
const getDesigns = asyncHandler(async (req, res) => {
    const designs = await Design.find({});
    res.json(designs);
});

// @desc    Get a single design by ID
// @route   GET /api/designs/:id
// @access  Private
const getDesignById = asyncHandler(async (req, res) => {
    const design = await Design.findById(req.params.id);

    if (design) {
        res.json(design);
    } else {
        res.status(404);
        throw new Error('Design not found');
    }
});

// @desc    Create a new design
// @route   POST /api/designs
// @access  Private
const createDesign = asyncHandler(async (req, res) => {
    const { name, description, image } = req.body;

    const design = new Design({
        name,
        description,
        image,
    });

    const createdDesign = await design.save();
    res.status(201).json(createdDesign);
});

// @desc    Update a design
// @route   PUT /api/designs/:id
// @access  Private
const updateDesign = asyncHandler(async (req, res) => {
    const { name, description, image, status } = req.body;

    const design = await Design.findById(req.params.id);

    if (design) {
        design.name = name;
        design.description = description;
        design.image = image;
        design.status = status;

        const updatedDesign = await design.save();
        res.json(updatedDesign);
    } else {
        res.status(404);
        throw new Error('Design not found');
    }
});

// @desc    Delete a design
// @route   DELETE /api/designs/:id
// @access  Private
const deleteDesign = asyncHandler(async (req, res) => {
    const design = await Design.findById(req.params.id);

    if (design) {
        await design.remove();
        res.json({ message: 'Design removed' });
    } else {
        res.status(404);
        throw new Error('Design not found');
    }
});

module.exports = {
    getDesigns,
    getDesignById,
    createDesign,
    updateDesign,
    deleteDesign,
};
