"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Settings, Download, Eye } from "lucide-react"
import { DetalleAuditoriaModal } from "@/components/modals/detalle-auditoria-modal"
import { ConfigurarAuditoriaModal } from "@/components/modals/configurar-auditoria-modal"

const AuditoriaPage = () => {
  const [showDetalleAuditoria, setShowDetalleAuditoria] = useState(false)
  const [showConfigurarAuditoria, setShowConfigurarAuditoria] = useState(false)
  const [selectedEvento, setSelectedEvento] = useState<any>(null)

  const handleVerDetalle = (evento: any) => {
    setSelectedEvento(evento)
    setShowDetalleAuditoria(true)
  }

  const handleConfigurarAuditoria = (configData: any) => {
    console.log("Nueva configuración de auditoría:", configData)
    // Aquí iría la lógica para guardar la configuración
  }

  const handleExportarLogs = () => {
    console.log("Exportando logs de auditoría...")
    // Aquí iría la lógica de exportación
  }

  return (
    <div>
      <div className="flex items-center justify-between space-x-2">
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowConfigurarAuditoria(true)}>
          <Settings className="w-4 h-4 mr-2" />
          Configurar Auditoría
        </Button>
        <Button
          variant="outline"
          className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
          onClick={handleExportarLogs}
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar Logs
        </Button>
      </div>
      <div className="mt-4">
        {/* Tabla de auditorías */}
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4 border">Evento</th>
              <th className="p-4 border">Fecha</th>
              <th className="p-4 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Filas de eventos */}
            <tr>
              <td className="p-4 border">Evento 1</td>
              <td className="p-4 border">2023-10-01</td>
              <td className="p-4 border">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50"
                  onClick={() => handleVerDetalle({ id: 1, name: "Evento 1" })}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </td>
            </tr>
            {/* Más filas aquí */}
          </tbody>
        </table>
      </div>
      {/* Modales */}
      <DetalleAuditoriaModal
        open={showDetalleAuditoria}
        onOpenChange={setShowDetalleAuditoria}
        evento={selectedEvento}
      />

      <ConfigurarAuditoriaModal
        open={showConfigurarAuditoria}
        onOpenChange={setShowConfigurarAuditoria}
        onSave={handleConfigurarAuditoria}
      />
    </div>
  )
}

export default AuditoriaPage
