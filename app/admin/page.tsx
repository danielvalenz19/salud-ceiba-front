"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Layout } from "@/components/layout"
import { NuevoUsuarioModal } from "@/components/modals/nuevo-usuario-modal"
import { DetallePersonaModal } from "@/components/modals/detalle-persona-modal"
import { Settings, Users, Shield, Plus, Edit, Trash2, Eye, Database, MapPin } from "lucide-react"
import { NuevoRolModal } from "@/components/modals/nuevo-rol-modal"
import { NuevoCatalogoModal } from "@/components/modals/nuevo-catalogo-modal"

const usuariosData = [
  {
    id: 1,
    nombre: "Dr. María González",
    email: "maria.gonzalez@salud.gob.gt",
    rol: "Administrador",
    territorio: "Todos",
    estado: "Activo",
    ultimoAcceso: "2025-05-15 14:32",
  },
  {
    id: 2,
    nombre: "Enf. Ana López",
    email: "ana.lopez@salud.gob.gt",
    rol: "Enfermera",
    territorio: "T1",
    estado: "Activo",
    ultimoAcceso: "2025-05-15 11:28",
  },
  {
    id: 3,
    nombre: "Aux. Carlos Méndez",
    email: "carlos.mendez@salud.gob.gt",
    rol: "Auxiliar",
    territorio: "T2",
    estado: "Activo",
    ultimoAcceso: "2025-05-15 09:15",
  },
  {
    id: 4,
    nombre: "Enf. María García",
    email: "maria.garcia@salud.gob.gt",
    rol: "Enfermera",
    territorio: "T1",
    estado: "Inactivo",
    ultimoAcceso: "2025-05-10 16:45",
  },
]

const rolesData = [
  {
    id: 1,
    nombre: "Administrador",
    descripcion: "Acceso completo al sistema",
    usuarios: 1,
    permisos: ["Crear", "Leer", "Actualizar", "Eliminar", "Administrar"],
  },
  {
    id: 2,
    nombre: "Enfermera",
    descripcion: "Acceso a módulos clínicos y registro",
    usuarios: 8,
    permisos: ["Crear", "Leer", "Actualizar"],
  },
  {
    id: 3,
    nombre: "Auxiliar",
    descripcion: "Acceso limitado a registro básico",
    usuarios: 12,
    permisos: ["Crear", "Leer"],
  },
  {
    id: 4,
    nombre: "Supervisor",
    descripcion: "Supervisión y reportes",
    usuarios: 3,
    permisos: ["Leer", "Reportes", "Supervisar"],
  },
]

