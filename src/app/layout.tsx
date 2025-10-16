import WrappedProviders from '@/components/providers/wrapped-providers'
import ReactScan from '@/components/utils/react-scan'
import { HOST } from '@/config'
import { getAlternativeLocales, getLocaleWithProps } from '@/i18n/i18n-configs'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { PropsWithChildren } from 'react'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(HOST + '/'),
  alternates: {
    canonical: '/',
    languages: getAlternativeLocales(),
  },
  manifest: '/manifest.json',
  title: 'Gamer Haven - The Ultimate Game Modding Playground',
  description:
    'Welcome to Gamer Haven – your one-stop destination for epic game mods, customizations, and tools to level up your gaming experience. Whether you’re hunting for the latest mods, exploring new game content, or customizing your gameplay, we’ve got you covered.',
  keywords: [
    'Gamer Haven',
    'game mods',
    'game modding',
    'modding community',
    'game customization',
    'gaming tools',
    'epic mods',
    'game hacks',
    'custom game content',
    'game enhancements',
    'modding platform',
    'level up games',
    'video game mods',
  ],
}

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocaleWithProps()

  return (
    <html
      lang={locale.locale}
      dir={locale.direction}
      suppressHydrationWarning
      className={cn(locale.font?.variable)}
    >
      <body className={cn(locale.font?.className, 'antialiased')}>
        <WrappedProviders>{children}</WrappedProviders>

        <ReactScan />
      </body>
    </html>
  )
}
