<template>
  <div>
    <body id="main-page">
    <div class="container" id="main-container">
      <div class="card" id="main-card">
        <div class="card-body">
          <h1 class="display-4">
            <slot name="header">header text</slot>
          </h1>
          <p class="lead">
            <slot name="subtext">sub text</slot>
          </p>
          <slot>body contents</slot>
          <slot name="footer">
            <DefaultFooter/>
          </slot>
        </div>
      </div>
    </div>
    </body>
  </div>
</template>

<script>
import DefaultFooter from './DefaultFooter/DefaultFooter'
export default {
  name: 'DefaultLayout',
  components: {DefaultFooter}
}
</script>

<style scoped>
  #main-container {
    align-items: center;
  }
  #main-card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  #main-page {
    background-image: url(../../../assets/images/bg.jpg);
    background-repeat: repeat;
    padding-top: 50px;
    color: #1A535C;
  }
</style>
