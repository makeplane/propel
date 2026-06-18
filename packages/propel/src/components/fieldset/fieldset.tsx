import type * as React from "react";

import {
  Fieldset as FieldsetRoot,
  type FieldsetProps as FieldsetRootProps,
  FieldsetLegend,
  type FieldsetLegendProps,
} from "../../ui/fieldset";

export type FieldsetProps = FieldsetRootProps & {
  /** The legend text labelling the group. */
  legend: React.ReactNode;
  /** Legend text size. */
  legendMagnitude: FieldsetLegendProps["magnitude"];
  /** The grouped controls. */
  children: React.ReactNode;
};

/**
 * The ready-made fieldset: groups a `legend` with its related controls for the 90% case. Pass the
 * legend text and `legendMagnitude`; everything else flows through to the underlying fieldset
 * root.
 */
export function Fieldset({ legend, legendMagnitude, children, ...props }: FieldsetProps) {
  return (
    <FieldsetRoot {...props}>
      <FieldsetLegend magnitude={legendMagnitude}>{legend}</FieldsetLegend>
      {children}
    </FieldsetRoot>
  );
}
