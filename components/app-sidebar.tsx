"use client"

import * as React from "react"
import Link from "next/link"
import { useUser, useOrganization } from "@clerk/nextjs"
import { NavMain } from "@/components/nav-main"
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
import { Skeleton } from "@/components/ui/skeleton"
import {
  PackageIcon,
  LayoutIcon,
  CurrencyDollarIcon,
  Package,
  ShoppingCart,
} from "@phosphor-icons/react"

const navMainItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutIcon weight="duotone" size={20} />,
    isActive: true,
    items: [{ title: "Vista General", url: "/dashboard" }],
  },
  {
    title: "Terminal de Venta",
    url: "/dashboard/pos",
    icon: <ShoppingCart weight="duotone" size={20} />,
    items: [{ title: "Punto de Venta", url: "/dashboard/pos" }],
  },
  {
    title: "Inventario",
    url: "/dashboard/inventory",
    icon: <PackageIcon weight="duotone" size={20} />,
    items: [{ title: "Lista de Productos", url: "/dashboard/inventory" }],
  },
  {
    title: "Administración",
    url: "#",
    icon: <CurrencyDollarIcon weight="duotone" size={20} />,
    items: [{ title: "Configurar Tasa BCV", url: "#" }],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isLoaded: isUserLoaded } = useUser()
  const { organization, isLoaded: isOrgLoaded } = useOrganization()

  const userData = React.useMemo(() => {
    if (!isUserLoaded || !user) {
      return null
    }
    return {
      name: user.fullName || user.firstName || "Usuario",
      email: user.primaryEmailAddress?.emailAddress || "",
      avatar: user.imageUrl || "",
    }
  }, [user, isUserLoaded])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Package weight="duotone" className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  {isOrgLoaded ? (
                    <>
                      <span className="truncate font-medium">
                        {organization?.name || "Ventory"}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        Control de Inventario
                      </span>
                    </>
                  ) : (
                    <>
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="mt-1 h-3 w-20" />
                    </>
                  )}
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} />
      </SidebarContent>
      <SidebarFooter>
        {isUserLoaded && userData ? (
          <NavUser user={userData} />
        ) : (
          <div className="flex items-center gap-2 p-2">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="flex-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-1 h-3 w-32" />
            </div>
          </div>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
