"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { OrganizationSwitcher, Show, SignIn, UserButton } from "@clerk/nextjs"
import { HiOutlineCog6Tooth } from "react-icons/hi2"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider
        defaultOpen={false}
        className="h-screen overflow-hidden"
        style={
          {
            "--sidebar-width": "3.5rem",
            "--sidebar-width-icon": "3.5rem",
          } as React.CSSProperties
        }
      >
        <AppSidebar />

        <SidebarInset className="flex h-screen flex-col overflow-hidden">
          <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between border-b bg-background/95 px-4 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <nav aria-label="Breadcrumb" className="hidden">
                <Breadcrumb>
                  <BreadcrumbList className="text-sm font-medium">
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-foreground/60">
                        App
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="font-bold text-foreground">
                        Dashboard
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </nav>
            </div>

            <div className="flex items-center gap-2">
              <OrganizationSwitcher
                appearance={{
                  elements: {
                    organizationSwitcherTrigger:
                      "hover:bg-accent h-9 rounded-xl px-2",
                  },
                }}
              />
              <UserButton
                userProfileMode="modal"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "size-8 rounded-xl",
                  },
                }}
              />
              <div className="m-1 h-4 w-px bg-border" />
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl text-muted-foreground hover:bg-accent hover:text-foreground"
                onClick={() => console.log("Abrir Modal de Configuración")}
              >
                <HiOutlineCog6Tooth size={22} />
                <span className="sr-only">Ajustes</span>
              </Button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
