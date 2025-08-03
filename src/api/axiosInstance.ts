import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com',
//   baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const { token } = JSON.parse(storedUser)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default axiosInstance
