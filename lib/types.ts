export type Condition = "new" | "used";

export type Spec = {
  label: string;
  value: string;
};

export type Equipment = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  condition: Condition;
  price: number;
  year: number;
  horsepower: number;
  hours: number | null;
  shortDescription: string;
  description: string;
  images: string[];
  specs: Spec[];
  featured: boolean;
  inStock: boolean;
};

export type LeadType = "general" | "quote";

export type EquipmentFilters = {
  category?: string;
  brand?: string[];
  condition?: Condition;
  minPrice?: number;
  maxPrice?: number;
  minPower?: number;
  search?: string;
  sort?: SortOption;
};

export type SortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "power-desc";
