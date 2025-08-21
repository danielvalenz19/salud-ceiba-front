"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { Role } from "@/lib/users"

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  roles: Role[]
  onSave: (data: { nombre: string; email: string; rol: string; password: string; persona_id?: number }) => Promise<void> | void
}

export default function NuevoUsuarioModal({ open, onOpenChange, roles, onSave }: Props) {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rol, setRol] = useState<string>(roles[0]?.name ?? "")
  const [personaId, setPersonaId] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async () => {
    setError(null)
    if (!nombre.trim()) return setError("Nombre inválido.")
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Correo inválido.")
    if (password.length < 6) return setError("La contraseña debe tener al menos 6 caracteres.")
    setLoading(true)
    try {
      await onSave({ nombre, email, rol, password, persona_id: personaId ? Number(personaId) : undefined })
      onOpenChange(false)
      setNombre(""); setEmail(""); setPassword(""); setPersonaId("")
    } catch (e: any) {
      setError(e?.response?.data?.message || "Error al crear usuario.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>Nuevo usuario</DialogTitle></DialogHeader>
        <div className="space-y-4">
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div>
            <Label>Nombre completo</Label>
            <Input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Dr. Juan Pérez" />
          </div>
          <div><Label>Correo</Label><Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="usuario@salud.gob.gt" /></div>
          <div><Label>Contraseña</Label><Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••" /></div>
          <div>
            <Label>Rol</Label>
            <select className="w-full border rounded px-3 py-2" value={rol} onChange={(e)=>setRol(e.target.value)}>
              {roles.map(r => <option key={r.role_id} value={r.name}>{r.name}</option>)}
            </select>
          </div>
          <div><Label>Persona vinculada (opcional)</Label><Input type="number" value={personaId} onChange={(e)=>setPersonaId(e.target.value)} placeholder="persona_id" /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={()=>onOpenChange(false)} disabled={loading}>Cancelar</Button>
          <Button onClick={submit} disabled={loading}>{loading ? "Guardando..." : "Crear"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
