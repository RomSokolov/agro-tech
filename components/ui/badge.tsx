import { cn } from "@/lib/utils";

type Tone = "brand" | "accent" | "neutral" | "outline";

const TONES: Record<Tone, string> = {
  brand: "bg-brand-500 text-white",
  accent: "bg-accent/15 text-accent-dark",
  neutral: "bg-sand-100 text-muted",
  outline: "border border-line text-muted",
};

type BadgeProps = {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
};

export function Badge({ tone = "neutral", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
