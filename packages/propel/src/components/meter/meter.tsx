import type * as React from "react";

import {
  Meter as MeterRoot,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
  type MeterProps as MeterRootProps,
} from "../../ui/meter";

export type MeterProps = MeterRootProps & {
  /**
   * Optional visible label rendered above the track (e.g. "Disk usage"). When omitted, provide an
   * `aria-label` so the gauge is still named for assistive tech.
   */
  label?: React.ReactNode;
};

/**
 * The ready-made meter: a static gauge that graphs a numeric `value` within a known range
 * (`min`/`max`, default 0–100) — disk usage, quota consumption, password strength. Drive it with
 * `value`; the fill and the formatted readout follow. Pass `format` (an `Intl.NumberFormatOptions`)
 * to format the value, and either `label` (visible) or `aria-label` to name it.
 *
 * Composed from the `ui/meter` parts (`Meter` root + `MeterLabel` + `MeterTrack` + `MeterIndicator`
 * + `MeterValue`), which are built on Base UI `Meter` (it owns the `meter` role +
 * `aria-valuenow`).
 */
export function Meter({ label, ...props }: MeterProps) {
  return (
    <MeterRoot {...props}>
      {label == null ? null : <MeterLabel>{label}</MeterLabel>}
      <MeterTrack>
        <MeterIndicator />
      </MeterTrack>
      <MeterValue />
    </MeterRoot>
  );
}
