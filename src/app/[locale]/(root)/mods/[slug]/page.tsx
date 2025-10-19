import { DataPagination } from '@/components/common/data-pagination'
import ModCard from '@/components/common/mod-card'
import ModVersionTable from '@/components/common/mod-version-table'
import { listModVersionsByModSlugAction } from '@/server/mod-version/listModVersionsByModSlug.action'
import { getTranslations } from 'next-intl/server'
import { notFound, redirect } from 'next/navigation'

export type ModVersionsByModSlugPageProps = {
  searchParams: Promise<{ page: string | undefined }>
  params: Promise<{ slug: string }>
}

export default async function ModVersionsByModSlugPage({
  params,
  searchParams,
}: ModVersionsByModSlugPageProps) {
  const t = await getTranslations('landing')

  const { page } = await searchParams
  const { slug } = await params

  const data = await listModVersionsByModSlugAction({
    page: page ? Number(page) : 1,
    modSlug: slug,
  })

  if (!data) notFound()

  const { pagination, mod, modVersions } = data

  function onPageChange(page: number) {
    redirect(`/?page=${page}`)
  }

  return (
    <div className="flex flex-1 flex-col gap-6 sm:gap-8">
      <h2 className="flex items-center gap-2 text-xl font-medium">
        <div className="bg-primary h-6 w-1 rounded-full" />
        {mod.title} {t('mod-versions')}
      </h2>

      <ModCard mod={mod} body />

      <ModVersionTable modVersions={modVersions} />

      {pagination && pagination.totalPages > 1 ? (
        <DataPagination pagination={pagination} onPageChange={onPageChange} />
      ) : null}
    </div>
  )
}
