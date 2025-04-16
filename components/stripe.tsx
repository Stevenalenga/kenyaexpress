"use client"

import type { ReactNode } from "react"

// Mock Stripe instance for demo purposes
// In a real app, you would use your actual Stripe publishable key
const stripePromise = {
  then: (callback: any) =>
    callback({
      elements: () => ({
        create: () => ({
          mount: () => {},
          on: () => {},
          unmount: () => {},
        }),
      }),
    }),
}

export function Stripe({ children }: { children: ReactNode }) {
  return <div className="w-full">{children}</div>
}

