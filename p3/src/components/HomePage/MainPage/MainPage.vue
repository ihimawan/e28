<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>

<script>

import MainPageLayout from './MainPageLayout'

export default {
  name: 'MainPage',
  computed: {
    layout: function () {
      return this.$route.meta.layout || MainPageLayout
    }
  }
}
</script>
