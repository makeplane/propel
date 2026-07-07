import { Slider as BaseSlider } from "@base-ui/react/slider";

import {
  Slider as SliderElement,
  SliderControl,
  SliderHeader,
  SliderIndicator,
  SliderLabel,
  type SliderMagnitude,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from "../../elements/slider";

export type SliderProps = Omit<BaseSlider.Root.Props<number>, "className" | "style"> & {
  /**
   * Optional visible label rendered above the track (e.g. "Volume"). When omitted, provide an
   * `aria-label` for the thumb so the control is still named for assistive tech.
   */
  label?: string;
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
 * Grafts Base UI `Slider` behavior onto the `elements/slider` styled parts (`Slider` root +
 * `SliderLabel` + `SliderValue` + `SliderControl` + `SliderTrack` + `SliderIndicator` +
 * `SliderThumb`). For multiple thumbs or fully custom layout, graft the `elements/slider` parts
 * directly.
 */
export function Slider({ label, "aria-label": ariaLabel, magnitude, ...props }: SliderProps) {
  return (
    <BaseSlider.Root render={<SliderElement />} {...props}>
      <SliderHeader>
        {label == null ? (
          <span />
        ) : (
          <BaseSlider.Label render={<SliderLabel />}>{label}</BaseSlider.Label>
        )}
        <BaseSlider.Value render={<SliderValue />} />
      </SliderHeader>
      <BaseSlider.Control render={<SliderControl magnitude={magnitude} />}>
        <BaseSlider.Track render={<SliderTrack />}>
          <BaseSlider.Indicator render={<SliderIndicator />} />
          <BaseSlider.Thumb render={<SliderThumb magnitude={magnitude} />} aria-label={ariaLabel} />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
