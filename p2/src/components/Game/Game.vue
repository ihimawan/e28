<template>
  <Layout>
    <template #header>Llama or Alpaca Test</template>
    <template #subtext>Because we can't deal with Llamas. They're Llaaaaame (hehe)</template>

    <Instructions v-if="instructionsShow" @return-to-home="$emit('go-home')" @begin-game="readyHandler"/>
    <Countdown v-if="loadingScreenShow" @finish-countdown="startGameHandler"/>
    <CoreGame v-if="!instructionsShow && !loadingScreenShow" @return-to-home="$emit('go-home')"/>

  </Layout>
</template>

<script>
import Layout from '../UI/Layout/Layout'
import Instructions from './Instructions/Instructions'
import Countdown from './Countdown/Countdown'
import CoreGame from './CoreGame/CoreGame'

export default {
  name: 'Game',
  components: {CoreGame, Countdown, Instructions, Layout},
  data: function () {
    return {
      instructionsShow: true,
      loadingScreenShow: false
    }
  },
  methods: {
    readyHandler: function () {
      this.instructionsShow = false
      this.loadingScreenShow = true
    },
    startGameHandler: function () {
      this.loadingScreenShow = false
    }
  }
}
</script>
