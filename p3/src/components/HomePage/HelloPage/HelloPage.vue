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
      const newPlayerData = copyJSONValues(getDefaultPlayerData(), playerData)
      setJSONToLocalStorage(playerDataKey, newPlayerData)
      this.$emit('profile-created', newPlayerData)
    },
    fromPreIntro: function () {
      this.currentStage = introStages[1]
    }
  }
}
</script>
