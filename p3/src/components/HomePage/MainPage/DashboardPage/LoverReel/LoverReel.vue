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
        <div class="card border-secondary" v-for="profile in profiles" :key="profile.title">
          <img :src="require('../../../../../assets/images/game/' + profile.id + '.jpg')" width="300" height="320"
               class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">{{profile.title}}</h5>
            <p class="card-text">{{profile.description}}</p>
            <div v-if="!hasPlayerPassed">
              <button class="btn btn-primary" @click="$emit('open-modal')">Chat with
                me!
              </button>
            </div>
            <div v-else>
              <button class="btn btn-primary" @click="chatHandler">Chat with
                me!
              </button>
            </div>
          </div>
          <div class="card-footer">
            <small class="text-muted">{{profile.distance}} alpaca distances away</small>
          </div>
        </div>
      </div>
      <div class="text-center">
        <button type="button" class="btn btn-link" @click="refreshProfiles">Can't find one you
          like? Load more...
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import { getHomeProfiles } from '../../../../../helpers/main/settings'
import axios from '../../../../../axios'

export default {
  name: 'LoverReel',
  props: {
    hasPlayerPassed: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      loading: true,
      masterProfileCollection: null,
      profiles: null
    }
  },
  methods: {
    chatHandler: function () {
      window.open('https://indrihimawan.com/')
    },
    refreshProfiles: function () {
      this.profiles = getHomeProfiles(this.masterProfileCollection)
    }
  },
  mounted () {
    axios.get('/profiles')
      .then(res => {
        this.masterProfileCollection = res.data
        this.refreshProfiles()
      })
      .finally(() => (this.loading = false))
  }
}
</script>
