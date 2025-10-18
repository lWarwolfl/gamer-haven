import * as schema from '@/drizzle/schema'
import { createSelectSchema } from 'drizzle-zod'

export const gameSchema = createSelectSchema(schema.Game)
export const gameVersionSchema = createSelectSchema(schema.GameVersion)
export const modSchema = createSelectSchema(schema.Mod)
export const modVersionSchema = createSelectSchema(schema.ModVersion)
export const imageSchema = createSelectSchema(schema.Image)
