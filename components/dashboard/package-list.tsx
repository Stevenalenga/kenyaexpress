"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Box, Package } from "lucide-react"
import type { Database } from "@/lib/supabase/database.types"

type PackageRow = Database["public"]["Tables"]["packages"]["Row"]

export function PackageList() {
  const [packages, setPackages] = useState<PackageRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase.from("packages").select("*").order("created_at", { ascending: false })

        if (error) throw error
        setPackages(data || [])
      } catch (err: any) {
        setError(err.message || "Failed to load packages")
      } finally {
        setLoading(false)
      }
    }

    fetchPackages()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "in transit":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-red-500">
            <p>Error loading packages: {error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (packages.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-gray-500 flex flex-col items-center py-8">
            <Package className="h-12 w-12 mb-4 opacity-30" />
            <p className="text-lg font-medium">No packages yet</p>
            <p className="text-sm">Your packages will appear here once you start shipping.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {packages.map((pkg) => (
        <Card key={pkg.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{pkg.tracking_number}</CardTitle>
                <CardDescription>{new Date(pkg.created_at).toLocaleDateString()}</CardDescription>
              </div>
              <Badge className={getStatusColor(pkg.status)}>{pkg.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Box className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Description</p>
                  <p className="text-gray-600">{pkg.description || "No description provided"}</p>
                </div>
              </div>
              {pkg.weight && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Weight: {pkg.weight} lbs</span>
                  {pkg.dimensions && <span className="text-sm text-gray-500">• Dimensions: {pkg.dimensions}</span>}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
