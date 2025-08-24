"use client"
import { useState } from "react"
import { TerritorioSelector } from "@/components/sectorizacion/TerritorioSelector"
import { SectoresView } from "@/components/sectorizacion/SectoresView"
import { TerritoriosTable } from "@/components/sectorizacion/TerritoriosTable"
import { SectoresAdminTable } from "@/components/sectorizacion/SectoresAdminTable"
import { Layout } from "@/components/layout"

export default function SectorizacionPage() {
  const [territorioId, setTerritorioId] = useState<number | null>(null)
  const [tab, setTab] = useState<'sectores' | 'territorios'>('sectores')

  return (
      <Layout>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <TerritorioSelector value={territorioId} onChange={setTerritorioId} />
            <div className="flex items-center gap-2">
              <button
                className={`px-3 py-2 rounded-lg border text-sm font-medium transition ${tab==='sectores' ? 'bg-blue-600 text-white border-blue-600' : 'bg-background hover:bg-muted'}`}
                onClick={() => setTab('sectores')}
              >
                Ver sectores
              </button>
              <button
                className={`px-3 py-2 rounded-lg border text-sm font-medium transition ${tab==='territorios' ? 'bg-blue-600 text-white border-blue-600' : 'bg-background hover:bg-muted'}`}
                onClick={() => setTab('territorios')}
              >
                Ver territorios
              </button>
            </div>
          </div>

          {tab === 'sectores' ? (
            <SectoresView territorioId={territorioId} />
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
