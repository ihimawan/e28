const gameStages = ['intro', 'home', 'game'];
const maxChoices = 12;
const passingPercentage = 70;

const playerPictures = [
    {
        img: "resources/images/players/one.png",
        comment: "Plain and simple.. What a handsome angel you are."
    },
    {
        img: "resources/images/players/two.png",
        comment: "mmm.. A saddle? Feleece navidad.."
    },
    {
        img: "resources/images/players/three.png",
        comment: "A party necklace? You look bombin in it.. it must be the alpacalypse."
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
            disagree: "I'm not convinced I'm worthy",
            img: "./resources/images/gifs/2.gif"
        };
    }
    return {
        status: "lose",
        title: "FAKE!!!",
        text: scoreString + " You may be a Llama! Even worse... a Llama Lover!!",
        disagree: "This is BS I'll try again...",
        img: "./resources/images/gifs/3.gif"
    };
}

const genderSelection = ["Agender",
    "Androgyne",
    "Androgynous",
    "Bigender",
    "Cis",
    "Cisgender",
    "Cis Female",
    "Cis Male",
    "Cis Man",
    "Cis Woman",
    "Cisgender Female",
    "Cisgender Male",
    "Cisgender Man",
    "Cisgender Woman",
    "Female to Male",
    "FTM",
    "Gender Fluid",
    "Gender Nonconforming",
    "Gender Questioning",
    "Gender Variant",
    "Genderqueer",
    "Intersex",
    "Male to Female",
    "MTF",
    "Neither",
    "Neutrois",
    "Non-binary",
    "Other",
    "Pangender",
    "Trans",
    "Trans*",
    "Trans Female",
    "Trans* Female",
    "Trans Male",
    "Trans* Male",
    "Trans Man",
    "Trans* Man",
    "Trans Person",
    "Trans* Person",
    "Trans Woman",
    "Trans* Woman",
    "Transfeminine",
    "Transgender",
    "Transgender Female",
    "Transgender Male",
    "Transgender Man",
    "Transgender Person",
    "Transgender Woman",
    "Transmasculine",
    "Transsexual",
    "Transsexual Female",
    "Transsexual Male",
    "Transsexual Man",
    "Transsexual Person",
    "Transsexual Woman",
    "Two-Spirit"]

const articles = [
    {
        img: "./resources/images/articles/1.jpg",
        title: "7 Differences Between Llamas and Alpacas (super important information!!)",
        action: "https://www.alpacadirect.com/blogs/alpaca-direct-blog/alpaca-vs-llama-7-ways-to-tell-the-difference"
    },
    {
        img: "./resources/images/articles/2.png",
        title: "Why won't you let me love you? (super cute)",
        action: "https://www.reddit.com/r/AnimalsBeingJerks/comments/dclyuf/why_wont_you_let_me_love_you/?utm_source=share&utm_medium=ios_app&utm_name=iossmf"
    },
    {
        img: "./resources/images/articles/3.png",
        title: "12 Reasons Why Alpacas Are The Most Amazing Creatures On Earth",
        action: "https://www.thethings.com/12-reasons-why-alpacas-are-the-most-amazing-creatures-on-earth/"
    },
    {
        img: "./resources/images/articles/4.png",
        title: "Llama being dumb jerk (you won't believe what you see!)",
        action: "https://youtu.be/UfxmVEq4-7Q?t=111"
    }
];

