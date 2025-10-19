import { DataPagination } from '@/components/common/data-pagination'
import GameCard from '@/components/common/game-card'
import ModCard from '@/components/common/mod-card'
import { listModsByGameSlugAction } from '@/server/mod/listModsByGameSlug.action'
import { getTranslations } from 'next-intl/server'
import { notFound, redirect } from 'next/navigation'

export type ModsByGameSlugPageProps = {
  searchParams: Promise<{ page: string | undefined }>
  params: Promise<{ slug: string }>
}

export default async function ModsByGameSlugPage({
  params,
  searchParams,
}: ModsByGameSlugPageProps) {
  const t = await getTranslations('landing')

  const { page } = await searchParams
  const { slug } = await params

  const data = await listModsByGameSlugAction({
    page: page ? Number(page) : 1,
    gameSlug: slug,
  })

  if (!data) notFound()

  const { pagination, mods, game } = data

  function onPageChange(page: number) {
    redirect(`/?page=${page}`)
  }

  return (
    <div className="flex flex-1 flex-col gap-6 sm:gap-8">
      <h2 className="flex items-center gap-2 text-xl font-medium">
        <div className="bg-primary h-6 w-1 rounded-full" />
        {game.title} {t('game')} {t('mods')}
      </h2>

      <GameCard game={game} logo />

      {mods.map((item) => (
        <ModCard key={item.id} mod={item} />
      ))}

      {pagination && pagination.totalPages > 1 ? (
        <DataPagination pagination={pagination} onPageChange={onPageChange} />
      ) : null}
    </div>
  )
}
