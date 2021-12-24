const { Schema, model } = require('mongoose');
const PlayerSchema = Schema({
    name: {
        type: String
    },
    history: {
        type: JSON,
    }
})

PlayerSchema.methods.toJSON = function() {
  // eslint-disable-next-line no-unused-vars
  const { __v, ...player} = this.toObject();
  return player
}

module.exports = model('players',PlayerSchema);