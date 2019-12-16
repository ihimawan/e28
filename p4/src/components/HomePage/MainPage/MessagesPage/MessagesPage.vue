<template>
  <div>
    <h4>Messages From Lovers</h4>
    <div v-if="loaded && messageInfos!==null">
      <MessageTile v-for="(messageInfo) in messageInfos" :message-info="messageInfo" :key="messageInfo.userId"/>
    </div>
    <div v-else-if="loaded && messageInfos === null">
      <p class="lead">No messages to display</p>
    </div>
    <div v-else>
      <p class="lead">Loading messages...</p>
    </div>
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
    if (messages) {
      messages.sort((first, second) => {
        return second.lastMessageTimestamp - first.lastMessageTimestamp
      })
      this.messageInfos = messages
    }else{
      this.messageInfos = null
    }

    this.loaded = true
  }
}
</script>
