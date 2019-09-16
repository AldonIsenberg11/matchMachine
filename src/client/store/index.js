import Vue from 'vue'
import Vuex from 'vuex'
import wrestlers from './modules/wrestlers'
import matchesUnderway from './modules/matchesUnderway'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    wrestlers,
    matchesUnderway
  },
  // state: {

  // },
  // mutations: {

  // },
  // actions: {

  // }
})
