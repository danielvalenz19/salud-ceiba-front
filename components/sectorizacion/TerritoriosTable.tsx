"use client"
import { useState } from "react"
import { useSectoresByTerritorio, useTerritorios } from "@/hooks/use-sectorizacion"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

export function TerritoriosTable() {
  const { data = [], isLoading, error } = useTerritorios()
  const [open, setOpen] = useState(false)
  const [sel, setSel] = useState<any | null>(null)
  const sectorsQ = useSectoresByTerritorio(sel?.territorio_id, true)

  if (isLoading) return <div>Cargando territorios…</div>
  if (error) return <div className="text-red-600">Error al cargar territorios.</div>

  return (
    <div className="border rounded-xl shadow-sm overflow-hidden bg-background">
      <div className="px-4 py-3 bg-muted/40 border-b">
        <h3 className="font-medium">Territorios</h3>
      </div>
      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/30">
            <tr>
              <th className="p-2 text-left">#</th>
              <th className="p-2 text-left">Código</th>
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-left">ID</th>
            </tr>
          </thead>
          <tbody>
            {data.map((t: any, i: number) => (
              <tr
                key={t.territorio_id}
                className="border-t hover:bg-muted/40 cursor-pointer"
                onClick={() => { setSel(t); setOpen(true) }}
              >
                <td className="p-2">{i + 1}</td>
                <td className="p-2">{t.codigo ?? '—'}</td>
                <td className="p-2">{t.nombre}</td>
                <td className="p-2">{t.territorio_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="sm:max-w-2xl">
          <SheetHeader>
            <SheetTitle>Sectores de {sel?.nombre}</SheetTitle>
          </SheetHeader>
          <div className="px-4">
            {sectorsQ.isLoading ? (
              <div>Cargando…</div>
            ) : sectorsQ.error ? (
              <div className="text-red-600">No se pudo cargar.</div>
            ) : (
              <div className="overflow-auto border rounded">
                <table className="min-w-full text-sm">
                  <thead className="bg-muted/30">
                    <tr>
                      <th className="p-2 text-left">#</th>
                      <th className="p-2 text-left">Nombre</th>
                      <th className="p-2 text-left">Lat/Lng</th>
                      <th className="p-2 text-left">Viviendas</th>
                      <th className="p-2 text-left">Cobertura HB</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(sectorsQ.data ?? []).map((s: any, i: number) => (
                      <tr key={s.sector_id} className="border-t">
                        <td className="p-2">{i + 1}</td>
                        <td className="p-2">{s.nombre}</td>
                        <td className="p-2">{s.referencia_lat ?? '—'}, {s.referencia_lng ?? '—'}</td>
                        <td className="p-2">{s.viviendas ?? '—'}</td>
                        <td className="p-2">{s.hb_coverage != null ? s.hb_coverage + '%' : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
