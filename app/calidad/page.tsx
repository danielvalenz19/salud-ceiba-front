"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Layout } from "@/components/layout"
import {
  Search,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Database,
  Users,
  Home,
  Activity,
  Filter,
  RefreshCw,
} from "lucide-react"

const calidadDatos = [
  {
    id: 1,
    entidad: "Personas",
    campo: "DPI",
    problema: "Campo vacío",
    registrosAfectados: 23,
    porcentaje: 0.8,
    severidad: "Alta",
    territorio: "T1",
    fechaDeteccion: "2025-05-15",
  },
  {
    id: 2,
    entidad: "Viviendas",
    campo: "Sector",
    problema: "Valor inválido",
    registrosAfectados: 12,
    porcentaje: 1.2,
    severidad: "Media",
    territorio: "T2",
    fechaDeteccion: "2025-05-14",
  },
  {
    id: 3,
    entidad: "Eventos",
    campo: "Fecha",
    problema: "Formato incorrecto",
    registrosAfectados: 8,
    porcentaje: 0.3,
    severidad: "Baja",
    territorio: "T3",
    fechaDeteccion: "2025-05-13",
  },
  {
    id: 4,
    entidad: "Familias",
    campo: "Teléfono",
    problema: "Campo vacío",
    registrosAfectados: 45,
    porcentaje: 5.1,
    severidad: "Media",
    territorio: "T1",
    fechaDeteccion: "2025-05-12",
  },
]

const alertasData = [
  {
    id: 1,
    tipo: "Stock Crítico",
    descripcion: "Paracetamol 500mg por debajo del mínimo",
    territorio: "T2",
    fechaCreacion: "2025-05-15",
    estado: "Activa",
    prioridad: "Alta",
    responsable: "Aux. Carlos Méndez",
  },
  {
    id: 2,
    tipo: "Vencimiento",
    descripcion: "Vacuna Influenza vence en 15 días",
    territorio: "T3",
    fechaCreacion: "2025-05-14",
    estado: "Activa",
    prioridad: "Media",
    responsable: "Enf. María García",
  },
  {
    id: 3,
    tipo: "Cobertura",
    descripcion: "Sector 2B por debajo de meta de vacunación",
    territorio: "T2",
    fechaCreacion: "2025-05-13",
    estado: "En Proceso",
    prioridad: "Media",
    responsable: "Enf. Sofía Hernández",
  },
  {
    id: 4,
    tipo: "Calidad",
    descripcion: "Alto porcentaje de DPIs faltantes en T1",
    territorio: "T1",
    fechaCreacion: "2025-05-12",
    estado: "Atendida",
    prioridad: "Alta",
    responsable: "Enf. Ana López",
  },
]

