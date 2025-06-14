import { z } from "zod";

// Generic form state interface
export interface FormState<T = Record<string, string[]>> {
  message?: string;
  errors?: T;
  success?: boolean;
  data?: unknown;
}

// Generic server action type
export type ServerAction<T = FormState> = (
  prevState: T,
  formData: FormData
) => Promise<T>;

// Form field configuration
export interface FormFieldConfig {
  name: string;
  type: "text" | "email" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  rows?: number;
  options?: { value: string; label: string }[];
  className?: string;
}

// Form configuration
export interface FormConfig {
  fields: FormFieldConfig[];
  submitLabel?: string;
  loadingLabel?: string;
  schema: z.ZodSchema;
}

// Button configuration
export interface ButtonConfig {
  icon?: React.ComponentType<{ className?: string }>;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
}
