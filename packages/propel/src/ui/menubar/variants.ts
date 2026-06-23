import { cva, cx } from "class-variance-authority";

import { nodeSlotClass } from "../../internal/node-slot";

// Menubar is a verbatim wrapping of Base UI's single `Menubar` container, which
// hosts a row of `Menu.Root`s. Base UI drives all state through `data-*`
// attributes, so there are no styling axes (variant/tone/magnitude) to expose.
// The cva pairing below holds the static container chrome in one place, with no
// `className` at the boundary.

export const menubarVariants = cva(
  "inline-flex items-center gap-1 rounded-md border-sm border-subtle bg-layer-1 p-1",
);

// MenubarTrigger: the styled button for each top-level menu in the bar.
// Per the designer's spec (issue #133), all of the following are "always the same":
//   – horizontal layout + height
//   – item padding (horizontal and vertical)
//   – font style
//   – active/hover background highlight (`data-popup-open`)
//   – focus ring style
// The trigger is a flex row that lays out its anatomy parts (an optional leading
// `MenubarTriggerIcon`, then the `MenubarTriggerLabel`); the spec's adjustable
// "whether items have icons" axis is served by composing — or omitting — the icon
// part, not by a cva variant. `--node-size` sizes any leading icon to 1rem.
export const menubarTriggerVariants = cva(
  cx(
    "group inline-flex h-7 items-center gap-1.5 rounded-sm px-2.5 [--node-size:1rem]",
    "text-13 text-secondary",
    "cursor-default outline-none focus-visible:ring-2 focus-visible:ring-accent-strong",
    "data-popup-open:bg-layer-transparent-hover data-popup-open:text-primary",
    "data-disabled:pointer-events-none data-disabled:text-disabled",
  ),
);

// The decorative leading icon at the trigger's inline-start. Sizes its single child
// to the trigger's `--node-size` (via the shared node-slot class) and tints it.
export const menubarTriggerIconVariants = cva(cx(nodeSlotClass, "text-icon-secondary"));

// The trigger's label. A single text element; `min-w-0` lets long labels truncate
// instead of overflowing the bar.
export const menubarTriggerLabelVariants = cva("min-w-0 truncate");
