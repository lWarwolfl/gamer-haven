import { type Fonts, lexend } from '@/i18n/fonts'
import { useLocale } from 'next-intl'
import createMiddleware from 'next-intl/middleware'
import { getLocale } from 'next-intl/server'

export type Direction = 'rtl' | 'ltr'
export const I18nLocaleArray = ['en', 'de'] as const
export type I18nLocale = (typeof I18nLocaleArray)[number]
export type LanguageCode = 'en-US' | 'de-DE'

export type I18nLocaleProps = {
  direction: Direction
  locale: I18nLocale
  languageCode: LanguageCode
  font?: Fonts
  name: string
  disabled: boolean
}

export const defaultLocale: I18nLocale = 'en'
export const locales: I18nLocaleProps[] = [
  {
    locale: 'en',
    direction: 'ltr',
    languageCode: 'en-US',
    font: lexend,
    name: 'English',
    disabled: false,
  },
  {
    locale: 'de',
    languageCode: 'de-DE',
    direction: 'ltr',
    font: lexend,
    name: 'Deutsch',
    disabled: false,
  },
]

export const intlMiddleware = createMiddleware({
  defaultLocale,
  locales: locales.map(({ locale }) => locale),
  localePrefix: 'never',
})

export async function getLocaleWithProps(): Promise<I18nLocaleProps> {
  const locale = (await getLocale()) as I18nLocale
  return locales.find((loc) => loc.locale === locale) as I18nLocaleProps
}

export function getLocaleProps(locale: I18nLocale): I18nLocaleProps {
  return locales.find((loc) => loc.locale === locale) as I18nLocaleProps
}

export function getAlternativeLocales() {
  return locales.reduce(
    (acc, { locale, languageCode }) => ({
      ...acc,
      [languageCode]: `/${locale}`,
    }),
    {} as Record<LanguageCode, `/${I18nLocale}`>
  )
}

export function useLocaleWithProps() {
  const locale = useLocale() as I18nLocale
  return locales.find((loc) => loc.locale === locale) as I18nLocaleProps
}
