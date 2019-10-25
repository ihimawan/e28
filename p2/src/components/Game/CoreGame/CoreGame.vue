<template>
  <div>
    <!-- if game has started, give a restart button -->
    <button @click="$emit('return-to-home')" class="btn btn-secondary">Nevermind, I want
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
      <div class="col-sm answer-review">
        <img :src="state.choices[leftIndex].url" v-for="leftIndex in state.leftChoiceIndexes"
             class="rounded" :key="leftIndex">
      </div>
      <div class="col-sm">
        <div class="card border-secondary" style="width: 18rem;">
          <img :src="state.choices[state.currentIndex].url" class="card-img-top" width="300"
               height="300">
          <div class="card-body">
            <h5 class="card-title">{{state.choices[state.currentIndex].title}}</h5>
            <p class="card-text">{{state.choices[state.currentIndex].description}}</p>
          </div>
          <div class="card-body">
            <a href="#" @click="chooseHandler('llamas')" class="card-link">Llama</a>
            <a href="#" @click="chooseHandler('alpacas')" class="card-link">Alpaca</a>
          </div>
        </div>
      </div>
      <div class="col-sm answer-review">
        <img :src="state.choices[rightIndex].url" v-for="rightIndex in state.rightChoiceIndexes"
             class="rounded" :key="rightIndex">
      </div>

    </div>
  </div>
</template>

<script>
import * as settings from '../../../helpers/game/settings'

export default {
  name: 'CoreGame',
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
        modal: null,
        choices: [{}]
      }
    }
  },
  beforeMount: function () {
    this.gameBeginHandler()
    this.generateNewImageHandler()
  },
  methods: {
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
      if (this.state.doneIndexes.size >= settings.maxChoices ||
        this.state.doneIndexes.size >= this.state.choices.length) {
        this.state.modal = settings.resultHandler(this.score)
        if (this.state.modal.status === 'win') {
          this.state.testPassed = true
        }
        return
      }
      // if not, generate new image
      let newIndex = null
      while (newIndex === null || this.state.doneIndexes.has(newIndex)) {
        newIndex = Math.floor(Math.random() * this.state.choices.length)
      }
      this.state.currentIndex = newIndex
      this.state.doneIndexes.add(newIndex)
    },
    chooseHandler: function (choice) {
      if (this.state.choices[this.state.currentIndex].url.includes(choice)) { // 'llamas' or 'alpacas'
        this.state.score++
      } else {
        this.state.wrongChoiceIndexes.push(this.state.currentIndex)
      }

      if (choice === settings.llamasText) {
        this.state.leftChoiceIndexes.push(this.state.currentIndex)
      } else {
        this.state.rightChoiceIndexes.push(this.state.currentIndex)
      }
      this.generateNewImageHandler()
    }
  }
}
</script>
