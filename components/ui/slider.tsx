"use client";

import * as RadixSlider from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

type SliderProps = {
  value: number[];
  onValueChange: (value: number[]) => void;
  onValueCommit?: (value: number[]) => void;
  min: number;
  max: number;
  step?: number;
  className?: string;
  "aria-label"?: string;
};

export function Slider({
  value,
  onValueChange,
  onValueCommit,
  min,
  max,
  step = 1,
  className,
  ...rest
}: SliderProps) {
  return (
    <RadixSlider.Root
      className={cn(
        "relative flex w-full touch-none select-none items-center py-2",
        className,
      )}
      value={value}
      onValueChange={onValueChange}
      onValueCommit={onValueCommit}
      min={min}
      max={max}
      step={step}
    >
      <RadixSlider.Track className="relative h-1.5 w-full grow rounded-full bg-sand-200">
        <RadixSlider.Range className="absolute h-full rounded-full bg-brand-500" />
      </RadixSlider.Track>
      {value.map((_, index) => (
        <RadixSlider.Thumb
          key={index}
          aria-label={rest["aria-label"]}
          className={cn(
            "block size-4 rounded-full border-2 border-brand-500 bg-white shadow-sm",
            "transition-transform hover:scale-110",
            "focus:outline-none focus:ring-2 focus:ring-brand-500/30",
          )}
        />
      ))}
    </RadixSlider.Root>
  );
}
