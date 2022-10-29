import axios from 'axios'
import { getNotification } from '../utils/helpers/notification'
import { changeRoute } from '../utils/helpers/router';

const BASE_URL = 'http://localhost:3000'

const api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL
})

function requestInterceptor(config) {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  config.headers.ContentType = 'application/json'
  return config
}

function responseInterceptor(config) {
  return config
}

async function responseErrorInterceptor({ response, config }) {
  if (response.status === 401) {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/auth/refreshToken`, { withCredentials: true })
      localStorage.setItem('token', data.accessToken)

      return api.request(config)
    } catch (e) {
      console.log('Error: ', e)

      localStorage.clear()
      changeRoute('/login')
    }
  }

  getNotification({ message: response.data })
  throw new Error(response.data)
}

api.interceptors.request.use(requestInterceptor)
api.interceptors.response.use(responseInterceptor, responseErrorInterceptor)

export default api
