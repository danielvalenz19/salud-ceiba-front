"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Save, X } from "lucide-react"

interface NuevoUsuarioModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (userData: any) => void
}

export function NuevoUsuarioModal({ open, onOpenChange, onSave }: NuevoUsuarioModalProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    rol: "",
    territorio: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: any = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (!formData.rol) {
      newErrors.rol = "El rol es requerido"
    }

    if (!formData.territorio) {
      newErrors.territorio = "El territorio es requerido"
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida"
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simular llamada API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onSave(formData)
    onOpenChange(false)

    // Reset form
    setFormData({
      nombre: "",
      email: "",
      rol: "",
      territorio: "",
      password: "",
      confirmPassword: "",
    })
    setErrors({})
    setIsLoading(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-900">
            <User className="w-5 h-5" />
            Nuevo Usuario
          </DialogTitle>
          <DialogDescription>Complete la información para crear un nuevo usuario del sistema</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="nombre">Nombre Completo *</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
                placeholder="Ej: Dr. Juan Pérez"
                className={errors.nombre ? "border-red-500" : ""}
              />
              {errors.nombre && <p className="text-sm text-red-600 mt-1">{errors.nombre}</p>}
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="usuario@salud.gob.gt"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rol">Rol *</Label>
                <Select value={formData.rol} onValueChange={(value) => handleInputChange("rol", value)}>
                  <SelectTrigger className={errors.rol ? "border-red-500" : ""}>
                    <SelectValue placeholder="Seleccionar rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Administrador">Administrador</SelectItem>
                    <SelectItem value="Enfermera">Enfermera</SelectItem>
                    <SelectItem value="Auxiliar">Auxiliar</SelectItem>
                    <SelectItem value="Supervisor">Supervisor</SelectItem>
                  </SelectContent>
                </Select>
                {errors.rol && <p className="text-sm text-red-600 mt-1">{errors.rol}</p>}
              </div>

              <div>
                <Label htmlFor="territorio">Territorio *</Label>
                <Select value={formData.territorio} onValueChange={(value) => handleInputChange("territorio", value)}>
                  <SelectTrigger className={errors.territorio ? "border-red-500" : ""}>
                    <SelectValue placeholder="Seleccionar territorio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="T1">Territorio 1</SelectItem>
                    <SelectItem value="T2">Territorio 2</SelectItem>
                    <SelectItem value="T3">Territorio 3</SelectItem>
                    <SelectItem value="T4">Territorio 4</SelectItem>
                    <SelectItem value="T5">Territorio 5</SelectItem>
                  </SelectContent>
                </Select>
                {errors.territorio && <p className="text-sm text-red-600 mt-1">{errors.territorio}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="password">Contraseña *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirmar Contraseña *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                placeholder="Repetir contraseña"
                className={errors.confirmPassword ? "border-red-500" : ""}
              />
              {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Guardando..." : "Guardar Usuario"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
