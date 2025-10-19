import { modVersionSchema } from '@/server/schemas/db.schema'
import z from 'zod'

export const modVersionCreateSchema = modVersionSchema
  .pick({ version: true, url: true, description: true, modId: true })
  .extend({
    gameVersions: z.array(
      z.object({
        version: z.string({ message: 'required' }),
      })
    ),
  })
export type ModVersionCreateSchemaProps = z.infer<typeof modVersionCreateSchema>

export const modVersionUpdateSchema = modVersionSchema
  .pick({ version: true, url: true, description: true })
  .partial()
  .extend({
    id: z.string(),
    gameVersions: z
      .array(
        z.object({
          version: z.string({ message: 'required' }),
        })
      )
      .optional(),
  })
export type ModVersionUpdateSchemaProps = z.infer<typeof modVersionUpdateSchema>
