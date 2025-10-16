import { usePathHelper } from '@/lib/hooks/usePathHelper.hook'
import { useLocale, useTranslations } from 'next-intl'
import { useMemo } from 'react'

export function useLinks() {
  const locale = useLocale()
  const { isCurrentPath } = usePathHelper()
  const t = useTranslations('global.routes')

  // Memoize the menu items to avoid unnecessary re-renders.
  const items = useMemo(() => {
    const mainItems = [
      {
        type: 'link',
        name: t('games'),
        path: '/',
        get isActive() {
          return isCurrentPath(this.path)
        },
      },
      {
        type: 'link',
        name: t('mods'),
        path: '/mods',
        get isActive() {
          return isCurrentPath(this.path)
        },
      },
    ] as const

    const socialItems = [
      {
        name: 'Mail',
        icon: 'circum:mail',
        url: 'mailto:sinakheiri.dev@gmail.com',
      },
      {
        name: 'Linkedin',
        icon: 'circum:linkedin',
        url: 'https://www.linkedin.com/in/sinakheiri-dev',
      },
      {
        name: 'Github',
        icon: 'proicons:github',
        url: 'https://github.com/lWarwolfl',
      },
    ] as const

    return {
      mainItems,
      socialItems,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale, isCurrentPath])

  return items
}

export type TMainLinkItem = ReturnType<typeof useLinks>['mainItems'][number]
export type TSocialLinkItem = ReturnType<typeof useLinks>['socialItems'][number]
