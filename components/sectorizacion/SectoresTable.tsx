"use client"
import { useMemo } from "react"
import { Sector } from "@/lib/api/sectorizacion"
import { AccionesSector } from "./AccionesSector"

type Props = {
	sectores: Sector[]
	onSelect?: (s: Sector) => void
	selectedId?: number | null
	showActions?: boolean
}

export function SectoresTable({ sectores, onSelect, selectedId, showActions }: Props) {
	const rows = useMemo(() => sectores ?? [], [sectores])
	return (
		<div className="border rounded-2xl shadow-sm overflow-hidden bg-background">
			<div className="px-4 py-3 bg-muted/40 border-b">
				<h3 className="font-medium">Sectores</h3>
			</div>
			<div className="overflow-auto">
				<table className="min-w-full text-sm">
					<thead className="bg-muted/30">
						<tr>
							<th className="p-2 text-left">#</th>
							<th className="p-2 text-left">Nombre</th>
							<th className="p-2 text-left">Territorio</th>
							<th className="p-2 text-left">Lat</th>
							<th className="p-2 text-left">Lng</th>
							<th className="p-2 text-left">Viviendas</th>
							<th className="p-2 text-left">Personas</th>
							{showActions && <th className="p-2 text-left">Acciones</th>}
						</tr>
					</thead>
					<tbody>
						{rows.map((s, i) => {
							const isSel = selectedId === s.sector_id
							const hasCoord = s.referencia_lat != null && s.referencia_lng != null
							return (
												<tr
									key={s.sector_id}
									className={`border-t hover:bg-muted/40 ${onSelect ? 'cursor-pointer' : ''} ${isSel ? 'bg-primary/10' : ''}`}
													onClick={() => onSelect?.(s)}
													onMouseEnter={() => onSelect?.(s)}
								>
									<td className="p-2">{i + 1}</td>
									<td className="p-2">{s.nombre}</td>
									<td className="p-2">{s.territorio_id}</td>
									<td className="p-2">{hasCoord ? s.referencia_lat : '—'}</td>
									<td className="p-2">{hasCoord ? s.referencia_lng : '—'}</td>
									<td className="p-2">{s.viviendas ?? '—'}</td>
									<td className="p-2">{s.personas ?? '—'}</td>
									{showActions && (
										<td className="p-2" onClick={(e) => e.stopPropagation()}>
											<AccionesSector sector={s} />
										</td>
									)}
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}

