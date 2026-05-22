import { ShieldCheck, Truck, Warehouse } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { FeatureCard } from "@/components/ui/feature-card";

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
            <FeatureCard
              icon={item.icon}
              title={item.title}
              text={item.text}
              link={{ href: item.href, label: item.cta }}
              className="transition-shadow hover:shadow-md"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
