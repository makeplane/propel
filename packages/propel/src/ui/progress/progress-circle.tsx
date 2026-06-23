import { Progress as BaseProgress } from "@base-ui/react/progress";
import { type VariantProps } from "class-variance-authority";

import { ringVariants } from "./variants";

// Circle geometry per magnitude. The Figma circular variant (nodes 5736-3457 / 5736-3460)
// is a 16px (sm) / 20px (md) box holding a 2px-stroke ring: a 14px circle (sm) or 18px
// circle (md). The centerline radius is therefore (diameter - stroke) / 2 -> 6 (sm) / 8
// (md). The viewBox matches the box so 1 SVG user unit == 1px.
const RING_GEOMETRY = {
  sm: { box: 16, radius: 6 },
  md: { box: 20, radius: 8 },
} as const;
const RING_STROKE = 2;

type RingMagnitude = NonNullable<VariantProps<typeof ringVariants>["magnitude"]>;
type RingTone = NonNullable<VariantProps<typeof ringVariants>["tone"]>;

/** Props for {@link ProgressCircle}. */
export type ProgressCircleProps = Omit<BaseProgress.Root.Props, "className" | "style" | "value"> & {
  /** Completion from 0 to `max` (default max 100). */
  value: number;
  /** Diameter (`sm` 16px / `md` 20px). */
  magnitude: RingMagnitude;
  /** Fill color for the arc. */
  tone: RingTone;
  /** Accessible name for the ring. */
  "aria-label": string;
};

/**
 * The atomic determinate progress ring — a styled `Progress.Root` wrapping an SVG: a subtle track
 * circle (`layer-3-selected`) plus a toned arc proportional to the value, with rounded caps.
 * `magnitude` changes the diameter (`sm` 16px / `md` 20px). `tone` drives the arc fill color via
 * the `--progress-fill` CSS custom property set by `ringVariants`. Base UI `Progress.Root` owns the
 * `progressbar` role + `aria-valuenow`.
 */
export function ProgressCircle({ value, magnitude, tone, ...props }: ProgressCircleProps) {
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
    <BaseProgress.Root value={clampedValue} {...props}>
      <svg
        className={ringVariants({ magnitude, tone })}
        viewBox={`0 0 ${box} ${box}`}
        fill="none"
        aria-hidden="true"
      >
        {/* Track: the full subtle ring. Strokes with the same `layer-3-selected`
            surface token the linear track fills with, so both variants read as the
            same low-emphasis track and re-tint together in every theme. */}
        <circle
          className="[stroke:var(--bg-layer-3-selected)]"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={RING_STROKE}
        />
        {/* Indicator arc: toned stroke proportional to the value. `ringVariants` sets
            `--progress-fill` per tone; the arc reads it so all color logic stays in cva.
            Rotated -90deg so the arc starts at 12 o'clock; the dash offset shrinks it
            toward `value`. `transform-origin: center` keeps the rotation about the
            circle's center regardless of direction (the visual sweep stays clockwise in
            RTL too). */}
        <circle
          className="origin-center -rotate-90 [stroke:var(--progress-fill)] transition-[stroke-dashoffset] duration-300 ease-out"
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
