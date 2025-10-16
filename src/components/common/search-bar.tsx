'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SearchBar() {
  const t = useTranslations('header')

  const router = useRouter()
  const [param, setParam] = useState<string | undefined>()

  function search() {
    router.push(`/mods${param}`)
  }

  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <Input
        type="email"
        onChange={(e) => setParam(e.target.value)}
        placeholder={t('search-placeholder')}
      />

      <Button size="icon" variant="outline" disabled={!param} onClick={() => search()}>
        <Icon icon="ph:magnifying-glass" className="size-5" />

        <span className="sr-only">{t('search')}</span>
      </Button>
    </div>
  )
}
