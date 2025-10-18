'use server'

import { db } from '@/drizzle'
import { Image } from '@/drizzle/schema'
import { getCurrentUser } from '@/lib/supabase/functions'
import { del } from '@vercel/blob'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export async function deleteImageAction(id: string) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/admin/signin')
  }

  const images = await db.query.Image.findFirst({ where: eq(Image.id, id) })
  const previousImage = images?.url

  if (previousImage) {
    await del(previousImage)
  }

  return await db.delete(Image).where(eq(Image.id, id)).returning()
}
