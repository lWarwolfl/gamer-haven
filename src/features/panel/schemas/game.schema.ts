import { gameSchema } from '@/server/schemas/db.schema'
import z from 'zod'

// const MAX_IMAGE_SIZE = 200 * 1024
// const MAX_LOGO_SIZE = 100 * 1024

// const ImageBlobSchema = z
//   .file()
//   .refine((file) => file && file.name && file.name !== '', {
//     message: 'empty',
//   })
//   .refine((b) => b.type.startsWith('image/'), 'image-only')
//   .refine((b) => b.size <= MAX_IMAGE_SIZE, 'image-200')

// const LogoBlobSchema = z
//   .file()
//   .refine((file) => file && file.name && file.name !== '', {
//     message: 'empty',
//   })
//   .refine((b) => b.type.startsWith('image/'), 'image-only')
//   .refine((b) => b.size <= MAX_LOGO_SIZE, 'logo-100')

export const gameCreateSchema = gameSchema
  .pick({ title: true, description: true, slug: true, logo: true })
  .extend({
    images: z
      .array(
        z.object({
          url: z.string({ message: 'empty' }),
        })
      )
      .max(5),
  })
export type GameCreateSchemaProps = z.infer<typeof gameCreateSchema>

export const gameUpdateSchema = gameSchema
  .pick({ id: true, title: true, description: true, slug: true, logo: true })
  .extend({
    images: z
      .array(
        z.object({
          url: z.string({ message: 'empty' }),
        })
      )
      .max(5)
      .optional(),
  })
export type GameUpdateSchemaProps = z.infer<typeof gameUpdateSchema>
