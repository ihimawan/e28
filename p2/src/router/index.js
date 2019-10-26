import Vue from 'vue'
import Router from 'vue-router'
import Orchestrator from '../components/Orchestrator'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Orchestrator
    }
  ]
})

export default router
