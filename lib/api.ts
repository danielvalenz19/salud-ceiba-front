import axios from "axios"
import Cookies from "js-cookie"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: false,
})

api.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

let isRefreshing = false
let queue: Array<(t?: string) => void> = []
const enqueue = (cb: (t?: string) => void) => queue.push(cb)
const flush = (t?: string) => { queue.forEach((cb) => cb(t)); queue = [] }

api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const original = error.config
    if (error?.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          enqueue((t) => {
            if (t) original.headers.Authorization = `Bearer ${t}`
            resolve(api(original))
          })
        })
      }
      original._retry = true
      isRefreshing = true
      try {
        const refreshToken = Cookies.get("refreshToken")
        if (!refreshToken) throw error
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
          { refreshToken },
        )
        Cookies.set("accessToken", data.accessToken, { sameSite: "lax" })
        flush(data.accessToken)
        return api(original)
      } catch (e) {
        Cookies.remove("accessToken")
        Cookies.remove("refreshToken")
        throw e
      } finally {
        isRefreshing = false
      }
    }
    throw error
  },
)
