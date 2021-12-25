<template>
  <div>
    <!-- inicio -->
    <div id="input-name" v-if="showLogin" class="container-fluid p-5 text-center justify-content-between">
      <h1 class="text-center mb-4"> Ingresa tu nombre </h1>
      <b-form @submit="onSubmit">
          <b-form-input id="playerName" v-model="playerName" placeholder="Nombre" required></b-form-input>
        <b-button block type="submit" class="px-5 my-3" variant="outline-success"> Jugar </b-button>
      </b-form>
      <div>
        <h4>Historial de partidas </h4>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Jugador</th>
              <th scope="col">Puntaje</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="player in history" :key="player.playerName">
              <td> <b-avatar></b-avatar> {{ player.playerName }} </td>
              <td> {{ player.score }} <b-avatar icon="star-fill" class="align-center"></b-avatar> </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Juego -->
    <div id="game" v-if="showGame" class="container-fluid p-5 text-center justify-content-between">
      <div>
        <div id="history">
          <b-avatar></b-avatar>
          <span class="p-3">{{ playerName }}</span>
          <b-icon icon="star-fill" font-scale="1.3" class="mr-3"></b-icon>
          <span> Puntos: {{ score }}</span>
        </div>
        <b-progress :value="(level-1)*20" variant="success" striped animated></b-progress>
        <h4 class="mt-2"> {{ question.category }} </h4>
        <h3 class="mb-4"> {{ question.statement }} </h3>
      </div>
      <div class="btn-block">
        <b-button-group vertical>
        <b-button v-for="option in options" :key="option" variant="outline-secondary" @click="clickOption" >
          {{ option }}
        </b-button>
      </b-button-group>
      </div>
      <b-button class="mt-4" block variant="outline-danger" @click="stopGame"> Salir </b-button>
    </div>

    <!-- Historial del juego -->
    <div id="history" v-if="showHistory" class="container-fluid p-5 text-center justify-content-between" >
      <h3>Resumen de tu partida </h3>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Jugador</th>
            <th scope="col">Puntaje</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> <b-avatar></b-avatar> {{playerHistory.playerName}}</td>
            <td> {{playerHistory.score}}</td>
          </tr>
        </tbody>
      </table>
      <b-list-group>
        <b-list-group-item v-for="question in playerHistory.correctAnswers" :key="question"> {{ question }}</b-list-group-item>
      </b-list-group>
      <b-button class="m-3" block variant="outline-success" @click="restartGame"> Volver a jugar </b-button>
      <b-button class="m-3" block variant="outline-danger" @click="outGame"> Salir </b-button>
    </div>
  </div>
</template>

<script>
import api from '../api'
export default {
  name: 'PxQuestions',

  components: {
  },

  data() {
    return {
      playerName: "",
      level: 1,
      score: 0,
      showLogin: true,
      showGame: false,
      showHistory: false,
      question: {},
      options: [],
      playerHistory : {},
      questionsLevel1: [],
      questionsLevel2: [],
      questionsLevel3: [],
      questionsLevel4: [],
      questionsLevel5: [],
      alert : ["¡Correcto!","¡Muy bien!","¡Excelente!","¡Magnífico!","¡Ganaste!"],
    }
  },
  props: {
    questions: {
      type: Array,
      default: () => [],
    },
    history: {
      type: Array,
      default: () => [],
    },
  },

  created(){
    this.playerHistory = {
      "playerName" : "",
      "score" : 0,
      "correctAnswers" : ["Preguntas respondidas correctamente: "]
    }
  },

  methods: {
    organizeQuestionsByLevel() {
      this.questions.forEach(question => {
        if ( question.level == 1 ) { this.questionsLevel1.push(question); return }
        if ( question.level == 2 ) { this.questionsLevel2.push(question); return }
        if ( question.level == 3 ) { this.questionsLevel3.push(question); return }
        if ( question.level == 4 ) { this.questionsLevel4.push(question); return }
        if ( question.level == 5 ) { this.questionsLevel5.push(question); return }
      })
    },

    /* Iniciar juego */
    onSubmit(event) {

      event.preventDefault()
      this.organizeQuestionsByLevel()
      this.showLogin = false
      this.chooseQuestion()
      this.mixOptions()
      this.restartHistory()
      this.showGame = true
      this.playerHistory.playerName = this.playerName;
    },

    /* Escoger pregunta al azar*/
    chooseQuestion() {
      const n = Math.floor(Math.random() * (14 - 0)) + 0;
      if( this.level == 1 ) { this.question = this.questionsLevel1[n]; return }
      if( this.level == 2 ) { this.question = this.questionsLevel2[n]; return }
      if( this.level == 3 ) { this.question = this.questionsLevel3[n]; return }
      if( this.level == 4 ) { this.question = this.questionsLevel4[n]; return }
      if( this.level == 5 ) { this.question = this.questionsLevel5[n]; return }
    },

    /* Revolver opciones de respuesta */
    async mixOptions() {
      /* unir opciones */
      const temp = [this.question.correct_answer]
      this.options = temp.concat(this.question.wrong_answers)

      /* revolver opciones */
      for (let i = this.options.length - 1; i > 0; i--) {
        let n = Math.floor(Math.random() * (i + 1));
        let temporal = this.options[i];
        this.options[i] = this.options[n];
        this.options[n] = temporal;
      }
    },

    /* Validar respuesta  */
    clickOption(event) {
      if(event.target.innerText == this.question.correct_answer){
        this.correctAlert()
        this.increaseLevelAndScore()
        this.savePlayerHistory()
        this.chooseQuestion()
        this.mixOptions()

      } else {
        this.wrongAlert()
        this.finishGame()
      }
    },

    /* Control de puntos, nivel del juego e historial*/
    increaseLevelAndScore() {
      this.score += this.level*10
      this.level += 1
      if(this.level > 5) this.finishGame()
    },

    savePlayerHistory(){
      this.playerHistory.score = this.score;
      this.playerHistory.correctAnswers.push(this.question.statement)
    },

    finishGame(){
      this.showGame = false
      this.showHistory = true
      this.savePlayerHistoryDB()
    },

    restartGame(){
      this.level = 1
      this.score = 0
      this.showLogin = false
      this.showHistory = false
      this.playerHistory = {
        "score" : 0,
        "correctAnswers" : ["Preguntas respondidas correctamente: "]
      }
      this.chooseQuestion()
      this.mixOptions()
      this.showGame = true
    },

    stopGame(){
      this.outAlert()
    },

    outGame(){
      this.level = 1
      this.score = 0
      api.getPlayerHistory().then((history) => (this.history = history.reverse()))
      this.showGame = false
      this.showHistory = false
      this.showLogin = true
    },

    savePlayerHistoryDB(){
      api.postPlayerHistory(this.playerHistory)
    },

    restartHistory(){
      this.playerHistory = {
        "playerName" : this.playerName,
        "score" : 0,
        "correctAnswers" : ["Preguntas respondidas correctamente: "]
      }
    },

    /* Alertas */
    correctAlert() {
      this.$swal({
        position: 'center',
        icon: 'success',
        title: this.alert[this.level-1],
        button: false,
        timer: 1500
      })
    },

    wrongAlert() {
      this.$swal({
        icon: 'error',
        title: 'Respuesta equivocada ☹️',
        button: false,
        timer: 2000
      })
    },

    outAlert() {
      this.$swal({
        title: '¿Estás seguro?',
        icon: 'warning',
        buttons: ["Cancelar", "Salir"],
      }).then((result) => {
        if (result) {
          this.finishGame()
        }
      })
    }
  },
}
</script>