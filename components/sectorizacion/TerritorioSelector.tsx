"use client"
import { useTerritorios } from "@/hooks/use-sectorizacion"

export function TerritorioSelector({ value, onChange }: { value: number | null; onChange: (v: number | null) => void }) {
  const { data = [], isLoading, error } = useTerritorios()

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium">Territorio:</label>
      <select
        className="border rounded-md p-2 text-sm bg-background"
        disabled={isLoading || !!error}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
      >
        <option value="">Selecciona…</option>
        {data.map((t: any) => (
          <option key={t.territorio_id} value={t.territorio_id}>{t.nombre}</option>
        ))}
      </select>
      {isLoading && <span className="text-xs opacity-60">Cargando…</span>}
      {error && <span className="text-xs text-red-600">Error</span>}
    </div>
  )
}
