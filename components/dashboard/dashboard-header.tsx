"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Box, User, Package, LogOut, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/dashboard/mobile-nav"

export function DashboardHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const { data } = await supabase.from("users").select("is_admin").eq("id", user.id).single()

        setIsAdmin(!!data?.is_admin)
      }
    }

    checkAdmin()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <MobileNav />
          <Link href="/" className="flex items-center space-x-2">
            <Box className="h-6 w-6" />
            <span className="inline-block font-bold">KenyaExpress</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-1">
            <Button asChild variant={pathname === "/dashboard" ? "default" : "ghost"} size="sm">
              <Link href="/dashboard" className="flex items-center gap-1">
                <Package className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </Button>
            <Button asChild variant={pathname === "/profile" ? "default" : "ghost"} size="sm">
              <Link href="/profile" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </Button>
            {isAdmin && (
              <Button asChild variant={pathname.startsWith("/admin") ? "default" : "ghost"} size="sm">
                <Link href="/admin" className="flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
              </Button>
            )}
          </nav>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleSignOut} className="flex items-center gap-1">
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
