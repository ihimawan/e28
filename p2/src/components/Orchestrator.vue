<template>
  <div id="main-page">
    <PreIntro @next="fromPreIntro" v-if="currentStage === 'pre-intro'"/>
    <Intro @next="fromIntro" v-if="currentStage === 'intro'"/>
    <MainPage @next="fromMainPage" v-if="currentStage === 'home'" :playerData="playerData" @player-data-update="playerDataUpdate"/>
    <Game @go-home="fromGame" v-if="currentStage === 'game'" />
  </div>
</template>

<script>
import PreIntro from './PreIntro/PreIntro'
import Intro from './Intro/Intro'
import * as constants from '../helpers/commons/constants'
import MainPage from './MainPage/MainPage'
import Game from './Game/Game'

export default {
  components: {Game, MainPage, PreIntro, Intro},
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
        received: 0
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
