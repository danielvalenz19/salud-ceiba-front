"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Syringe, Save, X, Search } from "lucide-react"

interface RegistrarVacunaModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (vacunaData: any) => void
}

export function RegistrarVacunaModal({ open, onOpenChange, onSave }: RegistrarVacunaModalProps) {
  const [formData, setFormData] = useState({
    dpi: "",
    nombrePaciente: "",
    vacuna: "",
    dosis: "",
    lote: "",
    fechaAplicacion: "",
    responsable: "",
    observaciones: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [pacienteEncontrado, setPacienteEncontrado] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular llamada API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const nuevaVacuna = {
      id: Date.now(),
      fecha: formData.fechaAplicacion,
      dpi: formData.dpi,
      nombre: formData.nombrePaciente,
      edad: 30, // Simulado
      vacuna: formData.vacuna,
      dosis: formData.dosis,
      lote: formData.lote,
      responsable: formData.responsable,
      territorio: "T1", // Simulado
      sector: "1A", // Simulado
      estado: "Aplicada",
      proximaDosis: "2025-12-01", // Simulado
    }

    onSave(nuevaVacuna)
    onOpenChange(false)

    // Reset form
    setFormData({
      dpi: "",
      nombrePaciente: "",
      vacuna: "",
      dosis: "",
      lote: "",
      fechaAplicacion: "",
      responsable: "",
      observaciones: "",
    })
    setPacienteEncontrado(false)
    setIsLoading(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const buscarPaciente = () => {
    if (formData.dpi.length >= 13) {
      // Simular búsqueda de paciente
      setFormData((prev) => ({ ...prev, nombrePaciente: "María Elena Morales García" }))
      setPacienteEncontrado(true)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-900">
            <Syringe className="w-5 h-5" />
            Registrar Vacuna
          </DialogTitle>
          <DialogDescription>Complete la información para registrar una nueva vacuna aplicada</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="dpi">DPI del Paciente *</Label>
              <div className="flex gap-2">
                <Input
                  id="dpi"
                  value={formData.dpi}
                  onChange={(e) => handleInputChange("dpi", e.target.value)}
                  placeholder="0000 00000 0000"
                  required
                />
                <Button type="button" variant="outline" onClick={buscarPaciente}>
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {pacienteEncontrado && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Paciente encontrado:</strong> {formData.nombrePaciente}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vacuna">Tipo de Vacuna *</Label>
                <Select value={formData.vacuna} onValueChange={(value) => handleInputChange("vacuna", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar vacuna" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="COVID-19 (Pfizer)">COVID-19 (Pfizer)</SelectItem>
                    <SelectItem value="COVID-19 (Moderna)">COVID-19 (Moderna)</SelectItem>
                    <SelectItem value="Influenza">Influenza</SelectItem>
                    <SelectItem value="HPV">HPV</SelectItem>
                    <SelectItem value="Tdap">Tdap</SelectItem>
                    <SelectItem value="Neumococo">Neumococo</SelectItem>
                    <SelectItem value="Hepatitis B">Hepatitis B</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="dosis">Dosis *</Label>
                <Select value={formData.dosis} onValueChange={(value) => handleInputChange("dosis", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar dosis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Primera dosis">Primera dosis</SelectItem>
                    <SelectItem value="Segunda dosis">Segunda dosis</SelectItem>
                    <SelectItem value="Tercera dosis">Tercera dosis</SelectItem>
                    <SelectItem value="Refuerzo">Refuerzo</SelectItem>
                    <SelectItem value="Única">Única</SelectItem>
                    <SelectItem value="Anual">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lote">Lote de la Vacuna *</Label>
                <Input
                  id="lote"
                  value={formData.lote}
                  onChange={(e) => handleInputChange("lote", e.target.value)}
                  placeholder="Ej: PF2025-456"
                  required
                />
              </div>

              <div>
                <Label htmlFor="fechaAplicacion">Fecha de Aplicación *</Label>
                <Input
                  id="fechaAplicacion"
                  type="date"
                  value={formData.fechaAplicacion}
                  onChange={(e) => handleInputChange("fechaAplicacion", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="responsable">Responsable *</Label>
              <Select value={formData.responsable} onValueChange={(value) => handleInputChange("responsable", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar responsable" />
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

            <div>
              <Label htmlFor="observaciones">Observaciones</Label>
              <Textarea
                id="observaciones"
                value={formData.observaciones}
                onChange={(e) => handleInputChange("observaciones", e.target.value)}
                placeholder="Observaciones adicionales sobre la aplicación"
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading || !pacienteEncontrado} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Registrando..." : "Registrar Vacuna"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
