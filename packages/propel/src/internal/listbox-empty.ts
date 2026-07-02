import { cva } from "class-variance-authority";

/**
 * The listbox "no matches" live region (rule 4a) — shared verbatim by autocomplete and combobox.
 * Base UI keeps the element mounted as an aria-live status region and renders children only when
 * the filtered list is empty, so the padding applies via `:not(:empty)` — otherwise every popup
 * shows a dead padded strip.
 */
export const listboxEmptyClass = "text-13 text-tertiary not-empty:px-2 not-empty:py-1.5";

export const listboxEmptyVariants = cva(listboxEmptyClass);
