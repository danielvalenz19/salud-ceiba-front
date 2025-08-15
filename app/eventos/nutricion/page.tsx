"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Layout } from "@/components/layout"
import { Search, Plus, Eye, Edit, Apple, Calendar, User, Filter, TrendingUp, TrendingDown } from "lucide-react"
import { NuevaEvaluacionNutricionalModal } from "@/components/modals/nueva-evaluacion-nutricional-modal"
import { DetalleEvaluacionNutricionalModal } from "@/components/modals/detalle-evaluacion-nutricional-modal"

const nutricionData = [
  {
    id: 1,
    fecha: "2025-05-15",
    dpi: "2547 89632 0101",
    nombre: "María Elena Morales García",
    edad: 34,
    tipoEvaluacion: "Control Prenatal",
    peso: 68.5,
    talla: 162,
    imc: 26.1,
    diagnostico: "Sobrepeso leve",
    responsable: "Enf. Ana López",
    territorio: "T1",
    sector: "1A",
    estado: "Completado",
    proximoControl: "2025-06-15",
  },
  {
    id: 2,
    fecha: "2025-05-14",
    dpi: "6789 12345 0101",
    nombre: "Pedro José Morales García",
    edad: 8,
    tipoEvaluacion: "Control Infantil",
    peso: 25.2,
    talla: 125,
    imc: 16.1,
    diagnostico: "Peso normal",
    responsable: "Aux. Carlos Méndez",
    territorio: "T2",
    sector: "2A",
    estado: "Completado",
    proximoControl: "2025-08-14",
  },
  {
    id: 3,
    fecha: "2025-05-13",
    dpi: "3298 76543 0101",
    nombre: "Ana Lucía Hernández Rodríguez",
    edad: 28,
    tipoEvaluacion: "Evaluación Adulto",
    peso: 58.3,
    talla: 158,
    imc: 23.4,
    diagnostico: "Peso normal",
    responsable: "Enf. María García",
    territorio: "T1",
    sector: "1B",
    estado: "Completado",
    proximoControl: "2025-11-13",
  },
  {
    id: 4,
    fecha: "2025-05-12",
    dpi: "4567 12345 0101",
    nombre: "José Miguel Castillo Vásquez",
    edad: 67,
    tipoEvaluacion: "Control Adulto Mayor",
    peso: 72.8,
    talla: 165,
    imc: 26.7,
    diagnostico: "Sobrepeso",
    responsable: "Aux. Pedro Morales",
    territorio: "T3",
    sector: "3A",
    estado: "Requiere Seguimiento",
    proximoControl: "2025-06-12",
  },
  {
    id: 5,
    fecha: "2025-05-10",
    dpi: "8901 23456 0101",
    nombre: "Sofía Alejandra Gómez Martínez",
    edad: 2,
    tipoEvaluacion: "Control Infantil",
    peso: 12.1,
    talla: 85,
    imc: 16.8,
    diagnostico: "Peso normal",
    responsable: "Enf. Sofía Hernández",
    territorio: "T2",
    sector: "2B",
    estado: "Completado",
    proximoControl: "2025-08-10",
  },
]

