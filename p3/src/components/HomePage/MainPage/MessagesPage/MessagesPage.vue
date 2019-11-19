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
    this.messageInfos = getJSONFromLocalStorage(messageDataKey)
    this.loaded = true
  }

}
</script>
