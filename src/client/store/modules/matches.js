import axios from 'axios';
const url = 'api/match/'

const state = {
  matches: [] }

const getters = {
  allMatches: (state) => state.matches }

const actions = {
  async fetchMatches({ commit }) {
    const response = await axios.get(url)
    commit('setMatches', response.data) },

  async addMatch({ commit }, match) {
    const response = await axios.post(url, { match, completed: false })
    commit('newMatch', response.data)
    return response.data },

  async deleteMatch({ commit }, id) {
    await axios.delete(`${ url }${ id }`)
    commit('removeMatch', id) } }

const mutations = {
  setMatches  : (state, matches) => (state.matches = matches),
  newMatch    : (state, match)   => state.matches.unshift(match),
  removeMatch : (state, matchId) => (state.matches = state.matches.filter(match => match._id !== matchId))}

export default {
  state,
  getters,
  actions,
  mutations }