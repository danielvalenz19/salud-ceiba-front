"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Plus, Minus, Calendar, AlertTriangle } from "lucide-react"

interface RegistrarMovimientoInventarioModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (movimientoData: any) => void
}

export function RegistrarMovimientoInventarioModal({
  open,
  onOpenChange,
  onSave,
}: RegistrarMovimientoInventarioModalProps) {
  const [formData, setFormData] = useState({
    tipoMovimiento: "",
    insumo: "",
    cantidad: "",
    motivo: "",
    responsable: "",
    fecha: new Date().toISOString().split("T")[0],
    hora: new Date().toTimeString().slice(0, 5),
    lote: "",
    vencimiento: "",
    proveedor: "",
    numeroFactura: "",
    observaciones: "",
    territorio: "",
    destino: "",
  })

  const [insumoSeleccionado, setInsumoSeleccionado] = useState<any>(null)

  const insumosDisponibles = [
    {
      id: "MED-001",
      nombre: "Paracetamol 500mg",
      stock: 150,
      unidad: "Tableta",
      categoria: "Medicamentos",
      ubicacion: "Estante A-1",
    },
    {
      id: "MED-002",
      nombre: "Ibuprofeno 400mg",
      stock: 75,
      unidad: "Tableta",
      categoria: "Medicamentos",
      ubicacion: "Estante A-2",
    },
    {
      id: "VAC-001",
      nombre: "Vacuna Influenza",
      stock: 25,
      unidad: "Dosis",
      categoria: "Vacunas",
      ubicacion: "Refrigerador 1",
    },
    {
      id: "CUR-001",
      nombre: "Gasas Estériles",
      stock: 200,
      unidad: "Unidad",
      categoria: "Material de Curación",
      ubicacion: "Estante B-1",
    },
  ]

  const motivosEntrada = [
    "Compra",
    "Donación",
    "Transferencia de otro centro",
    "Devolución",
    "Ajuste de inventario",
    "Producción interna",
  ]

  const motivosSalida = [
    "Dispensación",
    "Transferencia a otro centro",
    "Vencimiento",
    "Daño/Deterioro",
    "Pérdida",
    "Ajuste de inventario",
    "Uso interno",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...formData, insumoSeleccionado })
    onOpenChange(false)
    setFormData({
      tipoMovimiento: "",
      insumo: "",
      cantidad: "",
      motivo: "",
      responsable: "",
      fecha: new Date().toISOString().split("T")[0],
      hora: new Date().toTimeString().slice(0, 5),
      lote: "",
      vencimiento: "",
      proveedor: "",
      numeroFactura: "",
      observaciones: "",
      territorio: "",
      destino: "",
    })
    setInsumoSeleccionado(null)
  }

  const handleInsumoChange = (insumoId: string) => {
    const insumo = insumosDisponibles.find((i) => i.id === insumoId)
    setInsumoSeleccionado(insumo)
    setFormData((prev) => ({ ...prev, insumo: insumoId }))
  }

  const getMotivosDisponibles = () => {
    return formData.tipoMovimiento === "entrada" ? motivosEntrada : motivosSalida
  }

  const getTipoMovimientoIcon = () => {
    return formData.tipoMovimiento === "entrada" ? (
      <Plus className="w-4 h-4 text-green-600" />
    ) : (
      <Minus className="w-4 h-4 text-red-600" />
    )
  }

  const validarCantidad = () => {
    if (formData.tipoMovimiento === "salida" && insumoSeleccionado) {
      const cantidad = Number.parseInt(formData.cantidad)
      return cantidad <= insumoSeleccionado.stock
    }
    return true
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-900">
            <Package className="w-5 h-5" />
            Registrar Movimiento de Inventario
          </DialogTitle>
          <DialogDescription>Registre entradas y salidas de insumos del inventario</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Básica del Movimiento */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Información del Movimiento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipoMovimiento">Tipo de Movimiento *</Label>
                  <Select
                    value={formData.tipoMovimiento}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, tipoMovimiento: value, motivo: "" }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entrada">
                        <div className="flex items-center gap-2">
                          <Plus className="w-4 h-4 text-green-600" />
                          Entrada
                        </div>
                      </SelectItem>
                      <SelectItem value="salida">
                        <div className="flex items-center gap-2">
                          <Minus className="w-4 h-4 text-red-600" />
                          Salida
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fecha">Fecha *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400" />
                    <Input
                      id="fecha"
                      type="date"
                      value={formData.fecha}
                      onChange={(e) => setFormData((prev) => ({ ...prev, fecha: e.target.value }))}
                      className="pl-8"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hora">Hora</Label>
                  <Input
                    id="hora"
                    type="time"
                    value={formData.hora}
                    onChange={(e) => setFormData((prev) => ({ ...prev, hora: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selección de Insumo */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Selección de Insumo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="insumo">Insumo *</Label>
                <Select value={formData.insumo} onValueChange={handleInsumoChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el insumo" />
                  </SelectTrigger>
                  <SelectContent>
                    {insumosDisponibles.map((insumo) => (
                      <SelectItem key={insumo.id} value={insumo.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{insumo.nombre}</span>
                          <Badge variant="outline" className="ml-2">
                            Stock: {insumo.stock} {insumo.unidad}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {insumoSeleccionado && (
                <Card className="border-blue-100 bg-blue-50">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <p className="text-xs font-medium text-blue-600">Código:</p>
                        <p className="text-sm font-mono">{insumoSeleccionado.id}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-blue-600">Stock Actual:</p>
                        <p className="text-sm font-semibold">
                          {insumoSeleccionado.stock} {insumoSeleccionado.unidad}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-blue-600">Categoría:</p>
                        <p className="text-sm">{insumoSeleccionado.categoria}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-blue-600">Ubicación:</p>
                        <p className="text-sm">{insumoSeleccionado.ubicacion}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Detalles del Movimiento */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                {getTipoMovimientoIcon()}
                Detalles del Movimiento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cantidad">Cantidad *</Label>
                  <Input
                    id="cantidad"
                    type="number"
                    min="1"
                    value={formData.cantidad}
                    onChange={(e) => setFormData((prev) => ({ ...prev, cantidad: e.target.value }))}
                    placeholder="Ingrese la cantidad"
                    required
                  />
                  {!validarCantidad() && (
                    <p className="text-xs text-red-600">
                      La cantidad no puede ser mayor al stock disponible ({insumoSeleccionado?.stock})
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="motivo">Motivo *</Label>
                  <Select
                    value={formData.motivo}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, motivo: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el motivo" />
                    </SelectTrigger>
                    <SelectContent>
                      {getMotivosDisponibles().map((motivo) => (
                        <SelectItem key={motivo} value={motivo}>
                          {motivo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="responsable">Responsable *</Label>
                  <Select
                    value={formData.responsable}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, responsable: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione responsable" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dr. María González">Dr. María González</SelectItem>
                      <SelectItem value="Enf. Ana López">Enf. Ana López</SelectItem>
                      <SelectItem value="Aux. Carlos Méndez">Aux. Carlos Méndez</SelectItem>
                      <SelectItem value="Enf. María García">Enf. María García</SelectItem>
                      <SelectItem value="Enf. Sofía Hernández">Enf. Sofía Hernández</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {formData.tipoMovimiento === "salida" && (
                  <div className="space-y-2">
                    <Label htmlFor="territorio">Territorio/Destino</Label>
                    <Select
                      value={formData.territorio}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, territorio: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione destino" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="T1">Territorio 1</SelectItem>
                        <SelectItem value="T2">Territorio 2</SelectItem>
                        <SelectItem value="T3">Territorio 3</SelectItem>
                        <SelectItem value="otro-centro">Otro Centro de Salud</SelectItem>
                        <SelectItem value="paciente">Dispensación a Paciente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Información Adicional */}
          {formData.tipoMovimiento === "entrada" && (
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900">Información Adicional de Entrada</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lote">Número de Lote</Label>
                    <Input
                      id="lote"
                      value={formData.lote}
                      onChange={(e) => setFormData((prev) => ({ ...prev, lote: e.target.value }))}
                      placeholder="Ej: L2025001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vencimiento">Fecha de Vencimiento</Label>
                    <Input
                      id="vencimiento"
                      type="date"
                      value={formData.vencimiento}
                      onChange={(e) => setFormData((prev) => ({ ...prev, vencimiento: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="proveedor">Proveedor</Label>
                    <Input
                      id="proveedor"
                      value={formData.proveedor}
                      onChange={(e) => setFormData((prev) => ({ ...prev, proveedor: e.target.value }))}
                      placeholder="Nombre del proveedor"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="numeroFactura">Número de Factura</Label>
                    <Input
                      id="numeroFactura"
                      value={formData.numeroFactura}
                      onChange={(e) => setFormData((prev) => ({ ...prev, numeroFactura: e.target.value }))}
                      placeholder="Número de factura o documento"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Observaciones */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Observaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="observaciones">Observaciones Adicionales</Label>
                <Textarea
                  id="observaciones"
                  value={formData.observaciones}
                  onChange={(e) => setFormData((prev) => ({ ...prev, observaciones: e.target.value }))}
                  placeholder="Observaciones sobre el movimiento..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Resumen del Movimiento */}
          {formData.tipoMovimiento && formData.insumo && formData.cantidad && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                  {getTipoMovimientoIcon()}
                  Resumen del Movimiento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-green-800">Tipo:</p>
                    <Badge
                      className={
                        formData.tipoMovimiento === "entrada"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {formData.tipoMovimiento === "entrada" ? "Entrada" : "Salida"}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-800">Cantidad:</p>
                    <p className="text-sm font-semibold">
                      {formData.tipoMovimiento === "entrada" ? "+" : "-"}
                      {formData.cantidad} {insumoSeleccionado?.unidad}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-800">Stock Resultante:</p>
                    <p className="text-sm font-semibold">
                      {insumoSeleccionado &&
                        (formData.tipoMovimiento === "entrada"
                          ? insumoSeleccionado.stock + Number.parseInt(formData.cantidad || "0")
                          : insumoSeleccionado.stock - Number.parseInt(formData.cantidad || "0"))}{" "}
                      {insumoSeleccionado?.unidad}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Validación de Stock */}
          {formData.tipoMovimiento === "salida" && !validarCantidad() && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <div>
                    <h4 className="font-medium text-red-800">Stock Insuficiente</h4>
                    <p className="text-sm text-red-700">
                      La cantidad solicitada excede el stock disponible. Stock actual: {insumoSeleccionado?.stock}{" "}
                      {insumoSeleccionado?.unidad}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!validarCantidad() || !formData.tipoMovimiento || !formData.insumo || !formData.cantidad}
            >
              <Package className="w-4 h-4 mr-2" />
              Registrar Movimiento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
