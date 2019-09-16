import axios from 'axios';
const url = 'api/match/'

const state = {
  matchesUnderway: [] }

const getters = {
  allMatchesUnderway: (state) => state.matchesUnderway }

const actions = {
  async fetchMatchesUnderway({ commit }) {
    const response = await axios.get(url)
    commit('setMatchesUnderway', response.data) },

  async addMatchUnderway({ commit }, match) {
    const response = await axios.post(url, { match, completed: false })
    commit('newMatchUnderway', response.data)
    return response.data },

  async deleteMatchUnderway({ commit }, id) {
    await axios.delete(`${ url }${ id }`)
    commit('removeMatchUnderway', id) } }

const mutations = {
  setMatchesUnderway : (state, matchesUnderway) => (state.matchesUnderway = matchesUnderway),
  newMatchUnderway   : (state, matchUnderway) => state.matchesUnderway.unshift(matchUnderway),
  removeMatchUnderway: (state, matchUnderwayId) => (state.matchesUnderway = state.matchesUnderway.filter(match => match._id !== matchUnderwayId))}

export default {
  state,
  getters,
  actions,
  mutations }