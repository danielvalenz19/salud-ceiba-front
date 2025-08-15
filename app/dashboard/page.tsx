"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Users, MapPin, Activity, Package, AlertTriangle, TrendingUp, Download, FileText, Calendar } from "lucide-react"
import { Layout } from "@/components/layout"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const monthlyData = [
  { mes: "Ene", vacunacion: 245, nutricion: 189, reproductiva: 156, epidemiologia: 78 },
  { mes: "Feb", vacunacion: 267, nutricion: 203, reproductiva: 142, epidemiologia: 89 },
  { mes: "Mar", vacunacion: 289, nutricion: 198, reproductiva: 167, epidemiologia: 95 },
  { mes: "Abr", vacunacion: 312, nutricion: 234, reproductiva: 178, epidemiologia: 102 },
  { mes: "May", vacunacion: 298, nutricion: 221, reproductiva: 189, epidemiologia: 87 },
]

const sectorData = [
  { sector: "Sector 1A", eventos: 156, cobertura: 89 },
  { sector: "Sector 1B", eventos: 134, cobertura: 76 },
  { sector: "Sector 2A", eventos: 189, cobertura: 92 },
  { sector: "Sector 2B", eventos: 167, cobertura: 84 },
  { sector: "Sector 3A", eventos: 145, cobertura: 78 },
]

const demographicData = [
  { grupo: "0-5 años", value: 234, color: "#3B82F6" },
  { grupo: "6-17 años", value: 189, color: "#60A5FA" },
  { grupo: "18-59 años", value: 456, color: "#93C5FD" },
  { grupo: "60+ años", value: 123, color: "#DBEAFE" },
]

