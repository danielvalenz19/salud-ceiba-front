import { api } from "../api"

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

// Tipos
export type Territorio = { territorio_id: number; codigo?: string; nombre: string }
export type Sector = {
	sector_id: number
	nombre: string
	territorio_id: number
	referencia_lat: number | null
	referencia_lng: number | null
	viviendas?: number | null
	personas?: number | null
	hb_coverage?: number | null
}
export type ViviendaRow = {
	vivienda_id: number
	codigo_familia: string
	personas: number
	lat?: number | null
	lng?: number | null
}

// Helpers
export async function getTerritorios() {
	const { data } = await api.get<Territorio[]>(`/territorios`)
	return data
}

export async function getSectores(params: { territorio_id?: number | string; page?: number; limit?: number } = {}) {
	const { data } = await api.get(`/sectores`, { params })
	return data as { meta?: any; data: Sector[] }
}

export async function getSector(id: number) {
	const { data } = await api.get<Sector>(`/sectores/${id}`)
	return data
}

export async function createSector(body: { territorio_id: number; nombre: string; referencia_lat?: number | null; referencia_lng?: number | null; }) {
	const { data } = await api.post<{ sector_id: number }>(`/sectores`, body)
	return data
}

export async function updateSector(
	id: number,
	patch: Partial<{ nombre: string; referencia_lat: number | null; referencia_lng: number | null }>,
) {
	const { data } = await api.put<Sector>(`/sectores/${id}`, patch)
	return data
}

export async function deleteSector(id: number) {
	const res = await api.delete(`/sectores/${id}`, { validateStatus: () => true })
	if (res.status === 204) return { ok: true }
	return res.data
}

export async function getViviendasBySector(id: number, opts: { page?: number; limit?: number; withGPS?: boolean } = {}) {
	const { data } = await api.get(`/sectores/${id}/viviendas`, { params: opts })
	return data as { meta?: any; data: ViviendaRow[]; sector?: Sector }
}

export async function getSectoresByTerritorio(territorioId: number, includeStats = true) {
	const { data } = await api.get<Sector[]>(`/territorios/${territorioId}/sectores`, { params: { includeStats } })
	return data
}

