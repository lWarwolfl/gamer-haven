import SectionHeader from '@/features/panel/components/common/section-header'
import GameCreateDrawer from '@/features/panel/components/games/game-create-drawer'
import GameTable from '@/features/panel/components/games/game-table'
import { getTranslations } from 'next-intl/server'

export default async function GamesPage() {
  const t = await getTranslations('panel.games.page')

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader section={t('title')} action={<GameCreateDrawer />} />

      <GameTable />
    </div>
  )
}
