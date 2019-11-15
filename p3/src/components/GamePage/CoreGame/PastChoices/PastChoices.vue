<template>
  <div class="col-sm answer-review">
    <img :src="require('../../../../assets/images/game/' + display.id + '.jpg')" v-for="(display, index) in choiceDisplays"
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
