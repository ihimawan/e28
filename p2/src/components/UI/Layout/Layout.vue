<template>
  <div>
    <body id="main-page">
    <div class="container" id="app" v-cloak>
      <div class="card" id="main-card">
        <div class="card-body">
          <h1 class="display-4">
            <slot name="header">header text</slot>
          </h1>
          <p class="lead">
            <slot name="lead">lead text</slot>
          </p>
          <slot name="body">body contents</slot>
        </div>
      </div>
    </div>
    </body>

    <slot name="footer">
      <div>
        <small>Put together by <a href="https://indrihimawan.com/" target="blank">Indri Himawan</a>
          /
          <a href="https://github.com/ihimawan/e28/tree/master/p1" target="blank">GitHub
            Repository</a>
          /
          <a href="https://github.com/ihimawan/e28/blob/master/p1/README.md" target="blank">Credits</a></small>
      </div>
    </slot>
  </div>
</template>

<script>

import 'bootstrap/dist/css/bootstrap.min.css'

export default {}
</script>

<style scoped>

</style>
