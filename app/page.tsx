import { CategoryGrid } from "@/components/home/category-grid";
import { Featured } from "@/components/home/featured";
import { Hero } from "@/components/home/hero";
import { Highlights } from "@/components/home/highlights";
import { HomeCta } from "@/components/home/home-cta";
import { ValueProps } from "@/components/home/value-props";
import { getCategoryCounts, getFeaturedEquipment } from "@/lib/equipment";

export default async function HomePage() {
  const [featured, counts] = await Promise.all([
    getFeaturedEquipment(4),
    getCategoryCounts(),
  ]);

  return (
    <>
      <Hero />
      <Highlights />
      <CategoryGrid counts={counts} />
      <Featured equipment={featured} />
      <ValueProps />
      <HomeCta />
    </>
  );
}
