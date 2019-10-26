<template>
  <ul class="nav nav-tabs">
    <NavigationItem v-for="(pageName, index) in pageNames" :active='index===activeIndex'
    @clicked="navigationClicked(index)" :key="index">{{pageName}}</NavigationItem>
  </ul>
</template>

<script>
import {pages} from '../../../helpers/commons/constants'
import NavigationItem from './NavigationItem/NavigationItem'

export default {
  name: 'NavigationBar',
  components: {NavigationItem},
  props: {
    activeIndex: {
      type: Number,
      required: true
    }
  },
  data: function () {
    return {
      pageNames: pages
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
</style>
