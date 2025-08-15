"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Package, Calendar, MapPin, User, TrendingUp, AlertTriangle, Edit, Printer } from "lucide-react"

interface DetalleInsumoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  insumo: any
}

export function DetalleInsumoModal({ open, onOpenChange, insumo }: DetalleInsumoModalProps) {
  if (!insumo) return null

  const movimientosRecientes = [
    {
      id: 1,
      fecha: "2025-05-15",
      tipo: "Entrada",
      cantidad: 50,
      responsable: "Aux. Carlos Méndez",
      observaciones: "Compra mensual",
    },
    {
      id: 2,
      fecha: "2025-05-14",
      tipo: "Salida",
      cantidad: -15,
      responsable: "Enf. Ana López",
      observaciones: "Dispensación T1",
    },
    {
      id: 3,
      fecha: "2025-05-13",
      tipo: "Salida",
      cantidad: -8,
      responsable: "Enf. María García",
      observaciones: "Atención emergencia",
    },
  ]

  const getEstadoBadge = (stock: number, minimo: number) => {
    if (stock <= minimo) {
      return <Badge className="bg-red-100 text-red-800">Stock Crítico</Badge>
    } else if (stock <= minimo * 1.5) {
      return <Badge className="bg-yellow-100 text-yellow-800">Stock Bajo</Badge>
    } else {
      return <Badge className="bg-green-100 text-green-800">Stock Normal</Badge>
    }
  }

  const getTipoMovimientoBadge = (tipo: string) => {
    return tipo === "Entrada" ? (
      <Badge className="bg-green-100 text-green-800">Entrada</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">Salida</Badge>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-900">
            <Package className="w-5 h-5" />
            Detalle del Insumo: {insumo.nombre}
          </DialogTitle>
          <DialogDescription>Información completa y movimientos del insumo</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información General */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Información General
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Código:</p>
                    <p className="font-mono text-sm">{insumo.codigo}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-600">Categoría:</p>
                    <Badge variant="outline">{insumo.categoria}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-600">Unidad:</p>
                    <p className="text-sm">{insumo.unidad}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-600">Estado:</p>
                    {getEstadoBadge(insumo.stock, insumo.minimo)}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600">Descripción:</p>
                  <p className="text-sm text-gray-700">{insumo.descripcion || "Sin descripción disponible"}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Control de Stock
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Stock Actual:</p>
                    <p className="text-2xl font-bold text-blue-900">{insumo.stock}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-600">Stock Mínimo:</p>
                    <p className="text-lg font-semibold text-red-600">{insumo.minimo}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-600">Stock Máximo:</p>
                    <p className="text-lg font-semibold text-green-600">{insumo.maximo || "No definido"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-600">Días de Stock:</p>
                    <p className="text-lg font-semibold text-purple-600">{insumo.diasStock || "N/A"}</p>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">Ubicación:</span>
                    <span className="text-sm">{insumo.ubicacion || "No especificada"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Información de Vencimiento */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Información de Vencimiento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-blue-600">Fecha de Vencimiento:</p>
                  <p className="text-sm">{insumo.vencimiento || "No especificada"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600">Lote:</p>
                  <p className="text-sm font-mono">{insumo.lote || "No especificado"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600">Días para Vencer:</p>
                  <p className="text-sm">{insumo.diasVencimiento || "N/A"} días</p>
                </div>
              </div>
              {insumo.diasVencimiento && insumo.diasVencimiento <= 30 && (
                <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">
                      Alerta: Este insumo vence en menos de 30 días
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Movimientos Recientes */}
          <Card className="border-blue-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Movimientos Recientes
                </CardTitle>
                <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 bg-transparent">
                  Ver Todos
                </Button>
              </div>
              <CardDescription>Últimos movimientos de entrada y salida</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-blue-200">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blue-50">
                      <TableHead className="text-blue-900 font-semibold">Fecha</TableHead>
                      <TableHead className="text-blue-900 font-semibold">Tipo</TableHead>
                      <TableHead className="text-blue-900 font-semibold">Cantidad</TableHead>
                      <TableHead className="text-blue-900 font-semibold">Responsable</TableHead>
                      <TableHead className="text-blue-900 font-semibold">Observaciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {movimientosRecientes.map((movimiento) => (
                      <TableRow key={movimiento.id} className="hover:bg-blue-50/50">
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-blue-600" />
                            <span className="text-sm">{movimiento.fecha}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getTipoMovimientoBadge(movimiento.tipo)}</TableCell>
                        <TableCell>
                          <span
                            className={`font-semibold ${movimiento.cantidad > 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {movimiento.cantidad > 0 ? "+" : ""}
                            {movimiento.cantidad}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3 text-blue-600" />
                            <span className="text-sm">{movimiento.responsable}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{movimiento.observaciones}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Botones de Acción */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex gap-2">
              <Button variant="outline" className="border-blue-200 text-blue-700 bg-transparent">
                <Edit className="w-4 h-4 mr-2" />
                Editar Insumo
              </Button>
              <Button variant="outline" className="border-blue-200 text-blue-700 bg-transparent">
                <Package className="w-4 h-4 mr-2" />
                Registrar Movimiento
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-blue-200 text-blue-700 bg-transparent">
                <Printer className="w-4 h-4 mr-2" />
                Imprimir
              </Button>
              <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