export default function DashboardPage() {
  const [territorio, setTerritorio] = useState("todos")
  const [sector, setSector] = useState("todos")
  const [periodo, setPeriodo] = useState("2025-01_2025-05")
  const [modulo, setModulo] = useState("todos")

  const handleSalaSituacional = () => {
    alert("Abriendo Sala Situacional - Vista ejecutiva con indicadores clave en tiempo real")
  }

  const handleExportarDatos = () => {
    const csvData = [
      ["Indicador", "Valor", "Fecha"],
      ["Cobertura Sectorización", "87.3%", new Date().toLocaleDateString()],
      ["Personas Trazadas", "2,847", new Date().toLocaleDateString()],
      ["Eventos Clínicos", "1,234", new Date().toLocaleDateString()],
      ["Alertas Activas", "7", new Date().toLocaleDateString()],
    ]

    const csvContent = csvData.map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `dashboard_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleStockCritico = () => {
    alert(
      "Mostrando insumos con stock crítico:\n\n• Paracetamol 500mg: 45 unidades\n• Vacuna Influenza: 12 dosis\n• Jeringas 3ml: 89 unidades",
    )
  }

  const handleVerAlertas = () => {
    alert(
      "Alertas activas del sistema:\n\n• 3 alertas de stock crítico\n• 4 alertas de calidad de datos\n• 2 alertas epidemiológicas",
    )
  }

  const aplicarFiltros = () => {
    alert(
      `Filtros aplicados:\n• Territorio: ${territorio}\n• Sector: ${sector}\n• Período: ${periodo}\n• Módulo: ${modulo}`,
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">Panel de Control</h1>
            <p className="text-blue-600">Resumen ejecutivo del sistema territorial</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
              onClick={handleSalaSituacional}
            >
              <FileText className="w-4 h-4 mr-2" />
              Sala Situacional
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleExportarDatos}>
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Filtros Globales */}
        <Card className="border-blue-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-blue-900">Filtros Globales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-blue-900 mb-2 block">Territorio</label>
                <Select value={territorio} onValueChange={setTerritorio}>
                  <SelectTrigger className="border-blue-200">
                    <SelectValue />
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
              </div>
              <div>
                <label className="text-sm font-medium text-blue-900 mb-2 block">Sector</label>
                <Select value={sector} onValueChange={setSector}>
                  <SelectTrigger className="border-blue-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los sectores</SelectItem>
                    <SelectItem value="1A">Sector 1A</SelectItem>
                    <SelectItem value="1B">Sector 1B</SelectItem>
                    <SelectItem value="2A">Sector 2A</SelectItem>
                    <SelectItem value="2B">Sector 2B</SelectItem>
                    <SelectItem value="3A">Sector 3A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-blue-900 mb-2 block">Período</label>
                <Select value={periodo} onValueChange={setPeriodo}>
                  <SelectTrigger className="border-blue-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025-01_2025-05">Ene 2025 - May 2025</SelectItem>
                    <SelectItem value="2025-01_2025-03">Ene 2025 - Mar 2025</SelectItem>
                    <SelectItem value="2025-04_2025-05">Abr 2025 - May 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-blue-900 mb-2 block">Módulo</label>
                <Select value={modulo} onValueChange={setModulo}>
                  <SelectTrigger className="border-blue-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los módulos</SelectItem>
                    <SelectItem value="vacunacion">Vacunación</SelectItem>
                    <SelectItem value="nutricion">Nutrición</SelectItem>
                    <SelectItem value="reproductiva">Salud Reproductiva</SelectItem>
                    <SelectItem value="epidemiologia">Epidemiología</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={aplicarFiltros} className="bg-blue-600 hover:bg-blue-700">
                Aplicar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Cobertura Sectorización</p>
                  <p className="text-2xl font-bold text-blue-900">87.3%</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +2.1% vs mes anterior
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Personas Trazadas</p>
                  <p className="text-2xl font-bold text-blue-900">2,847</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +156 este mes
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Eventos Clínicos</p>
                  <p className="text-2xl font-bold text-blue-900">1,234</p>
                  <p className="text-xs text-blue-600 flex items-center mt-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    Este mes
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Alertas Activas</p>
                  <p className="text-2xl font-bold text-red-600">7</p>
                  <div className="flex gap-1 mt-1">
                    <Badge variant="destructive" className="text-xs">
                      3 Stock
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      4 Calidad
                    </Badge>
                  </div>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Eventos por Módulo (Mensual)</CardTitle>
              <CardDescription>Tendencia de eventos clínicos por módulo</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="mes" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip />
                  <Line type="monotone" dataKey="vacunacion" stroke="#3B82F6" strokeWidth={2} name="Vacunación" />
                  <Line type="monotone" dataKey="nutricion" stroke="#10B981" strokeWidth={2} name="Nutrición" />
                  <Line type="monotone" dataKey="reproductiva" stroke="#F59E0B" strokeWidth={2} name="Reproductiva" />
                  <Line type="monotone" dataKey="epidemiologia" stroke="#EF4444" strokeWidth={2} name="Epidemiología" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Top Sectores por Eventos</CardTitle>
              <CardDescription>Sectores con mayor actividad clínica</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sectorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="sector" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip />
                  <Bar dataKey="eventos" fill="#3B82F6" name="Eventos" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Distribución por Edad</CardTitle>
              <CardDescription>Personas trazadas por grupo etario</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={demographicData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ grupo, value }) => `${grupo}: ${value}`}
                  >
                    {demographicData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-blue-200 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-blue-900">Acciones Rápidas</CardTitle>
              <CardDescription>Herramientas de uso frecuente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-20 flex-col border-blue-200 hover:bg-blue-50 bg-transparent"
                  onClick={handleSalaSituacional}
                >
                  <FileText className="w-6 h-6 mb-2 text-blue-600" />
                  <span className="text-blue-900">Sala Situacional</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col border-blue-200 hover:bg-blue-50 bg-transparent"
                  onClick={handleExportarDatos}
                >
                  <Download className="w-6 h-6 mb-2 text-blue-600" />
                  <span className="text-blue-900">Exportar Excel</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col border-blue-200 hover:bg-blue-50 bg-transparent"
                  onClick={handleStockCritico}
                >
                  <Package className="w-6 h-6 mb-2 text-blue-600" />
                  <span className="text-blue-900">Stock Crítico</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col border-blue-200 hover:bg-blue-50 bg-transparent"
                  onClick={handleVerAlertas}
                >
                  <AlertTriangle className="w-6 h-6 mb-2 text-blue-600" />
                  <span className="text-blue-900">Ver Alertas</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
