<template>
  <div>
    <div class="row justify-content-center" v-if="loading">
      Loading...
    </div>
    <div class="row justify-content-center" v-else-if="!loading && error">
      Error loading game :( come back later?
    </div>
    <div v-else>
      <div class="row justify-content-center">
        <h1 class="display-4">question {{state.doneIndexes.size}} of {{state.maxChoices}}
        </h1>
      </div>

      <div class="row justify-content-center">
        <PastChoices :choice-displays="leftChoices"/>
        <ProfileCard :current-profile="profileCollection[state.currentIndex]" @select-answer="chooseHandler"/>
        <PastChoices :choice-displays="rightChoices"/>
      </div>
    </div>
  </div>
</template>

<script>
import * as settings from '../../../helpers/game/settings'
import PastChoices from './PastChoices/PastChoices'
import ProfileCard from './ProfileCard/ProfileCard'
import {copyJSONValues, getChoiceId, llamasText} from '../../../helpers/commons/constants'

export default {
  name: 'CoreGame',
  components: {ProfileCard, PastChoices},
  data: function () {
    return {
      loading: true,
      error: false,
      state: {
        currentIndex: 0,
        leftChoiceIndexes: [],
        rightChoiceIndexes: [],
        wrongChoiceIndexes: [],
        doneIndexes: [],
        score: null,
        maxChoices: null
      }
    }
  },
  beforeMount: function () {
    this.gameBeginHandler()
  },
  computed: {
    leftChoices: function () {
      return this.state.leftChoiceIndexes.map(choiceIdx => this.profileCollection[choiceIdx])
    },
    rightChoices: function () {
      return this.state.rightChoiceIndexes.map(choiceIdx => this.profileCollection[choiceIdx])
    },
    profileCollection: function () {
      return this.$store.state.profileCollections
    }
  },
  methods: {
    gameBeginHandler: function () {
      // reset game settings
      if (!this.profileCollection) {
        this.$store.dispatch('setProfileCollections').then(() => {
          this.startGame()
        }).catch(() => {
          this.error = true;
          // eslint-disable-next-line no-console
          console.log('[fx-error]' + this.error);
        })
        .finally(() => {
          this.loading = false;
          // eslint-disable-next-line no-console
          console.log('[fx]' + this.loading)
        })
      } else {
        this.startGame()
        this.loading = false
      }
      // eslint-disable-next-line no-console
      console.log('[CoreGame]' + this.loading)
    },
    startGame: function () {
      const startState = settings.getGameStartState(this.profileCollection)
      this.state = copyJSONValues(this.state, startState)
      this.error = false
      this.generateNewImageHandler()
    },
    generateNewImageHandler: function () {
      // check if game is finished
      if (this.state.doneIndexes.size >= this.state.maxChoices ||
        this.state.doneIndexes.size >= this.profileCollection.length) {
        this.finishGameHandler()
        return
      }
      // if not, generate new image
      let newIndex = null
      while (newIndex === null || this.state.doneIndexes.has(newIndex)) {
        newIndex = Math.floor(Math.random() * this.profileCollection.length)
      }
      this.state.currentIndex = newIndex
      this.state.doneIndexes.add(newIndex)
    },
    finishGameHandler: function () {
      this.state.modal = settings.resultHandler(this.state.score)
      this.state.modal.wrongProfiles = this.state.wrongChoiceIndexes.map(wrongIdx => this.profileCollection[wrongIdx])
      this.$emit('game-finish', this.state.modal)
    },
    chooseHandler: function (choice) {
      const choiceId = getChoiceId(choice)
      if (this.profileCollection[this.state.currentIndex].speciesId === choiceId) {
        this.state.score++
      } else {
        this.state.wrongChoiceIndexes.push(this.state.currentIndex)
      }

      if (choice === llamasText) {
        this.state.leftChoiceIndexes.push(this.state.currentIndex)
      } else {
        this.state.rightChoiceIndexes.push(this.state.currentIndex)
      }
      this.generateNewImageHandler()
    }
  }
}
</script>
