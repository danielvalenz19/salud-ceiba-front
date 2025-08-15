"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Layout } from "@/components/layout"
import { Search, Plus, Eye, Edit, Microscope, Calendar, User, Filter, AlertTriangle, Activity } from "lucide-react"
import { NotificarCasoEpidemiologicoModal } from "@/components/modals/notificar-caso-epidemiologico-modal"

const epidemiologiaData = [
  {
    id: 1,
    fecha: "2025-05-15",
    dpi: "2547 89632 0101",
    nombre: "María Elena Morales García",
    edad: 34,
    evento: "Dengue",
    clasificacion: "Caso Sospechoso",
    fechaInicio: "2025-05-12",
    estado: "En Investigación",
    responsable: "Epi. Dr. Carlos Ruiz",
    territorio: "T1",
    sector: "1A",
    notificado: "Sí",
    seguimiento: "Activo",
  },
  {
    id: 2,
    fecha: "2025-05-14",
    dpi: "1876 54321 0101",
    nombre: "Carlos Roberto Pérez López",
    edad: 42,
    evento: "COVID-19",
    clasificacion: "Caso Confirmado",
    fechaInicio: "2025-05-10",
    estado: "Cerrado",
    responsable: "Epi. Dra. Ana Morales",
    territorio: "T2",
    sector: "2A",
    notificado: "Sí",
    seguimiento: "Completado",
  },
  {
    id: 3,
    fecha: "2025-05-13",
    dpi: "3298 76543 0101",
    nombre: "Ana Lucía Hernández Rodríguez",
    edad: 28,
    evento: "Influenza",
    clasificacion: "Caso Probable",
    fechaInicio: "2025-05-11",
    estado: "En Seguimiento",
    responsable: "Epi. Dr. Pedro Gómez",
    territorio: "T1",
    sector: "1B",
    notificado: "Sí",
    seguimiento: "Activo",
  },
  {
    id: 4,
    fecha: "2025-05-12",
    dpi: "4567 12345 0101",
    nombre: "José Miguel Castillo Vásquez",
    edad: 67,
    evento: "Neumonía",
    clasificacion: "Caso Confirmado",
    fechaInicio: "2025-05-08",
    estado: "Hospitalizado",
    responsable: "Epi. Dra. María López",
    territorio: "T3",
    sector: "3A",
    notificado: "Sí",
    seguimiento: "Crítico",
  },
  {
    id: 5,
    fecha: "2025-05-10",
    dpi: "5432 98765 0101",
    nombre: "Sofía Alejandra Gómez Martínez",
    edad: 19,
    evento: "Zika",
    clasificacion: "Caso Descartado",
    fechaInicio: "2025-05-07",
    estado: "Cerrado",
    responsable: "Epi. Dr. Luis Herrera",
    territorio: "T2",
    sector: "2B",
    notificado: "Sí",
    seguimiento: "Completado",
  },
]

