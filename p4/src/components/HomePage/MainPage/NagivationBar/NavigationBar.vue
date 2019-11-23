<template>
  <ul class="nav nav-tabs">
    <NavigationItem v-for="(page, index) in pages" :route-name="page.routeName" :key="index">
      <FontAwesomeIcon :icon="page.icon" class="navigationIcon"/>
      {{page.value}}
      <span class="badge badge-pill badge-pink" v-if="loaded && page.value === 'Messages' && messageBadge">{{messageBadge}}</span>
    </NavigationItem>
  </ul>
</template>

<script>
import {getJSONFromLocalStorage, messageDataKey, pages} from '../../../../helpers/commons/constants'
import NavigationItem from './NavigationItem/NavigationItem'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'NavigationBar',
  components: {NavigationItem, FontAwesomeIcon},
  data: function () {
    return {
      loaded: false,
      pages: pages,
      messageBadge: 0
    }
  },
  mounted: function () {
    const existingConversations = getJSONFromLocalStorage(messageDataKey)
    this.messageBadge = existingConversations.filter(convo => !convo.read).length
    this.loaded = true
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
