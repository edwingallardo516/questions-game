<template>
  <div>
    <px-questions v-bind:questions="questions"/>
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
    }
  },

  created() {
    api.getQuestions()
      .then((questions) => (this.questions = questions))
  }
}
</script>