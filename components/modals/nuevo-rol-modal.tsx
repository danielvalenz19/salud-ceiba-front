"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Database, Activity, Settings, Eye, Edit, Trash2, Plus } from "lucide-react"

interface NuevoRolModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (rolData: any) => void
}

export function NuevoRolModal({ open, onOpenChange, onSave }: NuevoRolModalProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    permisos: [] as string[],
    modulos: [] as string[],
    nivel: "basico",
  })

  const permisosDisponibles = [
    { id: "crear", nombre: "Crear", descripcion: "Crear nuevos registros", icono: Plus },
    { id: "leer", nombre: "Leer", descripcion: "Ver información", icono: Eye },
    { id: "actualizar", nombre: "Actualizar", descripcion: "Modificar registros existentes", icono: Edit },
    { id: "eliminar", nombre: "Eliminar", descripcion: "Eliminar registros", icono: Trash2 },
    { id: "exportar", nombre: "Exportar", descripcion: "Exportar datos", icono: Database },
    { id: "administrar", nombre: "Administrar", descripcion: "Funciones administrativas", icono: Settings },
    { id: "reportes", nombre: "Reportes", descripcion: "Generar reportes", icono: Activity },
    { id: "supervisar", nombre: "Supervisar", descripcion: "Supervisar otros usuarios", icono: Users },
  ]

  const modulosDisponibles = [
    { id: "personas", nombre: "Personas", icono: Users },
    { id: "viviendas", nombre: "Viviendas", icono: Database },
    { id: "vacunacion", nombre: "Vacunación", icono: Activity },
    { id: "nutricion", nombre: "Nutrición", icono: Activity },
    { id: "reproductiva", nombre: "Salud Reproductiva", icono: Activity },
    { id: "epidemiologia", nombre: "Epidemiología", icono: Activity },
    { id: "inventario", nombre: "Inventario", icono: Database },
    { id: "reportes", nombre: "Reportes", icono: Activity },
    { id: "calidad", nombre: "Calidad & Alertas", icono: Activity },
    { id: "auditoria", nombre: "Auditoría", icono: Shield },
    { id: "admin", nombre: "Administración", icono: Settings },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onOpenChange(false)
    setFormData({
      nombre: "",
      descripcion: "",
      permisos: [],
      modulos: [],
      nivel: "basico",
    })
  }

  const handlePermisoToggle = (permisoId: string) => {
    setFormData((prev) => ({
      ...prev,
      permisos: prev.permisos.includes(permisoId)
        ? prev.permisos.filter((p) => p !== permisoId)
        : [...prev.permisos, permisoId],
    }))
  }

  const handleModuloToggle = (moduloId: string) => {
    setFormData((prev) => ({
      ...prev,
      modulos: prev.modulos.includes(moduloId)
        ? prev.modulos.filter((m) => m !== moduloId)
        : [...prev.modulos, moduloId],
    }))
  }

  const aplicarPlantilla = (tipo: string) => {
    switch (tipo) {
      case "administrador":
        setFormData((prev) => ({
          ...prev,
          nombre: "Administrador",
          descripcion: "Acceso completo al sistema",
          permisos: permisosDisponibles.map((p) => p.id),
          modulos: modulosDisponibles.map((m) => m.id),
          nivel: "avanzado",
        }))
        break
      case "enfermera":
        setFormData((prev) => ({
          ...prev,
          nombre: "Enfermera",
          descripcion: "Acceso a módulos clínicos y registro",
          permisos: ["crear", "leer", "actualizar", "reportes"],
          modulos: ["personas", "viviendas", "vacunacion", "nutricion", "reproductiva", "epidemiologia"],
          nivel: "intermedio",
        }))
        break
      case "auxiliar":
        setFormData((prev) => ({
          ...prev,
          nombre: "Auxiliar",
          descripcion: "Acceso limitado a registro básico",
          permisos: ["crear", "leer"],
          modulos: ["personas", "viviendas", "vacunacion"],
          nivel: "basico",
        }))
        break
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-900">
            <Shield className="w-5 h-5" />
            Crear Nuevo Rol
          </DialogTitle>
          <DialogDescription>Configure los permisos y accesos para el nuevo rol de usuario</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Plantillas Rápidas */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Plantillas Rápidas</CardTitle>
              <CardDescription>Aplique una configuración predefinida</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="h-auto p-4 border-blue-200 text-left bg-transparent"
                  onClick={() => aplicarPlantilla("administrador")}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-red-600" />
                      <span className="font-medium">Administrador</span>
                    </div>
                    <p className="text-xs text-gray-600">Acceso completo al sistema</p>
                  </div>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-auto p-4 border-blue-200 text-left bg-transparent"
                  onClick={() => aplicarPlantilla("enfermera")}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">Enfermera</span>
                    </div>
                    <p className="text-xs text-gray-600">Módulos clínicos y registro</p>
                  </div>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-auto p-4 border-blue-200 text-left bg-transparent"
                  onClick={() => aplicarPlantilla("auxiliar")}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-green-600" />
                      <span className="font-medium">Auxiliar</span>
                    </div>
                    <p className="text-xs text-gray-600">Registro básico limitado</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Información Básica */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Información Básica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre del Rol *</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
                    placeholder="Ej: Supervisor de Territorio"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nivel">Nivel de Acceso</Label>
                  <select
                    id="nivel"
                    value={formData.nivel}
                    onChange={(e) => setFormData((prev) => ({ ...prev, nivel: e.target.value }))}
                    className="w-full p-2 border border-blue-200 rounded-md"
                  >
                    <option value="basico">Básico</option>
                    <option value="intermedio">Intermedio</option>
                    <option value="avanzado">Avanzado</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => setFormData((prev) => ({ ...prev, descripcion: e.target.value }))}
                  placeholder="Descripción del rol y sus responsabilidades..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Permisos */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Permisos del Sistema</CardTitle>
              <CardDescription>Seleccione las acciones que puede realizar este rol</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {permisosDisponibles.map((permiso) => (
                  <div
                    key={permiso.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.permisos.includes(permiso.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => handlePermisoToggle(permiso.id)}
                  >
                    <div className="flex items-start gap-3">
                      <permiso.icono className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div>
                        <span className="text-sm font-medium">{permiso.nombre}</span>
                        <p className="text-xs text-gray-600 mt-1">{permiso.descripcion}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <p className="text-sm text-blue-600">
                  Permisos seleccionados: {formData.permisos.length} de {permisosDisponibles.length}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Módulos */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Acceso a Módulos</CardTitle>
              <CardDescription>Seleccione los módulos a los que tendrá acceso este rol</CardDescription>
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

          {/* Resumen */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-lg text-green-800">Resumen del Rol</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-green-800">Nivel:</p>
                  <Badge className="bg-green-100 text-green-800 mt-1">{formData.nivel}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">Permisos:</p>
                  <p className="text-sm">{formData.permisos.length} permisos asignados</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">Módulos:</p>
                  <p className="text-sm">{formData.modulos.length} módulos accesibles</p>
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
              <Shield className="w-4 h-4 mr-2" />
              Crear Rol
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
