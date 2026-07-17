import { cva, cx } from "class-variance-authority";

/**
 * The checkbox BOX look: a 16px hit-target whose visible chrome is the 14px inset Figma paints
 * inside the frame. A transparent `border-sm` reserves that 1px gutter; resting/invalid/disabled
 * strokes are an inset `box-shadow` on the padding edge (so unchecked isn't a 16px outer ring), and
 * checked/indeterminate fills clip to the 14px padding box (`bg-clip-padding`). Shared chrome — the
 * `Checkbox` box (`elements/checkbox`) and the menu's checkbox indicator (`elements/menu`) both
 * render it, so it lives in `internal/` (rule 4: no cross-component cva coupling). Reacts to the
 * standard Base UI state attributes (`data-checked`/`data-indeterminate`/`data-disabled`), so any
 * host that sets them gets the look. The error look isn't a prop: it rests at the neutral stroke
 * and recolors to `danger` off `data-invalid`, which Base UI's `Field.Root` propagates to the
 * `Checkbox.Root` when the field is invalid — so a single checkbox or a whole group tones danger
 * purely from field validity. The danger stroke is scoped to
 * `not-data-checked:not-data-indeterminate` (rather than a bare `data-invalid:`) so it only ever
 * shows on the RESTING (unchecked) box: without the exclusion, a checked+invalid box (e.g. a
 * required checkbox the user has ticked) keeps the red stroke because Tailwind's generated
 * stylesheet happens to emit `data-invalid` after `data-checked`, so equal (single-attribute)
 * specificity lets it win the cascade even though the box is no longer invalid in the way that
 * matters visually. Excluding checked/indeterminate makes the selector not match at all once
 * filled, independent of generation order.
 */
export const checkboxBoxVariants = cva(
  cx(
    // Transparent border = 1px gutter around the 14px padding box (Figma frame 16 / fill 14).
    // Resting stroke is the inset shadow — a real `border-icon-tertiary` would sit on the 16px
    // outer edge and read larger than the checked fill.
    "inline-flex size-4 shrink-0 items-center justify-center rounded-sm border-sm border-transparent bg-clip-padding align-top [--node-size:0.75rem]",
    "shadow-[inset_0_0_0_1px_var(--border-color-icon-tertiary)]",
    // `duration-100` (vs Tailwind's 150ms default): the box is a small, frequently-toggled target,
    // so the resting-to-checked fill reads snappier at 100ms — the default read as a beat too slow
    // for a click-and-move-on control. Include `shadow` so resting→filled stroke removal eases too.
    "transition-[color,background-color,box-shadow] duration-100 outline-none",
    "focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-1",
    "data-invalid:not-data-checked:not-data-indeterminate:shadow-[inset_0_0_0_1px_var(--border-color-danger-strong)]",
    // Box-level hovers (Figma States: unchecked wash, checked/indeterminate darker accent). Scoped
    // behind `not-data-disabled` so disabled boxes keep their muted fill with no interaction wash.
    "not-data-disabled:hover:bg-layer-transparent-hover",
    "data-checked:bg-accent-primary data-checked:text-icon-on-color data-checked:shadow-none",
    "data-checked:not-data-disabled:hover:bg-accent-primary-hover",
    "data-indeterminate:bg-accent-primary data-indeterminate:text-icon-on-color data-indeterminate:shadow-none",
    "data-indeterminate:not-data-disabled:hover:bg-accent-primary-hover",
    // Disabled: Figma paints stroke + filled states `#71777A` (their icon/disabled swatch). That hex
    // is already `--txt-disabled` here — use it directly rather than remapping `--txt-icon-disabled`
    // or inventing border/bg aliases. Check/dash stay `icon/on-color` (white). Avoid
    // `border-disabled` / `bg-layer-disabled` (soft canvas-tinted surface tokens).
    "data-disabled:cursor-not-allowed data-disabled:bg-transparent data-disabled:shadow-[inset_0_0_0_1px_var(--txt-disabled)]",
    "data-disabled:data-checked:bg-(--txt-disabled) data-disabled:data-checked:text-icon-on-color data-disabled:data-checked:shadow-none",
    "data-disabled:data-indeterminate:bg-(--txt-disabled) data-disabled:data-indeterminate:text-icon-on-color data-disabled:data-indeterminate:shadow-none",
  ),
);
