<template>
  <div>
    <px-questions v-bind:questions="questions" v-bind:history="history"/>
  </div>
</template>

<script>
import api from "../api"
import PxQuestions from '../components/PxQuestions.vue'
export default {
  name: "Home",

  components: {
    PxQuestions,
  },

  data() {
    return {
      questions: [],
      history: []
    }
  },

  created() {
    api.getQuestions().then((questions) => (this.questions = questions))
    api.getPlayerHistory().then((history) => (this.history = history.reverse()))
  }
}
</script>