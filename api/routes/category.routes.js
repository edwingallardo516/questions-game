const { Router } = require('express');
const { createCategory, deleteCategory, getCategories } = require('../controllers/category.controller')
const router = Router();

router.get('/', getCategories)
router.post('/', createCategory)
router.delete('/', deleteCategory)

module.exports = router