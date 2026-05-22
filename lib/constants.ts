import type { SortOption } from "./types";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://agrifield.example";

export const SITE = {
  name: "AgriField",
  tagline: "Farm Machinery & Agricultural Equipment",
  phone: "+1 (608) 555-0142",
  email: "sales@agrifield.example",
  address: "4120 County Road M, Madison, WI 53704",
  hours: "Mon–Fri 7:30am–6pm · Sat 8am–2pm",
};

export type Category = {
  slug: string;
  label: string;
  short: string;
  description: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "tractors",
    label: "Tractors",
    short: "Utility & row-crop tractors",
    description:
      "Compact, utility and high-horsepower row-crop tractors for every acreage and task.",
  },
  {
    slug: "harvesters",
    label: "Harvesters",
    short: "Combines & forage harvesters",
    description:
      "Combine and forage harvesters built to bring in grain and silage at peak efficiency.",
  },
  {
    slug: "seeders",
    label: "Seeders & Planters",
    short: "Precision planting equipment",
    description:
      "Air seeders, drills and precision planters for accurate seed placement and even emergence.",
  },
  {
    slug: "sprayers",
    label: "Sprayers",
    short: "Self-propelled & trailed sprayers",
    description:
      "Self-propelled and trailed crop sprayers with wide booms and precise rate control.",
  },
  {
    slug: "loaders",
    label: "Loaders & Telehandlers",
    short: "Material handling machines",
    description:
      "Telehandlers, wheel loaders and skid steers for fast, safe material handling around the farm.",
  },
  {
    slug: "tillage",
    label: "Tillage",
    short: "Ploughs, cultivators & discs",
    description:
      "Ploughs, disc harrows and cultivators to prepare a clean, level seedbed.",
  },
];

export const BRANDS = [
  "John Deere",
  "Case IH",
  "New Holland",
  "Fendt",
  "Kubota",
  "Massey Ferguson",
  "Claas",
] as const;

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "power-desc", label: "Most horsepower" },
];

export const PRICE_BOUNDS = { min: 0, max: 600000 };
export const POWER_BOUNDS = { min: 0, max: 600 };

export function categoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
