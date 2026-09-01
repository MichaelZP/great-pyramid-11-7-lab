import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
  className?: string;
};

export function RangeSlider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
  className,
}: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const rounded = Number(value.toFixed(6));

  return (
    <label className={cn("block", className)}>
      <span className="mb-1 flex items-baseline justify-between gap-3">
        <span className="text-xs font-medium tracking-wide text-muted uppercase">
          {label}
        </span>
        <span className="font-mono text-sm tabular text-fg">{display}</span>
      </span>
      {mounted ? (
        <input
          type="range"
          aria-label={label}
          min={min}
          max={max}
          step={step}
          value={rounded}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-11 w-full cursor-pointer appearance-none bg-bg-subtle"
        />
      ) : (
        <div className="h-11 w-full bg-bg-subtle" />
      )}
    </label>
  );
}
