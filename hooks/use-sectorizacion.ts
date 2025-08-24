"use client"

import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"

// Fetchers
async function fetchTerritorios() {
  const { data } = await api.get("/territorios")
  return data
}

async function fetchSectoresByTerritorio(territorioId: number, includeStats = true) {
  const { data } = await api.get(`/territorios/${territorioId}/sectores`, { params: { includeStats } })
  return data
}

async function fetchSectoresPage(params: { territorio_id?: number | string; page?: number; limit?: number }) {
  const { territorio_id, page = 1, limit = 20 } = params || {}
  const { data } = await api.get("/sectores", { params: { territorio_id, page, limit } })
  return data
}

// Hooks
export function useTerritorios() {
  return useQuery({ queryKey: ["territorios"], queryFn: fetchTerritorios, staleTime: 5 * 60 * 1000 })
}

export function useSectoresByTerritorio(territorioId?: number | null, includeStats = true) {
  return useQuery({
    queryKey: ["sectoresByTerr", territorioId, includeStats],
    queryFn: () => fetchSectoresByTerritorio(territorioId as number, includeStats),
    enabled: !!territorioId,
    retry: (count, err: any) => {
      if (err?.response?.status === 404) return false
      return count < 2
    },
  })
}

export function useSectoresPag(filters: { territorio_id?: number | string; page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["sectoresPag", filters],
    queryFn: () => fetchSectoresPage(filters),
    enabled: true,
    placeholderData: (prev) => prev, // keep previous while fetching next
  })
}

export type Territorio = {
  territorio_id: number
  nombre: string
  codigo?: string
}

export type Sector = {
  sector_id: number
  territorio_id: number
  nombre: string
  referencia_lat?: number | string | null
  referencia_lng?: number | string | null
  viviendas?: number | null
  hb_coverage?: number | null
}
