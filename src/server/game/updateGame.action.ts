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

  const { images, ...rest } = data

  return await db
    .update(Game)
    .set({
      ...rest,
      images: images ? images.map((item) => item.url) : undefined,
    })
    .where(eq(Game.id, data.id))
    .returning()
}
