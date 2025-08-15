"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Layout } from "@/components/layout"
import { DetallePersonaModal } from "@/components/modals/detalle-persona-modal"
import { RegistrarVacunaModal } from "@/components/modals/registrar-vacuna-modal"
import { EsquemasVacunacionModal } from "@/components/modals/esquemas-vacunacion-modal"
import { Search, Plus, Eye, Edit, Syringe, Calendar, User, MapPin, Filter, FileText, X } from "lucide-react"

const vacunacionData = [
  {
    id: 1,
    fecha: "2025-05-15",
    dpi: "2547 89632 0101",
    nombre: "María Elena Morales García",
    edad: 34,
    vacuna: "COVID-19 (Pfizer)",
    dosis: "Refuerzo",
    lote: "PF2025-456",
    responsable: "Enf. Ana López",
    territorio: "T1",
    sector: "1A",
    estado: "Aplicada",
    proximaDosis: "2025-11-15",
  },
  {
    id: 2,
    fecha: "2025-05-14",
    dpi: "1876 54321 0101",
    nombre: "Carlos Roberto Pérez López",
    edad: 42,
    vacuna: "Influenza",
    dosis: "Anual",
    lote: "INF2025-123",
    responsable: "Aux. Carlos Méndez",
    territorio: "T2",
    sector: "2A",
    estado: "Aplicada",
    proximaDosis: "2026-05-14",
  },
  {
    id: 3,
    fecha: "2025-05-13",
    dpi: "3298 76543 0101",
    nombre: "Ana Lucía Hernández Rodríguez",
    edad: 28,
    vacuna: "Tdap",
    dosis: "Única",
    lote: "TD2025-789",
    responsable: "Enf. María García",
    territorio: "T1",
    sector: "1B",
    estado: "Aplicada",
    proximaDosis: "2035-05-13",
  },
  {
    id: 4,
    fecha: "2025-05-12",
    dpi: "5432 98765 0101",
    nombre: "Sofía Alejandra Gómez Martínez",
    edad: 19,
    vacuna: "HPV",
    dosis: "2da dosis",
    lote: "HPV2025-321",
    responsable: "Enf. Sofía Hernández",
    territorio: "T2",
    sector: "2B",
    estado: "Aplicada",
    proximaDosis: "2025-11-12",
  },
  {
    id: 5,
    fecha: "2025-05-10",
    dpi: "4567 12345 0101",
    nombre: "José Miguel Castillo Vásquez",
    edad: 67,
    vacuna: "Neumococo",
    dosis: "Única",
    lote: "NEU2025-654",
    responsable: "Aux. Pedro Morales",
    territorio: "T3",
    sector: "3A",
    estado: "Programada",
    proximaDosis: "N/A",
  },
]

