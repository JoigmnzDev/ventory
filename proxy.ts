import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"])

const isPublicRoute = createRouteMatcher(["/"])

export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId } = await auth()

  if (userId && isPublicRoute(req)) {
    const path = orgId ? "/dashboard" : "/select-org"
    const redirectUrl = new URL(path, req.url)
    return NextResponse.redirect(redirectUrl)
  }
  if (isDashboardRoute(req)) await auth.protect()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
