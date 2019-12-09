<template>
  <component :is="layout">
    <router-view/>
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
  }
}
</script>
