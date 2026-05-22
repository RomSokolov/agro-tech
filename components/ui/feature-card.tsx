import type { ComponentType } from "react";
import { ArrowLink } from "./arrow-link";
import { IconBox } from "./icon-box";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  text: string;
  /** Heading tag — keep the document outline correct per page (default `h3`). */
  headingLevel?: 2 | 3;
  link?: { href: string; label: string };
  className?: string;
};

/** Card presenting a single feature: framed icon, heading, copy and optional link. */
export function FeatureCard({
  icon: Icon,
  title,
  text,
  headingLevel = 3,
  link,
  className,
}: FeatureCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-card border border-line bg-white p-7",
        className,
      )}
    >
      <IconBox>
        <Icon className="size-6" />
      </IconBox>
      <Heading className="mt-5 text-lg font-bold text-ink">{title}</Heading>
      <p className="mt-2 flex-1 text-sm text-muted">{text}</p>
      {link && (
        <ArrowLink href={link.href} className="mt-5">
          {link.label}
        </ArrowLink>
      )}
    </div>
  );
}
