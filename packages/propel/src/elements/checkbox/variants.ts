import { cva, cx, type VariantProps } from "class-variance-authority";

import { checkboxBoxVariants } from "../../internal/checkbox-box";
import { nodeSlotClass } from "../../internal/node-slot";
import { type StrictVariantProps } from "../../internal/variant-props";

// The box look lives in `internal/checkbox-box` so it can be shared with the menu's checkbox
// indicator (rule 4). `Checkbox` renders it directly — same signature, so delegate to it.
export const checkboxVariants = checkboxBoxVariants;

// the CHECK indicator: shown when checked, hidden when indeterminate
export const checkboxIndicatorVariants = cva(
  cx(nodeSlotClass, "text-current", "data-indeterminate:hidden"),
);
// the INDETERMINATE (dash) indicator: a second Checkbox.Indicator that shows ONLY when indeterminate.
// NOTE: do NOT use nodeSlotClass here — its bare `inline-flex` would fight the default `hidden`.
// Spell out the node sizing + center, default hidden, reveal on data-indeterminate:
export const checkboxIndeterminateIndicatorVariants = cva(
  cx(
    "hidden items-center justify-center data-indeterminate:inline-flex [&>img]:size-(--node-size) [&>svg]:size-(--node-size)",
    "text-current",
  ),
);

// The clickable label row that wraps the box + optional icon + label text. The row reads its
// disabled state off the wrapped `Checkbox` (Base UI — and `Field.Root` — set `data-disabled` on
// it) via `:has()`, so it needs no `disabled` prop: it cancels the hover background and shows the
// not-allowed cursor whenever a descendant is disabled.
const checkboxLabelDefaultVariants = {
  sizing: "hug",
} as const;

export const checkboxLabelVariants = cva(
  cx(
    // `align-top`: an `inline-flex` row baseline-aligns to its first item. The box is empty while
    // unchecked and gains a check/dash SVG while checked — that changes the row's baseline and
    // used to nudge the whole chip (box + icon + text) ~2px on toggle. `vertical-align: top`
    // pins the row to the line box so geometry stays put (same fix as the bare box's `align-top`).
    "inline-flex items-center gap-2 rounded-sm px-2 py-1 align-top",
    // Figma `font/body-xs/regular` + `text/secondary` — use the composite type utility (not bare
    // `text-13`) so size 13, weight regular, and line-height 154% all apply together. Disabled
    // recolors the label (and the optional leading Icon slot) to `text/disabled` (#71777A) off the
    // wrapped box's `data-disabled` — the Icon keeps its own tint class, so the direct-child
    // `aria-hidden` span is overridden explicitly.
    "text-body-xs-regular text-secondary transition-colors",
    "cursor-pointer not-has-[[data-disabled]]:hover:bg-layer-transparent-hover",
    "has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:text-disabled has-[[data-disabled]]:[&>span[aria-hidden]]:text-disabled",
  ),
  {
    variants: {
      sizing: {
        hug: "w-fit",
        fill: "w-full",
      },
    },
    defaultVariants: checkboxLabelDefaultVariants,
  },
);

type CheckboxLabelVariantConfig = VariantProps<typeof checkboxLabelVariants>;
export type CheckboxLabelSizing = NonNullable<CheckboxLabelVariantConfig["sizing"]>;
export type CheckboxLabelVariantProps = StrictVariantProps<
  typeof checkboxLabelVariants,
  keyof typeof checkboxLabelDefaultVariants
>;
