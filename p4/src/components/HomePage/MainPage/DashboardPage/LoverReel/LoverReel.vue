<template>
  <div>
    <div class="text-center" v-if="loading">
      <div class="spinner-grow" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <p class="lead">
        Loading pretty alpacas...
      </p>
    </div>
    <div class="text-center" v-else-if="!loading && !profiles">
      <p class="lead">
        Unable to load profiles :( come back later?
      </p>
    </div>
    <div v-else>
      <div class="card-deck">
        <div class="card border-secondary" v-for="(profile, index) in profiles" :key="profile.title" :data-test="['lover-reel-profile', 'lover-reel-profile-'.concat(index)].join(' ')">
          <img :src="require('../../../../../assets/images/game/' + profile.id + '.jpg')" width="300" height="320"
               class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">{{profile.title}}</h5>
            <p class="card-text">{{profile.description}}</p>
            <button class="btn btn-primary" @click="!hasPlayerPassed ? $emit('open-modal') : openChatModal(profile)">
              Chat with me!
            </button>
          </div>
          <div class="card-footer">
            <small class="text-muted">{{profile.distance}} alpaca distances away</small>
          </div>
        </div>
      </div>
      <div class="text-center">
        <button type="button" class="btn btn-link" @click="refreshProfiles" data-test="load-more-button">Can't find one you
          like? Load more...
        </button>
      </div>
      <ChatModal :modal-show.sync="modal.show" :data="modal" />
    </div>
  </div>
</template>

<script>

import { getHomeProfiles } from '../../../../../helpers/main/settings'
import ChatModal from '../ChatModal/ChatModal'

export default {
  name: 'LoverReel',
  components: {ChatModal},
  props: {
    hasPlayerPassed: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      loading: true,
      profiles: null,
      modal: {
        show: false,
        profile: null
      }
    }
  },
  methods: {
    openChatModal: function (profile) {
      this.modal.show = true
      this.modal.profile = profile
    },
    refreshProfiles: function () {
      this.profiles = getHomeProfiles(this.masterProfileCollection)
    }
  },
  computed: {
    masterProfileCollection: function () {
      return this.$store.state.profileCollections
    }
  },
  mounted () {
    if (!this.masterProfileCollection) {
      this.$store.dispatch('setProfileCollections').then(() => {
        this.refreshProfiles()
      }).finally(() => (this.loading = false))
    } else {
      this.refreshProfiles()
      this.loading = false
    }
  }
}
</script>
