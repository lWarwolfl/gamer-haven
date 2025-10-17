'use server'

import { db } from '@/drizzle'
import { Game } from '@/drizzle/schema'
import { GameUpdateSchemaProps } from '@/features/panel/schemas/game.schema'
import { getCurrentUser } from '@/lib/supabase/functions'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export async function updateGameAction(data: GameUpdateSchemaProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/admin/signin')
  }

  const previousGame = await db.query.Game.findFirst({ where: (t, { eq }) => eq(t.id, data.id) })

  if (!previousGame) {
    return
  }

  return await db
    .update(Game)
    .set({
      title: data.title,
      description: data.description,
      slug: data.slug,
      logo: data.logo,
      images: data.images ? data.images.map((item) => item.url) : undefined,
    })
    .where(eq(Game.id, data.id))
    .returning()
}
