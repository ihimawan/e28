let gameStages = ['intro', 'home', 'chat', 'game', 'win', 'lose'];

const app = new Vue({
    el: '#app',
    data: {
        currentGameStage: gameStages[1],
        playerInfo: {
            name: null,
            validName: null,
            selectedPictureIdx: null,
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
        },
        displayInterest: function (index) {
            this.chatInfo.selectedProfileIdx = index;
            this.goToNextGameStage();
        }
    }
});