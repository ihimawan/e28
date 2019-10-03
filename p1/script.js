import { gameStages, maxChoices, passingPercentage } from './modules/defaultGameSettings.js'

const app = new Vue({
    el: '#app',
    data: {
        currentGameStage: gameStages[2],
        playerInfo: {
            name: null,
            validName: null,
            selectedPictureIdx: null,
            modal: {
                show: false,
                title: "Terms and Conditions (stop being offended)",
                text: "This whole website is a satire to online dating and my pet peeve of humans not knowing the difference between Alpacas and Llamas (Alpacas are way cutter, obviously). With this, I hope that you, as a human user, playing the role of a male Alpaca looking for a lover, will NOT be offended by the segregation of Alpacas and Llamas in this game; and/or my bias towards of Alpacas over Llamas.",
                agree: "I will not feel attacked",
                disagree: "I am offended already"
            },
            picturesAvailable: [
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
            ]
        },
        homeInfo: {
            modal: {
                show: false,
                title: "What is the Llama or Alpaca test?",
                text: "Here at Alpacan Mingle, we value integrity by not allowing Alpacas who don't know the difference between Llamas or Alpacas. Every Alpaca, including you, must take and pass this test in order to continue using this website.",
                agree: "Ok, I'll do it",
                disagree: "Nah"
            },
            profiles: [
                {
                    name: "Fluffers (not fat!)",
                    img: "resources/images/home/one.png",
                    distance: 2,
                    comment: "I weighed myself and I came to only 200 alpaca weight units.. I promise I'm not catfishing anyone this time by just posting a picture of my face and not my body!"
                },
                {
                    name: "Bob (im girl tho)",
                    img: "resources/images/home/two.png",
                    distance: 9203,
                    comment: "Just being a regular alpaca in the wild alpaca world. I'd like to think I'm special but I'm actually not. Also my neck is long. Could always use a strong alpaca man ;) (No Llamas pls)"
                },
                {
                    name: "Carl",
                    img: "resources/images/home/three.png",
                    distance: 5,
                    comment: "Two pacas in this pic you don't know which one I am! I always try to pose with fancy schmancy alpacas to increase my chances of getting matches heheh pls help me im so alone"
                }
            ]
        },
        gameInfo: {
            started: false,
            currentIndex: null,
            doneIndexes: new Set(),
            timePerImg: 5000,
            score: 0,
            choices: [
                {
                    url: "./resources/images/game/alpacas/1.jpg",
                    title: 'Billy Bob',
                    description: 'I like to eat',
                    hints: ['hint 1', 'hint 2']
                },
                {
                    url: "./resources/images/game/alpacas/2.jpg",
                    title: 'Billy Bob',
                    description: 'I like to eat',
                    hints: ['hint 1', 'hint 2']
                },
                {
                    url: "./resources/images/game/alpacas/3.jpg",
                    title: 'Billy Bob',
                    description: 'I like to eat',
                    hints: ['hint 1', 'hint 2']
                },
                {
                    url: "./resources/images/game/alpacas/4.jpg",
                    title: 'Billy Bob',
                    description: 'I like to eat',
                    hints: ['hint 1', 'hint 2']
                },
                {
                    url: "./resources/images/game/alpacas/5.jpg",
                    title: 'Billy Bob',
                    description: 'I like to eat',
                    hints: ['hint 1', 'hint 2']
                },
                {
                    url: "./resources/images/game/alpacas/6.jpg",
                    title: 'Billy Bob',
                    description: 'I like to eat',
                    hints: ['hint 1', 'hint 2']
                },
                {
                    url: "./resources/images/game/alpacas/7.jpg",
                    title: 'Billy Bob',
                    description: 'I like to eat',
                    hints: ['hint 1', 'hint 2']
                },
                {
                    url: "./resources/images/game/alpacas/8.jpg",
                    title: 'Billy Bob',
                    description: 'I like to eat',
                    hints: ['hint 1', 'hint 2']
                },
                {
                    url: "./resources/images/game/alpacas/9.jpg",
                    title: 'Billy Bob',
                    description: 'I like to eat',
                    hints: ['hint 1', 'hint 2']
                },
                {
                    url: "./resources/images/game/alpacas/10.jpg",
                    title: 'Billy Bob',
                    description: 'I like to eat',
                    hints: ['hint 1', 'hint 2']
                },
                {
                    url: "./resources/images/game/alpacas/11.jpg",
                    title: 'Billy Bob',
                    description: 'I like to eat',
                    hints: ['hint 1', 'hint 2']
                },
                {
                    url: "./resources/images/game/llamas/1.jpg",
                    title: 'Billy Bob',
                    description: 'I like to eat',
                    hints: ['hint 1', 'hint 2']
                },
                {
                    url: "./resources/images/game/llamas/2.jpg",
                    title: 'Billy Bob',
                    description: 'I like to eat',
                    hints: ['hint 1', 'hint 2']
                },
                {
                    url: "./resources/images/game/llamas/3.jpg",
                    title: 'Billy Bob',
                    description: 'I like to eat',
                    hints: ['hint 1', 'hint 2']
                },
                {
                    url: "./resources/images/game/llamas/4.jpg",
                    title: 'Billy Bob',
                    description: 'I like to eat',
                    hints: ['hint 1', 'hint 2']
                },
                {
                    url: "./resources/images/game/llamas/5.jpg",
                    title: 'Billy Bob',
                    description: 'I like to eat',
                    hints: ['hint 1', 'hint 2']
                },
                {
                    url: "./resources/images/game/llamas/6.jpg",
                    title: 'Billy Bob',
                    description: 'I like to eat',
                    hints: ['hint 1', 'hint 2']
                },
                {
                    url: "./resources/images/game/llamas/7.jpg",
                    title: 'Billy Bob',
                    description: 'I like to eat',
                    hints: ['hint 1', 'hint 2']
                }
            ]

        },
        chatInfo: {
            modal: {
                show: false,
                title: "You have been reported!",
                message: "You have been reported as a potential llama. Llamas are not allowed here. You are prompted to take the Llama or Alpaca quiz before you are allowed in this website any longer."
            },
            selectedProfileIdx: null,
            chat: [
                "What do you call it when Alpacas sing?",
                "ummm.. i dunno.",
                "Alpacapella!",
                "Haha, that is so lame that I'd be intrigued to talk to you..."
            ]
        },

        winInfo: {

        },
        loseInfo: {

        }
    },
    methods: {
        selectProfilePicture: function (index) {
            this.playerInfo.selectedPictureIdx = index;
        },
        validateName: function (name) {
            if (name !== '' && name.length <= 10 && name.search(/[^a-zA-Z]+/) === -1) {
                this.playerInfo.validName = true;
            } else {
                this.playerInfo.validName = false;
            }
        },
        goToNextGameStage: function () {
            let indexOfNextStage = gameStages.indexOf(this.currentGameStage);
            if (indexOfNextStage !== -1 && gameStages.length <= indexOfNextStage + 2) {
                throw new Error('Unable to find next stage');
            }
            this.currentGameStage = gameStages[indexOfNextStage + 1]
        },
        activateModalHandler: function () {
            if (this.currentGameStage === gameStages[0]) {
                this.playerInfo.modal.show = true;
            } else if (this.currentGameStage === gameStages[1]) {
                this.homeInfo.modal.show = true;
            }
        },
        dismissModalHandler: function () {
            if (this.currentGameStage === gameStages[0]) {
                this.playerInfo.modal.show = false;
            } else if (this.currentGameStage === gameStages[1]) {
                this.homeInfo.modal.show = false;
            }
        },
        gameBeginHandler: function () {
            this.generateNewImageHandler();
        },
        chooseHandler: function (choice) {
            if (this.gameInfo.choices[this.gameInfo.currentIndex].url.includes(choice)) { //'llamas' or 'alpacas'
                this.gameInfo.score++;
            }
            this.generateNewImageHandler();
        },
        generateNewImageHandler: function () {
            if (this.gameInfo.doneIndexes.size > maxChoices
                || this.gameInfo.doneIndexes.size > this.gameInfo.choices.length) {

            }

            let newIndex = null;
            while (newIndex === null || this.gameInfo.doneIndexes.has(newIndex)) {
                newIndex = Math.floor(Math.random() * this.gameInfo.choices.length);
            }
            this.gameInfo.currentIndex = newIndex;
            this.gameInfo.doneIndexes.add(newIndex);
        },
        resultHandler: function () {
            let passingScore = Math.ceil(this.gameInfo.score * passingPercentage / 100);
            if (this.gameInfo.score >= passingScore) {

            }
        },
        displayInterest: function (index) {
            this.chatInfo.selectedProfileIdx = index;
            this.goToNextGameStage();
        }
    }
});