const gameStages = ['intro', 'home', 'game', 'chat', 'win', 'lose'];
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

const gameStartState = {
    started: false,
    currentIndex: null,
    doneIndexes: new Set(),
    timePerImg: 5000,
    score: 0
}

export { gameStages, maxChoices, passingPercentage, gameStartState, playerPictures };