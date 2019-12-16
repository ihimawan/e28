<template>
  <router-link :to="{name: 'MessagesDetailsPage', params: {userId: messageInfo.userId}}">
    <div class="media text-muted pt-3 message-tile" :data-test="['message-tile', 'message-tile-'.concat(messageInfo.userId)].join(' ')">
      <img :src="require('../../../../../assets/images/game/' + messageInfo.userId + '.jpg')" class="mr-2 rounded" width="32" height="32">
      <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
        <strong class="d-block text-gray-dark">{{messageInfo.username}}</strong>
        <span class="badge badge-warning" v-if="!messageInfo.read">NEW</span>
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
      const messages = this.messageInfo.messages
      return messages[messages.length - 1].text
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
