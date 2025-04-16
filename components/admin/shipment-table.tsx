"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { updateShipmentStatus } from "@/app/admin/actions"

interface ShipmentTableProps {
  shipments: any[]
}

export function ShipmentTable({ shipments }: ShipmentTableProps) {
  const [optimisticShipments, setOptimisticShipments] = useState<any[]>(shipments)

  const handleUpdateStatus = async (shipmentId: string, status: string) => {
    // Optimistic update
    setOptimisticShipments((prev) =>
      prev.map((shipment) => (shipment.id === shipmentId ? { ...shipment, status } : shipment)),
    )

    // Server update
    await updateShipmentStatus(shipmentId, status)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>
      case "in transit":
        return <Badge className="bg-blue-100 text-blue-800">In Transit</Badge>
      case "processing":
        return <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>
      case "pending":
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Origin</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {optimisticShipments.length > 0 ? (
            optimisticShipments.map((shipment) => (
              <TableRow key={shipment.id}>
                <TableCell className="font-medium">{shipment.id.substring(0, 8)}...</TableCell>
                <TableCell>
                  {shipment.users ? `${shipment.users.first_name} ${shipment.users.last_name}` : "—"}
                </TableCell>
                <TableCell className="max-w-[200px] truncate" title={shipment.origin_address}>
                  {shipment.origin_address}
                </TableCell>
                <TableCell className="max-w-[200px] truncate" title={shipment.destination_address}>
                  {shipment.destination_address}
                </TableCell>
                <TableCell>{getStatusBadge(shipment.status)}</TableCell>
                <TableCell>{shipment.shipping_cost ? `$${shipment.shipping_cost.toFixed(2)}` : "—"}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleUpdateStatus(shipment.id, "pending")}>
                        Set as Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUpdateStatus(shipment.id, "processing")}>
                        Set as Processing
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUpdateStatus(shipment.id, "in transit")}>
                        Set as In Transit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUpdateStatus(shipment.id, "delivered")}>
                        Set as Delivered
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No shipments found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
