'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { TListModVersionsByModSlugAction } from '@/server/mod-version/listModVersionsByModSlug.action'
import { Icon } from '@iconify/react'
import { ColumnDef } from '@tanstack/react-table'
import { formatDistanceToNow } from 'date-fns'
import { de, enUS } from 'date-fns/locale'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'

export type ModVersionTableProps = {
  modVersions: NonNullable<TListModVersionsByModSlugAction>['modVersions']
}

export default function ModVersionTable({ modVersions }: ModVersionTableProps) {
  const t = useTranslations('panel.mod-versions.table')
  const locale = useLocale()

  const columns: ColumnDef<NonNullable<TListModVersionsByModSlugAction>['modVersions'][number]>[] =
    [
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
        accessorKey: 'game-versions',
        header: () => t('game-versions'),
        cell: ({ row }) => (
          <Badge variant="secondary">
            {row.original.modVersionGameVersions.map((item) => item.gameVersion.version).join(', ')}
          </Badge>
        ),
      },
      {
        accessorKey: 'platform',
        header: () => t('platform'),
        cell: ({ row }) => <Badge variant="outline">{row.original.description}</Badge>,
      },
      {
        accessorKey: 'createdAt',
        header: () => t('released'),
        cell: ({ row }) => {
          return formatDistanceToNow(row.original.createdAt, {
            locale: locale === 'en' ? enUS : de,
          })
        },
      },
      {
        accessorKey: 'actions',
        header: () => '',
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-3">
              <Button size="sm" asChild>
                <Link href={row.original.url} rel="noopenner no referrer">
                  {t('download')}

                  <Icon icon="ph:download" />
                </Link>
              </Button>
            </div>
          )
        },
      },
    ]

  return <DataTable data={modVersions ? modVersions : []} columns={columns} />
}
