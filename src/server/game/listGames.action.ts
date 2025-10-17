'use server'

import { db } from '@/drizzle'

export async function listGamesAction() {
  return await db.query.Game.findMany({
    orderBy: (t, { desc }) => desc(t.createdAt),
    with: {
      mods: { columns: { id: true } },
      gameVersions: {
        orderBy: (gv, { desc }) => [desc(gv.version)],
        limit: 1,
      },
    },
  })
}

export type TListGamesAction = Awaited<ReturnType<typeof listGamesAction>>
