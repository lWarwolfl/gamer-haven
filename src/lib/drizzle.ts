import * as schema from '@/drizzle/schema'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalForPrisma = global as unknown as { queryClient: any }

export const queryClient =
  globalForPrisma.queryClient || postgres(process.env.DATABASE_URL as string, { prepare: false })

if (process.env.NODE_ENV !== 'production') globalForPrisma.queryClient = queryClient
export const db = drizzle(queryClient, { schema })

export type TDatabase = typeof db
