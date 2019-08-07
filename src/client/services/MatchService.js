import axios from 'axios'

const url = 'api/match/'

class MatchService {
  // Get match

  // Create newMatch
  static addNewMatch(a, b) {
    return axios.post(url, {
      wrestler1: a,
      wrestler2: b
    })
  }
}

export default MatchService