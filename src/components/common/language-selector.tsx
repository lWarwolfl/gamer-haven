'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { locales, useLocaleWithProps } from '@/i18n/i18n-configs'
import { setUserLocale } from '@/server/locale'
import { useTranslations } from 'next-intl'
import { useTransition } from 'react'

export default function LanguageSelector() {
  const { locale } = useLocaleWithProps()
  const t = useTranslations('footer')

  const [isPending, startTransition] = useTransition()

  function handleOnChange(value: string) {
    startTransition(async () => {
      await setUserLocale(value)
    })
  }

  return (
    <Select disabled={isPending} onValueChange={handleOnChange} defaultValue={locale}>
      <SelectTrigger className="w-30">
        <SelectValue placeholder={t('language')} />
      </SelectTrigger>

      <SelectContent>
        {locales.map((lang) => (
          <SelectItem key={lang.locale} value={lang.locale}>
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
