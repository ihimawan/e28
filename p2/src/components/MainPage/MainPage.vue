<template>
  <Layout>
    <template #header>Welcome, {{playerData.name}}.</template>
    <template #subtext>You look like someone who could use a pretty alpaca...</template>
    <NavigationBar :active-index.sync="activePageIndex" @change-page="changePage"/>

    <div v-if="activePageIndex === 0">
      <Dashboard :player-data="playerData" @go-to-game="$emit('next')"/>
    </div>
    <div v-else-if="activePageIndex === 1">
      <Profile :player-data="playerData"/>
    </div>
  </Layout>
</template>

<script>
import Dashboard from './Dashboard/Dashboard'
import Layout from '../UI/Layout/Layout'
import NavigationBar from './NagivationBar/NavigationBar'
import Profile from './Profile/Profile'

export default {
  name: 'MainPage',
  components: {Profile, NavigationBar, Layout, Dashboard},
  props: {
    playerData: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      activePageIndex: 0
    }
  },
  methods: {
    changePage: function (pageIndex) {
      this.activePageIndex = pageIndex
    }
  }
}
</script>
