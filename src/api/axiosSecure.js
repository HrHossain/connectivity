
// axiosSecure.js
import axios from 'axios'
import { getRefreshToken, getToken, setToken } from '../utils/tokenManager'


const secureApi = axios.create({
    baseURL:`${import.meta.env.VITE_SERVER_BASE_URL}`
})


// ---------- Request Interceptor ----------
secureApi.interceptors.request.use(
  (config) => {
    const  token  = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ---------- Refresh Token Queue (race-condition handle করার জন্য) ----------
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error)
    } else {
      promise.resolve(token)
    }
  })
  failedQueue = []
}

// ---------- Response Interceptor ----------
secureApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // network error হলে response থাকে না
    if (!error.response) {
      return Promise.reject(error)
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // ইতিমধ্যে একটা refresh চলছে, নতুন token-এর জন্য wait করো
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return secureApi(originalRequest)
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
         
        const  refreshToken  = getRefreshToken()

        const res = await axios.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
          { refreshToken }
        )
        const { token: newToken } = res.data

        
console.log(newToken)
setToken(newToken)
        // store.dispatch(tokenUpdate(newToken))

        processQueue(null, newToken)
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return secureApi(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        // store.dispatch(logout()) // refresh token-ও invalid হলে logout করাই ভালো
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default secureApi