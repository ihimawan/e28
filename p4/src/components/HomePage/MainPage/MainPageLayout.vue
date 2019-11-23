<template>
  <DefaultLayout v-if="playerData">
    <template #header>Welcome, {{playerData.name}}.</template>
    <template #subtext>You look like someone who could use a pretty alpaca...</template>
    <NavigationBar/>

    <slot />

  </DefaultLayout>
</template>

<script>
import DefaultLayout from '../../UI/DefaultLayout/DefaultLayout'
import NavigationBar from './NagivationBar/NavigationBar'
import {playerDataKey} from '../../../helpers/commons/constants'

export default {
  name: 'MainPageLayout',
  components: {NavigationBar, DefaultLayout},
  data: function () {
    return {
      playerData: null
    }
  },
  mounted () {
    this.playerData = JSON.parse(localStorage.getItem(playerDataKey))
  }
}
</script>
