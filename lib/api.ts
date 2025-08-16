import axios, { AxiosError } from "axios"
import { getTokens, saveTokens, clearTokens } from "./storage"

// Intentamos leer la base desde la variable pública.
// Si no está (SSR temprano o mala config), diferimos a un fallback sólo en cliente.
let baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
if (!baseURL && typeof window !== "undefined") {
  // eslint-disable-next-line no-console
  console.warn(
    "[api] NEXT_PUBLIC_API_BASE_URL ausente en build. Usando origin como fallback (agregando /api/v1). Revisa tu .env.local.",
  )
  baseURL = `${window.location.origin}/api/v1`
}
if (!baseURL) {
  // Último recurso: placeholder que hará fallar la llamada claramente pero sin romper el render.
  baseURL = "__MISSING_BASE_URL__"
}

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
})

api.interceptors.request.use((config) => {
  const { accessToken } = getTokens()
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

let isRefreshing = false
let queue: Array<(t: string) => void> = []

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError<any>) => {
    const status = error.response?.status
    const original: any = error.config || {}
    if (status === 401 && !original._retry) {
      original._retry = true
      const { refreshToken } = getTokens()
      if (!refreshToken) {
        clearTokens()
        return Promise.reject(error)
      }
      try {
        if (!isRefreshing) {
          isRefreshing = true
          const refreshBase = process.env.NEXT_PUBLIC_API_BASE_URL || baseURL
          const { data } = await axios.post(`${refreshBase}/auth/refresh`, { refreshToken }, {
            headers: { "Content-Type": "application/json" },
          })
          const newAccess = data?.accessToken as string
          if (newAccess) {
            saveTokens({ accessToken: newAccess, refreshToken })
            queue.forEach((cb) => cb(newAccess))
          } else {
            clearTokens()
          }
          queue = []
          isRefreshing = false
        }
        return new Promise((resolve) => {
          queue.push((token: string) => {
            original.headers.Authorization = `Bearer ${token}`
            resolve(api(original))
          })
        })
      } catch (e) {
        isRefreshing = false
        clearTokens()
        return Promise.reject(e)
      }
    }
    return Promise.reject(error)
  },
)

export default api
