<template>
  <div class="text-center">
    <h1 class="display-4">Get Ready!</h1>
    <div class="spinner-grow" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <h2 class="text-muted">{{ countDown }}</h2>
  </div>
</template>

<script>
export default {
  name: 'CountdownDisplay',
  data: function () {
    return {
      countDown: 3
    }
  },
  methods: {
    loadingScreenTimeDown: function () {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown--
          this.loadingScreenTimeDown()
        }, 1000)
      } else {
        this.$emit('finish-countdown')
      }
    }
  },
  mounted: function () {
    this.loadingScreenTimeDown()
  }
}
</script>

<style>
.spinner-grow{
  color: #f57f8f;
  width: 3rem;
  height: 3rem;
}
</style>
