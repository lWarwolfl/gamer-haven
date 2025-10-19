'use server'

import { db } from '@/drizzle'
import { ModVersion, ModVersionGameVersion } from '@/drizzle/schema'
import { ModVersionUpdateSchemaProps } from '@/features/panel/schemas/modVersion.schema'
import { getCurrentUser } from '@/lib/supabase/functions'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export async function updateModVersionAction(data: ModVersionUpdateSchemaProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/admin/signin')
  }

  const { gameVersions, ...rest } = data

  const modVersions = await db
    .update(ModVersion)
    .set({
      ...rest,
    })
    .where(eq(ModVersion.id, data.id))
    .returning()

  await db.delete(ModVersionGameVersion).where(eq(ModVersionGameVersion.modVersionId, rest.id))

  const modVersionGameVersions = await db
    .insert(ModVersionGameVersion)
    .values(
      gameVersions
        ? gameVersions.map((item) => {
            return { gameVersionId: item.version, modVersionId: rest.id }
          })
        : []
    )
    .returning()

  return { modVersions, modVersionGameVersions }
}
