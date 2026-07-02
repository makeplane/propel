import { Separator as BaseSeparator } from "@base-ui/react/separator";

import { Separator as SeparatorElement } from "../../elements/separator";

export type SeparatorProps = Omit<BaseSeparator.Props, "className" | "style" | "orientation"> & {
  /**
   * The axis the rule runs along — one of the spec's adjustable ("depends") axes, so it is required
   * rather than silently defaulting. `"horizontal"` is a full-width rule between stacked content;
   * `"vertical"` is a full-height rule between inline content. Base UI reflects it as
   * `[data-orientation]` (the single source of truth the cva keys off) and sets
   * `aria-orientation`.
   */
  orientation: NonNullable<BaseSeparator.Props["orientation"]>;
  /**
   * Whether the separator is purely decorative (visually present but hidden from assistive
   * technology). The spec's adjustable "Role" axis, so it is required — make a conscious choice
   * rather than relying on a silent default. Pass `true` for visual-only dividers; pass `false` for
   * separators that mark a meaningful content boundary and should be announced to screen readers.
   * Base UI sets `role="separator"` and `aria-orientation`; `decorative` overrides both.
   */
  decorative: boolean;
};

/**
 * A thin rule that visually divides content. Grafts Base UI's `Separator` behavior onto the styled
 * `elements` `Separator` `<div>` via `render`. Both adjustable axes from the design spec are
 * required: `orientation` (`"horizontal"` | `"vertical"`) and `decorative` (the "Role" axis —
 * semantic vs. visual-only). Spacing around the rule belongs to the surrounding layout, not the
 * separator.
 */
export function Separator({ decorative, ...props }: SeparatorProps) {
  // A semantic separator keeps Base UI's `role="separator"` + `aria-orientation`. A decorative one
  // is removed from the a11y tree: it takes `role="none"` and drops `aria-orientation` (a `<div>`
  // without `role="separator"` may not carry it). We spread these only when decorative so we never
  // clobber Base UI's defaults with `undefined` on the semantic path.
  const a11y = decorative
    ? { role: "none", "aria-orientation": undefined, "aria-hidden": true }
    : null;
  return <BaseSeparator {...props} {...a11y} render={<SeparatorElement />} />;
}
