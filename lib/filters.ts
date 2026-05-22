import type { Condition, EquipmentFilters, SortOption } from "./types";

export type RawSearchParams = Record<string, string | string[] | undefined>;

const SORT_VALUES: SortOption[] = [
  "newest",
  "price-asc",
  "price-desc",
  "power-desc",
];

function first(value: string | string[] | undefined): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  const trimmed = raw?.trim();
  return trimmed ? trimmed : undefined;
}

function toNumber(value: string | undefined): number | undefined {
  if (value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function parseFilters(params: RawSearchParams): EquipmentFilters {
  const condition = first(params.condition);
  const sort = first(params.sort);
  const brand = first(params.brand);

  return {
    category: first(params.category),
    brand: brand ? brand.split(",").filter(Boolean) : undefined,
    condition:
      condition === "new" || condition === "used"
        ? (condition as Condition)
        : undefined,
    minPrice: toNumber(first(params.minPrice)),
    maxPrice: toNumber(first(params.maxPrice)),
    minPower: toNumber(first(params.minPower)),
    search: first(params.q),
    sort: SORT_VALUES.includes(sort as SortOption)
      ? (sort as SortOption)
      : undefined,
  };
}

export function filtersToQuery(filters: EquipmentFilters): string {
  const params = new URLSearchParams();
  if (filters.category) params.set("category", filters.category);
  if (filters.brand && filters.brand.length > 0) {
    params.set("brand", filters.brand.join(","));
  }
  if (filters.condition) params.set("condition", filters.condition);
  if (filters.minPrice != null) params.set("minPrice", String(filters.minPrice));
  if (filters.maxPrice != null) params.set("maxPrice", String(filters.maxPrice));
  if (filters.minPower != null && filters.minPower > 0) {
    params.set("minPower", String(filters.minPower));
  }
  if (filters.search) params.set("q", filters.search);
  if (filters.sort && filters.sort !== "newest") {
    params.set("sort", filters.sort);
  }
  return params.toString();
}

export function countActiveFilters(filters: EquipmentFilters): number {
  let count = 0;
  if (filters.category) count += 1;
  if (filters.condition) count += 1;
  if (filters.brand && filters.brand.length > 0) count += filters.brand.length;
  if (filters.minPrice != null || filters.maxPrice != null) count += 1;
  if (filters.minPower != null && filters.minPower > 0) count += 1;
  if (filters.search) count += 1;
  return count;
}
