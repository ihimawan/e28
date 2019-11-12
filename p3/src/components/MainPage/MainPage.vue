<template>
  <DefaultLayout>
    <template #header>Welcome, {{playerData.name}}.</template>
    <template #subtext>You look like someone who could use a pretty alpaca...</template>
    <NavigationBar :active-index.sync="activePageIndex" @change-page="changePage"/>

    <div v-if="activePageIndex === 0">
      <DashboardPage :player-data="playerData" @go-to-game="$emit('next')"/>
    </div>
    <div v-else-if="activePageIndex === 1">
      <ProfilePage :player-data="playerData" @update="playerDataUpdate"/>
    </div>
    <div v-else-if="activePageIndex === 2">
      No Messages available (coming soon)
    </div>
  </DefaultLayout>
</template>

<script>
import DashboardPage from './DashboardPage/DashboardPage'
import DefaultLayout from '../UI/DefaultLayout/DefaultLayout'
import NavigationBar from './NagivationBar/NavigationBar'
import ProfilePage from './ProfilePage/ProfilePage'

export default {
  name: 'MainPage',
  components: {ProfilePage, NavigationBar, DefaultLayout, DashboardPage},
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
