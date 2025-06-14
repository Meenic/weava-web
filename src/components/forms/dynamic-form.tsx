"use client";

import { useActionState, useEffect, useState } from "react";
import { StyledTextarea } from "../common/styled-textarea";
import { FloatingButton } from "../common/floating-button";
import { ServerAction, FormConfig, ButtonConfig } from "@/types/form-types";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface DynamicFormProps {
  config: FormConfig;
  action: ServerAction;
  buttonConfig?: ButtonConfig;
  className?: string;
  onSuccess?: (data: unknown) => void;
  onError?: (errors: unknown) => void;
}

export function DynamicForm({
  config,
  action,
  buttonConfig,
  className,
  onSuccess,
  onError,
}: DynamicFormProps) {
  const [state, formAction, isPending] = useActionState(action, {
    message: "",
    errors: {},
  });

  const [showMessage, setShowMessage] = useState(false);

  // Handle success/error callbacks and auto-dismiss messages
  useEffect(() => {
    if (state.success && onSuccess) {
      onSuccess(state.data);
    } else if (
      state.errors &&
      Object.keys(state.errors).length > 0 &&
      onError
    ) {
      onError(state.errors);
    }

    // Show message when state updates
    if (state.message) {
      setShowMessage(true);

      // Auto-dismiss success messages after 4 seconds
      if (state.success) {
        const timer = setTimeout(() => {
          setShowMessage(false);
        }, 4000);

        return () => clearTimeout(timer);
      }
    } else {
      setShowMessage(false);
    }
  }, [state, onSuccess, onError]);

  const renderField = (field: FormConfig["fields"][0]) => {
    const hasError = state.errors?.[field.name];
    const baseClasses = "w-full";
    const errorClasses = hasError ? "border-red-500" : "";

    switch (field.type) {
      case "textarea":
        return (
          <div key={field.name} className="relative">
            <StyledTextarea
              name={field.name}
              placeholder={field.placeholder}
              rows={field.rows || 4}
              className={cn(baseClasses, errorClasses, field.className)}
              disabled={isPending}
              required={field.required}
            />

            {buttonConfig && (
              <FloatingButton
                {...buttonConfig}
                type="submit"
                disabled={isPending}
                loading={isPending}
              />
            )}
          </div>
        );

      case "select":
        return (
          <select
            key={field.name}
            name={field.name}
            className={cn(
              baseClasses,
              errorClasses,
              "px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8F00FF]/50",
              field.className
            )}
            disabled={isPending}
            required={field.required}
          >
            <option value="">{field.placeholder || "Select an option"}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      default:
        return (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            className={cn(
              baseClasses,
              errorClasses,
              "px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8F00FF]/50",
              field.className
            )}
            disabled={isPending}
            required={field.required}
          />
        );
    }
  };

  return (
    <form action={formAction} className={className}>
      <div className="space-y-4">{config.fields.map(renderField)}</div>

      {/* Submit button for non-textarea forms */}
      {!config.fields.some((field) => field.type === "textarea") && (
        <button
          type="submit"
          disabled={isPending}
          className="mt-4 px-6 py-2 bg-[#8F00FF] hover:bg-[#8F00FF]/90 disabled:bg-[#8F00FF]/50 rounded-md transition-colors duration-200 disabled:cursor-not-allowed"
        >
          {isPending
            ? config.loadingLabel || "Submitting..."
            : config.submitLabel || "Submit"}
        </button>
      )}

      {/* Field Error Messages */}
      {state.errors &&
        Object.entries(state.errors).map(([field, errors]) => (
          <div key={field} className="mt-3 text-left">
            {Array.isArray(errors) ? (
              errors.map((error, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 text-sm text-rose-600 font-medium"
                >
                  <X className="text-rose-500 w-4 h-4" />
                  <span>{error}</span>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-1.5 text-sm text-rose-600 font-medium">
                <X className="text-rose-500 w-4 h-4" />
                <span>{errors}</span>
              </div>
            )}
          </div>
        ))}

      {/* Success/Error Message */}
      {state.message && showMessage && (
        <div
          className={cn(
            "mt-3 text-left text-sm font-medium flex items-center gap-2",
            state.success ? "text-emerald-700" : "text-rose-700"
          )}
        >
          {state.success ? (
            <Check className="text-emerald-600 w-4 h-4" />
          ) : (
            <X className="text-rose-600 w-4 h-4" />
          )}
          <span>{state.message}</span>
        </div>
      )}

      {/* Loading State */}
      {isPending && (
        <div className="mt-3 text-left text-sm text-[#8F00FF]/70 font-medium">
          <div className="flex items-center gap-2">
            <div className="animate-spin h-3 w-3 border border-[#8F00FF]/30 border-t-[#8F00FF] rounded-full"></div>
            {config.loadingLabel || "Processing..."}
          </div>
        </div>
      )}
    </form>
  );
}
