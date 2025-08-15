"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Layout } from "@/components/layout"
import {
  User,
  Edit,
  Phone,
  MapPin,
  Calendar,
  Activity,
  Syringe,
  Apple,
  Baby,
  Microscope,
  FileText,
  Home,
} from "lucide-react"
import Link from "next/link"

// Datos simulados de la persona
const personaData = {
  id: 1,
  dpi: "2547 89632 0101",
  nombre: "María Elena Morales García",
  fechaNacimiento: "1990-08-15",
  edad: 34,
  sexo: "Femenino",
  estadoCivil: "Casada",
  telefono: "5512-3456",
  email: "maria.morales@email.com",
  direccion: "Barrio El Centro, Casa #45, La Ceiba, Atlántida",
  territorio: "T1",
  sector: "1A",
  codigoFamilia: "FAM-001-2025",
  estado: "Activo",
  fechaRegistro: "2025-01-15",
  ultimaActualizacion: "2025-05-15",
}

const historialEventos = [
  {
    id: 1,
    fecha: "2025-05-15",
    modulo: "Vacunación",
    evento: "Vacuna COVID-19 (Refuerzo)",
    responsable: "Enf. Ana López",
    estado: "Completado",
    icono: Syringe,
  },
  {
    id: 2,
    fecha: "2025-05-10",
    modulo: "Nutrición",
    evento: "Control Prenatal - Evaluación Nutricional",
    responsable: "Enf. Ana López",
    estado: "Completado",
    icono: Apple,
  },
  {
    id: 3,
    fecha: "2025-04-20",
    modulo: "Salud Reproductiva",
    evento: "Control Prenatal - 28 semanas",
    responsable: "Dr. María González",
    estado: "Completado",
    icono: Baby,
  },
  {
    id: 4,
    fecha: "2025-03-15",
    modulo: "Vacunación",
    evento: "Vacuna Tdap",
    responsable: "Enf. María García",
    estado: "Completado",
    icono: Syringe,
  },
]

const familiaData = {
  codigo: "FAM-001-2025",
  jefeFamilia: "Carlos Roberto Morales",
  integrantes: 4,
  vivienda: "VIV-001-2025",
  miembros: [
    {
      nombre: "Carlos Roberto Morales",
      parentesco: "Esposo",
      edad: 36,
      dpi: "1234 56789 0101",
    },
    {
      nombre: "Ana Sofía Morales García",
      parentesco: "Hija",
      edad: 12,
      dpi: "En trámite",
    },
    {
      nombre: "Pedro José Morales García",
      parentesco: "Hijo",
      edad: 8,
      dpi: "En trámite",
    },
  ],
}

