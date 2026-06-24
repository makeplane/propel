import type * as React from "react";

import {
  Fieldset as FieldsetRoot,
  type FieldsetProps as FieldsetRootProps,
  FieldsetBody,
  FieldsetDescription,
  FieldsetLegend,
  type FieldsetLegendProps,
} from "../../ui/fieldset";

export type FieldsetProps = FieldsetRootProps & {
  /** Supporting text shown below the legend. */
  description?: React.ReactNode;
  /** The legend text labelling the group. */
  legend: React.ReactNode;
  /** Legend text size. */
  legendMagnitude: FieldsetLegendProps["magnitude"];
  /** The grouped controls. */
  children: React.ReactNode;
};

/**
 * The ready-made fieldset: groups a `legend` with its related controls for the 90% case. Pass the
 * legend text, `legendMagnitude`, and whether the group is `bordered`; everything else flows
 * through to the underlying fieldset root.
 */
export function Fieldset({
  description,
  legend,
  legendMagnitude,
  children,
  ...props
}: FieldsetProps) {
  return (
    <FieldsetRoot {...props}>
      <FieldsetLegend magnitude={legendMagnitude}>{legend}</FieldsetLegend>
      {description != null ? <FieldsetDescription>{description}</FieldsetDescription> : null}
      <FieldsetBody>{children}</FieldsetBody>
    </FieldsetRoot>
  );
}
