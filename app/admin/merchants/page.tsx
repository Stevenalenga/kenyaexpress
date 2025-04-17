import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MerchantTable } from "@/components/admin/merchant-table"

export default async function AdminMerchantsPage() {
  const supabase = createServerClient()

  const { data: merchants } = await supabase
    .from("merchants")
    .select("*, users(first_name, last_name, email))")
    .order("created_at", { ascending: false })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Merchant Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>All Merchants</CardTitle>
        </CardHeader>
        <CardContent>
          <MerchantTable merchants={merchants || []} />
        </CardContent>
      </Card>
    </div>
  )
}
