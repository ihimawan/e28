<template>
  <div id="main-page">
    <Orchestrator/>
  </div>
</template>

<script>

import Orchestrator from '../containers/Orchestrator/Orchestrator'

export default {
  components: {Orchestrator},
  name: 'Home'
}
</script>

<style scoped>
  #main-page {
    background-image: url(../../src/assets/images/bg.jpg);
    background-repeat: repeat;
    color: #1A535C;
    min-height: 100vh;
  }
</style>
