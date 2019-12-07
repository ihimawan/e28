<template>
  <HelloPage v-if="!playerData" @profile-created="profileCreated"/>
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
  methods: {
    profileCreated: function (newPlayerData) {
      this.playerData = newPlayerData
    }
  },
  mounted () {
    this.playerData = getJSONFromLocalStorage(playerDataKey)
  }
}
</script>
