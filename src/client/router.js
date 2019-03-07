import Vue from 'vue'
import Router from 'vue-router'
import Home from './app/views/Home.vue'
import Match from './app/views/Match.vue'
import MatchUnderway from './app/views/MatchUnderway.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/match',
      name: 'match',
      // TODO: Get this lazy loading working
      // // route level code-splitting
      // // this generates a separate chunk (about.[hash].js) for this route
      // // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "match" */ './client/views/Match.vue')
      component: Match
    },
    {
      path: '/matchUnderway',
      name: 'matchUnderway',
      // TODO: Get this lazy loading working
      // // route level code-splitting
      // // this generates a separate chunk (about.[hash].js) for this route
      // // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "matchUnderway" */ './client/views/MatchUnderway.vue')
      component: MatchUnderway
    }
  ]
})
