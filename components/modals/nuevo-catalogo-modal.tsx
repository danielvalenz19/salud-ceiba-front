"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Plus, Trash2, Edit } from "lucide-react"

interface NuevoCatalogoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (catalogoData: any) => void
}

export function NuevoCatalogoModal({ open, onOpenChange, onSave }: NuevoCatalogoModalProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    tipo: "",
    elementos: [] as { id: string; valor: string; descripcion: string; activo: boolean }[],
  })

  const [nuevoElemento, setNuevoElemento] = useState({
    valor: "",
    descripcion: "",
  })

  const tiposCatalogo = [
    { value: "territorios", label: "Territorios" },
    { value: "sectores", label: "Sectores" },
    { value: "tipos-evento", label: "Tipos de Evento" },
    { value: "unidades-medida", label: "Unidades de Medida" },
    { value: "categorias-insumo", label: "Categorías de Insumo" },
    { value: "proveedores", label: "Proveedores" },
    { value: "diagnosticos", label: "Diagnósticos" },
    { value: "medicamentos", label: "Medicamentos" },
    { value: "vacunas", label: "Vacunas" },
    { value: "otro", label: "Otro" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onOpenChange(false)
    setFormData({
      nombre: "",
      descripcion: "",
      tipo: "",
      elementos: [],
    })
  }

  const agregarElemento = () => {
    if (nuevoElemento.valor.trim()) {
      const elemento = {
        id: Date.now().toString(),
        valor: nuevoElemento.valor,
        descripcion: nuevoElemento.descripcion,
        activo: true,
      }
      setFormData((prev) => ({
        ...prev,
        elementos: [...prev.elementos, elemento],
      }))
      setNuevoElemento({ valor: "", descripcion: "" })
    }
  }

  const eliminarElemento = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      elementos: prev.elementos.filter((e) => e.id !== id),
    }))
  }

  const toggleElementoActivo = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      elementos: prev.elementos.map((e) => (e.id === id ? { ...e, activo: !e.activo } : e)),
    }))
  }

  const cargarPlantilla = (tipo: string) => {
    let elementos: { id: string; valor: string; descripcion: string; activo: boolean }[] = []

    switch (tipo) {
      case "territorios":
        elementos = [
          { id: "1", valor: "T1", descripcion: "Territorio 1 - Centro", activo: true },
          { id: "2", valor: "T2", descripcion: "Territorio 2 - Norte", activo: true },
          { id: "3", valor: "T3", descripcion: "Territorio 3 - Sur", activo: true },
        ]
        break
      case "unidades-medida":
        elementos = [
          { id: "1", valor: "Unidad", descripcion: "Unidad individual", activo: true },
          { id: "2", valor: "Caja", descripcion: "Caja de medicamento", activo: true },
          { id: "3", valor: "Frasco", descripcion: "Frasco de medicamento", activo: true },
          { id: "4", valor: "Ampolla", descripcion: "Ampolla inyectable", activo: true },
          { id: "5", valor: "ml", descripcion: "Mililitros", activo: true },
          { id: "6", valor: "gr", descripcion: "Gramos", activo: true },
        ]
        break
      case "tipos-evento":
        elementos = [
          { id: "1", valor: "Consulta General", descripcion: "Consulta médica general", activo: true },
          { id: "2", valor: "Control Prenatal", descripcion: "Control de embarazo", activo: true },
          { id: "3", valor: "Vacunación", descripcion: "Aplicación de vacunas", activo: true },
          { id: "4", valor: "Evaluación Nutricional", descripcion: "Evaluación del estado nutricional", activo: true },
        ]
        break
    }

    setFormData((prev) => ({ ...prev, elementos }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-900">
            <Database className="w-5 h-5" />
            Crear Nuevo Catálogo
          </DialogTitle>
          <DialogDescription>Configure un nuevo catálogo de datos maestros para el sistema</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Básica */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Información Básica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre del Catálogo *</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
                    placeholder="Ej: Territorios del Distrito"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Catálogo</Label>
                  <Select
                    value={formData.tipo}
                    onValueChange={(value) => {
                      setFormData((prev) => ({ ...prev, tipo: value }))
                      cargarPlantilla(value)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposCatalogo.map((tipo) => (
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
                  placeholder="Descripción del catálogo y su propósito..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Elementos del Catálogo */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Elementos del Catálogo</CardTitle>
              <CardDescription>Agregue los elementos que formarán parte de este catálogo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Agregar Nuevo Elemento */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-3">Agregar Nuevo Elemento</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="valor">Valor *</Label>
                    <Input
                      id="valor"
                      value={nuevoElemento.valor}
                      onChange={(e) => setNuevoElemento((prev) => ({ ...prev, valor: e.target.value }))}
                      placeholder="Ej: T1, Unidad, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="descripcionElemento">Descripción</Label>
                    <Input
                      id="descripcionElemento"
                      value={nuevoElemento.descripcion}
                      onChange={(e) => setNuevoElemento((prev) => ({ ...prev, descripcion: e.target.value }))}
                      placeholder="Descripción del elemento"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button type="button" onClick={agregarElemento} className="w-full bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar
                    </Button>
                  </div>
                </div>
              </div>

              {/* Lista de Elementos */}
              {formData.elementos.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-blue-900">Elementos Agregados ({formData.elementos.length})</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {formData.elementos.map((elemento) => (
                      <div
                        key={elemento.id}
                        className={`flex items-center justify-between p-3 border rounded-lg ${
                          elemento.activo ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant={elemento.activo ? "default" : "secondary"} className="text-xs">
                              {elemento.valor}
                            </Badge>
                            <span
                              className={`text-sm ${elemento.activo ? "text-gray-900" : "text-gray-500 line-through"}`}
                            >
                              {elemento.descripcion}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleElementoActivo(elemento.id)}
                            className={`h-8 w-8 p-0 ${
                              elemento.activo
                                ? "text-yellow-600 hover:bg-yellow-50"
                                : "text-green-600 hover:bg-green-50"
                            }`}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => eliminarElemento(elemento.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {formData.elementos.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Database className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>No hay elementos agregados al catálogo</p>
                  <p className="text-sm">Agregue elementos usando el formulario de arriba</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resumen */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-lg text-green-800">Resumen del Catálogo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-green-800">Tipo:</p>
                  <p className="text-sm">
                    {tiposCatalogo.find((t) => t.value === formData.tipo)?.label || "No seleccionado"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">Total de Elementos:</p>
                  <p className="text-sm">{formData.elementos.length} elementos</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">Elementos Activos:</p>
                  <p className="text-sm">{formData.elementos.filter((e) => e.activo).length} activos</p>
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
              <Database className="w-4 h-4 mr-2" />
              Crear Catálogo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
