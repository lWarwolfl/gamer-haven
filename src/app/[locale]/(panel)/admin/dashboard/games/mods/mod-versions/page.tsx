import SectionHeader from '@/features/panel/components/common/section-header'
import ModVersionCreateDrawer from '@/features/panel/components/mod-versions/mod-version-create-drawer'
import ModVersionTable from '@/features/panel/components/mod-versions/mod-version-table'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

export type ModsModVersionsPageProps = {
  searchParams: Promise<{
    modId: string | undefined
    gameId: string | undefined
    mod: string | undefined
  }>
}

export default async function ModsModVersionsPage({ searchParams }: ModsModVersionsPageProps) {
  const t = await getTranslations('panel.mod-versions.page')
  const { modId, gameId, mod } = await searchParams

  if (!gameId || !modId) return notFound()

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader
        section={t('title', { name: mod ? mod : '' })}
        action={<ModVersionCreateDrawer modId={modId} gameId={gameId} />}
      />

      <ModVersionTable modId={modId} />
    </div>
  )
}
