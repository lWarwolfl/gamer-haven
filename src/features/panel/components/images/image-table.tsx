'use client'

import { DataPagination } from '@/components/common/data-pagination'
import { TableSkeleton } from '@/components/common/table-skeleton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import ImageDelete from '@/features/panel/components/images/image-delete'
import { useListImages } from '@/features/panel/queries/images/useListImages.query'
import { useCopyToClipboard } from '@/lib/hooks/useClipboard.hook'
import { TListImagesAction } from '@/server/image/listImages.action'
import { Icon } from '@iconify/react'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'

export default function ImageTable() {
  const t = useTranslations('panel.images.table')
  const { copy } = useCopyToClipboard()

  const [currentPage, setCurrentPage] = useState<number>(1)
  const { data, isFetching } = useListImages({ page: currentPage })

  function onPageChange(page: number) {
    setCurrentPage(page)
  }

  const columns: ColumnDef<TListImagesAction['images'][number]>[] = [
    {
      accessorKey: 'name',
      header: () => t('name'),
      cell: ({ row }) => {
        return (
          <div className="flex shrink-0 items-center gap-2">
            <Image
              alt={row.original.name}
              width={50}
              height={50}
              className="size-8 rounded-sm object-cover object-center"
              src={row.original.url}
            />

            <span className="w-5/6 truncate">{row.original.name}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'url',
      header: () => t('url'),
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <span className="max-w-24 truncate">{row.original.url}</span>

          <Button size="icon-sm" variant="outline" onClick={() => copy(row.original.url)}>
            <Icon icon="ph:copy" className="size-4" />

            <span className="sr-only">{t('copy')}</span>
          </Button>
        </div>
      ),
    },
    {
      accessorKey: 'type',
      header: () => t('type'),
      cell: ({ row }) => <Badge variant="secondary">{row.original.type}</Badge>,
    },
    {
      accessorKey: 'size',
      header: () => t('size'),
      cell: ({ row }) => {
        const sizeInKB = (Number(row.original.size) / 1024).toFixed(2)

        return <Badge variant="secondary">{sizeInKB}KB</Badge>
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
            <ImageDelete data={row.original} />
          </div>
        )
      },
    },
  ]

  return isFetching ? (
    <TableSkeleton />
  ) : (
    <>
      <DataTable data={data ? data.images : []} columns={columns} />

      {data?.pagination && data.pagination.totalPages > 1 ? (
        <DataPagination pagination={data.pagination} onPageChange={onPageChange} />
      ) : null}
    </>
  )
}
