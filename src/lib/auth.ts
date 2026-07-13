import { cookies } from 'next/headers'

const COOKIE_NAME = 'admin_auth'

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)
  return token?.value === 'true'
}
