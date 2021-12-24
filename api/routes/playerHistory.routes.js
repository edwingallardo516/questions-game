const { Router } = require('express');
const { saveHistoryPlayer, deleteHistoryPlayer, getPlayerHistories } = require('../controllers/playerHistory.controller')
const router = Router();

router.get('/', getPlayerHistories)
router.post('/', saveHistoryPlayer)
router.delete('/', deleteHistoryPlayer)

module.exports = router