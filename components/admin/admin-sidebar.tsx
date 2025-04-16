"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Package, Truck, MessageSquare, LogOut, ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Packages",
      href: "/admin/packages",
      icon: <Package className="h-5 w-5" />,
    },
    {
      name: "Shipments",
      href: "/admin/shipments",
      icon: <Truck className="h-5 w-5" />,
    },
    {
      name: "Messages",
      href: "/admin/messages",
      icon: <MessageSquare className="h-5 w-5" />,
    },
  ]

  return (
    <div
      className={cn("bg-gray-900 text-white flex flex-col transition-all duration-300", collapsed ? "w-20" : "w-64")}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-800">
        <div className={cn("flex items-center", collapsed && "justify-center w-full")}>
          <span className={cn("font-bold text-xl", collapsed && "hidden")}>Admin</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:bg-gray-800"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex-1 py-6">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-md",
                pathname === item.href ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
              )}
            >
              <div className={cn("flex items-center", collapsed && "justify-center w-full")}>
                {item.icon}
                <span className={cn("ml-3", collapsed && "hidden")}>{item.name}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-800">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white",
            collapsed && "justify-center",
          )}
          onClick={handleSignOut}
        >
          <LogOut className="h-5 w-5" />
          <span className={cn("ml-2", collapsed && "hidden")}>Sign Out</span>
        </Button>
      </div>
    </div>
  )
}
