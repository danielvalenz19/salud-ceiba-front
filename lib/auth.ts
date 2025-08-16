import api from "./api"
import { saveTokens, getTokens, clearTokens } from "./storage"

export async function login(email: string, password: string) {
	const { data } = await api.post("/auth/login", { email, password })
	if (!data?.accessToken || !data?.refreshToken) {
		throw new Error("Respuesta de servidor inválida")
	}
	saveTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken })
	return data
}

export async function logout() {
	try {
		const { refreshToken } = getTokens()
		if (refreshToken) await api.post("/auth/logout", { refreshToken })
	} catch {
		// noop
	} finally {
		clearTokens()
	}
}

export function isAuthenticatedClient(): boolean {
	if (typeof window === "undefined") return false
	const { accessToken } = getTokens()
	return !!accessToken
}

