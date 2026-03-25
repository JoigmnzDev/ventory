import { Button } from "@/components/ui/button"
import { SignInButton, SignUpButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { Package, ArrowRight } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"

export default async function HomePage() {
  const { userId } = await auth()
  const isSignedIn = !!userId

  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex h-16 items-center justify-between border-b px-6">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Package weight="duotone" className="size-4" />
          </div>
          <span className="font-semibold">Ventory</span>
        </div>
        <nav className="flex items-center gap-3">
          {!isSignedIn ? (
            <>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">
                  Iniciar Sesión
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm">Registrarse</Button>
              </SignUpButton>
            </>
          ) : (
            <Button asChild size="sm">
              <Link href="/dashboard">
                Ir al Dashboard
                <ArrowRight weight="bold" className="ml-2 size-4" />
              </Link>
            </Button>
          )}
        </nav>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Control de Inventario Inteligente
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Gestiona márgenes y precios en tiempo real con la tasa BCV.
            Diseñado para el mercado venezolano.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            {!isSignedIn ? (
              <SignUpButton mode="modal">
                <Button size="lg">
                  Comenzar Gratis
                  <ArrowRight weight="bold" className="ml-2 size-4" />
                </Button>
              </SignUpButton>
            ) : (
              <Button asChild size="lg">
                <Link href="/dashboard">
                  Ir al Dashboard
                  <ArrowRight weight="bold" className="ml-2 size-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </main>

      <footer className="flex h-14 items-center justify-center border-t px-6">
        <p className="text-sm text-muted-foreground">
          Ventory &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  )
}
