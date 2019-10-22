<template>
  <Layout>
    <slot #header>stupid</slot>
  </Layout>
</template>

<script>
import Layout from '../UI/Layout/Layout'

export default {
  components: {Layout},
  name: 'PreIntro'
}
</script>
