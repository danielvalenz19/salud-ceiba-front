"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import { login } from "@/lib/auth"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
      setError("Configuración inválida: falta NEXT_PUBLIC_API_BASE_URL. Crea .env.local y reinicia.")
      return
    }
    if (!isValidEmail(email)) {
      setError("Ingresa un correo electrónico válido.")
      return
    }
    if (!password || password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.")
      return
    }
    setError(null)
    setIsLoading(true)
    try {
      // Debug: mostrar payload y baseURL
      // eslint-disable-next-line no-console
      console.log("[login] intentando autenticación", { email, baseURL: process.env.NEXT_PUBLIC_API_BASE_URL })
      await login(email, password)
      // eslint-disable-next-line no-console
      console.log("[login] éxito")
      router.push("/dashboard")
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error("[login] error", err)
      const status = err?.response?.status
      if (status === 401) setError("Credenciales inválidas. Verifica tu correo y contraseña.")
      else if (status === 400) setError(err?.response?.data?.message || "Solicitud inválida.")
      else setError("Error del sistema. Inténtalo de nuevo más tarde.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-blue-900">Salud La Ceiba</CardTitle>
            <CardDescription className="text-blue-600">Sistema de Gestión Territorial de Salud</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-900 font-medium">
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="usuario@salud.gob.gt"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-900 font-medium">
                  Contraseña
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-blue-600 hover:text-blue-800"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Iniciando…
                  </>
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>
              {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
            </form>
            <div className="mt-6 text-center">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </CardContent>
        </Card>
        <div className="mt-8 text-center text-sm text-blue-600">
          <p>© 2025 Ministerio de Salud Pública y Asistencia Social</p>
          <p>Distrito de Salud La Ceiba - Guatemala</p>
        </div>
      </div>
    </div>
  )
}
