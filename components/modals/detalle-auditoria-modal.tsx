"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, Calendar, User, Monitor, Database, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

interface DetalleAuditoriaModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  evento: any
}

export function DetalleAuditoriaModal({ open, onOpenChange, evento }: DetalleAuditoriaModalProps) {
  if (!evento) return null

  const detallesEvento = {
    id: evento.id,
    timestamp: "2025-05-15 14:32:15",
    usuario: "Dr. María González",
    accion: evento.accion,
    modulo: evento.modulo,
    ip: "192.168.1.45",
    navegador: "Chrome 125.0.0.0",
    sistemaOperativo: "Windows 10",
    sesionId: "sess_abc123def456",
    duracionSesion: "2h 15m",
    resultado: evento.resultado,
    detallesAdicionales: {
      registroAfectado: "Persona ID: 2547",
      camposModificados: ["nombre", "telefono", "direccion"],
      valoresAnteriores: {
        nombre: "María Elena Morales",
        telefono: "9876-5432",
        direccion: "Zona 1, Guatemala",
      },
      valoresNuevos: {
        nombre: "María Elena Morales García",
        telefono: "9876-5432",
        direccion: "Zona 1, Sector A, Guatemala",
      },
    },
  }

  const getResultadoBadge = (resultado: string) => {
    switch (resultado) {
      case "Exitoso":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Exitoso
          </Badge>
        )
      case "Fallido":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Fallido
          </Badge>
        )
      case "Advertencia":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Advertencia
          </Badge>
        )
      default:
        return <Badge variant="secondary">{resultado}</Badge>
    }
  }

  const getRiesgoNivel = (accion: string) => {
    const accionesAltoRiesgo = ["Eliminar", "Modificar Datos Críticos", "Cambio de Permisos"]
    const accionesMedioRiesgo = ["Actualizar", "Crear Usuario", "Exportar Datos"]

    if (accionesAltoRiesgo.some((a) => accion.includes(a))) {
      return <Badge className="bg-red-100 text-red-800">Alto Riesgo</Badge>
    } else if (accionesMedioRiesgo.some((a) => accion.includes(a))) {
      return <Badge className="bg-yellow-100 text-yellow-800">Medio Riesgo</Badge>
    } else {
      return <Badge className="bg-green-100 text-green-800">Bajo Riesgo</Badge>
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-900">
            <Shield className="w-5 h-5" />
            Detalle del Evento de Auditoría
          </DialogTitle>
          <DialogDescription>Información completa del evento registrado en el sistema</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información General del Evento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Información del Evento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <p className="text-sm font-medium text-blue-600">ID del Evento:</p>
                    <p className="font-mono text-sm">{detallesEvento.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-600">Fecha y Hora:</p>
                    <p className="text-sm">{detallesEvento.timestamp}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-600">Acción Realizada:</p>
                    <Badge variant="outline" className="mt-1">
                      {detallesEvento.accion}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-600">Módulo:</p>
                    <Badge variant="outline" className="mt-1">
                      {detallesEvento.modulo}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-600">Resultado:</p>
                    <div className="mt-1">{getResultadoBadge(detallesEvento.resultado)}</div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-600">Nivel de Riesgo:</p>
                    <div className="mt-1">{getRiesgoNivel(detallesEvento.accion)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Información del Usuario
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Usuario:</p>
                    <p className="text-sm font-semibold">{detallesEvento.usuario}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-600">ID de Sesión:</p>
                    <p className="font-mono text-xs">{detallesEvento.sesionId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-600">Duración de Sesión:</p>
                    <p className="text-sm">{detallesEvento.duracionSesion}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-600">Dirección IP:</p>
                    <p className="font-mono text-sm">{detallesEvento.ip}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-600">Navegador:</p>
                    <p className="text-sm">{detallesEvento.navegador}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-600">Sistema Operativo:</p>
                    <p className="text-sm">{detallesEvento.sistemaOperativo}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detalles de la Modificación */}
          {detallesEvento.detallesAdicionales && (
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Detalles de la Modificación
                </CardTitle>
                <CardDescription>Información específica sobre los cambios realizados</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-blue-600">Registro Afectado:</p>
                  <p className="text-sm font-mono">{detallesEvento.detallesAdicionales.registroAfectado}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600">Campos Modificados:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {detallesEvento.detallesAdicionales.camposModificados.map((campo, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {campo}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Tabla de Comparación */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-blue-600">Comparación de Valores:</p>
                  <div className="rounded-md border border-blue-200">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-blue-50">
                          <TableHead className="text-blue-900 font-semibold">Campo</TableHead>
                          <TableHead className="text-blue-900 font-semibold">Valor Anterior</TableHead>
                          <TableHead className="text-blue-900 font-semibold">Valor Nuevo</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.keys(detallesEvento.detallesAdicionales.valoresAnteriores).map((campo) => (
                          <TableRow key={campo} className="hover:bg-blue-50/50">
                            <TableCell className="font-medium">{campo}</TableCell>
                            <TableCell className="text-red-600 font-mono text-sm">
                              {detallesEvento.detallesAdicionales.valoresAnteriores[campo]}
                            </TableCell>
                            <TableCell className="text-green-600 font-mono text-sm">
                              {detallesEvento.detallesAdicionales.valoresNuevos[campo]}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Información Técnica */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                Información Técnica
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-blue-600">Hash del Evento:</p>
                  <p className="font-mono text-xs bg-gray-100 p-2 rounded">
                    sha256:a1b2c3d4e5f6789012345678901234567890abcdef
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-blue-600">Checksum de Integridad:</p>
                  <p className="font-mono text-xs bg-gray-100 p-2 rounded">md5:9876543210abcdef1234567890abcdef</p>
                </div>
              </div>
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Integridad del registro verificada correctamente
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botones de Acción */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex gap-2">
              <Button variant="outline" className="border-blue-200 text-blue-700 bg-transparent">
                <Shield className="w-4 h-4 mr-2" />
                Generar Reporte
              </Button>
              <Button variant="outline" className="border-blue-200 text-blue-700 bg-transparent">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Marcar como Revisado
              </Button>
            </div>
            <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
