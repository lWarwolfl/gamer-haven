'use server'

import { db } from '@/drizzle'
import { ModVersion } from '@/drizzle/schema'
import { PaginationSchemaProps } from '@/server/schemas/pagination.schema'
import { count, eq } from 'drizzle-orm'
import { unstable_cache as cache } from 'next/cache'

export type ListModVersionsByModSlugActionProps = PaginationSchemaProps & { modSlug: string }

export const listModVersionsByModSlugAction = cache(
  async ({ limit = 10, page = 1, modSlug }: ListModVersionsByModSlugActionProps) => {
    const mod = await db.query.Mod.findFirst({
      where: (t, { eq }) => eq(t.slug, modSlug),
      with: {
        modDownloads: { columns: { id: true } },
        game: { columns: { id: true, logo: true, title: true, visible: true } },
        modVersions: {
          columns: { id: true, version: true },
          orderBy: (gv, { desc }) => [desc(gv.createdAt)],
          limit: 1,
        },
      },
    })

    if (!mod) return null

    const dbCount = await db
      .select({ count: count() })
      .from(ModVersion)
      .where(eq(ModVersion.modId, mod.id))
    const totalCount = dbCount[0].count
    const totalPages = Math.ceil(totalCount / limit)

    const modVersions = await db.query.ModVersion.findMany({
      orderBy: (t, { desc }) => desc(t.createdAt),
      where: (t, { eq }) => eq(t.modId, mod.id),
      with: {
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

    return { modVersions, pagination: { page, totalPages, limit }, mod }
  },
  ['mod-versions'],
  { revalidate: 1800, tags: ['mod-versions'] }
)

export type TListModVersionsByModSlugAction = Awaited<
  ReturnType<typeof listModVersionsByModSlugAction>
>
