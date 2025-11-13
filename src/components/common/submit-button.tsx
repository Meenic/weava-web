"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { ArrowUp, Loader2 } from "lucide-react";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="icon"
      aria-label="Submit story idea"
      disabled={pending}
    >
      {pending ? (
        <Loader2 strokeWidth={3} className="animate-spin" />
      ) : (
        <ArrowUp strokeWidth={3} />
      )}
    </Button>
  );
}
