'use server'

import { db } from '@/drizzle'
import { Image } from '@/drizzle/schema'
import { ImageCreateSchemaProps } from '@/features/panel/schemas/image.schema'
import { getCurrentUser } from '@/lib/supabase/functions'
import { getFileExtension } from '@/lib/utils'
import { put } from '@vercel/blob'
import { redirect } from 'next/navigation'

export async function createImageAction(data: ImageCreateSchemaProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/admin/signin')
  }

  const imageBlob = await put(
    `${data.name}-${Date.now()}.${getFileExtension(data.image)}`,
    data.image,
    {
      access: 'public',
    }
  )

  return await db
    .insert(Image)
    .values({
      name: data.name,
      size: String(data.image.size),
      url: imageBlob.url,
      type: imageBlob.contentType,
    })
    .returning()
}
