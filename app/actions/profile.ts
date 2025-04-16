"use server"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import type { Database } from "@/lib/supabase/database.types"

export type ProfileFormState = {
  success?: boolean
  error?: string
  data?: any
}

export async function updateProfile(prevState: ProfileFormState, formData: FormData): Promise<ProfileFormState> {
  try {
    const supabase = createServerComponentClient<Database>({ cookies })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return { error: "Not authenticated" }
    }

    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const phone = formData.get("phone") as string
    const address = formData.get("address") as string
    const city = formData.get("city") as string
    const country = formData.get("country") as string

    const { error } = await supabase
      .from("users")
      .update({
        first_name: firstName,
        last_name: lastName,
        phone,
        address,
        city,
        country,
        updated_at: new Date().toISOString(),
      })
      .eq("id", session.user.id)

    if (error) throw error

    revalidatePath("/profile")
    return {
      success: true,
      data: {
        first_name: firstName,
        last_name: lastName,
        phone,
        address,
        city,
        country,
      },
    }
  } catch (error: any) {
    return { error: error.message || "Failed to update profile" }
  }
}
