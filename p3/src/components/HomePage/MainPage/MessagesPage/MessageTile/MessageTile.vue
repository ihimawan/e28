<template>
  <router-link :to="{name: 'MessagesDetailsPage', params: {userId: messageInfo.userId}}">
    <div class="media text-muted pt-3 message-tile">
      <img :src="require('../../../../../assets/images/game/' + messageInfo.userId + '.jpg')" class="mr-2 rounded" width="32" height="32">
      <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
        <strong class="d-block text-gray-dark">{{messageInfo.username}}</strong>
        {{displayMessage}}
      </p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'MessageTile',
  props: {
    messageInfo: Object
  },
  computed: {
    displayMessage: function () {
      return this.messageInfo.messages[0].text
    }
  }
}
</script>

<style scoped>
.message-tile {
  padding: 0 10px 0 10px;
}

.message-tile:hover {
  background-color: #fcedee;
}

</style>
