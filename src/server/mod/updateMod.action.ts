'use server'

import { db } from '@/drizzle'
import { Mod } from '@/drizzle/schema'
import { ModUpdateSchemaProps } from '@/features/panel/schemas/mod.schema'
import { getCurrentUser } from '@/lib/supabase/functions'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export async function updateModAction(data: ModUpdateSchemaProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/admin/signin')
  }

  return await db.update(Mod).set(data).where(eq(Mod.id, data.id)).returning()
}
