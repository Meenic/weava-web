import { z } from "zod";

// Base schemas that can be reused
export const textSchema = z
  .string()
  .min(1, "This field cannot be empty")
  .trim();

export const longTextSchema = z
  .string()
  .min(1, "This field cannot be empty")
  .max(2000, "Text must be less than 2000 characters")
  .trim();

export const emailSchema = z
  .string()
  .email("Please enter a valid email address")
  .trim();

// Specific form schemas
export const promptSchema = z.object({
  prompt: longTextSchema.refine(
    (val) => val.length >= 10,
    "Prompt must be at least 10 characters long"
  ),
});

export const feedbackSchema = z.object({
  feedback: longTextSchema,
  email: emailSchema.optional(),
});

export const storySchema = z.object({
  title: textSchema.max(100, "Title must be less than 100 characters"),
  content: longTextSchema.max(5000, "Story must be less than 5000 characters"),
  genre: z.enum([
    "fantasy",
    "sci-fi",
    "mystery",
    "romance",
    "thriller",
    "other",
  ]),
});

// Export types for use in components
export type PromptFormData = z.infer<typeof promptSchema>;
export type FeedbackFormData = z.infer<typeof feedbackSchema>;
export type StoryFormData = z.infer<typeof storySchema>;
