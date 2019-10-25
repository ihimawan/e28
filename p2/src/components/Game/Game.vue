<template>
  <Layout>
    <template #header>Llama or Alpaca Test</template>
    <template #subtext>Because we can't deal with Llamas. They're Llaaaaame (hehe)</template>

    <Instructions v-if="currentIndex === null" @return-to-home="" @begin-game=""/>

  </Layout>
</template>

<script>
import Layout from '../UI/Layout/Layout'
import Instructions from './Instructions/Instructions'
import * as settings from '../../helpers/game/settings'

export default {
  name: 'Game',
  components: {Instructions, Layout},
  data: function () {
    return settings.getGameStartState()
  },
  methods: {
    gameBeginHandler: function () {
      // reset game settings
      this.data = settings.getGameStartState()
      this.loadingScreenShow = true
      this.loadingScreenTimeDown()
      this.generateNewImageHandler()
    },
    loadingScreenTimeDown: function () {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown--
          this.loadingScreenTimeDown()
        }, 1000)
      } else {
        this.loadingScreenShow = false
      }
    },
    generateNewImageHandler: function () {
      // check if game is finished
      if (this.doneIndexes.size >= settings.maxChoices ||
        this.doneIndexes.size >= this.choices.length) {
        this.modal = settings.resultHandler(this.score)
        if (this.modal.status === 'win') {
          this.testPassed = true
        }
        return
      }
      // if not, generate new image
      let newIndex = null
      while (newIndex === null || this.doneIndexes.has(newIndex)) {
        newIndex = Math.floor(Math.random() * this.choices.length)
      }
      this.currentIndex = newIndex
      this.doneIndexes.add(newIndex)
    }
  }
}
</script>
