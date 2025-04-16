"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Package, User, LogOut, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

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
    setOpen(false)
    router.push("/")
    router.refresh()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] sm:w-[300px]">
        <div className="flex flex-col gap-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
              <span className="font-bold">KenyaExpress</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="flex flex-col gap-2">
            <Button
              asChild
              variant={pathname === "/dashboard" ? "default" : "ghost"}
              className="justify-start"
              onClick={() => setOpen(false)}
            >
              <Link href="/dashboard" className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname === "/profile" ? "default" : "ghost"}
              className="justify-start"
              onClick={() => setOpen(false)}
            >
              <Link href="/profile" className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
            </Button>
            {isAdmin && (
              <Button
                asChild
                variant={pathname.startsWith("/admin") ? "default" : "ghost"}
                className="justify-start"
                onClick={() => setOpen(false)}
              >
                <Link href="/admin" className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <span>Admin</span>
                </Link>
              </Button>
            )}
            <Button variant="ghost" className="justify-start" onClick={handleSignOut}>
              <LogOut className="h-5 w-5 mr-2" />
              <span>Sign Out</span>
            </Button>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
