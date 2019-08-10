import axios from 'axios'

const url = 'api/match/'

class MatchService {
  // Get match
  static getMatch(id) {
    return axios.get(`${url}${id}`)
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
}

export default MatchService