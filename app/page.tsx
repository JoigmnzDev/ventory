import { Button } from "@/components/ui/button"
import { SignInButton, SignUpButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { Package, ArrowRight } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"

export default async function HomePage() {
  const { userId } = await auth()
  const isSignedIn = !!userId

  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-background px-6">
      <div className="flex flex-col items-center gap-8 text-center">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Package weight="duotone" className="size-5" />
          </div>
          <span className="text-2xl font-semibold tracking-tight text-foreground">
            Ventory
          </span>
        </div>

        {!isSignedIn ? (
          <div className="flex items-center gap-3">
            <SignInButton mode="modal">
              <Button variant="outline" size="lg" className="min-w-32">
                Iniciar Sesión
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="lg" className="min-w-32">
                Registrarse
              </Button>
            </SignUpButton>
          </div>
        ) : (
          <Button asChild size="lg" className="min-w-40">
            <Link href="/dashboard">
              Ir al Dashboard
              <ArrowRight weight="bold" className="ml-2 size-4" />
            </Link>
          </Button>
        )}
      </div>
    </main>
  )
}
