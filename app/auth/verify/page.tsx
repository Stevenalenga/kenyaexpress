export default function VerifyPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Check your email</h1>
        <p className="text-gray-600 mb-8">
          We've sent you a verification link. Please check your email and click the link to verify your account.
        </p>
        <p className="text-sm text-gray-500">If you don't see the email, check your spam folder or try again.</p>
      </div>
    </div>
  )
}
