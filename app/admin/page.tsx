"use client"

import { useEffect, useMemo, useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Edit, Trash2, Plus } from "lucide-react"
import NuevoUsuarioModal from "@/components/modals/nuevo-usuario-modal"
import EditarUsuarioModal from "@/components/modals/editar-usuario-modal"
import { listUsers, listRoles, createUser, getUser, updateUser, deleteUser, type User, type Role } from "@/lib/users"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const router = useRouter()

  // --- state
  const [usuarios, setUsuarios] = useState<User[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [loadingUsuarios, setLoadingUsuarios] = useState(false)
  const [loadingRoles, setLoadingRoles] = useState(false)
  const [errorUsuarios, setErrorUsuarios] = useState<string | null>(null)
  const [errorRoles, setErrorRoles] = useState<string | null>(null)

  const [showNuevoModal, setShowNuevoModal] = useState(false)
  const [showEditarModal, setShowEditarModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // --- helpers
  const rolesMap = useMemo(() => {
    const m = new Map<number, string>()
    roles.forEach((r) => m.set(r.role_id, r.name))
    return m
  }, [roles])

  // --- loaders
  async function cargarUsuarios() {
    setLoadingUsuarios(true)
    setErrorUsuarios(null)
    try {
      const data = await listUsers({ page: 1, limit: 50 })
      const rows: User[] = Array.isArray(data?.data) ? data.data : Array.isArray(data?.rows) ? data.rows : data
      setUsuarios(rows || [])
    } catch (e: any) {
      setErrorUsuarios(e?.response?.data?.message || "No se pudo cargar usuarios.")
    } finally {
      setLoadingUsuarios(false)
    }
  }

  async function cargarRoles() {
    setLoadingRoles(true)
    setErrorRoles(null)
    try {
      const data = await listRoles()
      setRoles(data)
    } catch (e: any) {
      setErrorRoles(e?.response?.data?.message || "No se pudo cargar roles.")
    } finally {
      setLoadingRoles(false)
    }
  }

  useEffect(() => {
    cargarRoles()
    cargarUsuarios()
  }, [])

  // --- actions
  async function handleCrearUsuario(payload: { nombre: string; email: string; rol: string; password: string; persona_id?: number }) {
    // Crear usuario con nombre y rol según backend
    await createUser({
      nombre: payload.nombre,
      email: payload.email,
      rol: payload.rol,
      password: payload.password,
      persona_id: payload.persona_id,
    })
    await cargarUsuarios()
  }

  async function handleEditarClick(u: User) {
    const full = await getUser(u.user_id)
    setSelectedUser(full)
    setShowEditarModal(true)
  }

  async function handleGuardarEdicion(id: number, patch: Partial<User> & { password?: string }) {
    const payload = {
      ...patch,
      persona_id: patch.persona_id ?? undefined,
    }
    await updateUser(id, payload)
    setShowEditarModal(false)
    await cargarUsuarios()
  }

  async function handleVerUsuario(u: User) {
    const full = await getUser(u.user_id)
    if (full?.persona_id) {
      router.push(`/personas/${full.persona_id}`)
    } else {
      alert("Este usuario no está vinculado a una persona.")
    }
  }

  async function handleEliminar(u: User) {
    if (!confirm("¿Desactivar este usuario?")) return
    try {
      await deleteUser(u.user_id)
      await cargarUsuarios()
    } catch (e: any) {
      alert(e?.response?.data?.message || "No se pudo desactivar.")
    }
  }

  return (
    <Layout>
      <div className="p-6">
        <Card className="border-blue-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900">Administración: Usuarios y Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="usuarios">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
                <TabsTrigger value="roles">Roles & permisos</TabsTrigger>
              </TabsList>

              {/* ======= Usuarios ======= */}
              <TabsContent value="usuarios" className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-blue-700 font-medium">Gestión de usuarios</div>
                  <Button onClick={() => setShowNuevoModal(true)} className="bg-blue-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Usuario
                  </Button>
                </div>

                {errorUsuarios && <p className="text-red-600 mb-2">{errorUsuarios}</p>}
                {loadingUsuarios ? (
                  <p className="text-blue-600">Cargando usuarios…</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Correo</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead>Activo</TableHead>
                        <TableHead>Creado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usuarios.map((u) => (
                        <TableRow key={u.user_id}>
                          <TableCell>{u.user_id}</TableCell>
                          <TableCell>{u.email}</TableCell>
                          <TableCell>{rolesMap.get(u.role_id) || u.role_id}</TableCell>
                          <TableCell>{u.activo ? "Sí" : "No"}</TableCell>
                          <TableCell>{u.created_at?.slice(0, 10) ?? "-"}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50" onClick={() => handleVerUsuario(u)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50" onClick={() => handleEditarClick(u)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:bg-red-50" onClick={() => handleEliminar(u)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>

              {/* ======= Roles ======= */}
              <TabsContent value="roles" className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-blue-700 font-medium">Roles del sistema</div>
                  <Button disabled className="opacity-60 cursor-not-allowed">
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Rol (próximamente)
                  </Button>
                </div>
                {errorRoles && <p className="text-red-600 mb-2">{errorRoles}</p>}
                {loadingRoles ? (
                  <p className="text-blue-600">Cargando roles…</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {roles.map((r) => (
                        <TableRow key={r.role_id}>
                          <TableCell>{r.role_id}</TableCell>
                          <TableCell>{r.name}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="sm" disabled className="h-8 w-8 p-0 opacity-50">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" disabled className="h-8 w-8 p-0 opacity-50">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Modales */}
      <NuevoUsuarioModal open={showNuevoModal} onOpenChange={setShowNuevoModal} roles={roles} onSave={handleCrearUsuario} />
      <EditarUsuarioModal open={showEditarModal} onOpenChange={setShowEditarModal} roles={roles} user={selectedUser} onSave={handleGuardarEdicion} />
    </Layout>
  )
}
