import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { MerchantDashboard } from "@/components/merchant/merchant-dashboard"

export default async function MerchantDashboardPage() {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth/sign-in")
  }

  // Check if user is a merchant
  const { data: user } = await supabase.from("users").select("is_merchant").eq("id", session.user.id).single()

  if (!user?.is_merchant) {
    redirect("/dashboard")
  }

  // Get merchant data
  const { data: merchant } = await supabase
    .from("merchants")
    .select("*, merchant_addresses(*), merchant_contacts(*)")
    .eq("user_id", session.user.id)
    .single()

  if (!merchant) {
    redirect("/merchant/register")
  }

  return <MerchantDashboard merchant={merchant} />
}
