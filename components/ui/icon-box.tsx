import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Rounded tile that frames an icon. Defaults to the brand-tinted variant;
 * pass `className` to override the surface (e.g. `bg-white shadow-sm`) or size.
 */
export function IconBox({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600",
        className,
      )}
    >
      {children}
    </span>
  );
}
