import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageTable } from "@/components/admin/message-table"

export default async function AdminMessagesPage() {
  const supabase = createServerClient()

  const { data: messages } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Message Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Contact Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <MessageTable messages={messages || []} />
        </CardContent>
      </Card>
    </div>
  )
}
