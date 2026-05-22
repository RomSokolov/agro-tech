"use client";

import * as RadixSelect from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type SelectOption = { value: string; label: string };

type SelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  "aria-label"?: string;
};

export function Select({
  value,
  onValueChange,
  options,
  placeholder,
  className,
  ...rest
}: SelectProps) {
  return (
    <RadixSelect.Root value={value} onValueChange={onValueChange}>
      <RadixSelect.Trigger
        aria-label={rest["aria-label"]}
        className={cn(
          "inline-flex h-11 w-full items-center justify-between gap-2 rounded-lg",
          "border border-line bg-white px-3.5 text-sm text-ink",
          "transition-colors hover:border-brand-300",
          "focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20",
          "data-[placeholder]:text-muted",
          className,
        )}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon>
          <ChevronDown className="size-4 text-muted" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          sideOffset={6}
          className={cn(
            "z-50 max-h-72 w-[var(--radix-select-trigger-width)] overflow-hidden",
            "rounded-lg border border-line bg-white shadow-lg",
          )}
        >
          <RadixSelect.Viewport className="p-1">
            {options.map((option) => (
              <RadixSelect.Item
                key={option.value}
                value={option.value}
                className={cn(
                  "relative flex cursor-pointer select-none items-center rounded-md",
                  "py-2 pl-3 pr-8 text-sm text-ink outline-none",
                  "data-[highlighted]:bg-brand-50 data-[state=checked]:font-semibold",
                )}
              >
                <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator className="absolute right-2.5">
                  <Check className="size-4 text-brand-500" />
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}
