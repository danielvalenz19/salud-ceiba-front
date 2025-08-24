"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Layout } from "@/components/layout"
import { NuevaViviendaModal } from "@/components/modals/nueva-vivienda-modal"
import { DetalleViviendaModal } from "@/components/modals/detalle-vivienda-modal"
import { Search, Plus, Eye, Edit, MapPin, Home, Users, Calendar, Filter, Map, X } from "lucide-react"

const viviendasData = [
  {
    id: 1,
    codigo: "VIV-001-2025",
    direccion: "Barrio El Centro, Casa #45",
    territorio: "T1",
    sector: "1A",
    familias: 1,
    personas: 4,
    estado: "Visitada",
    ultimaVisita: "2025-05-15",
    responsable: "Enf. Ana López",
    coordenadas: "14.6349, -90.5069",
  },
  {
    id: 2,
    codigo: "VIV-002-2025",
    direccion: "Colonia San José, 3ra Calle 12-34",
    territorio: "T2",
    sector: "2A",
    familias: 2,
    personas: 7,
    estado: "Pendiente",
    ultimaVisita: "2025-04-28",
    responsable: "Aux. Carlos Méndez",
    coordenadas: "14.6298, -90.5145",
  },
  {
    id: 3,
    codigo: "VIV-003-2025",
    direccion: "Zona 4, Avenida Las Flores 8-90",
    territorio: "T1",
    sector: "1B",
    familias: 1,
    personas: 3,
    estado: "Visitada",
    ultimaVisita: "2025-05-10",
    responsable: "Enf. María García",
    coordenadas: "14.6412, -90.5023",
  },
  {
    id: 4,
    codigo: "VIV-004-2025",
    direccion: "Barrio La Esperanza, Casa #78",
    territorio: "T3",
    sector: "3A",
    familias: 1,
    personas: 5,
    estado: "No Contactada",
    ultimaVisita: "N/A",
    responsable: "Aux. Pedro Morales",
    coordenadas: "14.6187, -90.5234",
  },
  {
    id: 5,
    codigo: "VIV-005-2025",
    direccion: "Colonia Nueva, 5ta Avenida 15-67",
    territorio: "T2",
    sector: "2B",
    familias: 1,
    personas: 2,
    estado: "Visitada",
    ultimaVisita: "2025-05-14",
    responsable: "Enf. Sofía Hernández",
    coordenadas: "14.6356, -90.5178",
  },
]

