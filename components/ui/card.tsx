import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** White surface with the shared card border and radius. */
export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-card border border-line bg-white", className)}>
      {children}
    </div>
  );
}
