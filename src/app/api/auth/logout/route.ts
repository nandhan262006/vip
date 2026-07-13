import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const COOKIE_NAME = 'admin_auth'

export async function POST(request: Request) {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
  const loginUrl = new URL('/admin/login', request.url)
  return NextResponse.redirect(loginUrl)
}
