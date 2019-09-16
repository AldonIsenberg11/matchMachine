import axios from 'axios';

const state = {
  matchesUnderway: [
    {id: 1, wrestler1: "Aldon", wrestler2: 'Beau'},
    {id: 2, wrestler1: "Erica", wrestler2: 'Ace'},
    {id: 3, wrestler1: "Longwood", wrestler2: 'Bart'},
    {id: 4, wrestler1: "Jenkins", wrestler2: 'Ace'},
    {id: 5, wrestler1: "Aldon", wrestler2: 'Aldon'},
    {id: 6, wrestler1: "Beau", wrestler2: 'Ace'}
  ]
}

const getters = {
  allMatchesUnderway: (state) => state.matchesUnderway
}

const actions = {}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}