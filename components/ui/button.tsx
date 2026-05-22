import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 shadow-sm",
  accent:
    "bg-accent text-ink hover:bg-accent-dark hover:text-white shadow-sm",
  outline:
    "border border-brand-500 text-brand-600 hover:bg-brand-50",
  ghost: "text-brand-600 hover:bg-brand-50",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

export function buttonVariants(
  variant: Variant = "primary",
  size: Size = "md",
): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold",
    "transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none",
    VARIANTS[variant],
    SIZES[size],
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(buttonVariants(variant, size), className)} {...props} />
  );
}
