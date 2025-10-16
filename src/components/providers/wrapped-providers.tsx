import AuthProvider from '@/components/providers/auth-provider'
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
        <AuthProvider initial={{ user, session }}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </AuthProvider>

        <Toaster />
      </NextIntlProvider>
    </ThemeProvider>
  )
}

export default WrappedProviders
