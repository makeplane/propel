import type * as React from "react";

import {
  Slider as SliderElement,
  SliderControl,
  SliderHeader,
  SliderIndicator,
  SliderLabel,
  type SliderMagnitude,
  type SliderProps as SliderElementProps,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from "../../ui/slider";

export type SliderProps = SliderElementProps<number> & {
  /**
   * Optional visible label rendered above the track (e.g. "Volume"). When omitted, provide an
   * `aria-label` for the thumb so the control is still named for assistive tech.
   */
  label?: React.ReactNode;
  /** Accessible name for the thumb. Required when there is no visible `label`. */
  "aria-label"?: string;
  /** Thumb and control size. `sm` = 12 px thumb, `md` = 16 px, `lg` = 20 px. */
  magnitude: SliderMagnitude;
};

/**
 * The ready-made slider: a single-thumb control for picking a number within a range. Drive it with
 * `value`/`defaultValue` + `onValueChange`, and bound it with `min`/`max`/`step`. Pass `label`
 * (visible) or `aria-label` to name the thumb, and `format` (an `Intl.NumberFormatOptions`) to
 * format the readout.
 *
 * `magnitude` sets the thumb and hit-area size (`sm` / `md` / `lg`). The track bar height and shape
 * are always the same per the design spec.
 *
 * Composed from the `ui/slider` parts (`Slider` root + `SliderLabel` + `SliderValue` +
 * `SliderControl` + `SliderTrack` + `SliderIndicator` + `SliderThumb`), which are built on Base UI
 * `Slider`. For multiple thumbs or fully custom layout, compose the `ui/slider` parts directly.
 */
export function Slider({ label, "aria-label": ariaLabel, magnitude, ...props }: SliderProps) {
  return (
    <SliderElement {...props}>
      <SliderHeader>
        {label == null ? <span /> : <SliderLabel>{label}</SliderLabel>}
        <SliderValue />
      </SliderHeader>
      <SliderControl magnitude={magnitude}>
        <SliderTrack>
          <SliderIndicator />
          <SliderThumb magnitude={magnitude} aria-label={ariaLabel} />
        </SliderTrack>
      </SliderControl>
    </SliderElement>
  );
}
