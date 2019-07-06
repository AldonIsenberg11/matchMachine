import axios from 'axios'

const url = 'api/users/'

class UserService {
  // Get Users
  static getUsers() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url)
        const data = res.data
        resolve(
          data.map(user => ({
            ...user,
            createdAt: new Date(user.createdAt)
          }))
        )
      } catch (err) {
        reject(err)
      }
    })
  }
  // Create Users
  static addUser(user) {
    return axios.post(url, {
      name: user.name,
      email: user.email,
      password: user.password
    })
  }
  // Delete Users
  static deleteUser(id) {
    return axios.delete(`${url}${id}`)
  }
}

export default UserService