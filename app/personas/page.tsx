"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Layout } from "@/components/layout"
import { DetallePersonaModal } from "@/components/modals/detalle-persona-modal"
import { EditarPersonaModal } from "@/components/modals/editar-persona-modal"
import { Users, Plus, Search, Filter, Download, Eye, Edit, MapPin, Calendar, Phone, X } from "lucide-react"
import Link from "next/link"

const personasData = [
  {
    id: 1,
    dpi: "2547 89632 0101",
    nombre: "María Elena Morales García",
    edad: 34,
    sexo: "F",
    telefono: "5512-3456",
    direccion: "Barrio El Centro, Casa #45",
    territorio: "T1",
    sector: "1A",
    codigoFamilia: "FAM-001-2025",
    estado: "Activo",
    fechaRegistro: "2025-01-15",
    ultimaActualizacion: "2025-05-15",
    fechaNacimiento: "1990-08-15",
    estadoCivil: "Casada",
  },
  {
    id: 2,
    dpi: "1234 56789 0102",
    nombre: "Carlos Roberto Morales",
    edad: 36,
    sexo: "M",
    telefono: "5523-7890",
    direccion: "Barrio El Centro, Casa #45",
    territorio: "T1",
    sector: "1A",
    codigoFamilia: "FAM-001-2025",
    estado: "Activo",
    fechaRegistro: "2025-01-15",
    ultimaActualizacion: "2025-05-10",
    fechaNacimiento: "1988-03-22",
    estadoCivil: "Casado",
  },
  {
    id: 3,
    dpi: "9876 54321 0103",
    nombre: "Ana Sofía López Hernández",
    edad: 28,
    sexo: "F",
    telefono: "5534-1234",
    direccion: "Colonia Las Flores, Casa #12",
    territorio: "T2",
    sector: "2B",
    codigoFamilia: "FAM-002-2025",
    estado: "Activo",
    fechaRegistro: "2025-02-20",
    ultimaActualizacion: "2025-05-12",
    fechaNacimiento: "1996-11-08",
    estadoCivil: "Soltera",
  },
  {
    id: 4,
    dpi: "5555 44444 0104",
    nombre: "Pedro José García Martínez",
    edad: 42,
    sexo: "M",
    telefono: "5545-6789",
    direccion: "Barrio San José, Casa #78",
    territorio: "T3",
    sector: "3A",
    codigoFamilia: "FAM-003-2025",
    estado: "Activo",
    fechaRegistro: "2025-01-30",
    ultimaActualizacion: "2025-05-08",
    fechaNacimiento: "1982-07-14",
    estadoCivil: "Casado",
  },
  {
    id: 5,
    dpi: "7777 88888 0105",
    nombre: "Luisa María Rodríguez Pérez",
    edad: 25,
    sexo: "F",
    telefono: "5556-2345",
    direccion: "Colonia El Progreso, Casa #34",
    territorio: "T2",
    sector: "2A",
    codigoFamilia: "FAM-004-2025",
    estado: "Inactivo",
    fechaRegistro: "2025-03-10",
    ultimaActualizacion: "2025-04-15",
    fechaNacimiento: "1999-12-03",
    estadoCivil: "Soltera",
  },
]

