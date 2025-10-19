import { modSchema } from '@/server/schemas/db.schema'
import z from 'zod'

export const modCreateSchema = modSchema.pick({
  title: true,
  slug: true,
  description: true,
  gameId: true,
  logo: true,
  body: true,
})
export type ModCreateSchemaProps = z.infer<typeof modCreateSchema>

export const modUpdateSchema = modSchema
  .pick({
    title: true,
    slug: true,
    description: true,
    gameId: true,
    logo: true,
    visible: true,
    body: true,
  })
  .partial()
  .extend({
    id: z.string(),
  })
export type ModUpdateSchemaProps = z.infer<typeof modUpdateSchema>
