const { Router } = require('express');
const { getQuestions, createQuestion, deleteQuestion } = require('../controllers/question.controller');
const router = Router();

router.get('/', getQuestions)
router.post('/', createQuestion)
router.delete('/',deleteQuestion)

module.exports = router