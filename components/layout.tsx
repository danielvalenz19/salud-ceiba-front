"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { PerfilUsuarioModal } from "@/components/modals/perfil-usuario-modal"
import { logout } from "@/lib/auth"
import {
  Home,
  Users,
  MapPin,
  Package,
  FileText,
  AlertTriangle,
  History,
  Settings,
  Search,
  Bell,
  User,
  LogOut,
  Heart,
  Syringe,
  Apple,
  Baby,
  Microscope,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const menuItems = [
  {
    title: "Panel de Control",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Personas & Familias",
    url: "/personas",
    icon: Users,
  },
  {
    title: "Viviendas & Sectorización",
    url: "/viviendas",
    icon: MapPin,
  },
]

const clinicalModules = [
  {
    title: "Vacunación",
    url: "/eventos/vacunacion",
    icon: Syringe,
  },
  {
    title: "Nutrición",
    url: "/eventos/nutricion",
    icon: Apple,
  },
  {
    title: "Salud Reproductiva",
    url: "/eventos/reproductiva",
    icon: Baby,
  },
  {
    title: "Epidemiología",
    url: "/eventos/epidemiologia",
    icon: Microscope,
  },
]

const systemItems = [
  {
    title: "Inventario",
    url: "/inventario",
    icon: Package,
  },
  {
    title: "Reportes",
    url: "/reportes",
    icon: FileText,
  },
  {
    title: "Calidad & Alertas",
    url: "/calidad",
    icon: AlertTriangle,
  },
  {
    title: "Auditoría",
    url: "/auditoria",
    icon: History,
  },
  {
    title: "Administración",
    url: "/admin",
    icon: Settings,
  },
]

function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <Heart className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-blue-900">Salud La Ceiba</span>
                  <span className="truncate text-xs text-blue-600">Sistema Territorial</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-900">Navegación Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-900">Trazabilidad Clínica</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {clinicalModules.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-900">Sistema</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                      {item.title === "Calidad & Alertas" && (
                        <Badge variant="destructive" className="ml-auto">
                          7
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserDropdownMenu />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

function UserDropdownMenu() {
  const [showPerfilModal, setShowPerfilModal] = useState(false)
  const router = useRouter()

  const handlePerfil = () => {
    setShowPerfilModal(true)
  }

  const handleConfiguracion = () => {
    setShowPerfilModal(true)
  }

  const handleCerrarSesion = async () => {
    if (confirm("¿Está seguro de cerrar sesión?")) {
      try {
        await logout()
      } finally {
        router.push("/")
      }
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton>
            <User /> Dr. María González
            <Badge className="ml-auto bg-green-100 text-green-800">En línea</Badge>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" className="w-(--radix-popper-anchor-width)">
          <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handlePerfil}>
            <User className="mr-2 h-4 w-4" />
            Perfil
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleConfiguracion}>
            <Settings className="mr-2 h-4 w-4" />
            Configuración
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600" onClick={handleCerrarSesion}>
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <PerfilUsuarioModal open={showPerfilModal} onOpenChange={setShowPerfilModal} />
    </>
  )
}

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [notificaciones] = useState([
    { id: 1, mensaje: "Nueva alerta de calidad en T1", tipo: "warning" },
    { id: 2, mensaje: "Stock crítico: Vacuna COVID-19", tipo: "error" },
    { id: 3, mensaje: "Reporte mensual generado", tipo: "info" },
  ])
  const router = useRouter()
  const pathname = usePathname()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleNotificaciones = () => {
    alert(
      `Tienes ${notificaciones.length} notificaciones:\n\n${notificaciones.map((n) => `• ${n.mensaje}`).join("\n")}`,
    )
  }

  interface Crumb { name: string; href: string; current?: boolean }
  const getBreadcrumbs = (): Crumb[] => {
    const segments = pathname.split("/").filter(Boolean)
    const breadcrumbs: Crumb[] = [{ name: "Inicio", href: "/dashboard" }]

    let currentPath = ""
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`
      let name = segment

      // Mapear rutas a nombres legibles
      const routeNames: { [key: string]: string } = {
        dashboard: "Panel de Control",
        personas: "Personas & Familias",
        viviendas: "Viviendas & Sectorización",
        eventos: "Trazabilidad Clínica",
        vacunacion: "Vacunación",
        nutricion: "Nutrición",
        reproductiva: "Salud Reproductiva",
        epidemiologia: "Epidemiología",
        inventario: "Inventario",
        reportes: "Reportes",
        calidad: "Calidad & Alertas",
        auditoria: "Auditoría",
        admin: "Administración",
        buscar: "Búsqueda",
        nuevo: "Nuevo Registro",
      }

      name = routeNames[segment] || segment

      if (index === segments.length - 1) {
        breadcrumbs.push({ name, href: currentPath, current: true })
      } else {
        breadcrumbs.push({ name, href: currentPath })
      }
    })

    return breadcrumbs
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-blue-200 px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-1 items-center gap-4">
            <Breadcrumb>
              <BreadcrumbList>
                {getBreadcrumbs().map((breadcrumb, index) => (
                  <div key={breadcrumb.href} className="flex items-center">
                    {index > 0 && <BreadcrumbSeparator />}
                    <BreadcrumbItem>
                      {breadcrumb.current ? (
                        <BreadcrumbPage className="text-blue-900">{breadcrumb.name}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={breadcrumb.href} className="text-blue-600">
                          {breadcrumb.name}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400" />
              <Input
                type="search"
                placeholder="Buscar DPI, nombre, código..."
                className="w-64 pl-8 border-blue-200 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <Button
              variant="ghost"
              size="icon"
              className="text-blue-600 hover:bg-blue-50 relative"
              onClick={handleNotificaciones}
            >
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white">
                {notificaciones.length}
              </Badge>
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6 bg-blue-50/30">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
