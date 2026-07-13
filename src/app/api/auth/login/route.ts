import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'admin_auth'
const COOKIE_MAX_AGE = 60 * 60 * 24

export async function POST(request: Request) {
  const formData = await request.formData()
  const password = formData.get('password') as string
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }

  if (password !== adminPassword) {
    const loginUrl = new URL('/admin/login?error=1', request.url)
    return NextResponse.redirect(loginUrl)
  }

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })

  const adminUrl = new URL('/admin', request.url)
  return NextResponse.redirect(adminUrl)
}
