"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Phone, MapPin, Calendar, Activity, Edit, X } from "lucide-react"

interface DetallePersonaModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  persona: any
}

export function DetallePersonaModal({ open, onOpenChange, persona }: DetallePersonaModalProps) {
  if (!persona) return null

  const getEstadoBadge = (estado: string) => {
    return estado === "Activo" ? (
      <Badge className="bg-green-100 text-green-800">Activo</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800">Inactivo</Badge>
    )
  }

  const getSexoBadge = (sexo: string) => {
    return sexo === "F" ? (
      <Badge variant="outline" className="border-pink-200 text-pink-700">
        Femenino
      </Badge>
    ) : (
      <Badge variant="outline" className="border-blue-200 text-blue-700">
        Masculino
      </Badge>
    )
  }

  // Datos simulados de eventos clínicos
  const eventosClinicosSimulados = [
    {
      fecha: "2025-05-15",
      tipo: "Vacunación",
      descripcion: "Vacuna COVID-19 (Pfizer) - Refuerzo",
      responsable: "Enf. Ana López",
    },
    {
      fecha: "2025-04-20",
      tipo: "Nutrición",
      descripcion: "Evaluación nutricional - IMC: 24.5",
      responsable: "Aux. Carlos Méndez",
    },
    {
      fecha: "2025-03-10",
      tipo: "Control General",
      descripcion: "Revisión médica general - Sin novedad",
      responsable: "Dr. María González",
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-900">
            <User className="w-5 h-5" />
            Detalle de Persona
          </DialogTitle>
          <DialogDescription>Información completa y historial clínico</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Información Personal</TabsTrigger>
            <TabsTrigger value="familiar">Información Familiar</TabsTrigger>
            <TabsTrigger value="clinica">Historial Clínico</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-blue-900">Datos Personales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Nombre Completo</label>
                    <p className="text-lg font-semibold text-blue-900">{persona.nombre}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">DPI</label>
                    <p className="font-mono text-lg">{persona.dpi}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Edad</label>
                    <p className="text-lg">{persona.edad} años</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Sexo</label>
                    <div className="mt-1">{getSexoBadge(persona.sexo)}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Estado</label>
                    <div className="mt-1">{getEstadoBadge(persona.estado)}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Fecha de Nacimiento</label>
                    <p className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      {persona.fechaNacimiento || "No registrada"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Estado Civil</label>
                    <p>{persona.estadoCivil || "No registrado"}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Teléfono</label>
                  <p className="flex items-center gap-1">
                    <Phone className="w-4 h-4 text-blue-600" />
                    {persona.telefono || "No registrado"}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Dirección</label>
                  <p className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    {persona.direccion}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="familiar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-blue-900">Información Familiar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Código de Familia</label>
                    <p className="font-mono text-lg text-blue-600">{persona.codigoFamilia}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Territorio - Sector</label>
                    <p className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      {persona.territorio} - {persona.sector}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Rol en la Familia</label>
                  <p>{persona.sexo === "M" && persona.edad > 18 ? "Jefe de Familia" : "Miembro"}</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Miembros de la Familia</h4>
                  <p className="text-sm text-blue-700">
                    Para ver todos los miembros de la familia {persona.codigoFamilia}, visite la sección de Familias.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clinica" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-blue-900">Historial Clínico</CardTitle>
                <CardDescription>Últimos eventos clínicos registrados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {eventosClinicosSimulados.map((evento, index) => (
                    <div key={index} className="border-l-4 border-blue-200 pl-4 py-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-blue-900">{evento.tipo}</p>
                          <p className="text-sm text-gray-600">{evento.descripcion}</p>
                          <p className="text-xs text-gray-500 mt-1">Por: {evento.responsable}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{evento.fecha}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <Activity className="w-4 h-4 inline mr-1" />
                    Total de eventos registrados: {eventosClinicosSimulados.length}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="w-4 h-4 mr-2" />
            Cerrar
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Edit className="w-4 h-4 mr-2" />
            Editar Persona
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
