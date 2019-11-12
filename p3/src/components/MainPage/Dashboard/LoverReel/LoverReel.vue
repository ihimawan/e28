<template>
  <div>
    <div class="card-deck">
      <div class="card border-secondary" v-for="profile in profiles" :key="profile.title">
        <img :src="profile.url" width="300" height="320" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">{{profile.title}}</h5>
          <p class="card-text">{{profile.description}}</p>
          <div v-if="!hasPlayerPassed">
            <button class="btn btn-primary" @click="$emit('open-modal')">Chat with
              me!</button>
          </div>
          <div v-else>
            <button class="btn btn-primary" @click="journeyEndHandler">Chat with
              me!</button>
          </div>
        </div>
        <div class="card-footer">
          <small class="text-muted">{{profile.distance}} alpaca distances away</small>
        </div>
      </div>
    </div>
    <div class="text-center">
      <button type="button" class="btn btn-link" @click="refreshProfiles">Can't find one you
        like? Load more...</button>
    </div>
  </div>
</template>

<script>

import { getHomeProfiles } from '../../../../helpers/main/settings'

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
      profiles: getHomeProfiles()
    }
  },
  methods: {
    journeyEndHandler: function () {
      window.open('https://indrihimawan.com/')
    },
    refreshProfiles: function () {
      this.profiles = getHomeProfiles()
    }
  }
}
</script>
