'use client'

import { DataPagination } from '@/components/common/data-pagination'
import { TableSkeleton } from '@/components/common/table-skeleton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import GameDelete from '@/features/panel/components/games/game-delete'
import GameUpdateDrawer from '@/features/panel/components/games/game-update-drawer'
import { useListGames } from '@/features/panel/queries/games/useListGames.query'
import { TListGamesAction } from '@/server/game/listGames.action'
import { Icon } from '@iconify/react'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function GameTable() {
  const t = useTranslations('panel.games.table')

  const [currentPage, setCurrentPage] = useState<number>(1)
  const { data, isFetching } = useListGames({ page: currentPage })

  function onPageChange(page: number) {
    setCurrentPage(page)
  }

  const columns: ColumnDef<TListGamesAction['games'][number]>[] = [
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
      accessorKey: 'mod',
      header: () => t('mod'),
      cell: ({ row }) => <Badge variant="secondary">{row.original.mods.length}</Badge>,
    },
    {
      accessorKey: 'version',
      header: () => t('version'),
      cell: ({ row }) => {
        return (
          <Badge variant="secondary">
            {row.original.gameVersions[0] ? row.original.gameVersions[0].version : '-'}
          </Badge>
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
                href={`/admin/dashboard/games/game-versions?gameId=${row.original.id}&game=${row.original.title}`}
              >
                {t('versions')}

                <Icon icon="ph:package" />
              </Link>
            </Button>

            <Button size="sm" variant="outline" asChild>
              <Link
                href={`/admin/dashboard/games/mods?gameId=${row.original.id}&game=${row.original.title}`}
              >
                {t('mods')}

                <Icon icon="ph:puzzle-piece" />
              </Link>
            </Button>

            <GameUpdateDrawer data={row.original} />

            <GameDelete data={row.original} />
          </div>
        )
      },
    },
  ]

  return isFetching ? (
    <TableSkeleton columns={6} />
  ) : (
    <>
      <DataTable data={data ? data.games : []} columns={columns} />

      {data?.pagination && data.pagination.totalPages > 1 ? (
        <DataPagination pagination={data.pagination} onPageChange={onPageChange} />
      ) : null}
    </>
  )
}
