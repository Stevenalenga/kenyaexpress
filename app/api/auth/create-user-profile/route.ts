import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, email, first_name, last_name } = body

    // Create a Supabase client with the service role key
    const supabase = createRouteHandlerClient({ cookies })

    // Insert the user profile
    const { error } = await supabase.from("users").insert({
      id,
      email,
      first_name,
      last_name,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.error("Error creating user profile:", error)
      return NextResponse.json({ message: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error in create-user-profile route:", error)
    return NextResponse.json({ message: error.message || "An error occurred" }, { status: 500 })
  }
}
