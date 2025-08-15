"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Layout } from "@/components/layout"
import { Search, User, Users, Home, Eye, Calendar, MapPin, Phone } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

// Datos simulados de búsqueda
const resultadosBusqueda = [
  {
    tipo: "Persona",
    id: 1,
    titulo: "María Elena Morales García",
    subtitulo: "DPI: 2547 89632 0101",
    descripcion: "34 años, Femenino",
    ubicacion: "T1-1A, Barrio El Centro",
    telefono: "5512-3456",
    codigoFamilia: "FAM-001-2025",
    ultimaVisita: "2025-05-15",
    icono: User,
    url: "/personas/1",
  },
  {
    tipo: "Familia",
    id: 1,
    titulo: "Familia FAM-001-2025",
    subtitulo: "Jefe: María Elena Morales García",
    descripcion: "4 integrantes",
    ubicacion: "T1-1A, Barrio El Centro, Casa #45",
    telefono: "5512-3456",
    codigoVivienda: "VIV-001-2025",
    ultimaVisita: "2025-05-15",
    icono: Users,
    url: "/familias/FAM-001-2025",
  },
  {
    tipo: "Vivienda",
    id: 1,
    titulo: "VIV-001-2025",
    subtitulo: "Barrio El Centro, Casa #45",
    descripcion: "1 familia, 4 personas",
    ubicacion: "T1-1A",
    responsable: "Enf. Ana López",
    estado: "Visitada",
    ultimaVisita: "2025-05-15",
    icono: Home,
    url: "/viviendas/1",
  },
  {
    tipo: "Persona",
    id: 2,
    titulo: "Carlos Roberto Pérez López",
    subtitulo: "DPI: 1876 54321 0101",
    descripcion: "42 años, Masculino",
    ubicacion: "T2-2A, Colonia San José",
    telefono: "4423-7890",
    codigoFamilia: "FAM-002-2025",
    ultimaVisita: "2025-05-12",
    icono: User,
    url: "/personas/2",
  },
]

export default function BuscarPage() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState("")
  const [filteredResults, setFilteredResults] = useState(resultadosBusqueda)

  useEffect(() => {
    const q = searchParams.get("q")
    if (q) {
      setQuery(q)
      handleSearch(q)
    }
  }, [searchParams])

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setFilteredResults(resultadosBusqueda)
      return
    }

    const filtered = resultadosBusqueda.filter(
      (item) =>
        item.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.descripcion.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.telefono && item.telefono.includes(searchQuery)) ||
        (item.codigoFamilia && item.codigoFamilia.toLowerCase().includes(searchQuery.toLowerCase())),
    )

    setFilteredResults(filtered)
  }

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  const getTipoBadge = (tipo: string) => {
    const colors: { [key: string]: string } = {
      Persona: "bg-blue-100 text-blue-800",
      Familia: "bg-green-100 text-green-800",
      Vivienda: "bg-purple-100 text-purple-800",
    }
    return <Badge className={colors[tipo] || "bg-gray-100 text-gray-800"}>{tipo}</Badge>
  }

  const getEstadoBadge = (estado?: string) => {
    if (!estado) return null
    return estado === "Visitada" ? (
      <Badge className="bg-green-100 text-green-800">Visitada</Badge>
    ) : (
      <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 flex items-center">
              <Search className="w-8 h-8 mr-3 text-blue-600" />
              Búsqueda Global
            </h1>
            <p className="text-blue-600">Buscar personas, familias y viviendas en el sistema</p>
          </div>

          {/* Formulario de Búsqueda */}
          <Card className="border-blue-200">
            <CardContent className="p-6">
              <form onSubmit={onSearch} className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
                  <Input
                    placeholder="Buscar por DPI, nombre, código de familia, teléfono..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10 border-blue-200 focus:border-blue-500 text-lg h-12"
                  />
                </div>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 h-12 px-8">
                  Buscar
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Resultados */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">
              Resultados de Búsqueda
              {query && <span className="text-base font-normal text-blue-600 ml-2">para "{query}"</span>}
            </CardTitle>
            <CardDescription>
              {filteredResults.length} resultado{filteredResults.length !== 1 ? "s" : ""} encontrado
              {filteredResults.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredResults.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron resultados</h3>
                <p className="text-gray-600">
                  Intenta con otros términos de búsqueda como DPI, nombre completo o código de familia.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResults.map((resultado, index) => {
                  const IconComponent = resultado.icono
                  return (
                    <div
                      key={index}
                      className="border border-blue-200 rounded-lg p-4 hover:bg-blue-50/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold text-blue-900">{resultado.titulo}</h3>
                              {getTipoBadge(resultado.tipo)}
                              {resultado.estado && getEstadoBadge(resultado.estado)}
                            </div>
                            <p className="text-blue-600 font-medium mb-2">{resultado.subtitulo}</p>
                            <p className="text-gray-600 mb-3">{resultado.descripcion}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>{resultado.ubicacion}</span>
                              </div>
                              {resultado.telefono && (
                                <div className="flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  <span>{resultado.telefono}</span>
                                </div>
                              )}
                              {resultado.codigoFamilia && (
                                <div className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  <span>Familia: {resultado.codigoFamilia}</span>
                                </div>
                              )}
                              {resultado.codigoVivienda && (
                                <div className="flex items-center gap-1">
                                  <Home className="w-3 h-3" />
                                  <span>Vivienda: {resultado.codigoVivienda}</span>
                                </div>
                              )}
                              {resultado.responsable && (
                                <div className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  <span>{resultado.responsable}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>Última visita: {resultado.ultimaVisita}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Link href={resultado.url}>
                          <Button
                            variant="outline"
                            className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Detalle
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
