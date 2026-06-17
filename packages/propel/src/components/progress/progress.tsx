import { Progress as BaseProgress } from "@base-ui/react/progress";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const rootVariants = cva("", {
  variants: {
    variant: {
      linear: "flex w-full items-center gap-2",
      circular: "",
    },
  },
});

const trackVariants = cva(
  "relative min-w-0 flex-1 overflow-hidden rounded-full bg-layer-3-selected",
  {
    variants: {
      magnitude: {
        sm: "h-[5px]",
        md: "h-2",
      },
    },
  },
);

const ringVariants = cva("shrink-0", {
  variants: {
    magnitude: {
      sm: "size-4",
      md: "size-5",
    },
  },
});

// Circle geometry per magnitude. The Figma circular variant (nodes 5736-3457 / 5736-3460)
// is a 16px (sm) / 20px (md) box holding a 2px-stroke ring: a 14px circle (sm) or 18px
// circle (md). The centerline radius is therefore (diameter - stroke) / 2 -> 6 (sm) / 8
// (md). The viewBox matches the box so 1 SVG user unit == 1px.
const RING_GEOMETRY = {
  sm: { box: 16, radius: 6 },
  md: { box: 20, radius: 8 },
} as const;
const RING_STROKE = 2;

// The Figma "Progress" component has two variants:
//  - linear (node 1990-51): a pill-shaped track (`layer-3-selected`) with an
//    accent-filled indicator and an optional trailing percentage label
//    (`text/accent/primary`, 12px medium). `magnitude` only changes the track
//    thickness — `sm` 5px, `md` 8px.
//  - circular (node 5736-3457): a small determinate ring — a subtle track circle
//    (`layer-3-selected`, the same surface the linear track uses) plus an accent arc
//    (`background/accent/primary`) proportional to the value, with rounded caps and no
//    label. `magnitude` changes the diameter — `sm` 16px, `md` 20px.
// Both are built on Base UI `Progress`, which owns the `progressbar` role +
// `aria-valuenow` for us.
export type ProgressMagnitude = NonNullable<VariantProps<typeof trackVariants>["magnitude"]>;
export type ProgressVariant = NonNullable<VariantProps<typeof rootVariants>["variant"]>;

export type ProgressProps = Omit<
  React.ComponentProps<typeof BaseProgress.Root>,
  "className" | "render" | "style" | "value"
> & {
  /** `linear` = a horizontal bar. `circular` = a determinate ring. */
  variant: ProgressVariant;
  /** Completion from 0 to `max` (default max 100). */
  value: number;
  /** `linear`: track thickness (`sm` 5px / `md` 8px). `circular`: diameter (`sm` 16px / `md` 20px). */
  magnitude: ProgressMagnitude;
  /**
   * Show the trailing percentage label. Only applies to `variant="linear"` — the circular rings are
   * too small for a label, so this is ignored when `circular`.
   *
   * @default true
   */
  showValue?: boolean;
  /**
   * Accessible name for the bar. Required: a progress bar needs a name for assistive tech (the
   * visible percentage is not a substitute).
   */
  "aria-label": string;
};

/**
 * A determinate progress indicator — task completion over time (uploads, imports, the Toast
 * auto-dismiss countdown). Drive it with `value` (0–`max`, default max 100); the fill and
 * `aria-valuenow` follow.
 *
 * `variant="linear"` is a horizontal bar with an optional trailing `%` label (shown by default;
 * hide it with `showValue={false}`). `variant="circular"` is a small ring with no label
 * (`showValue` is ignored).
 */
export function Progress({ variant, value, magnitude, showValue = true, ...props }: ProgressProps) {
  if (variant === "circular") {
    const { box, radius } = RING_GEOMETRY[magnitude];
    const circumference = 2 * Math.PI * radius;
    const max = props.max ?? 100;
    // Clamp once and feed the same value to the SVG arc and the Root, so the arc
    // and `aria-valuenow` never disagree for out-of-range input.
    const clampedValue = Math.min(Math.max(value, 0), max);
    const fraction = max > 0 ? clampedValue / max : 0;
    const dashOffset = circumference * (1 - fraction);
    const center = box / 2;
    return (
      <BaseProgress.Root value={clampedValue} className={rootVariants({ variant })} {...props}>
        <svg
          className={ringVariants({ magnitude })}
          viewBox={`0 0 ${box} ${box}`}
          fill="none"
          aria-hidden="true"
        >
          {/* Track: the full subtle ring. Strokes with the same `layer-3-selected`
              surface token the linear track fills with, so both variants read as the
              same low-emphasis track and re-tint together in every theme. (The old
              `icon-disabled` icon token sat too bright in dark mode — its track lightness
              landed right next to the accent arc, so the indicator stopped reading.) */}
          <circle
            className="[stroke:var(--bg-layer-3-selected)]"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={RING_STROKE}
          />
          {/* Indicator arc: accent stroke proportional to the value, using the same
              `accent-primary` token the linear indicator fills with (Figma binds both to
              `background/accent/primary`). Rotated -90deg so the arc starts at 12 o'clock;
              the dash offset shrinks it toward `value`. `transform-origin: center` keeps
              the rotation about the circle's center regardless of direction (the visual
              sweep stays clockwise in RTL too). */}
          <circle
            className="origin-center -rotate-90 [stroke:var(--bg-accent-primary)] transition-[stroke-dashoffset] duration-300 ease-out"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={RING_STROKE}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>
      </BaseProgress.Root>
    );
  }

  return (
    <BaseProgress.Root value={value} className={rootVariants({ variant })} {...props}>
      <BaseProgress.Track className={trackVariants({ magnitude })}>
        {/* Base UI sets the indicator's `width` (and `inset-inline-start: 0`) from the
            value; we own its fill, pill radius, and the fill transition. */}
        <BaseProgress.Indicator className="absolute inset-y-0 rounded-full bg-accent-primary transition-[width] duration-300 ease-out" />
      </BaseProgress.Track>
      {showValue ? (
        <BaseProgress.Value className="shrink-0 text-12 font-medium text-accent-primary tabular-nums">
          {(_, currentValue) => (currentValue == null ? "" : `${Math.round(currentValue)}%`)}
        </BaseProgress.Value>
      ) : null}
    </BaseProgress.Root>
  );
}
