import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Truck, Users, MessageSquare } from "lucide-react"

export default async function AdminDashboardPage() {
  const supabase = createServerClient()

  // Fetch counts for dashboard
  const [{ count: userCount }, { count: packageCount }, { count: shipmentCount }, { count: messageCount }] =
    await Promise.all([
      supabase.from("users").select("*", { count: "exact", head: true }),
      supabase.from("packages").select("*", { count: "exact", head: true }),
      supabase.from("shipments").select("*", { count: "exact", head: true }),
      supabase.from("contact_messages").select("*", { count: "exact", head: true }),
    ])

  // Fetch recent packages
  const { data: recentPackages } = await supabase
    .from("packages")
    .select("*, users(first_name, last_name)")
    .order("created_at", { ascending: false })
    .limit(5)

  // Fetch unread messages
  const { data: unreadMessages } = await supabase
    .from("contact_messages")
    .select("*")
    .eq("status", "unread")
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Packages</CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{packageCount || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
            <Truck className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shipmentCount || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messageCount || 0}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Packages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPackages && recentPackages.length > 0 ? (
                recentPackages.map((pkg: any) => (
                  <div key={pkg.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{pkg.tracking_number}</p>
                      <p className="text-sm text-gray-500">
                        {pkg.users?.first_name} {pkg.users?.last_name}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          pkg.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : pkg.status === "in transit"
                              ? "bg-blue-100 text-blue-800"
                              : pkg.status === "processing"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {pkg.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No recent packages</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Unread Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {unreadMessages && unreadMessages.length > 0 ? (
                unreadMessages.map((message) => (
                  <div key={message.id} className="border-b pb-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">
                        {message.first_name} {message.last_name}
                      </p>
                      <p className="text-xs text-gray-500">{new Date(message.created_at).toLocaleDateString()}</p>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{message.message}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No unread messages</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
