import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Warehouse } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const HIGHLIGHTS = [
  {
    icon: Warehouse,
    title: "Large inventory",
    text: "A constantly refreshed line-up of new and pre-owned machines across six equipment categories.",
    href: "/catalog",
    cta: "View catalog",
  },
  {
    icon: Truck,
    title: "Nationwide delivery",
    text: "Door-to-door transport to your farm, scheduled within 48 hours of a confirmed order.",
    href: "/delivery",
    cta: "Delivery options",
  },
  {
    icon: ShieldCheck,
    title: "Service & warranty",
    text: "Every machine is workshop-inspected and backed by warranty and in-house technical support.",
    href: "/service",
    cta: "How it works",
  },
];

export function Highlights() {
  return (
    <section className="container-page py-16 lg:py-20">
      <div className="grid gap-6 md:grid-cols-3">
        {HIGHLIGHTS.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.08}>
            <div className="flex h-full flex-col rounded-card border border-line bg-white p-7 transition-shadow hover:shadow-md">
              <span className="flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <item.icon className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{item.text}</p>
              <Link
                href={item.href}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:gap-2.5"
              >
                {item.cta}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
