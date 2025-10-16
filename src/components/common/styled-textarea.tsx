import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import * as React from "react";

const StyledTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <Textarea
      ref={ref}
      className={cn(
        // Spacing
        "px-5 py-4",
        // Typography
        "font-semibold md:text-xl text-foreground/90",
        "placeholder:text-foreground/40 placeholder:font-medium",
        // Layout
        "resize-none",
        // Focus & Ring
        "!ring-0 focus-visible:!ring-0 focus-visible:outline-none",
        // Border & Radius
        "rounded-2xl border-2",
        "border-[#8F00FF]/20",
        "hover:border-[#8F00FF]/30",
        "focus:border-[#8F00FF]/50",
        "focus-visible:border-[#8F00FF]/50",
        // Gradient - smoother with multiple stops
        "bg-gradient-to-t from-[#8F00FF]/8 via-[#8F00FF]/3 to-transparent",
        // Transitions
        "transition-all duration-300 ease-out",
        className
      )}
      {...props}
    />
  );
});

StyledTextarea.displayName = "StyledTextarea";

export { StyledTextarea };
