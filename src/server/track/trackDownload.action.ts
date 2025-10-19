'use server'

import { db } from '@/drizzle'
import { ModDownload } from '@/drizzle/schema'
import { cookies } from 'next/headers'

export async function trackDownloadAction(modId: string) {
  const cookieS = await cookies()
  const userToken = cookieS.get('user_token')

  try {
    if (userToken?.value)
      return await db
        .insert(ModDownload)
        .values({
          modId,
          userToken: userToken.value,
        })
        .returning()
  } catch {
    return null
  }
}
