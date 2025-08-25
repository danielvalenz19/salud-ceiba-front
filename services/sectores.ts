import { api } from "@/lib/api"

/** ===== Tipos del backend ===== */
export type ApiMeta = { page: number; limit: number; total: number }

export type SectorBasic = {
  sector_id: number
  nombre: string
  territorio_id: number
  referencia_lat: number | null
  referencia_lng: number | null
}

export type SectorListResp = { meta: ApiMeta; data: SectorBasic[] }

export type SectorStats = {
  sector_id: number
  nombre: string
  territorio_id: number
  referencia_lat: number | null
  referencia_lng: number | null
  viviendas: number
  personas: number
  hb_coverage: number | null
}

export type ViviendaRow = {
  vivienda_id: number
  codigo_familia: string
  personas: number
  lat?: number | null
  lng?: number | null
}

export type ViviendasPorSector = {
  meta: ApiMeta
  sector: { sector_id: number }
  data: ViviendaRow[]
}

export type CreateSectorDTO = {
  territorio_id: number
  nombre: string
  referencia_lat: number
  referencia_lng: number
}

export type UpdateSectorDTO = Partial<{
  nombre: string
  referencia_lat: number
  referencia_lng: number
}>

/** ===== Servicios REST ===== */

/** GET /sectores */
export async function listSectores(params: { page?: number; limit?: number; territorio_id?: number }) {
  const { data } = await api.get<SectorListResp>("/sectores", { params })
  return data
}

/** POST /sectores */
export async function createSector(payload: CreateSectorDTO) {
  const { data } = await api.post<{ sector_id: number }>("/sectores", payload)
  return data.sector_id
}

/** GET /sectores/:id */
export async function getSector(sectorId: number) {
  const { data } = await api.get<SectorStats>(`/sectores/${sectorId}`)
  return data
}

/** PUT /sectores/:id */
export async function updateSector(sectorId: number, payload: UpdateSectorDTO) {
  await api.put(`/sectores/${sectorId}`, payload)
}

/** DELETE /sectores/:id */
export async function deleteSector(sectorId: number) {
  await api.delete(`/sectores/${sectorId}`)
}

/** GET /sectores/:id/viviendas */
export async function listViviendasPorSector(
  sectorId: number,
  params: { page?: number; limit?: number; withGPS?: boolean } = {},
) {
  const { data } = await api.get<ViviendasPorSector>(`/sectores/${sectorId}/viviendas`, { params })
  return data
}
