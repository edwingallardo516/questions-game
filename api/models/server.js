const express = require('express')
const cors = require('cors')

const { dbConnection } = require('../database/config')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT_API
    this.questionsPath = '/api/questions'
    this.playersPath = '/api/players'
    this.playerHistoriesPath = '/api/player-history'
    this.categoriesPath = '/api/categories'

    // Database
    this.connectDb();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes()
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
    //this.app.use(express.static('public'))
  }

  async connectDb() {
    await dbConnection()
  }

  routes () {
    this.app.use(this.questionsPath, require('../routes/questions.routes'))
    this.app.use(this.playersPath, require('../routes/player.routes'))
    this.app.use(this.playerHistoriesPath, require('../routes/playerHistory.routes'))
    this.app.use(this.categoriesPath, require('../routes/category.routes'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Listening in the port http://localhost:${this.port}`)
    })
  }

}

module.exports = Server