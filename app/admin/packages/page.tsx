import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PackageTable } from "@/components/admin/package-table"

export default async function AdminPackagesPage() {
  const supabase = createServerClient()

  const { data: packages } = await supabase
    .from("packages")
    .select("*, users(first_name, last_name)")
    .order("created_at", { ascending: false })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Package Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>All Packages</CardTitle>
        </CardHeader>
        <CardContent>
          <PackageTable packages={packages || []} />
        </CardContent>
      </Card>
    </div>
  )
}
