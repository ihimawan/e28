<template>
  <div>
    <div class="alert alert-danger" role="alert" v-if="!hasPlayerPassed">
      According to our data, you haven't taken/passed the <strong>Llama or Alpaca</strong> test yet.
      Click <a href="#" @click="$emit('open-modal')">here</a> to get more information.
    </div>
    <div class="alert alert-success" role="alert" v-else>
      You've passed the <a href="#" @click="$emit('open-modal')">Llama or Alpaca Test</a>, woohoo!
      Now you can feel free to chat with other Alpacas :) Good luck out there! ❤
    </div>
  </div>
</template>

<script>
export default {
  name: 'TakeTestAlert',
  props: {
    hasPlayerPassed: {
      type: Boolean,
      default: false
    }
  }
}
</script>
