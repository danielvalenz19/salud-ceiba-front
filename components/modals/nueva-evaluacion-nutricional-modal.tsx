"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Apple, Calculator, Save, X } from "lucide-react"

interface NuevaEvaluacionNutricionalModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NuevaEvaluacionNutricionalModal({ isOpen, onClose }: NuevaEvaluacionNutricionalModalProps) {
  const [formData, setFormData] = useState({
    dpi: "",
    nombre: "",
    edad: "",
    tipoEvaluacion: "",
    peso: "",
    talla: "",
    circunferenciaBrazo: "",
    observaciones: "",
    territorio: "",
    responsable: "",
  })

  const [imc, setImc] = useState<number | null>(null)
  const [diagnostico, setDiagnostico] = useState("")

  const calcularIMC = () => {
    const pesoNum = Number.parseFloat(formData.peso)
    const tallaNum = Number.parseFloat(formData.talla) / 100 // convertir cm a metros

    if (pesoNum > 0 && tallaNum > 0) {
      const imcCalculado = pesoNum / (tallaNum * tallaNum)
      setImc(Math.round(imcCalculado * 10) / 10)

      // Determinar diagnóstico basado en IMC
      if (imcCalculado < 18.5) {
        setDiagnostico("Bajo peso")
      } else if (imcCalculado >= 18.5 && imcCalculado < 25) {
        setDiagnostico("Peso normal")
      } else if (imcCalculado >= 25 && imcCalculado < 30) {
        setDiagnostico("Sobrepeso")
      } else {
        setDiagnostico("Obesidad")
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar la evaluación
    console.log("Guardando evaluación nutricional:", { ...formData, imc, diagnostico })
    onClose()
  }

  const getDiagnosticoBadge = (diag: string) => {
    if (diag.includes("normal")) return <Badge className="bg-green-100 text-green-800">{diag}</Badge>
    if (diag.includes("Sobrepeso") || diag.includes("Obesidad"))
      return <Badge className="bg-yellow-100 text-yellow-800">{diag}</Badge>
    if (diag.includes("Bajo")) return <Badge className="bg-blue-100 text-blue-800">{diag}</Badge>
    return <Badge variant="outline">{diag}</Badge>
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-blue-900">
            <Apple className="w-6 h-6 mr-2 text-blue-600" />
            Nueva Evaluación Nutricional
          </DialogTitle>
          <DialogDescription>Registrar nueva evaluación del estado nutricional del paciente</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información del Paciente */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="dpi">DPI del Paciente</Label>
              <Input
                id="dpi"
                value={formData.dpi}
                onChange={(e) => setFormData({ ...formData, dpi: e.target.value })}
                placeholder="0000 00000 0000"
                className="border-blue-200"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre Completo</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Nombre completo del paciente"
                className="border-blue-200"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edad">Edad</Label>
              <Input
                id="edad"
                type="number"
                value={formData.edad}
                onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
                placeholder="Edad en años"
                className="border-blue-200"
                required
              />
            </div>
          </div>

          {/* Tipo de Evaluación */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tipoEvaluacion">Tipo de Evaluación</Label>
              <Select
                value={formData.tipoEvaluacion}
                onValueChange={(value) => setFormData({ ...formData, tipoEvaluacion: value })}
              >
                <SelectTrigger className="border-blue-200">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Control Prenatal">Control Prenatal</SelectItem>
                  <SelectItem value="Control Infantil">Control Infantil</SelectItem>
                  <SelectItem value="Evaluación Adulto">Evaluación Adulto</SelectItem>
                  <SelectItem value="Control Adulto Mayor">Control Adulto Mayor</SelectItem>
                  <SelectItem value="Seguimiento Nutricional">Seguimiento Nutricional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="territorio">Territorio</Label>
              <Select
                value={formData.territorio}
                onValueChange={(value) => setFormData({ ...formData, territorio: value })}
              >
                <SelectTrigger className="border-blue-200">
                  <SelectValue placeholder="Seleccionar territorio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="T1">Territorio 1</SelectItem>
                  <SelectItem value="T2">Territorio 2</SelectItem>
                  <SelectItem value="T3">Territorio 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Medidas Antropométricas */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-900">Medidas Antropométricas</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="peso">Peso (kg)</Label>
                <Input
                  id="peso"
                  type="number"
                  step="0.1"
                  value={formData.peso}
                  onChange={(e) => setFormData({ ...formData, peso: e.target.value })}
                  placeholder="0.0"
                  className="border-blue-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="talla">Talla (cm)</Label>
                <Input
                  id="talla"
                  type="number"
                  value={formData.talla}
                  onChange={(e) => setFormData({ ...formData, talla: e.target.value })}
                  placeholder="0"
                  className="border-blue-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="circunferenciaBrazo">Circunferencia Brazo (cm)</Label>
                <Input
                  id="circunferenciaBrazo"
                  type="number"
                  step="0.1"
                  value={formData.circunferenciaBrazo}
                  onChange={(e) => setFormData({ ...formData, circunferenciaBrazo: e.target.value })}
                  placeholder="0.0"
                  className="border-blue-200"
                />
              </div>
              <div className="space-y-2 flex flex-col justify-end">
                <Button
                  type="button"
                  onClick={calcularIMC}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={!formData.peso || !formData.talla}
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Calcular IMC
                </Button>
              </div>
            </div>
          </div>

          {/* Resultados */}
          {imc && (
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Resultados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Índice de Masa Corporal (IMC)</Label>
                  <div className="text-2xl font-bold text-green-700">{imc}</div>
                </div>
                <div>
                  <Label>Diagnóstico Nutricional</Label>
                  <div className="mt-1">{getDiagnosticoBadge(diagnostico)}</div>
                </div>
              </div>
            </div>
          )}

          {/* Observaciones */}
          <div className="space-y-2">
            <Label htmlFor="observaciones">Observaciones y Recomendaciones</Label>
            <Textarea
              id="observaciones"
              value={formData.observaciones}
              onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
              placeholder="Observaciones clínicas, recomendaciones nutricionales, plan de seguimiento..."
              className="border-blue-200 min-h-[100px]"
            />
          </div>

          {/* Responsable */}
          <div className="space-y-2">
            <Label htmlFor="responsable">Responsable de la Evaluación</Label>
            <Input
              id="responsable"
              value={formData.responsable}
              onChange={(e) => setFormData({ ...formData, responsable: e.target.value })}
              placeholder="Nombre del profesional responsable"
              className="border-blue-200"
              required
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Guardar Evaluación
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