export default function ViviendasPage() {
  const [viviendas, setViviendas] = useState(viviendasData)
  const [filteredViviendas, setFilteredViviendas] = useState(viviendasData)
  const [searchTerm, setSearchTerm] = useState("")
  const [territorioFilter, setTerritorioFilter] = useState("todos")
  const [sectorFilter, setSectorFilter] = useState("todos")
  const [estadoFilter, setEstadoFilter] = useState("todos")
  const [showMap, setShowMap] = useState(false)
  const [showNuevaViviendaModal, setShowNuevaViviendaModal] = useState(false)
  const [showDetalleModal, setShowDetalleModal] = useState(false)
  const [selectedVivienda, setSelectedVivienda] = useState<any>(null)

  const applyFilters = () => {
    let filtered = viviendas

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (vivienda) =>
          vivienda.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vivienda.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vivienda.responsable.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (territorioFilter !== "todos") {
      filtered = filtered.filter((vivienda) => vivienda.territorio === territorioFilter)
    }

    if (sectorFilter !== "todos") {
      filtered = filtered.filter((vivienda) => vivienda.sector === sectorFilter)
    }

    if (estadoFilter !== "todos") {
      filtered = filtered.filter((vivienda) => vivienda.estado === estadoFilter)
    }

    setFilteredViviendas(filtered)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setTerritorioFilter("todos")
    setSectorFilter("todos")
    setEstadoFilter("todos")
    setFilteredViviendas(viviendas)
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Visitada":
        return <Badge className="bg-green-100 text-green-800">Visitada</Badge>
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
      case "No Contactada":
        return <Badge className="bg-red-100 text-red-800">No Contactada</Badge>
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  const handleVerDetalle = (vivienda: any) => {
    setSelectedVivienda(vivienda)
    setShowDetalleModal(true)
  }

  const handleEditarVivienda = (vivienda: any) => {
    alert(`Editando vivienda:\n\nCódigo: ${vivienda.codigo}\nDirección: ${vivienda.direccion}`)
  }

  const handleSaveVivienda = (viviendaData: any) => {
    setViviendas((prev) => [...prev, viviendaData])
    setFilteredViviendas((prev) => [...prev, viviendaData])
  }

  // Aplicar filtros cuando cambian dependencias
  useEffect(() => {
    applyFilters()
  }, [searchTerm, territorioFilter, sectorFilter, estadoFilter, viviendas])

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">Viviendas & Sectorización</h1>
            <p className="text-blue-600">Gestión territorial y mapeo de viviendas</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
              onClick={() => setShowMap(!showMap)}
            >
              <Map className="w-4 h-4 mr-2" />
              {showMap ? "Ver Lista" : "Ver Mapa"}
            </Button>
            <Button
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
              onClick={() => window.location.href = '/viviendas/sectorizacion'}
            >
              Sectorización
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowNuevaViviendaModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Vivienda
            </Button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Viviendas</p>
                  <p className="text-2xl font-bold text-blue-900">1,245</p>
                </div>
                <Home className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Visitadas</p>
                  <p className="text-2xl font-bold text-green-600">892</p>
                </div>
                <Badge className="bg-green-100 text-green-800">71.6%</Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Pendientes</p>
                  <p className="text-2xl font-bold text-yellow-600">234</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">18.8%</Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">No Contactadas</p>
                  <p className="text-2xl font-bold text-red-600">119</p>
                </div>
                <Badge className="bg-red-100 text-red-800">9.6%</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mapa o Lista */}
        {showMap ? (
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900 flex items-center">
                <Map className="w-5 h-5 mr-2" />
                Mapa de Viviendas por Sector
              </CardTitle>
              <CardDescription>Visualización geográfica de viviendas y su estado de visita</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-blue-50 rounded-lg border-2 border-dashed border-blue-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Mapa Interactivo</h3>
                  <p className="text-blue-600 mb-4">Aquí se mostraría el mapa con las viviendas marcadas por sector</p>
                  <div className="flex justify-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Visitadas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span>Pendientes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>No Contactadas</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
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
                      placeholder="Buscar por código, dirección o responsable..."
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
                    value={sectorFilter}
                    onValueChange={(value) => {
                      setSectorFilter(value)
                      applyFilters()
                    }}
                  >
                    <SelectTrigger className="border-blue-200">
                      <SelectValue placeholder="Sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="1A">Sector 1A</SelectItem>
                      <SelectItem value="1B">Sector 1B</SelectItem>
                      <SelectItem value="2A">Sector 2A</SelectItem>
                      <SelectItem value="2B">Sector 2B</SelectItem>
                      <SelectItem value="3A">Sector 3A</SelectItem>
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
                      <SelectItem value="Visitada">Visitada</SelectItem>
                      <SelectItem value="Pendiente">Pendiente</SelectItem>
                      <SelectItem value="No Contactada">No Contactada</SelectItem>
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

            {/* Tabla de Viviendas */}
            <Card className="border-blue-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-blue-900">Registro de Viviendas</CardTitle>
                    <CardDescription>
                      Mostrando {filteredViviendas.length} de {viviendasData.length} viviendas
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 bg-transparent">
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
                        <TableHead className="text-blue-900 font-semibold">Código</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Dirección</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Ubicación</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Familias/Personas</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Estado</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Última Visita</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Responsable</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredViviendas.map((vivienda) => (
                        <TableRow key={vivienda.id} className="hover:bg-blue-50/50">
                          <TableCell className="font-mono text-sm">{vivienda.codigo}</TableCell>
                          <TableCell className="max-w-48">
                            <div className="truncate" title={vivienda.direccion}>
                              {vivienda.direccion}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-blue-600" />
                              <span className="text-sm">
                                {vivienda.territorio}-{vivienda.sector}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                <Home className="w-3 h-3 text-blue-600" />
                                <span className="text-sm">{vivienda.familias}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3 text-blue-600" />
                                <span className="text-sm">{vivienda.personas}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{getEstadoBadge(vivienda.estado)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-blue-600" />
                              <span className="text-sm">{vivienda.ultimaVisita}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">{vivienda.responsable}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50"
                                onClick={() => handleVerDetalle(vivienda)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50"
                                onClick={() => handleEditarVivienda(vivienda)}
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
                    Mostrando 1-{filteredViviendas.length} de {filteredViviendas.length} resultados
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
          </>
        )}

        {/* Modales */}
        <NuevaViviendaModal
          open={showNuevaViviendaModal}
          onOpenChange={setShowNuevaViviendaModal}
          onSave={handleSaveVivienda}
        />
        <DetalleViviendaModal open={showDetalleModal} onOpenChange={setShowDetalleModal} vivienda={selectedVivienda} />
      </div>
    </Layout>
  )
}
