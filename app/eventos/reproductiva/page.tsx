"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Layout } from "@/components/layout"
import { Search, Plus, Eye, Edit, Baby, Calendar, User, Filter, Heart, Users } from "lucide-react"
import { NuevaConsultaReproductivaModal } from "@/components/modals/nueva-consulta-reproductiva-modal"

const reproductivaData = [
  {
    id: 1,
    fecha: "2025-05-15",
    dpi: "2547 89632 0101",
    nombre: "María Elena Morales García",
    edad: 34,
    tipoConsulta: "Control Prenatal",
    semanaGestacion: 28,
    tipoAtencion: "Consulta de Seguimiento",
    diagnostico: "Embarazo normal",
    responsable: "Dr. María González",
    territorio: "T1",
    sector: "1A",
    estado: "Activo",
    proximaCita: "2025-06-15",
  },
  {
    id: 2,
    fecha: "2025-05-14",
    dpi: "3298 76543 0101",
    nombre: "Ana Lucía Hernández Rodríguez",
    edad: 28,
    tipoConsulta: "Planificación Familiar",
    semanaGestacion: null,
    tipoAtencion: "Consejería",
    diagnostico: "Orientación anticonceptiva",
    responsable: "Enf. Ana López",
    territorio: "T1",
    sector: "1B",
    estado: "Completado",
    proximaCita: "2025-11-14",
  },
  {
    id: 3,
    fecha: "2025-05-13",
    dpi: "5432 98765 0101",
    nombre: "Sofía Alejandra Gómez Martínez",
    edad: 19,
    tipoConsulta: "Control Prenatal",
    semanaGestacion: 12,
    tipoAtencion: "Primera Consulta",
    diagnostico: "Embarazo de bajo riesgo",
    responsable: "Dr. María González",
    territorio: "T2",
    sector: "2B",
    estado: "Activo",
    proximaCita: "2025-06-13",
  },
  {
    id: 4,
    fecha: "2025-05-12",
    dpi: "7890 34567 0101",
    nombre: "Carmen Rosa López Pérez",
    edad: 42,
    tipoConsulta: "Control Posparto",
    semanaGestacion: null,
    tipoAtencion: "Seguimiento",
    diagnostico: "Puerperio normal",
    responsable: "Enf. María García",
    territorio: "T3",
    sector: "3A",
    estado: "Completado",
    proximaCita: "2025-08-12",
  },
  {
    id: 5,
    fecha: "2025-05-10",
    dpi: "1357 24680 0101",
    nombre: "Claudia Patricia Morales Vásquez",
    edad: 25,
    tipoConsulta: "Detección Cáncer Cervical",
    semanaGestacion: null,
    tipoAtencion: "Tamizaje",
    diagnostico: "Citología normal",
    responsable: "Enf. Sofía Hernández",
    territorio: "T2",
    sector: "2A",
    estado: "Completado",
    proximaCita: "2026-05-10",
  },
]

