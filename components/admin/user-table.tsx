"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, CheckCircle, XCircle } from "lucide-react"
import { updateUserAdmin } from "@/app/admin/actions"
import type { Database } from "@/lib/supabase/database.types"

type User = Database["public"]["Tables"]["users"]["Row"]

interface UserTableProps {
  users: User[]
}

export function UserTable({ users }: UserTableProps) {
  const [optimisticUsers, setOptimisticUsers] = useState<User[]>(users)

  const handleToggleAdmin = async (userId: string, isAdmin: boolean) => {
    // Optimistic update
    setOptimisticUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, is_admin: !isAdmin } : user)))

    // Server update
    await updateUserAdmin(userId, !isAdmin)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Admin</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {optimisticUsers.length > 0 ? (
            optimisticUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {user.first_name} {user.last_name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone || "—"}</TableCell>
                <TableCell>{user.city && user.country ? `${user.city}, ${user.country}` : "—"}</TableCell>
                <TableCell>
                  {user.is_admin ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Admin</Badge>
                  ) : (
                    <Badge variant="outline">User</Badge>
                  )}
                </TableCell>
                <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleToggleAdmin(user.id, user.is_admin)}>
                        {user.is_admin ? (
                          <>
                            <XCircle className="mr-2 h-4 w-4" />
                            <span>Remove Admin</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            <span>Make Admin</span>
                          </>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
