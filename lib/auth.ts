import { createServerClient } from "@/lib/supabase/server"

export async function isAdmin() {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return false
  }

  const { data: user } = await supabase.from("users").select("is_admin").eq("id", session.user.id).single()

  return user?.is_admin || false
}
