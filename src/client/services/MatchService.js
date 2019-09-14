import axios from 'axios'

const url = 'api/match/'

class MatchService {
  // Get single match
  static getMatch(id) {
    return axios.get(`${url}${id}`)
      .then((response) => {return response})
      .catch((error) => {console.error("Error getting match: ", error)})
  }

  // Get all matches
  static getMatches() {
    return axios.get(`${url}`)
      .then((response) => {return response})
      .catch((error) => {console.error("Error getting match: ", error)})
  }

  // Create newMatch
  static addNewMatch(a, b) {
    return axios.post(url, {
      wrestler1: a,
      wrestler2: b
    }).then(function (response) {
      return response.data
    }).catch((error) => {
      console.error("Error: ", error)
    })
  }

  // Delete Match
  static deleteMatch(id) {
    return axios.delete(`${url}${id}`)
  }
}

export default MatchService