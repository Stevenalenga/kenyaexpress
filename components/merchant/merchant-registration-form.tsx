"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function MerchantRegistrationForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("business")

  const [formData, setFormData] = useState({
    // Business Information
    businessName: "",
    businessType: "",
    registrationNumber: "",
    taxId: "",
    website: "",
    description: "",

    // Contact Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",

    // Address Information
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",

    // Account Information
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()

      // Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (authError) throw authError

      if (authData.user) {
        // Create user profile with is_merchant flag
        const { error: userError } = await supabase.from("users").insert({
          id: authData.user.id,
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          is_merchant: true,
        })

        if (userError) throw userError

        // Create merchant profile
        const { data: merchantData, error: merchantError } = await supabase
          .from("merchants")
          .insert({
            user_id: authData.user.id,
            business_name: formData.businessName,
            business_type: formData.businessType,
            registration_number: formData.registrationNumber,
            tax_id: formData.taxId,
            website: formData.website,
            description: formData.description,
            status: "pending",
          })
          .select()

        if (merchantError) throw merchantError

        // Create merchant address
        if (merchantData && merchantData[0]) {
          const { error: addressError } = await supabase.from("merchant_addresses").insert({
            merchant_id: merchantData[0].id,
            address_type: "business",
            street_address: formData.streetAddress,
            city: formData.city,
            state: formData.state,
            postal_code: formData.postalCode,
            country: formData.country,
            is_primary: true,
          })

          if (addressError) throw addressError

          // Create merchant contact
          const { error: contactError } = await supabase.from("merchant_contacts").insert({
            merchant_id: merchantData[0].id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            position: formData.position,
            is_primary: true,
          })

          if (contactError) throw contactError
        }
      }

      setSuccess(true)

      // Reset form
      setFormData({
        businessName: "",
        businessType: "",
        registrationNumber: "",
        taxId: "",
        website: "",
        description: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        position: "",
        streetAddress: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        password: "",
        confirmPassword: "",
      })

      // Redirect to verification page
      setTimeout(() => {
        router.push("/auth/verify")
      }, 3000)
    } catch (error: any) {
      setError(error.message || "An error occurred during registration")
    } finally {
      setIsLoading(false)
    }
  }

  const nextTab = () => {
    if (activeTab === "business") setActiveTab("contact")
    else if (activeTab === "contact") setActiveTab("address")
    else if (activeTab === "address") setActiveTab("account")
  }

  const prevTab = () => {
    if (activeTab === "account") setActiveTab("address")
    else if (activeTab === "address") setActiveTab("contact")
    else if (activeTab === "contact") setActiveTab("business")
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Merchant Registration</CardTitle>
        <CardDescription>Complete the form below to register as a merchant partner with KenyaExpress</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription>
              Your merchant application has been submitted successfully! Please check your email to verify your account.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="business">Business Info</TabsTrigger>
              <TabsTrigger value="contact">Contact Info</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>

            <TabsContent value="business" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  placeholder="Your Business Name"
                  required
                  value={formData.businessName}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type *</Label>
                <Select
                  value={formData.businessType}
                  onValueChange={(value) => handleSelectChange("businessType", value)}
                >
                  <SelectTrigger id="businessType">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sole_proprietorship">Sole Proprietorship</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="corporation">Corporation</SelectItem>
                    <SelectItem value="llc">Limited Liability Company</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Business Registration Number</Label>
                <Input
                  id="registrationNumber"
                  placeholder="Registration Number"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID / VAT Number</Label>
                <Input id="taxId" placeholder="Tax ID" value={formData.taxId} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://www.example.com"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Business Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Tell us about your business and the services you offer"
                  required
                  className="min-h-[100px]"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-end">
                <Button type="button" onClick={nextTab}>
                  Next
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" placeholder="Doe" required value={formData.lastName} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position in Company</Label>
                <Input
                  id="position"
                  placeholder="CEO, Manager, etc."
                  value={formData.position}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevTab}>
                  Previous
                </Button>
                <Button type="button" onClick={nextTab}>
                  Next
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="address" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="streetAddress">Street Address *</Label>
                <Input
                  id="streetAddress"
                  placeholder="123 Business St"
                  required
                  value={formData.streetAddress}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" placeholder="City" required value={formData.city} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input id="state" placeholder="State/Province" value={formData.state} onChange={handleChange} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input id="country" placeholder="Country" required value={formData.country} onChange={handleChange} />
                </div>
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevTab}>
                  Previous
                </Button>
                <Button type="button" onClick={nextTab}>
                  Next
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="account" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input id="password" type="password" required value={formData.password} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <div className="pt-4">
                <p className="text-sm text-gray-500 mb-4">
                  By submitting this form, you agree to our Terms of Service and Privacy Policy. Your application will
                  be reviewed by our team.
                </p>
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevTab}>
                  Previous
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </CardContent>
    </Card>
  )
}
