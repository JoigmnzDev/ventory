"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  BookOpenIcon,
  PackageIcon,
  LayoutIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  Command,
} from "@phosphor-icons/react"

const data = {
  user: {
    name: "José G.",
    email: "jose@ventory.app",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutIcon weight="duotone" />,
      isActive: true,
      items: [
        { title: "Vista General", url: "/dashboard" },
        { title: "Análisis de Tasa", url: "#" },
      ],
    },
    {
      title: "Inventario",
      url: "/dashboard/inventory",
      icon: <PackageIcon weight="duotone" />,
      items: [
        { title: "Lista de Productos", url: "/dashboard/inventory" },
        { title: "Ajustar Precios", url: "#" },
      ],
    },
    {
      title: "Administración",
      url: "#",
      icon: <CurrencyDollarIcon weight="duotone" />,
      items: [{ title: "Configurar Tasa BCV", url: "#" }],
    },
  ],
  projects: [
    {
      name: "Reporte de Margen",
      url: "#",
      icon: <ChartBarIcon weight="duotone" />,
    },
    {
      name: "Guía de Usuario",
      url: "#",
      icon: <BookOpenIcon weight="duotone" />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
