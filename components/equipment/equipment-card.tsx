import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EquipmentVisual } from "./equipment-visual";
import { Badge } from "@/components/ui/badge";
import { categoryBySlug, formatPrice } from "@/lib/constants";
import type { Equipment } from "@/lib/types";

export function EquipmentCard({ equipment }: { equipment: Equipment }) {
  const category = categoryBySlug(equipment.category);

  const stats = [
    { label: "Year", value: String(equipment.year) },
    { label: "Power", value: `${equipment.horsepower} hp` },
    {
      label: "Hours",
      value:
        equipment.condition === "used" && equipment.hours
          ? `${equipment.hours.toLocaleString()} h`
          : "—",
    },
  ];

  return (
    <Link
      href={`/catalog/${equipment.slug}`}
      className="group flex flex-col overflow-hidden rounded-card border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_18px_40px_-20px_rgba(22,52,32,0.45)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <EquipmentVisual
          category={equipment.category}
          seed={equipment.slug}
          label={equipment.name}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <Badge tone={equipment.condition === "new" ? "brand" : "accent"}>
            {equipment.condition === "new" ? "New" : "Used"}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-500">
          {category?.label ?? equipment.category}
        </span>
        <h3 className="mt-1.5 text-base font-bold text-ink">{equipment.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted">
          {equipment.shortDescription}
        </p>

        <dl className="mt-4 grid grid-cols-3 gap-2 border-y border-line py-3">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-[11px] uppercase tracking-wide text-muted">
                {stat.label}
              </dt>
              <dd className="text-sm font-semibold text-ink">{stat.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-bold text-brand-600">
            {formatPrice(equipment.price)}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-ink transition-colors group-hover:text-brand-600">
            More info
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
