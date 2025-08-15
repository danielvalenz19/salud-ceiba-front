"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, X, Calendar, Syringe } from "lucide-react"

interface EsquemasVacunacionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EsquemasVacunacionModal({ open, onOpenChange }: EsquemasVacunacionModalProps) {
  const esquemasData = {
    infantil: [
      { edad: "Recién nacido", vacunas: ["BCG", "Hepatitis B"] },
      { edad: "2 meses", vacunas: ["Pentavalente", "Rotavirus", "Neumococo"] },
      { edad: "4 meses", vacunas: ["Pentavalente", "Rotavirus", "Neumococo"] },
      { edad: "6 meses", vacunas: ["Pentavalente", "Rotavirus"] },
      { edad: "12 meses", vacunas: ["SRP", "Neumococo"] },
      { edad: "18 meses", vacunas: ["DPT", "SRP"] },
    ],
    covid19: [
      { grupo: "12-17 años", dosis: "2 dosis + refuerzo", intervalo: "21 días entre dosis" },
      { grupo: "18-59 años", dosis: "2 dosis + refuerzo", intervalo: "21 días entre dosis" },
      { grupo: "60+ años", dosis: "2 dosis + refuerzo", intervalo: "21 días entre dosis" },
      { grupo: "Embarazadas", dosis: "2 dosis + refuerzo", intervalo: "21 días entre dosis" },
    ],
    adultoMayor: [
      { vacuna: "Influenza", frecuencia: "Anual", observaciones: "Preferiblemente antes de temporada de frío" },
      { vacuna: "Neumococo", frecuencia: "Una vez", observaciones: "Para mayores de 65 años" },
      { vacuna: "Tdap", frecuencia: "Cada 10 años", observaciones: "Refuerzo de tétanos, difteria y tos ferina" },
      { vacuna: "Herpes Zóster", frecuencia: "Una vez", observaciones: "Para mayores de 60 años" },
    ],
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-900">
            <FileText className="w-5 h-5" />
            Esquemas de Vacunación
          </DialogTitle>
          <DialogDescription>Esquemas oficiales de vacunación por grupo etario</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="infantil" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="infantil">Esquema Infantil</TabsTrigger>
            <TabsTrigger value="covid19">COVID-19</TabsTrigger>
            <TabsTrigger value="adulto">Adulto Mayor</TabsTrigger>
          </TabsList>

          <TabsContent value="infantil" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-blue-900">Esquema Básico de Vacunación Infantil</CardTitle>
                <CardDescription>Vacunas requeridas desde el nacimiento hasta los 18 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {esquemasData.infantil.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-blue-900">{item.edad}</h4>
                        <Badge variant="outline">
                          <Calendar className="w-3 h-3 mr-1" />
                          {item.vacunas.length} vacuna(s)
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.vacunas.map((vacuna, vIndex) => (
                          <Badge key={vIndex} className="bg-blue-100 text-blue-800">
                            <Syringe className="w-3 h-3 mr-1" />
                            {vacuna}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="covid19" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-blue-900">Esquema COVID-19</CardTitle>
                <CardDescription>Esquema de vacunación contra COVID-19 por grupo etario</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {esquemasData.covid19.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-blue-900">{item.grupo}</h4>
                        <Badge className="bg-red-100 text-red-800">{item.dosis}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{item.intervalo}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Nota:</strong> Los refuerzos se aplican cada 6 meses o según indicaciones del Ministerio de
                    Salud.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="adulto" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-blue-900">Esquema Adulto Mayor</CardTitle>
                <CardDescription>Vacunas recomendadas para personas mayores de 60 años</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {esquemasData.adultoMayor.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-blue-900">{item.vacuna}</h4>
                        <Badge variant="outline">{item.frecuencia}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{item.observaciones}</p>
                    </div>
                  ))}
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
            <FileText className="w-4 h-4 mr-2" />
            Descargar PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
