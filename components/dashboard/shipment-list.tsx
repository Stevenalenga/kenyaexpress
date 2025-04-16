"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, Truck } from "lucide-react"
import type { Database } from "@/lib/supabase/database.types"

type ShipmentRow = Database["public"]["Tables"]["shipments"]["Row"]

export function ShipmentList() {
  const [shipments, setShipments] = useState<ShipmentRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase.from("shipments").select("*").order("created_at", { ascending: false })

        if (error) throw error
        setShipments(data || [])
      } catch (err: any) {
        setError(err.message || "Failed to load shipments")
      } finally {
        setLoading(false)
      }
    }

    fetchShipments()
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
        {[...Array(2)].map((_, i) => (
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
            <p>Error loading shipments: {error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (shipments.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-gray-500 flex flex-col items-center py-8">
            <Truck className="h-12 w-12 mb-4 opacity-30" />
            <p className="text-lg font-medium">No shipments yet</p>
            <p className="text-sm">Your shipments will appear here once you start shipping.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {shipments.map((shipment) => (
        <Card key={shipment.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">Shipment #{shipment.id.substring(0, 8)}</CardTitle>
                <CardDescription>{new Date(shipment.created_at).toLocaleDateString()}</CardDescription>
              </div>
              <Badge className={getStatusColor(shipment.status)}>{shipment.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">From</p>
                  <p className="text-gray-600">{shipment.origin_address}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">To</p>
                  <p className="text-gray-600">{shipment.destination_address}</p>
                </div>
              </div>
              {shipment.estimated_delivery_date && (
                <div className="text-sm text-gray-500">
                  Estimated delivery: {new Date(shipment.estimated_delivery_date).toLocaleDateString()}
                </div>
              )}
              {shipment.shipping_cost && (
                <div className="text-sm font-medium">Cost: ${shipment.shipping_cost.toFixed(2)}</div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
