import Vue from 'vue'
import Vuex from 'vuex'
import wrestlers from './modules/wrestlers'
import matches from './modules/matches'
import matchUnderway from './modules/matchUnderway'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    wrestlers,
    matches,
    matchUnderway
  },
  // state: {

  // },
  // mutations: {

  // },
  // actions: {

  // }
})
