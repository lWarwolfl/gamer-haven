'use server'

import { defaultLocale } from '@/i18n/i18n-configs'
import type { Locale } from 'next-intl'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'NEXT_LOCALE'

export async function getUserLocale() {
  return (await cookies()).get(COOKIE_NAME)?.value || defaultLocale
}

export async function setUserLocale(locale: Locale) {
  ;(await cookies()).set(COOKIE_NAME, locale)
}
