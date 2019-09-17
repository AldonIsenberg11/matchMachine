import axios from 'axios';
const url = 'api/match/'

const state = {
  match: {},
  matches: [] }

const getters = {
  allMatches: (state) => state.matches }

const actions = {
  async getMatch({ commit }, id) {
    const response = await axios.get(`${url}${id}`)
    commit('setMatch', response.data) },

  async fetchMatches({ commit }) {
    const response = await axios.get(url)
    commit('setMatches', response.data) },

  async deleteMatch({ commit }, id) {
    await axios.delete(`${ url }${ id }`)
    commit('removeMatch', id) } }

const mutations = {
  setMatches  : (state, matches) => (state.matches    = matches),
  setMatch    : (state, match)   => (state.match      = match),
  removeMatch : (state, matchId) => (state.matches    = state.matches.filter(match => match._id !== matchId)) }

export default {
  state,
  getters,
  actions,
  mutations }