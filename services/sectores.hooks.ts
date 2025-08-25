import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  listSectores,
  getSector,
  createSector,
  updateSector,
  deleteSector,
  listViviendasPorSector,
  type CreateSectorDTO,
  type UpdateSectorDTO,
} from "./sectores"

export const qk = {
  sectores: (p?: any) => ["sectores", p] as const,
  sector: (id: number) => ["sector", id] as const,
  vivs: (id: number, p?: any) => ["sector", id, "viviendas", p] as const,
}

export function useSectores(params: { page?: number; limit?: number; territorio_id?: number }) {
  return useQuery({ queryKey: qk.sectores(params), queryFn: () => listSectores(params), keepPreviousData: true } as any)
}

export function useSector(id?: number) {
  return useQuery({ queryKey: qk.sector(id!), queryFn: () => getSector(id!), enabled: !!id })
}

export function useViviendasPorSector(id?: number, params?: { page?: number; limit?: number; withGPS?: boolean }) {
  return useQuery({ queryKey: qk.vivs(id!, params), queryFn: () => listViviendasPorSector(id!, params!), enabled: !!id })
}

export function useCreateSector() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateSectorDTO) => createSector(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.sectores({}) }),
  })
}

export function useUpdateSector(id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateSectorDTO) => updateSector(id, payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: qk.sector(id) })
      await qc.invalidateQueries({ queryKey: ["sectores"] })
    },
  })
}

export function useDeleteSector() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteSector(id),
    onSuccess: async (_, id) => {
      await qc.invalidateQueries({ queryKey: ["sectores"] })
      await qc.removeQueries({ queryKey: ["sector", id], exact: true })
      await qc.removeQueries({ queryKey: ["sector", id, "viviendas"], exact: false })
    },
  })
}
