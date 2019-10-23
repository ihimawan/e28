<template>
  <div>
    <PreIntro @next="goToInfoHandler" v-if="currentStage === 'pre-intro'"/>
    <Intro v-if="currentStage === 'intro'"/>
  </div>
</template>

<script>
import PreIntro from '../../components/PreIntro/PreIntro'
import Intro from '../../components/Intro/Intro'
import * as constants from '../../helpers/commons/constants'

export default {
  components: {PreIntro, Intro},
  name: 'Orchestrator',
  data: function () {
    return {
      currentStage: constants.gameStages[0]
    }
  },
  methods: {
    goToInfoHandler: function () {
      this.currentStage = constants.gameStages[1]
    }
  }
}
</script>
