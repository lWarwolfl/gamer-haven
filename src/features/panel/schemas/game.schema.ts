import { urlSchema } from '@/features/panel/schemas/url.schema'
import { gameSchema } from '@/server/schemas/db.schema'
import z from 'zod'

export const gameCreateSchema = gameSchema
  .pick({ title: true, description: true, slug: true, visible: true, body: true })
  .extend({
    logo: urlSchema,
    images: z.array(
      z.object({
        url: urlSchema,
      })
    ),
  })
export type GameCreateSchemaProps = z.infer<typeof gameCreateSchema>

export const gameUpdateSchema = gameSchema
  .pick({ title: true, description: true, slug: true, visible: true, body: true })
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
      .optional(),
  })
export type GameUpdateSchemaProps = z.infer<typeof gameUpdateSchema>
