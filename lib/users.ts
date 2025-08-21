// lib/users.ts
import { api } from "./api"

export interface User {
  user_id: number
  email: string
  role_id: number
  activo: number
  persona_id?: number | null
  created_at?: string
}

export interface Role {
  role_id: number
  name: string
}

export async function listUsers(params: { page?: number; limit?: number; q?: string; rol?: number; activo?: number } = {}) {
  const { data } = await api.get("/users", { params })
  return data // {meta,data} o {total,rows} según backend
}

export async function getUser(id: number) {
  const { data } = await api.get(`/users/${id}`)
  return data as User
}

export async function createUser(payload: { nombre: string; email: string; rol: string; password: string; persona_id?: number; activo?: boolean }) {
  const { data } = await api.post("/users", payload)
  return data
}

export async function updateUser(id: number, payload: Partial<{ nombre: string; email: string; rol: string; password?: string; persona_id?: number; activo?: boolean }>) {
  const { data } = await api.put(`/users/${id}`, payload)
  return data
}

export async function deleteUser(id: number) {
  const { data } = await api.delete(`/users/${id}`)
  return data
}

export async function listRoles() {
  const { data } = await api.get("/roles")
  return data as Role[]
}
