import type * as React from "react";

import {
  Slider as SliderRoot,
  SliderControl,
  SliderIndicator,
  SliderLabel,
  type SliderProps as SliderRootProps,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from "../../ui/slider";

export type SliderProps = SliderRootProps<number> & {
  /**
   * Optional visible label rendered above the track (e.g. "Volume"). When omitted, provide an
   * `aria-label` for the thumb so the control is still named for assistive tech.
   */
  label?: React.ReactNode;
  /** Accessible name for the thumb. Required when there is no visible `label`. */
  "aria-label"?: string;
};

/**
 * The ready-made slider: a single-thumb control for picking a number within a range. Drive it with
 * `value`/`defaultValue` + `onValueChange`, and bound it with `min`/`max`/`step`. Pass `label`
 * (visible) or `aria-label` to name the thumb, and `format` (an `Intl.NumberFormatOptions`) to
 * format the readout.
 *
 * Composed from the `ui/slider` parts (`Slider` root + `SliderLabel` + `SliderValue` +
 * `SliderControl` + `SliderTrack` + `SliderIndicator` + `SliderThumb`), which are built on Base UI
 * `Slider`. For multiple thumbs or fully custom layout, compose the `ui/slider` parts directly.
 */
export function Slider({ label, "aria-label": ariaLabel, ...props }: SliderProps) {
  return (
    <SliderRoot {...props}>
      {label == null ? null : <SliderLabel>{label}</SliderLabel>}
      <SliderValue />
      <SliderControl>
        <SliderTrack>
          <SliderIndicator />
          <SliderThumb aria-label={ariaLabel} />
        </SliderTrack>
      </SliderControl>
    </SliderRoot>
  );
}
