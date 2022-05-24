import axios from 'axios'

class AuthService {
  login(user_id, user_pw) {
    return axios
      .post('http://XXX.XXX.XX.X:31000/DB/authentication', { user_id, user_pw })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem('user', JSON.stringify(res.data))
          console.log(res.data)
          console.log(localStorage.getItem('user'))
        }
        return res.data
      })
  }

  logout() {
    localStorage.removeItem('USER')
  }
}

export default new AuthService()
