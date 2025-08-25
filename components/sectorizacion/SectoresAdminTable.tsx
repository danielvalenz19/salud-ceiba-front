"use client"
import { useMemo, useState } from "react"
import { useTerritorios, useSectoresPag } from "@/hooks/use-sectorizacion"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createSector } from "@/lib/api/sectorizacion"
import { AccionesSector } from "./AccionesSector"
import { toast } from "@/hooks/use-toast"

export function SectoresAdminTable() {
  const { data: territorios = [] } = useTerritorios()
  const [territorioId, setTerritorioId] = useState("")
  const [page, setPage] = useState(1)
  const limit = 20

  const filters = useMemo(() => ({ territorio_id: territorioId || undefined, page, limit }), [territorioId, page])
  const { data, isLoading, error } = useSectoresPag(filters)
  const rows = data?.data ?? []
  const total = data?.meta?.total ?? 0
  const pages = Math.max(1, Math.ceil(total / limit))

  const qc = useQueryClient()
  const [nuevo, setNuevo] = useState({ nombre: "", territorio_id: "", lat: "", lng: "" })
  const mCreate = useMutation({
    mutationFn: () => createSector({
      nombre: nuevo.nombre.trim(),
      territorio_id: Number(nuevo.territorio_id),
      referencia_lat: nuevo.lat ? Number(nuevo.lat) : undefined as any,
      referencia_lng: nuevo.lng ? Number(nuevo.lng) : undefined as any,
    }),
    onSuccess: () => {
      toast({ title: "Sector creado" })
      setNuevo({ nombre: "", territorio_id: String(territorioId || ""), lat: "", lng: "" })
      qc.invalidateQueries({ queryKey: ["sectoresPag"] })
      qc.invalidateQueries({ queryKey: ["sectoresByTerr"] })
    },
    onError: () => toast({ title: "No se pudo crear", variant: "destructive" as any }),
  })

  return (
    <div className="border rounded-xl shadow-sm overflow-hidden bg-background">
      <div className="px-4 py-3 bg-muted/40 border-b flex flex-wrap items-center gap-3">
        <h3 className="font-medium">Admin · Sectores</h3>
        <select
          className="border rounded p-1 text-sm bg-background"
          value={territorioId}
          onChange={(e) => { setPage(1); setTerritorioId(e.target.value) }}
        >
          <option value="">Todos los territorios</option>
          {territorios.map((t: any) => (
            <option key={t.territorio_id} value={t.territorio_id}>{t.nombre}</option>
          ))}
        </select>

        <div className="ml-auto flex items-center gap-2">
          <Input placeholder="Nombre del nuevo sector" className="w-52" value={nuevo.nombre} onChange={(e) => setNuevo(s => ({ ...s, nombre: e.target.value }))} />
          <select
            className="border rounded p-1 text-sm bg-background"
            value={nuevo.territorio_id}
            onChange={(e) => setNuevo(s => ({ ...s, territorio_id: e.target.value }))}
          >
            <option value="">Territorio</option>
            {territorios.map((t: any) => (
              <option key={t.territorio_id} value={t.territorio_id}>{t.nombre}</option>
            ))}
          </select>
          <Input placeholder="Lat" className="w-28" value={nuevo.lat} onChange={(e) => setNuevo(s => ({ ...s, lat: e.target.value }))} />
          <Input placeholder="Lng" className="w-28" value={nuevo.lng} onChange={(e) => setNuevo(s => ({ ...s, lng: e.target.value }))} />
          <Button size="sm" onClick={() => mCreate.mutate()} disabled={!nuevo.nombre || !nuevo.territorio_id || mCreate.isPending}>
            <Plus className="size-4" /> Nuevo sector
          </Button>
        </div>
      </div>
      {isLoading && <div className="p-3">Cargando…</div>}
      {error && <div className="p-3 text-red-600">Error (¿token?).</div>}
      {!isLoading && !error && (
        <>
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/30">
                <tr>
                  <th className="p-2 text-left">#</th>
                  <th className="p-2 text-left">Sector</th>
                  <th className="p-2 text-left">Territorio</th>
                  <th className="p-2 text-left">Ref. (lat,lng)</th>
                  <th className="p-2 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((s: any, i: number) => (
                  <tr key={s.sector_id} className="border-t">
                    <td className="p-2">{(page - 1) * limit + i + 1}</td>
                    <td className="p-2">{s.nombre}</td>
                    <td className="p-2">{s.territorio_id}</td>
                    <td className="p-2">{s.referencia_lat ?? '—'}, {s.referencia_lng ?? '—'}</td>
                    <td className="p-2">
                      <AccionesSector sector={s} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center gap-2 p-3 border-t">
            <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 border rounded disabled:opacity-50">←</button>
            <span className="text-sm">Página {page} de {pages}</span>
            <button disabled={page >= pages} onClick={() => setPage(p => Math.min(pages, p + 1))} className="px-3 py-1 border rounded disabled:opacity-50">→</button>
          </div>
        </>
      )}
    </div>
  )
}
