"use client"
import { useTerritorios } from "@/hooks/use-sectorizacion"

export function TerritoriosTable() {
  const { data = [], isLoading, error } = useTerritorios()

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
              <tr key={t.territorio_id} className="border-t hover:bg-muted/40">
                <td className="p-2">{i + 1}</td>
                <td className="p-2">{t.codigo ?? '—'}</td>
                <td className="p-2">{t.nombre}</td>
                <td className="p-2">{t.territorio_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
