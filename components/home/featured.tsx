import { EquipmentCard } from "@/components/equipment/equipment-card";
import { Reveal } from "@/components/motion/reveal";
import { ArrowLink } from "@/components/ui/arrow-link";
import type { Equipment } from "@/lib/types";

export function Featured({ equipment }: { equipment: Equipment[] }) {
  if (equipment.length === 0) return null;

  return (
    <section className="container-page py-16 lg:py-20">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="heading-display">Featured machines</h2>
            <p className="mt-3 text-muted">
              Hand-picked equipment from our current stock — ready for
              inspection, demo or immediate delivery.
            </p>
          </div>
          <ArrowLink href="/catalog">View all equipment</ArrowLink>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {equipment.map((item, index) => (
          <Reveal key={item.id} delay={(index % 4) * 0.06} className="h-full">
            <EquipmentCard equipment={item} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
