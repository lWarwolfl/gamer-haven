import NextIntlProvider from '@/components/providers/next-intl-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import type { PropsWithChildren } from 'react'

const WrappedProviders = async ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <NextIntlProvider>{children}</NextIntlProvider>
    </ThemeProvider>
  )
}

export default WrappedProviders
