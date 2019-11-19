<template>
  <div v-if="modalShow">
    <div class="modal-backdrop show fade"></div>
    <div class="modal show in" tabindex="-1" role="dialog" aria-hidden="true"
         style="display:block;">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Send message to {{data.profile.title}}!</h5>
            <button type="button" class="close" @click="dismissModalHandler" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center">
            <img class="modal-img rounded" :src="require('../../../../../assets/images/game/' + data.profile.id + '.jpg')">
            <h3>{{data.profile.title}}</h3>
            <p>{{data.profile.description}}</p>
            <div v-if="!sent">
              <div class="form-group">
                <label for="chat-box"><small>Send captivating message to {{data.profile.title}}:</small></label>
                <textarea class="form-control" :class="{'is-invalid': !validMessage}" id="chat-box" rows="3" placeholder="I'm an alpaca with a Tesla. Let's go on a date." v-model="message"></textarea>
              </div>
              <button type="button" class="btn btn-primary" :disabled="!this.isValidMessage" @click="sendMessage">Send Message!</button>
            </div>
            <div v-else>
              <p class="lead">Sent to {{data.profile.title}}! Go to the <strong>Messages</strong> tab to view your messages!</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="dismissModalHandler">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  createMessage,
  getJSONFromLocalStorage,
  messageDataKey, playerId,
  setJSONToLocalStorage
} from '../../../../../helpers/commons/constants'

export default {
  name: 'ChatModal',
  props: {
    modalShow: Boolean,
    data: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      sent: false,
      message: '',
      validMessage: true
    }
  },
  computed: {
    isValidMessage: function () {
      return this.message !== ''
    }
  },
  methods: {
    sendMessage: function () {
      const existingMessages = getJSONFromLocalStorage(messageDataKey)
      const updatedMessages = createMessage(existingMessages, playerId, this.data.profile.id, this.data.profile.title, this.message)
      setJSONToLocalStorage(messageDataKey, updatedMessages)
      this.sent = true
    },
    dismissModalHandler: function () {
      this.$emit('update:modal-show', false)
    },
    agreeHandler: function () {
      this.$emit('agree-action', this.message, this.data.profile.id)
    }
  }
}
</script>

<style>
  .modal-img {
    max-width:200px;
    margin-bottom: 15px;
  }

</style>
