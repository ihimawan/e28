<template>
  <div class="col-sm-4" align="center">
    <h2>{{counterValue}}</h2>
    <p><slot /></p>
  </div>
</template>

<script>
export default {
  name: 'DisplayMetric',
  props: {
    counterValue: Number
  }
}
</script>
