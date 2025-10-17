'use server'

import { db } from '@/drizzle'
import { Game } from '@/drizzle/schema'
import { GameCreateSchemaProps } from '@/features/panel/schemas/game.schema'
import { getCurrentUser } from '@/lib/supabase/functions'
import { redirect } from 'next/navigation'

export async function createGameAction(data: GameCreateSchemaProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/admin/signin')
  }

  return await db
    .insert(Game)
    .values({
      title: data.title,
      description: data.description,
      slug: data.slug,
      logo: data.logo,
      images: data.images ? data.images.map((item) => item.url) : undefined,
    })
    .returning()
}
