import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod"; // 1. Import Zod
import { STORY_GENERATION_PROMPT } from "../prompts/story-prompts";

// 3. Define the schema using Zod
const storySchema = z.object({
  title: z.string().describe("Engaging, memorable, and 2-8 words."),
  synopsis: z
    .string()
    .describe(
      "50-75 words that set up the story world, main conflict, and hook the reader. Do not reveal major plot twists."
    ),
});

// 4. Infer the GeneratedStory type directly from the Zod schema
export type GeneratedStory = z.infer<typeof storySchema>;

export class StoryGeneratorService {
  async generateStorySetup(seed: string): Promise<GeneratedStory> {
    try {
      // Use generateObject instead of generateText
      const { object } = await generateObject({
        // 5. I've updated the model ID to the standard Google format
        model: google("gemini-2.5-pro"),
        system: STORY_GENERATION_PROMPT,
        prompt: `User's story idea: "${seed}"`,
        // 6. Pass the Zod schema directly
        schema: storySchema,
      });

      // No parsing needed! The 'object' is already a valid, typed JS object.
      // The AI SDK handles the parsing and validation based on your schema.
      console.log("object", object, "object");

      // We can just return the object directly
      return object;
    } catch (error) {
      console.error("Story generation failed:", error);
      throw new Error("Failed to generate story setup");
    }
  }
}
