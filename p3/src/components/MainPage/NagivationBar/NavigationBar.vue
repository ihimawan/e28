<template>
  <ul class="nav nav-tabs">
    <NavigationItem v-for="(page, index) in pages" :active='index===activeIndex'
    @clicked="navigationClicked(index)" :key="index">
      <FontAwesomeIcon :icon="page.icon" class="navigationIcon" />{{page.value}}</NavigationItem>
  </ul>
</template>

<script>
import {pages} from '../../../helpers/commons/constants'
import NavigationItem from './NavigationItem/NavigationItem'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'NavigationBar',
  components: {NavigationItem, FontAwesomeIcon},
  props: {
    activeIndex: {
      type: Number,
      required: true
    }
  },
  data: function () {
    return {
      pages: pages
    }
  },
  methods: {
    navigationClicked: function (index) {
      this.$emit('update:active-index', index)
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
