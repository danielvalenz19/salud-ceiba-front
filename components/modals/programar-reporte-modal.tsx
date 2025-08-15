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
import { Calendar, Clock, Mail, FileText, Repeat, Users } from "lucide-react"

interface ProgramarReporteModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (programacionData: any) => void
}

export function ProgramarReporteModal({ open, onOpenChange, onSave }: ProgramarReporteModalProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    tipoReporte: "",
    frecuencia: "",
    diaEjecucion: "",
    horaEjecucion: "08:00",
    destinatarios: [] as string[],
    formato: "pdf",
    activo: true,
    incluirDatos: {
      resumenEjecutivo: true,
      graficas: true,
      tablas: true,
      anexos: false,
    },
    filtros: {
      territorio: "",
      fechaRelativa: "mes-actual",
    },
  })

  const [nuevoDestinatario, setNuevoDestinatario] = useState("")

  const tiposReporte = [
    { value: "sala-situacional", label: "Sala Situacional" },
    { value: "produccion-mensual", label: "Producción Mensual" },
    { value: "cobertura-poblacional", label: "Cobertura Poblacional" },
    { value: "inventario-consolidado", label: "Inventario Consolidado" },
    { value: "calidad-datos", label: "Calidad de Datos" },
    { value: "personalizado", label: "Reporte Personalizado" },
  ]

  const frecuencias = [
    { value: "diario", label: "Diario" },
    { value: "semanal", label: "Semanal" },
    { value: "mensual", label: "Mensual" },
    { value: "trimestral", label: "Trimestral" },
    { value: "semestral", label: "Semestral" },
    { value: "anual", label: "Anual" },
  ]

  const diasSemana = [
    { value: "lunes", label: "Lunes" },
    { value: "martes", label: "Martes" },
    { value: "miercoles", label: "Miércoles" },
    { value: "jueves", label: "Jueves" },
    { value: "viernes", label: "Viernes" },
    { value: "sabado", label: "Sábado" },
    { value: "domingo", label: "Domingo" },
  ]

  const diasMes = Array.from({ length: 31 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `Día ${i + 1}`,
  }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onOpenChange(false)
  }

  const agregarDestinatario = () => {
    if (nuevoDestinatario.trim() && !formData.destinatarios.includes(nuevoDestinatario)) {
      setFormData((prev) => ({
        ...prev,
        destinatarios: [...prev.destinatarios, nuevoDestinatario],
      }))
      setNuevoDestinatario("")
    }
  }

  const eliminarDestinatario = (email: string) => {
    setFormData((prev) => ({
      ...prev,
      destinatarios: prev.destinatarios.filter((d) => d !== email),
    }))
  }

  const getDiaEjecucionOptions = () => {
    switch (formData.frecuencia) {
      case "semanal":
        return diasSemana
      case "mensual":
      case "trimestral":
      case "semestral":
      case "anual":
        return diasMes
      default:
        return []
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-900">
            <Calendar className="w-5 h-5" />
            Programar Reporte Automático
          </DialogTitle>
          <DialogDescription>Configure la generación automática de reportes del sistema</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Básica */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Información de la Programación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre de la Programación *</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
                    placeholder="Ej: Reporte Mensual Automático"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipoReporte">Tipo de Reporte *</Label>
                  <Select
                    value={formData.tipoReporte}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, tipoReporte: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposReporte.map((tipo) => (
                        <SelectItem key={tipo.value} value={tipo.value}>
                          {tipo.label}
                        </SelectItem>
                      ))}
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
                  placeholder="Descripción de la programación y su propósito..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Configuración de Frecuencia */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                <Repeat className="w-5 h-5" />
                Configuración de Frecuencia
              </CardTitle>
              <CardDescription>Configure cuándo y con qué frecuencia se generará el reporte</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="frecuencia">Frecuencia *</Label>
                  <Select
                    value={formData.frecuencia}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, frecuencia: value, diaEjecucion: "" }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione frecuencia" />
                    </SelectTrigger>
                    <SelectContent>
                      {frecuencias.map((freq) => (
                        <SelectItem key={freq.value} value={freq.value}>
                          {freq.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.frecuencia && formData.frecuencia !== "diario" && (
                  <div className="space-y-2">
                    <Label htmlFor="diaEjecucion">
                      {formData.frecuencia === "semanal" ? "Día de la Semana" : "Día del Mes"}
                    </Label>
                    <Select
                      value={formData.diaEjecucion}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, diaEjecucion: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione día" />
                      </SelectTrigger>
                      <SelectContent>
                        {getDiaEjecucionOptions().map((dia) => (
                          <SelectItem key={dia.value} value={dia.value}>
                            {dia.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="horaEjecucion">Hora de Ejecución</Label>
                  <div className="relative">
                    <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400" />
                    <Input
                      id="horaEjecucion"
                      type="time"
                      value={formData.horaEjecucion}
                      onChange={(e) => setFormData((prev) => ({ ...prev, horaEjecucion: e.target.value }))}
                      className="pl-8"
                    />
                  </div>
                </div>
              </div>

              {/* Vista previa de la programación */}
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Vista Previa de la Programación:</h4>
                <p className="text-sm text-blue-700">
                  {formData.frecuencia && formData.tipoReporte ? (
                    <>
                      El reporte "{tiposReporte.find((t) => t.value === formData.tipoReporte)?.label}" se generará{" "}
                      <strong>{formData.frecuencia}</strong>
                      {formData.diaEjecucion && formData.frecuencia === "semanal" && (
                        <> los {diasSemana.find((d) => d.value === formData.diaEjecucion)?.label.toLowerCase()}</>
                      )}
                      {formData.diaEjecucion &&
                        formData.frecuencia !== "semanal" &&
                        formData.frecuencia !== "diario" && (
                          <>
                            {" "}
                            el día {formData.diaEjecucion} de cada {formData.frecuencia.replace("al", "")}
                          </>
                        )}{" "}
                      a las {formData.horaEjecucion}
                    </>
                  ) : (
                    "Complete la configuración para ver la vista previa"
                  )}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Destinatarios */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Destinatarios del Reporte
              </CardTitle>
              <CardDescription>Configure quién recibirá el reporte automáticamente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={nuevoDestinatario}
                  onChange={(e) => setNuevoDestinatario(e.target.value)}
                  placeholder="email@salud.gob.gt"
                  type="email"
                  className="flex-1"
                />
                <Button type="button" onClick={agregarDestinatario} className="bg-blue-600 hover:bg-blue-700">
                  <Users className="w-4 h-4 mr-2" />
                  Agregar
                </Button>
              </div>

              {formData.destinatarios.length > 0 && (
                <div className="space-y-2">
                  <Label>Destinatarios Configurados ({formData.destinatarios.length})</Label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {formData.destinatarios.map((email) => (
                      <div key={email} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <span className="text-sm">{email}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => eliminarDestinatario(email)}
                          className="h-6 w-6 p-0 text-red-600 hover:bg-red-50"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Configuración del Reporte */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Configuración del Reporte
              </CardTitle>
              <CardDescription>Configure el formato y contenido del reporte</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="space-y-2">
                  <Label htmlFor="fechaRelativa">Período de Datos</Label>
                  <Select
                    value={formData.filtros.fechaRelativa}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        filtros: { ...prev.filtros, fechaRelativa: value },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mes-actual">Mes Actual</SelectItem>
                      <SelectItem value="mes-anterior">Mes Anterior</SelectItem>
                      <SelectItem value="trimestre-actual">Trimestre Actual</SelectItem>
                      <SelectItem value="año-actual">Año Actual</SelectItem>
                      <SelectItem value="ultimos-30-dias">Últimos 30 días</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Contenido a Incluir</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="resumenEjecutivo"
                      checked={formData.incluirDatos.resumenEjecutivo}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          incluirDatos: { ...prev.incluirDatos, resumenEjecutivo: e.target.checked },
                        }))
                      }
                      className="rounded border-blue-300"
                    />
                    <Label htmlFor="resumenEjecutivo">Resumen Ejecutivo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="graficas"
                      checked={formData.incluirDatos.graficas}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          incluirDatos: { ...prev.incluirDatos, graficas: e.target.checked },
                        }))
                      }
                      className="rounded border-blue-300"
                    />
                    <Label htmlFor="graficas">Gráficas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="tablas"
                      checked={formData.incluirDatos.tablas}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          incluirDatos: { ...prev.incluirDatos, tablas: e.target.checked },
                        }))
                      }
                      className="rounded border-blue-300"
                    />
                    <Label htmlFor="tablas">Tablas Detalladas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="anexos"
                      checked={formData.incluirDatos.anexos}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          incluirDatos: { ...prev.incluirDatos, anexos: e.target.checked },
                        }))
                      }
                      className="rounded border-blue-300"
                    />
                    <Label htmlFor="anexos">Anexos</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estado de la Programación */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Estado de la Programación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="activo">Programación Activa</Label>
                  <p className="text-sm text-gray-600">La programación se ejecutará automáticamente</p>
                </div>
                <input
                  type="checkbox"
                  id="activo"
                  checked={formData.activo}
                  onChange={(e) => setFormData((prev) => ({ ...prev, activo: e.target.checked }))}
                  className="rounded border-blue-300 scale-125"
                />
              </div>
            </CardContent>
          </Card>

          {/* Resumen */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-lg text-green-800">Resumen de la Programación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-green-800">Frecuencia:</p>
                  <Badge className="bg-green-100 text-green-800 mt-1">
                    {frecuencias.find((f) => f.value === formData.frecuencia)?.label || "No seleccionada"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">Destinatarios:</p>
                  <p className="text-sm">{formData.destinatarios.length} configurados</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">Estado:</p>
                  <Badge className={formData.activo ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                    {formData.activo ? "Activa" : "Inactiva"}
                  </Badge>
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
              <Calendar className="w-4 h-4 mr-2" />
              Programar Reporte
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
