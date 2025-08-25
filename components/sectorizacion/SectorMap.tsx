"use client"
import { useEffect, useMemo, useRef } from "react"
import type * as L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Sector } from "@/lib/api/sectorizacion"

type Props = {
	sectores: Sector[]
	selectedId?: number | null
	onMarkerClick?: (id: number) => void
}

export function SectorMap({ sectores, selectedId, onMarkerClick }: Props) {
	const mapRef = useRef<L.Map | null>(null)
	const layerRef = useRef<L.LayerGroup | null>(null)

	// Lazy import leaflet on client
	const leafletPromise = useMemo(() => import("leaflet"), [])

	useEffect(() => {
		let cancelled = false
		;(async () => {
			const L = (await leafletPromise) as typeof import("leaflet")
			if (cancelled) return
			if (!mapRef.current) {
				mapRef.current = L.map("sector-map", { center: [14.62, -90.52], zoom: 11 })
				L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
					attribution: "&copy; OpenStreetMap",
				}).addTo(mapRef.current)
				layerRef.current = L.layerGroup().addTo(mapRef.current)
			}
		})()
		return () => { cancelled = true }
	}, [leafletPromise])

	useEffect(() => {
		let run = true
		;(async () => {
			const L = (await leafletPromise) as typeof import("leaflet")
			const map = mapRef.current
			const layer = layerRef.current
			if (!map || !layer || !run) return
			layer.clearLayers()
			const pts: L.LatLngExpression[] = []
			sectores.forEach((s) => {
				if (s.referencia_lat == null || s.referencia_lng == null) return
				const lat = Number(s.referencia_lat)
				const lng = Number(s.referencia_lng)
				const sel = selectedId === s.sector_id
				const marker = L.circleMarker([lat, lng], { radius: sel ? 9 : 6, weight: sel ? 3 : 1 })
					.on("click", () => onMarkerClick?.(s.sector_id))
					.bindTooltip(`${s.nombre}`, { permanent: false })
				marker.addTo(layer)
				pts.push([lat, lng])
			})
			if (pts.length) map.fitBounds(L.latLngBounds(pts).pad(0.2))
			else map.setView([14.62, -90.52], 11)
		})()
		return () => { run = false }
	}, [sectores, selectedId, leafletPromise, onMarkerClick])

	return <div id="sector-map" className="h-[480px] w-full" />
}

