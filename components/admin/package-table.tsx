"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { updatePackageStatus } from "@/app/admin/actions"

interface PackageTableProps {
  packages: any[]
}

export function PackageTable({ packages }: PackageTableProps) {
  const [optimisticPackages, setOptimisticPackages] = useState<any[]>(packages)

  const handleUpdateStatus = async (packageId: string, status: string) => {
    // Optimistic update
    setOptimisticPackages((prev) => prev.map((pkg) => (pkg.id === packageId ? { ...pkg, status } : pkg)))

    // Server update
    await updatePackageStatus(packageId, status)
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
            <TableHead>Tracking #</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {optimisticPackages.length > 0 ? (
            optimisticPackages.map((pkg) => (
              <TableRow key={pkg.id}>
                <TableCell className="font-medium">{pkg.tracking_number}</TableCell>
                <TableCell>{pkg.users ? `${pkg.users.first_name} ${pkg.users.last_name}` : "—"}</TableCell>
                <TableCell>{pkg.description || "—"}</TableCell>
                <TableCell>{pkg.weight ? `${pkg.weight} lbs` : "—"}</TableCell>
                <TableCell>{getStatusBadge(pkg.status)}</TableCell>
                <TableCell>{new Date(pkg.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleUpdateStatus(pkg.id, "pending")}>
                        Set as Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUpdateStatus(pkg.id, "processing")}>
                        Set as Processing
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUpdateStatus(pkg.id, "in transit")}>
                        Set as In Transit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUpdateStatus(pkg.id, "delivered")}>
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
                No packages found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
