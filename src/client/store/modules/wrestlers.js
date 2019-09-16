import axios from 'axios'
const url = 'api/wrestlers/'

const state = { wrestlers: [] }

const getters = {
  allWrestlers: (state) => state.wrestlers
}

const actions = {
  async getWrestlers({ commit }) {
    const response =  await axios.get(url)
    commit('setWrestlers', response.data)
  },
  async addWrestler({ commit }, wrestler) {
    const response = await axios.post(url, wrestler)
    commit('newWrestlerAdded', response.data)
  }
}

const mutations = {
  setWrestlers: (state, wrestlers) => (state.wrestlers = wrestlers),
  newWrestler: (state, wrestler) => (state.wrestlers.unshift(wrestler))
}

export default {
  state,
  getters,
  actions,
  mutations
}