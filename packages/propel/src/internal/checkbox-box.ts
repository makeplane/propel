import { cva, cx } from "class-variance-authority";

/**
 * The checkbox BOX look: the 16px bordered square that fills the accent on
 * `data-checked`/`data-indeterminate`. Shared chrome — the `Checkbox` box (`ui/checkbox`) and the
 * menu's checkbox indicator (`ui/menu`) both render it, so it lives in `internal/` (rule 4: no
 * cross-component cva coupling). Reacts to the standard Base UI state attributes
 * (`data-checked`/`data-indeterminate`/`data-disabled`), so any host that sets them gets the look.
 */
export const checkboxBoxVariants = cva(
  cx(
    "inline-flex size-4 shrink-0 items-center justify-center rounded-sm border-sm align-top [--node-size:0.75rem]",
    "transition-colors outline-none",
    "focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-1",
    "data-checked:border-transparent data-checked:bg-accent-primary data-checked:text-icon-on-color",
    "data-indeterminate:border-transparent data-indeterminate:bg-accent-primary data-indeterminate:text-icon-on-color",
    "data-disabled:cursor-not-allowed data-disabled:border-disabled data-disabled:bg-transparent",
    "data-disabled:data-checked:border-transparent data-disabled:data-checked:bg-layer-disabled data-disabled:data-checked:text-icon-disabled",
    "data-disabled:data-indeterminate:border-transparent data-disabled:data-indeterminate:bg-layer-disabled data-disabled:data-indeterminate:text-icon-disabled",
  ),
  {
    variants: {
      tone: {
        neutral: "border-icon-tertiary",
        danger: "border-danger-strong",
      },
    },
  },
);
