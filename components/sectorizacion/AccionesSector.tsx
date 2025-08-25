"use client"
import { useState } from "react"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Sector, getSector, getViviendasBySector, updateSector, deleteSector } from "@/lib/api/sectorizacion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

type Props = { sector: Sector; onChanged?: () => void; onDeleted?: () => void }

export function AccionesSector({ sector, onChanged, onDeleted }: Props) {
	const [open, setOpen] = useState(false)
	const [edit, setEdit] = useState({ nombre: sector.nombre, referencia_lat: sector.referencia_lat, referencia_lng: sector.referencia_lng })
	const qc = useQueryClient()

	const { data: detalle, isLoading: loadingDetalle } = useQuery({
		queryKey: ["sector", sector.sector_id, open],
		queryFn: () => getSector(sector.sector_id),
		enabled: open,
	})

	const { data: viv, isLoading: loadingViv } = useQuery({
		queryKey: ["viviendasBySector", sector.sector_id, open],
		queryFn: () => getViviendasBySector(sector.sector_id, { withGPS: true, page: 1, limit: 20 }),
		enabled: open,
	})

	const mUpdate = useMutation({
		mutationFn: () => updateSector(sector.sector_id, {
			nombre: edit.nombre,
			referencia_lat: edit.referencia_lat as any,
			referencia_lng: edit.referencia_lng as any,
		}),
		onSuccess: () => {
			toast({ title: "Sector actualizado" })
			qc.invalidateQueries({ queryKey: ["sectoresByTerr"] })
			qc.invalidateQueries({ queryKey: ["sectoresPag"] })
			onChanged?.()
		},
		onError: () => toast({ title: "No se pudo actualizar", variant: "destructive" as any }),
	})

	const mDelete = useMutation({
		mutationFn: () => deleteSector(sector.sector_id),
		onSuccess: (res: any) => {
			if (res?.ok) {
				toast({ title: "Sector desactivado" })
				qc.invalidateQueries({ queryKey: ["sectoresByTerr"] })
				qc.invalidateQueries({ queryKey: ["sectoresPag"] })
				onDeleted?.()
			} else {
				const msg = typeof res?.message === "string" ? res.message : "No se pudo eliminar"
				toast({ title: msg, variant: "destructive" as any })
			}
		},
		onError: () => toast({ title: "Error al eliminar", variant: "destructive" as any }),
	})

	return (
		<div className="flex items-center gap-2">
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger asChild>
					<Button aria-label="Ver" size="sm" variant="outline"><Eye className="size-4" /> Ver</Button>
				</SheetTrigger>
				<SheetContent className="sm:max-w-xl">
					<SheetHeader>
						<SheetTitle>Sector #{sector.sector_id}</SheetTitle>
					</SheetHeader>
					<div className="px-4">
						<Tabs defaultValue="detalle">
							<TabsList>
								<TabsTrigger value="detalle">Detalle</TabsTrigger>
								<TabsTrigger value="viviendas">Viviendas</TabsTrigger>
								<TabsTrigger value="editar">Editar</TabsTrigger>
							</TabsList>
							<TabsContent value="detalle">
								{loadingDetalle ? <div>Cargando…</div> : (
									<div className="space-y-2 text-sm">
										<div><span className="font-medium">Nombre:</span> {detalle?.nombre}</div>
										<div><span className="font-medium">Territorio:</span> {detalle?.territorio_id}</div>
										<div><span className="font-medium">Ref:</span> {detalle?.referencia_lat ?? '—'}, {detalle?.referencia_lng ?? '—'}</div>
									</div>
								)}
							</TabsContent>
							<TabsContent value="viviendas">
								{loadingViv ? <div>Cargando…</div> : (
									<div className="overflow-auto border rounded">
										<table className="min-w-full text-sm">
											<thead className="bg-muted/30">
												<tr>
													<th className="p-2 text-left">#</th>
													<th className="p-2 text-left">Código familia</th>
													<th className="p-2 text-left">Personas</th>
													<th className="p-2 text-left">Lat</th>
													<th className="p-2 text-left">Lng</th>
												</tr>
											</thead>
											<tbody>
												{viv?.data?.map((v: any, i: number) => (
													<tr key={v.vivienda_id} className="border-t">
														<td className="p-2">{i + 1}</td>
														<td className="p-2">{v.codigo_familia}</td>
														<td className="p-2">{v.personas}</td>
														<td className="p-2">{v.lat ?? '—'}</td>
														<td className="p-2">{v.lng ?? '—'}</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								)}
							</TabsContent>
							<TabsContent value="editar">
								<div className="space-y-3">
									<label className="block text-sm">
										<span className="text-muted-foreground">Nombre</span>
										<Input value={edit.nombre} onChange={(e) => setEdit((s) => ({ ...s, nombre: e.target.value }))} />
									</label>
									<div className="grid grid-cols-2 gap-3">
										<label className="block text-sm">
											<span className="text-muted-foreground">Lat</span>
											<Input value={edit.referencia_lat ?? ''} onChange={(e) => setEdit((s) => ({ ...s, referencia_lat: e.target.value ? Number(e.target.value) : null }))} />
										</label>
										<label className="block text-sm">
											<span className="text-muted-foreground">Lng</span>
											<Input value={edit.referencia_lng ?? ''} onChange={(e) => setEdit((s) => ({ ...s, referencia_lng: e.target.value ? Number(e.target.value) : null }))} />
										</label>
									</div>
									<div className="flex gap-2">
										<Button onClick={() => mUpdate.mutate()} disabled={mUpdate.isPending}>Guardar cambios</Button>
									</div>
								</div>
							</TabsContent>
						</Tabs>
					</div>
				</SheetContent>
			</Sheet>

			<Button aria-label="Editar" size="sm" variant="outline" onClick={() => setOpen(true)}>
				<Pencil className="size-4" />
			</Button>
			<Button
				aria-label="Eliminar"
				size="sm"
				variant="destructive"
				onClick={() => {
					if (window.confirm("¿Desactivar sector?")) mDelete.mutate()
				}}
			>
				<Trash2 className="size-4" />
			</Button>
		</div>
	)
}

