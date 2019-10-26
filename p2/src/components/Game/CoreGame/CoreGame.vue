<template>
  <div>

    <button @click="$emit('go-home')" class="btn btn-secondary">Nevermind, I want
      to go back to looking at Alpacas
    </button>
    <button @click="gameBeginHandler" class="btn btn-primary">Messed up... I want a
      restart.
    </button>

    <div class="row justify-content-center">
      <h1 class="display-4">question {{state.doneIndexes.size}} of {{state.maxChoices}}
      </h1>
    </div>

    <div class="row justify-content-center">
      <PastChoices :choice-displays="leftChoices" />
      <ProfileCard :current-profile="state.choices[state.currentIndex]" @select-answer="chooseHandler"/>
      <PastChoices :choice-displays="rightChoices" />
    </div>
  </div>
</template>

<script>
import * as settings from '../../../helpers/game/settings'
import PastChoices from './PastChoices/PastChoices'
import ProfileCard from './ProfileCard/ProfileCard'
import { llamasText } from '../../../helpers/commons/constants'

export default {
  name: 'CoreGame',
  components: {ProfileCard, PastChoices},
  data: function () {
    return {
      state: {
        currentIndex: 0,
        leftChoiceIndexes: [],
        rightChoiceIndexes: [],
        wrongChoiceIndexes: [],
        doneIndexes: [],
        timePerImg: null,
        score: null,
        maxChoices: null,
        modal: {},
        choices: [{}]
      }
    }
  },
  beforeMount: function () {
    this.gameBeginHandler()
    this.generateNewImageHandler()
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
    continuePage: function () {
      console.log('d')
    },
    gameBeginHandler: function () {
      // reset game settings
      console.log('begin')
      const startState = settings.getGameStartState()
      Object.keys(startState).forEach(key => {
        this.state[key] = startState[key]
      })
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
      if (this.state.choices[this.state.currentIndex].species === choice) { // 'llamas' or 'alpacas'
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
