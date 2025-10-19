import { DataPagination } from '@/components/common/data-pagination'
import GameCard from '@/components/common/game-card'
import { listGamesCachedAction } from '@/server/game/listGamesCached.action'
import { getTranslations } from 'next-intl/server'
import { redirect } from 'next/navigation'

export type HomePageProps = {
  searchParams: Promise<{ page: string | undefined }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const t = await getTranslations('landing')
  const { page } = await searchParams

  const { pagination, games } = await listGamesCachedAction({ page: page ? Number(page) : 1 })

  function onPageChange(page: number) {
    redirect(`/?page=${page}`)
  }

  return (
    <div className="flex w-full flex-1 flex-col gap-6 sm:gap-8">
      <h2 className="flex items-center gap-2 text-xl font-medium">
        <div className="bg-primary h-6 w-1 rounded-full" />
        {t('games')}
      </h2>

      {games.map((item) => (
        <GameCard key={item.id} game={item} />
      ))}

      {pagination && pagination.totalPages > 1 ? (
        <DataPagination pagination={pagination} onPageChange={onPageChange} />
      ) : null}
    </div>
  )
}
