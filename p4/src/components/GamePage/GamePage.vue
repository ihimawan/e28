<template>
  <div>
    <InstructionsList v-show="instructionsShow" @return-to-home="returnHome" @begin-game="readyHandler"/>
    <CountdownDisplay v-if="loadingScreenShow" @finish-countdown="startGameHandler"/>

    <div v-if="gameBegin">
      <button @click="returnHome" class="btn btn-secondary" data-test="game-return-home">Nevermind, I want
        to go back to looking at Alpacas
      </button>
      <button @click="restartGameHandler" class="btn btn-primary" data-test="game-restart">Messed up... I want a
        restart.
      </button>
      <CoreGame @game-finish="gameFinishHandler" :max-choices="maxChoices"/>
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
import {maxChoices} from "../../helpers/game/settings";
import {
  createMessage,
  getJSONFromLocalStorage, messageDataKey,
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
      maxChoices: maxChoices,
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
        const allMessages = getJSONFromLocalStorage(messageDataKey)
        const updatedMessages = createMessage(allMessages, 21, 21, null, 'Congratulations for passing the test! Now you can go to your dashboard and click on \'Chat with me!\' on any profile you see and you can start chatting with them <3')
        setJSONToLocalStorage(messageDataKey, updatedMessages)
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
