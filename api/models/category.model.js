const { Schema, model } = require('mongoose');
const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre de la cateogoria es requerido'],
  },
  level: {
    type: Number,
    required: true
  },
  questions: {
    type: Array,
    required: true
  }
})

CategorySchema.methods.toJSON = function() {
  // eslint-disable-next-line no-unused-vars
  const { __v, ...category} = this.toObject();
  return category
}

module.exports = model('categories',CategorySchema);