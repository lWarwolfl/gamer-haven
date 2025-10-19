import { urlSchema } from '@/features/panel/schemas/url.schema'
import { gameSchema } from '@/server/schemas/db.schema'
import z from 'zod'

export const gameCreateSchema = gameSchema
  .pick({ title: true, description: true, slug: true, visible: true })
  .extend({
    logo: urlSchema,
    images: z
      .array(
        z.object({
          url: urlSchema,
        })
      )
      .max(5),
  })
export type GameCreateSchemaProps = z.infer<typeof gameCreateSchema>

export const gameUpdateSchema = gameSchema
  .pick({ title: true, description: true, slug: true, visible: true })
  .partial()
  .extend({
    id: z.string(),
    logo: urlSchema.optional(),
    images: z
      .array(
        z.object({
          url: urlSchema,
        })
      )
      .max(5)
      .optional(),
  })
export type GameUpdateSchemaProps = z.infer<typeof gameUpdateSchema>
