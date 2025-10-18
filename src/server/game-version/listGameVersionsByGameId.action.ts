'use server'

import { db } from '@/drizzle'
import { GameVersion } from '@/drizzle/schema'
import { PaginationSchemaProps } from '@/server/schemas/pagination.schema'
import { count } from 'drizzle-orm'

export type ListGameVersionsByGameIdActionProps = PaginationSchemaProps & { gameId: string }

export async function listGameVersionsByGameIdAction({
  limit = 10,
  page = 1,
  gameId,
}: ListGameVersionsByGameIdActionProps) {
  const dbCount = await db.select({ count: count() }).from(GameVersion)
  const totalCount = dbCount[0].count
  const totalPages = Math.ceil(totalCount / limit)

  const gameVersions = await db.query.GameVersion.findMany({
    orderBy: (t, { desc }) => desc(t.createdAt),
    where: (t, { eq }) => eq(t.gameId, gameId),
    with: { game: { columns: { id: true, logo: true, title: true } } },
    limit,
    offset: (page - 1) * limit,
  })

  return { gameVersions, pagination: { page, totalPages, limit } }
}

export type TListGameVersionsByGameIdAction = Awaited<
  ReturnType<typeof listGameVersionsByGameIdAction>
>
