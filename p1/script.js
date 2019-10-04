import * as gameSetting from './modules/defaultGameSettings.js'

const app = new Vue({
    el: '#app',
    data: {
        currentGameStage: gameSetting.gameStages[2],
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
            picturesAvailable: [...gameSetting.playerPictures]
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
            ...gameSetting.gameStartState
        },
        chatInfo: {
            selectedProfileIdx: null,
            chat: [
                "What do you call it when Alpacas sing?",
                "ummm.. i dunno.",
                "Alpacapella!",
                "Haha, that is so lame that I'd be intrigued to talk to you..."
            ]
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
            let indexOfNextStage = gameSetting.gameStages.indexOf(this.currentGameStage);
            if (indexOfNextStage !== -1 && gameSetting.gameStages.length <= indexOfNextStage + 2) {
                throw new Error('Unable to find next stage');
            }
            this.currentGameStage = gameSetting.gameStages[indexOfNextStage + 1]
        },
        activateModalHandler: function () {
            if (this.currentGameStage === gameSetting.gameStages[0]) {
                this.playerInfo.modal.show = true;
            } else if (this.currentGameStage === gameSetting.gameStages[1]) {
                this.homeInfo.modal.show = true;
            }
        },
        dismissModalHandler: function () {
            if (this.currentGameStage === gameSetting.gameStages[0]) {
                this.playerInfo.modal.show = false;
            } else if (this.currentGameStage === gameSetting.gameStages[1]) {
                this.homeInfo.modal.show = false;
            } else if (this.currentGameStage === gameSetting.gameStages[2]) {
                this.gameInfo.modal = null;
                this.gameBeginHandler();
            }
        },
        gameBeginHandler: function () {
            //reset game settings
            this.gameInfo = { ...gameSetting.gameStartState }
            this.gameInfo.doneIndexes.clear();
            this.generateNewImageHandler();
        },
        chooseHandler: function (choice) {
            if (this.gameInfo.choices[this.gameInfo.currentIndex].url.includes(choice)) { //'llamas' or 'alpacas'
                this.gameInfo.score++;
            }
            this.generateNewImageHandler();
        },
        generateNewImageHandler: function () {
            if (this.gameInfo.doneIndexes.size > gameSetting.maxChoices
                || this.gameInfo.doneIndexes.size > this.gameInfo.choices.length) {
                this.gameInfo.modal = gameSetting.resultHandler(this.gameInfo.score);
                return;
            }
            let newIndex = null;
            while (newIndex === null || this.gameInfo.doneIndexes.has(newIndex)) {
                newIndex = Math.floor(Math.random() * this.gameInfo.choices.length);
            }
            this.gameInfo.currentIndex = newIndex;
            this.gameInfo.doneIndexes.add(newIndex);
        }
    }
});