import gif2 from "../../assets/images/gifs/2.gif";
import gif3 from "../../assets/images/gifs/3.gif";

// game for main game
export const maxChoices = 12;
export const passingPercentage = 70;

export const getGameStartState = () => {
  return {
    countDown: 3,
    currentIndex: null,
    leftChoiceIndexes: [],
    rightChoiceIndexes: [],
    wrongChoiceIndexes: [],
    doneIndexes: new Set(),
    score: 0
  };
};

export const resultHandler = (score, maxChoices) => {
  let passingScore = Math.ceil((maxChoices * passingPercentage) / 100);

  const scoreString =
    "You got " +
    score +
    "/" +
    maxChoices +
    " while it needs " +
    passingScore +
    "/" +
    maxChoices +
    " to pass.";
  if (score >= passingScore) {
    return {
      status: "win",
      title: "You are a real Alpaca!",
      text:
        scoreString +
        " You have proven yourself that you are not an impostor to the Alpaca community. Welcome to Alpacan Mingle. You now have full access to our site.",
      agree: "Let's chat up some lady Alpacas",
      disagree: "I'm not convinced I'm worthy",
      img: gif2
    };
  }
  return {
    status: "lose",
    title: "FAKE!!!",
    text: scoreString + " You may be a Llama! Even worse... a Llama Lover!!",
    disagree: "This is BS I'll try again...",
    agree: null,
    img: gif3
  };
};