export default function NutricionPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [territorioFilter, setTerritorioFilter] = useState("todos")
  const [tipoFilter, setTipoFilter] = useState("todos")
  const [estadoFilter, setEstadoFilter] = useState("todos")
  const [showNuevaEvaluacion, setShowNuevaEvaluacion] = useState(false)
  const [showDetalleEvaluacion, setShowDetalleEvaluacion] = useState(false)
  const [selectedEvaluacion, setSelectedEvaluacion] = useState<(typeof nutricionData)[0] | null>(null)

  const filteredEventos = nutricionData.filter((evento) => {
    const matchesSearch =
      evento.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evento.dpi.includes(searchTerm) ||
      evento.tipoEvaluacion.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTerritorio = territorioFilter === "todos" || evento.territorio === territorioFilter
    const matchesTipo = tipoFilter === "todos" || evento.tipoEvaluacion === tipoFilter
    const matchesEstado = estadoFilter === "todos" || evento.estado === estadoFilter

    return matchesSearch && matchesTerritorio && matchesTipo && matchesEstado
  })

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Completado":
        return <Badge className="bg-green-100 text-green-800">Completado</Badge>
      case "Requiere Seguimiento":
        return <Badge className="bg-yellow-100 text-yellow-800">Requiere Seguimiento</Badge>
      case "Pendiente":
        return <Badge className="bg-blue-100 text-blue-800">Pendiente</Badge>
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  const getIMCIndicator = (imc: number) => {
    if (imc < 18.5) return <TrendingDown className="w-4 h-4 text-blue-600" />
    if (imc > 25) return <TrendingUp className="w-4 h-4 text-red-600" />
    return <Apple className="w-4 h-4 text-green-600" />
  }

  const getDiagnosticoBadge = (diagnostico: string) => {
    if (diagnostico.includes("normal")) return <Badge className="bg-green-100 text-green-800">{diagnostico}</Badge>
    if (diagnostico.includes("Sobrepeso")) return <Badge className="bg-yellow-100 text-yellow-800">{diagnostico}</Badge>
    if (diagnostico.includes("Bajo")) return <Badge className="bg-blue-100 text-blue-800">{diagnostico}</Badge>
    return <Badge variant="outline">{diagnostico}</Badge>
  }

  const handleVerDetalle = (evaluacion: (typeof nutricionData)[0]) => {
    setSelectedEvaluacion(evaluacion)
    setShowDetalleEvaluacion(true)
  }

  const handleEditarEvaluacion = (evaluacion: (typeof nutricionData)[0]) => {
    console.log("Editando evaluación:", evaluacion)
    // Aquí se abriría un modal de edición
  }

  const limpiarFiltros = () => {
    setSearchTerm("")
    setTerritorioFilter("todos")
    setTipoFilter("todos")
    setEstadoFilter("todos")
  }

  const exportarDatos = () => {
    console.log("Exportando datos de nutrición...")
    // Aquí iría la lógica de exportación
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 flex items-center">
              <Apple className="w-8 h-8 mr-3 text-blue-600" />
              Módulo de Nutrición
            </h1>
            <p className="text-blue-600">Evaluación y seguimiento nutricional poblacional</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
              onClick={() => console.log("Abriendo curvas de crecimiento...")}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Curvas de Crecimiento
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowNuevaEvaluacion(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Evaluación
            </Button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Evaluaciones</p>
                  <p className="text-2xl font-bold text-blue-900">892</p>
                  <p className="text-xs text-green-600">Este mes</p>
                </div>
                <Apple className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Peso Normal</p>
                  <p className="text-2xl font-bold text-green-600">78.4%</p>
                  <p className="text-xs text-green-600">Población evaluada</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Óptimo</Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Desnutrición</p>
                  <p className="text-2xl font-bold text-red-600">3.2%</p>
                  <p className="text-xs text-red-600">Requiere atención</p>
                </div>
                <TrendingDown className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Seguimientos</p>
                  <p className="text-2xl font-bold text-orange-600">45</p>
                  <p className="text-xs text-orange-600">Programados</p>
                </div>
                <Calendar className="w-8 h-8 text-orange-600" />
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
                  <SelectValue placeholder="Tipo Evaluación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Control Prenatal">Control Prenatal</SelectItem>
                  <SelectItem value="Control Infantil">Control Infantil</SelectItem>
                  <SelectItem value="Evaluación Adulto">Evaluación Adulto</SelectItem>
                  <SelectItem value="Control Adulto Mayor">Control Adulto Mayor</SelectItem>
                </SelectContent>
              </Select>
              <Select value={estadoFilter} onValueChange={setEstadoFilter}>
                <SelectTrigger className="border-blue-200">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Completado">Completado</SelectItem>
                  <SelectItem value="Requiere Seguimiento">Requiere Seguimiento</SelectItem>
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

        {/* Tabla de Evaluaciones Nutricionales */}
        <Card className="border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-blue-900">Evaluaciones Nutricionales</CardTitle>
                <CardDescription>
                  Mostrando {filteredEventos.length} de {nutricionData.length} evaluaciones
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
                    <TableHead className="text-blue-900 font-semibold">Tipo Evaluación</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Medidas</TableHead>
                    <TableHead className="text-blue-900 font-semibold">IMC</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Diagnóstico</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Responsable</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Estado</TableHead>
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
                        <Badge variant="outline" className="text-xs">
                          {evento.tipoEvaluacion}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div>Peso: {evento.peso} kg</div>
                          <div>Talla: {evento.talla} cm</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getIMCIndicator(evento.imc)}
                          <span className="font-semibold">{evento.imc}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getDiagnosticoBadge(evento.diagnostico)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3 text-blue-600" />
                          <span className="text-sm">{evento.responsable}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getEstadoBadge(evento.estado)}</TableCell>
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
                            onClick={() => handleEditarEvaluacion(evento)}
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

        {/* Modales */}
        <NuevaEvaluacionNutricionalModal isOpen={showNuevaEvaluacion} onClose={() => setShowNuevaEvaluacion(false)} />

        <DetalleEvaluacionNutricionalModal
          isOpen={showDetalleEvaluacion}
          onClose={() => setShowDetalleEvaluacion(false)}
          evaluacion={selectedEvaluacion}
        />
      </div>
    </Layout>
  )
}
