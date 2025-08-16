"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Heart, LogIn } from "lucide-react"

export default function UpsPage() {
  const router = useRouter()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center">
      <div className="mb-6 w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
        <Heart className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-blue-900 mb-2">Ups, acceso restringido</h1>
      <p className="text-blue-700 max-w-md mb-8">
        Necesitas iniciar sesión para continuar. Si tu sesión expiró vuelve a autenticarte para recuperar el acceso al
        sistema territorial de salud.
      </p>
      <Button onClick={() => router.push("/")} className="bg-blue-600 hover:bg-blue-700 text-white">
        <LogIn className="w-4 h-4 mr-2" /> Ir al Login
      </Button>
    </div>
  )
}
