"use server"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { isAdmin } from "@/lib/auth"
import type { Database } from "@/lib/supabase/database.types"

export async function updateUserAdmin(userId: string, isAdmin: boolean) {
  const isUserAdmin = await isAdmin()

  if (!isUserAdmin) {
    throw new Error("Unauthorized")
  }

  const supabase = createServerComponentClient<Database>({ cookies })

  const { error } = await supabase.from("users").update({ is_admin: isAdmin }).eq("id", userId)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/admin/users")
  return { success: true }
}

export async function updatePackageStatus(packageId: string, status: string) {
  const isUserAdmin = await isAdmin()

  if (!isUserAdmin) {
    throw new Error("Unauthorized")
  }

  const supabase = createServerComponentClient<Database>({ cookies })

  const { error } = await supabase
    .from("packages")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", packageId)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/admin/packages")
  return { success: true }
}

export async function updateMessageStatus(messageId: string, status: string) {
  const isUserAdmin = await isAdmin()

  if (!isUserAdmin) {
    throw new Error("Unauthorized")
  }

  const supabase = createServerComponentClient<Database>({ cookies })

  const { error } = await supabase
    .from("contact_messages")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", messageId)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/admin/messages")
  return { success: true }
}

export async function updateShipmentStatus(shipmentId: string, status: string) {
  const isUserAdmin = await isAdmin()

  if (!isUserAdmin) {
    throw new Error("Unauthorized")
  }

  const supabase = createServerComponentClient<Database>({ cookies })

  const { error } = await supabase
    .from("shipments")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", shipmentId)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/admin/shipments")
  return { success: true }
}

export async function updateMerchantStatus(merchantId: string, status: string, rejectionReason?: string) {
  const isUserAdmin = await isAdmin()

  if (!isUserAdmin) {
    throw new Error("Unauthorized")
  }

  const supabase = createServerComponentClient<Database>({ cookies })

  const updateData: any = {
    status,
    updated_at: new Date().toISOString(),
  }

  if (status === "approved") {
    updateData.approved_at = new Date().toISOString()
  } else if (status === "rejected") {
    updateData.rejected_at = new Date().toISOString()
    updateData.rejection_reason = rejectionReason
  }

  const { error } = await supabase.from("merchants").update(updateData).eq("id", merchantId)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/admin/merchants")
  return { success: true }
}