const gameChoices = [
    {
        url: "./resources/images/game/alpacas/1.jpg",
        title: 'Carl',
        description: "Hi!! My name is Carl and I'm just looking for a friendly male don't worry Carl is girl alpaca name.",
        distance: 1
    },
    {
        url: "./resources/images/game/alpacas/2.jpg",
        title: 'Billy Bob',
        description: 'My friend told me to use this website to find a man but idk how to take selfies with good lighting',
        distance: 2
    },
    {
        url: "./resources/images/game/alpacas/3.jpg",
        title: 'Cecilly',
        description: 'Hihi I\'m just a silly ol funny dorky quirky alpaca. i\'m like this bc im so lonely',
        distance: 3,
    },
    {
        url: "./resources/images/game/alpacas/4.jpg",
        title: 'Brad America',
        description: "I just turned 18 finally i can meet random alpacas on the internet. I'm better than everyone else because I'm young and free",
        distance: 2,
    },
    {
        url: "./resources/images/game/alpacas/5.jpg",
        title: 'Beauty',
        description: 'Look at my beautiful photograph just walking on the green fields protocred: some guy I friendzoned #blessed',
        distance: 4
    },
    {
        url: "./resources/images/game/alpacas/6.jpg",
        title: 'Kim Kim',
        description: 'On the scale of America to North Korea, how free are you tonight?',
        distance: 5
    },
    {
        url: "./resources/images/game/alpacas/7.jpg",
        title: 'Baby girl',
        description: 'Looking for a sugar daddy. Must be 1 million dollars net worth, and give me weekly allowance, no poor pacas allowed.',
        distance: 10
    },
    {
        url: "./resources/images/game/alpacas/8.jpg",
        title: 'Big in Small Package',
        description: "Other alpacas don't like me because I'm less than 6 feet long :( I swear I make up for it!!",
        distance: 2
    },
    {
        url: "./resources/images/game/alpacas/9.jpg",
        title: 'Nossy',
        description: 'Look how big my nostrils are',
        distance: 3
    },
    {
        url: "./resources/images/game/alpacas/10.jpg",
        title: 'Diamond',
        description: '200 Alpaca Dollars a night. Final offer.',
        distance: 2
    },
    {
        url: "./resources/images/game/alpacas/11.jpg",
        title: 'Lala',
        description: 'I love everyone, Alpaca, Llama, Camel, whatever!',
        distance: 321
    },
    {
        url: "./resources/images/game/alpacas/12.png",
        title: 'Fluffers (not fat!)',
        description: "I weighed myself and I came to only 200 alpaca weight units.. I promise I'm not catfishing anyone this time by just posting a picture of my face and not my body!",
        distance: 2
    },
    {
        url: "./resources/images/game/alpacas/13.png",
        title: 'Willie hotpants',
        description: "Two pacas in this pic you don't know which one I am! I always try to pose with fancy schmancy alpacas to increase my chances of getting matches heheh pls help me im so alone.",
        distance: 11
    },
    {
        url: "./resources/images/game/llamas/1.jpg",
        title: 'Bob (im girl tho)',
        description: "Just being a regular alpaca in the wild alpaca world. I'd like to think I'm special but I'm actually not. Also my neck is long. Could always use a strong alpaca man ;) (No Llamas pls)",
        distance: 10
    },
    {
        url: "./resources/images/game/llamas/2.jpg",
        title: 'Xandar',
        description: 'I like to eat hats and sausages because why not. I also like to chat about the philosophy of Tacos and its effects to unite us with the south of the border.',
        distance: 2
    },
    {
        url: "./resources/images/game/llamas/3.jpg",
        title: 'Vader',
        description: 'I pose with 3 other Alpacas because I look hotter when I\'m in a group. Just me and my galssss',
        distance: 2,
    },
    {
        url: "./resources/images/game/llamas/4.jpg",
        title: 'Billy Jones',
        description: 'My ears are pink because I\'m swooned by you ;) Chat with me to have a good conversation if you know what I mean',
        distance: 8
    },
    {
        url: "./resources/images/game/llamas/5.jpg",
        title: 'Bill Cosby',
        description: 'Don\'t worry I just happen to have the same name as THE Bill Cosby. My life is harder now, man.',
        distance: 10
    },
    {
        url: "./resources/images/game/llamas/6.jpg",
        title: 'ADam',
        description: 'Yes, it\'s ADam, not Adam, thank you very much. Please respect my choices.',
        distance: 2
    },
    {
        url: "./resources/images/game/llamas/7.jpg",
        title: 'Bobby',
        description: 'My name is Bobby because whoever created this website ran out of names to give.',
        distance: 92
    }
];

const getGameStartState = () => {
    return {
        loadingScreenShow: null,
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

const getHomeProfiles = () => {
    const needHowMany = 3;
    const randomIndexes = [];
    for (let i = 0; i < needHowMany; i++) {
        let nextRandomIndex = null;
        while (nextRandomIndex === null || randomIndexes.includes(nextRandomIndex)) {
            nextRandomIndex = Math.floor(Math.random() * gameChoices.length);
        }
        randomIndexes.push(nextRandomIndex);
    }
    return randomIndexes.map(index => gameChoices[index]);
}

export { genderSelection, getHomeProfiles, gameStages, maxChoices, passingPercentage, getGameStartState, playerPictures, resultHandler, articles };