import Link from "next/link";
import { Clock, Mail, MapPin, Phone, Tractor } from "lucide-react";
import { CATEGORIES, SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-line bg-brand-900 text-sand-100">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex size-10 items-center justify-center rounded-lg bg-brand-500 text-white">
              <Tractor className="size-5" />
            </span>
            <span className="text-lg font-bold text-white">{SITE.name}</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-sand-300">
            New and pre-owned agricultural machinery, backed by in-house service,
            warranty and nationwide delivery.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Equipment</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/catalog?category=${category.slug}`}
                  className="text-sand-300 transition-colors hover:text-white"
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              { href: "/catalog", label: "Browse catalog" },
              { href: "/delivery", label: "Nationwide delivery" },
              { href: "/service", label: "Service & warranty" },
              { href: "/about", label: "About us" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sand-300 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Get in touch</h3>
          <ul className="mt-4 space-y-3 text-sm text-sand-300">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-300" />
              {SITE.address}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="size-4 shrink-0 text-brand-300" />
              <a className="hover:text-white" href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}>
                {SITE.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="size-4 shrink-0 text-brand-300" />
              <a className="hover:text-white" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0 text-brand-300" />
              {SITE.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-800">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-sand-300 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </span>
          <span>Prices in USD. Specifications subject to change.</span>
        </div>
      </div>
    </footer>
  );
}
