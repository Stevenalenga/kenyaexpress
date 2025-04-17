"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, CheckCircle, XCircle, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { updateMerchantStatus } from "@/app/admin/actions"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface MerchantTableProps {
  merchants: any[]
}

export function MerchantTable({ merchants }: MerchantTableProps) {
  const [optimisticMerchants, setOptimisticMerchants] = useState<any[]>(merchants)
  const [selectedMerchant, setSelectedMerchant] = useState<any | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const handleApprove = async (merchantId: string) => {
    // Optimistic update
    setOptimisticMerchants((prev) =>
      prev.map((merchant) => (merchant.id === merchantId ? { ...merchant, status: "approved" } : merchant)),
    )

    // Server update
    await updateMerchantStatus(merchantId, "approved")
  }

  const handleReject = async (merchantId: string) => {
    // Optimistic update
    setOptimisticMerchants((prev) =>
      prev.map((merchant) =>
        merchant.id === merchantId ? { ...merchant, status: "rejected", rejection_reason: rejectionReason } : merchant,
      ),
    )

    // Server update
    await updateMerchantStatus(merchantId, "rejected", rejectionReason)
    setIsRejectDialogOpen(false)
    setRejectionReason("")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Business Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applied On</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {optimisticMerchants.length > 0 ? (
              optimisticMerchants.map((merchant) => (
                <TableRow key={merchant.id}>
                  <TableCell className="font-medium">{merchant.business_name}</TableCell>
                  <TableCell>
                    {merchant.users?.first_name} {merchant.users?.last_name}
                    <br />
                    <span className="text-gray-500 text-xs">{merchant.users?.email}</span>
                  </TableCell>
                  <TableCell>{merchant.business_type}</TableCell>
                  <TableCell>{getStatusBadge(merchant.status)}</TableCell>
                  <TableCell>{new Date(merchant.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedMerchant(merchant)
                            setIsViewDialogOpen(true)
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        {merchant.status === "pending" && (
                          <>
                            <DropdownMenuItem onClick={() => handleApprove(merchant.id)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              <span>Approve</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedMerchant(merchant)
                                setIsRejectDialogOpen(true)
                              }}
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              <span>Reject</span>
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No merchants found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Merchant Application</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting {selectedMerchant?.business_name}'s application.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rejectionReason">Rejection Reason</Label>
              <Textarea
                id="rejectionReason"
                placeholder="Enter reason for rejection"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => selectedMerchant && handleReject(selectedMerchant.id)}
                disabled={!rejectionReason.trim()}
              >
                Reject Application
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Merchant Details</DialogTitle>
            <DialogDescription>Details for {selectedMerchant?.business_name}</DialogDescription>
          </DialogHeader>
          {selectedMerchant && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium">Business Information</h3>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="font-medium">Business Name:</span> {selectedMerchant.business_name}
                    </div>
                    <div>
                      <span className="font-medium">Business Type:</span> {selectedMerchant.business_type}
                    </div>
                    {selectedMerchant.registration_number && (
                      <div>
                        <span className="font-medium">Registration Number:</span> {selectedMerchant.registration_number}
                      </div>
                    )}
                    {selectedMerchant.tax_id && (
                      <div>
                        <span className="font-medium">Tax ID:</span> {selectedMerchant.tax_id}
                      </div>
                    )}
                    {selectedMerchant.website && (
                      <div>
                        <span className="font-medium">Website:</span>{" "}
                        <a
                          href={selectedMerchant.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {selectedMerchant.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Contact Information</h3>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="font-medium">Name:</span> {selectedMerchant.users?.first_name}{" "}
                      {selectedMerchant.users?.last_name}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span> {selectedMerchant.users?.email}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">Business Description</h3>
                <p className="mt-2 text-gray-700">{selectedMerchant.description}</p>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
                {selectedMerchant.status === "pending" && (
                  <>
                    <Button variant="default" onClick={() => handleApprove(selectedMerchant.id)}>
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setIsViewDialogOpen(false)
                        setIsRejectDialogOpen(true)
                      }}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
