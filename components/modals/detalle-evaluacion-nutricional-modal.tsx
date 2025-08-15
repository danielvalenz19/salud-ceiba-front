"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Apple, Calendar, User, TrendingUp, TrendingDown, Activity, X } from "lucide-react"

interface DetalleEvaluacionNutricionalModalProps {
  isOpen: boolean
  onClose: () => void
  evaluacion: {
    id: number
    fecha: string
    dpi: string
    nombre: string
    edad: number
    tipoEvaluacion: string
    peso: number
    talla: number
    imc: number
    diagnostico: string
    responsable: string
    territorio: string
    sector: string
    estado: string
    proximoControl: string
  } | null
}

export function DetalleEvaluacionNutricionalModal({
  isOpen,
  onClose,
  evaluacion,
}: DetalleEvaluacionNutricionalModalProps) {
  if (!evaluacion) return null

  const getIMCIndicator = (imc: number) => {
    if (imc < 18.5) return <TrendingDown className="w-5 h-5 text-blue-600" />
    if (imc > 25) return <TrendingUp className="w-5 h-5 text-red-600" />
    return <Apple className="w-5 h-5 text-green-600" />
  }

  const getDiagnosticoBadge = (diagnostico: string) => {
    if (diagnostico.includes("normal")) return <Badge className="bg-green-100 text-green-800">{diagnostico}</Badge>
    if (diagnostico.includes("Sobrepeso")) return <Badge className="bg-yellow-100 text-yellow-800">{diagnostico}</Badge>
    if (diagnostico.includes("Bajo")) return <Badge className="bg-blue-100 text-blue-800">{diagnostico}</Badge>
    return <Badge variant="outline">{diagnostico}</Badge>
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Completado":
        return <Badge className="bg-green-100 text-green-800">Completado</Badge>
      case "Requiere Seguimiento":
        return <Badge className="bg-yellow-100 text-yellow-800">Requiere Seguimiento</Badge>
      case "Pendiente":
        return <Badge className="bg-blue-100 text-blue-800">Pendiente</Badge>
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-blue-900">
            <Apple className="w-6 h-6 mr-2 text-blue-600" />
            Detalle de Evaluación Nutricional
          </DialogTitle>
          <DialogDescription>Información completa de la evaluación nutricional</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información del Paciente */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Información del Paciente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Nombre Completo</label>
                  <p className="text-lg font-semibold">{evaluacion.nombre}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">DPI</label>
                  <p className="font-mono">{evaluacion.dpi}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Edad</label>
                  <p>{evaluacion.edad} años</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información de la Evaluación */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Datos de la Evaluación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Fecha de Evaluación</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <p>{evaluacion.fecha}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Tipo de Evaluación</label>
                    <div>
                      <Badge variant="outline">{evaluacion.tipoEvaluacion}</Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Territorio/Sector</label>
                    <p>
                      {evaluacion.territorio} - {evaluacion.sector}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Responsable</label>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-600" />
                      <p>{evaluacion.responsable}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Estado</label>
                    <div>{getEstadoBadge(evaluacion.estado)}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Próximo Control</label>
                    <p>{evaluacion.proximoControl}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medidas Antropométricas */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Medidas Antropométricas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Activity className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <label className="text-sm font-medium text-gray-600">Peso</label>
                  <p className="text-2xl font-bold text-blue-900">{evaluacion.peso} kg</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <label className="text-sm font-medium text-gray-600">Talla</label>
                  <p className="text-2xl font-bold text-blue-900">{evaluacion.talla} cm</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="flex justify-center mb-2">{getIMCIndicator(evaluacion.imc)}</div>
                  <label className="text-sm font-medium text-gray-600">IMC</label>
                  <p className="text-2xl font-bold text-green-900">{evaluacion.imc}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Diagnóstico */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Diagnóstico Nutricional</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-6">
                {getDiagnosticoBadge(evaluacion.diagnostico)}
                <p className="text-sm text-gray-600 mt-2">Basado en el Índice de Masa Corporal calculado</p>
              </div>
            </CardContent>
          </Card>

          {/* Botones */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Cerrar
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Imprimir Evaluación</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
