const {response, request} = require('express')
const Question = require('../models/question.model')

const getQuestions = async (req,res = response) => {
  const questions = await Question.find()
  res.json({
    msg: 'Todas las preguntas: ',
    questions
  })
}

const createQuestion = async(req = request,res = response) => {
  const body = req.body;
  const question = new Question( body );

  await question.save();
  res.json({
      msg: 'Pregunta creada',
      question
  })
}

const deleteQuestion = async(req = request, res = response) => {
  const {id}= req.params
  const deletedQuestion = await Question.findByIdAndDelete(id)

  res.json({
      deletedQuestion
  })
}

module.exports = {
    getQuestions,
    createQuestion,
    deleteQuestion
}