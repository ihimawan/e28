const app = new Vue({
    el: '#app',
    data: {
        name: null,
        happy: false,
        moods: []
    },
    methods: {
        flipHappy: () => {
            this.happy = !this.happy;
            console.log('this is happiness' + this.happy);
        }
    }
});