'use client'

import { DataPagination } from '@/components/common/data-pagination'
import { TableSkeleton } from '@/components/common/table-skeleton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import ModDelete from '@/features/panel/components/mods/mod-delete'
import ModUpdateDrawer from '@/features/panel/components/mods/mod-update-drawer'
import ModUpdateVisibility from '@/features/panel/components/mods/mod-update-visibility'
import { useListModsByGameId } from '@/features/panel/queries/mods/useListModsByGameId.query'
import { TListModsByGameIdAction } from '@/server/mod/listModsByGameId.action'
import { Icon } from '@iconify/react'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export type ModTableProps = { gameId: string }

export default function ModTable({ gameId }: ModTableProps) {
  const t = useTranslations('panel.mods.table')

  const [currentPage, setCurrentPage] = useState<number>(1)
  const { data, isLoading } = useListModsByGameId({ page: currentPage, gameId })

  function onPageChange(page: number) {
    setCurrentPage(page)
  }

  const columns: ColumnDef<TListModsByGameIdAction['mods'][number]>[] = [
    {
      accessorKey: 'title',
      header: () => t('title'),
      cell: ({ row }) => {
        return (
          <div className="flex w-40 shrink-0 items-center gap-2">
            <Image
              alt={row.original.title}
              width={50}
              height={50}
              className="size-8 rounded-sm object-cover object-center"
              src={row.original.logo}
            />

            <span className="max-w-5/6 truncate">{row.original.title}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'url',
      header: () => t('url'),
      cell: ({ row }) => {
        return (
          <div className="flex max-w-24 shrink-0 items-center gap-2">
            <Link
              href={`/mods/${row.original.slug}`}
              target="_blank"
              className="max-w-5/6 truncate"
            >
              /mods/{row.original.slug}
            </Link>

            <Icon icon="ph:arrow-square-out" className="size-4" />
          </div>
        )
      },
    },
    {
      accessorKey: 'visible',
      header: () => t('visible'),
      cell: ({ row }) => <ModUpdateVisibility data={row.original} />,
    },
    {
      accessorKey: 'version',
      header: () => t('version'),
      cell: ({ row }) => (
        <Badge variant="secondary">
          <Icon icon="ph:package" className="size-3.5" />{' '}
          {row.original.modVersions[0] ? row.original.modVersions[0].version : '-'}
        </Badge>
      ),
    },
    {
      accessorKey: 'game',
      header: () => t('game'),
      cell: ({ row }) => {
        return (
          <div className="flex w-40 shrink-0 items-center gap-2">
            <Image
              alt={row.original.game.title}
              width={50}
              height={50}
              className="size-5 rounded-xs object-cover object-center"
              src={row.original.game.logo}
            />

            <span className="max-w-5/6 truncate">{row.original.game.title}</span>

            {!row.original.game.visible ? <Icon icon="ph:eye-closed" className="size-3.5" /> : null}
          </div>
        )
      },
    },
    {
      accessorKey: 'createdAt',
      header: () => t('created-at'),
      cell: ({ row }) => {
        return format(row.original.createdAt, 'dd MMM, yyyy')
      },
    },
    {
      accessorKey: 'updatedAt',
      header: () => t('updated-at'),
      cell: ({ row }) => {
        return format(row.original.updatedAt, 'dd MMM, yyyy')
      },
    },
    {
      accessorKey: 'actions',
      header: () => t('actions'),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-3">
            <Button size="sm" variant="outline" asChild>
              <Link
                href={`/admin/dashboard/games/mods/mod-versions?gameId=${gameId}&modId=${row.original.id}&mod=${row.original.title}`}
              >
                {t('versions')}

                <Icon icon="ph:package" />
              </Link>
            </Button>

            <ModUpdateDrawer data={row.original} />

            <ModDelete data={row.original} />
          </div>
        )
      },
    },
  ]

  return isLoading ? (
    <TableSkeleton columns={8} />
  ) : (
    <>
      <DataTable data={data ? data.mods : []} columns={columns} />

      {data?.pagination && data.pagination.totalPages > 1 ? (
        <DataPagination pagination={data.pagination} onPageChange={onPageChange} />
      ) : null}
    </>
  )
}
