import SectionHeader from '@/features/panel/components/common/section-header'
import GameVersionCreateDrawer from '@/features/panel/components/game-versions/game-version-create-drawer'
import GameVersionTable from '@/features/panel/components/game-versions/game-version-table'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

export type GameVersionsPageProps = {
  searchParams: Promise<{ gameId: string | undefined; game: string | undefined }>
}

export default async function GameVersionsPage({ searchParams }: GameVersionsPageProps) {
  const t = await getTranslations('panel.game-versions.page')
  const { gameId, game } = await searchParams

  if (!gameId) return notFound()

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader
        section={t('title', { name: game ? game : '' })}
        action={<GameVersionCreateDrawer gameId={gameId} />}
      />

      <GameVersionTable gameId={gameId} />
    </div>
  )
}
