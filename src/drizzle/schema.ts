import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

const id = uuid('id').primaryKey().defaultRandom()

export const Game = pgTable('games', {
  id,
  logo: text('logo').notNull(),
  images: text('images').array().default([]),
  title: text('title').notNull(),
  description: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
})
export type TGame = typeof Game.$inferSelect

export const Mod = pgTable('mods', {
  id,
  gameId: uuid('game_id')
    .notNull()
    .references(() => Game.id, { onDelete: 'cascade' }),
  logo: text('logo').notNull(),
  title: text('title').notNull(),
  description: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
})
export type TMod = typeof Mod.$inferSelect

export const ModVersion = pgTable('mod-versions', {
  id,
  modId: uuid('mod_id')
    .notNull()
    .references(() => Mod.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
})
export type TModVersion = typeof ModVersion.$inferSelect

// ------------   relations   ------------

export const GameRelations = relations(Game, ({ many }) => ({
  mods: many(Mod),
}))

export const ModRelations = relations(Mod, ({ many, one }) => ({
  game: one(Game),
  modVersions: many(ModVersion),
}))

export const ModVersionRelations = relations(ModVersion, ({ one }) => ({
  mod: one(Mod),
}))
