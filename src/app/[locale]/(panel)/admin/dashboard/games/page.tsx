import GamesPageClient from '@/app/[locale]/(panel)/admin/dashboard/games/page.client'

export type DashboardPageProps = {
  searchParams: Promise<{ gameId: string | undefined }>
}

export default async function GameVersionsPage({ searchParams }: DashboardPageProps) {
  const { gameId } = await searchParams

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl">{gameId}</div>

        <GamesPageClient />

        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </div>
  )
}
