<template>
  <div>
    <InstructionsList v-show="instructionsShow" @return-to-home="returnHome" @begin-game="readyHandler"/>
    <CountdownDisplay v-if="loadingScreenShow" @finish-countdown="startGameHandler"/>

    <div v-if="gameBegin">
      <button @click="returnHome" class="btn btn-secondary">Nevermind, I want
        to go back to looking at Alpacas
      </button>
      <button @click="restartGameHandler" class="btn btn-primary">Messed up... I want a
        restart.
      </button>
      <CoreGame @game-finish="gameFinishHandler"/>
    </div>

    <ShowModal :modal-show.sync="modal.show" :modal-data="modal" @agree-action="returnHome">
      <div v-if="modal.wrongProfiles.length > 0">
        <p><strong>You got the following wrong:</strong></p>
        <img :src="require('../../assets/images/game/' + wrongProfile.id + '.jpg')" v-for="(wrongProfile, index) in modal.wrongProfiles"
             class="rounded answer-review-img" :key="index">
      </div>
      <div v-else>
        <strong>You got nothing wrong! You are an expert!</strong>
      </div>
    </ShowModal>
  </div>
</template>

<script>
import InstructionsList from './InstructionsList/InstructionsList'
import CountdownDisplay from './Countdown/CountdownDisplay'
import CoreGame from './CoreGame/CoreGame'
import ShowModal from '../UI/ShowModal/ShowModal'
import router from '../../router'
import {
  getJSONFromLocalStorage,
  playerDataKey,
  setJSONToLocalStorage
} from '../../helpers/commons/constants'

export default {
  name: 'GamePage',
  components: {ShowModal, CoreGame, CountdownDisplay, InstructionsList},
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
        const playerData = getJSONFromLocalStorage(playerDataKey)
        const updatedPlayerData = {...playerData}
        updatedPlayerData.passedTest = true
        setJSONToLocalStorage(playerDataKey, updatedPlayerData)
      }
    },
    returnHome: function () {
      router.push({name: 'DashboardPage'})
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
