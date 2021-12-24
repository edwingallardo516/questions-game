<template>
  <div>
    <!-- inicio -->
    <div id="input-name" v-if="showLogin" class="container-fluid p-5 text-center justify-content-between">
      <h1 class="text-center mb-4"> Ingresa tu nombre </h1>
      <b-form @submit="onSubmit">
          <b-form-input id="playerName" v-model="playerName" placeholder="Nombre" required></b-form-input>
        <b-button block type="submit" class="px-5 my-3" variant="outline-success"> Jugar </b-button>
      </b-form>
    </div>

    <!-- Juego -->
    <div id="game" v-if="showGame" class="container-fluid p-5 text-center justify-content-between">
      <div>
        <h3 class="mb-4"> {{ question.statement }} </h3>
      </div>
      <b-button-group vertical>
        <b-button v-for="option in options" :key="option" variant="outline-secondary" @click="clickOption" >
          {{ option }}
        </b-button>
      </b-button-group>
    </div>
  </div>
</template>

<script>

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
      showGame: true,
      question: {},
      options: [],
      questionsLevel1: [],
      questionsLevel2: [],
      questionsLevel3: [],
      questionsLevel4: [],
      questionsLevel5: [],
    }
  },
  props: {
    questions: {
      type: Array,
      default: () => [],
    },
  },

  created(){

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
    async onSubmit(event) {
      event.preventDefault()
      this.organizeQuestionsByLevel()
      this.showLogin = false
      this.chooseQuestion()
      this.mixOptions()
      this.showGame = true
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
        console.log("Respuesta correcta")
        this.chooseQuestion()
        this.mixOptions()

      } else {
        console.log("respuesta incorrecta")
      }

      //console.log(this.question)
    }



  },
}
</script>