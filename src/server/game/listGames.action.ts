'use server'

import { db } from '@/drizzle'
import { Game } from '@/drizzle/schema'
import { PaginationSchemaProps } from '@/server/schemas/pagination.schema'
import { count } from 'drizzle-orm'

export async function listGamesAction({ limit = 10, page = 1 }: PaginationSchemaProps) {
  const dbCount = await db.select({ count: count() }).from(Game)
  const totalCount = dbCount[0].count
  const totalPages = Math.ceil(totalCount / limit)

  const games = await db.query.Game.findMany({
    orderBy: (t, { desc }) => desc(t.createdAt),
    with: {
      mods: { columns: { id: true } },
      gameVersions: {
        orderBy: (gv, { desc }) => [desc(gv.updatedAt)],
        limit: 1,
      },
    },
    limit,
    offset: (page - 1) * limit,
  })

  return { games, pagination: { page, totalPages, limit } }
}

export type TListGamesAction = Awaited<ReturnType<typeof listGamesAction>>