export default function ReproductivaPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [territorioFilter, setTerritorioFilter] = useState("todos")
  const [tipoFilter, setTipoFilter] = useState("todos")
  const [estadoFilter, setEstadoFilter] = useState("todos")
  const [showNuevaConsulta, setShowNuevaConsulta] = useState(false)

  const filteredEventos = reproductivaData.filter((evento) => {
    const matchesSearch =
      evento.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evento.dpi.includes(searchTerm) ||
      evento.tipoConsulta.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTerritorio = territorioFilter === "todos" || evento.territorio === territorioFilter
    const matchesTipo = tipoFilter === "todos" || evento.tipoConsulta === tipoFilter
    const matchesEstado = estadoFilter === "todos" || evento.estado === estadoFilter

    return matchesSearch && matchesTerritorio && matchesTipo && matchesEstado
  })

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Activo":
        return <Badge className="bg-green-100 text-green-800">Activo</Badge>
      case "Completado":
        return <Badge className="bg-blue-100 text-blue-800">Completado</Badge>
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  const getTipoConsultaBadge = (tipo: string) => {
    const colors: { [key: string]: string } = {
      "Control Prenatal": "bg-pink-100 text-pink-800",
      "Planificación Familiar": "bg-purple-100 text-purple-800",
      "Control Posparto": "bg-blue-100 text-blue-800",
      "Detección Cáncer Cervical": "bg-red-100 text-red-800",
    }
    return <Badge className={colors[tipo] || "bg-gray-100 text-gray-800"}>{tipo}</Badge>
  }

  const handleVerDetalle = (consulta: (typeof reproductivaData)[0]) => {
    console.log("Ver detalle de consulta:", consulta)
    alert(`Mostrando detalles de la consulta: ${consulta.tipoConsulta} - ${consulta.nombre}`)
  }

  const handleEditarConsulta = (consulta: (typeof reproductivaData)[0]) => {
    console.log("Editando consulta:", consulta)
    alert(`Editando consulta de salud reproductiva: ${consulta.tipoConsulta} - ${consulta.nombre}`)
  }

  const limpiarFiltros = () => {
    setSearchTerm("")
    setTerritorioFilter("todos")
    setTipoFilter("todos")
    setEstadoFilter("todos")
  }

  const exportarDatos = () => {
    console.log("Exportando datos de salud reproductiva...")
    // Aquí iría la lógica de exportación
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 flex items-center">
              <Baby className="w-8 h-8 mr-3 text-blue-600" />
              Salud Reproductiva
            </h1>
            <p className="text-blue-600">Atención integral en salud sexual y reproductiva</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
              onClick={() => console.log("Abriendo curva prenatal...")}
            >
              <Heart className="w-4 h-4 mr-2" />
              Curva Prenatal
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowNuevaConsulta(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Consulta
            </Button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Consultas Totales</p>
                  <p className="text-2xl font-bold text-blue-900">456</p>
                  <p className="text-xs text-green-600">Este mes</p>
                </div>
                <Baby className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Embarazos Activos</p>
                  <p className="text-2xl font-bold text-pink-600">89</p>
                  <p className="text-xs text-pink-600">En seguimiento</p>
                </div>
                <Heart className="w-8 h-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Planificación Familiar</p>
                  <p className="text-2xl font-bold text-purple-600">234</p>
                  <p className="text-xs text-purple-600">Usuarias activas</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Tamizajes</p>
                  <p className="text-2xl font-bold text-green-600">167</p>
                  <p className="text-xs text-green-600">Realizados</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Meta</Badge>
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
                  placeholder="Buscar por DPI, nombre..."
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
              <Select value={tipoFilter} onValueChange={setTipoFilter}>
                <SelectTrigger className="border-blue-200">
                  <SelectValue placeholder="Tipo Consulta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Control Prenatal">Control Prenatal</SelectItem>
                  <SelectItem value="Planificación Familiar">Planificación Familiar</SelectItem>
                  <SelectItem value="Control Posparto">Control Posparto</SelectItem>
                  <SelectItem value="Detección Cáncer Cervical">Detección Cáncer Cervical</SelectItem>
                </SelectContent>
              </Select>
              <Select value={estadoFilter} onValueChange={setEstadoFilter}>
                <SelectTrigger className="border-blue-200">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Completado">Completado</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
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

        {/* Tabla de Consultas */}
        <Card className="border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-blue-900">Consultas de Salud Reproductiva</CardTitle>
                <CardDescription>
                  Mostrando {filteredEventos.length} de {reproductivaData.length} consultas
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
                    <TableHead className="text-blue-900 font-semibold">Fecha</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Paciente</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Tipo Consulta</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Detalles</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Diagnóstico</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Responsable</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Estado</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Próxima Cita</TableHead>
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
                      <TableCell>{getTipoConsultaBadge(evento.tipoConsulta)}</TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div>{evento.tipoAtencion}</div>
                          {evento.semanaGestacion && (
                            <div className="text-xs text-pink-600">{evento.semanaGestacion} semanas gestación</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-32">
                        <div className="truncate text-sm" title={evento.diagnostico}>
                          {evento.diagnostico}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3 text-blue-600" />
                          <span className="text-sm">{evento.responsable}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getEstadoBadge(evento.estado)}</TableCell>
                      <TableCell className="text-sm">{evento.proximaCita}</TableCell>
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
                            onClick={() => handleEditarConsulta(evento)}
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
        <NuevaConsultaReproductivaModal isOpen={showNuevaConsulta} onClose={() => setShowNuevaConsulta(false)} />
      </div>
    </Layout>
  )
}
