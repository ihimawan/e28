<template>
  <Layout>
    <template #header>Llama or Alpaca Test</template>
    <template #subtext>Because we can't deal with Llamas. They're Llaaaaame (hehe)</template>

    <Instructions v-show="instructionsShow" @return-to-home="$emit('go-home', passed)" @begin-game="readyHandler"/>
    <Countdown v-if="loadingScreenShow" @finish-countdown="startGameHandler"/>

    <div v-if="gameBegin">
      <button @click="$emit('go-home', passed)" class="btn btn-secondary">Nevermind, I want
        to go back to looking at Alpacas
      </button>
      <button @click="restartGameHandler" class="btn btn-primary">Messed up... I want a
        restart.
      </button>
      <CoreGame @go-home="$emit('go-home', passed)" @game-finish="gameFinishHandler"/>
    </div>

    <Modal :modal-show.sync="modal.show" :modal-data="modal" @agree-action="$emit('go-home', passed)">
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
      passed: false,
      modal: {
        title: null,
        text: null,
        agree: null,
        disagree: null,
        img: null,
        show: false,
        wrongProfiles: [],
        status: null
      }
    }
  },
  computed: {
    gameBegin: function () {
      return !this.instructionsShow && !this.loadingScreenShow
    }
  },
  methods: {
    restartGameHandler: function () {
      this.loadingScreenShow = true
    },
    readyHandler: function () {
      this.instructionsShow = false
      this.loadingScreenShow = true
    },
    startGameHandler: function () {
      this.loadingScreenShow = false
    },
    gameFinishHandler: function (modalData) {
      Object.keys(this.modal).forEach(key => {
        this.modal[key] = modalData[key]
      })
      this.modal.show = true
      this.instructionsShow = true
      if (this.modal.status === 'win') {
        this.passed = true
      }
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
