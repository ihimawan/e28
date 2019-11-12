import Vue from 'vue'
import Router from 'vue-router'
import Orchestrator from '../components/Orchestrator'
import GamePage from '../components/GamePage/GamePage'
import ProfilePage from '../components/MainPage/ProfilePage/ProfilePage'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Orchestrator
    },
    {
      path: '/game',
      name: 'GamePage',
      component: GamePage
    },
    {
      path: '/profile',
      name: 'ProfilePage',
      component: ProfilePage
    }
    // {
    //   path: '/messages',
    //   name: 'MessagesPage',
    //   component: MessagesPage
    // }
  ]
})

export default router
