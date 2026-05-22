import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getAllSlugs } from "@/lib/equipment";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, priority: 1 },
    { url: `${SITE_URL}/catalog`, lastModified: now, priority: 0.9 },
    { url: `${SITE_URL}/delivery`, lastModified: now, priority: 0.6 },
    { url: `${SITE_URL}/service`, lastModified: now, priority: 0.6 },
    { url: `${SITE_URL}/about`, lastModified: now, priority: 0.6 },
  ];

  const equipmentRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE_URL}/catalog/${slug}`,
    lastModified: now,
    priority: 0.7,
  }));

  return [...staticRoutes, ...equipmentRoutes];
}
