import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Phone } from "lucide-react";
import { EquipmentCard } from "@/components/equipment/equipment-card";
import { EquipmentVisual } from "@/components/equipment/equipment-visual";
import { LeadForm } from "@/components/forms/lead-form";
import { Badge } from "@/components/ui/badge";
import { categoryBySlug, formatPrice, SITE } from "@/lib/constants";
import {
  getAllSlugs,
  getEquipmentBySlug,
  getRelatedEquipment,
} from "@/lib/equipment";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const equipment = await getEquipmentBySlug(slug);
  if (!equipment) return { title: "Equipment not found" };
  return {
    title: equipment.name,
    description: equipment.shortDescription,
  };
}

export default async function EquipmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const equipment = await getEquipmentBySlug(slug);
  if (!equipment) notFound();

  const category = categoryBySlug(equipment.category);
  const related = await getRelatedEquipment(equipment, 3);

  const keyFacts = [
    { label: "Model year", value: String(equipment.year) },
    { label: "Engine power", value: `${equipment.horsepower} hp` },
    {
      label: "Engine hours",
      value:
        equipment.condition === "used" && equipment.hours
          ? `${equipment.hours.toLocaleString()} h`
          : "—",
    },
    {
      label: "Condition",
      value: equipment.condition === "new" ? "New" : "Used",
    },
  ];

  return (
    <div className="pb-16">
      <div className="border-b border-line bg-sand-50">
        <div className="container-page py-6">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-muted">
            <Link href="/" className="hover:text-brand-600">
              Home
            </Link>
            <span>/</span>
            <Link href="/catalog" className="hover:text-brand-600">
              Catalog
            </Link>
            <span>/</span>
            {category && (
              <>
                <Link
                  href={`/catalog?category=${category.slug}`}
                  className="hover:text-brand-600"
                >
                  {category.label}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-ink">{equipment.name}</span>
          </nav>
        </div>
      </div>

      <div className="container-page pt-8">
        <span className="text-sm font-semibold uppercase tracking-wide text-brand-500">
          {category?.label ?? equipment.category}
        </span>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {equipment.name}
          </h1>
          <Badge tone={equipment.condition === "new" ? "brand" : "accent"}>
            {equipment.condition === "new" ? "New" : "Used"}
          </Badge>
        </div>
        <p className="mt-2 text-muted">{equipment.shortDescription}</p>
      </div>

      <div className="container-page mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="overflow-hidden rounded-2xl border border-line">
            <EquipmentVisual
              category={equipment.category}
              seed={equipment.slug}
              label={equipment.name}
              className="aspect-[16/10] w-full"
            />
          </div>

          <section className="mt-10">
            <h2 className="text-xl font-bold text-ink">Overview</h2>
            <p className="mt-3 leading-relaxed text-muted">
              {equipment.description}
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-bold text-ink">Specifications</h2>
            <dl className="mt-4 overflow-hidden rounded-card border border-line">
              {equipment.specs.map((spec, index) => (
                <div
                  key={spec.label}
                  className={`flex justify-between gap-6 px-5 py-3.5 text-sm ${
                    index % 2 === 1 ? "bg-sand-50" : "bg-white"
                  }`}
                >
                  <dt className="text-muted">{spec.label}</dt>
                  <dd className="text-right font-semibold text-ink">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <aside>
          <div className="sticky top-28 space-y-5">
            <div className="rounded-card border border-line bg-white p-6">
              <p className="text-sm text-muted">Price</p>
              <p className="text-3xl font-bold text-brand-600">
                {formatPrice(equipment.price)}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-brand-600">
                <Check className="size-4" />
                {equipment.inStock ? "In stock — ready to view" : "Available to order"}
              </p>

              <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line">
                {keyFacts.map((fact) => (
                  <div key={fact.label} className="bg-white p-3">
                    <dt className="text-xs uppercase tracking-wide text-muted">
                      {fact.label}
                    </dt>
                    <dd className="mt-0.5 text-sm font-bold text-ink">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}
                className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-brand-600"
              >
                <Phone className="size-4" />
                {SITE.phone}
              </a>
            </div>

            <div className="rounded-card border border-line bg-white p-6">
              <h2 className="text-lg font-bold text-ink">Request a quote</h2>
              <p className="mt-1 text-sm text-muted">
                Ask about price, finance, trade-in or a demonstration.
              </p>
              <div className="mt-4">
                <LeadForm
                  type="quote"
                  equipmentId={equipment.id}
                  equipmentName={equipment.name}
                />
              </div>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <div className="container-page mt-16">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-ink">
              Similar {category?.label.toLowerCase() ?? "equipment"}
            </h2>
            <Link
              href={`/catalog?category=${equipment.category}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:gap-2.5"
            >
              <ArrowLeft className="size-4 rotate-180" />
              View all
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <EquipmentCard key={item.id} equipment={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