export default function EpidemiologiaPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [territorioFilter, setTerritorioFilter] = useState("todos")
  const [eventoFilter, setEventoFilter] = useState("todos")
  const [estadoFilter, setEstadoFilter] = useState("todos")
  const [showNotificarCaso, setShowNotificarCaso] = useState(false)

  const filteredEventos = epidemiologiaData.filter((evento) => {
    const matchesSearch =
      evento.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evento.dpi.includes(searchTerm) ||
      evento.evento.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTerritorio = territorioFilter === "todos" || evento.territorio === territorioFilter
    const matchesEvento = eventoFilter === "todos" || evento.evento === eventoFilter
    const matchesEstado = estadoFilter === "todos" || evento.estado === estadoFilter

    return matchesSearch && matchesTerritorio && matchesEvento && matchesEstado
  })

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "En Investigación":
        return <Badge className="bg-yellow-100 text-yellow-800">En Investigación</Badge>
      case "En Seguimiento":
        return <Badge className="bg-blue-100 text-blue-800">En Seguimiento</Badge>
      case "Hospitalizado":
        return <Badge className="bg-red-100 text-red-800">Hospitalizado</Badge>
      case "Cerrado":
        return <Badge className="bg-green-100 text-green-800">Cerrado</Badge>
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  const getClasificacionBadge = (clasificacion: string) => {
    switch (clasificacion) {
      case "Caso Confirmado":
        return <Badge className="bg-red-100 text-red-800">Confirmado</Badge>
      case "Caso Probable":
        return <Badge className="bg-orange-100 text-orange-800">Probable</Badge>
      case "Caso Sospechoso":
        return <Badge className="bg-yellow-100 text-yellow-800">Sospechoso</Badge>
      case "Caso Descartado":
        return <Badge className="bg-gray-100 text-gray-800">Descartado</Badge>
      default:
        return <Badge variant="outline">{clasificacion}</Badge>
    }
  }

  const getSeguimientoBadge = (seguimiento: string) => {
    switch (seguimiento) {
      case "Activo":
        return <Badge className="bg-blue-100 text-blue-800">Activo</Badge>
      case "Crítico":
        return <Badge className="bg-red-100 text-red-800">Crítico</Badge>
      case "Completado":
        return <Badge className="bg-green-100 text-green-800">Completado</Badge>
      default:
        return <Badge variant="secondary">{seguimiento}</Badge>
    }
  }

  const handleVerDetalle = (caso: (typeof epidemiologiaData)[0]) => {
    console.log("Ver detalle de caso:", caso)
    alert(`Mostrando detalles del caso: ${caso.evento} - ${caso.nombre}`)
  }

  const handleEditarCaso = (caso: (typeof epidemiologiaData)[0]) => {
    console.log("Editando caso:", caso)
    alert(`Editando caso epidemiológico: ${caso.evento} - ${caso.nombre}`)
  }

  const limpiarFiltros = () => {
    setSearchTerm("")
    setTerritorioFilter("todos")
    setEventoFilter("todos")
    setEstadoFilter("todos")
  }

  const exportarDatos = () => {
    console.log("Exportando datos epidemiológicos...")
    // Aquí iría la lógica de exportación
  }

  const verAlertasEpidemiologicas = () => {
    console.log("Abriendo alertas epidemiológicas...")
    // Aquí se abriría un modal o página de alertas epidemiológicas
    alert("Mostrando alertas epidemiológicas del sistema")
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 flex items-center">
              <Microscope className="w-8 h-8 mr-3 text-blue-600" />
              Módulo de Epidemiología
            </h1>
            <p className="text-blue-600">Vigilancia epidemiológica y control de enfermedades</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
              onClick={verAlertasEpidemiologicas}
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Alertas Epidemiológicas
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowNotificarCaso(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Notificar Caso
            </Button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Casos Notificados</p>
                  <p className="text-2xl font-bold text-blue-900">127</p>
                  <p className="text-xs text-green-600">Este mes</p>
                </div>
                <Microscope className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Casos Confirmados</p>
                  <p className="text-2xl font-bold text-red-600">23</p>
                  <p className="text-xs text-red-600">En seguimiento</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Brotes Activos</p>
                  <p className="text-2xl font-bold text-orange-600">2</p>
                  <p className="text-xs text-orange-600">Dengue, Influenza</p>
                </div>
                <Activity className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Tasa Incidencia</p>
                  <p className="text-2xl font-bold text-purple-600">4.2</p>
                  <p className="text-xs text-purple-600">Por 1000 hab.</p>
                </div>
                <Badge className="bg-purple-100 text-purple-800">Normal</Badge>
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
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400" />
                <Input
                  placeholder="Buscar por DPI, nombre o evento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 border-blue-200 focus:border-blue-500"
                />
              </div>
              <Select value={territorioFilter} onValueChange={setTerritorioFilter}>
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
              <Select value={eventoFilter} onValueChange={setEventoFilter}>
                <SelectTrigger className="border-blue-200">
                  <SelectValue placeholder="Evento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Dengue">Dengue</SelectItem>
                  <SelectItem value="COVID-19">COVID-19</SelectItem>
                  <SelectItem value="Influenza">Influenza</SelectItem>
                  <SelectItem value="Neumonía">Neumonía</SelectItem>
                  <SelectItem value="Zika">Zika</SelectItem>
                </SelectContent>
              </Select>
              <Select value={estadoFilter} onValueChange={setEstadoFilter}>
                <SelectTrigger className="border-blue-200">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="En Investigación">En Investigación</SelectItem>
                  <SelectItem value="En Seguimiento">En Seguimiento</SelectItem>
                  <SelectItem value="Hospitalizado">Hospitalizado</SelectItem>
                  <SelectItem value="Cerrado">Cerrado</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                onClick={limpiarFiltros}
              >
                Limpiar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de Casos Epidemiológicos */}
        <Card className="border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-blue-900">Casos Epidemiológicos</CardTitle>
                <CardDescription>
                  Mostrando {filteredEventos.length} de {epidemiologiaData.length} casos
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-200 text-blue-700 bg-transparent"
                  onClick={exportarDatos}
                >
                  Exportar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-200 text-blue-700 bg-transparent"
                  onClick={() => console.log("Configurando columnas...")}
                >
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
                    <TableHead className="text-blue-900 font-semibold">Fecha Notificación</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Paciente</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Evento</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Clasificación</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Fecha Inicio</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Estado</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Seguimiento</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Responsable</TableHead>
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
                        <Badge variant="outline" className="font-medium">
                          {evento.evento}
                        </Badge>
                      </TableCell>
                      <TableCell>{getClasificacionBadge(evento.clasificacion)}</TableCell>
                      <TableCell className="text-sm">{evento.fechaInicio}</TableCell>
                      <TableCell>{getEstadoBadge(evento.estado)}</TableCell>
                      <TableCell>{getSeguimientoBadge(evento.seguimiento)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3 text-blue-600" />
                          <span className="text-sm">{evento.responsable}</span>
                        </div>
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
                            onClick={() => handleEditarCaso(evento)}
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
              <div className="text-sm text-blue-600">Mostrando 1-5 de {filteredEventos.length} resultados</div>
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

        {/* Modal */}
        <NotificarCasoEpidemiologicoModal isOpen={showNotificarCaso} onClose={() => setShowNotificarCaso(false)} />
      </div>
    </Layout>
  )
}
