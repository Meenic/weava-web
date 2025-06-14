import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import * as React from "react";

export interface StyledTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export function StyledTextarea({ className, ...props }: StyledTextareaProps) {
  return (
    <Textarea
      className={cn(
        "px-5 py-4",
        "font-semibold md:text-xl text-foreground/90",
        "resize-none",
        "!ring-0",
        "rounded-2xl",
        "border-[#8F00FF]/20 hover:border-[#8F00FF]/30 focus:!border-[#8F00FF]/40",
        "bg-[linear-gradient(to_top,rgba(143,0,255,0.08)_0,transparent_140px)] bg-no-repeat bg-bottom",
        "transition-colors duration-200",
        "whitespace-pre-wrap break-words break-all overflow-hidden box-border",
        className
      )}
      {...props}
    />
  );
}
