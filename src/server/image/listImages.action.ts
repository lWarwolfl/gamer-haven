'use server'

import { db } from '@/drizzle'
import { Image } from '@/drizzle/schema'
import { PaginationSchemaProps } from '@/server/schemas/pagination.schema'
import { count } from 'drizzle-orm'

export async function listImagesAction({ limit = 10, page = 1 }: PaginationSchemaProps) {
  const dbCount = await db.select({ count: count() }).from(Image)
  const totalCount = dbCount[0].count
  const totalPages = Math.ceil(totalCount / limit)

  const images = await db.query.Image.findMany({
    orderBy: (t, { desc }) => desc(t.createdAt),
    limit,
    offset: (page - 1) * limit,
  })

  return { images, pagination: { page, totalPages, limit } }
}

export type TListImagesAction = Awaited<ReturnType<typeof listImagesAction>>
