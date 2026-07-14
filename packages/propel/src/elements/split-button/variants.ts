import { cva, cx, type VariantProps } from "class-variance-authority";

import { type StrictVariantProps } from "../../internal/variant-props";

// SplitButton is the connected two-segment frame around a main action button and a menu-opening
// icon button (Figma "Split button"). The container owns segmentation only — the segments keep
// their own control chrome; the frame straightens their shared edge and draws the divider:
//
//   - Inner-edge radius flattening via child selectors (longhand `rounded-s/e-none` intentionally
//     out-cascades a segment's own shorthand `rounded-md`).
//   - The doubled border at the junction of self-bordered (secondary) segments collapses to one
//     (`border-s-0` on the trailing segment; the leading segment's end border is the divider).
//   - Borderless (primary) segments get their divider from `divide-x`, tinted per tone so it reads
//     on the accent fill; `divide-x`'s zero-specificity `:where()` never touches a segment that
//     draws its own border.
//   - A focused segment is lifted (`z-10` under `isolate`) so its offset focus ring paints over
//     the adjacent segment instead of underneath it.
//
// `prominence` is declared for the split-button Types only — primary and secondary; there is no
// tertiary/ghost split button. `magnitude` is color-less: it constrains the composed frame to the
// segments' shared size step (both segments of a split button are always the same magnitude).
export const splitButtonVariants = cva(
  cx(
    "isolate inline-flex items-stretch",
    "divide-x has-[:disabled]:divide-subtle",
    "[&>*+*]:rounded-s-none [&>*:not(:last-child)]:rounded-e-none",
    "[&>*+*]:border-s-0",
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
      { prominence: "primary", tone: "neutral", className: "divide-(--bg-accent-primary-active)" },
      { prominence: "primary", tone: "danger", className: "divide-(--bg-danger-primary-active)" },
    ],
  },
);

type SplitButtonVariantConfig = VariantProps<typeof splitButtonVariants>;
export type SplitButtonProminence = NonNullable<SplitButtonVariantConfig["prominence"]>;
export type SplitButtonTone = NonNullable<SplitButtonVariantConfig["tone"]>;
export type SplitButtonMagnitude = NonNullable<SplitButtonVariantConfig["magnitude"]>;

// No `defaultVariants` today, so every axis is required.
export type SplitButtonVariantProps = StrictVariantProps<typeof splitButtonVariants>;
