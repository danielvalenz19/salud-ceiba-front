import { NextResponse, type NextRequest } from "next/server"

// Rutas públicas (no requieren token).
// Mantenemos sólo las necesarias del frontend; llamadas al backend externo (localhost:4000) no pasan por este middleware.
const PUBLIC_PATHS = ["/", "/ups", "/favicon.ico", "/_next"]

function isPublicPath(pathname: string) {
	if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) return true
	// Permitir assets estáticos (imagenes, fuentes) que viven en /public
	if (/\.(png|jpg|jpeg|svg|gif|webp|ico|txt|json)$/.test(pathname)) return true
	return false
}

export function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl
	if (isPublicPath(pathname)) return NextResponse.next()
	const accessToken = req.cookies.get("accessToken")?.value
	if (!accessToken) {
		const url = req.nextUrl.clone()
		url.pathname = "/ups"
		url.searchParams.set("from", pathname)
		return NextResponse.redirect(url)
	}
	return NextResponse.next()
}

export const config = { matcher: ["/(.*)"] }

