'use server'

import { db } from '@/drizzle'
import { GameVersion } from '@/drizzle/schema'
import { getCurrentUser } from '@/lib/supabase/functions'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export async function deleteGameVersionAction(id: string) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/admin/signin')
  }

  return await db.delete(GameVersion).where(eq(GameVersion.id, id)).returning()
}
