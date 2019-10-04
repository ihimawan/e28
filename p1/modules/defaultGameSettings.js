const gameStages = ['intro', 'home', 'game', 'end'];
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
            status: "win",
            title: "You are a real Alpaca!",
            text: scoreString + " You have proven yourself that you are not an impostor to the Alpaca community. Welcome to Alpacan Mingle. You now have full access to our site.",
            agree: "Let's chat up some lady Alpacas",
            disagree: "I'm not convinced I'm worthy"
        };
    }
    return {
        status: "lose",
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

const gameChoices = [
    {
        url: "./resources/images/game/alpacas/1.jpg",
        title: 'Carl',
        description: "Hi!! My name is Carl and I'm just looking for a friendly male don't worry Carl is girl alpaca name.",
        distance: 2,
        hints: ['I hate ', 'hint 2']
    },
    {
        url: "./resources/images/game/alpacas/2.jpg",
        title: 'Billy Bob',
        description: 'My friend told me to use this website to find a man but idk how to take selfies with good lighting',
        distance: 2,
        hints: ['hint 1', 'hint 2']
    },
    {
        url: "./resources/images/game/alpacas/3.jpg",
        title: 'Cecilly',
        description: 'Hihi I\'m just a silly ol funny dorky quirky alpaca. i\'m like this bc im so lonely',
        distance: 2,
        hints: ['hint 1', 'hint 2']
    },
    {
        url: "./resources/images/game/alpacas/4.jpg",
        title: 'Brad America',
        description: "I just turned 18 finally i can meet random alpacas on the internet. I'm better than everyone else because I'm young and free",
        distance: 2,
        hints: ['hint 1', 'hint 2']
    },
    {
        url: "./resources/images/game/alpacas/5.jpg",
        title: 'Beauty',
        description: 'Look at my beautiful photograph just walking on the green fields protocred: some guy I friendzoned #blessed',
        distance: 2,
        hints: ['hint 1', 'hint 2']
    },
    {
        url: "./resources/images/game/alpacas/6.jpg",
        title: 'Kim Kim',
        description: 'On the scale of America to North Korea, how free are you tonight?',
        distance: 2,
        hints: ['hint 1', 'hint 2']
    },
    {
        url: "./resources/images/game/alpacas/7.jpg",
        title: 'Baby girl',
        description: 'Looking for a sugar daddy. Must be 1 million dollars net worth, and give me weekly allowance, no poor pacas allowed.',
        distance: 2,
        hints: ['hint 1', 'hint 2']
    },
    {
        url: "./resources/images/game/alpacas/8.jpg",
        title: 'Big in Small Package',
        description: "Other alpacas don't like me because I'm less than 6 feet long :( I swear I make up for it!!",
        distance: 2,
        hints: ['hint 1', 'hint 2']
    },
    {
        url: "./resources/images/game/alpacas/9.jpg",
        title: 'Nossy',
        description: 'Look how big my nostrils are',
        distance: 2,
        hints: ['hint 1', 'hint 2']
    },
    {
        url: "./resources/images/game/alpacas/10.jpg",
        title: 'Diamond',
        description: '200 Alpaca Dollars a night.',
        distance: 2,
        hints: ['hint 1', 'hint 2']
    },
    {
        url: "./resources/images/game/alpacas/11.jpg",
        title: 'Lala',
        description: 'I like to eat',
        distance: 2,
        hints: ['hint 1', 'hint 2']
    },
    {
        url: "./resources/images/game/alpacas/12.png",
        title: 'Fluffers (not fat!)',
        description: "I weighed myself and I came to only 200 alpaca weight units.. I promise I'm not catfishing anyone this time by just posting a picture of my face and not my body!",
        distance: 2,
        hints: ['hint 1', 'hint 2']
    },
    {
        url: "./resources/images/game/llamas/1.jpg",
        title: 'Bob (im girl tho)',
        description: "Just being a regular alpaca in the wild alpaca world. I'd like to think I'm special but I'm actually not. Also my neck is long. Could always use a strong alpaca man ;) (No Llamas pls)",
        distance: 2,
        hints: ['hint 1', 'hint 2']
    },
    {
        url: "./resources/images/game/llamas/2.jpg",
        title: 'Xandar',
        description: 'I like to eat',
        distance: 2,
        hints: ['hint 1', 'hint 2']
    },
    {
        url: "./resources/images/game/llamas/3.jpg",
        title: 'Vader',
        description: 'I like to eat',
        distance: 2,
        hints: ['hint 1', 'hint 2']
    },
    {
        url: "./resources/images/game/llamas/4.jpg",
        title: 'Billy Jones',
        description: 'I like to eat',
        distance: 2,
        hints: ['hint 1', 'hint 2']
    },
    {
        url: "./resources/images/game/llamas/5.jpg",
        title: 'Bill Cosby',
        description: 'I like to eat',
        distance: 2,
        hints: ['hint 1', 'hint 2']
    },
    {
        url: "./resources/images/game/llamas/6.jpg",
        title: 'ADam',
        description: 'I like to eat',
        distance: 2,
        hints: ['hint 1', 'hint 2']
    },
    {
        url: "./resources/images/game/llamas/7.jpg",
        title: 'Bobby',
        description: 'I like to eat',
        distance: 2,
        hints: ['hint 1', 'hint 2']
    }
];

const gameStartState = {
    currentIndex: null,
    doneIndexes: new Set(),
    timePerImg: 5000,
    score: 0,
    maxChoices: maxChoices,
    modal: null,
    choices: [...gameChoices]
}

export { gameStages, maxChoices, passingPercentage, gameStartState, playerPictures, resultHandler, articles };