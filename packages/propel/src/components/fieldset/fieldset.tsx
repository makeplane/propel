import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import type * as React from "react";

import {
  Fieldset as FieldsetElement,
  type FieldsetProps as FieldsetElementProps,
  FieldsetBody,
  FieldsetDescription,
  FieldsetLegend,
  type FieldsetLegendProps,
} from "../../elements/fieldset";

export type FieldsetProps = FieldsetElementProps & {
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
 * The ready-made fieldset: groups a `legend` with its related controls for the 90% case. Grafts
 * Base UI's `Fieldset` behavior onto propel's styled parts — pass the legend text,
 * `legendMagnitude`, and whether the group is `bordered`; everything else flows through to the
 * underlying fieldset root.
 */
export function Fieldset({
  bordered,
  description,
  legend,
  legendMagnitude,
  children,
  ...props
}: FieldsetProps) {
  return (
    <BaseFieldset.Root {...props} render={<FieldsetElement bordered={bordered} />}>
      <BaseFieldset.Legend render={<FieldsetLegend magnitude={legendMagnitude} />}>
        {legend}
      </BaseFieldset.Legend>
      {description != null ? <FieldsetDescription>{description}</FieldsetDescription> : null}
      <FieldsetBody>{children}</FieldsetBody>
    </BaseFieldset.Root>
  );
}
