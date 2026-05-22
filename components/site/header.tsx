"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Phone, Tractor, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/catalog", label: "Catalog" },
  { href: "/delivery", label: "Delivery" },
  { href: "/service", label: "Service & Warranty" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="hidden border-b border-line bg-sand-50 lg:block">
        <div className="container-page flex h-9 items-center justify-between text-xs text-muted">
          <span>{SITE.address}</span>
          <span>{SITE.hours}</span>
        </div>
      </div>

      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-10 items-center justify-center rounded-lg bg-brand-500 text-white">
            <Tractor className="size-5.5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tight text-ink">
              {SITE.name}
            </span>
            <span className="text-[11px] font-medium text-muted">
              Agricultural Equipment
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/catalog"
                ? pathname.startsWith("/catalog")
                : pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-brand-50 text-brand-600"
                    : "text-ink hover:bg-sand-100",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}
            className="hidden items-center gap-2 text-sm font-semibold text-brand-600 xl:flex"
          >
            <Phone className="size-4" />
            {SITE.phone}
          </a>
          <Link
            href="/catalog"
            className={cn(buttonVariants("primary", "sm"), "hidden sm:inline-flex")}
          >
            Browse equipment
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex size-10 items-center justify-center rounded-lg border border-line text-ink lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-white lg:hidden">
          <div className="container-page flex flex-col py-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium text-ink hover:bg-sand-100"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-3 text-sm font-semibold text-brand-600"
            >
              <Phone className="size-4" />
              {SITE.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
