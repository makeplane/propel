import { Progress as BaseProgress } from "@base-ui/react/progress";

import {
  CircularProgress as CircularProgressElement,
  CircularProgressIndicator,
  type CircularProgressIndicatorProps,
  type CircularProgressProps as CircularProgressElementProps,
  CircularProgressSvg,
  CircularProgressTrack,
} from "../../elements/circular-progress";

export type CircularProgressMagnitude = NonNullable<CircularProgressElementProps["magnitude"]>;
export type CircularProgressTone = NonNullable<CircularProgressIndicatorProps["tone"]>;

// Circle geometry per magnitude (Figma 5736-3457/3460): a 16px (sm) / 20px (md) box holding a
// 2px-stroke ring; centerline radius = (diameter - stroke) / 2 -> 6 (sm) / 8 (md).
const RING_GEOMETRY: Record<CircularProgressMagnitude, { box: number; radius: number }> = {
  sm: { box: 16, radius: 6 },
  md: { box: 20, radius: 8 },
};
const RING_STROKE = 2;

export type CircularProgressProps = Omit<
  BaseProgress.Root.Props,
  "className" | "style" | "value" | "render"
> & {
  /**
   * Completion from 0 to `max` (default 100). `null` = indeterminate: a fixed quarter arc spins
   * (`aria-valuenow` unset).
   */
  value: number | null;
  /** Diameter: `sm` 16px / `md` 20px. */
  magnitude: CircularProgressMagnitude;
  /** Arc color: `brand` accent, `success`/`warning`/`danger` outcome. */
  tone: CircularProgressTone;
  /** Accessible name (required). */
  "aria-label": string;
};

/**
 * A small progress ring (no label — too small). Drive it with `value` (0–`max`); the arc and
 * `aria-valuenow` follow, and `value={null}` is indeterminate — a fixed quarter arc spins. For a
 * bar with an optional label, use `LinearProgress`. Composes the `elements/circular-progress`
 * primitives on Base UI `Progress`.
 */
export function CircularProgress({ value, magnitude, tone, ...props }: CircularProgressProps) {
  const { box, radius } = RING_GEOMETRY[magnitude];
  const circumference = 2 * Math.PI * radius;
  const max = props.max ?? 100;
  const min = props.min ?? 0;
  const span = max - min;
  // Clamp once so the arc and `aria-valuenow` never disagree for out-of-range input, and derive the
  // fraction from both bounds so a non-zero `min` maps correctly. While indeterminate a fixed
  // quarter arc shows; the svg part spins it off `data-indeterminate`.
  const clampedValue = value == null ? null : Math.min(Math.max(value, min), max);
  const fraction = clampedValue == null ? 0.25 : span > 0 ? (clampedValue - min) / span : 0;
  const dashOffset = circumference * (1 - fraction);
  const center = box / 2;
  return (
    <BaseProgress.Root
      value={clampedValue}
      {...props}
      render={<CircularProgressElement magnitude={magnitude} />}
    >
      <CircularProgressSvg viewBox={`0 0 ${box} ${box}`}>
        <CircularProgressTrack cx={center} cy={center} r={radius} strokeWidth={RING_STROKE} />
        <CircularProgressIndicator
          tone={tone}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={RING_STROKE}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </CircularProgressSvg>
    </BaseProgress.Root>
  );
}
