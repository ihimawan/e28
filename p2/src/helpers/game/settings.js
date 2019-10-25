import gameChoices from '../commons/profileCollection'

// game for main game
export const maxChoices = 12
export const passingPercentage = 70

export const llamasText = 'llamas'
export const alpacaText = 'alpacas'

export const getGameStartState = () => {
  return {
    countDown: 3,
    currentIndex: null,
    leftChoiceIndexes: [],
    rightChoiceIndexes: [],
    wrongChoiceIndexes: [],
    doneIndexes: new Set(),
    timePerImg: 5000,
    score: 0,
    maxChoices: maxChoices,
    modal: null,
    choices: [...gameChoices]
  }
}

export const resultHandler = (score) => {
  let passingScore = Math.ceil(maxChoices * passingPercentage / 100)

  const scoreString = 'You got ' + score + '/' + maxChoices + ' while it needs ' + passingScore + '/' + maxChoices + ' to pass.'
  if (score >= passingScore) {
    return {
      status: 'win',
      title: 'You are a real Alpaca!',
      text: scoreString + ' You have proven yourself that you are not an impostor to the Alpaca community. Welcome to Alpacan Mingle. You now have full access to our site.',
      agree: "Let's chat up some lady Alpacas",
      disagree: "I'm not convinced I'm worthy",
      img: './resources/images/gifs/2.gif'
    }
  }
  return {
    status: 'lose',
    title: 'FAKE!!!',
    text: scoreString + ' You may be a Llama! Even worse... a Llama Lover!!',
    disagree: "This is BS I'll try again...",
    img: './resources/images/gifs/3.gif'
  }
}
