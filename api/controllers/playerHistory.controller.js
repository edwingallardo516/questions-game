const {response, request} = require('express')
const History = require('../models/playerHistory.model')

const getPlayerHistories = async (req,res = response) => {
  const history = await History.find()
  res.json({
    history
  })
}

const saveHistoryPlayer = async (req = request, res = response) => {
  const body = req.body;
  const history = new History( body );

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