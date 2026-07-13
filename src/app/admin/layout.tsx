'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/services', label: 'Services' },
  { href: '/admin/portfolio', label: 'Portfolio' },
  { href: '/admin/gallery', label: 'Gallery' },
  { href: '/admin/awards', label: 'Awards' },
  { href: '/admin/stats', label: 'Stats' },
  { href: '/admin/quotes', label: 'Quotes' },
  { href: '/admin/reviews', label: 'Reviews' },
  { href: '/admin/contacts', label: 'Contacts' },
  { href: '/admin/settings', label: 'Settings' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname === '/admin/login') return children

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-56 bg-gray-900 text-white shrink-0 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <Link href="/admin" className="text-lg font-bold tracking-tight">
            VIP Admin
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2 rounded-lg text-sm transition ${
                pathname === link.href
                  ? 'bg-red text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-800">
          <form method="POST" action="/api/auth/logout">
            <button
              type="submit"
              className="w-full px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition text-left"
            >
              Logout
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  )
}
