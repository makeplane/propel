import { OTPField as BaseOTPField } from "@base-ui/react/otp-field";
import * as React from "react";

import type { FieldMagnitude } from "../../elements/field/variants";
import {
  OTPField as OTPFieldElement,
  OTPFieldInput,
  type OTPFieldInputMagnitude,
  OTPFieldLabel,
  OTPFieldSeparator,
} from "../../elements/otp-field";
import { Field, FieldError } from "../field";

// OTP slots size sm/md/lg; the error line maps onto the field text scale (md/lg/xl).
const OTP_HELPER_MAGNITUDE: Record<OTPFieldInputMagnitude, FieldMagnitude> = {
  md: "md",
  lg: "md",
  xl: "lg",
};

export type OTPFieldProps = Omit<BaseOTPField.Root.Props, "className" | "style"> & {
  /** Box size passed to every slot. */
  magnitude: OTPFieldInputMagnitude;
  /** Error text shown below the slots; its presence flips every slot to the danger state. */
  error?: React.ReactNode;
  /**
   * Slot counts per visual group, separated by an `OTPFieldSeparator` (e.g. `[3, 3]` renders
   * `123-456`). The counts must sum to `length`; omit for one flat run of slots.
   */
  groups?: readonly number[];
};

/**
 * The ready-made one-time-password / verification-code field: a row of `length` character slots.
 * Drive it with `value`/`defaultValue` + `onValueChange`; the root owns focus movement, paste, and
 * completion across the slots. Pass `mask` to obscure entered characters, `magnitude` to set the
 * box size, and `error` to show an error message — `Field.Root invalid` then propagates
 * `data-invalid` to every slot, which recolors its border (and focus ring) to danger off that
 * state.
 *
 * Grafts Base UI `OTPField` behavior onto the `elements/otp-field` styled parts (`OTPField` root +
 * `OTPFieldInput`). Each slot resolves its index from the root context, so the ready-made simply
 * renders one per slot; `groups` splits the run with separators (e.g. `groups={[3, 3]}` renders
 * `123-456`).
 */
export function OTPField({ length, magnitude, error, groups, ...props }: OTPFieldProps) {
  if (groups != null && groups.reduce((sum, count) => sum + count, 0) !== length) {
    throw new Error(`propel OTPField: groups [${groups.join(", ")}] must sum to length ${length}.`);
  }
  // Base UI ignores `aria-label` on the first slot and names it from the root's `aria-labelledby`
  // instead, so a visually-hidden label backs the first slot while the rest carry an `aria-label`.
  // Without this the slot inputs fail axe's "Form elements must have labels".
  const firstSlotLabelId = React.useId();
  return (
    <Field invalid={error != null || undefined}>
      <BaseOTPField.Root length={length} {...props} render={<OTPFieldElement />}>
        <OTPFieldLabel id={firstSlotLabelId}>Character 1</OTPFieldLabel>
        {Array.from({ length }, (_, index) => {
          // Base UI ignores `aria-label` on the first slot, so name it via `aria-labelledby`
          // (pointing at the hidden label); the rest carry an `aria-label`.
          const slot =
            index === 0 ? (
              <BaseOTPField.Input
                key={index}
                render={<OTPFieldInput magnitude={magnitude} />}
                aria-labelledby={firstSlotLabelId}
              />
            ) : (
              <BaseOTPField.Input
                key={index}
                render={<OTPFieldInput magnitude={magnitude} />}
                aria-label={`Character ${index + 1}`}
              />
            );
          // A separator sits after each group boundary except the last.
          const boundary =
            groups != null &&
            index < length - 1 &&
            groups
              .slice(0, -1)
              .reduce<number[]>((acc, count) => {
                acc.push((acc.at(-1) ?? 0) + count);
                return acc;
              }, [])
              .includes(index + 1);
          return boundary ? (
            <React.Fragment key={index}>
              {slot}
              <OTPFieldSeparator aria-hidden>-</OTPFieldSeparator>
            </React.Fragment>
          ) : (
            slot
          );
        })}
      </BaseOTPField.Root>
      <FieldError magnitude={OTP_HELPER_MAGNITUDE[magnitude]} match={error != null}>
        {error}
      </FieldError>
    </Field>
  );
}
