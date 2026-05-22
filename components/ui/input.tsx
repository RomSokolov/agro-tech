import { cn } from "@/lib/utils";

const fieldStyles = cn(
  "w-full rounded-lg border border-line bg-white px-3.5 text-sm text-ink",
  "placeholder:text-muted/70 transition-colors",
  "focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20",
  "disabled:bg-sand-100 disabled:opacity-60",
);

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldStyles, "h-11", className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea className={cn(fieldStyles, "min-h-28 py-2.5", className)} {...props} />
  );
}
