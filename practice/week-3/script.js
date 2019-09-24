const app = new Vue({
    el: '#app',
    data: {
        name: null,
        happy: false,
        moods: []
    },
    methods: {
        flipHappy: function () {
            this.happy = !this.happy;
            this.name = 'chicken';
        }
    }
});