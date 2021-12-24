<template>
  <div>
    <h1> Aqui va el juego </h1>
    <px-input-player-name/>
  </div>
</template>

<script>
import PxInputPlayerName from './PxInputPlayerName.vue'

export default {
  name: 'PxQuestions',
  components: {
    PxInputPlayerName
  }
}
</script>