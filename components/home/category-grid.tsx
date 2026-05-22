import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EquipmentVisual } from "@/components/equipment/equipment-visual";
import { Reveal } from "@/components/motion/reveal";
import { CATEGORIES } from "@/lib/constants";

export function CategoryGrid({ counts }: { counts: Record<string, number> }) {
  return (
    <section className="bg-sand-50 py-16 lg:py-20">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="heading-display">Browse by equipment type</h2>
            <p className="mt-3 text-muted">
              Whatever stage of the season you are working, start from the
              category that fits the job.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category, index) => (
            <Reveal key={category.slug} delay={(index % 3) * 0.07}>
              <Link
                href={`/catalog?category=${category.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <EquipmentVisual
                  category={category.slug}
                  seed={`cat-${category.slug}`}
                  label={category.label}
                  className="aspect-[16/9] w-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-ink">
                      {category.label}
                    </h3>
                    <span className="text-sm font-semibold text-muted">
                      {counts[category.slug] ?? 0}
                    </span>
                  </div>
                  <p className="mt-1.5 flex-1 text-sm text-muted">
                    {category.short}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                    Explore
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
