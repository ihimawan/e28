<template>
  <Layout>
    <template #header>Welcome, {{playerData.name}}.</template>
    <template #subtext>You look like someone who could use a pretty alpaca...</template>
    <NavigationBar :active-index.sync="activePageIndex" @change-page="changePage"/>

    <div v-if="activePageIndex === 0">
      <Dashboard :player-data="playerData" @go-to-game="$emit('next')"/>
    </div>
    <div v-else-if="activePageIndex === 1">
      <ProfilePage :player-data="playerData" @update="playerDataUpdate"/>
    </div>
    <div v-else-if="activePageIndex === 2">
      No Messages available (coming soon)
    </div>
  </Layout>
</template>

<script>
import Dashboard from './Dashboard/Dashboard'
import Layout from '../UI/Layout/Layout'
import NavigationBar from './NagivationBar/NavigationBar'
import ProfilePage from './ProfilePage/ProfilePage'

export default {
  name: 'MainPage',
  components: {ProfilePage, NavigationBar, Layout, Dashboard},
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
    },
    playerDataUpdate: function (playerData) {
      this.$emit('player-data-update', playerData)
    }
  }
}
</script>
