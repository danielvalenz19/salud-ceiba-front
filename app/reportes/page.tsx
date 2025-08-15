"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Layout } from "@/components/layout"
import { GenerarReportePersonalizadoModal } from "@/components/modals/generar-reporte-personalizado-modal"
import { ProgramarReporteModal } from "@/components/modals/programar-reporte-modal"
import {
  FileText,
  Download,
  Calendar,
  BarChart3,
  TrendingUp,
  Users,
  MapPin,
  Activity,
  Package,
  Eye,
  Printer,
} from "lucide-react"

const reportesDisponibles = [
  {
    id: 1,
    nombre: "Sala Situacional",
    descripcion: "Reporte ejecutivo con KPIs y gráficas principales",
    categoria: "Ejecutivo",
    formato: "PDF",
    frecuencia: "Mensual",
    ultimaGeneracion: "2025-05-15",
    estado: "Disponible",
    icono: BarChart3,
  },
  {
    id: 2,
    nombre: "Producción Mensual",
    descripcion: "Eventos clínicos y métricas de producción por módulo",
    categoria: "Operativo",
    formato: "Excel",
    frecuencia: "Mensual",
    ultimaGeneracion: "2025-05-01",
    estado: "Disponible",
    icono: TrendingUp,
  },
  {
    id: 3,
    nombre: "Cobertura Poblacional",
    descripcion: "Análisis de cobertura por territorio y grupo etario",
    categoria: "Epidemiológico",
    formato: "PDF",
    frecuencia: "Trimestral",
    ultimaGeneracion: "2025-04-30",
    estado: "Disponible",
    icono: Users,
  },
  {
    id: 4,
    nombre: "Inventario Consolidado",
    descripcion: "Estado de stock y movimientos de insumos",
    categoria: "Logístico",
    formato: "Excel",
    frecuencia: "Semanal",
    ultimaGeneracion: "2025-05-14",
    estado: "Disponible",
    icono: Package,
  },
  {
    id: 5,
    nombre: "Mapeo Territorial",
    descripcion: "Distribución geográfica de eventos y cobertura",
    categoria: "Territorial",
    formato: "PDF",
    frecuencia: "Mensual",
    ultimaGeneracion: "2025-05-10",
    estado: "Generando",
    icono: MapPin,
  },
  {
    id: 6,
    nombre: "Calidad de Datos",
    descripcion: "Análisis de completitud y consistencia de datos",
    categoria: "Calidad",
    formato: "Excel",
    frecuencia: "Semanal",
    ultimaGeneracion: "2025-05-13",
    estado: "Disponible",
    icono: Activity,
  },
]

