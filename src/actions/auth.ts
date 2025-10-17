"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password is too long")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long"),
});

const signInSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function signUpAction(formData: FormData) {
  try {
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
      name: formData.get("name"),
    };

    const parsed = signUpSchema.safeParse(rawData);

    if (!parsed.success) {
      const errors = z.treeifyError(parsed.error);
      return {
        success: false,
        errors,
      };
    }

    const { email, password, name } = parsed.data;

    await auth.api.signUpEmail({
      body: { email, password, name },
    });

    redirect("/");
  } catch {
    return {
      success: false,
      errors: {
        _form: ["An error occurred during sign up. Please try again."],
      },
    };
  }
}

export async function signInAction(formData: FormData) {
  try {
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const parsed = signInSchema.safeParse(rawData);

    if (!parsed.success) {
      const errors = z.treeifyError(parsed.error);
      return {
        success: false,
        errors,
      };
    }

    const { email, password } = parsed.data;

    await auth.api.signInEmail({
      body: { email, password },
    });

    redirect("/");
  } catch {
    return {
      success: false,
      errors: {
        _form: ["Invalid email or password. Please try again."],
      },
    };
  }
}

export async function signOutAction() {
  try {
    await auth.api.signOut({ headers: await headers() });

    redirect("/sign-in");
  } catch {
    return {
      success: false,
      error: "Failed to sign out. Please try again.",
    };
  }
}
