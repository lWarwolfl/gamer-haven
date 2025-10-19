'use server'

import { db } from '@/drizzle'
import { Mod } from '@/drizzle/schema'
import { ModCreateSchemaProps } from '@/features/panel/schemas/mod.schema'
import { getCurrentUser } from '@/lib/supabase/functions'
import { redirect } from 'next/navigation'

export async function createModAction(data: ModCreateSchemaProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/admin/signin')
  }

  return await db.insert(Mod).values(data).returning()
}
