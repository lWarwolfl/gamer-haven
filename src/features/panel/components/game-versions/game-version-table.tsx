'use client'

import { DataPagination } from '@/components/common/data-pagination'
import { TableSkeleton } from '@/components/common/table-skeleton'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/ui/data-table'
import GameVersionDelete from '@/features/panel/components/game-versions/game-version-delete'
import GameVersionUpdateDrawer from '@/features/panel/components/game-versions/game-version-update-drawer'
import { useListGameVersionsByGameId } from '@/features/panel/queries/game-versions/useListGameVersionsByGameId.query'
import { TListGameVersionsByGameIdAction } from '@/server/game-version/listGameVersionsByGameId.action'
import { Icon } from '@iconify/react'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'

export type GameVersionTableProps = { gameId: string }

export default function GameVersionTable({ gameId }: GameVersionTableProps) {
  const t = useTranslations('panel.game-versions.table')

  const [currentPage, setCurrentPage] = useState<number>(1)
  const { data, isFetching } = useListGameVersionsByGameId({ page: currentPage, gameId })

  function onPageChange(page: number) {
    setCurrentPage(page)
  }

  const columns: ColumnDef<TListGameVersionsByGameIdAction['gameVersions'][number]>[] = [
    {
      accessorKey: 'version',
      header: () => t('version'),
      cell: ({ row }) => (
        <Badge variant="secondary">
          <Icon icon="ph:package" className="size-3.5" /> {row.original.version}
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
              alt={row.original.version}
              width={50}
              height={50}
              className="size-5 rounded-xs object-cover object-center"
              src={row.original.game.logo}
            />

            <span className="max-w-5/6 truncate">{row.original.game.title}</span>
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
      accessorKey: 'actions',
      header: () => t('actions'),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-3">
            <GameVersionUpdateDrawer data={row.original} />

            <GameVersionDelete data={row.original} />
          </div>
        )
      },
    },
  ]

  return isFetching ? (
    <TableSkeleton />
  ) : (
    <>
      <DataTable data={data ? data.gameVersions : []} columns={columns} />

      {data?.pagination && data.pagination.totalPages > 1 ? (
        <DataPagination pagination={data.pagination} onPageChange={onPageChange} />
      ) : null}
    </>
  )
}
