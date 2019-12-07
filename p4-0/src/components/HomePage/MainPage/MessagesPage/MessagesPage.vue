<template>
  <div v-if="loaded">
    <MessageTile v-for="messageInfo in messageInfos" :message-info="messageInfo" :key="messageInfo.userId"/>
  </div>
</template>

<script>
import MessageTile from './MessageTile/MessageTile'
import {getJSONFromLocalStorage, messageDataKey} from '../../../../helpers/commons/constants'
export default {
  name: 'MessagesPage',
  components: {MessageTile},
  data: function () {
    return {
      loaded: false,
      messageInfos: [{}]
    }
  },
  mounted () {
    const messages = getJSONFromLocalStorage(messageDataKey)
    messages.sort((first, second) => {
      return second.lastMessageTimestamp - first.lastMessageTimestamp
    })
    this.messageInfos = messages
    this.loaded = true
  }
}
</script>
