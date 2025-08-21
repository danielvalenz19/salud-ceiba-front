"use client"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { Role, User } from "@/lib/users"

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  roles: Role[]
  user?: User | null
  onSave: (id: number, data: Partial<{ email: string; password?: string; role_id: number; persona_id?: number; activo: boolean }>) => Promise<void> | void
}

export default function EditarUsuarioModal({ open, onOpenChange, roles, user, onSave }: Props) {
  const [email, setEmail] = useState("")
  const [roleId, setRoleId] = useState<number>(1)
  const [personaId, setPersonaId] = useState<string>("")
  const [password, setPassword] = useState("")
  const [activo, setActivo] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      setEmail(user.email || "")
      setRoleId(user.role_id)
      setPersonaId(user.persona_id ? String(user.persona_id) : "")
      setActivo(!!user.activo)
      setPassword("")
      setError(null)
    }
  }, [user])

  const submit = async () => {
    if (!user) return
  setError(null)
  if (!email) return setError("Correo requerido.")
  // validar formato de correo
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Correo inválido.")
    setLoading(true)
    try {
      await onSave(user.user_id, {
        email,
        role_id: roleId,
        persona_id: personaId ? Number(personaId) : undefined,
        activo,
        ...(password ? { password } : {}),
      })
      onOpenChange(false)
    } catch (e: any) {
      setError(e?.response?.data?.message || "Error al actualizar.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>Editar usuario</DialogTitle></DialogHeader>
        <div className="space-y-4">
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div><Label>Correo</Label><Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} /></div>
          <div>
            <Label>Rol</Label>
            <select className="w-full border rounded px-3 py-2" value={roleId} onChange={(e)=>setRoleId(Number(e.target.value))}>
              {roles.map(r => <option key={r.role_id} value={r.role_id}>{r.name}</option>)}
            </select>
          </div>
          <div><Label>Persona vinculada (opcional)</Label><Input type="number" value={personaId} onChange={(e)=>setPersonaId(e.target.value)} /></div>
          <div><Label>Nueva contraseña (opcional)</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Dejar en blanco para no cambiar" /></div>
          <div className="flex items-center gap-2">
            <input id="activo" type="checkbox" checked={activo} onChange={(e) => setActivo(e.target.checked)} />
            <Label htmlFor="activo">Activo</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={()=>onOpenChange(false)} disabled={loading}>Cancelar</Button>
          <Button onClick={submit} disabled={loading}>{loading ? "Guardando..." : "Guardar cambios"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
