"use client"

import { usePathname } from "next/navigation" // Importante para detectar la ruta actual
import {
  HiOutlineSquares2X2,
  HiOutlineCube,
  HiOutlineShoppingBag,
  HiOutlineCalculator,
  HiOutlineUserGroup,
  HiOutlineTruck,
} from "react-icons/hi2"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Show } from "@clerk/nextjs"

const navItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: HiOutlineSquares2X2,
    plans: ["basic", "pro"],
  },
  {
    title: "Inventario",
    url: "/inventory",
    icon: HiOutlineCube,
    plans: ["basic", "pro"],
  },
  {
    title: "Ventas",
    url: "/sales",
    icon: HiOutlineShoppingBag,
    plans: ["basic", "pro"],
  },
  {
    title: "Caja",
    url: "/pos",
    icon: HiOutlineCalculator,
    plans: ["basic", "pro"],
  },
  {
    title: "Clientes",
    url: "/customers",
    icon: HiOutlineUserGroup,
    plans: ["basic", "pro"],
  },
  {
    title: "Proveedores",
    url: "/suppliers",
    icon: HiOutlineTruck,
    plans: ["pro"],
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center justify-center py-4">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground shadow-sm">
          V
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarMenu className="flex flex-col items-center gap-2 py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.url

            return (
              <Show
                key={item.title}
                when={(has) => item.plans.some((p) => has({ plan: p }))}
              >
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={isActive}
                    className={cn(
                      "flex size-11 items-center justify-center rounded-xl transition-all duration-200",
                      isActive
                        ? "bg-gray-100 text-black shadow-sm"
                        : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <Link
                      href={item.url}
                      className="flex h-full w-full items-center justify-center"
                    >
                      <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                      <span className="sr-only">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </Show>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
