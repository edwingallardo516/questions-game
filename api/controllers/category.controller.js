const {response, request} = require('express')
const Category = require('../models/category.model')

const getCategories = async (req,res = response) => {
  const categories = await Category.find()
  res.json({
    categories
  })
}

const createCategory = async (req = request, res = response) => {
  const body = req.body;
  const category = new Category( body );

  await category.save();
  res.json({
      msg: 'Categoria creada',
      category
  })
}

const deleteCategory = async (req = request, res = response) => {
  const { id }= req.params
  const deletedCategory = await Category.findByIdAndDelete(id)

  res.json({
      deletedCategory
  })
}

module.exports = {
  getCategories,
  createCategory,
  deleteCategory
}