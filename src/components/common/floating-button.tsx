import { ButtonConfig } from "@/types/form-types";
import { cn } from "@/lib/utils";

interface FloatingButtonProps extends ButtonConfig {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children?: React.ReactNode;
  className?: string;
}

const positionClasses = {
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
};

const variantClasses = {
  primary: "bg-[#8F00FF] hover:bg-[#8F00FF]/90 text-white",
  secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  danger: "bg-red-500 hover:bg-red-600 text-white",
};

const sizeClasses = {
  sm: "p-2",
  md: "p-3",
  lg: "p-4",
};

const iconSizeClasses = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export function FloatingButton({
  icon: Icon,
  position = "bottom-right",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  ariaLabel,
  children,
  className,
}: FloatingButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      className={cn(
        "absolute rounded-full disabled:cursor-not-allowed",
        positionClasses[position],
        variantClasses[variant],
        sizeClasses[size],
        disabled || loading ? "opacity-50" : "",
        className
      )}
    >
      {Icon && (
        <Icon
          className={cn(iconSizeClasses[size], loading ? "animate-pulse" : "")}
          strokeWidth={2.5}
          width={size === "sm" ? 16 : size === "md" ? 20 : 24}
          height={size === "sm" ? 16 : size === "md" ? 20 : 24}
        />
      )}
      {children}
    </button>
  );
}
