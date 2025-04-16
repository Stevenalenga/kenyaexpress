import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { ProfileForm } from "@/components/profile/profile-form"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default async function ProfilePage() {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth/sign-in")
  }

  // Fetch user profile data
  const { data: profile, error } = await supabase.from("users").select("*").eq("id", session.user.id).single()

  if (error || !profile) {
    console.error("Error fetching profile:", error)
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Your Profile</h2>
          <p className="text-gray-500">Manage your personal information</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <ProfileForm initialData={profile} />
        </div>
      </main>
    </div>
  )
}
