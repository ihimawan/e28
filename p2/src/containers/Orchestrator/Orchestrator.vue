<template>
  <div>
    <PreIntro @next="fromPreIntro" v-if="currentStage === 'pre-intro'"/>
    <Intro @next="fromIntro" v-if="currentStage === 'intro'"/>
    <MainPage @next="fromMainPage" v-if="currentStage === 'home'" :playerData="playerData"/>
    <Game @go-home="fromGame" v-if="currentStage === 'game'" />
  </div>
</template>

<script>
import PreIntro from '../../components/PreIntro/PreIntro'
import Intro from '../../components/Intro/Intro'
import * as constants from '../../helpers/commons/constants'
import MainPage from '../../components/MainPage/MainPage'
import Game from '../../components/Game/Game'

export default {
  components: {Game, MainPage, PreIntro, Intro},
  data: function () {
    return {
      currentStage: constants.gameStages[3],
      playerData: {
        name: null,
        selectedGender: null,
        selectedPictureIdx: null,
        passedTest: false
      }
    }
  },
  methods: {
    fromPreIntro: function () {
      this.currentStage = constants.gameStages[1]
    },
    fromIntro: function (playerData) {
      Object.keys(this.modal).forEach(key => {
        this.modal[key] = playerData[key]
      })
      this.currentStage = constants.gameStages[2]
    },
    fromMainPage: function () {
      this.currentStage = constants.gameStages[3]
    },
    fromGame: function (testPassed = false) {
      this.currentStage = constants.gameStages[2]
      this.playerData.passedTest = testPassed
    }
  }
}
</script>
