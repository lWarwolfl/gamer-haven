'use client'

import { DataPagination } from '@/components/common/data-pagination'
import { TableSkeleton } from '@/components/common/table-skeleton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import ModVersionDelete from '@/features/panel/components/mod-versions/mod-version-delete'
import ModVersionUpdateDrawer from '@/features/panel/components/mod-versions/mod-version-update-drawer'
import { useListModVersionsByModId } from '@/features/panel/queries/mod-versions/useListModVersionsByModId.query'
import { TListModVersionsByModIdAction } from '@/server/mod-version/listModVersionsByModId.action'
import { Icon } from '@iconify/react'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export type ModVersionTableProps = { modId: string }

export default function ModVersionTable({ modId }: ModVersionTableProps) {
  const t = useTranslations('panel.mod-versions.table')

  const [currentPage, setCurrentPage] = useState<number>(1)
  const { data, isLoading } = useListModVersionsByModId({ page: currentPage, modId })

  function onPageChange(page: number) {
    setCurrentPage(page)
  }

  const columns: ColumnDef<TListModVersionsByModIdAction['modVersions'][number]>[] = [
    {
      accessorKey: 'version',
      header: () => t('version'),
      cell: ({ row }) => {
        return (
          <Badge variant="secondary">
            <Icon icon="ph:package" className="size-3.5" />
            {row.original.version}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'mod',
      header: () => t('mod'),
      cell: ({ row }) => {
        return (
          <div className="flex w-30 shrink-0 items-center gap-2">
            <Image
              alt={row.original.mod.title}
              width={50}
              height={50}
              className="size-5 rounded-xs object-cover object-center"
              src={row.original.mod.logo}
            />

            <span className="max-w-5/6 truncate">{row.original.mod.title}</span>

            {!row.original.mod.visible ? <Icon icon="ph:eye-closed" className="size-3.5" /> : null}
          </div>
        )
      },
    },
    {
      accessorKey: 'game-versions',
      header: () => t('game-versions'),
      cell: ({ row }) => (
        <Badge variant="secondary">
          {row.original.modVersionGameVersions.map((item) => item.gameVersion.version).join(', ')}
        </Badge>
      ),
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
              <Link href={row.original.url} rel="noopenner no referrer">
                {t('download')}

                <Icon icon="ph:download" />
              </Link>
            </Button>

            <ModVersionUpdateDrawer data={row.original} />

            <ModVersionDelete data={row.original} />
          </div>
        )
      },
    },
  ]

  return isLoading ? (
    <TableSkeleton columns={8} />
  ) : (
    <>
      <DataTable data={data ? data.modVersions : []} columns={columns} />

      {data?.pagination && data.pagination.totalPages > 1 ? (
        <DataPagination pagination={data.pagination} onPageChange={onPageChange} />
      ) : null}
    </>
  )
}