export default function VacunacionPage() {
  const [eventos, setEventos] = useState(vacunacionData)
  const [filteredEventos, setFilteredEventos] = useState(vacunacionData)
  const [searchTerm, setSearchTerm] = useState("")
  const [territorioFilter, setTerritorioFilter] = useState("todos")
  const [estadoFilter, setEstadoFilter] = useState("todos")
  const [vacunaFilter, setVacunaFilter] = useState("todas")
  const [showDetalleModal, setShowDetalleModal] = useState(false)
  const [showRegistrarModal, setShowRegistrarModal] = useState(false)
  const [showEsquemasModal, setShowEsquemasModal] = useState(false)
  const [selectedPersona, setSelectedPersona] = useState<any>(null)

  const applyFilters = () => {
    let filtered = eventos

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (evento) =>
          evento.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          evento.dpi.includes(searchTerm) ||
          evento.vacuna.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (territorioFilter !== "todos") {
      filtered = filtered.filter((evento) => evento.territorio === territorioFilter)
    }

    if (estadoFilter !== "todos") {
      filtered = filtered.filter((evento) => evento.estado === estadoFilter)
    }

    if (vacunaFilter !== "todas") {
      filtered = filtered.filter((evento) => evento.vacuna.includes(vacunaFilter))
    }

    setFilteredEventos(filtered)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setTerritorioFilter("todos")
    setEstadoFilter("todos")
    setVacunaFilter("todas")
    setFilteredEventos(eventos)
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Aplicada":
        return <Badge className="bg-green-100 text-green-800">Aplicada</Badge>
      case "Programada":
        return <Badge className="bg-blue-100 text-blue-800">Programada</Badge>
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  const handleVerDetalle = (evento: any) => {
    const persona = {
      id: evento.id,
      dpi: evento.dpi,
      nombre: evento.nombre,
      edad: evento.edad,
      sexo: evento.edad > 30 ? "F" : "M", // Simulado
      telefono: "5512-3456", // Simulado
      direccion: `${evento.territorio}-${evento.sector}`, // Simulado
      territorio: evento.territorio,
      sector: evento.sector,
      codigoFamilia: `FAM-${evento.id.toString().padStart(3, "0")}-2025`,
      estado: "Activo",
      fechaRegistro: "2025-01-15",
      ultimaActualizacion: evento.fecha,
      fechaNacimiento: `${2025 - evento.edad}-01-01`,
      estadoCivil: "Casado",
    }
    setSelectedPersona(persona)
    setShowDetalleModal(true)
  }

  const handleEditarEvento = (evento: any) => {
    alert(
      `Editando evento de vacunación:\n\nPaciente: ${evento.nombre}\nVacuna: ${evento.vacuna}\nFecha: ${evento.fecha}`,
    )
  }

  const handleSaveVacuna = (vacunaData: any) => {
    setEventos((prev) => [...prev, vacunaData])
    setFilteredEventos((prev) => [...prev, vacunaData])
  }

  const handleExportar = () => {
    const csvContent = [
      ["Fecha", "DPI", "Nombre", "Vacuna", "Dosis", "Estado", "Responsable"].join(","),
      ...filteredEventos.map((e) => [e.fecha, e.dpi, e.nombre, e.vacuna, e.dosis, e.estado, e.responsable].join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `vacunacion_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // Aplicar filtros cuando cambien
  useState(() => {
    applyFilters()
  }, [searchTerm, territorioFilter, estadoFilter, vacunaFilter, eventos])

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 flex items-center">
              <Syringe className="w-8 h-8 mr-3 text-blue-600" />
              Módulo de Vacunación
            </h1>
            <p className="text-blue-600">Registro y seguimiento de esquemas de vacunación</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
              onClick={() => setShowEsquemasModal(true)}
            >
              <FileText className="w-4 h-4 mr-2" />
              Esquemas
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowRegistrarModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Registrar Vacuna
            </Button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Vacunas Aplicadas</p>
                  <p className="text-2xl font-bold text-blue-900">1,234</p>
                  <p className="text-xs text-green-600">Este mes</p>
                </div>
                <Syringe className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Cobertura COVID-19</p>
                  <p className="text-2xl font-bold text-green-600">87.3%</p>
                  <p className="text-xs text-blue-600">Meta: 90%</p>
                </div>
                <Badge className="bg-green-100 text-green-800">En meta</Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Programadas</p>
                  <p className="text-2xl font-bold text-blue-600">156</p>
                  <p className="text-xs text-blue-600">Próximos 7 días</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Esquemas Completos</p>
                  <p className="text-2xl font-bold text-green-600">2,456</p>
                  <p className="text-xs text-green-600">+89 este mes</p>
                </div>
                <Badge className="bg-green-100 text-green-800">92.1%</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros y Búsqueda */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg text-blue-900 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filtros de Búsqueda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400" />
                <Input
                  placeholder="Buscar por DPI, nombre o vacuna..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    applyFilters()
                  }}
                  className="pl-8 border-blue-200 focus:border-blue-500"
                />
              </div>
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
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="T1">Territorio 1</SelectItem>
                  <SelectItem value="T2">Territorio 2</SelectItem>
                  <SelectItem value="T3">Territorio 3</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={vacunaFilter}
                onValueChange={(value) => {
                  setVacunaFilter(value)
                  applyFilters()
                }}
              >
                <SelectTrigger className="border-blue-200">
                  <SelectValue placeholder="Tipo de Vacuna" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  <SelectItem value="COVID-19">COVID-19</SelectItem>
                  <SelectItem value="Influenza">Influenza</SelectItem>
                  <SelectItem value="HPV">HPV</SelectItem>
                  <SelectItem value="Tdap">Tdap</SelectItem>
                  <SelectItem value="Neumococo">Neumococo</SelectItem>
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
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Aplicada">Aplicada</SelectItem>
                  <SelectItem value="Programada">Programada</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                onClick={clearFilters}
              >
                <X className="w-4 h-4 mr-2" />
                Limpiar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de Eventos de Vacunación */}
        <Card className="border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-blue-900">Registro de Vacunación</CardTitle>
                <CardDescription>
                  Mostrando {filteredEventos.length} de {vacunacionData.length} eventos
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-200 text-blue-700 bg-transparent"
                  onClick={handleExportar}
                >
                  Exportar
                </Button>
                <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 bg-transparent">
                  Columnas
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-blue-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-50">
                    <TableHead className="text-blue-900 font-semibold">Fecha</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Paciente</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Vacuna/Dosis</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Lote</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Responsable</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Ubicación</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Estado</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Próxima Dosis</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEventos.map((evento) => (
                    <TableRow key={evento.id} className="hover:bg-blue-50/50">
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-blue-600" />
                          <span className="text-sm">{evento.fecha}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium text-sm">{evento.nombre}</div>
                          <div className="text-xs text-gray-600 font-mono">{evento.dpi}</div>
                          <div className="text-xs text-blue-600">{evento.edad} años</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium text-sm">{evento.vacuna}</div>
                          <Badge variant="outline" className="text-xs">
                            {evento.dosis}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{evento.lote}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3 text-blue-600" />
                          <span className="text-sm">{evento.responsable}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-blue-600" />
                          <span className="text-sm">
                            {evento.territorio}-{evento.sector}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{getEstadoBadge(evento.estado)}</TableCell>
                      <TableCell className="text-sm">
                        {evento.proximaDosis !== "N/A" ? evento.proximaDosis : "-"}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50"
                            onClick={() => handleVerDetalle(evento)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50"
                            onClick={() => handleEditarEvento(evento)}
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

            {/* Paginación */}
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-blue-600">
                Mostrando 1-{filteredEventos.length} de {filteredEventos.length} resultados
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled className="border-blue-200 bg-transparent">
                  Anterior
                </Button>
                <Button variant="outline" size="sm" className="border-blue-200 bg-blue-600 text-white">
                  1
                </Button>
                <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 bg-transparent">
                  2
                </Button>
                <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 bg-transparent">
                  Siguiente
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modales */}
        <DetallePersonaModal open={showDetalleModal} onOpenChange={setShowDetalleModal} persona={selectedPersona} />
        <RegistrarVacunaModal
          open={showRegistrarModal}
          onOpenChange={setShowRegistrarModal}
          onSave={handleSaveVacuna}
        />
        <EsquemasVacunacionModal open={showEsquemasModal} onOpenChange={setShowEsquemasModal} />
      </div>
    </Layout>
  )
}
