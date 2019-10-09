import * as gameSetting from './modules/defaultGameSettings.js'

const app = new Vue({
    el: '#app',
    data: {
        currentGameStage: gameSetting.gameStages[0],
        playerInfo: {
            introduction: true,
            name: null,
            validName: null,
            selectedPictureIdx: null,
            selectedGender: null,
            modal: {
                show: false,
                ...gameSetting.playerModal
            },
            quotes: gameSetting.quotes,
            picturesAvailable: gameSetting.playerPictures,
            genders: gameSetting.genderSelection
        },
        homeInfo: {
            testPassed: false,
            modal: {
                show: false,
                ...gameSetting.homeModal
            },
            profiles: gameSetting.getHomeProfiles(),
            articles: gameSetting.articles
        },
        gameInfo: gameSetting.getGameStartState()
    },
    methods: {
        // methods for intro page
        getStarted: function () {
            this.playerInfo.introduction = false;
        },
        selectProfilePicture: function (index) {
            this.playerInfo.selectedPictureIdx = index;
        },
        validateName: function (name) {
            this.playerInfo.validName = gameSetting.validateName(name);
        },
        // methods for home page
        refreshProfiles: function () {
            this.homeInfo.profiles = gameSetting.getHomeProfiles();
        },
        // methods for game page
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

            if (choice === gameSetting.llamasText) {
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
        returnHomeFromGameHandler: function () {
            this.homeInfo.modal.show = false;
            this.gameInfo.currentIndex = null;
            this.currentGameStage = gameSetting.gameStages[gameSetting.gameStages.indexOf('home')];
        },
        journeyEndHandler: function () {
            window.open('https://tinyurl.com/2fcpre6');
        },
        // common methods
        goToNextGameStage: function () {
            let indexOfCurrentStage = gameSetting.gameStages.indexOf(this.currentGameStage);
            if (indexOfCurrentStage !== -1 && gameSetting.gameStages.length < indexOfCurrentStage + 1) {
                throw new Error('Unable to find next stage=' + (indexOfCurrentStage + 1));
            }
            this.currentGameStage = gameSetting.gameStages[indexOfCurrentStage + 1]
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
        }
    }
});