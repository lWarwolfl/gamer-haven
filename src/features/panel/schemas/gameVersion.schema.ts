import { gameVersionSchema } from '@/server/schemas/db.schema'
import z from 'zod'

export const gameVersionCreateSchema = gameVersionSchema.pick({
  version: true,
  gameId: true,
})
export type GameVersionCreateSchemaProps = z.infer<typeof gameVersionCreateSchema>

export const gameVersionUpdateSchema = gameVersionSchema.pick({
  id: true,
  version: true,
  gameId: true,
})
export type GameVersionUpdateSchemaProps = z.infer<typeof gameVersionUpdateSchema>
