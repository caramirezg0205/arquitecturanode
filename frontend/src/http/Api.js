import axios from 'axios'

export default() => {
  return axios.create({
    // baseURL: 'http://localhost:8000/api/'
    baseURL: 'http://localhost:8000/',
    headers: {
      'x-access-token': localStorage.getItem('token')
    }
  })
}
