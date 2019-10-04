import gameChoices from './gameChoices.js';

const gameStages = ['intro', 'home', 'game', 'chat'];
const maxChoices = 12;
const passingPercentage = 70;

const playerPictures = [
    {
        img: "resources/images/players/one.png",
        comment: "What a handsome devil you are."
    },
    {
        img: "resources/images/players/two.png",
        comment: "You look bombin.. it must be the alpacalypse."
    },
    {
        img: "resources/images/players/three.png",
        comment: "mmm.... Feleece navidad.."
    }
];

const resultHandler = (score) => {
    let passingScore = Math.ceil(maxChoices * passingPercentage / 100);

    const scoreString = "You got " + score + "/" + maxChoices + " while it needs " + passingScore + "/" + maxChoices + " to pass.";
    if (score >= passingScore) {
        return {
            title: "You are a real Alpaca!",
            text: scoreString + " You have proven yourself that you are not an impostor to the Alpaca community. Welcome to Alpacan Mingle.",
            agree: "Let's chat up some lady Alpacas",
            disagree: "I'm not convinced I'm worthy"
        };
    }
    return {
        title: "FAKE!!!",
        text: scoreString + " You may be a Llama! Even worse... a Llama Lover!!",
        disagree: "This is BS I'll try again...",
    };
}

const articles = [
    {
        img: "",
        title: "What's the difference between Llamas and Alpacas?",
        action: "https://www.britannica.com/story/whats-the-difference-between-llamas-and-alpacas"
    },
    {

    }
];

const gameStartState = {
    currentIndex: null,
    doneIndexes: new Set(),
    timePerImg: 5000,
    score: 0,
    modal: null,
    choices: [...gameChoices]
}

export { gameStages, maxChoices, passingPercentage, gameStartState, playerPictures, resultHandler, articles };