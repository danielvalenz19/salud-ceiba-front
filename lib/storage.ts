// Manejo simple de tokens en localStorage
// ADVERTENCIA: Para producción idealmente usar cookies HttpOnly emitidas por backend.

export type Tokens = { accessToken: string | null; refreshToken: string | null }

const KEY = "auth_tokens"

export function saveTokens(tokens: Tokens) {
  if (typeof window === "undefined") return
  localStorage.setItem(KEY, JSON.stringify(tokens))
  // Copia en cookies NO HttpOnly solo para que el middleware pueda leer.
  if (tokens.accessToken) document.cookie = `accessToken=${tokens.accessToken}; path=/; SameSite=Lax`
  if (tokens.refreshToken) document.cookie = `refreshToken=${tokens.refreshToken}; path=/; SameSite=Lax`
}

export function getTokens(): Tokens {
  if (typeof window === "undefined") return { accessToken: null, refreshToken: null }
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}")
  } catch {
    return { accessToken: null, refreshToken: null }
  }
}

export function clearTokens() {
  if (typeof window === "undefined") return
  localStorage.removeItem(KEY)
  document.cookie = "accessToken=; Max-Age=0; path=/"
  document.cookie = "refreshToken=; Max-Age=0; path=/"
}
