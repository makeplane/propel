import { cx } from "class-variance-authority";

// A node slot: an inline-flex box that renders a node (an icon, an avatar, an image,
// ...) at the size its parent dictates through the `--node-size` custom property. The
// parent sets `--node-size` once on its own root, per magnitude (a literal value in the
// parent's cva); raw `svg`/`img` nodes dropped into the slot are sized to it here.
//
// propel components that are meant to sit in a slot (e.g. Avatar) read
// `var(--node-size)` themselves, with a fallback to their own size, so their box and
// internals scale to the same value when slotted and keep their standalone size
// otherwise. This is the single channel a parent uses to size whatever node it holds.
export const nodeSlotClass = cx(
  "inline-flex shrink-0 items-center justify-center",
  "[&>img]:size-[var(--node-size)] [&>svg]:size-[var(--node-size)]",
);
