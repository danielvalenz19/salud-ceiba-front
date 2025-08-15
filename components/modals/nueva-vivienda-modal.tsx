"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Home, Save, X, MapPin } from "lucide-react"

interface NuevaViviendaModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (viviendaData: any) => void
}

export function NuevaViviendaModal({ open, onOpenChange, onSave }: NuevaViviendaModalProps) {
  const [formData, setFormData] = useState({
    direccion: "",
    territorio: "",
    sector: "",
    coordenadas: "",
    responsable: "",
    observaciones: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular llamada API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const nuevaVivienda = {
      id: Date.now(),
      codigo: `VIV-${String(Date.now()).slice(-3)}-2025`,
      direccion: formData.direccion,
      territorio: formData.territorio,
      sector: formData.sector,
      familias: 0,
      personas: 0,
      estado: "No Contactada",
      ultimaVisita: "N/A",
      responsable: formData.responsable,
      coordenadas: formData.coordenadas,
      observaciones: formData.observaciones,
    }

    onSave(nuevaVivienda)
    onOpenChange(false)

    // Reset form
    setFormData({
      direccion: "",
      territorio: "",
      sector: "",
      coordenadas: "",
      responsable: "",
      observaciones: "",
    })
    setIsLoading(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-900">
            <Home className="w-5 h-5" />
            Nueva Vivienda
          </DialogTitle>
          <DialogDescription>Registre una nueva vivienda en el sistema territorial</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="direccion">Dirección Completa *</Label>
            <Textarea
              id="direccion"
              value={formData.direccion}
              onChange={(e) => handleInputChange("direccion", e.target.value)}
              placeholder="Ej: Barrio El Centro, Casa #45, frente al parque"
              required
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="territorio">Territorio *</Label>
              <Select value={formData.territorio} onValueChange={(value) => handleInputChange("territorio", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar territorio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="T1">Territorio 1</SelectItem>
                  <SelectItem value="T2">Territorio 2</SelectItem>
                  <SelectItem value="T3">Territorio 3</SelectItem>
                  <SelectItem value="T4">Territorio 4</SelectItem>
                  <SelectItem value="T5">Territorio 5</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="sector">Sector *</Label>
              <Select value={formData.sector} onValueChange={(value) => handleInputChange("sector", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1A">Sector 1A</SelectItem>
                  <SelectItem value="1B">Sector 1B</SelectItem>
                  <SelectItem value="2A">Sector 2A</SelectItem>
                  <SelectItem value="2B">Sector 2B</SelectItem>
                  <SelectItem value="3A">Sector 3A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="coordenadas">Coordenadas GPS</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-blue-400" />
              <Input
                id="coordenadas"
                value={formData.coordenadas}
                onChange={(e) => handleInputChange("coordenadas", e.target.value)}
                placeholder="Ej: 14.6349, -90.5069"
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="responsable">Responsable Asignado *</Label>
            <Select value={formData.responsable} onValueChange={(value) => handleInputChange("responsable", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar responsable" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Enf. Ana López">Enf. Ana López</SelectItem>
                <SelectItem value="Aux. Carlos Méndez">Aux. Carlos Méndez</SelectItem>
                <SelectItem value="Enf. María García">Enf. María García</SelectItem>
                <SelectItem value="Enf. Sofía Hernández">Enf. Sofía Hernández</SelectItem>
                <SelectItem value="Aux. Pedro Morales">Aux. Pedro Morales</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="observaciones">Observaciones</Label>
            <Textarea
              id="observaciones"
              value={formData.observaciones}
              onChange={(e) => handleInputChange("observaciones", e.target.value)}
              placeholder="Observaciones adicionales sobre la vivienda"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Guardando..." : "Guardar Vivienda"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
