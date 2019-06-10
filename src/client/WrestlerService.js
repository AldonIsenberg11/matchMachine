import axios from 'axios'

const url = 'http://localhost:8081/api/wrestlers/'

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
  // Create Wrestlers
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