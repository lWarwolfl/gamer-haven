'use server'

import { db } from '@/drizzle'
import { ModVersion } from '@/drizzle/schema'
import { getCurrentUser } from '@/lib/supabase/functions'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export async function deleteModVersionAction(id: string) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/admin/signin')
  }

  return await db.delete(ModVersion).where(eq(ModVersion.id, id)).returning()
}
