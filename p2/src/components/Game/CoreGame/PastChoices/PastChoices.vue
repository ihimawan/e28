<template>
  <div class="col-sm answer-review">
    <img :src="display.url" v-for="(display, index) in choiceDisplays"
         class="rounded answer-review-img" :key="index">
  </div>
</template>

<script>
export default {
  name: 'PastChoices',
  props: {
    choiceDisplays: Array
  }
}
</script>
