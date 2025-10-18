'use server'

import { db } from '@/drizzle'
import { GameVersion } from '@/drizzle/schema'
import { GameVersionUpdateSchemaProps } from '@/features/panel/schemas/gameVersion.schema'
import { getCurrentUser } from '@/lib/supabase/functions'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export async function updateGameVersionAction(data: GameVersionUpdateSchemaProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/admin/signin')
  }

  return await db.update(GameVersion).set(data).where(eq(GameVersion.id, data.id)).returning()
}
