"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Layout } from "@/components/layout"
import { Users, Edit, MapPin, Home, Phone, Calendar, User, Eye, Plus } from "lucide-react"
import Link from "next/link"

// Datos simulados de la familia
const familiaData = {
  codigo: "FAM-001-2025",
  jefeFamilia: "María Elena Morales García",
  totalIntegrantes: 4,
  direccion: "Barrio El Centro, Casa #45, La Ceiba, Atlántida",
  territorio: "T1",
  sector: "1A",
  codigoVivienda: "VIV-001-2025",
  telefono: "5512-3456",
  fechaRegistro: "2025-01-15",
  ultimaActualizacion: "2025-05-15",
  estado: "Activo",
}

const miembrosFamilia = [
  {
    id: 1,
    dpi: "2547 89632 0101",
    nombre: "María Elena Morales García",
    parentesco: "Jefa de Hogar",
    edad: 34,
    sexo: "F",
    fechaNacimiento: "1990-08-15",
    telefono: "5512-3456",
    estado: "Activo",
    ultimaVisita: "2025-05-15",
  },
  {
    id: 2,
    dpi: "1234 56789 0101",
    nombre: "Carlos Roberto Morales",
    parentesco: "Esposo",
    edad: 36,
    sexo: "M",
    fechaNacimiento: "1988-03-22",
    telefono: "5512-3456",
    estado: "Activo",
    ultimaVisita: "2025-05-10",
  },
  {
    id: 3,
    dpi: "En trámite",
    nombre: "Ana Sofía Morales García",
    parentesco: "Hija",
    edad: 12,
    sexo: "F",
    fechaNacimiento: "2012-11-08",
    telefono: "5512-3456",
    estado: "Activo",
    ultimaVisita: "2025-05-12",
  },
  {
    id: 4,
    dpi: "En trámite",
    nombre: "Pedro José Morales García",
    parentesco: "Hijo",
    edad: 8,
    sexo: "M",
    fechaNacimiento: "2016-06-15",
    telefono: "5512-3456",
    estado: "Activo",
    ultimaVisita: "2025-05-14",
  },
]

const eventosRecientes = [
  {
    fecha: "2025-05-15",
    miembro: "María Elena Morales García",
    evento: "Vacuna COVID-19 (Refuerzo)",
    modulo: "Vacunación",
    responsable: "Enf. Ana López",
  },
  {
    fecha: "2025-05-14",
    miembro: "Pedro José Morales García",
    evento: "Control Infantil - Evaluación Nutricional",
    modulo: "Nutrición",
    responsable: "Aux. Carlos Méndez",
  },
  {
    fecha: "2025-05-12",
    miembro: "Ana Sofía Morales García",
    evento: "Control Escolar",
    modulo: "Vacunación",
    responsable: "Enf. María García",
  },
  {
    fecha: "2025-05-10",
    miembro: "Carlos Roberto Morales",
    evento: "Evaluación Adulto",
    modulo: "Nutrición",
    responsable: "Enf. Ana López",
  },
]

export default function FamiliaDetallePage() {
  const getEstadoBadge = (estado: string) => {
    return estado === "Activo" ? (
      <Badge className="bg-green-100 text-green-800">Activo</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800">Inactivo</Badge>
    )
  }

  const getModuloBadge = (modulo: string) => {
    const colors: { [key: string]: string } = {
      Vacunación: "bg-purple-100 text-purple-800",
      Nutrición: "bg-orange-100 text-orange-800",
      "Salud Reproductiva": "bg-pink-100 text-pink-800",
      Epidemiología: "bg-red-100 text-red-800",
    }
    return <Badge className={colors[modulo] || "bg-gray-100 text-gray-800"}>{modulo}</Badge>
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 flex items-center">
              <Users className="w-8 h-8 mr-3 text-blue-600" />
              Familia {familiaData.codigo}
            </h1>
            <p className="text-blue-600">Jefe de Familia: {familiaData.jefeFamilia}</p>
          </div>
          <div className="flex gap-2">
            <Link href={`/viviendas/${familiaData.codigoVivienda}`}>
              <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
                <Home className="w-4 h-4 mr-2" />
                Ver Vivienda
              </Button>
            </Link>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Edit className="w-4 h-4 mr-2" />
              Editar Familia
            </Button>
          </div>
        </div>

        {/* Información General */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-blue-200 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-blue-900">Información General</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-blue-900">Código Familia</label>
                  <p className="font-mono text-lg">{familiaData.codigo}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-900">Total Integrantes</label>
                  <p className="text-lg font-semibold">{familiaData.totalIntegrantes} personas</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-900">Jefe de Familia</label>
                  <p className="font-semibold">{familiaData.jefeFamilia}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-900">Teléfono</label>
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <p>{familiaData.telefono}</p>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-blue-900">Dirección</label>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <p>{familiaData.direccion}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-900">Código Vivienda</label>
                  <Link href={`/viviendas/${familiaData.codigoVivienda}`} className="text-blue-600 hover:underline">
                    {familiaData.codigoVivienda}
                  </Link>
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-900">Ubicación</label>
                  <p>
                    {familiaData.territorio} - {familiaData.sector}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Estado y Registro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-blue-900">Estado</label>
                <div className="mt-1">{getEstadoBadge(familiaData.estado)}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-blue-900">Fecha Registro</label>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <p className="text-sm">{familiaData.fechaRegistro}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-blue-900">Última Actualización</label>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <p className="text-sm">{familiaData.ultimaActualizacion}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Miembros de la Familia */}
        <Card className="border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-blue-900">Miembros de la Familia</CardTitle>
                <CardDescription>Registro de todos los integrantes del núcleo familiar</CardDescription>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Miembro
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-blue-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-50">
                    <TableHead className="text-blue-900 font-semibold">DPI</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Nombre Completo</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Parentesco</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Edad/Sexo</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Fecha Nacimiento</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Estado</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Última Visita</TableHead>
                    <TableHead className="text-blue-900 font-semibold">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {miembrosFamilia.map((miembro) => (
                    <TableRow key={miembro.id} className="hover:bg-blue-50/50">
                      <TableCell className="font-mono text-sm">{miembro.dpi}</TableCell>
                      <TableCell>
                        <Link href={`/personas/${miembro.id}`} className="font-medium text-blue-600 hover:underline">
                          {miembro.nombre}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{miembro.parentesco}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{miembro.edad} años</span>
                          <Badge variant={miembro.sexo === "F" ? "secondary" : "outline"} className="text-xs">
                            {miembro.sexo}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{miembro.fechaNacimiento}</TableCell>
                      <TableCell>{getEstadoBadge(miembro.estado)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-blue-600" />
                          <span className="text-sm">{miembro.ultimaVisita}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Link href={`/personas/${miembro.id}`}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Eventos Recientes */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Eventos Clínicos Recientes</CardTitle>
            <CardDescription>Últimas atenciones médicas de los miembros de la familia</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventosRecientes.map((evento, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-blue-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-blue-900">{evento.evento}</h4>
                      {getModuloBadge(evento.modulo)}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{evento.miembro}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
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
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
