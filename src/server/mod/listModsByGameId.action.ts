'use server'

import { db } from '@/drizzle'
import { Mod } from '@/drizzle/schema'
import { PaginationSchemaProps } from '@/server/schemas/pagination.schema'
import { count, eq } from 'drizzle-orm'

export type ListModsByGameIdActionProps = PaginationSchemaProps & { gameId: string }

export async function listModsByGameIdAction({
  limit = 10,
  page = 1,
  gameId,
}: ListModsByGameIdActionProps) {
  const dbCount = await db.select({ count: count() }).from(Mod).where(eq(Mod.gameId, gameId))
  const totalCount = dbCount[0].count
  const totalPages = Math.ceil(totalCount / limit)

  const mods = await db.query.Mod.findMany({
    orderBy: (t, { desc }) => desc(t.createdAt),
    where: (t, { eq }) => eq(t.gameId, gameId),
    with: {
      game: { columns: { id: true, logo: true, title: true, visible: true } },
      modVersions: {
        columns: { id: true, version: true },
        orderBy: (gv, { desc }) => [desc(gv.createdAt)],
        limit: 1,
      },
    },
    limit,
    offset: (page - 1) * limit,
  })

  return { mods, pagination: { page, totalPages, limit } }
}

export type TListModsByGameIdAction = Awaited<ReturnType<typeof listModsByGameIdAction>>
