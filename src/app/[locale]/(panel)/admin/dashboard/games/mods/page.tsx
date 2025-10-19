import SectionHeader from '@/features/panel/components/common/section-header'
import ModCreateDrawer from '@/features/panel/components/mods/mod-create-drawer'
import ModTable from '@/features/panel/components/mods/mod-table'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

export type DashboardPageProps = {
  searchParams: Promise<{ gameId: string | undefined; game: string | undefined }>
}

export default async function ModsPage({ searchParams }: DashboardPageProps) {
  const t = await getTranslations('panel.mods.page')
  const { gameId, game } = await searchParams

  if (!gameId) return notFound()

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader
        section={t('title', { name: game ? game : '' })}
        action={<ModCreateDrawer gameId={gameId} />}
      />

      <ModTable gameId={gameId} />
    </div>
  )
}
