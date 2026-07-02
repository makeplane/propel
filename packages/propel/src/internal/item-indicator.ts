import { cx } from "class-variance-authority";

import { nodeSlotClass } from "./node-slot";

/**
 * The shared selected-check slot chrome (rule 4a): an accent-tinted node slot that hides its glyph
 * while the row is unselected (`data-selected` comes from the Base UI `ItemIndicator` graft, which
 * passes `keepMounted` so the gutter column holds). Composed by the select/combobox/menu/
 * context-menu item indicators — before this each re-spelled it, and combobox had drifted to an
 * untinted check.
 */
export const itemIndicatorClass = cx(
  nodeSlotClass,
  "text-icon-accent-primary [--node-size:1rem] not-data-selected:invisible",
);
