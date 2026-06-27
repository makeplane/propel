import * as React from "react";

import { Field } from "../../ui/field/field";
import { FieldError } from "../../ui/field/field-error";
import type { FieldMagnitude } from "../../ui/field/variants";
import {
  OTPField as OTPFieldElement,
  OTPFieldInput,
  type OTPFieldInputMagnitude,
  OTPFieldLabel,
  type OTPFieldProps as OTPFieldElementProps,
} from "../../ui/otp-field";

// OTP slots size sm/md/lg; the error line maps onto the field text scale (md/lg/xl).
const OTP_HELPER_MAGNITUDE: Record<OTPFieldInputMagnitude, FieldMagnitude> = {
  sm: "md",
  md: "md",
  lg: "lg",
};

export type OTPFieldProps = OTPFieldElementProps & {
  /** Box size passed to every slot. */
  magnitude: OTPFieldInputMagnitude;
  /** Error text shown below the slots; its presence flips every slot to the danger state. */
  error?: React.ReactNode;
};

/**
 * The ready-made one-time-password / verification-code field: a row of `length` character slots.
 * Drive it with `value`/`defaultValue` + `onValueChange`; the root owns focus movement, paste, and
 * completion across the slots. Pass `mask` to obscure entered characters, `magnitude` to set the
 * box size, and `error` to show an error message — `Field.Root invalid` then propagates
 * `data-invalid` to every slot, which recolors its border (and focus ring) to danger off that
 * state.
 *
 * Composed from the `ui/otp-field` parts (`OTPField` root + `OTPFieldInput`), which are built on
 * Base UI `OTPFieldPreview`. Each `OTPFieldInput` resolves its slot index from the root context, so
 * the ready-made simply renders one per slot. For grouped layouts with separators (e.g. `123-456`),
 * compose the `ui/otp-field` parts directly.
 */
export function OTPField({ length, magnitude, error, ...props }: OTPFieldProps) {
  // Base UI ignores `aria-label` on the first slot and names it from the root's `aria-labelledby`
  // instead, so a visually-hidden label backs the first slot while the rest carry an `aria-label`.
  // Without this the slot inputs fail axe's "Form elements must have labels".
  const firstSlotLabelId = React.useId();
  return (
    <Field invalid={error != null || undefined}>
      <OTPFieldElement length={length} {...props}>
        <OTPFieldLabel id={firstSlotLabelId}>Character 1</OTPFieldLabel>
        {Array.from({ length }, (_, index) =>
          // Base UI ignores `aria-label` on the first slot, so name it via `aria-labelledby`
          // (pointing at the hidden label); the rest carry an `aria-label`.
          index === 0 ? (
            <OTPFieldInput key={index} magnitude={magnitude} aria-labelledby={firstSlotLabelId} />
          ) : (
            <OTPFieldInput
              key={index}
              magnitude={magnitude}
              aria-label={`Character ${index + 1}`}
            />
          ),
        )}
      </OTPFieldElement>
      <FieldError magnitude={OTP_HELPER_MAGNITUDE[magnitude]} match={error != null}>
        {error}
      </FieldError>
    </Field>
  );
}
