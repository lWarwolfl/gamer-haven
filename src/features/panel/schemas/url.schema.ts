import z from 'zod'

export const urlSchema = z
  .string()
  .refine((val) => val.startsWith('https://cv3kagunkjo5ft8f.public.blob.vercel-storage.com/'), {
    message: `url`,
  })
