import axios from 'axios';
const matchUrl = 'api/match/'
const wrestlerUrl = 'api/wrestlers/'
const matchEventUrl = 'api/match/matchEvent/'

const state = {
  id             : 'test123', // matchId
  completed      : false,
  wrestler1      : {}, // dataBookDB info on wrestler1
  wrestler2      : {}, // dataBookDB info on wrestler2
  officials      : [], // info for the referee(s)
  status         : 'created', // [created, inProgress, completed, canceled]
  matchEvents    : [], // All actions of a match [ starts, stops, scores, context(ref gave verbal warning to coach, etc.)]
  control        : 'neutral', // [neutral, redControl, greenControl]
  wrestler1Score : 2,
  wrestler2Score : 9,
  wrestler1ControlTime : '',
  wrestler2ControlTime : ''
}

const getters = {
  matchUnderway: (state) => state
}

const actions = {
  async createMatch({ commit }, match) {
    const response = await axios.post(matchUrl, { match, completed: false })
    match.id     = response
    match.status = 'created'
    commit('newMatch', match)
    return response.data },

  async getMatchUnderway({ commit }, id) {
    const response  = await axios.get(`${matchUrl}${id}`)
    const wrestler1 = await axios.get(`${wrestlerUrl}${response.data.wrestler1}`)
    const wrestler2 = await axios.get(`${wrestlerUrl}${response.data.wrestler2}`)
    const match = {
      id        : id,
      wrestler1 : wrestler1.data,
      wrestler2 : wrestler2.data,
      status    : response.data.status,
      completed : response.data.completed }
    commit('setMatchUnderway', match)
    return match },

  async addMatchEvent({commit}, event) {
    console.log("\n\naddingMatchEvent", event)
    const response = await axios.put(`${matchEventUrl}${event.matchId}`, event)
    console.log("responst0e: ", response)
    commit('pushMatchEvent', response.data) } }

const mutations = {
  newMatch : (state, match) => {
    const {id, wrestler1, wrestler2} = match
    state.id = id,
    state.wrestler1 = wrestler1,
    state.wrestler2 = wrestler2
},

  setMatchUnderway: (state, match) => {
    const {id, wrestler1, wrestler2, completed} = match
    state.id = id,
    state.wrestler1 = wrestler1,
    state.wrestler2 = wrestler2,
    state.completed = completed
  },

  pushMatchEvent: (state, event) => {
    console.log(`pushMatchEvent: ${event}`)
    state.matchEvents.push(event)
  } }

export default {
  state,
  getters,
  actions,
  mutations }