import z from 'zod'

const MAX_IMAGE_SIZE = 200 * 1024

export const imageCreateSchema = z.object({
  name: z.string({ message: 'required' }),
  image: z
    .instanceof(Blob, { message: 'image-only' })
    .refine((b) => b.type.startsWith('image/'), 'image-only')
    .refine((b) => b.size <= MAX_IMAGE_SIZE, 'image-200'),
})
export type ImageCreateSchemaProps = z.infer<typeof imageCreateSchema>
