import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

const id = uuid('id').primaryKey().defaultRandom()

export const Game = pgTable('games', {
  id,
  logo: text('logo').notNull(),
  images: text('images').array().default([]),
  title: text('title').notNull(),
  description: text('description').notNull(),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
})
export type TGame = typeof Game.$inferSelect

export const GameVersion = pgTable('game-versions', {
  id,
  gameId: uuid('game_id')
    .notNull()
    .references(() => Game.id, { onDelete: 'cascade' }),
  version: text('version').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
export type TGameVersion = typeof GameVersion.$inferSelect

export const Mod = pgTable('mods', {
  id,
  gameId: uuid('game_id')
    .notNull()
    .references(() => Game.id, { onDelete: 'cascade' }),
  logo: text('logo').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
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
  version: text('version').notNull(),
  url: text('url').notNull(),
  description: text('description').notNull(),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
})
export type TModVersion = typeof ModVersion.$inferSelect

export const ModVersionGameVersion = pgTable('mod-version-game-version', {
  modVersionId: uuid('mod_version_id')
    .notNull()
    .references(() => ModVersion.id, { onDelete: 'cascade' }),
  gameVersionId: uuid('game_version_id')
    .notNull()
    .references(() => GameVersion.id, { onDelete: 'cascade' }),
})
export type TModVersionGameVersion = typeof ModVersionGameVersion.$inferSelect

export const Image = pgTable('images', {
  id,
  name: text('logo').notNull(),
  url: text('url').notNull(),
  size: text('size').notNull(),
  type: text('type').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
export type TImage = typeof Image.$inferSelect

// ------------   relations   ------------

export const GameRelations = relations(Game, ({ many }) => ({
  mods: many(Mod),
  gameVersions: many(GameVersion),
}))

export const ModRelations = relations(Mod, ({ many, one }) => ({
  game: one(Game, {
    fields: [Mod.gameId],
    references: [Game.id],
  }),
  modVersions: many(ModVersion),
}))

export const ModVersionRelations = relations(ModVersion, ({ many, one }) => ({
  mod: one(Mod, {
    fields: [ModVersion.modId],
    references: [Mod.id],
  }),
  modVersionGameVersions: many(ModVersionGameVersion),
}))

export const GameVersionRelations = relations(GameVersion, ({ many, one }) => ({
  game: one(Game, {
    fields: [GameVersion.gameId],
    references: [Game.id],
  }),
  modVersionGameVersions: many(ModVersionGameVersion),
}))

export const ModVersionGameVersionRelations = relations(ModVersionGameVersion, ({ one }) => ({
  modVersion: one(ModVersion, {
    fields: [ModVersionGameVersion.modVersionId],
    references: [ModVersion.id],
  }),
  gameVersion: one(GameVersion, {
    fields: [ModVersionGameVersion.gameVersionId],
    references: [GameVersion.id],
  }),
}))
