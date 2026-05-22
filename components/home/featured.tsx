import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EquipmentCard } from "@/components/equipment/equipment-card";
import { Reveal } from "@/components/motion/reveal";
import type { Equipment } from "@/lib/types";

export function Featured({ equipment }: { equipment: Equipment[] }) {
  if (equipment.length === 0) return null;

  return (
    <section className="container-page py-16 lg:py-20">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Featured machines
            </h2>
            <p className="mt-3 text-muted">
              Hand-picked equipment from our current stock — ready for
              inspection, demo or immediate delivery.
            </p>
          </div>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:gap-2.5"
          >
            View all equipment
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {equipment.map((item, index) => (
          <Reveal key={item.id} delay={(index % 4) * 0.06}>
            <EquipmentCard equipment={item} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
