<template>
  <Layout>
    <template #header>Llama or Alpaca Test</template>
    <template #subtext>Because we can't deal with Llamas. They're Llaaaaame (hehe)</template>

    <Instructions v-show="instructionsShow" @return-to-home="$emit('go-home')" @begin-game="readyHandler"/>
    <Countdown v-if="loadingScreenShow" @finish-countdown="startGameHandler"/>

    <CoreGame v-if="!instructionsShow && !loadingScreenShow" @go-home="$emit('go-home')" @game-finish="gameFinishHandler"/>

    <Modal :modal-show.sync="modal.show" :modal-data="modal" @agree-action="continuePage">
      <div v-if="modal.wrongProfiles.length > 0">
        <p><strong>You got the following wrong:</strong></p>
        <img :src="wrongProfile.url" v-for="(wrongProfile, index) in modal.wrongProfiles"
             class="rounded answer-review-img" :key="index">
      </div>
      <div v-else>
        <strong>You got nothing wrong! You are an expert!</strong>
      </div>
    </Modal>

  </Layout>
</template>

<script>
import Layout from '../UI/Layout/Layout'
import Instructions from './Instructions/Instructions'
import Countdown from './Countdown/Countdown'
import CoreGame from './CoreGame/CoreGame'
import Modal from '../UI/Modal/Modal'

export default {
  name: 'Game',
  components: {Modal, CoreGame, Countdown, Instructions, Layout},
  data: function () {
    return {
      instructionsShow: true,
      loadingScreenShow: false,
      passed: null,
      modal: {
        wrongProfiles: []
      }
    }
  },
  methods: {
    continuePage: function () {
      return false
    },
    readyHandler: function () {
      this.instructionsShow = false
      this.loadingScreenShow = true
    },
    startGameHandler: function () {
      this.loadingScreenShow = false
    },
    gameFinishHandler: function (modalData) {
      this.modal = modalData
      this.modal.show = true
    }
  }
}
</script>

<style>
  .answer-review-img {
    margin: 5px;
    max-width:100px;
    max-height:100px
  }
</style>
