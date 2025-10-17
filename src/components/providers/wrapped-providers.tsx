import { SupabaseAuthProvider } from '@/components/providers/supabase-auth-provider'
import NextIntlProvider from '@/components/providers/next-intl-provider'
import ReactQueryProvider from '@/components/providers/react-query-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { getCurrentUser, getSession } from '@/lib/supabase/functions'
import type { PropsWithChildren } from 'react'

const WrappedProviders = async ({ children }: PropsWithChildren) => {
  const [user, session] = await Promise.all([getCurrentUser(), getSession()])

  return (
    <ThemeProvider>
      <NextIntlProvider>
        <SupabaseAuthProvider user={user} session={session}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </SupabaseAuthProvider>

        <Toaster />
      </NextIntlProvider>
    </ThemeProvider>
  )
}

export default WrappedProviders
