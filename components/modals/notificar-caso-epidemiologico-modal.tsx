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
import { Microscope, Save, X, AlertTriangle } from "lucide-react"

interface NotificarCasoEpidemiologicoModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificarCasoEpidemiologicoModal({ isOpen, onClose }: NotificarCasoEpidemiologicoModalProps) {
  const [formData, setFormData] = useState({
    dpi: "",
    nombre: "",
    edad: "",
    evento: "",
    clasificacion: "",
    fechaInicio: "",
    sintomas: "",
    observaciones: "",
    territorio: "",
    responsable: "",
    contactoEmergencia: "",
    hospitalizacion: false,
    defuncion: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Notificando caso epidemiológico:", formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-blue-900">
            <Microscope className="w-6 h-6 mr-2 text-blue-600" />
            Notificar Caso Epidemiológico
          </DialogTitle>
          <DialogDescription>Registro de nuevo caso para vigilancia epidemiológica</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información del Paciente */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-red-50 rounded-lg">
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

          {/* Información del Evento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="evento">Evento Epidemiológico</Label>
              <Select value={formData.evento} onValueChange={(value) => setFormData({ ...formData, evento: value })}>
                <SelectTrigger className="border-blue-200">
                  <SelectValue placeholder="Seleccionar evento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dengue">Dengue</SelectItem>
                  <SelectItem value="COVID-19">COVID-19</SelectItem>
                  <SelectItem value="Influenza">Influenza</SelectItem>
                  <SelectItem value="Neumonía">Neumonía</SelectItem>
                  <SelectItem value="Zika">Zika</SelectItem>
                  <SelectItem value="Chikungunya">Chikungunya</SelectItem>
                  <SelectItem value="Tuberculosis">Tuberculosis</SelectItem>
                  <SelectItem value="Hepatitis">Hepatitis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="clasificacion">Clasificación del Caso</Label>
              <Select
                value={formData.clasificacion}
                onValueChange={(value) => setFormData({ ...formData, clasificacion: value })}
              >
                <SelectTrigger className="border-blue-200">
                  <SelectValue placeholder="Seleccionar clasificación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Caso Sospechoso">Caso Sospechoso</SelectItem>
                  <SelectItem value="Caso Probable">Caso Probable</SelectItem>
                  <SelectItem value="Caso Confirmado">Caso Confirmado</SelectItem>
                  <SelectItem value="Caso Descartado">Caso Descartado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fechaInicio">Fecha de Inicio de Síntomas</Label>
              <Input
                id="fechaInicio"
                type="date"
                value={formData.fechaInicio}
                onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
                className="border-blue-200"
                required
              />
            </div>
          </div>

          {/* Síntomas */}
          <div className="space-y-2">
            <Label htmlFor="sintomas">Síntomas Presentados</Label>
            <Textarea
              id="sintomas"
              value={formData.sintomas}
              onChange={(e) => setFormData({ ...formData, sintomas: e.target.value })}
              placeholder="Describir síntomas presentados por el paciente..."
              className="border-blue-200 min-h-[80px]"
            />
          </div>

          {/* Estado del Paciente */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-900">Estado del Paciente</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hospitalizacion"
                  checked={formData.hospitalizacion}
                  onCheckedChange={(checked) => setFormData({ ...formData, hospitalizacion: checked as boolean })}
                />
                <Label htmlFor="hospitalizacion">Requiere hospitalización</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="defuncion"
                  checked={formData.defuncion}
                  onCheckedChange={(checked) => setFormData({ ...formData, defuncion: checked as boolean })}
                />
                <Label htmlFor="defuncion">Defunción</Label>
              </div>
            </div>
          </div>

          {/* Observaciones */}
          <div className="space-y-2">
            <Label htmlFor="observaciones">Observaciones Adicionales</Label>
            <Textarea
              id="observaciones"
              value={formData.observaciones}
              onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
              placeholder="Observaciones adicionales, antecedentes, factores de riesgo..."
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
              <Label htmlFor="responsable">Responsable de la Notificación</Label>
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
              <Label htmlFor="contactoEmergencia">Contacto de Emergencia</Label>
              <Input
                id="contactoEmergencia"
                value={formData.contactoEmergencia}
                onChange={(e) => setFormData({ ...formData, contactoEmergencia: e.target.value })}
                placeholder="Teléfono de contacto"
                className="border-blue-200"
              />
            </div>
          </div>

          {/* Alerta */}
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <p className="text-sm text-yellow-800">
                <strong>Importante:</strong> Este caso será notificado inmediatamente al sistema de vigilancia
                epidemiológica nacional.
              </p>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              <Save className="w-4 h-4 mr-2" />
              Notificar Caso
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
