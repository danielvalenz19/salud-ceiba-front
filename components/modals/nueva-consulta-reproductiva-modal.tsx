"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Baby, Save, X } from "lucide-react"

interface NuevaConsultaReproductivaModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NuevaConsultaReproductivaModal({ isOpen, onClose }: NuevaConsultaReproductivaModalProps) {
  const [formData, setFormData] = useState({
    dpi: "",
    nombre: "",
    edad: "",
    tipoConsulta: "",
    semanaGestacion: "",
    tipoAtencion: "",
    diagnostico: "",
    observaciones: "",
    territorio: "",
    responsable: "",
    proximaCita: "",
    embarazoActivo: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Guardando consulta reproductiva:", formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-blue-900">
            <Baby className="w-6 h-6 mr-2 text-blue-600" />
            Nueva Consulta de Salud Reproductiva
          </DialogTitle>
          <DialogDescription>Registrar nueva consulta de salud sexual y reproductiva</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información del Paciente */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-pink-50 rounded-lg">
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

          {/* Tipo de Consulta */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tipoConsulta">Tipo de Consulta</Label>
              <Select
                value={formData.tipoConsulta}
                onValueChange={(value) => setFormData({ ...formData, tipoConsulta: value })}
              >
                <SelectTrigger className="border-blue-200">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Control Prenatal">Control Prenatal</SelectItem>
                  <SelectItem value="Planificación Familiar">Planificación Familiar</SelectItem>
                  <SelectItem value="Control Posparto">Control Posparto</SelectItem>
                  <SelectItem value="Detección Cáncer Cervical">Detección Cáncer Cervical</SelectItem>
                  <SelectItem value="Consejería Sexual">Consejería Sexual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipoAtencion">Tipo de Atención</Label>
              <Select
                value={formData.tipoAtencion}
                onValueChange={(value) => setFormData({ ...formData, tipoAtencion: value })}
              >
                <SelectTrigger className="border-blue-200">
                  <SelectValue placeholder="Seleccionar atención" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Primera Consulta">Primera Consulta</SelectItem>
                  <SelectItem value="Consulta de Seguimiento">Consulta de Seguimiento</SelectItem>
                  <SelectItem value="Consejería">Consejería</SelectItem>
                  <SelectItem value="Tamizaje">Tamizaje</SelectItem>
                  <SelectItem value="Emergencia">Emergencia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Información del Embarazo (si aplica) */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="embarazoActivo"
                checked={formData.embarazoActivo}
                onCheckedChange={(checked) => setFormData({ ...formData, embarazoActivo: checked as boolean })}
              />
              <Label htmlFor="embarazoActivo">Embarazo activo</Label>
            </div>

            {formData.embarazoActivo && (
              <div className="p-4 bg-pink-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="semanaGestacion">Semanas de Gestación</Label>
                    <Input
                      id="semanaGestacion"
                      type="number"
                      value={formData.semanaGestacion}
                      onChange={(e) => setFormData({ ...formData, semanaGestacion: e.target.value })}
                      placeholder="Número de semanas"
                      className="border-blue-200"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Diagnóstico */}
          <div className="space-y-2">
            <Label htmlFor="diagnostico">Diagnóstico</Label>
            <Input
              id="diagnostico"
              value={formData.diagnostico}
              onChange={(e) => setFormData({ ...formData, diagnostico: e.target.value })}
              placeholder="Diagnóstico principal"
              className="border-blue-200"
              required
            />
          </div>

          {/* Observaciones */}
          <div className="space-y-2">
            <Label htmlFor="observaciones">Observaciones y Plan de Tratamiento</Label>
            <Textarea
              id="observaciones"
              value={formData.observaciones}
              onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
              placeholder="Observaciones clínicas, plan de tratamiento, recomendaciones..."
              className="border-blue-200 min-h-[100px]"
            />
          </div>

          {/* Información Administrativa */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <div className="space-y-2">
              <Label htmlFor="responsable">Responsable</Label>
              <Input
                id="responsable"
                value={formData.responsable}
                onChange={(e) => setFormData({ ...formData, responsable: e.target.value })}
                placeholder="Profesional responsable"
                className="border-blue-200"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="proximaCita">Próxima Cita</Label>
              <Input
                id="proximaCita"
                type="date"
                value={formData.proximaCita}
                onChange={(e) => setFormData({ ...formData, proximaCita: e.target.value })}
                className="border-blue-200"
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Guardar Consulta
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
