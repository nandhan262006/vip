import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/api/admin')) {
    const authCookie = request.cookies.get('admin_auth')
    if (authCookie?.value !== 'true') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.next()
  }

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const authCookie = request.cookies.get('admin_auth')
    if (authCookie?.value !== 'true') {
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
