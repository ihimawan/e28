<template>
  <div>
    <PreIntroPage @next="fromPreIntro" v-if="currentStage === 'pre-intro'"/>
    <IntroPage @next="fromIntro" v-if="currentStage === 'intro'"/>
  </div>
</template>

<script>
import PreIntroPage from './PreIntroPage/PreIntroPage'
import IntroPage from './IntroPage/IntroPage'
import {
  copyJSONValues,
  getDefaultPlayerData,
  introStages,
  playerDataKey,
  setJSONToLocalStorage
} from '../../../helpers/commons/constants'
import router from '../../../router'

export default {
  name: 'HelloPage',
  components: {PreIntroPage, IntroPage},
  data: function () {
    return {
      currentStage: introStages[0]
    }
  },
  methods: {
    fromIntro: function (playerData) {
      const newPlayerData = getDefaultPlayerData()
      setJSONToLocalStorage(playerDataKey, copyJSONValues(newPlayerData, playerData))
      router.push({name: 'HomePage'})
    },
    fromPreIntro: function () {
      this.currentStage = introStages[1]
    }
  }
}
</script>
