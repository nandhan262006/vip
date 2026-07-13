'use client'

import { useEffect } from 'react'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center px-4 bg-white">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-red mb-4">500</h1>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-500 mb-6">A critical error occurred.</p>
            <button onClick={reset} className="bg-red text-white px-6 py-3 rounded-lg font-medium hover:bg-red-dark transition">
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
