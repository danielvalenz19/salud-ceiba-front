import Cookies from "js-cookie"
import { api } from "./api"

export async function login(email: string, password: string) {
	const { data } = await api.post("/auth/login", { email, password })
	const { accessToken, refreshToken } = data
	Cookies.set("accessToken", accessToken, { sameSite: "lax" })
	Cookies.set("refreshToken", refreshToken, { sameSite: "lax" })
	return true
}

export async function logout() {
	const refreshToken = Cookies.get("refreshToken")
	try {
		if (refreshToken) await api.post("/auth/logout", { refreshToken })
	} finally {
		Cookies.remove("accessToken")
		Cookies.remove("refreshToken")
	}
}

export function isAuthenticatedClient(): boolean {
	if (typeof window === "undefined") return false
	return !!Cookies.get("accessToken")
}

