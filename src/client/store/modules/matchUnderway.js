import _ from 'lodash'
import moment from 'moment'
import axios from 'axios'
const matchUrl = 'api/match/'
const wrestlerUrl = 'api/wrestlers/'
const matchEventUrl = 'api/match/matchEvent/'

const state = {
  now            : new Date(),
  matchIsLive    : false,
  id             : 'test123', // matchId
  matchTime      : 0,
  lastStoppage   : new Date(),
  completed      : false,
  wrestler1      : {}, // dataBookDB info on wrestler1
  wrestler2      : {}, // dataBookDB info on wrestler2
  officials      : [], // info for the referee(s)
  status         : 'created', // [created, paused, 'inProgress', completed, canceled]
  matchEvents    : [], // All actions of a match [ starts, stops, scores, context(ref gave verbal warning to coach, etc.)]
  control        : 'neutral', // [neutral, redControl, greenControl]
  wrestler1ControlTime : '00:31:84',
  wrestler2ControlTime : moment.duration(100)
}

const getters = {
  matchUnderway: (state) => state,

  matchInProgress: (state) => state.matchIsLive,

  lastStart: (state) => {
    state.matchEvents.find((e) => e.type === 'start')
  },

  lastStop: (state) => {
    const lastStartEvent = state.matchEvents.find((e) => e.type === 'timer' && e.action === 'start')
  },

  matchTime1: (state) => {
    // let createdAt = 'bbbbbbb'
    // let {createdAt} = state.matchEvents.find((e) => e.type === 'timer' && e.action === 'start')
    // console.log("lastStartTime", (createdAt || 'noth') )
    // return (Date.now() - Date.parse(lastStartTime.createdAt)) / 1000
    return state.matchTime
  },

  redScore: (state) => {return _.sum(state.matchEvents
    .filter((event) => (event.type === "scoring" && event.result.wrestlerAwarded === 'wrestler1'))
    .map((event) => { return (event.result.pointsAwarded || 0) }))},

  blueScore:(state) => {return _.sum(state.matchEvents
    .filter((event) => (event.type === "scoring" && event.result.wrestlerAwarded === 'wrestler2'))
    .map((event) => { return (event.result.pointsAwarded || 0) }))}
}

const actions = {
  async redTakedown( {dispatch})    { return dispatch('takedown', 'wrestler1') },
  async redReversal( {dispatch})    { return dispatch('reversal', 'wrestler1') },
  async redEscape(   {dispatch})    { return dispatch('escape'  , 'wrestler1') },
  async redNearfall( {dispatch}, p) { return dispatch('nearfall', 'wrestler1', p) },
  async blueTakedown({dispatch})    { return dispatch('takedown', 'wrestler2') },
  async blueReversal({dispatch})    { return dispatch('reversal', 'wrestler2') },
  async blueEscape(  {dispatch})    { return dispatch('escape'  , 'wrestler2') },
  async blueNearfall({dispatch}, p) { return dispatch('nearfall', 'wrestler2', p) },
  async matchTimerToggle({dispatch}, matchTime) {
    console.log(`\n\n\nmatchTime: ${matchTime}\n\n\n`)
    if (this.getters.matchInProgress) { return dispatch('stopTimer', matchTime) }
    return dispatch('startTimer', matchTime) },

  async takedown({dispatch}, wrestler) {
    const takedown = {
      matchId   : state.id,
      type      : 'scoring',
      action    : 'takedown',
      matchTime : '00:11:45',
      createdAt : new Date(),
      result    : {
        controlChange  : wrestler,
        wrestlerAwarded : wrestler,
        pointsAwarded   : 2, } }
    return dispatch('addMatchEvent', takedown) },

  async reversal({dispatch}, wrestler) {
    const reversal = {
      matchId   : state.id,
      type      : 'scoring',
      action    : 'reversal',
      matchTime : '00:31:84',
      createdAt : new Date(),
      result    : {
        controlChange   : wrestler,
        wrestlerAwarded : wrestler,
        pointsAwarded   : 2, } }
    return dispatch('addMatchEvent', reversal) },

  async escape({dispatch}, wrestler) {
    const escape = {
      matchId   : state.id,
      type      : 'scoring',
      action    : 'escape',
      matchTime : '01:31:84',
      createdAt : new Date(),
      result    : {
        controlChange   : "neutral",
        wrestlerAwarded : wrestler,
        pointsAwarded   : 1, } }
    return dispatch('addMatchEvent', escape) },

  async nearfall({dispatch}, wrestler, points) {
    const nearfall = {
      matchId   : state.id,
      type      : 'scoring',
      action    : 'nearfall',
      matchTime : '01:31:84',
      createdAt : new Date(),
      result    : {
        wrestlerAwarded : wrestler,
        pointsAwarded   : points, } }
    return dispatch('addMatchEvent', nearfall) },

  //  Functions dispatched to commit mutations
  async startTimer({commit, dispatch}, matchTime) {
    commit('startMatch')
    const event = {
      matchId   : state.id,
      type      : 'timer',
      action    : 'start',
      matchTime : matchTime,
      createdAt : new Date(),
      event     : {}
    }
    dispatch('addMatchEvent', event)
  },

  async stopTimer({commit, dispatch}, matchTime) {
    const lastStartTime = state.matchEvents.find((e) => e.type === 'timer' && e.action === 'start')
    console.log('lastStartTime: ', lastStartTime)
    commit('stopMatch')
    const event = {
      matchId   : state.id,
      type      : 'timer',
      action    : 'stop',
      matchTime : matchTime,
      createdAt : new Date(),
      event     : {}
    }
    dispatch('addMatchEvent', event)
  },

  async addMatchEvent({commit}, event) {
    const response = await axios.put(`${matchEventUrl}${state.id}`, event)
    commit('pushMatchEvent', response.data)},

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
      completed : response.data.completed,
      matchEvents: response.data.events }
    commit('setMatchUnderway', match)
    return match } }

const mutations = {
  increaseTimer: (state) => { state.matchTime += 10 },

  startMatch: (state) => {
    state.matchIsLive = true },

  stopMatch: (state) => {
    state.matchIsLive = false
    state.lastStoppage = new Date() },

  pushMatchEvent: (state, event) => { state.matchEvents.push(event) },

  newMatch : (state, match) => {
    const {id, wrestler1, wrestler2} = match
    state.id = id,
    state.wrestler1 = wrestler1,
    state.wrestler2 = wrestler2 },

  setMatchUnderway: (state, match) => {
    const {id, status, wrestler1, wrestler2, completed, matchEvents} = match
    state.id = id,
    state.status = status,
    state.wrestler1 = wrestler1,
    state.wrestler2 = wrestler2,
    state.completed = completed,
    state.matchEvents = matchEvents },
}

export default {
  state,
  getters,
  actions,
  mutations }