"use client";

import { DynamicForm } from "@/components/forms/dynamic-form";
import { submitPromptAction } from "@/actions/form-actions";
import { ArrowUp } from "lucide-react";
import { FormConfig } from "@/types/form-types";
import { promptSchema } from "@/schemas/form-schemas";
import { cn } from "@/lib/utils";

interface PromptFormProps {
  // Content customization
  placeholder?: string;

  // Sizing customization
  width?: string; // e.g., "w-full", "w-96", "w-[500px]"
  maxWidth?: string; // e.g., "max-w-2xl", "max-w-lg"
  height?: string; // e.g., "h-48", "h-[200px]"
  minHeight?: string; // e.g., "min-h-[150px]", "min-h-32"
  rows?: number; // textarea rows

  // Layout customization
  className?: string;
  textareaClassName?: string;

  // Behavior customization
  onSuccess?: (data: unknown) => void;
  onError?: (errors: unknown) => void;

  // Button customization
  showButton?: boolean;
  buttonIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  buttonPosition?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  buttonSize?: "sm" | "md" | "lg";
}

export function PromptForm({
  placeholder = "Enter your story prompt...",
  width = "w-full",
  maxWidth = "max-w-2xl",
  height,
  minHeight = "min-h-[200px]",
  rows = 8,
  className,
  textareaClassName,
  onSuccess,
  onError,
  showButton = true,
  buttonIcon = ArrowUp,
  buttonPosition = "bottom-right",
  buttonSize = "md",
}: PromptFormProps) {
  // Build textarea classes
  const textareaClasses = cn(
    "pr-16", // Space for button
    height,
    minHeight,
    textareaClassName
  );

  // Build form config
  const formConfig: FormConfig = {
    fields: [
      {
        name: "prompt",
        type: "textarea",
        placeholder,
        required: true,
        rows,
        className: textareaClasses,
      },
    ],
    schema: promptSchema,
    submitLabel: "Submit Prompt",
    loadingLabel: "Submitting your prompt...",
  };

  // Build container classes
  const containerClasses = cn(width, maxWidth, className);

  return (
    <div className={containerClasses}>
      <DynamicForm
        config={formConfig}
        action={submitPromptAction}
        buttonConfig={
          showButton
            ? {
                icon: buttonIcon,
                position: buttonPosition,
                variant: "primary",
                size: buttonSize,
                ariaLabel: "Submit prompt",
              }
            : undefined
        }
        className="w-full"
        onSuccess={onSuccess}
        onError={onError}
      />
    </div>
  );
}
