import { cva } from "class-variance-authority";

// ToggleGroup is a connected, segmented layout container around `Toggle`s; Base UI
// handles selection state and roving focus. Orientation is driven by the native
// `orientation` prop and reflected as `[data-orientation]`.
//
// Always the same (baked in):
//   - Connected/segmented layout: shared outer border, dividers between items
//   - Outer border-radius on the first/last items (inner edges straight) via
//     overflow-hidden on the container — no child-selector overrides needed
//   - Focus ring is per-item (Toggle's own focus-visible ring)
//   - Consistent item height: all Toggles share the group's `magnitude` via context
//   - All items same font style (Toggle's own typography)
//
// Depends/adjustable (props):
//   - `magnitude` — sizes every Toggle in the group
//   - `orientation` (Base UI native) — horizontal or vertical layout
//   - `multiple` (Base UI native) — single- vs multi-select
//   - `disabled` (Base UI native) — per-item or whole-group disable
export const toggleGroupVariants = cva(
  [
    // Container shape: outer border, clipped corners so first/last Toggle corners
    // are masked by the container — no per-child border-radius overrides needed.
    "inline-flex items-center rounded-md border border-subtle overflow-hidden",
    // Dividers between items (logical: horizontal uses border-inline-start).
    "divide-x divide-subtle",
    // Vertical flip: stack items, swap divider axis.
    "data-[orientation=vertical]:flex-col",
    "data-[orientation=vertical]:divide-x-0 data-[orientation=vertical]:divide-y",
  ].join(" "),
);
