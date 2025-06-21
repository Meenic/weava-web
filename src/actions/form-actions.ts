"use server";

import { z } from "zod";
import { FormState } from "@/types/form-types";
import {
  promptSchema,
  feedbackSchema,
  storySchema,
} from "@/schemas/form-schemas";

// Helper function to handle form validation and processing
async function processFormAction<T extends z.ZodSchema>(
  schema: T,
  formData: FormData,
  handler: (
    data: z.infer<T>
  ) => Promise<{ success: boolean; message: string; data?: unknown }>
): Promise<FormState<Record<string, string[]>>> {
  // Convert FormData to object
  const rawData = Object.fromEntries(formData.entries());

  // Validate with provided schema
  const validatedFields = schema.safeParse(rawData);

  if (!validatedFields.success) {
    // Ensure all error values are string arrays, not undefined
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    const errors: Record<string, string[]> = {};

    for (const [key, value] of Object.entries(fieldErrors)) {
      errors[key] = value ?? [];
    }

    return {
      errors,
      message: Object.values(errors).flat().length > 0 ? "" : "Validation failed",
      success: false,
    };
  }

  try {
    const result = await handler(validatedFields.data);

    return {
      message: result.message,
      success: result.success,
      data: result.data,
      errors: {},
    };
  } catch (error) {
    console.error("Form action error:", error);
    return {
      message: "An unexpected error occurred. Please try again.",
      success: false,
      errors: {},
    };
  }
}

// Specific form actions
export async function submitPromptAction(
  prevState: FormState<Record<string, string[]>>,
  formData: FormData
): Promise<FormState<Record<string, string[]>>> {
  return processFormAction(promptSchema, formData, async (data) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Your prompt processing logic here
    console.log("Processing prompt:", data.prompt);

    // Simulate success/failure
    if (data.prompt.toLowerCase().includes("error")) {
      throw new Error("Simulated error");
    }

    return {
      success: true,
      message: "Prompt submitted successfully.",
      data: { promptId: Math.random().toString(36).substr(2, 9) },
    };
  });
}

export async function submitFeedbackAction(
  prevState: FormState<Record<string, string[]>>,
  formData: FormData
): Promise<FormState<Record<string, string[]>>> {
  return processFormAction(feedbackSchema, formData, async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    console.log("Processing feedback:", data);

    return {
      success: true,
      message: "Thank you for your feedback!",
    };
  });
}

export async function submitStoryAction(
  prevState: FormState<Record<string, string[]>>,
  formData: FormData
): Promise<FormState<Record<string, string[]>>> {
  return processFormAction(storySchema, formData, async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    console.log("Processing story:", data);

    return {
      success: true,
      message: "Story saved successfully.",
      data: { storyId: Math.random().toString(36).substr(2, 9) },
    };
  });
}

// Generic database operations (examples)
export async function saveToDatabase(table: string, data: unknown) {
  // Your database logic here
  console.log(`Saving to ${table}:`, data);
  return { id: Math.random().toString(36).substr(2, 9) };
}

export async function sendEmail(to: string, subject: string) {
  // Your email logic here
  console.log(`Sending to ${to}: ${subject}`);
  return { sent: true };
}
