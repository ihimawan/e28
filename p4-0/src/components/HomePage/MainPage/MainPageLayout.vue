<template>
  <DefaultLayout v-if="playerName">
    <template #header>Welcome, {{playerName}}.</template>
    <template #subtext>You look like someone who could use a pretty alpaca...</template>
    <NavigationBar/>

    <slot />

  </DefaultLayout>
</template>

<script>
import DefaultLayout from '../../UI/DefaultLayout/DefaultLayout'
import NavigationBar from './NagivationBar/NavigationBar'

export default {
  name: 'MainPageLayout',
  components: {NavigationBar, DefaultLayout},
  computed: {
    playerName: function () {
      return this.$store.state.playerName
    }
  },
  mounted () {
    if (!this.playerName) {
      this.$store.dispatch('setPlayerName')
    }
  }
}
</script>
