import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { FieldDescription } from "./field-description";
import { FieldLabel } from "./field-label";
import type { InputMagnitude } from "./field-styles";

const labelGroupVariants = cva("flex flex-col gap-1", {
  variants: {
    orientation: {
      vertical: "w-full",
      horizontal: "min-w-0 flex-1",
    },
  },
});

export function FieldLabelGroup({
  magnitude,
  required,
  label,
  description,
  orientation,
}: {
  magnitude: InputMagnitude;
  required?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  orientation: NonNullable<VariantProps<typeof labelGroupVariants>["orientation"]>;
}) {
  if (label == null && description == null) {
    return null;
  }

  const inset = orientation === "horizontal" && description == null;
  return (
    <div className={labelGroupVariants({ orientation })}>
      {label != null ? (
        <FieldLabel magnitude={magnitude} required={required} inset={inset}>
          {label}
        </FieldLabel>
      ) : null}
      {description != null ? (
        <FieldDescription magnitude={magnitude}>{description}</FieldDescription>
      ) : null}
    </div>
  );
}
