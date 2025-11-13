"use client";

import { useActionState, useId, useRef, useEffect } from "react";
import { StyledTextarea } from "../common/styled-textarea";
import { SubmitButton } from "../common/submit-button";
import { Check } from "lucide-react";

type FormState = {
  success: boolean;
  message?: string | null;
  errors?: {
    errors: string[];
    properties?:
      | {
          storyIdea?:
            | {
                errors: string[];
              }
            | undefined;
        }
      | undefined;
  };
} | null;

type StoryAction = (
  prevState: FormState,
  formData: FormData
) => Promise<FormState>;

type StoryPromptFormProps = {
  action: StoryAction;
  placeholder?: string;
};

export function StoryPromptForm({ action, placeholder }: StoryPromptFormProps) {
  const [state, formAction] = useActionState(action, null);
  const formRef = useRef<HTMLFormElement>(null);
  const storyIdeaId = useId();
  const errorId = useId();

  // 4. Clean up error logic
  const storyIdeaError = state?.errors?.properties?.storyIdea?.errors[0];

  // 5. Reset form on success
  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state?.success]);

  return (
    <form ref={formRef} action={formAction} className="w-full space-y-3">
      <StyledTextarea
        id={storyIdeaId}
        name="storyIdea"
        placeholder={placeholder || "Tell me a story about..."}
        rows={5}
        textareaClassName="h-16 md:h-36"
        // 7. Link error message to textarea
        aria-describedby={storyIdeaError ? errorId : undefined}
      >
        <SubmitButton />
      </StyledTextarea>

      <div className="text-start px-6 h-4">
        {/* Added h-4 for layout stability */}
        {storyIdeaError && (
          <p id={errorId} className="text-xs text-destructive">
            {storyIdeaError}
          </p>
        )}
        {state?.success && state.message && (
          // 8. Add aria-live for screen readers
          <div aria-live="polite" role="status">
            <p className="flex items-center gap-2 text-xs text-primary">
              <Check className="h-3 w-3" /> {state.message}
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
