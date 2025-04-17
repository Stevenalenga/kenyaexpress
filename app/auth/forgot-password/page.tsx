import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">KenyaExpress</h1>
          <p className="mt-2 text-gray-600">Reset your password</p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  )
}
