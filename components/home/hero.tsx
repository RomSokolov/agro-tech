import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import { EquipmentVisual } from "@/components/equipment/equipment-visual";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";

const STATS = [
  { value: "20+", label: "Machines in stock" },
  { value: "6", label: "Equipment categories" },
  { value: "48h", label: "Avg. delivery dispatch" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-sand-50">
      <div className="container-page grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-600">
              New &amp; pre-owned machinery
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Farm equipment that&apos;s ready to work the season.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-lg text-lg text-muted">
              Tractors, harvesters, sprayers and tillage tools — inspected,
              serviced and delivered nationwide. Find the right machine for your
              operation in minutes.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/catalog" className={buttonVariants("primary", "lg")}>
                Browse the catalog
                <ArrowRight className="size-4.5" />
              </Link>
              <Link href="/about" className={buttonVariants("outline", "lg")}>
                <PhoneCall className="size-4.5" />
                Talk to our team
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-3xl font-bold text-brand-600">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-sm text-muted">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative">
          <div className="overflow-hidden rounded-2xl border border-line shadow-[0_30px_60px_-30px_rgba(22,52,32,0.5)]">
            <EquipmentVisual
              category="tractors"
              seed="hero-showcase"
              label="Featured tractor"
              className="aspect-[4/3] w-full"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-line bg-white p-4 shadow-lg sm:block">
            <p className="text-xs font-medium text-muted">Featured this week</p>
            <p className="text-sm font-bold text-ink">John Deere 6155M</p>
            <p className="text-sm font-bold text-brand-600">$189,500</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
