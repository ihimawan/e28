<template>
  <ul class="nav nav-tabs">
    <NavigationItem v-for="(page, index) in pages" :route-name="page.routeName" :key="index">
      <FontAwesomeIcon :icon="page.icon" class="navigationIcon"/>
      {{page.value}}
      <span class="badge badge-pill badge-pink" v-if="page.value === 'Messages' && messageBadge">{{messageBadge}}</span>
    </NavigationItem>
  </ul>
</template>

<script>
import { pages } from '../../../../helpers/commons/constants'
import NavigationItem from './NavigationItem/NavigationItem'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'NavigationBar',
  components: {NavigationItem, FontAwesomeIcon},
  data: function () {
    return {
      loaded: false,
      pages: pages
    }
  },
  computed: {
    messageBadge: function () {
      return this.$store.state.messageCount
    }
  },
  mounted: function () {
    if (!this.messageBadge) {
      this.$store.dispatch('setMessageCount')
    }
  }
}
</script>

<style scoped>
ul {
  margin-bottom: 10px;
}
.navigationIcon {
  margin-right: 3px;
}

.badge-pink {
  background-color: #ffd8dd;
}
</style>
