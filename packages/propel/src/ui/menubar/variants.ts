import { cva, cx } from "class-variance-authority";

// Menubar is a verbatim wrapping of Base UI's single `Menubar` container, which
// hosts a row of `Menu.Root`s. Base UI drives all state through `data-*`
// attributes, so there are no styling axes (variant/tone/magnitude) to expose.
// The cva pairing below holds the static container chrome in one place, with no
// `className` at the boundary.

export const menubarVariants = cva(
  "inline-flex items-center gap-1 rounded-md border-sm border-subtle bg-layer-1 p-1",
);

// MenubarTrigger: the styled button for each top-level menu in the bar.
// Per the designer's spec, all of the following are "always the same":
//   – horizontal layout + height
//   – item padding (horizontal and vertical)
//   – font style
//   – active/hover background highlight (`data-popup-open`)
// There are no adjustable axes, so no cva variants are needed.
export const menubarTriggerVariants = cva(
  cx(
    "inline-flex h-7 items-center rounded-sm px-2.5 text-13 text-secondary outline-none",
    "data-popup-open:bg-layer-transparent-hover",
  ),
);
