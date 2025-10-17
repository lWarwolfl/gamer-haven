import { intlMiddleware } from '@/i18n/i18n-configs'
import { getCurrentUser } from '@/lib/supabase/functions'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api')) return

  const user = await getCurrentUser()

  if (request.nextUrl.pathname === '/admin') {
    if (!user || user.is_anonymous) {
      return NextResponse.redirect(new URL(`/admin/signin`, request.url))
    } else {
      return NextResponse.redirect(new URL(`/admin/dashboard`, request.url))
    }
  }

  if (request.nextUrl.pathname.includes('/admin/dashboard')) {
    if (!user || user.is_anonymous) {
      return NextResponse.redirect(new URL(`/admin/signin`, request.url))
    }
  }

  if (request.nextUrl.pathname === '/admin/signin') {
    if (user && !user.is_anonymous) {
      return NextResponse.redirect(new URL(`/admin/dashboard`, request.url))
    }
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/', '/((?!api/|_next/|.*\\.(?:svg|png|js|txt|jpg|ico|jpeg|gif|webp|json|mp3|mp4)).*)'],
}
