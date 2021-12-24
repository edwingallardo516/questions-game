const {response, request} = require('express')
const Player = require('../models/player.model')

const getPlayers = async (req,res = response) => {
  const players = await Player.find()
  res.json({
    players
  })
}

const createPlayer = async (req = request, res = response) => {
  const body = req.body;
  const player = new Player( body );

  await player.save();
  res.json({
      msg: 'Jugador creado',
      player
  })
}

const deletePlayer = async (req = request, res = response) => {
  const {_id}= req.params
  const deletedPlayer = await Player.findByIdAndDelete(_id)

  res.json({
      deletedPlayer
  })
}

module.exports = {
  getPlayers,
  createPlayer,
  deletePlayer
}