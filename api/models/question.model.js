const { Schema, model } = require('mongoose');
const QuestionSchema = Schema({
    statement: {
        type: String,
        required: [true, 'La declaración de la pregunta es requerida'],
    },
    correct_answer: {
        type: String,
        required: [true, 'La respuesta correcta es requerida'],
    },
    wrong_answers: {
        type: Array,
        required: [true, 'Las respuestas incorrectas son requeridas'],
    },
    category: {
        type: String,
        required: [true, 'La categoria es requerida'],
    },
    level: {
      type: Number,
      required: true,
    }
})

QuestionSchema.methods.toJSON = function() {
  // eslint-disable-next-line no-unused-vars
  const { __v, ...question} = this.toObject();
  return question
}

module.exports = model('questions',QuestionSchema);