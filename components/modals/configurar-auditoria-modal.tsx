"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Settings, Shield, AlertTriangle, Database, Users, Activity } from "lucide-react"

interface ConfigurarAuditoriaModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (configData: any) => void
}

export function ConfigurarAuditoriaModal({ open, onOpenChange, onSave }: ConfigurarAuditoriaModalProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    modulos: [] as string[],
    acciones: [] as string[],
    usuarios: [] as string[],
    frecuencia: "",
    alertas: true,
    retencion: "365",
    notificaciones: true,
    emailNotificacion: "",
    umbralRiesgo: "medio",
    activo: true,
  })

  const modulosDisponibles = [
    { id: "personas", nombre: "Personas", icono: Users },
    { id: "viviendas", nombre: "Viviendas", icono: Database },
    { id: "vacunacion", nombre: "Vacunación", icono: Activity },
    { id: "nutricion", nombre: "Nutrición", icono: Activity },
    { id: "reproductiva", nombre: "Salud Reproductiva", icono: Activity },
    { id: "epidemiologia", nombre: "Epidemiología", icono: Activity },
    { id: "inventario", nombre: "Inventario", icono: Database },
    { id: "admin", nombre: "Administración", icono: Settings },
  ]

  const accionesDisponibles = [
    "Crear",
    "Leer",
    "Actualizar",
    "Eliminar",
    "Exportar",
    "Importar",
    "Login",
    "Logout",
    "Cambio de Contraseña",
    "Cambio de Permisos",
  ]

  const usuariosDisponibles = [
    "Dr. María González",
    "Enf. Ana López",
    "Aux. Carlos Méndez",
    "Enf. María García",
    "Enf. Sofía Hernández",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onOpenChange(false)
  }

  const handleModuloToggle = (moduloId: string) => {
    setFormData((prev) => ({
      ...prev,
      modulos: prev.modulos.includes(moduloId)
        ? prev.modulos.filter((m) => m !== moduloId)
        : [...prev.modulos, moduloId],
    }))
  }

  const handleAccionToggle = (accion: string) => {
    setFormData((prev) => ({
      ...prev,
      acciones: prev.acciones.includes(accion) ? prev.acciones.filter((a) => a !== accion) : [...prev.acciones, accion],
    }))
  }

  const handleUsuarioToggle = (usuario: string) => {
    setFormData((prev) => ({
      ...prev,
      usuarios: prev.usuarios.includes(usuario)
        ? prev.usuarios.filter((u) => u !== usuario)
        : [...prev.usuarios, usuario],
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-900">
            <Settings className="w-5 h-5" />
            Configurar Auditoría del Sistema
          </DialogTitle>
          <DialogDescription>Configure las reglas y parámetros para el sistema de auditoría</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información General */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Información General</CardTitle>
              <CardDescription>Configuración básica de la auditoría</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre de la Configuración *</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
                    placeholder="Ej: Auditoría Módulos Clínicos"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frecuencia">Frecuencia de Revisión</Label>
                  <Select
                    value={formData.frecuencia}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, frecuencia: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione frecuencia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tiempo-real">Tiempo Real</SelectItem>
                      <SelectItem value="diario">Diario</SelectItem>
                      <SelectItem value="semanal">Semanal</SelectItem>
                      <SelectItem value="mensual">Mensual</SelectItem>
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
                  placeholder="Descripción de la configuración de auditoría..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Módulos a Auditar */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                <Database className="w-5 h-5" />
                Módulos a Auditar
              </CardTitle>
              <CardDescription>Seleccione los módulos que serán monitoreados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                    <div className="flex items-center gap-2">
                      <modulo.icono className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">{modulo.nombre}</span>
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

          {/* Acciones a Monitorear */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Acciones a Monitorear
              </CardTitle>
              <CardDescription>Seleccione las acciones que serán registradas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {accionesDisponibles.map((accion) => (
                  <div key={accion} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`accion-${accion}`}
                      checked={formData.acciones.includes(accion)}
                      onChange={() => handleAccionToggle(accion)}
                      className="rounded border-blue-300"
                    />
                    <Label htmlFor={`accion-${accion}`} className="text-sm">
                      {accion}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <p className="text-sm text-blue-600">
                  Acciones seleccionadas: {formData.acciones.length} de {accionesDisponibles.length}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Usuarios a Monitorear */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Usuarios a Monitorear
              </CardTitle>
              <CardDescription>Seleccione los usuarios que serán auditados (vacío = todos)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {usuariosDisponibles.map((usuario) => (
                  <div key={usuario} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`usuario-${usuario}`}
                      checked={formData.usuarios.includes(usuario)}
                      onChange={() => handleUsuarioToggle(usuario)}
                      className="rounded border-blue-300"
                    />
                    <Label htmlFor={`usuario-${usuario}`} className="text-sm">
                      {usuario}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <p className="text-sm text-blue-600">
                  {formData.usuarios.length === 0
                    ? "Todos los usuarios serán monitoreados"
                    : `${formData.usuarios.length} usuarios seleccionados`}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Configuración Avanzada */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Configuración Avanzada
              </CardTitle>
              <CardDescription>Parámetros adicionales de auditoría</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="retencion">Días de Retención de Logs</Label>
                  <Input
                    id="retencion"
                    type="number"
                    value={formData.retencion}
                    onChange={(e) => setFormData((prev) => ({ ...prev, retencion: e.target.value }))}
                    placeholder="365"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="umbralRiesgo">Umbral de Riesgo</Label>
                  <Select
                    value={formData.umbralRiesgo}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, umbralRiesgo: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bajo">Bajo</SelectItem>
                      <SelectItem value="medio">Medio</SelectItem>
                      <SelectItem value="alto">Alto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="alertas">Generar Alertas Automáticas</Label>
                    <p className="text-sm text-gray-600">Crear alertas para eventos de alto riesgo</p>
                  </div>
                  <Switch
                    id="alertas"
                    checked={formData.alertas}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, alertas: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notificaciones">Notificaciones por Email</Label>
                    <p className="text-sm text-gray-600">Enviar notificaciones de eventos críticos</p>
                  </div>
                  <Switch
                    id="notificaciones"
                    checked={formData.notificaciones}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, notificaciones: checked }))}
                  />
                </div>

                {formData.notificaciones && (
                  <div className="space-y-2">
                    <Label htmlFor="emailNotificacion">Email para Notificaciones</Label>
                    <Input
                      id="emailNotificacion"
                      type="email"
                      value={formData.emailNotificacion}
                      onChange={(e) => setFormData((prev) => ({ ...prev, emailNotificacion: e.target.value }))}
                      placeholder="admin@salud.gob.gt"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="activo">Configuración Activa</Label>
                    <p className="text-sm text-gray-600">Activar esta configuración de auditoría</p>
                  </div>
                  <Switch
                    id="activo"
                    checked={formData.activo}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, activo: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resumen de Configuración */}
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-lg text-yellow-800 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Resumen de Configuración
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-yellow-800">Módulos:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {formData.modulos.slice(0, 3).map((modulo) => (
                      <Badge key={modulo} variant="outline" className="text-xs">
                        {modulosDisponibles.find((m) => m.id === modulo)?.nombre}
                      </Badge>
                    ))}
                    {formData.modulos.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{formData.modulos.length - 3} más
                      </Badge>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-yellow-800">Acciones:</p>
                  <p className="text-sm">{formData.acciones.length} acciones seleccionadas</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-yellow-800">Estado:</p>
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
              <Settings className="w-4 h-4 mr-2" />
              Guardar Configuración
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
