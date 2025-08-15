"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Layout } from "@/components/layout"
import { User, Save, X, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NuevaPersonaPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    dpi: "",
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    sexo: "",
    estadoCivil: "",
    telefono: "",
    email: "",
    direccion: "",
    territorio: "",
    sector: "",
    codigoFamilia: "",
    crearNuevaFamilia: false,
    observaciones: "",
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    // Validaciones requeridas
    if (!formData.dpi.trim()) newErrors.dpi = "El DPI es requerido"
    else if (!/^\d{4}\s\d{5}\s\d{4}$/.test(formData.dpi)) {
      newErrors.dpi = "Formato de DPI inválido (ej: 2547 89632 0101)"
    }

    if (!formData.nombres.trim()) newErrors.nombres = "Los nombres son requeridos"
    if (!formData.apellidos.trim()) newErrors.apellidos = "Los apellidos son requeridos"
    if (!formData.fechaNacimiento) newErrors.fechaNacimiento = "La fecha de nacimiento es requerida"
    if (!formData.sexo) newErrors.sexo = "El sexo es requerido"
    if (!formData.territorio) newErrors.territorio = "El territorio es requerido"
    if (!formData.sector) newErrors.sector = "El sector es requerido"

    // Validación de teléfono guatemalteco
    if (formData.telefono && !/^\d{4}-\d{4}$/.test(formData.telefono)) {
      newErrors.telefono = "Formato de teléfono inválido (ej: 5512-3456)"
    }

    // Validación de email
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Formato de email inválido"
    }

    // Validación de familia
    if (!formData.crearNuevaFamilia && !formData.codigoFamilia.trim()) {
      newErrors.codigoFamilia = "Debe seleccionar una familia existente o crear una nueva"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulación de envío
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulación exitosa
      alert("Persona registrada exitosamente")
      router.push("/personas")
    } catch (error) {
      alert("Error al registrar la persona")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    router.back()
  }

  const formatDPI = (value: string) => {
    // Remover espacios y caracteres no numéricos
    const numbers = value.replace(/\D/g, "")

    // Aplicar formato XXXX XXXXX XXXX
    if (numbers.length <= 4) return numbers
    if (numbers.length <= 9) return `${numbers.slice(0, 4)} ${numbers.slice(4)}`
    return `${numbers.slice(0, 4)} ${numbers.slice(4, 9)} ${numbers.slice(9, 13)}`
  }

  const formatPhone = (value: string) => {
    // Remover caracteres no numéricos
    const numbers = value.replace(/\D/g, "")

    // Aplicar formato XXXX-XXXX
    if (numbers.length <= 4) return numbers
    return `${numbers.slice(0, 4)}-${numbers.slice(4, 8)}`
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 flex items-center">
              <User className="w-8 h-8 mr-3 text-blue-600" />
              Nueva Persona
            </h1>
            <p className="text-blue-600">Registro de nueva persona en el sistema territorial</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Personal */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Información Personal</CardTitle>
              <CardDescription>Datos básicos de identificación de la persona</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dpi" className="text-blue-900 font-medium">
                    DPI <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="dpi"
                    placeholder="2547 89632 0101"
                    value={formData.dpi}
                    onChange={(e) => setFormData({ ...formData, dpi: formatDPI(e.target.value) })}
                    className={`border-blue-200 focus:border-blue-500 ${errors.dpi ? "border-red-500" : ""}`}
                    maxLength={15}
                  />
                  {errors.dpi && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.dpi}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="fechaNacimiento" className="text-blue-900 font-medium">
                    Fecha de Nacimiento <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fechaNacimiento"
                    type="date"
                    value={formData.fechaNacimiento}
                    onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
                    className={`border-blue-200 focus:border-blue-500 ${errors.fechaNacimiento ? "border-red-500" : ""}`}
                  />
                  {errors.fechaNacimiento && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.fechaNacimiento}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="nombres" className="text-blue-900 font-medium">
                    Nombres <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="nombres"
                    placeholder="María Elena"
                    value={formData.nombres}
                    onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
                    className={`border-blue-200 focus:border-blue-500 ${errors.nombres ? "border-red-500" : ""}`}
                  />
                  {errors.nombres && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.nombres}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="apellidos" className="text-blue-900 font-medium">
                    Apellidos <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="apellidos"
                    placeholder="Morales García"
                    value={formData.apellidos}
                    onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                    className={`border-blue-200 focus:border-blue-500 ${errors.apellidos ? "border-red-500" : ""}`}
                  />
                  {errors.apellidos && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.apellidos}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="sexo" className="text-blue-900 font-medium">
                    Sexo <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.sexo} onValueChange={(value) => setFormData({ ...formData, sexo: value })}>
                    <SelectTrigger className={`border-blue-200 ${errors.sexo ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Seleccionar sexo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="F">Femenino</SelectItem>
                      <SelectItem value="M">Masculino</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.sexo && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.sexo}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="estadoCivil" className="text-blue-900 font-medium">
                    Estado Civil
                  </Label>
                  <Select
                    value={formData.estadoCivil}
                    onValueChange={(value) => setFormData({ ...formData, estadoCivil: value })}
                  >
                    <SelectTrigger className="border-blue-200">
                      <SelectValue placeholder="Seleccionar estado civil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Soltero/a">Soltero/a</SelectItem>
                      <SelectItem value="Casado/a">Casado/a</SelectItem>
                      <SelectItem value="Unido/a">Unido/a</SelectItem>
                      <SelectItem value="Divorciado/a">Divorciado/a</SelectItem>
                      <SelectItem value="Viudo/a">Viudo/a</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información de Contacto */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Información de Contacto</CardTitle>
              <CardDescription>Datos de contacto y ubicación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="telefono" className="text-blue-900 font-medium">
                    Teléfono
                  </Label>
                  <Input
                    id="telefono"
                    placeholder="5512-3456"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: formatPhone(e.target.value) })}
                    className={`border-blue-200 focus:border-blue-500 ${errors.telefono ? "border-red-500" : ""}`}
                    maxLength={9}
                  />
                  {errors.telefono && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.telefono}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-blue-900 font-medium">
                    Correo Electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="maria.morales@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`border-blue-200 focus:border-blue-500 ${errors.email ? "border-red-500" : ""}`}
                  />
                  {errors.email && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="direccion" className="text-blue-900 font-medium">
                  Dirección Completa
                </Label>
                <Textarea
                  id="direccion"
                  placeholder="Barrio El Centro, Casa #45, La Ceiba, Atlántida"
                  value={formData.direccion}
                  onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                  className="border-blue-200 focus:border-blue-500"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Ubicación Territorial */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Ubicación Territorial</CardTitle>
              <CardDescription>Asignación territorial para seguimiento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="territorio" className="text-blue-900 font-medium">
                    Territorio <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.territorio}
                    onValueChange={(value) => setFormData({ ...formData, territorio: value })}
                  >
                    <SelectTrigger className={`border-blue-200 ${errors.territorio ? "border-red-500" : ""}`}>
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
                  {errors.territorio && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.territorio}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="sector" className="text-blue-900 font-medium">
                    Sector <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.sector}
                    onValueChange={(value) => setFormData({ ...formData, sector: value })}
                  >
                    <SelectTrigger className={`border-blue-200 ${errors.sector ? "border-red-500" : ""}`}>
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
                  {errors.sector && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.sector}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información Familiar */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Información Familiar</CardTitle>
              <CardDescription>Asociación con núcleo familiar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="crearNuevaFamilia"
                  checked={formData.crearNuevaFamilia}
                  onCheckedChange={(checked) => setFormData({ ...formData, crearNuevaFamilia: checked as boolean })}
                />
                <Label htmlFor="crearNuevaFamilia" className="text-blue-900 font-medium">
                  Crear nueva familia
                </Label>
              </div>

              {!formData.crearNuevaFamilia && (
                <div>
                  <Label htmlFor="codigoFamilia" className="text-blue-900 font-medium">
                    Código de Familia Existente <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="codigoFamilia"
                    placeholder="FAM-001-2025"
                    value={formData.codigoFamilia}
                    onChange={(e) => setFormData({ ...formData, codigoFamilia: e.target.value })}
                    className={`border-blue-200 focus:border-blue-500 ${errors.codigoFamilia ? "border-red-500" : ""}`}
                  />
                  {errors.codigoFamilia && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.codigoFamilia}</span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Observaciones */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Observaciones</CardTitle>
              <CardDescription>Información adicional relevante</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Observaciones adicionales sobre la persona..."
                value={formData.observaciones}
                onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                className="border-blue-200 focus:border-blue-500"
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Botones de Acción */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
              disabled={isSubmitting}
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Persona
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
