import { cva, cx } from "class-variance-authority";

/**
 * The checkbox BOX look: the 16px bordered square that fills the accent on
 * `data-checked`/`data-indeterminate`. Shared chrome — the `Checkbox` box (`elements/checkbox`) and
 * the menu's checkbox indicator (`elements/menu`) both render it, so it lives in `internal/` (rule
 * 4: no cross-component cva coupling). Reacts to the standard Base UI state attributes
 * (`data-checked`/`data-indeterminate`/`data-disabled`), so any host that sets them gets the look.
 * The error look isn't a prop: it rests at the neutral border and recolors to `danger` off
 * `data-invalid`, which Base UI's `Field.Root` propagates to the `Checkbox.Root` when the field is
 * invalid — so a single checkbox or a whole group tones danger purely from field validity. The
 * danger border is scoped to `not-data-checked:not-data-indeterminate` (rather than a bare
 * `data-invalid:`) so it only ever shows on the RESTING (unchecked) box: without the exclusion, a
 * checked+invalid box (e.g. a required checkbox the user has ticked) keeps the red border because
 * Tailwind's generated stylesheet happens to emit `data-invalid` after `data-checked`, so equal
 * (single-attribute) specificity lets it win the cascade even though the box is no longer invalid
 * in the way that matters visually. Excluding checked/indeterminate makes the selector not match at
 * all once filled, independent of generation order.
 */
export const checkboxBoxVariants = cva(
  cx(
    "inline-flex size-4 shrink-0 items-center justify-center rounded-sm border-sm border-icon-tertiary align-top [--node-size:0.75rem]",
    // `duration-100` (vs Tailwind's 150ms default): the box is a small, frequently-toggled target,
    // so the resting-to-checked fill reads snappier at 100ms — the default read as a beat too slow
    // for a click-and-move-on control.
    "transition-colors duration-100 outline-none",
    "focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-1",
    "data-invalid:not-data-checked:not-data-indeterminate:border-danger-strong",
    "data-checked:border-transparent data-checked:bg-accent-primary data-checked:text-icon-on-color",
    "data-indeterminate:border-transparent data-indeterminate:bg-accent-primary data-indeterminate:text-icon-on-color",
    "data-disabled:cursor-not-allowed data-disabled:border-disabled data-disabled:bg-transparent",
    "data-disabled:data-checked:border-transparent data-disabled:data-checked:bg-layer-disabled data-disabled:data-checked:text-icon-disabled",
    "data-disabled:data-indeterminate:border-transparent data-disabled:data-indeterminate:bg-layer-disabled data-disabled:data-indeterminate:text-icon-disabled",
  ),
);
