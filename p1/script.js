const app = new Vue({
    el: '#app',
    data: {
        gameStage: 'intro', //chat //game // win // lose
        playerInfo: {
            name: '',
            picture: ''
        },
        chatInfo: {

        },
        gameInfo: {

        },
        winInfo: {

        },
        loseInfo: {

        }
    }
});

app.message = "what's up people i'm the best";