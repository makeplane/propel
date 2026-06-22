import * as React from "react";

import {
  OTPField as OTPFieldRoot,
  OTPFieldInput,
  type OTPFieldProps as OTPFieldRootProps,
} from "../../ui/otp-field";

export type OTPFieldProps = OTPFieldRootProps;

/**
 * The ready-made one-time-password / verification-code field: a row of `length` character slots.
 * Drive it with `value`/`defaultValue` + `onValueChange`; the root owns focus movement, paste, and
 * completion across the slots. Pass `mask` to obscure entered characters.
 *
 * Composed from the `ui/otp-field` parts (`OTPField` root + `OTPFieldInput`), which are built on
 * Base UI `OTPFieldPreview`. Each `OTPFieldInput` resolves its slot index from the root context, so
 * the ready-made simply renders one per slot. For grouped layouts with separators (e.g. `123-456`),
 * compose the `ui/otp-field` parts directly.
 */
export function OTPField({ length, ...props }: OTPFieldProps) {
  // Base UI ignores `aria-label` on the first slot and names it from the root's `aria-labelledby`
  // instead, so a visually-hidden label backs the first slot while the rest carry an `aria-label`.
  // Without this the slot inputs fail axe's "Form elements must have labels".
  const firstSlotLabelId = React.useId();
  return (
    <OTPFieldRoot length={length} {...props}>
      <span id={firstSlotLabelId} className="sr-only">
        Character 1
      </span>
      {Array.from({ length }, (_, index) =>
        // Base UI ignores `aria-label` on the first slot, so name it via `aria-labelledby`
        // (pointing at the hidden label); the rest carry an `aria-label`.
        index === 0 ? (
          <OTPFieldInput key={index} aria-labelledby={firstSlotLabelId} />
        ) : (
          <OTPFieldInput key={index} aria-label={`Character ${index + 1}`} />
        ),
      )}
    </OTPFieldRoot>
  );
}
