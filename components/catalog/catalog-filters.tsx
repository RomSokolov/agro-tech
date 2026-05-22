"use client";

import { useEffect, useState } from "react";
import { RotateCcw, Search } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  BRANDS,
  CATEGORIES,
  formatPrice,
  POWER_BOUNDS,
  PRICE_BOUNDS,
} from "@/lib/constants";
import { countActiveFilters } from "@/lib/filters";
import type { Condition, EquipmentFilters } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useFilterNav } from "./use-filter-nav";

const CONDITIONS: { value: Condition | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "used", label: "Used" },
];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-line py-5 first:border-t-0 first:pt-0">
      <h3 className="mb-3 text-sm font-bold text-ink">{title}</h3>
      {children}
    </div>
  );
}

export function CatalogFilters({ filters }: { filters: EquipmentFilters }) {
  const navigate = useFilterNav();
  const activeCount = countActiveFilters(filters);

  const [search, setSearch] = useState(filters.search ?? "");
  const [price, setPrice] = useState<number[]>([
    filters.minPrice ?? PRICE_BOUNDS.min,
    filters.maxPrice ?? PRICE_BOUNDS.max,
  ]);
  const [power, setPower] = useState(filters.minPower ?? 0);

  useEffect(() => {
    setSearch(filters.search ?? "");
  }, [filters.search]);
  useEffect(() => {
    setPrice([
      filters.minPrice ?? PRICE_BOUNDS.min,
      filters.maxPrice ?? PRICE_BOUNDS.max,
    ]);
  }, [filters.minPrice, filters.maxPrice]);
  useEffect(() => {
    setPower(filters.minPower ?? 0);
  }, [filters.minPower]);

  useEffect(() => {
    if (search === (filters.search ?? "")) return;
    const timer = setTimeout(() => {
      navigate({ ...filters, search: search || undefined });
    }, 350);
    return () => clearTimeout(timer);
  }, [search, filters, navigate]);

  function toggleBrand(brand: string) {
    const selected = new Set(filters.brand ?? []);
    if (selected.has(brand)) selected.delete(brand);
    else selected.add(brand);
    navigate({ ...filters, brand: [...selected] });
  }

  function commitPrice(next: number[]) {
    navigate({
      ...filters,
      minPrice: next[0] > PRICE_BOUNDS.min ? next[0] : undefined,
      maxPrice: next[1] < PRICE_BOUNDS.max ? next[1] : undefined,
    });
  }

  function commitPower(next: number[]) {
    navigate({ ...filters, minPower: next[0] > 0 ? next[0] : undefined });
  }

  function clearAll() {
    setSearch("");
    setPrice([PRICE_BOUNDS.min, PRICE_BOUNDS.max]);
    setPower(0);
    navigate({ sort: filters.sort });
  }

  return (
    <div>
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-base font-bold text-ink">Filters</h2>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
          >
            <RotateCcw className="size-3.5" />
            Clear all ({activeCount})
          </button>
        )}
      </div>

      <Section title="Search">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Model or brand"
            className="h-11 w-full rounded-lg border border-line bg-white pl-9 pr-3 text-sm text-ink placeholder:text-muted/70 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
      </Section>

      <Section title="Category">
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => navigate({ ...filters, category: undefined })}
            className={cn(
              "rounded-md px-3 py-2 text-left text-sm transition-colors",
              !filters.category
                ? "bg-brand-50 font-semibold text-brand-700"
                : "text-ink hover:bg-sand-100",
            )}
          >
            All equipment
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category.slug}
              type="button"
              onClick={() =>
                navigate({ ...filters, category: category.slug })
              }
              className={cn(
                "rounded-md px-3 py-2 text-left text-sm transition-colors",
                filters.category === category.slug
                  ? "bg-brand-50 font-semibold text-brand-700"
                  : "text-ink hover:bg-sand-100",
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Condition">
        <div className="grid grid-cols-3 gap-1.5">
          {CONDITIONS.map((option) => {
            const active =
              (option.value === "all" && !filters.condition) ||
              option.value === filters.condition;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  navigate({
                    ...filters,
                    condition:
                      option.value === "all" ? undefined : option.value,
                  })
                }
                className={cn(
                  "rounded-md border py-2 text-sm font-medium transition-colors",
                  active
                    ? "border-brand-500 bg-brand-500 text-white"
                    : "border-line text-ink hover:border-brand-300",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Brand">
        <div className="flex flex-col gap-2.5">
          {BRANDS.map((brand) => (
            <label
              key={brand}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-ink"
            >
              <input
                type="checkbox"
                checked={filters.brand?.includes(brand) ?? false}
                onChange={() => toggleBrand(brand)}
                className="size-4 accent-brand-500"
              />
              {brand}
            </label>
          ))}
        </div>
      </Section>

      <Section title="Price range">
        <Slider
          value={price}
          onValueChange={setPrice}
          onValueCommit={commitPrice}
          min={PRICE_BOUNDS.min}
          max={PRICE_BOUNDS.max}
          step={5000}
          aria-label="Price range"
        />
        <div className="mt-2 flex justify-between text-sm font-medium text-ink">
          <span>{formatPrice(price[0])}</span>
          <span>
            {price[1] >= PRICE_BOUNDS.max
              ? `${formatPrice(PRICE_BOUNDS.max)}+`
              : formatPrice(price[1])}
          </span>
        </div>
      </Section>

      <Section title="Minimum power">
        <Slider
          value={[power]}
          onValueChange={(value) => setPower(value[0])}
          onValueCommit={commitPower}
          min={POWER_BOUNDS.min}
          max={POWER_BOUNDS.max}
          step={10}
          aria-label="Minimum horsepower"
        />
        <div className="mt-2 text-sm font-medium text-ink">
          {power > 0 ? `${power} hp and up` : "Any power"}
        </div>
      </Section>
    </div>
  );
}
