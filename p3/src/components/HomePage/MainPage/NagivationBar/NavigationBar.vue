<template>
  <ul class="nav nav-tabs">
    <NavigationItem v-for="(page, index) in pages" :route-name="page.routeName" :key="index">
      <FontAwesomeIcon :icon="page.icon" class="navigationIcon"/>
      {{page.value}}
    </NavigationItem>
  </ul>
</template>

<script>
import {pages} from '../../../../helpers/commons/constants'
import NavigationItem from './NavigationItem/NavigationItem'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'NavigationBar',
  components: {NavigationItem, FontAwesomeIcon},
  data: function () {
    return {
      pages: pages
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
</style>
