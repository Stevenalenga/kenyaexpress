import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserTable } from "@/components/admin/user-table"

export default async function AdminUsersPage() {
  const supabase = createServerClient()

  const { data: users } = await supabase.from("users").select("*").order("created_at", { ascending: false })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">User Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <UserTable users={users || []} />
        </CardContent>
      </Card>
    </div>
  )
}
