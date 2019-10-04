import * as gameSetting from './modules/defaultGameSettings.js'

const app = new Vue({
    el: '#app',
    data: {
        currentGameStage: gameSetting.gameStages[0],
        playerInfo: {
            name: null,
            validName: null,
            selectedPictureIdx: null,
            selectedGender: null,
            modal: {
                show: false,
                title: "Terms and Conditions (stop being offended)",
                text: "This whole website is a satire to online dating and my pet peeve of humans not knowing the difference between Alpacas and Llamas (Alpacas are way cutter, obviously). With this, I hope that you, as a human user, playing the role of an Alpaca looking for a lover, will NOT be offended by the segregation of Alpacas and Llamas in this game; and/or my bias towards of Alpacas over Llamas.",
                agree: "I will not feel attacked",
                disagree: "I am offended already"
            },
            picturesAvailable: [...gameSetting.playerPictures],
            genders: [...gameSetting.genderSelection]
        },
        homeInfo: {
            testPassed: false,
            modal: {
                show: false,
                title: "What is the Llama or Alpaca test?",
                text: "Here at Alpacan Mingle, we value integrity by not allowing Alpacas who don't know the difference between Llamas or Alpacas. Every Alpaca, including you, must take and pass this test in order to continue using this website.",
                agree: "Ok, I'll do it",
                disagree: "Nah"
            },
            profiles: gameSetting.getHomeProfiles(),
            articles: [...gameSetting.articles]
        },
        gameInfo: gameSetting.getGameStartState()
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
        goToNextGameStage: function (newStage) {

            if (newStage === 'home') {
                this.currentGameStage = gameSetting.gameStages[gameSetting.gameStages.indexOf('home')];
                return;
            }

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
            this.gameInfo = gameSetting.getGameStartState();
            this.gameInfo.loadingScreenShow = true;
            this.loadingScreenTimeDown();
            this.generateNewImageHandler();
        },
        loadingScreenTimeDown: function () {
            if (this.gameInfo.countDown > 0) {
                setTimeout(() => {
                    this.gameInfo.countDown--;
                    this.loadingScreenTimeDown();
                }, 1000)
            } else {
                this.gameInfo.loadingScreenShow = false;
            }
        },
        chooseHandler: function (choice) {
            if (this.gameInfo.choices[this.gameInfo.currentIndex].url.includes(choice)) { //'llamas' or 'alpacas'
                this.gameInfo.score++;
            } else {
                this.gameInfo.wrongChoiceIndexes.push(this.gameInfo.currentIndex);
            }

            if (choice === 'llamas') {
                this.gameInfo.leftChoiceIndexes.push(this.gameInfo.currentIndex);
            } else {
                this.gameInfo.rightChoiceIndexes.push(this.gameInfo.currentIndex);
            }
            this.generateNewImageHandler();
        },
        generateNewImageHandler: function () {
            // check if game is finished
            if (this.gameInfo.doneIndexes.size >= gameSetting.maxChoices
                || this.gameInfo.doneIndexes.size >= this.gameInfo.choices.length) {
                this.gameInfo.modal = gameSetting.resultHandler(this.gameInfo.score);
                if (this.gameInfo.modal.status === 'win') {
                    this.homeInfo.testPassed = true;
                }
                return;
            }
            // if not, generate new image
            let newIndex = null;
            while (newIndex === null || this.gameInfo.doneIndexes.has(newIndex)) {
                newIndex = Math.floor(Math.random() * this.gameInfo.choices.length);
            }
            this.gameInfo.currentIndex = newIndex;
            this.gameInfo.doneIndexes.add(newIndex);
        },
        refreshProfiles: function () {
            this.homeInfo.profiles = gameSetting.getHomeProfiles();
        },
        testPassedHandler: function () {
            this.currentGameStage = gameSetting.gameStages[gameSetting.gameStages.indexOf('home')];
        },
        journeyEndHandler: function () {
            this.currentGameStage = gameSetting.gameStages[gameSetting.gameStages.indexOf('end')];
        }
    }
});