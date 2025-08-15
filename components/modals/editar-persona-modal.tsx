"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { User, Save, X } from "lucide-react"

interface EditarPersonaModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  persona: any
  onSave: (personaData: any) => void
}

export function EditarPersonaModal({ open, onOpenChange, persona, onSave }: EditarPersonaModalProps) {
  const [formData, setFormData] = useState({
    nombre: persona?.nombre || "",
    dpi: persona?.dpi || "",
    telefono: persona?.telefono || "",
    direccion: persona?.direccion || "",
    territorio: persona?.territorio || "",
    sector: persona?.sector || "",
    estado: persona?.estado || "Activo",
    estadoCivil: persona?.estadoCivil || "",
    fechaNacimiento: persona?.fechaNacimiento || "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular llamada API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onSave({ ...persona, ...formData })
    onOpenChange(false)
    setIsLoading(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!persona) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-900">
            <User className="w-5 h-5" />
            Editar Persona
          </DialogTitle>
          <DialogDescription>Modifique la información de la persona</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nombre">Nombre Completo *</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="dpi">DPI *</Label>
              <Input
                id="dpi"
                value={formData.dpi}
                onChange={(e) => handleInputChange("dpi", e.target.value)}
                placeholder="0000 00000 0000"
                required
              />
            </div>

            <div>
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                value={formData.telefono}
                onChange={(e) => handleInputChange("telefono", e.target.value)}
                placeholder="0000-0000"
              />
            </div>

            <div>
              <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
              <Input
                id="fechaNacimiento"
                type="date"
                value={formData.fechaNacimiento}
                onChange={(e) => handleInputChange("fechaNacimiento", e.target.value)}
              />
            </div>

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

            <div>
              <Label htmlFor="estadoCivil">Estado Civil</Label>
              <Select value={formData.estadoCivil} onValueChange={(value) => handleInputChange("estadoCivil", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estado civil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Soltero">Soltero/a</SelectItem>
                  <SelectItem value="Casado">Casado/a</SelectItem>
                  <SelectItem value="Unido">Unido/a</SelectItem>
                  <SelectItem value="Divorciado">Divorciado/a</SelectItem>
                  <SelectItem value="Viudo">Viudo/a</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="estado">Estado *</Label>
              <Select value={formData.estado} onValueChange={(value) => handleInputChange("estado", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Inactivo">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="direccion">Dirección</Label>
            <Textarea
              id="direccion"
              value={formData.direccion}
              onChange={(e) => handleInputChange("direccion", e.target.value)}
              placeholder="Dirección completa"
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
              {isLoading ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
