"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, Filter, Download, BarChart3 } from "lucide-react"

interface GenerarReportePersonalizadoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onGenerate: (reporteData: any) => void
}

export function GenerarReportePersonalizadoModal({
  open,
  onOpenChange,
  onGenerate,
}: GenerarReportePersonalizadoModalProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    modulos: [] as string[],
    campos: [] as string[],
    filtros: {
      fechaInicio: "",
      fechaFin: "",
      territorio: "",
      sector: "",
      responsable: "",
    },
    formato: "pdf",
    incluirGraficas: true,
    incluirTablas: true,
    incluirResumen: true,
    agrupacion: "",
    ordenamiento: "",
  })

  const modulosDisponibles = [
    { id: "personas", nombre: "Personas", descripcion: "Datos demográficos y registro poblacional" },
    { id: "viviendas", nombre: "Viviendas", descripcion: "Información de viviendas y sectorización" },
    { id: "vacunacion", nombre: "Vacunación", descripcion: "Eventos de vacunación y esquemas" },
    { id: "nutricion", nombre: "Nutrición", descripcion: "Evaluaciones nutricionales" },
    { id: "reproductiva", nombre: "Salud Reproductiva", descripcion: "Consultas de salud reproductiva" },
    { id: "epidemiologia", nombre: "Epidemiología", descripcion: "Casos epidemiológicos y vigilancia" },
    { id: "inventario", nombre: "Inventario", descripción: "Stock y movimientos de insumos" },
  ]

  const camposPorModulo: { [key: string]: string[] } = {
    personas: ["DPI", "Nombre", "Edad", "Sexo", "Territorio", "Sector", "Fecha Registro"],
    viviendas: ["Código", "Dirección", "Territorio", "Sector", "Tipo", "Familias", "Fecha Registro"],
    vacunacion: ["Fecha", "Vacuna", "Dosis", "Paciente", "Responsable", "Territorio"],
    nutricion: ["Fecha", "Paciente", "Peso", "Talla", "IMC", "Estado Nutricional", "Responsable"],
    reproductiva: ["Fecha", "Paciente", "Tipo Consulta", "Diagnóstico", "Responsable", "Territorio"],
    epidemiologia: ["Fecha", "Paciente", "Evento", "Clasificación", "Estado", "Responsable"],
    inventario: ["Código", "Nombre", "Stock", "Categoría", "Ubicación", "Vencimiento"],
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGenerate(formData)
    onOpenChange(false)
  }

  const handleModuloToggle = (moduloId: string) => {
    setFormData((prev) => {
      const newModulos = prev.modulos.includes(moduloId)
        ? prev.modulos.filter((m) => m !== moduloId)
        : [...prev.modulos, moduloId]

      // Actualizar campos disponibles basado en módulos seleccionados
      const camposDisponibles = newModulos.flatMap((modulo) => camposPorModulo[modulo] || [])
      const camposFiltrados = prev.campos.filter((campo) => camposDisponibles.includes(campo))

      return {
        ...prev,
        modulos: newModulos,
        campos: camposFiltrados,
      }
    })
  }

  const handleCampoToggle = (campo: string) => {
    setFormData((prev) => ({
      ...prev,
      campos: prev.campos.includes(campo) ? prev.campos.filter((c) => c !== campo) : [...prev.campos, campo],
    }))
  }

  const camposDisponibles = formData.modulos.flatMap((modulo) => camposPorModulo[modulo] || [])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-900">
            <FileText className="w-5 h-5" />
            Generar Reporte Personalizado
          </DialogTitle>
          <DialogDescription>Configure los parámetros para generar un reporte personalizado</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Básica */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Información del Reporte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre del Reporte *</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
                    placeholder="Ej: Reporte de Cobertura Mensual"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="formato">Formato de Salida</Label>
                  <Select
                    value={formData.formato}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, formato: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => setFormData((prev) => ({ ...prev, descripcion: e.target.value }))}
                  placeholder="Descripción del reporte y su propósito..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Selección de Módulos */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Módulos de Datos</CardTitle>
              <CardDescription>Seleccione los módulos de los cuales desea incluir información</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {modulosDisponibles.map((modulo) => (
                  <div
                    key={modulo.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.modulos.includes(modulo.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => handleModuloToggle(modulo.id)}
                  >
                    <div className="space-y-1">
                      <span className="text-sm font-medium">{modulo.nombre}</span>
                      <p className="text-xs text-gray-600">{modulo.descripcion}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <p className="text-sm text-blue-600">
                  Módulos seleccionados: {formData.modulos.length} de {modulosDisponibles.length}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Selección de Campos */}
          {camposDisponibles.length > 0 && (
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900">Campos a Incluir</CardTitle>
                <CardDescription>Seleccione los campos específicos que desea incluir en el reporte</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {camposDisponibles.map((campo) => (
                    <div key={campo} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`campo-${campo}`}
                        checked={formData.campos.includes(campo)}
                        onChange={() => handleCampoToggle(campo)}
                        className="rounded border-blue-300"
                      />
                      <Label htmlFor={`campo-${campo}`} className="text-sm">
                        {campo}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <p className="text-sm text-blue-600">
                    Campos seleccionados: {formData.campos.length} de {camposDisponibles.length}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Filtros */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtros de Datos
              </CardTitle>
              <CardDescription>Configure los filtros para limitar los datos del reporte</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fechaInicio">Fecha de Inicio</Label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400" />
                    <Input
                      id="fechaInicio"
                      type="date"
                      value={formData.filtros.fechaInicio}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          filtros: { ...prev.filtros, fechaInicio: e.target.value },
                        }))
                      }
                      className="pl-8"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechaFin">Fecha de Fin</Label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400" />
                    <Input
                      id="fechaFin"
                      type="date"
                      value={formData.filtros.fechaFin}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          filtros: { ...prev.filtros, fechaFin: e.target.value },
                        }))
                      }
                      className="pl-8"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="territorio">Territorio</Label>
                  <Select
                    value={formData.filtros.territorio}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        filtros: { ...prev.filtros, territorio: value },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todos los territorios" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="T1">Territorio 1</SelectItem>
                      <SelectItem value="T2">Territorio 2</SelectItem>
                      <SelectItem value="T3">Territorio 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsable">Responsable</Label>
                  <Select
                    value={formData.filtros.responsable}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        filtros: { ...prev.filtros, responsable: value },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todos los responsables" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="Dr. María González">Dr. María González</SelectItem>
                      <SelectItem value="Enf. Ana López">Enf. Ana López</SelectItem>
                      <SelectItem value="Aux. Carlos Méndez">Aux. Carlos Méndez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuración de Presentación */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Configuración de Presentación
              </CardTitle>
              <CardDescription>Configure cómo se presentará la información en el reporte</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="agrupacion">Agrupar por</Label>
                  <Select
                    value={formData.agrupacion}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, agrupacion: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sin agrupación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Sin agrupación</SelectItem>
                      <SelectItem value="territorio">Territorio</SelectItem>
                      <SelectItem value="fecha">Fecha</SelectItem>
                      <SelectItem value="responsable">Responsable</SelectItem>
                      <SelectItem value="modulo">Módulo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ordenamiento">Ordenar por</Label>
                  <Select
                    value={formData.ordenamiento}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, ordenamiento: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Fecha (más reciente)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fecha-desc">Fecha (más reciente)</SelectItem>
                      <SelectItem value="fecha-asc">Fecha (más antigua)</SelectItem>
                      <SelectItem value="nombre">Nombre</SelectItem>
                      <SelectItem value="territorio">Territorio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Elementos a Incluir</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="incluirResumen"
                      checked={formData.incluirResumen}
                      onChange={(e) => setFormData((prev) => ({ ...prev, incluirResumen: e.target.checked }))}
                      className="rounded border-blue-300"
                    />
                    <Label htmlFor="incluirResumen">Incluir resumen ejecutivo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="incluirGraficas"
                      checked={formData.incluirGraficas}
                      onChange={(e) => setFormData((prev) => ({ ...prev, incluirGraficas: e.target.checked }))}
                      className="rounded border-blue-300"
                    />
                    <Label htmlFor="incluirGraficas">Incluir gráficas y visualizaciones</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="incluirTablas"
                      checked={formData.incluirTablas}
                      onChange={(e) => setFormData((prev) => ({ ...prev, incluirTablas: e.target.checked }))}
                      className="rounded border-blue-300"
                    />
                    <Label htmlFor="incluirTablas">Incluir tablas detalladas</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resumen */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-lg text-green-800">Resumen del Reporte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-green-800">Módulos:</p>
                  <p className="text-sm">{formData.modulos.length} módulos seleccionados</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">Campos:</p>
                  <p className="text-sm">{formData.campos.length} campos incluidos</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">Formato:</p>
                  <Badge className="bg-green-100 text-green-800 mt-1">{formData.formato.toUpperCase()}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Generar Reporte
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
