import { db } from "@/drizzle/db";
import { story } from "@/drizzle/schemas/story-schema";
import { eq } from "drizzle-orm";
import { generateId } from "@/lib/utils/id-generator";

export type CreateStoryInput = {
  userId: string;
  seed: string;
  title: string;
  synopsis: string;
  genre?: typeof story.$inferSelect.genre;
  tone?: typeof story.$inferSelect.tone;
  perspective?: typeof story.$inferSelect.perspective;
  imageUrl?: string | null;
};

export class StoryRepository {
  async create(input: CreateStoryInput) {
    const storyId = generateId("story");

    const [newStory] = await db
      .insert(story)
      .values({
        id: storyId,
        userId: input.userId,
        seed: input.seed,
        title: input.title,
        synopsis: input.synopsis,
        genre: input.genre ?? "fantasy",
        tone: input.tone ?? "adventurous",
        perspective: input.perspective ?? "third_person",
        imageUrl: input.imageUrl ?? null,
      })
      .returning();

    return newStory;
  }

  async findById(id: string) {
    const result = await db
      .select()
      .from(story)
      .where(eq(story.id, id))
      .limit(1);
    return result[0] ?? null;
  }

  async findByUserId(userId: string) {
    return db.select().from(story).where(eq(story.userId, userId));
  }

  async update(id: string, data: Partial<CreateStoryInput>) {
    const [updated] = await db
      .update(story)
      .set(data)
      .where(eq(story.id, id))
      .returning();

    return updated;
  }

  async delete(id: string) {
    await db.delete(story).where(eq(story.id, id));
  }
}
