import { cva } from "class-variance-authority";

// Menubar is a verbatim wrapping of Base UI's single `Menubar` container, which
// hosts a row of `Menu.Root`s. Base UI drives all state through `data-*`
// attributes, so there are no styling axes (variant/tone/magnitude) to expose.
// The cva pairing below holds the static container chrome in one place, with no
// `className` at the boundary.

export const menubarVariants = cva(
  "inline-flex items-center gap-1 rounded-md border-sm border-subtle bg-layer-1 p-1",
);
