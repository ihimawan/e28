<template>
  <div v-if="loaded">
    <div v-if="!found">
      Unable to find conversation.
    </div>
    <div class="container" v-else>
      <div class="fixed-height-container overflow-content" id="message-window">
        <MessageText v-for="(message, index) in messages" :message="message" :player-image-index="playerImageIndex" :key="index">{{message.text}}</MessageText>
      </div>
      <div class="row form-group">
        <div class="col-md-11">
          <textarea class="form-control" rows="3" placeholder="Write message" v-model="currentMessage"></textarea>
          <small>Note: They will NEVER reply because they are not coded :P So don't wait!</small>
        </div>
        <div class="col-md-1">
          <button class="btn btn-primary send-button" @click="sendMessage">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  createMessage,
  getJSONFromLocalStorage,
  messageDataKey,
  playerDataKey, playerId,
  readMessage, setJSONToLocalStorage, wasMessageRead
} from '../../../../helpers/commons/constants'
import MessageText from './MessageText/MessageText'

export default {
  name: 'MessagesDetailsPage',
  components: {MessageText},
  props: ['userId'],
  data: function () {
    return {
      loaded: false,
      found: false,
      messages: [],
      playerImageIndex: null,
      currentMessage: ''
    }
  },
  methods: {
    sendMessage: function () {
      if (this.currentMessage !== '') {
        const allMessages = getJSONFromLocalStorage(messageDataKey)
        const updatedMessages = createMessage(allMessages, playerId, Number(this.userId), null, this.currentMessage)
        this.currentMessage = ''
        const messageForId = allMessages.find(messageInfo => messageInfo.userId === Number(this.userId))
        this.messages = messageForId.messages
        setJSONToLocalStorage(messageDataKey, updatedMessages)
      }
    }
  },
  updated () {
    let container = this.$el.querySelector('#message-window')
    container.scrollTop = container.scrollHeight
  },
  computed: {
    messageCount: function () {
      return this.$store.state.messageCount
    }
  },
  mounted () {
    if (!this.messageCount) {
      this.$store.dispatch('setMessageCount')
    }

    const allMessages = getJSONFromLocalStorage(messageDataKey)
    const playerData = getJSONFromLocalStorage(playerDataKey)
    this.playerImageIndex = playerData.selectedPictureIdx
    const messageForId = allMessages.find(messageInfo => messageInfo.userId === Number(this.userId))
    if (messageForId) {
      this.found = true
      this.messages = messageForId.messages
      if (!wasMessageRead(allMessages, messageForId.userId)) {
        const updatedMessages = readMessage(allMessages, messageForId.userId)
        this.$store.commit('updateMessageCount', -1)
        setJSONToLocalStorage(messageDataKey, updatedMessages)
      }
    }
    this.loaded = true
  }
}
</script>

<style scoped>
.fixed-height-container {
  height: 500px;
  padding:3px;
  background:#f00;
  margin-bottom: 15px;
}

.overflow-content {
  height:500px;
  overflow-x: hidden;
  overflow-y: visible;
  background:#fff;
}

.send-button {
  height: 75px;
  width: 75px;
}
</style>
