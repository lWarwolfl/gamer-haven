import { intlMiddleware } from '@/i18n/i18n-configs'
import { NextRequest } from 'next/server'

export default async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api')) return

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/', '/((?!api/|_next/|.*\\.(?:svg|png|js|txt|jpg|ico|jpeg|gif|webp|json|mp3|mp4)).*)'],
}
