<template>
  <div v-if="loaded">
    <div v-if="!found">
      Unable to find conversation.
    </div>
    <div class="container" v-else>
      <MessageText v-for="(message, index) in messages" :message="message" :key="index">{{message.text}}</MessageText>
    </div>
  </div>
</template>

<script>
import {getJSONFromLocalStorage, messageDataKey} from '../../../../helpers/commons/constants'
import MessageText from './MessageText/MessageText'

export default {
  name: 'MessagesDetailsPage',
  components: {MessageText},
  props: ['userId'],
  data: function () {
    return {
      loaded: false,
      found: false,
      messages: []
    }
  },
  mounted () {
    const allMessages = getJSONFromLocalStorage(messageDataKey)
    const messageForId = allMessages.find(messageInfo => messageInfo.userId === Number(this.userId))
    if (messageForId) {
      this.found = true
      this.messages = messageForId.messages
    }
    this.loaded = true
  }
}
</script>
