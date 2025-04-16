"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, CheckCircle, MessageSquare } from "lucide-react"
import { updateMessageStatus } from "@/app/admin/actions"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import type { Database } from "@/lib/supabase/database.types"

type Message = Database["public"]["Tables"]["contact_messages"]["Row"]

interface MessageTableProps {
  messages: Message[]
}

export function MessageTable({ messages }: MessageTableProps) {
  const [optimisticMessages, setOptimisticMessages] = useState<Message[]>(messages)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  const handleUpdateStatus = async (messageId: string, status: string) => {
    // Optimistic update
    setOptimisticMessages((prev) =>
      prev.map((message) => (message.id === messageId ? { ...message, status } : message)),
    )

    // Server update
    await updateMessageStatus(messageId, status)
  }

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case "read":
        return <Badge className="bg-blue-100 text-blue-800">Read</Badge>
      case "responded":
        return <Badge className="bg-green-100 text-green-800">Responded</Badge>
      case "unread":
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Unread</Badge>
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {optimisticMessages.length > 0 ? (
              optimisticMessages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell className="font-medium">
                    {message.first_name} {message.last_name}
                  </TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell className="max-w-[300px] truncate">{message.message}</TableCell>
                  <TableCell>{getStatusBadge(message.status)}</TableCell>
                  <TableCell>{new Date(message.created_at).toLocaleDateString()}</TableCell>
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
                            setSelectedMessage(message)
                            if (message.status === "unread") {
                              handleUpdateStatus(message.id, "read")
                            }
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Message</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(message.id, "read")}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          <span>Mark as Read</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(message.id, "responded")}>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          <span>Mark as Responded</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No messages found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              Message from {selectedMessage?.first_name} {selectedMessage?.last_name}
            </DialogTitle>
            <DialogDescription>
              Received on {selectedMessage && new Date(selectedMessage.created_at).toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium">Email</h4>
              <p className="text-sm">{selectedMessage?.email}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Message</h4>
              <p className="text-sm whitespace-pre-wrap">{selectedMessage?.message}</p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                Close
              </Button>
              <Button
                onClick={() => {
                  if (selectedMessage) {
                    handleUpdateStatus(selectedMessage.id, "responded")
                    setSelectedMessage(null)
                  }
                }}
              >
                Mark as Responded
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
