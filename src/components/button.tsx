import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonColor = "default" | "primary" | "danger" | "success" | "warning";
type ButtonVariant = "solid" | "flat" | "light" | "outline";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = Omit<ComponentPropsWithoutRef<"button">, "color"> & {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  isIconOnly?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  /** HeroUI compat, no-op. */
  disableRipple?: boolean;
  startContent?: ReactNode;
  onPress?: () => void;
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

const iconOnlyClasses: Record<ButtonSize, string> = {
  sm: "w-8 px-0",
  md: "w-10 px-0",
  lg: "w-12 px-0",
};

function variantClasses(variant: ButtonVariant, color: ButtonColor): string {
  if (variant === "outline") {
    const base = "border border-zinc-700 bg-zinc-900 text-default-400 hover:bg-zinc-800";
    if (color === "danger") return cn(base, "hover:border-danger/50 hover:text-danger");
    if (color === "success") return cn(base, "hover:border-success/50 hover:text-success");
    if (color === "warning") return cn(base, "hover:border-warning/50 hover:text-warning");
    return cn(base, "hover:border-primary/40 hover:text-foreground");
  }
  if (variant === "light") {
    const text = color === "primary" ? "text-primary" : color === "danger" ? "text-danger" : "";
    return cn("bg-transparent hover:bg-default/40", text);
  }
  if (variant === "flat") {
    switch (color) {
      case "primary":
        return "bg-primary/20 text-primary hover:bg-primary/30";
      case "danger":
        return "bg-danger/20 text-danger hover:bg-danger/30";
      default:
        return "bg-default/40 text-default-foreground hover:bg-default/60";
    }
  }
  switch (color) {
    case "primary":
      return "bg-primary text-primary-foreground hover:opacity-90";
    case "danger":
      return "bg-danger text-danger-foreground hover:opacity-90";
    default:
      return "bg-default text-default-foreground hover:opacity-90";
  }
}

export function Button({
  variant = "solid",
  color = "default",
  size = "md",
  isIconOnly,
  isLoading,
  isDisabled,
  disableRipple: _disableRipple,
  startContent,
  onPress,
  className,
  children,
  disabled,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isDisabled || isLoading}
      onClick={onPress}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-medium font-medium transition-colors outline-none disabled:pointer-events-none disabled:opacity-50",
        sizeClasses[size],
        isIconOnly && iconOnlyClasses[size],
        variantClasses(variant, color),
        className,
      )}
      {...rest}
    >
      {isLoading && (
        <span className="size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {!isLoading && startContent}
      {children}
    </button>
  );
}
