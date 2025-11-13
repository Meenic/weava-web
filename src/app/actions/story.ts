"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { StoryService } from "@/lib/services/story-service";

const storySchema = z.object({
  storyIdea: z
    .string()
    .min(10, "Your idea is too short! Tell us more.")
    .max(500, "That's a bit long! Try to be more concise."),
});

type FormState = {
  success: boolean;
  message?: string | null;
  errors?: {
    errors: string[];
    properties?: {
      storyIdea?: {
        errors: string[];
      };
    };
  };
};

export async function createStoryAction(
  _initialState: unknown,
  formData: FormData
): Promise<FormState> {
  // 1. Validate input
  const data = {
    storyIdea: formData.get("storyIdea"),
  };

  const validation = storySchema.safeParse(data);

  if (!validation.success) {
    return {
      success: false,
      errors: z.treeifyError(validation.error),
    };
  }

  // 3. Generate story using AI and save to database
  let storyId: string;

  try {
    const storyService = new StoryService();
    const story = await storyService.createStoryFromSeed(
      "123456789",
      validation.data.storyIdea
    );
    storyId = story.id;
  } catch (error) {
    console.error("Story creation error:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create story. Please try again.",
    };
  }

  // 4. Redirect to the story page (outside try/catch)
  redirect(`/story/${storyId}`);
}
