import Vue from 'vue'
import Router from 'vue-router'
import GamePage from '../components/GamePage/GamePage'
import ProfilePage from '../components/HomePage/MainPage/ProfilePage/ProfilePage'
import MessagesPage from '../components/HomePage/MainPage/MessagesPage/MessagesPage'
import DashboardPage from '../components/HomePage/MainPage/DashboardPage/DashboardPage'
import GamePageLayout from '../components/GamePage/GamePageLayout'
import MessagesDetailsPage from '../components/HomePage/MainPage/MessagesDetailsPage/MessagesDetailsPage'

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
      meta: {layout: GamePageLayout},
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
    },
    {
      path: '/messages/:userId',
      name: 'MessagesDetailsPage',
      component: MessagesDetailsPage,
      props: true
    }
  ]
})

export default router
