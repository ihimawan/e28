let gameStages = ['intro', 'chat', 'game', 'win', 'lose'];

const app = new Vue({
    el: '#app',
    data: {
        currentGameStage: gameStages[0],
        playerInfo: {
            name: null,
            validName: false,
            selectedPictureIdx: null,
            picturesAvailable: [
                {
                    img: "http://via.placeholder.com/200",
                    comment: "What a handsome devil you are."
                },
                {
                    img: "http://via.placeholder.com/200",
                    comment: "You look bombin.. it must be the alpacalypse."
                },
                {
                    img: "http://via.placeholder.com/200",
                    comment: "mmm.... Feleece navidad.."
                }
            ]
        },
        chatInfo: {

        },
        gameInfo: {

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
        }
    }
});