import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShipmentTable } from "@/components/admin/shipment-table"

export default async function AdminShipmentsPage() {
  const supabase = createServerClient()

  const { data: shipments } = await supabase
    .from("shipments")
    .select("*, users(first_name, last_name)")
    .order("created_at", { ascending: false })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Shipment Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>All Shipments</CardTitle>
        </CardHeader>
        <CardContent>
          <ShipmentTable shipments={shipments || []} />
        </CardContent>
      </Card>
    </div>
  )
}
