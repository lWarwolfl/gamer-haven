'use server'

import { db } from '@/drizzle'
import { ModVersion, ModVersionGameVersion } from '@/drizzle/schema'
import { ModVersionCreateSchemaProps } from '@/features/panel/schemas/modVersion.schema'
import { getCurrentUser } from '@/lib/supabase/functions'
import { redirect } from 'next/navigation'

export async function createModVersionAction(data: ModVersionCreateSchemaProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/admin/signin')
  }

  const { gameVersions, ...rest } = data

  const modVersions = await db
    .insert(ModVersion)
    .values({
      ...rest,
    })
    .returning()

  const modVersionGameVersions = await db
    .insert(ModVersionGameVersion)
    .values(
      gameVersions.map((item) => {
        return { gameVersionId: item.version, modVersionId: modVersions[0].id }
      })
    )
    .returning()

  return { modVersions, modVersionGameVersions }
}
