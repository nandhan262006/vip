'use client'

import { useSearchParams } from 'next/navigation'

export default function AdminLoginPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form method="POST" action="/api/auth/login" className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-sm text-gray-500 mt-1">Enter password to access dashboard</p>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red focus:outline-none"
            autoFocus
          />
        </div>
        {error && <p className="text-red-600 text-sm">Invalid password</p>}
        <button
          type="submit"
          className="w-full bg-red text-white py-2.5 rounded-lg font-medium hover:bg-red-dark transition"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}
