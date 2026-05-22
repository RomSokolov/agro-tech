"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { filtersToQuery } from "@/lib/filters";
import type { EquipmentFilters } from "@/lib/types";

export function useFilterNav() {
  const router = useRouter();
  const pathname = usePathname();

  return useCallback(
    (next: EquipmentFilters) => {
      const query = filtersToQuery(next);
      router.push(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [router, pathname],
  );
}
