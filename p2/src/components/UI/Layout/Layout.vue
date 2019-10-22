<template>
  <div>
    <body id="main-page">
    <div class="container">
      <div class="card" id="main-card">
        <div class="card-body">
          <h1 class="display-4">
            <slot name="header">header text</slot>
          </h1>
          <p class="lead">
            <slot name="lead">sub text</slot>
          </p>
          <slot>body contents</slot>
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
      </div>
    </div>
    </body>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
  #main-card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  #main-page {
    background-image: url(../../../assets/images/bg.jpg);
    background-repeat: repeat;
    color: #1A535C;
  }
</style>
