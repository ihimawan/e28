<template>
  <div>
    <div class="row" v-if="!isSelfMessage">
      <div class="col-sm-1 message-img">
        <img :src="require('../../../../../assets/images/game/' + message.userId + '.jpg')" class="rounded" width="75" height="75" />
      </div>
      <div class="col-sm-8 message-text-from">{{message.text}}</div>
    </div>
    <div class="row" v-else>
      <div class="col-sm-8 .message-text-to">{{message.text}}</div>
      <div class="col-sm-1 message-img">
        <img :src="require('../../../../../assets/images/game/' + message.userId + '.jpg')" class="rounded" width="75" height="75" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageText',
  props: {
    message: Object
  },
  computed: {
    isSelfMessage: function () {
      return Number(this.message.userId) === 0
    }
  }
}
</script>

<style>
.message-text-from{
  background-color: #fcedee;
  margin-left: 25px;
}
.message-text-to{
  background-color: #e9ecef;
  margin-right: 25px;
}
</style>
