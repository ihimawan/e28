import Vue from 'vue'
import Router from 'vue-router'
import GamePage from '../components/GamePage/GamePage'
import ProfilePage from '../components/HomePage/MainPage/ProfilePage/ProfilePage'
import MessagesPage from '../components/HomePage/MainPage/MessagesPage/MessagesPage'
import DashboardPage from '../components/HomePage/MainPage/DashboardPage/DashboardPage'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'DashboardPage',
      component: DashboardPage
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
    },
    {
      path: '/messages',
      name: 'MessagesPage',
      component: MessagesPage
    }
  ]
})

export default router
