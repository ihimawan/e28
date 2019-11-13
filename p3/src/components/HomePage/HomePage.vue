<template>
  <HelloPage v-if="!playerData"/>
  <MainPage v-else-if="playerData"/>
</template>

<script>
import {getJSONFromLocalStorage, playerDataKey} from '../../helpers/commons/constants'
import MainPage from './MainPage/MainPage'
import HelloPage from './HelloPage/HelloPage'

export default {
  components: {HelloPage, MainPage},
  data: function () {
    return {
      playerData: null
    }
  },
  mounted () {
    this.playerData = getJSONFromLocalStorage(playerDataKey)
  }
}
</script>
