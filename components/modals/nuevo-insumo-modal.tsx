"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Package, Calendar, AlertTriangle } from "lucide-react"

interface NuevoInsumoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (insumoData: any) => void
}

export function NuevoInsumoModal({ open, onOpenChange, onSave }: NuevoInsumoModalProps) {
  const [formData, setFormData] = useState({
    codigo: "",
    nombre: "",
    categoria: "",
    unidadMedida: "",
    stockMinimo: "",
    stockMaximo: "",
    ubicacion: "",
    proveedor: "",
    fechaVencimiento: "",
    lote: "",
    observaciones: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onOpenChange(false)
    setFormData({
      codigo: "",
      nombre: "",
      categoria: "",
      unidadMedida: "",
      stockMinimo: "",
      stockMaximo: "",
      ubicacion: "",
      proveedor: "",
      fechaVencimiento: "",
      lote: "",
      observaciones: "",
    })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-900">
            <Package className="w-5 h-5" />
            Registrar Nuevo Insumo
          </DialogTitle>
          <DialogDescription>Complete la información del nuevo insumo médico</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Básica */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-900 border-b border-blue-200 pb-2">Información Básica</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="codigo">Código del Insumo *</Label>
                <Input
                  id="codigo"
                  value={formData.codigo}
                  onChange={(e) => handleChange("codigo", e.target.value)}
                  placeholder="Ej: MED-001"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Insumo *</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => handleChange("nombre", e.target.value)}
                  placeholder="Ej: Paracetamol 500mg"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoría *</Label>
                <Select value={formData.categoria} onValueChange={(value) => handleChange("categoria", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medicamentos">Medicamentos</SelectItem>
                    <SelectItem value="material-curacion">Material de Curación</SelectItem>
                    <SelectItem value="instrumental">Instrumental Médico</SelectItem>
                    <SelectItem value="reactivos">Reactivos de Laboratorio</SelectItem>
                    <SelectItem value="vacunas">Vacunas</SelectItem>
                    <SelectItem value="insumos-oficina">Insumos de Oficina</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="unidadMedida">Unidad de Medida *</Label>
                <Select value={formData.unidadMedida} onValueChange={(value) => handleChange("unidadMedida", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione unidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unidad">Unidad</SelectItem>
                    <SelectItem value="caja">Caja</SelectItem>
                    <SelectItem value="frasco">Frasco</SelectItem>
                    <SelectItem value="ampolla">Ampolla</SelectItem>
                    <SelectItem value="tableta">Tableta</SelectItem>
                    <SelectItem value="ml">Mililitros</SelectItem>
                    <SelectItem value="gr">Gramos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Control de Stock */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-900 border-b border-blue-200 pb-2">Control de Stock</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stockMinimo">Stock Mínimo *</Label>
                <Input
                  id="stockMinimo"
                  type="number"
                  value={formData.stockMinimo}
                  onChange={(e) => handleChange("stockMinimo", e.target.value)}
                  placeholder="Ej: 10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stockMaximo">Stock Máximo *</Label>
                <Input
                  id="stockMaximo"
                  type="number"
                  value={formData.stockMaximo}
                  onChange={(e) => handleChange("stockMaximo", e.target.value)}
                  placeholder="Ej: 100"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ubicacion">Ubicación de Almacenamiento</Label>
                <Input
                  id="ubicacion"
                  value={formData.ubicacion}
                  onChange={(e) => handleChange("ubicacion", e.target.value)}
                  placeholder="Ej: Estante A-1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="proveedor">Proveedor</Label>
                <Input
                  id="proveedor"
                  value={formData.proveedor}
                  onChange={(e) => handleChange("proveedor", e.target.value)}
                  placeholder="Ej: Farmacéutica Nacional"
                />
              </div>
            </div>
          </div>

          {/* Información Adicional */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-900 border-b border-blue-200 pb-2">Información Adicional</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fechaVencimiento">Fecha de Vencimiento</Label>
                <div className="relative">
                  <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400" />
                  <Input
                    id="fechaVencimiento"
                    type="date"
                    value={formData.fechaVencimiento}
                    onChange={(e) => handleChange("fechaVencimiento", e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lote">Número de Lote</Label>
                <Input
                  id="lote"
                  value={formData.lote}
                  onChange={(e) => handleChange("lote", e.target.value)}
                  placeholder="Ej: L2025001"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="observaciones">Observaciones</Label>
              <Textarea
                id="observaciones"
                value={formData.observaciones}
                onChange={(e) => handleChange("observaciones", e.target.value)}
                placeholder="Observaciones adicionales sobre el insumo..."
                rows={3}
              />
            </div>
          </div>

          {/* Alerta de Stock */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800">Configuración de Alertas</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Se generarán alertas automáticas cuando el stock esté por debajo del mínimo establecido o cuando el
                  insumo esté próximo a vencer.
                </p>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Package className="w-4 h-4 mr-2" />
              Registrar Insumo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
