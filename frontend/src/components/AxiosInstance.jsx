import axios from 'axios'

const axiosInstance = (token) => {
  return axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 5000,
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      accept: 'application/json'
    }
  })
}

export default axiosInstance
