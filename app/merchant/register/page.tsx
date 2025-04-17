import { MerchantRegistrationForm } from "@/components/merchant/merchant-registration-form"

export default function MerchantRegistrationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <a href="/" className="flex items-center space-x-2">
              <span className="inline-block font-bold">KenyaExpress</span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <a href="/auth/sign-in" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Login
              </a>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Become a Merchant Partner</h1>
            <p className="mt-2 text-gray-600">Join our network of merchants and expand your business to Kenya</p>
          </div>
          <MerchantRegistrationForm />
        </div>
      </main>
    </div>
  )
}
