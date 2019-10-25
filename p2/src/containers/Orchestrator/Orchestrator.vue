<template>
  <div>
    <PreIntro @next="fromPreIntro" v-if="currentStage === 'pre-intro'"/>
    <Intro @next="fromIntro" v-if="currentStage === 'intro'"/>
    <MainPage @next="fromMainPage" v-if="currentStage === 'home'" :playerData="playerData"/>
    <Game v-if="currentStage === 'game'" />
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
      currentStage: constants.gameStages[0],
      playerData: null
    }
  },
  methods: {
    fromPreIntro: function () {
      this.currentStage = constants.gameStages[1]
    },
    fromIntro: function (playerData) {
      this.playerData = playerData
      this.currentStage = constants.gameStages[2]
    },
    fromMainPage: function () {
      this.currentStage = constants.gameStages[3]
    }
  }
}
</script>
