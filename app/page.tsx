import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Box, Clock, DollarSign, Globe, Mail, MapPin, Phone, ShieldCheck, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ContactForm } from "@/components/contact-form"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Box className="h-6 w-6" />
              <span className="inline-block font-bold">KenyaExpress</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <Button asChild variant="ghost">
                <Link href="#how-it-works">How It Works</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="#pricing">Pricing</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="#faq">FAQ</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/merchant/register">For Merchants</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/auth/sign-in">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/sign-up">Sign Up</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Your US Shopping Delivered to Kenya
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    We import goods from the United States to Kenya. Shop from your favorite US stores, ship to our
                    warehouse, and we'll handle the rest.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/auth/sign-up">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="#how-it-works">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=550&width=550"
                  width={550}
                  height={550}
                  alt="Shipping illustration"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our simple process makes it easy to get your US purchases delivered to Kenya
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 md:gap-12">
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                  <Globe className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">1. Shop US Stores</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Shop from any US retailer online and use our US warehouse address for delivery.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                  <Box className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">2. We Receive & Repackage</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  We receive your packages at our warehouse, inspect them, and prepare them for international shipping.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                  <Truck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">3. Delivery to Kenya</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  We ship your packages to Kenya and deliver them directly to your specified address.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Why Choose Us</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  We make importing from the US to Kenya simple, reliable, and affordable
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                  <CardTitle>Secure Handling</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 dark:text-gray-400">
                    Your packages are handled with care and fully insured during transit.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <DollarSign className="h-8 w-8 text-primary" />
                  <CardTitle>Competitive Rates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 dark:text-gray-400">
                    Our pricing is transparent and competitive, with no hidden fees.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Clock className="h-8 w-8 text-primary" />
                  <CardTitle>Flexible Storage</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 dark:text-gray-400">
                    We offer flexible storage options while you wait for additional items.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Pricing Information</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our pricing varies based on weight and storage time
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Costs</CardTitle>
                  <CardDescription>Based on package weight and dimensions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Light packages (0-2 lbs)</span>
                    <span className="font-medium">Starting at $15</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Medium packages (2-10 lbs)</span>
                    <span className="font-medium">Starting at $30</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Heavy packages (10+ lbs)</span>
                    <span className="font-medium">Custom quote</span>
                  </div>
                  <p className="text-sm text-gray-500 pt-4 dark:text-gray-400">
                    * Actual rates may vary based on dimensions and destination within Kenya. Contact us for a precise
                    quote.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Storage Costs</CardTitle>
                  <CardDescription>For packages awaiting consolidation or shipment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>First 14 days</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>15-30 days</span>
                    <span className="font-medium">$2/day per package</span>
                  </div>
                  <div className="flex justify-between">
                    <span>31+ days</span>
                    <span className="font-medium">$3/day per package</span>
                  </div>
                  <p className="text-sm text-gray-500 pt-4 dark:text-gray-400">
                    * Storage fees are calculated from the day the package arrives at our warehouse. We'll notify you
                    when your package arrives.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Frequently Asked Questions</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Find answers to common questions about our service
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl py-12">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                  <AccordionContent>
                    Shipping typically takes 10-15 business days from our US warehouse to Kenya. This can vary based on
                    customs processing and local delivery conditions.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What items can't be shipped?</AccordionTrigger>
                  <AccordionContent>
                    We cannot ship hazardous materials, perishable goods, weapons, illegal items, or any goods
                    prohibited for import into Kenya. Please contact us if you're unsure about a specific item.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Do you handle customs clearance?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we handle the customs clearance process. However, any import duties or taxes levied by Kenyan
                    customs will be the responsibility of the recipient.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>How do I track my package?</AccordionTrigger>
                  <AccordionContent>
                    Once your package is shipped from our US warehouse, you'll receive a tracking number that you can
                    use to monitor your shipment's progress.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>What happens if my package is lost or damaged?</AccordionTrigger>
                  <AccordionContent>
                    All packages are insured during transit. In the rare event that a package is lost or damaged, we'll
                    work with you to file a claim and provide appropriate compensation.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Contact Us</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Ready to get started? Get in touch with us today.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Our Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>+254 700 000 000</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>info@kenyaexpress.com</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p>US Warehouse:</p>
                      <p>123 Shipping Lane, Suite 456</p>
                      <p>Miami, FL 33101, USA</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p>Kenya Office:</p>
                      <p>789 Delivery Road</p>
                      <p>Nairobi, Kenya</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left dark:text-gray-400">
            © 2023 KenyaExpress. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-gray-500 underline-offset-4 hover:underline dark:text-gray-400">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-gray-500 underline-offset-4 hover:underline dark:text-gray-400">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