export default function PersonaDetallePage() {
  const [activeTab, setActiveTab] = useState("general")

  const getEstadoBadge = (estado: string) => {
    return estado === "Activo" ? (
      <Badge className="bg-green-100 text-green-800">Activo</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800">Inactivo</Badge>
    )
  }

  const getModuloIcon = (modulo: string) => {
    switch (modulo) {
      case "Vacunación":
        return Syringe
      case "Nutrición":
        return Apple
      case "Salud Reproductiva":
        return Baby
      case "Epidemiología":
        return Microscope
      default:
        return Activity
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 flex items-center">
              <User className="w-8 h-8 mr-3 text-blue-600" />
              {personaData.nombre}
            </h1>
            <p className="text-blue-600">DPI: {personaData.dpi}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
              <FileText className="w-4 h-4 mr-2" />
              Historial Médico
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Edit className="w-4 h-4 mr-2" />
              Editar Persona
            </Button>
          </div>
        </div>

        {/* Información Básica */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-blue-200 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-blue-900">Información Personal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-blue-900">Nombre Completo</label>
                  <p className="text-lg font-semibold">{personaData.nombre}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-900">DPI</label>
                  <p className="font-mono">{personaData.dpi}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-900">Fecha de Nacimiento</label>
                  <p>{personaData.fechaNacimiento}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-900">Edad</label>
                  <p>{personaData.edad} años</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-900">Sexo</label>
                  <p>{personaData.sexo}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-900">Estado Civil</label>
                  <p>{personaData.estadoCivil}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-900">Teléfono</label>
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <p>{personaData.telefono}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-900">Email</label>
                  <p>{personaData.email}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-blue-900">Dirección</label>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <p>{personaData.direccion}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Estado y Ubicación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-blue-900">Estado</label>
                <div className="mt-1">{getEstadoBadge(personaData.estado)}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-blue-900">Territorio</label>
                <p className="font-semibold">{personaData.territorio}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-blue-900">Sector</label>
                <p className="font-semibold">{personaData.sector}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-blue-900">Código Familia</label>
                <Link href={`/familias/${personaData.codigoFamilia}`} className="text-blue-600 hover:underline">
                  {personaData.codigoFamilia}
                </Link>
              </div>
              <div>
                <label className="text-sm font-medium text-blue-900">Fecha Registro</label>
                <p className="text-sm">{personaData.fechaRegistro}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-blue-900">Última Actualización</label>
                <p className="text-sm">{personaData.ultimaActualizacion}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">Historial Clínico</TabsTrigger>
            <TabsTrigger value="familia">Información Familiar</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Historial de Eventos Clínicos</CardTitle>
                <CardDescription>Registro cronológico de atenciones y procedimientos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {historialEventos.map((evento) => {
                    const IconComponent = evento.icono
                    return (
                      <div key={evento.id} className="flex items-start gap-4 p-4 border border-blue-200 rounded-lg">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-blue-900">{evento.evento}</h4>
                              <p className="text-sm text-gray-600">{evento.modulo}</p>
                            </div>
                            <Badge className="bg-green-100 text-green-800">{evento.estado}</Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{evento.fecha}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span>{evento.responsable}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="familia" className="space-y-6">
            <Card className="border-blue-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-blue-900">Información Familiar</CardTitle>
                    <CardDescription>Familia: {familiaData.codigo}</CardDescription>
                  </div>
                  <Link href={`/familias/${familiaData.codigo}`}>
                    <Button variant="outline" className="border-blue-200 text-blue-700 bg-transparent">
                      <Home className="w-4 h-4 mr-2" />
                      Ver Familia Completa
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-blue-900">Jefe de Familia</label>
                      <p className="font-semibold">{familiaData.jefeFamilia}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-blue-900">Total Integrantes</label>
                      <p className="font-semibold">{familiaData.integrantes} personas</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-blue-900">Código Vivienda</label>
                      <Link href={`/viviendas/${familiaData.vivienda}`} className="text-blue-600 hover:underline">
                        {familiaData.vivienda}
                      </Link>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-blue-900 mb-3">Miembros de la Familia</h4>
                    <div className="rounded-md border border-blue-200">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-blue-50">
                            <TableHead className="text-blue-900 font-semibold">Nombre</TableHead>
                            <TableHead className="text-blue-900 font-semibold">Parentesco</TableHead>
                            <TableHead className="text-blue-900 font-semibold">Edad</TableHead>
                            <TableHead className="text-blue-900 font-semibold">DPI</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="bg-blue-50/50">
                            <TableCell className="font-medium">{personaData.nombre} (Actual)</TableCell>
                            <TableCell>Jefa de Hogar</TableCell>
                            <TableCell>{personaData.edad} años</TableCell>
                            <TableCell className="font-mono">{personaData.dpi}</TableCell>
                          </TableRow>
                          {familiaData.miembros.map((miembro, index) => (
                            <TableRow key={index} className="hover:bg-blue-50/50">
                              <TableCell className="font-medium">{miembro.nombre}</TableCell>
                              <TableCell>{miembro.parentesco}</TableCell>
                              <TableCell>{miembro.edad} años</TableCell>
                              <TableCell className="font-mono">{miembro.dpi}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
