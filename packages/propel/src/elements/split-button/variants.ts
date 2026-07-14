import { cva, cx, type VariantProps } from "class-variance-authority";

import { type StrictVariantProps } from "../../internal/variant-props";

// SplitButton is the connected two-segment frame around a main action button and a menu-opening
// icon button (Figma "Split button"). The container owns segmentation only — the segments keep
// their own control chrome; the frame straightens their shared edge and draws the divider:
//
//   - Inner-edge radius flattening via child selectors (longhand `rounded-s/e-none` intentionally
//     out-cascades a segment's own shorthand `rounded-md`).
//   - The divider is the FIRST segment's end border (`border-e`, tinted per tone on the primary
//     fill; a self-bordered secondary segment already draws it). The doubled border at the
//     junction of self-bordered segments collapses to one (`border-s-0` on trailing children).
//   - A focused segment is lifted (`z-10` under `isolate`) so its offset focus ring paints over
//     the adjacent segment instead of underneath it.
//
// Every child selector keys off `:first-child`/`* + *` and NEVER `:last-child`: while the menu is
// open, Base UI appends focus-guard `<span>`s after the trigger inside the frame, so the trigger
// is not reliably the last child (keying the flattening off `:not(:last-child)` visibly ate the
// open trigger's end radius).
//
// `prominence` is declared for the split-button Types only — primary and secondary; there is no
// tertiary/ghost split button. `magnitude` is color-less: it constrains the composed frame to the
// segments' shared size step (both segments of a split button are always the same magnitude).
export const splitButtonVariants = cva(
  cx(
    "isolate inline-flex items-stretch",
    "[&>*+*]:rounded-s-none [&>*:first-child]:rounded-e-none",
    "[&>*+*]:border-s-0 [&>*:first-child]:border-e",
    "[&:has(:disabled)>*:first-child]:border-e-subtle",
    "[&>*:focus-visible]:z-10",
  ),
  {
    variants: {
      prominence: { primary: "", secondary: "" },
      tone: { neutral: "", danger: "" },
      magnitude: { sm: "", md: "", lg: "", xl: "" },
    },
    compoundVariants: [
      // The pressed-fill background tokens double as the divider tint (there is no border token
      // for a line on the accent/danger fill), read via the var shorthand like circular-progress.
      // Secondary needs no tint: its main segment's own border-strong end border IS the divider.
      {
        prominence: "primary",
        tone: "neutral",
        className: "[&>*:first-child]:border-e-(--bg-accent-primary-active)",
      },
      {
        prominence: "primary",
        tone: "danger",
        className: "[&>*:first-child]:border-e-(--bg-danger-primary-active)",
      },
    ],
  },
);

type SplitButtonVariantConfig = VariantProps<typeof splitButtonVariants>;
export type SplitButtonProminence = NonNullable<SplitButtonVariantConfig["prominence"]>;
export type SplitButtonTone = NonNullable<SplitButtonVariantConfig["tone"]>;
export type SplitButtonMagnitude = NonNullable<SplitButtonVariantConfig["magnitude"]>;

// No `defaultVariants` today, so every axis is required.
export type SplitButtonVariantProps = StrictVariantProps<typeof splitButtonVariants>;
