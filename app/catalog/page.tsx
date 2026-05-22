import type { Metadata } from "next";
import Link from "next/link";
import { PackageOpen } from "lucide-react";
import { CatalogFilters } from "@/components/catalog/catalog-filters";
import { CatalogToolbar } from "@/components/catalog/catalog-toolbar";
import { EquipmentCard } from "@/components/equipment/equipment-card";
import { Card } from "@/components/ui/card";
import { categoryBySlug } from "@/lib/constants";
import { queryEquipment } from "@/lib/equipment";
import { parseFilters, type RawSearchParams } from "@/lib/filters";

export const metadata: Metadata = {
  title: "Equipment catalog",
  description:
    "Filter new and pre-owned tractors, harvesters, sprayers, seeders, loaders and tillage equipment by category, brand, power and price.",
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const filters = parseFilters(await searchParams);
  const equipment = await queryEquipment(filters);
  const category = filters.category
    ? categoryBySlug(filters.category)
    : undefined;

  return (
    <div>
      <div className="border-b border-line bg-sand-50">
        <div className="container-page py-10 lg:py-12">
          <nav className="text-sm text-muted">
            <Link href="/" className="hover:text-brand-600">
              Home
            </Link>
            <span className="px-2">/</span>
            <span className="text-ink">Catalog</span>
          </nav>
          <h1 className="heading-display mt-3">
            {category ? category.label : "Equipment catalog"}
          </h1>
          <p className="mt-2 max-w-2xl text-muted">
            {category
              ? category.description
              : "Browse our full line-up of new and pre-owned agricultural machinery. Use the filters to narrow down by category, brand, power and budget."}
          </p>
        </div>
      </div>

      <div className="container-page grid gap-8 py-10 lg:grid-cols-[260px_1fr] lg:py-12">
        <aside className="hidden lg:block">
          <Card className="sticky top-28 p-5">
            <CatalogFilters filters={filters} />
          </Card>
        </aside>

        <div>
          <CatalogToolbar total={equipment.length} filters={filters} />

          {equipment.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {equipment.map((item) => (
                <EquipmentCard key={item.id} equipment={item} />
              ))}
            </div>
          ) : (
            <div className="mt-6 flex flex-col items-center rounded-card border border-dashed border-line bg-sand-50 px-6 py-16 text-center">
              <PackageOpen className="size-10 text-muted" />
              <h2 className="mt-4 text-lg font-bold text-ink">
                No machines match these filters
              </h2>
              <p className="mt-1.5 max-w-sm text-sm text-muted">
                Try widening your price or power range, or clearing some
                filters to see more equipment.
              </p>
              <Link
                href="/catalog"
                className="mt-5 text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                Reset all filters
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
