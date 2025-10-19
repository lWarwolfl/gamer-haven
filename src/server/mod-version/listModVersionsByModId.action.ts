'use server'

import { db } from '@/drizzle'
import { ModVersion } from '@/drizzle/schema'
import { PaginationSchemaProps } from '@/server/schemas/pagination.schema'
import { count } from 'drizzle-orm'

export type ListModVersionsByModIdActionProps = PaginationSchemaProps & { modId: string }

export async function listModVersionsByModIdAction({
  limit = 10,
  page = 1,
  modId,
}: ListModVersionsByModIdActionProps) {
  const dbCount = await db.select({ count: count() }).from(ModVersion)
  const totalCount = dbCount[0].count
  const totalPages = Math.ceil(totalCount / limit)

  const modVersions = await db.query.ModVersion.findMany({
    orderBy: (t, { desc }) => desc(t.createdAt),
    where: (t, { eq }) => eq(t.modId, modId),
    with: {
      mod: {
        columns: { id: true, logo: true, title: true, visible: true },
        with: { game: { columns: { id: true } } },
      },
      modVersionGameVersions: {
        with: {
          gameVersion: {
            columns: { id: true, version: true },
          },
        },
      },
    },
    limit,
    offset: (page - 1) * limit,
  })

  return { modVersions, pagination: { page, totalPages, limit } }
}

export type TListModVersionsByModIdAction = Awaited<ReturnType<typeof listModVersionsByModIdAction>>
