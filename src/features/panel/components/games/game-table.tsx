'use client'

import { TableSkeleton } from '@/components/common/table-skeleton'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/ui/data-table'
import GameDelete from '@/features/panel/components/games/game-delete'
import GameUpdateDrawer from '@/features/panel/components/games/game-update-drawer'
import { useListGames } from '@/features/panel/queries/useListGames.query'
import { TListGamesAction } from '@/server/game/listGames.action'
import { ColumnDef } from '@tanstack/react-table'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function GameTable() {
  const t = useTranslations('panel.games.table')

  const { data, isLoading } = useListGames()

  const columns: ColumnDef<TListGamesAction[number]>[] = [
    {
      accessorKey: 'title',
      header: () => t('title'),
      cell: ({ row }) => {
        return (
          <div className="flex shrink-0 items-center gap-2 min-w-40">
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
      accessorKey: 'actions',
      header: () => t('actions'),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-3">
            <GameUpdateDrawer data={row.original} />

            <GameDelete data={row.original} />
          </div>
        )
      },
    },
  ]

  return isLoading ? <TableSkeleton /> : <DataTable data={data ? data : []} columns={columns} />
}
