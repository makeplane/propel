import { cva, cx } from "class-variance-authority";

import { controlGroupClass, controlMagnitude } from "../../internal/control-group";
import { controlInputClass } from "../../internal/control-input";
import { itemIndicatorClass } from "../../internal/item-indicator";
import { listboxEmptyClass } from "../../internal/listbox-empty";
import { type StrictVariantProps } from "../../internal/variant-props";

export const comboboxInputGroupVariants = cva(
  cx(
    // Wraps a separate focusable input → the shared `focus: within` group chrome.
    controlGroupClass,
    "min-w-64 items-center gap-2 rounded-md px-3",
    // A trailing control (clear/trigger renders a `<button>`; the leading icon is a `<span>`) sits
    // flush inside the field, not in its own oversized button well: tighten the group's right
    // padding so the chevron/clear glyph reads as part of the input. The `:has()` selector outweighs
    // the flat `px-3`, so it only applies when a trailing control is present. Mirrors the same fix on
    // `autocompleteInputGroupVariants`.
    "has-[button]:pr-1",
  ),
  {
    variants: {
      magnitude: {
        sm: controlMagnitude.sm,
        md: controlMagnitude.md,
        lg: controlMagnitude.lg,
        xl: controlMagnitude.xl,
      },
    },
  },
);
export const comboboxInputVariants = cva(cx(controlInputClass, "flex-1"));
export const comboboxItemIndicatorVariants = cva(cx(itemIndicatorClass, "size-4"));
export const comboboxEmptyVariants = cva(listboxEmptyClass);

// The multiselect variant of the input frame. Tighter padding than `ComboboxInputGroup` so the h-6
// chips sit inset like text would.
export const comboboxChipsVariants = cva(
  cx(
    // Wraps a separate focusable input → the shared `focus: within` group chrome.
    controlGroupClass,
    "min-w-64 items-center gap-1 rounded-md px-1.5 py-1",
  ),
  {
    variants: {
      magnitude: {
        sm: controlMagnitude.sm,
        md: controlMagnitude.md,
        lg: controlMagnitude.lg,
        xl: controlMagnitude.xl,
      },
      // How the frame handles more chips than fit: `wrap` grows onto new rows (the default
      // multiselect), `collapse` keeps a single clipped row where the ready-made shows the first
      // N chips plus a `ComboboxChipOverflow` "+N more" count. `components` resolves this from
      // whether `maxVisible` was set (rule 13), so the primitive itself has no default.
      layout: {
        wrap: "flex-wrap",
        collapse: "flex-nowrap overflow-hidden",
      },
    },
  },
);
// One selected value, rendered as a removable tag (the neutral badge chrome). Arrow keys move
// focus onto a chip, so it carries the standard focus ring. `--node-size` sizes an optional
// leading/trailing `Icon`/avatar slot (composed by the ready-made) to 14px, matching the chip text.
export const comboboxChipVariants = cva(
  cx(
    "flex h-6 shrink-0 cursor-default items-center gap-1 rounded-sm bg-layer-3 ps-1.5 pe-0.5 text-13 text-secondary [--node-size:0.875rem]",
    "outline-none focus-visible:ring-2 focus-visible:ring-accent-strong",
    "data-disabled:cursor-not-allowed data-disabled:text-disabled",
  ),
);
// The "+N more" count shown after the visible chips when the frame is `layout="collapse"` and the
// selection exceeds `maxVisible`. A muted, non-interactive caption sized to the chip text; the
// hidden values are managed from the popup (deselect to remove).
export const comboboxChipOverflowVariants = cva(
  "shrink-0 px-0.5 text-13 text-secondary select-none",
);

export type ComboboxInputGroupVariantProps = StrictVariantProps<typeof comboboxInputGroupVariants>;
export type ComboboxChipsVariantProps = StrictVariantProps<typeof comboboxChipsVariants>;
type ComboboxInputGroupVariantConfig = ComboboxInputGroupVariantProps;
export type ComboboxMagnitude = ComboboxInputGroupVariantConfig["magnitude"];
