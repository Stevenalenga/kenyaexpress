import { NextResponse } from "next/server"
import { isAdmin } from "@/lib/auth"

export async function adminMiddleware() {
  const isUserAdmin = await isAdmin()

  if (!isUserAdmin) {
    return NextResponse.redirect(new URL("/dashboard", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"))
  }

  return NextResponse.next()
}
