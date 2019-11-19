<template>
  <component :is="layout" :key="componentKey">
    <router-view @update-template="updateTemplate"/>
  </component>
</template>

<script>

import MainPageLayout from './MainPageLayout'

export default {
  name: 'MainPage',
  data: function () {
    return {
      componentKey: 0
    }
  },
  computed: {
    layout: function () {
      return this.$route.meta.layout || MainPageLayout
    }
  },
  methods: {
    updateTemplate: function () {
      this.componentKey++
    }
  }
}
</script>
