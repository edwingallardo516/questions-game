const {response, request} = require('express')
const History = require('../models/playerHistory.model')
const Player = require('../models/player.model')

const getPlayerHistories = async (req,res = response) => {
  const history = await History.find()
  res.json({
    history
  })
}

const saveHistoryPlayer = async (req = request, res = response) => {
  const body = req.body;
  const { id_player, score, correct_answers } = body
  const history = new History( body );
  const player = await Player.findOne({ id_player : id_player })
  if(player) {
    await Player.findByIdAndUpdate( id_player , {
      history: {
        score : parseInt(score),
        correct_answers : correct_answers
      }
    } )
  }

  await history.save();
  res.json({
    msg: 'Historial guardado',
    history
  })
}

const deleteHistoryPlayer = async (req = request, res = response) => {
  const {idPlayer}= req.params
  const deletedHistoryPlayer = await History.findByIdAndDelete(idPlayer)

  res.json({
    msg: 'Historial eliminado',
    deletedHistoryPlayer
  })
}

module.exports = {
  getPlayerHistories,
  saveHistoryPlayer,
  deleteHistoryPlayer
}