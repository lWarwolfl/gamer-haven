'use server'

import { db } from '@/drizzle'
import { Mod } from '@/drizzle/schema'
import { getCurrentUser } from '@/lib/supabase/functions'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export async function deleteModAction(id: string) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/admin/signin')
  }

  return await db.delete(Mod).where(eq(Mod.id, id)).returning()
}