export default function PersonasPage() {
  const [personas, setPersonas] = useState(personasData)
  const [filteredPersonas, setFilteredPersonas] = useState(personasData)
  const [searchQuery, setSearchQuery] = useState("")
  const [territorioFilter, setTerritorioFilter] = useState("todos")
  const [estadoFilter, setEstadoFilter] = useState("todos")
  const [sexoFilter, setSexoFilter] = useState("todos")
  const [showDetalleModal, setShowDetalleModal] = useState(false)
  const [showEditarModal, setShowEditarModal] = useState(false)
  const [selectedPersona, setSelectedPersona] = useState<any>(null)
  const [showFilters, setShowFilters] = useState(false)

  // Aplicar filtros
  const applyFilters = () => {
    let filtered = personas

    // Filtro de búsqueda
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (persona) =>
          persona.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          persona.dpi.includes(searchQuery) ||
          persona.codigoFamilia.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filtro de territorio
    if (territorioFilter !== "todos") {
      filtered = filtered.filter((persona) => persona.territorio === territorioFilter)
    }

    // Filtro de estado
    if (estadoFilter !== "todos") {
      filtered = filtered.filter((persona) => persona.estado === estadoFilter)
    }

    // Filtro de sexo
    if (sexoFilter !== "todos") {
      filtered = filtered.filter((persona) => persona.sexo === sexoFilter)
    }

    setFilteredPersonas(filtered)
  }

  // Aplicar filtros cuando cambien los valores
  useState(() => {
    applyFilters()
  }, [searchQuery, territorioFilter, estadoFilter, sexoFilter, personas])

  const clearFilters = () => {
    setSearchQuery("")
    setTerritorioFilter("todos")
    setEstadoFilter("todos")
    setSexoFilter("todos")
    setFilteredPersonas(personas)
  }

  const getEstadoBadge = (estado: string) => {
    return estado === "Activo" ? (
      <Badge className="bg-green-100 text-green-800">Activo</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800">Inactivo</Badge>
    )
  }

  const getSexoBadge = (sexo: string) => {
    return sexo === "F" ? (
      <Badge variant="outline" className="border-pink-200 text-pink-700">
        Femenino
      </Badge>
    ) : (
      <Badge variant="outline" className="border-blue-200 text-blue-700">
        Masculino
      </Badge>
    )
  }

  const handleVerDetalle = (persona: any) => {
    setSelectedPersona(persona)
    setShowDetalleModal(true)
  }

  const handleEditarPersona = (persona: any) => {
    setSelectedPersona(persona)
    setShowEditarModal(true)
  }

  const handleSavePersona = (personaData: any) => {
    setPersonas((prev) => prev.map((p) => (p.id === personaData.id ? personaData : p)))
    setFilteredPersonas((prev) => prev.map((p) => (p.id === personaData.id ? personaData : p)))
  }

  const handleExportarDatos = () => {
    const csvContent = [
      ["DPI", "Nombre", "Edad", "Sexo", "Teléfono", "Territorio", "Estado"].join(","),
      ...filteredPersonas.map((p) => [p.dpi, p.nombre, p.edad, p.sexo, p.telefono, p.territorio, p.estado].join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `personas_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 flex items-center">
              <Users className="w-8 h-8 mr-3 text-blue-600" />
              Personas & Familias
            </h1>
            <p className="text-blue-600">Gestión del registro poblacional territorial</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
              onClick={handleExportarDatos}
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Link href="/personas/nuevo">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Nueva Persona
              </Button>
            </Link>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Personas</p>
                  <p className="text-2xl font-bold text-blue-900">{personas.length}</p>
                  <p className="text-xs text-blue-600">Registradas</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Personas Activas</p>
                  <p className="text-2xl font-bold text-green-600">
                    {personas.filter((p) => p.estado === "Activo").length}
                  </p>
                  <p className="text-xs text-green-600">
                    {Math.round((personas.filter((p) => p.estado === "Activo").length / personas.length) * 100)}% del
                    total
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800">Activas</Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Familias</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {new Set(personas.map((p) => p.codigoFamilia)).size}
                  </p>
                  <p className="text-xs text-purple-600">Núcleos familiares</p>
                </div>
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Promedio Edad</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {Math.round(personas.reduce((sum, p) => sum + p.edad, 0) / personas.length)}
                  </p>
                  <p className="text-xs text-orange-600">años</p>
                </div>
                <Calendar className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Búsqueda y Filtros */}
        <Card className="border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-blue-900">Búsqueda y Filtros</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="border-blue-200 text-blue-700 bg-transparent"
              >
                <Filter className="w-4 h-4 mr-2" />
                {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-blue-400" />
              <Input
                placeholder="Buscar por DPI, nombre o código de familia..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  applyFilters()
                }}
                className="pl-10 border-blue-200 focus:border-blue-500"
              />
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-blue-200">
                <Select
                  value={territorioFilter}
                  onValueChange={(value) => {
                    setTerritorioFilter(value)
                    applyFilters()
                  }}
                >
                  <SelectTrigger className="border-blue-200">
                    <SelectValue placeholder="Territorio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los territorios</SelectItem>
                    <SelectItem value="T1">Territorio 1</SelectItem>
                    <SelectItem value="T2">Territorio 2</SelectItem>
                    <SelectItem value="T3">Territorio 3</SelectItem>
                    <SelectItem value="T4">Territorio 4</SelectItem>
                    <SelectItem value="T5">Territorio 5</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={estadoFilter}
                  onValueChange={(value) => {
                    setEstadoFilter(value)
                    applyFilters()
                  }}
                >
                  <SelectTrigger className="border-blue-200">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los estados</SelectItem>
                    <SelectItem value="Activo">Activo</SelectItem>
                    <SelectItem value="Inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={sexoFilter}
                  onValueChange={(value) => {
                    setSexoFilter(value)
                    applyFilters()
                  }}
                >
                  <SelectTrigger className="border-blue-200">
                    <SelectValue placeholder="Sexo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Ambos sexos</SelectItem>
                    <SelectItem value="F">Femenino</SelectItem>
                    <SelectItem value="M">Masculino</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                >
                  <X className="w-4 h-4 mr-2" />
                  Limpiar Filtros
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tabla de Personas */}
        <Card className="border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-blue-900">Registro de Personas</CardTitle>
                <CardDescription>
                  Mostrando {filteredPersonas.length} de {personas.length} personas
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-blue-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-50">
                    <TableHead className="text-blue-900 font-semibold">DPI</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Nombre Completo</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Edad</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Sexo</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Contacto</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Territorio</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Estado</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPersonas.map((persona) => (
                    <TableRow key={persona.id} className="hover:bg-blue-50/50">
                      <TableCell className="font-mono text-sm">{persona.dpi}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{persona.nombre}</p>
                          <p className="text-sm text-gray-600">Familia: {persona.codigoFamilia}</p>
                        </div>
                      </TableCell>
                      <TableCell>{persona.edad} años</TableCell>
                      <TableCell>{getSexoBadge(persona.sexo)}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {persona.telefono && (
                            <div className="flex items-center gap-1 text-sm">
                              <Phone className="w-3 h-3 text-blue-600" />
                              <span>{persona.telefono}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate max-w-32">{persona.direccion}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-medium">{persona.territorio}</p>
                          <p className="text-gray-600">Sector {persona.sector}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getEstadoBadge(persona.estado)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50"
                            onClick={() => handleVerDetalle(persona)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50"
                            onClick={() => handleEditarPersona(persona)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Modales */}
        <DetallePersonaModal open={showDetalleModal} onOpenChange={setShowDetalleModal} persona={selectedPersona} />
        <EditarPersonaModal
          open={showEditarModal}
          onOpenChange={setShowEditarModal}
          persona={selectedPersona}
          onSave={handleSavePersona}
        />
      </div>
    </Layout>
  )
}