export default function ReportesPage() {
  const [categoriaFilter, setCategoriaFilter] = useState("todas")
  const [formatoFilter, setFormatoFilter] = useState("todos")
  const [showPreview, setShowPreview] = useState(false)
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const [showGenerarPersonalizado, setShowGenerarPersonalizado] = useState(false)
  const [showProgramarReporte, setShowProgramarReporte] = useState(false)

  const filteredReportes = reportesDisponibles.filter((reporte) => {
    const matchesCategoria = categoriaFilter === "todas" || reporte.categoria === categoriaFilter
    const matchesFormato = formatoFilter === "todos" || reporte.formato === formatoFilter
    return matchesCategoria && matchesFormato
  })

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Disponible":
        return <Badge className="bg-green-100 text-green-800">Disponible</Badge>
      case "Generando":
        return <Badge className="bg-blue-100 text-blue-800">Generando</Badge>
      case "Error":
        return <Badge className="bg-red-100 text-red-800">Error</Badge>
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  const handlePreview = (reporte: any) => {
    setSelectedReport(reporte)
    setShowPreview(true)
  }

  const handleDownload = (reporte: any) => {
    // Simulación de descarga
    alert(`Descargando ${reporte.nombre} en formato ${reporte.formato}`)
  }

  const handleGenerarPersonalizado = (reporteData: any) => {
    console.log("Generando reporte personalizado:", reporteData)
    // Aquí iría la lógica para generar el reporte
  }

  const handleProgramarReporte = (programacionData: any) => {
    console.log("Programando reporte:", programacionData)
    // Aquí iría la lógica para programar el reporte
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 flex items-center">
              <FileText className="w-8 h-8 mr-3 text-blue-600" />
              Reportes & Exportaciones
            </h1>
            <p className="text-blue-600">Generación y descarga de reportes del sistema</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
              onClick={() => setShowProgramarReporte(true)}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Programar
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowGenerarPersonalizado(true)}>
              <Download className="w-4 h-4 mr-2" />
              Generar Personalizado
            </Button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Reportes Disponibles</p>
                  <p className="text-2xl font-bold text-blue-900">12</p>
                  <p className="text-xs text-blue-600">Diferentes tipos</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Generados Este Mes</p>
                  <p className="text-2xl font-bold text-green-600">47</p>
                  <p className="text-xs text-green-600">+12 vs mes anterior</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Programados</p>
                  <p className="text-2xl font-bold text-blue-600">8</p>
                  <p className="text-xs text-blue-600">Automáticos</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Tamaño Total</p>
                  <p className="text-2xl font-bold text-purple-600">2.3 GB</p>
                  <p className="text-xs text-purple-600">Archivos generados</p>
                </div>
                <Download className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg text-blue-900">Filtros de Reportes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
                <SelectTrigger className="border-blue-200">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las categorías</SelectItem>
                  <SelectItem value="Ejecutivo">Ejecutivo</SelectItem>
                  <SelectItem value="Operativo">Operativo</SelectItem>
                  <SelectItem value="Epidemiológico">Epidemiológico</SelectItem>
                  <SelectItem value="Logístico">Logístico</SelectItem>
                  <SelectItem value="Territorial">Territorial</SelectItem>
                  <SelectItem value="Calidad">Calidad</SelectItem>
                </SelectContent>
              </Select>
              <Select value={formatoFilter} onValueChange={setFormatoFilter}>
                <SelectTrigger className="border-blue-200">
                  <SelectValue placeholder="Formato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los formatos</SelectItem>
                  <SelectItem value="PDF">PDF</SelectItem>
                  <SelectItem value="Excel">Excel</SelectItem>
                  <SelectItem value="CSV">CSV</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
                Limpiar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Vista Previa o Lista de Reportes */}
        {showPreview && selectedReport ? (
          <Card className="border-blue-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-blue-900 flex items-center">
                    <selectedReport.icono className="w-5 h-5 mr-2" />
                    Vista Previa: {selectedReport.nombre}
                  </CardTitle>
                  <CardDescription>Formato {selectedReport.formato} - Lista para imprimir</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowPreview(false)}>
                    Volver
                  </Button>
                  <Button variant="outline" className="border-blue-200 text-blue-700 bg-transparent">
                    <Printer className="w-4 h-4 mr-2" />
                    Imprimir
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => handleDownload(selectedReport)}>
                    <Download className="w-4 h-4 mr-2" />
                    Descargar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-white border-2 border-gray-300 rounded-lg p-8 min-h-[600px] shadow-lg">
                {/* Simulación de vista previa A4 */}
                <div className="space-y-6">
                  <div className="text-center border-b pb-4">
                    <h1 className="text-2xl font-bold text-blue-900">
                      MINISTERIO DE SALUD PÚBLICA Y ASISTENCIA SOCIAL
                    </h1>
                    <h2 className="text-lg text-blue-700">Distrito de Salud La Ceiba</h2>
                    <h3 className="text-xl font-semibold mt-4">{selectedReport.nombre}</h3>
                    <p className="text-sm text-gray-600">Período: Enero - Mayo 2025</p>
                    <p className="text-sm text-gray-600">
                      Fecha de generación: {new Date().toLocaleDateString("es-GT")}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-blue-900">Indicadores Principales</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Cobertura Sectorización:</span>
                          <span className="font-semibold">87.3%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Personas Trazadas:</span>
                          <span className="font-semibold">2,847</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Eventos Clínicos:</span>
                          <span className="font-semibold">1,234</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Alertas Activas:</span>
                          <span className="font-semibold text-red-600">7</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-blue-900">Distribución por Territorio</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Territorio 1:</span>
                          <span className="font-semibold">892 eventos</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Territorio 2:</span>
                          <span className="font-semibold">756 eventos</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Territorio 3:</span>
                          <span className="font-semibold">634 eventos</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-blue-900">Gráfica de Tendencias</h4>
                    <div className="h-48 bg-blue-50 rounded-lg border-2 border-dashed border-blue-200 flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="w-16 h-16 text-blue-400 mx-auto mb-2" />
                        <p className="text-blue-600">Gráfica de eventos mensuales por módulo</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-xs text-gray-500 border-t pt-4">
                    <p>Sistema Salud La Ceiba - Generado automáticamente el {new Date().toLocaleString("es-GT")}</p>
                    <p>Página 1 de 3</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReportes.map((reporte) => (
              <Card key={reporte.id} className="border-blue-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <reporte.icono className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-blue-900">{reporte.nombre}</CardTitle>
                        <Badge variant="outline" className="mt-1">
                          {reporte.categoria}
                        </Badge>
                      </div>
                    </div>
                    {getEstadoBadge(reporte.estado)}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{reporte.descripcion}</CardDescription>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Formato:</span>
                      <span className="font-medium">{reporte.formato}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frecuencia:</span>
                      <span className="font-medium">{reporte.frecuencia}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Última generación:</span>
                      <span className="font-medium">{reporte.ultimaGeneracion}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                      onClick={() => handlePreview(reporte)}
                      disabled={reporte.estado === "Generando"}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Vista Previa
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleDownload(reporte)}
                      disabled={reporte.estado === "Generando"}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Descargar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Modales */}
        <GenerarReportePersonalizadoModal
          open={showGenerarPersonalizado}
          onOpenChange={setShowGenerarPersonalizado}
          onGenerate={handleGenerarPersonalizado}
        />

        <ProgramarReporteModal
          open={showProgramarReporte}
          onOpenChange={setShowProgramarReporte}
          onSave={handleProgramarReporte}
        />
      </div>
    </Layout>
  )
}
