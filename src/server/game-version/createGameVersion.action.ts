'use server'

import { db } from '@/drizzle'
import { GameVersion } from '@/drizzle/schema'
import { GameVersionCreateSchemaProps } from '@/features/panel/schemas/gameVersion.schema'
import { getCurrentUser } from '@/lib/supabase/functions'
import { redirect } from 'next/navigation'

export async function createGameVersionAction(data: GameVersionCreateSchemaProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/admin/signin')
  }

  return await db.insert(GameVersion).values(data).returning()
}
