const express = require('express');
const router = express.Router();
const {
    getDesigns,
    getDesignById,
    createDesign,
    updateDesign,
    deleteDesign,
} = require('../controllers/designController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getDesigns).post(protect, createDesign);
router
    .route('/:id')
    .get(protect, getDesignById)
    .put(protect, updateDesign)
    .delete(protect, deleteDesign);

module.exports = router;
