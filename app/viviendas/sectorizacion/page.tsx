"use client"
import { useState } from "react"
import { TerritorioSelector } from "@/components/sectorizacion/TerritorioSelector"
import { TerritoriosTable } from "@/components/sectorizacion/TerritoriosTable"
import { SectoresAdminTable } from "@/components/sectorizacion/SectoresAdminTable"
import { SectoresTable } from "@/components/sectorizacion/SectoresTable"
import { SectorMap } from "@/components/sectorizacion/SectorMap"
import { useSectoresByTerritorio } from "@/hooks/use-sectorizacion"
import { Button } from "@/components/ui/button"
import { Map, Layers } from "lucide-react"
import { Layout } from "@/components/layout"

export default function SectorizacionPage() {
  const [territorioId, setTerritorioId] = useState<number | null>(null)
  const [tab, setTab] = useState<'sectores' | 'territorios'>('sectores')
  const [selectedSectorId, setSelectedSectorId] = useState<number | null>(null)
  const { data: sectores = [], isLoading } = useSectoresByTerritorio(territorioId || undefined, true)

  return (
      <Layout>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <TerritorioSelector value={territorioId} onChange={setTerritorioId} />
            <div className="flex items-center gap-2">
              <Button aria-label="Ver sectores" variant={tab==='sectores' ? 'default' : 'outline'} onClick={() => setTab('sectores')}>
                <Map className="size-4" /> Ver sectores
              </Button>
              <Button aria-label="Ver territorios" variant={tab==='territorios' ? 'default' : 'outline'} onClick={() => setTab('territorios')}>
                <Layers className="size-4" /> Ver territorios
              </Button>
            </div>
          </div>

          {tab === 'sectores' ? (
            territorioId ? (
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 lg:col-span-5">
                  <SectoresTable
                    sectores={sectores}
                    selectedId={selectedSectorId}
                    onSelect={(s) => setSelectedSectorId(s.sector_id)}
                  />
                </div>
                <div className="col-span-12 lg:col-span-7">
                  <div className="border rounded-2xl shadow-sm overflow-hidden bg-background">
                    <div className="px-4 py-3 bg-muted/40 border-b">
                      <h3 className="font-medium">Mapa</h3>
                    </div>
                    <div className="p-0">
                      <SectorMap
                        sectores={sectores}
                        selectedId={selectedSectorId}
                        onMarkerClick={(id) => setSelectedSectorId(id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm opacity-70">Selecciona un territorio.</div>
            )
          ) : (
            <TerritoriosTable />
          )}

          <div className="pt-4">
            <SectoresAdminTable />
          </div>
        </div>
      </Layout>
  )
}
