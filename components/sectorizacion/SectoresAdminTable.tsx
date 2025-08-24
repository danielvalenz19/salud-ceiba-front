"use client"
import { useState, useMemo } from "react"
import { useTerritorios, useSectoresPag } from "@/hooks/use-sectorizacion"

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

  return (
    <div className="border rounded-xl shadow-sm overflow-hidden bg-background">
      <div className="px-4 py-3 bg-muted/40 border-b flex items-center gap-3">
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
                </tr>
              </thead>
              <tbody>
                {rows.map((s: any, i: number) => (
                  <tr key={s.sector_id} className="border-t">
                    <td className="p-2">{(page - 1) * limit + i + 1}</td>
                    <td className="p-2">{s.nombre}</td>
                    <td className="p-2">{s.territorio_id}</td>
                    <td className="p-2">{s.referencia_lat ?? '—'}, {s.referencia_lng ?? '—'}</td>
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
