import axios from 'axios'

const url = 'api/wrestlers/'

class WrestlerService {
  // Get Wrestlers
  static getWrestlers() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url)
        const data = res.data
        resolve(
          data.map(wrestler => ({
            ...wrestler,
            createdAt: new Date(wrestler.createdAt)
          }))
        )
      } catch (err) {
        reject(err)
      }
    })
  }
  // Get Wrestler
  static getWrestler(id) {
    return axios.get(`${url}${id}`)
      .then((response) => {
        console.log("GettingWrestlerResponse", response)
        return response
      })
      .catch((error) => {console.error("Error getting match: ", error)})
  }

  // Create Wrestler
  static addWrestler(text) {
    return axios.post(url, {
      name: text
    })
  }
  // Delete Wrestlers
  static deleteWrestler(id) {
    return axios.delete(`${url}${id}`)
  }
}

export default WrestlerService