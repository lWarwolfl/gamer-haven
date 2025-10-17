import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { Icon } from '@iconify/react'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export default async function DashboardPage() {
  const t = await getTranslations('panel.home')

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon icon="ph:lighthouse" className="size-6" />
        </EmptyMedia>

        <EmptyTitle>{t('title')}</EmptyTitle>

        <EmptyDescription>{t('description')}</EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/dashboard/games">{t('button')}</Link>
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  )
}
