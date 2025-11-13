import { cn } from "@/lib/utils/cn";
import { Textarea } from "../ui/textarea";

type StyledTextareaProps = React.ComponentProps<"textarea"> & {
  textareaClassName?: string;
  containerClassName?: string;
  children?: React.ReactNode;
};

function StyledTextarea({
  className,
  textareaClassName,
  containerClassName,
  children,
  ...props
}: StyledTextareaProps) {
  return (
    // 1. Add "group" to this outer container
    <div className={cn("relative w-full group", className)}>
      <div
        className={cn(
          "absolute inset-0 -z-10",
          "rounded-2xl",
          "bg-linear-to-t from-primary/20 via-primary/10 to-transparent"
        )}
        aria-hidden="true"
      />
      {/* Container box with all the styling */}
      <div
        className={cn(
          // Base styles
          "relative",
          "w-full",
          "bg-transparent", // Spacing

          "px-5 py-4", // Border & Radius

          "rounded-2xl border-2",
          "border-primary/20", // 2. Change hover/focus to group-hover/group-focus-within

          "group-hover:border-primary/30",
          "group-focus-within:border-primary/50!", // Transitions

          "transition-all duration-300 ease-out",

          containerClassName
        )}
      >
        {/* Wrapper for textarea and children */}
        <div className="relative">
          {/* Textarea with minimal styles */}
          <Textarea
            className={cn(
              // Reset styles
              "w-full",
              "bg-transparent!",
              "border-0",
              "p-0",
              "overflow-y-auto overflow-x-hidden", // Typography only

              "font-semibold md:text-xl text-foreground/90",
              "placeholder:text-foreground/60 placeholder:font-medium", // Layout

              "resize-none",
              "wrap-break-word", // Remove focus ring

              "focus-visible:ring-0",
              "focus-visible:outline-none",

              textareaClassName
            )}
            spellCheck={false}
            {...props}
          />
        </div>
        {children && (
          <div className="mt-3 flex items-center justify-end gap-2">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

export { StyledTextarea };
