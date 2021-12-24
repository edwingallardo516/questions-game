const { Router } = require('express');
const { createPlayer, deletePlayer, getPlayers } = require('../controllers/player.controller')
const router = Router();

router.get('/', getPlayers)
router.post('/', createPlayer)
router.delete('/', deletePlayer)

module.exports = router