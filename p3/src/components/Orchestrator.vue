<template>
  <div id="main-page">
    <PreIntroPage @next="fromPreIntro" v-if="currentStage === 'pre-intro'"/>
    <IntroPage @next="fromIntro" v-if="currentStage === 'intro'"/>
    <MainPage @next="fromMainPage" v-if="currentStage === 'home'" :playerData="playerData" @player-data-update="playerDataUpdate"/>
    <GamePage @go-home="fromGame" v-if="currentStage === 'game'" />
  </div>
</template>

<script>
import PreIntroPage from './PreIntroPage/PreIntroPage'
import IntroPage from './IntroPage/IntroPage'
import * as constants from '../helpers/commons/constants'
import MainPage from './MainPage/MainPage'
import GamePage from './GamePage/GamePage'

export default {
  components: {GamePage, MainPage, PreIntroPage, IntroPage},
  data: function () {
    return {
      currentStage: constants.gameStages[0],
      playerData: {
        name: null,
        selectedGender: null,
        selectedPictureIdx: null,
        passedTest: false,
        about: null,
        lookingFor: null,
        initiated: 0,
        received: 0,
        ghosted: 0
      }
    }
  },
  methods: {
    fromIntro: function (playerData) {
      Object.keys(playerData).forEach(key => {
        this.playerData[key] = playerData[key]
      })
      this.currentStage = constants.gameStages[2]
    },
    playerDataUpdate: function (playerData) {
      Object.keys(playerData).forEach(key => {
        this.playerData[key] = playerData[key]
      })
    },
    fromPreIntro: function () {
      this.currentStage = constants.gameStages[1]
    },
    fromMainPage: function () {
      this.currentStage = constants.gameStages[3]
    },
    fromGame: function (testPassed = false) {
      this.currentStage = constants.gameStages[2]
      if (!this.playerData.passedTest) {
        this.playerData.passedTest = testPassed
      }
    }
  }
}
</script>

<style scoped>
  #main-page {
    background-image: url(../../src/assets/images/bg.jpg);
    background-repeat: repeat;
    color: #1A535C;
    min-height: 100vh;
    padding-bottom: 50px;
  }
</style>
