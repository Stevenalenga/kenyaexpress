import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { PackageList } from "@/components/dashboard/package-list"
import { ShipmentList } from "@/components/dashboard/shipment-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Truck } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default async function DashboardPage() {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth/sign-in")
  }

  // Fetch user profile data
  const { data: profile } = await supabase.from("users").select("first_name").eq("id", session.user.id).single()

  const firstName = profile?.first_name || "there"

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Welcome back, {firstName}</h2>
          <p className="text-gray-500">Track your packages and shipments</p>
        </div>

        <Tabs defaultValue="packages" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="packages" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span>Packages</span>
            </TabsTrigger>
            <TabsTrigger value="shipments" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              <span>Shipments</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="packages">
            <PackageList />
          </TabsContent>
          <TabsContent value="shipments">
            <ShipmentList />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
