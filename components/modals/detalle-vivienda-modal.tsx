"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, MapPin, Users, Calendar, Edit, X } from "lucide-react"

interface DetalleViviendaModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vivienda: any
}

export function DetalleViviendaModal({ open, onOpenChange, vivienda }: DetalleViviendaModalProps) {
  if (!vivienda) return null

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Visitada":
        return <Badge className="bg-green-100 text-green-800">Visitada</Badge>
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
      case "No Contactada":
        return <Badge className="bg-red-100 text-red-800">No Contactada</Badge>
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  // Datos simulados de familias
  const familiasSimuladas = [
    {
      codigo: "FAM-001-2025",
      jefeFamilia: "Carlos Roberto Morales",
      miembros: 4,
      telefono: "5523-7890",
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-900">
            <Home className="w-5 h-5" />
            Detalle de Vivienda
          </DialogTitle>
          <DialogDescription>Información completa de la vivienda y familias residentes</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">Información General</TabsTrigger>
            <TabsTrigger value="familias">Familias Residentes</TabsTrigger>
            <TabsTrigger value="visitas">Historial de Visitas</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-blue-900">Datos de la Vivienda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Código</label>
                    <p className="font-mono text-lg text-blue-600">{vivienda.codigo}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Estado</label>
                    <div className="mt-1">{getEstadoBadge(vivienda.estado)}</div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Dirección</label>
                  <p className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    {vivienda.direccion}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Territorio</label>
                    <p className="text-lg font-semibold">{vivienda.territorio}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Sector</label>
                    <p className="text-lg font-semibold">{vivienda.sector}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Familias</label>
                    <p className="flex items-center gap-1">
                      <Home className="w-4 h-4 text-blue-600" />
                      {vivienda.familias} familia(s)
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Personas</label>
                    <p className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-blue-600" />
                      {vivienda.personas} persona(s)
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Responsable</label>
                    <p>{vivienda.responsable}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Última Visita</label>
                    <p className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      {vivienda.ultimaVisita}
                    </p>
                  </div>
                </div>

                {vivienda.coordenadas && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Coordenadas GPS</label>
                    <p className="font-mono text-sm">{vivienda.coordenadas}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="familias" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-blue-900">Familias Residentes</CardTitle>
                <CardDescription>Familias que habitan en esta vivienda</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {familiasSimuladas.map((familia, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-blue-900">{familia.codigo}</p>
                          <p className="text-sm text-gray-600">Jefe: {familia.jefeFamilia}</p>
                          <p className="text-sm text-gray-600">Miembros: {familia.miembros}</p>
                          <p className="text-sm text-gray-600">Tel: {familia.telefono}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Ver Familia
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {familiasSimuladas.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Home className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No hay familias registradas en esta vivienda</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visitas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-blue-900">Historial de Visitas</CardTitle>
                <CardDescription>Registro de visitas realizadas a la vivienda</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="border-l-4 border-green-200 pl-4 py-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-green-900">Visita Domiciliaria</p>
                        <p className="text-sm text-gray-600">Control de salud familiar</p>
                        <p className="text-xs text-gray-500 mt-1">Por: {vivienda.responsable}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{vivienda.ultimaVisita}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Próxima visita programada: {vivienda.ultimaVisita !== "N/A" ? "Por programar" : "Pendiente"}
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
            Editar Vivienda
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
