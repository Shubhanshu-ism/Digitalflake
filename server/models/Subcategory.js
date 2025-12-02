const mongoose = require('mongoose');

const subcategorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Category',
        },
        image: {
            type: String, // URL or path to image
            default: '',
        },
        status: {
            type: String,
            enum: ['Active', 'Inactive'],
            default: 'Active',
        },
    },
    {
        timestamps: true,
    }
);

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;
