"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { SlidersHorizontal, X } from "lucide-react";
import { Select } from "@/components/ui/select";
import { SORT_OPTIONS } from "@/lib/constants";
import { countActiveFilters } from "@/lib/filters";
import type { EquipmentFilters, SortOption } from "@/lib/types";
import { CatalogFilters } from "./catalog-filters";
import { useFilterNav } from "./use-filter-nav";

type CatalogToolbarProps = {
  total: number;
  filters: EquipmentFilters;
};

export function CatalogToolbar({ total, filters }: CatalogToolbarProps) {
  const navigate = useFilterNav();
  const activeCount = countActiveFilters(filters);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <Dialog.Root>
          <Dialog.Trigger className="inline-flex h-11 items-center gap-2 rounded-lg border border-line bg-white px-4 text-sm font-semibold text-ink lg:hidden">
            <SlidersHorizontal className="size-4" />
            Filters
            {activeCount > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-brand-500 text-xs text-white">
                {activeCount}
              </span>
            )}
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm" />
            <Dialog.Content className="fixed inset-y-0 left-0 z-50 flex w-[88vw] max-w-sm flex-col bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <Dialog.Title className="text-base font-bold text-ink">
                  Filters
                </Dialog.Title>
                <Dialog.Close
                  aria-label="Close filters"
                  className="flex size-9 items-center justify-center rounded-lg border border-line"
                >
                  <X className="size-4" />
                </Dialog.Close>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-4">
                <CatalogFilters filters={filters} showTitle={false} />
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <p className="text-sm text-muted">
          <span className="font-bold text-ink">{total}</span>{" "}
          {total === 1 ? "machine" : "machines"} found
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="hidden text-sm text-muted sm:inline">Sort by</span>
        <Select
          aria-label="Sort equipment"
          value={filters.sort ?? "newest"}
          onValueChange={(value) =>
            navigate({ ...filters, sort: value as SortOption })
          }
          options={SORT_OPTIONS}
          className="w-52"
        />
      </div>
    </div>
  );
}
