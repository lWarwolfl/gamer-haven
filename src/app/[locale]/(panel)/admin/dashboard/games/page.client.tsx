'use client'

import { usePathHelper } from '@/lib/hooks/usePathHelper.hook'

export default function GamesPageClient() {
  const { pathname } = usePathHelper()

  return <div className="bg-muted/50 aspect-video rounded-xl">{pathname}</div>
}
