"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Box, Package, Truck, Settings, LogOut, AlertCircle } from "lucide-react"

export function MerchantDashboard({ merchant }: { merchant: any }) {
  const router = useRouter()
  const supabase = createClient()
  const [activeTab, setActiveTab] = useState("overview")

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Approval</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center space-x-2">
              <Box className="h-6 w-6" />
              <span className="inline-block font-bold">KenyaExpress</span>
            </Link>
            <span className="text-sm font-medium">Merchant Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="flex items-center gap-1">
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">{merchant.business_name}</h1>
            <p className="text-gray-500">Merchant Dashboard</p>
          </div>
          <div>{getStatusBadge(merchant.status)}</div>
        </div>

        {merchant.status === "pending" && (
          <Alert className="mb-8 bg-yellow-50 border-yellow-200">
            <AlertCircle className="h-4 w-4 text-yellow-800" />
            <AlertDescription className="text-yellow-800">
              Your merchant application is currently under review. We'll notify you once it's approved.
            </AlertDescription>
          </Alert>
        )}

        {merchant.status === "rejected" && (
          <Alert className="mb-8 bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-800" />
            <AlertDescription className="text-red-800">
              Your merchant application was rejected. Reason: {merchant.rejection_reason || "No reason provided"}
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="shipments">Shipments</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Packages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Account Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>{getStatusBadge(merchant.status)}</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <span className="font-medium">Business Type:</span> {merchant.business_type}
                  </div>
                  {merchant.registration_number && (
                    <div>
                      <span className="font-medium">Registration Number:</span> {merchant.registration_number}
                    </div>
                  )}
                  {merchant.tax_id && (
                    <div>
                      <span className="font-medium">Tax ID:</span> {merchant.tax_id}
                    </div>
                  )}
                  {merchant.website && (
                    <div>
                      <span className="font-medium">Website:</span>{" "}
                      <a
                        href={merchant.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {merchant.website}
                      </a>
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Description:</span>
                    <p className="text-gray-600 mt-1">{merchant.description}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {merchant.merchant_contacts && merchant.merchant_contacts.length > 0 && (
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium">Primary Contact:</span> {merchant.merchant_contacts[0].first_name}{" "}
                        {merchant.merchant_contacts[0].last_name}
                      </div>
                      <div>
                        <span className="font-medium">Email:</span> {merchant.merchant_contacts[0].email}
                      </div>
                      <div>
                        <span className="font-medium">Phone:</span> {merchant.merchant_contacts[0].phone}
                      </div>
                      {merchant.merchant_contacts[0].position && (
                        <div>
                          <span className="font-medium">Position:</span> {merchant.merchant_contacts[0].position}
                        </div>
                      )}
                    </div>
                  )}

                  {merchant.merchant_addresses && merchant.merchant_addresses.length > 0 && (
                    <div className="space-y-2">
                      <div className="font-medium">Business Address:</div>
                      <div>
                        {merchant.merchant_addresses[0].street_address}
                        <br />
                        {merchant.merchant_addresses[0].city}
                        {merchant.merchant_addresses[0].state && `, ${merchant.merchant_addresses[0].state}`}
                        {merchant.merchant_addresses[0].postal_code && ` ${merchant.merchant_addresses[0].postal_code}`}
                        <br />
                        {merchant.merchant_addresses[0].country}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="shipments">
            <Card>
              <CardHeader>
                <CardTitle>Shipments</CardTitle>
                <CardDescription>Manage your shipments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Truck className="mx-auto h-12 w-12 opacity-30 mb-4" />
                  <p className="text-lg font-medium">No shipments yet</p>
                  <p className="text-sm">Your shipments will appear here once you start shipping.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="packages">
            <Card>
              <CardHeader>
                <CardTitle>Packages</CardTitle>
                <CardDescription>Manage your packages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Package className="mx-auto h-12 w-12 opacity-30 mb-4" />
                  <p className="text-lg font-medium">No packages yet</p>
                  <p className="text-sm">Your packages will appear here once you start shipping.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your merchant account settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Settings className="mx-auto h-12 w-12 opacity-30 mb-4" />
                  <p className="text-lg font-medium">Settings</p>
                  <p className="text-sm">Account settings will be available once your account is approved.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
