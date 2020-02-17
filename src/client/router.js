import Vue from 'vue'
import Router from 'vue-router'
import Home from './app/views/Home.vue'
import NewMatch from './app/views/NewMatch.vue'
import MatchUnderwayId from './app/views/MatchUnderwayId.vue'
// import Wrestlers from './app/components/AddWrestler.vue'
import Wrestlers from './app/views/Wrestlers.vue'
import Matches from './app/components/ListOfMatches.vue'
import MatchesUnderway from './app/components/MatchesUnderway.vue'
import Register from './app/views/Register.vue'
import Login from './app/views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/newMatch',
      name: 'match',
      // TODO: Get this lazy loading working
      // // route level code-splitting
      // // this generates a separate chunk (about.[hash].js) for this route
      // // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "match" */ './client/views/Match.vue')
      component: NewMatch
    },
    {
      path: '/matchUnderway/:id', component: MatchUnderwayId
    },
    {
      path: '/wrestlers',
      name: 'wrestlers',
      // TODO: Get this lazy loading working
      // // route level code-splitting
      // // this generates a separate chunk (about.[hash].js) for this route
      // // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "matchUnderway" */ './client/views/MatchUnderway.vue')
      component: Wrestlers
    },
    {
      path: '/wrestlers',
      name: 'wrestlers',
      // TODO: Get this lazy loading working
      // // route level code-splitting
      // // this generates a separate chunk (about.[hash].js) for this route
      // // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "matchUnderway" */ './client/views/MatchUnderway.vue')
      component: Wrestlers
    },
    {
      path: '/matches',
      name: 'matches',
      // TODO: Get this lazy loading working
      // // route level code-splitting
      // // this generates a separate chunk (about.[hash].js) for this route
      // // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "matchUnderway" */ './client/views/MatchUnderway.vue')
      component: Matches
    },
    {
      path: '/matchesUnderway',
      name: 'matchesUnderway',
      // TODO: Get this lazy loading working
      // // route level code-splitting
      // // this generates a separate chunk (about.[hash].js) for this route
      // // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "matchUnderway" */ './client/views/MatchUnderway.vue')
      component: MatchesUnderway
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }

  ]
})
