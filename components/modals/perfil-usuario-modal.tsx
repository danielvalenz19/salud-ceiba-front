"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Save, X, Lock } from "lucide-react"

interface PerfilUsuarioModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PerfilUsuarioModal({ open, onOpenChange }: PerfilUsuarioModalProps) {
  const [perfilData, setPerfilData] = useState({
    nombre: "Dr. María González",
    email: "maria.gonzalez@salud.gob.gt",
    telefono: "5512-3456",
    cargo: "Directora Médica",
    territorio: "Todos",
  })

  const [configuracion, setConfiguracion] = useState({
    notificacionesEmail: true,
    notificacionesPush: true,
    alertasStock: true,
    alertasCalidad: false,
    modoOscuro: false,
    idiomaInterfaz: "es",
  })

  const [seguridad, setSeguridad] = useState({
    passwordActual: "",
    passwordNuevo: "",
    passwordConfirmar: "",
    autenticacion2FA: false,
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleGuardarPerfil = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    alert("Perfil actualizado correctamente")
    setIsLoading(false)
  }

  const handleGuardarConfiguracion = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    alert("Configuración guardada correctamente")
    setIsLoading(false)
  }

  const handleCambiarPassword = async () => {
    if (seguridad.passwordNuevo !== seguridad.passwordConfirmar) {
      alert("Las contraseñas no coinciden")
      return
    }
    if (seguridad.passwordNuevo.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres")
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    alert("Contraseña cambiada correctamente")
    setSeguridad({
      ...seguridad,
      passwordActual: "",
      passwordNuevo: "",
      passwordConfirmar: "",
    })
    setIsLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-900">
            <User className="w-5 h-5" />
            Mi Perfil
          </DialogTitle>
          <DialogDescription>Gestiona tu información personal, configuración y seguridad</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="perfil" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
            <TabsTrigger value="configuracion">Configuración</TabsTrigger>
            <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
          </TabsList>

          <TabsContent value="perfil" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-blue-900">Información Personal</CardTitle>
                <CardDescription>Actualiza tu información de perfil</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nombre">Nombre Completo</Label>
                    <Input
                      id="nombre"
                      value={perfilData.nombre}
                      onChange={(e) => setPerfilData({ ...perfilData, nombre: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={perfilData.email}
                      onChange={(e) => setPerfilData({ ...perfilData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      value={perfilData.telefono}
                      onChange={(e) => setPerfilData({ ...perfilData, telefono: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cargo">Cargo</Label>
                    <Input
                      id="cargo"
                      value={perfilData.cargo}
                      onChange={(e) => setPerfilData({ ...perfilData, cargo: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label>Territorio Asignado</Label>
                  <div className="mt-2">
                    <Badge className="bg-blue-100 text-blue-800">{perfilData.territorio}</Badge>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleGuardarPerfil} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? "Guardando..." : "Guardar Cambios"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="configuracion" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-blue-900">Notificaciones</CardTitle>
                <CardDescription>Configura cómo quieres recibir notificaciones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificaciones por Email</Label>
                    <p className="text-sm text-gray-600">Recibir notificaciones importantes por correo</p>
                  </div>
                  <Switch
                    checked={configuracion.notificacionesEmail}
                    onCheckedChange={(checked) => setConfiguracion({ ...configuracion, notificacionesEmail: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificaciones Push</Label>
                    <p className="text-sm text-gray-600">Notificaciones en tiempo real en el navegador</p>
                  </div>
                  <Switch
                    checked={configuracion.notificacionesPush}
                    onCheckedChange={(checked) => setConfiguracion({ ...configuracion, notificacionesPush: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Alertas de Stock</Label>
                    <p className="text-sm text-gray-600">Notificar cuando hay stock crítico</p>
                  </div>
                  <Switch
                    checked={configuracion.alertasStock}
                    onCheckedChange={(checked) => setConfiguracion({ ...configuracion, alertasStock: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Alertas de Calidad</Label>
                    <p className="text-sm text-gray-600">Notificar problemas de calidad de datos</p>
                  </div>
                  <Switch
                    checked={configuracion.alertasCalidad}
                    onCheckedChange={(checked) => setConfiguracion({ ...configuracion, alertasCalidad: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-blue-900">Preferencias de Interfaz</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Modo Oscuro</Label>
                    <p className="text-sm text-gray-600">Usar tema oscuro en la interfaz</p>
                  </div>
                  <Switch
                    checked={configuracion.modoOscuro}
                    onCheckedChange={(checked) => setConfiguracion({ ...configuracion, modoOscuro: checked })}
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleGuardarConfiguracion}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? "Guardando..." : "Guardar Configuración"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seguridad" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-blue-900">Cambiar Contraseña</CardTitle>
                <CardDescription>Actualiza tu contraseña de acceso</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="passwordActual">Contraseña Actual</Label>
                  <Input
                    id="passwordActual"
                    type="password"
                    value={seguridad.passwordActual}
                    onChange={(e) => setSeguridad({ ...seguridad, passwordActual: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="passwordNuevo">Nueva Contraseña</Label>
                  <Input
                    id="passwordNuevo"
                    type="password"
                    value={seguridad.passwordNuevo}
                    onChange={(e) => setSeguridad({ ...seguridad, passwordNuevo: e.target.value })}
                    placeholder="Mínimo 6 caracteres"
                  />
                </div>

                <div>
                  <Label htmlFor="passwordConfirmar">Confirmar Nueva Contraseña</Label>
                  <Input
                    id="passwordConfirmar"
                    type="password"
                    value={seguridad.passwordConfirmar}
                    onChange={(e) => setSeguridad({ ...seguridad, passwordConfirmar: e.target.value })}
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleCambiarPassword}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    {isLoading ? "Cambiando..." : "Cambiar Contraseña"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-blue-900">Autenticación de Dos Factores</CardTitle>
                <CardDescription>Agrega una capa extra de seguridad a tu cuenta</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Activar 2FA</Label>
                    <p className="text-sm text-gray-600">Requiere código adicional al iniciar sesión</p>
                  </div>
                  <Switch
                    checked={seguridad.autenticacion2FA}
                    onCheckedChange={(checked) => {
                      setSeguridad({ ...seguridad, autenticacion2FA: checked })
                      if (checked) {
                        alert("Se enviará un código QR a tu email para configurar 2FA")
                      }
                    }}
                  />
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
        </div>
      </DialogContent>
    </Dialog>
  )
}
