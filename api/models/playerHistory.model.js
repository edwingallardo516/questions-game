const { Schema, model } = require('mongoose');
const HistorySchema = Schema({
  playerName: {
      type: String,
      required: [true, 'El nombre del jugador es requerida'],
  },
  score:{
    type: Number,
    required: [true, 'El puntaje es requerido'],
  },
  correctAnswers: {
    type: Array,
    required: [true],
  }
})

HistorySchema.methods.toJSON = function() {
  // eslint-disable-next-line no-unused-vars
  const { __v, ...playerHistory} = this.toObject();
  return playerHistory
}

module.exports = model('player_histories',HistorySchema);