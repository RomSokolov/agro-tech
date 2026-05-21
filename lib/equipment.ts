import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "./db";
import type { Condition, Equipment, EquipmentFilters, Spec } from "./types";

type EquipmentRow = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  condition: string;
  price: number;
  year: number;
  horsepower: number;
  hours: number | null;
  shortDescription: string;
  description: string;
  images: string;
  specs: string;
  featured: boolean;
  inStock: boolean;
};

function parseEquipment(row: EquipmentRow): Equipment {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    category: row.category,
    condition: row.condition as Condition,
    price: row.price,
    year: row.year,
    horsepower: row.horsepower,
    hours: row.hours,
    shortDescription: row.shortDescription,
    description: row.description,
    images: JSON.parse(row.images) as string[],
    specs: JSON.parse(row.specs) as Spec[],
    featured: row.featured,
    inStock: row.inStock,
  };
}

const ORDER_BY: Record<
  NonNullable<EquipmentFilters["sort"]>,
  Prisma.EquipmentOrderByWithRelationInput[]
> = {
  newest: [{ year: "desc" }, { createdAt: "desc" }],
  "price-asc": [{ price: "asc" }],
  "price-desc": [{ price: "desc" }],
  "power-desc": [{ horsepower: "desc" }],
};

export async function queryEquipment(
  filters: EquipmentFilters = {},
): Promise<Equipment[]> {
  const where: Prisma.EquipmentWhereInput = {};

  if (filters.category) where.category = filters.category;
  if (filters.condition) where.condition = filters.condition;
  if (filters.brand && filters.brand.length > 0) {
    where.brand = { in: filters.brand };
  }
  if (filters.minPrice != null || filters.maxPrice != null) {
    where.price = {
      gte: filters.minPrice ?? undefined,
      lte: filters.maxPrice ?? undefined,
    };
  }
  if (filters.minPower != null && filters.minPower > 0) {
    where.horsepower = { gte: filters.minPower };
  }
  if (filters.search) {
    const term = filters.search.trim();
    if (term) {
      where.OR = [
        { name: { contains: term } },
        { brand: { contains: term } },
      ];
    }
  }

  const rows = await prisma.equipment.findMany({
    where,
    orderBy: ORDER_BY[filters.sort ?? "newest"],
  });
  return rows.map(parseEquipment);
}

export async function getFeaturedEquipment(limit = 4): Promise<Equipment[]> {
  const rows = await prisma.equipment.findMany({
    where: { featured: true },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return rows.map(parseEquipment);
}

export async function getEquipmentBySlug(
  slug: string,
): Promise<Equipment | null> {
  const row = await prisma.equipment.findUnique({ where: { slug } });
  return row ? parseEquipment(row) : null;
}

export async function getRelatedEquipment(
  current: Equipment,
  limit = 3,
): Promise<Equipment[]> {
  const rows = await prisma.equipment.findMany({
    where: { category: current.category, slug: { not: current.slug } },
    orderBy: { featured: "desc" },
    take: limit,
  });
  return rows.map(parseEquipment);
}

export async function getCategoryCounts(): Promise<Record<string, number>> {
  const grouped = await prisma.equipment.groupBy({
    by: ["category"],
    _count: { _all: true },
  });
  return Object.fromEntries(
    grouped.map((g) => [g.category, g._count._all]),
  );
}

export async function getAllSlugs(): Promise<string[]> {
  const rows = await prisma.equipment.findMany({ select: { slug: true } });
  return rows.map((r) => r.slug);
}
