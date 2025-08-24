"use client"
import { useState, useEffect, useRef } from "react"
import { useSectoresByTerritorio } from "@/hooks/use-sectorizacion"
import * as L from "leaflet"
import "leaflet/dist/leaflet.css"

export function SectoresView({ territorioId }: { territorioId: number | null }) {
  const [seleccion, setSeleccion] = useState<any>(null)
  const { data: sectores = [], isLoading, error } = useSectoresByTerritorio(territorioId || undefined, true)

  if (!territorioId) return <div className="text-sm opacity-70">Selecciona un territorio.</div>
  if (isLoading) return <div>Cargando sectores…</div>
  if (error) return <div className="text-red-600">No se pudo cargar sectores.</div>

  const conCoord = sectores.filter((s: any) => s.referencia_lat != null && s.referencia_lng != null)
  const sinCoord = sectores.filter((s: any) => s.referencia_lat == null || s.referencia_lng == null)

  // Leaflet map setup
  const mapRef = useRef<L.Map | null>(null)
  const markersLayerRef = useRef<L.LayerGroup | null>(null)

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("sectores-map", { center: [14.62, -90.52], zoom: 11, zoomControl: true })
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap",
      }).addTo(mapRef.current)
      markersLayerRef.current = L.layerGroup().addTo(mapRef.current)
    }
  }, [])

  // Update markers when data changes
  useEffect(() => {
    const map = mapRef.current
    const layer = markersLayerRef.current
    if (!map || !layer) return
    layer.clearLayers()
    const latlngs: L.LatLngExpression[] = []
    conCoord.forEach((s: any) => {
      const lat = Number(s.referencia_lat)
      const lng = Number(s.referencia_lng)
      const marker = L.circleMarker([lat, lng], {
        radius: seleccion?.sector_id === s.sector_id ? 9 : 6,
        weight: seleccion?.sector_id === s.sector_id ? 3 : 1,
      })
        .on("click", () => setSeleccion(s))
        .bindPopup(`<div style='font-size:12px'><div style='font-weight:600'>${s.nombre}</div><div>Lat: ${lat}, Lng: ${lng}</div><div>Viviendas: ${s.viviendas ?? '—'}</div><div>Cobertura HB: ${s.hb_coverage != null ? s.hb_coverage + '%' : '—'}</div></div>`)        
      marker.addTo(layer)
      latlngs.push([lat, lng])
    })
    // Fit bounds
    if (latlngs.length > 0) {
      map.fitBounds(L.latLngBounds(latlngs).pad(0.2))
    } else {
      map.setView([14.62, -90.52], 11)
    }
  }, [conCoord, seleccion])

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="border rounded-xl shadow-sm overflow-hidden bg-background">
        <div className="px-4 py-3 bg-muted/40 border-b">
          <h3 className="font-medium">Sectores del territorio</h3>
        </div>
        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/30">
              <tr>
                <th className="p-2 text-left">#</th>
                <th className="p-2 text-left">Sector</th>
                <th className="p-2 text-left">Referencia</th>
                <th className="p-2 text-left">Viviendas</th>
                <th className="p-2 text-left">Cobertura HB</th>
              </tr>
            </thead>
            <tbody>
              {sectores.map((s: any, i: number) => {
                const hasCoord = s.referencia_lat != null && s.referencia_lng != null
                const isSelected = seleccion?.sector_id === s.sector_id
                return (
                  <tr
                    key={s.sector_id}
                    className={`border-t hover:bg-muted/40 cursor-pointer ${isSelected ? 'bg-primary/10' : ''}`}
                    onClick={() => setSeleccion(s)}
                  >
                    <td className="p-2">{i + 1}</td>
                    <td className="p-2">{s.nombre}</td>
                    <td className="p-2">
                      {hasCoord ? `${s.referencia_lat}, ${s.referencia_lng}` : (
                        <span className="px-2 py-0.5 text-xs rounded bg-yellow-100 text-yellow-700">Sin coordenadas</span>
                      )}
                    </td>
                    <td className="p-2">{s.viviendas ?? '—'}</td>
                    <td className="p-2">{s.hb_coverage != null ? `${s.hb_coverage}%` : '—'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {sinCoord.length > 0 && (
          <div className="px-4 py-2 text-xs text-amber-700 bg-amber-50 border-t">
            {sinCoord.length} sector(es) sin coordenadas (no aparecen en el mapa).
          </div>
        )}
      </div>

      <div className="border rounded-xl shadow-sm overflow-hidden bg-background">
        <div className="px-4 py-3 bg-muted/40 border-b">
          <h3 className="font-medium">Mapa de sectores (puntos)</h3>
        </div>
        <div id="sectores-map" className="h-[480px]" />
      </div>
    </div>
  )
}
