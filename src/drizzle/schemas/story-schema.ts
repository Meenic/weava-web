import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./auth-schema";

// --- ENUMS ---

export const genreEnum = pgEnum("genre", [
  "sci-fi",
  "fantasy",
  "mystery",
  "romance",
  "thriller",
  "horror",
]);

export const toneEnum = pgEnum("tone", [
  "humorous",
  "dark",
  "whimsical",
  "suspenseful",
  "serious",
  "adventurous",
]);

export const perspectiveEnum = pgEnum("perspective", [
  "first_person",
  "third_person",
]);

// --- TABLES ---

/**
 * The top-level Story.
 * Holds the user's initial idea and the AI-generated setup.
 */
export const story = pgTable("story", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  // User's initial input
  seed: text("seed").notNull(),

  // AI-generated setup
  title: text("title").notNull(),
  synopsis: text("synopsis").notNull(),
  imageUrl: text("image_url"),

  // User's chosen configuration
  genre: genreEnum("genre").notNull(),
  tone: toneEnum("tone").notNull(),
  perspective: perspectiveEnum("perspective").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

/**
 * A Story is divided into Chapters.
 */
export const chapter = pgTable("chapter", {
  id: text("id").primaryKey(),
  storyId: text("story_id")
    .notNull()
    .references(() => story.id, { onDelete: "cascade" }),

  title: text("title").notNull(),
  chapterNumber: integer("chapter_number").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

/**
 * A Chapter is composed of multiple Scenes.
 * Each Scene is one passage of text forming the story chain.
 */
export const scene = pgTable("scene", {
  id: text("id").primaryKey(),
  chapterId: text("chapter_id")
    .notNull()
    .references(() => chapter.id, { onDelete: "cascade" }),

  content: text("content").notNull(),
  sceneNumber: integer("scene_in_chapter").notNull(),

  // Self-referencing foreign key - fixed with explicit type
  previousSceneId: text("previous_scene_id"),

  triggeringChoice: text("triggering_choice"),
  isUserChoice: boolean("is_user_choice").default(false).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// --- RELATIONS ---

export const storyRelations = relations(story, ({ one, many }) => ({
  user: one(user, {
    fields: [story.userId],
    references: [user.id],
  }),
  chapters: many(chapter),
}));

export const chapterRelations = relations(chapter, ({ one, many }) => ({
  story: one(story, {
    fields: [chapter.storyId],
    references: [story.id],
  }),
  scenes: many(scene),
}));

export const sceneRelations = relations(scene, ({ one }) => ({
  chapter: one(chapter, {
    fields: [scene.chapterId],
    references: [chapter.id],
  }),
  previousScene: one(scene, {
    fields: [scene.previousSceneId],
    references: [scene.id],
    relationName: "previousScene",
  }),
}));

// Type exports for better type inference
export type Story = typeof story.$inferSelect;
export type NewStory = typeof story.$inferInsert;
export type Chapter = typeof chapter.$inferSelect;
export type NewChapter = typeof chapter.$inferInsert;
export type Scene = typeof scene.$inferSelect;
export type NewScene = typeof scene.$inferInsert;