const catalogosData = [
  {
    id: 1,
    nombre: "Territorios",
    descripcion: "Divisiones territoriales del distrito",
    registros: 5,
    ultimaActualizacion: "2025-01-15",
  },
  {
    id: 2,
    nombre: "Sectores",
    descripcion: "Sectores dentro de cada territorio",
    registros: 15,
    ultimaActualizacion: "2025-02-20",
  },
  {
    id: 3,
    nombre: "Tipos de Evento",
    descripcion: "Clasificación de eventos clínicos",
    registros: 24,
    ultimaActualizacion: "2025-03-10",
  },
  {
    id: 4,
    nombre: "Unidades de Medida",
    descripcion: "Unidades para inventario de insumos",
    registros: 12,
    ultimaActualizacion: "2025-01-30",
  },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("usuarios")
  const [usuarios, setUsuarios] = useState(usuariosData)
  const [showNuevoUsuarioModal, setShowNuevoUsuarioModal] = useState(false)
  const [showDetalleModal, setShowDetalleModal] = useState(false)
  const [selectedUsuario, setSelectedUsuario] = useState<any>(null)
  const [showNuevoRol, setShowNuevoRol] = useState(false)
  const [showNuevoCatalogo, setShowNuevoCatalogo] = useState(false)

  const getEstadoBadge = (estado: string) => {
    return estado === "Activo" ? (
      <Badge className="bg-green-100 text-green-800">Activo</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800">Inactivo</Badge>
    )
  }

  const getRolBadge = (rol: string) => {
    const colors: { [key: string]: string } = {
      Administrador: "bg-red-100 text-red-800",
      Enfermera: "bg-blue-100 text-blue-800",
      Auxiliar: "bg-green-100 text-green-800",
      Supervisor: "bg-purple-100 text-purple-800",
    }
    return <Badge className={colors[rol] || "bg-gray-100 text-gray-800"}>{rol}</Badge>
  }

  const handleNuevoUsuario = (userData: any) => {
    const nuevoUsuario = {
      id: usuarios.length + 1,
      nombre: userData.nombre,
      email: userData.email,
      rol: userData.rol,
      territorio: userData.territorio,
      estado: "Activo",
      ultimoAcceso: "Nunca",
    }
    setUsuarios([...usuarios, nuevoUsuario])
  }

  const handleVerDetalle = (usuario: any) => {
    setSelectedUsuario(usuario)
    setShowDetalleModal(true)
  }

  const handleEditarUsuario = (usuario: any) => {
    alert(`Editando usuario: ${usuario.nombre}`)
  }

  const handleEliminarUsuario = (usuario: any) => {
    if (confirm(`¿Está seguro de eliminar al usuario ${usuario.nombre}?`)) {
      setUsuarios(usuarios.filter((u) => u.id !== usuario.id))
    }
  }

  const handleEditarRol = (rol: any) => {
    alert(`Editando rol: ${rol.nombre}`)
  }

  const handleEliminarRol = (rol: any) => {
    if (confirm(`¿Está seguro de eliminar el rol ${rol.nombre}?`)) {
      alert(`Rol ${rol.nombre} eliminado`)
    }
  }

  const handleVerCatalogo = (catalogo: any) => {
    alert(`Mostrando registros del catálogo: ${catalogo.nombre}`)
  }

  const handleEditarCatalogo = (catalogo: any) => {
    alert(`Editando catálogo: ${catalogo.nombre}`)
  }

  const handleNuevoRol = (rolData: any) => {
    console.log("Nuevo rol:", rolData)
    // Aquí iría la lógica para guardar el rol
  }

  const handleNuevoCatalogo = (catalogoData: any) => {
    console.log("Nuevo catálogo:", catalogoData)
    // Aquí iría la lógica para guardar el catálogo
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 flex items-center">
              <Settings className="w-8 h-8 mr-3 text-blue-600" />
              Administración del Sistema
            </h1>
            <p className="text-blue-600">Gestión de usuarios, roles y configuración</p>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Usuarios Totales</p>
                  <p className="text-2xl font-bold text-blue-900">{usuarios.length}</p>
                  <p className="text-xs text-green-600">+2 este mes</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Usuarios Activos</p>
                  <p className="text-2xl font-bold text-green-600">
                    {usuarios.filter((u) => u.estado === "Activo").length}
                  </p>
                  <p className="text-xs text-green-600">
                    {Math.round((usuarios.filter((u) => u.estado === "Activo").length / usuarios.length) * 100)}%
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800">Online</Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Roles Definidos</p>
                  <p className="text-2xl font-bold text-purple-600">{rolesData.length}</p>
                  <p className="text-xs text-purple-600">Diferentes niveles</p>
                </div>
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Catálogos</p>
                  <p className="text-2xl font-bold text-orange-600">{catalogosData.length}</p>
                  <p className="text-xs text-orange-600">Configurados</p>
                </div>
                <Database className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
            <TabsTrigger value="roles">Roles & Permisos</TabsTrigger>
            <TabsTrigger value="catalogos">Catálogos</TabsTrigger>
          </TabsList>

          <TabsContent value="usuarios" className="space-y-6">
            <Card className="border-blue-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-blue-900">Gestión de Usuarios</CardTitle>
                    <CardDescription>Administración de cuentas de usuario del sistema</CardDescription>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowNuevoUsuarioModal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Usuario
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-blue-200">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-50">
                        <TableHead className="text-blue-900 font-semibold">Nombre</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Email</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Rol</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Territorio</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Estado</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Último Acceso</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usuarios.map((usuario) => (
                        <TableRow key={usuario.id} className="hover:bg-blue-50/50">
                          <TableCell className="font-medium">{usuario.nombre}</TableCell>
                          <TableCell className="text-sm">{usuario.email}</TableCell>
                          <TableCell>{getRolBadge(usuario.rol)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-blue-600" />
                              <span className="text-sm">{usuario.territorio}</span>
                            </div>
                          </TableCell>
                          <TableCell>{getEstadoBadge(usuario.estado)}</TableCell>
                          <TableCell className="text-sm">{usuario.ultimoAcceso}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50"
                                onClick={() => handleVerDetalle(usuario)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50"
                                onClick={() => handleEditarUsuario(usuario)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                                onClick={() => handleEliminarUsuario(usuario)}
                              >
                                <Trash2 className="w-4 h-4" />
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
          </TabsContent>

          <TabsContent value="roles" className="space-y-6">
            <Card className="border-blue-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg text-blue-900">Roles y Permisos</CardTitle>
                    <CardDescription>Configuración de roles y niveles de acceso</CardDescription>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowNuevoRol(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Rol
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {rolesData.map((rol) => (
                    <Card key={rol.id} className="border-blue-200">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg text-blue-900">{rol.nombre}</CardTitle>
                            <CardDescription>{rol.descripcion}</CardDescription>
                          </div>
                          <Badge variant="outline">{rol.usuarios} usuarios</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-medium text-blue-900 mb-2">Permisos:</h4>
                            <div className="flex flex-wrap gap-1">
                              {rol.permisos.map((permiso, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {permiso}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2 pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 border-blue-200 text-blue-700 bg-transparent"
                              onClick={() => handleEditarRol(rol)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-200 text-red-700 bg-transparent"
                              onClick={() => handleEliminarRol(rol)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="catalogos" className="space-y-6">
            <Card className="border-blue-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-blue-900">Catálogos del Sistema</CardTitle>
                    <CardDescription>Configuración de catálogos y datos maestros</CardDescription>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowNuevoCatalogo(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Catálogo
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-blue-200">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-50">
                        <TableHead className="text-blue-900 font-semibold">Nombre</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Descripción</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Registros</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Última Actualización</TableHead>
                        <TableHead className="text-blue-900 font-semibold">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {catalogosData.map((catalogo) => (
                        <TableRow key={catalogo.id} className="hover:bg-blue-50/50">
                          <TableCell className="font-medium">{catalogo.nombre}</TableCell>
                          <TableCell>{catalogo.descripcion}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{catalogo.registros} elementos</Badge>
                          </TableCell>
                          <TableCell className="text-sm">{catalogo.ultimaActualizacion}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50"
                                onClick={() => handleVerCatalogo(catalogo)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50"
                                onClick={() => handleEditarCatalogo(catalogo)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50"
                                onClick={() => handleVerCatalogo(catalogo)}
                              >
                                <Database className="w-4 h-4" />
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
          </TabsContent>
        </Tabs>

        {/* Modales */}
        <NuevoUsuarioModal
          open={showNuevoUsuarioModal}
          onOpenChange={setShowNuevoUsuarioModal}
          onSave={handleNuevoUsuario}
        />

        <DetallePersonaModal open={showDetalleModal} onOpenChange={setShowDetalleModal} persona={selectedUsuario} />

        {/* Modales adicionales */}
        <NuevoRolModal open={showNuevoRol} onOpenChange={setShowNuevoRol} onSave={handleNuevoRol} />

        <NuevoCatalogoModal open={showNuevoCatalogo} onOpenChange={setShowNuevoCatalogo} onSave={handleNuevoCatalogo} />
      </div>
    </Layout>
  )
}
