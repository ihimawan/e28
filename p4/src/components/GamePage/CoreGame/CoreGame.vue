<template>
  <div>
    <div class="row justify-content-center" v-if="loading">
      Loading...
    </div>
    <div class="row justify-content-center" v-else-if="!loading && error">
      Unable to load game :( come back later?
    </div>
    <div v-else>
      <div class="row justify-content-center">
        <h1 class="display-4">question {{state.doneIndexes.size}} of {{state.maxChoices}}
        </h1>
      </div>

      <div class="row justify-content-center">
        <PastChoices :choice-displays="leftChoices"/>
        <ProfileCard :current-profile="state.choices[state.currentIndex]" @select-answer="chooseHandler"/>
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
import axios from '../../../axios'

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
        timePerImg: null,
        score: null,
        maxChoices: null,
        choices: [{}]
      }
    }
  },
  mounted: function () {
    this.gameBeginHandler()
  },
  computed: {
    leftChoices: function () {
      return this.state.leftChoiceIndexes.map(choiceIdx => this.state.choices[choiceIdx])
    },
    rightChoices: function () {
      return this.state.rightChoiceIndexes.map(choiceIdx => this.state.choices[choiceIdx])
    }
  },
  methods: {
    gameBeginHandler: function () {
      // reset game settings
      axios.get('/profiles')
        .then(res => {
          let profileCollections = res.data
          const startState = settings.getGameStartState(profileCollections)
          this.state = copyJSONValues(this.state, startState)
          this.error = false
          this.generateNewImageHandler()
        })
        .catch(() => (this.error = true))
        .finally(() => (this.loading = false))
    },
    generateNewImageHandler: function () {
      // check if game is finished
      if (this.state.doneIndexes.size >= this.state.maxChoices ||
        this.state.doneIndexes.size >= this.state.choices.length) {
        this.finishGameHandler()
      }
      // if not, generate new image
      let newIndex = null
      while (newIndex === null || this.state.doneIndexes.has(newIndex)) {
        newIndex = Math.floor(Math.random() * this.state.choices.length)
      }
      this.state.currentIndex = newIndex
      this.state.doneIndexes.add(newIndex)
    },
    finishGameHandler: function () {
      this.state.modal = settings.resultHandler(this.state.score)
      this.state.modal.wrongProfiles = this.state.wrongChoiceIndexes.map(wrongIdx => this.state.choices[wrongIdx])
      this.$emit('game-finish', this.state.modal)
    },
    chooseHandler: function (choice) {
      const choiceId = getChoiceId(choice)
      if (this.state.choices[this.state.currentIndex].speciesId === choiceId) {
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
