"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Eye } from "lucide-react"
import { NuevoInsumoModal } from "@/components/modals/nuevo-insumo-modal"
import { DetalleInsumoModal } from "@/components/modals/detalle-insumo-modal"
import { RegistrarMovimientoInventarioModal } from "@/components/modals/registrar-movimiento-inventario-modal"

const InventarioPage = () => {
  const [showNuevoInsumo, setShowNuevoInsumo] = useState(false)
  const [showDetalleInsumo, setShowDetalleInsumo] = useState(false)
  const [showRegistrarMovimiento, setShowRegistrarMovimiento] = useState(false)
  const [selectedInsumo, setSelectedInsumo] = useState<any>(null)

  const handleNuevoInsumo = (insumoData: any) => {
    console.log("Nuevo insumo:", insumoData)
    // Aquí iría la lógica para guardar el insumo
  }

  const handleVerDetalle = (insumo: any) => {
    setSelectedInsumo(insumo)
    setShowDetalleInsumo(true)
  }

  const handleRegistrarMovimiento = (movimientoData: any) => {
    console.log("Nuevo movimiento:", movimientoData)
    // Aquí iría la lógica para registrar el movimiento
  }

  return (
    <div>
      <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowNuevoInsumo(true)}>
        <Plus className="w-4 h-4 mr-2" />
        Nuevo Insumo
      </Button>

      {/* Tabla de inventario */}
      <div className="mt-4">
        {/* Aquí iría la tabla de inventario */}
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50"
            onClick={() => handleVerDetalle({ id: 1, nombre: "Insumo 1" })}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50"
            onClick={() => setShowRegistrarMovimiento(true)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Modales */}
      <NuevoInsumoModal open={showNuevoInsumo} onOpenChange={setShowNuevoInsumo} onSave={handleNuevoInsumo} />

      <DetalleInsumoModal open={showDetalleInsumo} onOpenChange={setShowDetalleInsumo} insumo={selectedInsumo} />

      <RegistrarMovimientoInventarioModal
        open={showRegistrarMovimiento}
        onOpenChange={setShowRegistrarMovimiento}
        onSave={handleRegistrarMovimiento}
      />
    </div>
  )
}

export default InventarioPage
