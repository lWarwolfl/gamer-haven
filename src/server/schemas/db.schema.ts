import * as schema from '@/drizzle/schema'
import { createSelectSchema } from 'drizzle-zod'

export const gameSchema = createSelectSchema(schema.Game)