export default function CalidadPage() {
  const [activeTab, setActiveTab] = useState("calidad")
  const [searchTerm, setSearchTerm] = useState("")
  const [severidadFilter, setSeveridadFilter] = useState("todas")
  const [estadoFilter, setEstadoFilter] = useState("todos")
  const [showNuevaAlerta, setShowNuevaAlerta] = useState(false)

  const handleNuevaAlerta = () => {
    console.log("Creando nueva alerta...")
    // Aquí iría la lógica para crear una nueva alerta
  }

  const handleActualizar = () => {
    console.log("Actualizando datos de calidad...")
    // Aquí iría la lógica para actualizar los datos
  }

  const handleCorregirProblema = (problema: any) => {
    console.log("Corrigiendo problema:", problema)
    // Aquí iría la lógica para corregir el problema
  }

  const handleAtenderAlerta = (alerta: any) => {
    console.log("Atendiendo alerta:", alerta)
    // Aquí iría la lógica para atender la alerta
  }

  const getSeveridadBadge = (severidad: string) => {
    switch (severidad) {
      case "Alta":
        return <Badge className="bg-red-100 text-red-800">Alta</Badge>
      case "Media":
        return <Badge className="bg-yellow-100 text-yellow-800">Media</Badge>
      case "Baja":
        return <Badge className="bg-green-100 text-green-800">Baja</Badge>
      default:
        return <Badge variant="secondary">{severidad}</Badge>
    }
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Activa":
        return <Badge className="bg-red-100 text-red-800">Activa</Badge>
      case "En Proceso":
        return <Badge className="bg-blue-100 text-blue-800">En Proceso</Badge>
      case "Atendida":
        return <Badge className="bg-green-100 text-green-800">Atendida</Badge>
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  const getEntidadIcon = (entidad: string) => {
    switch (entidad) {
      case "Personas":
        return <Users className="w-4 h-4 text-blue-600" />
      case "Viviendas":
        return <Home className="w-4 h-4 text-blue-600" />
      case "Eventos":
        return <Activity className="w-4 h-4 text-blue-600" />
      case "Familias":
        return <Users className="w-4 h-4 text-blue-600" />
      default:
        return <Database className="w-4 h-4 text-blue-600" />
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 flex items-center">
              <AlertTriangle className="w-8 h-8 mr-3 text-blue-600" />
              Calidad de Datos & Alertas
            </h1>
            <p className="text-blue-600">Monitoreo de calidad y sistema de alertas</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
              onClick={handleActualizar}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualizar
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleNuevaAlerta}>
              <AlertTriangle className="w-4 h-4 mr-2" />
              Nueva Alerta
            </Button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Calidad General</p>
                  <p className="text-2xl font-bold text-green-600">94.2%</p>
                  <p className="text-xs text-green-600">Datos completos</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Problemas Detectados</p>
                  <p className="text-2xl font-bold text-red-600">88</p>
                  <p className="text-xs text-red-600">Requieren atención</p>
                </div>
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Alertas Activas</p>
                  <p className="text-2xl font-bold text-orange-600">7</p>
                  <p className="text-xs text-orange-600">En seguimiento</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Tiempo Respuesta</p>
                  <p className="text-2xl font-bold text-blue-600">2.3h</p>
                  <p className="text-xs text-blue-600">Promedio</p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calidad">Calidad de Datos</TabsTrigger>
            <TabsTrigger value="alertas">Sistema de Alertas</TabsTrigger>
          </TabsList>

          <TabsContent value="calidad" className="space-y-6">
            {/* Filtros Calidad */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filtros de Calidad
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400" />
                    <Input
                      placeholder="Buscar por entidad o campo..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <Select value={severidadFilter} onValueChange={setSeveridadFilter}>
                    <SelectTrigger className="border-blue-200">
                      <SelectValue placeholder="Severidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas</SelectItem>
                      <SelectItem value="Alta">Alta</SelectItem>
                      <SelectItem value="Media">Media</SelectItem>
                      <SelectItem value="Baja">Baja</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
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
                  <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
                    Limpiar Filtros
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tabla Calidad */}
            <Card className="border-blue-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-blue-900">Problemas de Calidad Detectados</CardTitle>
                    <CardDescription>Campos con datos faltantes o inconsistentes</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 bg-transparent">
                    Exportar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-blue-200">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-50">
                        <TableHead className="text-blue-900 font-semibold">Entidad</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Campo</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Problema</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Registros Afectados</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Severidad</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Territorio</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Fecha Detección</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {calidadDatos.map((item) => (
                        <TableRow key={item.id} className="hover:bg-blue-50/50">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getEntidadIcon(item.entidad)}
                              <span className="font-medium">{item.entidad}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-sm">{item.campo}</TableCell>
                          <TableCell>{item.problema}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-semibold">{item.registrosAfectados}</div>
                              <div className="text-xs text-gray-600">{item.porcentaje}% del total</div>
                            </div>
                          </TableCell>
                          <TableCell>{getSeveridadBadge(item.severidad)}</TableCell>
                          <TableCell>{item.territorio}</TableCell>
                          <TableCell>{item.fechaDeteccion}</TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-blue-200 text-blue-700 bg-transparent"
                              onClick={() => handleCorregirProblema(item)}
                            >
                              Corregir
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alertas" className="space-y-6">
            {/* Filtros Alertas */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filtros de Alertas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400" />
                    <Input
                      placeholder="Buscar por descripción..."
                      className="pl-8 border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <Select value={estadoFilter} onValueChange={setEstadoFilter}>
                    <SelectTrigger className="border-blue-200">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="Activa">Activa</SelectItem>
                      <SelectItem value="En Proceso">En Proceso</SelectItem>
                      <SelectItem value="Atendida">Atendida</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="border-blue-200">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="Stock Crítico">Stock Crítico</SelectItem>
                      <SelectItem value="Vencimiento">Vencimiento</SelectItem>
                      <SelectItem value="Cobertura">Cobertura</SelectItem>
                      <SelectItem value="Calidad">Calidad</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
                    Limpiar Filtros
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tabla Alertas */}
            <Card className="border-blue-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-blue-900">Sistema de Alertas</CardTitle>
                    <CardDescription>Alertas sanitarias y logísticas del sistema</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 bg-transparent">
                    Exportar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-blue-200">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-50">
                        <TableHead className="text-blue-900 font-semibold">Tipo</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Descripción</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Territorio</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Fecha Creación</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Estado</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Prioridad</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Responsable</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {alertasData.map((alerta) => (
                        <TableRow key={alerta.id} className="hover:bg-blue-50/50">
                          <TableCell>
                            <Badge variant="outline">{alerta.tipo}</Badge>
                          </TableCell>
                          <TableCell className="max-w-64">
                            <div className="truncate" title={alerta.descripcion}>
                              {alerta.descripcion}
                            </div>
                          </TableCell>
                          <TableCell>{alerta.territorio}</TableCell>
                          <TableCell>{alerta.fechaCreacion}</TableCell>
                          <TableCell>{getEstadoBadge(alerta.estado)}</TableCell>
                          <TableCell>{getSeveridadBadge(alerta.prioridad)}</TableCell>
                          <TableCell className="text-sm">{alerta.responsable}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-blue-200 text-blue-700 bg-transparent"
                                onClick={() => handleAtenderAlerta(alerta)}
                              >
                                Ver
                              </Button>
                              {alerta.estado === "Activa" && (
                                <Button
                                  size="sm"
                                  className="bg-blue-600 hover:bg-blue-700"
                                  onClick={() => handleAtenderAlerta(alerta)}
                                >
                                  Atender
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
