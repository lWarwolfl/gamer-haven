'use server'

import { db } from '@/drizzle'
import { Mod } from '@/drizzle/schema'
import { PaginationSchemaProps } from '@/server/schemas/pagination.schema'
import { count, eq } from 'drizzle-orm'
import { unstable_cache as cache } from 'next/cache'

export type ListModsByGameSlugActionProps = PaginationSchemaProps & { gameSlug: string }

export const listModsByGameSlugAction = cache(
  async ({ limit = 10, page = 1, gameSlug }: ListModsByGameSlugActionProps) => {
    const game = await db.query.Game.findFirst({
      where: (t, { eq }) => eq(t.slug, gameSlug),
      with: {
        mods: { columns: { id: true } },
        gameVersions: {
          orderBy: (gv, { desc }) => [desc(gv.createdAt)],
          limit: 1,
        },
      },
    })

    if (!game) return null

    const dbCount = await db.select({ count: count() }).from(Mod).where(eq(Mod.gameId, game.id))
    const totalCount = dbCount[0].count
    const totalPages = Math.ceil(totalCount / limit)

    const mods = await db.query.Mod.findMany({
      orderBy: (t, { desc }) => desc(t.createdAt),
      where: (t, { eq, and }) => and(eq(t.gameId, game.id), eq(t.visible, true)),
      with: {
        modDownloads: { columns: { id: true } },
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

    return { mods, pagination: { page, totalPages, limit }, game }
  },
  ['mods'],
  { revalidate: 1800, tags: ['mods'] }
)

export type TListModsByGameSlugAction = Awaited<ReturnType<typeof listModsByGameSlugAction>>
